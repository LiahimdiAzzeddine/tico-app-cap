import { createRecipe } from "./createRecipe";
export function createProduct(scannedResult, productData) {
  // Extraction et transformation des additifs
  const additifs =
    productData.foodheaproduct?._additifs?.map((additif) => ({
      code: additif._code,
      label: additif._label,
      label2: additif._label2,
      fonction1: additif._fonction1,
      fonction2: additif._fonction2,
      noteUFC: additif._noteufc,
      url: additif._url,
    })) ?? [];

  // Extraction et transformation des recettes
  const recipes =
    productData.foodheaproduct?._recettes?.map((recipe) =>
      createRecipe(recipe)
    ) ?? [];

  // Extraction et transformation des lignes
  const lines = productData.foodheaproduct?._lines
    ? Object.entries(productData.foodheaproduct._lines).map(([key, line]) => ({
        id: line._idnut,
        idNut: line._idnut,
        parent: line._parent,
        name: line._name,
        quantity: line._qt,
        unit: line._unit,
        order: line._order,
        vnr: line._vnr,
        symbol: line._symbole,
        nutType: line._nuttype,
      }))
    : [];

  // Fonction de transformation des ingrédients
  const transformIngredient = (ingredient) => {
    return {
      id: ingredient._id,
      quantity: ingredient._qt ?? "",
      label: ingredient._label ?? "",
      codeAdditif: ingredient._code_additif ?? "",
      allergene: ingredient._allergene ?? "",
      additif: ingredient._additif
        ? {
            code: ingredient._additif._code,
            label: ingredient._additif._label,
            label2: ingredient._additif._label2,
            fonction1: ingredient._additif._fonction1,
            fonction2: ingredient._additif._fonction2,
            noteUFC: ingredient._additif._noteufc,
            url: ingredient._additif._url,
          }
        : null,
      children: (ingredient._children ?? []).map(transformIngredient),
    };
  };

  // Extraction et transformation des ingrédients
  const ingredients =
    productData.foodheaproduct?._ingredients?.map(transformIngredient) ?? [];

  // Récupération des allergènes (sans doublon)
  const allAllergens = ingredients.reduce((acc, ingredient) => {
    if (ingredient.allergene && ingredient.allergene !== "") {
      acc.add(ingredient.allergene); // Utilisation d'un Set pour éviter les doublons
    }
    // Vérification des allergènes dans les sous-produits
    ingredient.children?.forEach((child) => {
      if (child.allergene && child.allergene !== "") {
        acc.add(child.allergene);
      }
    });
    return acc;
  }, new Set());

  // Convertion du Set en tableau
  const uniqueAllergens = [...allAllergens];

  // Récupération et transformation de _origin sous forme de JSON
  let originJson = [];
  if (productData.foodheaproduct?._origin) {
    const originString = productData.foodheaproduct._origin;
    const originArray = originString.split("\r\n");  // Split based on the new lines

    originJson = originArray.map(item => {
      const parts = item.split(" - ");  // Split each ingredient-origin pair by " - "
      return {
        ingredient: parts[0]?.trim() ?? "",
        origin: parts[1]?.trim() ?? ""
      };
    });
  }

  // Retour de l'objet produit avec les allergènes
  return {
    image: productData.OFFproduct?._photoUrl ?? "default_image_url.jpg",
    name: productData.foodheaproduct?._name ?? "Produit inconnu",
    generic_name:productData.foodheaproduct?._generic_name ?? "Produit inconnu",
    trademark: productData.OFFproduct?._trademark ?? "Marque inconnue",
    nutriscore: productData.foodheaproduct?._nutriscore ?? "inconnue",
    nova: productData.foodheaproduct?._nova ?? "inconnue",
    gtin: scannedResult,
    additifs,
    transparent: "---",
    adviceconso: productData.foodheaproduct?._adviceconso ?? "inconnue",
    planetScore:
      productData?.foodheaproduct?._planetscore?.[0]?._url ??
      "default_image_url.jpg",
      
    nutriscore_comment:
      productData.foodheaproduct?._nutriscore_comment ?? "inconnue",
    recipes: recipes,
    portion: productData.foodheaproduct?._portion ?? " ",
    portioneq: productData.foodheaproduct?._portioneq ?? " ",
    useportion: productData.foodheaproduct?._useportion ?? " ",
    unit: productData.foodheaproduct?._unit ?? " ",
    lines,
    ingredients,
    allergens: uniqueAllergens, 
    origin: originJson, 
    emballage:productData.foodheaproduct?._emballage ?? " ",
    transformation:productData.foodheaproduct?._transformation ?? " ",
  };
}
