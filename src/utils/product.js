import { createRecipe } from "./createRecipe";
function getValidValue(...values) {
  for (let value of values) {
    if (value && value !== "") {
      return value;
    }
  }
  return null; // Valeur par défaut si aucune des valeurs n'est valide
}

export function createProduct(scannedResult, productData) {
  // Extraction et transformation des additifs
  const additifs =
    (productData.foodheaproduct?._additifs?.length > 0
      ? productData.foodheaproduct._additifs
      : productData.OFFproduct?._additifs?.length > 0
      ? productData.OFFproduct._additifs
      : []
    )?.map((additif) => ({
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
    (productData.recipes?.length > 0
      ? productData.recipes
      :[]
    )?.map((recipe) => createRecipe(recipe)) ?? [];

  // Extraction et transformation des lignes

  const lines = (
    productData.foodheaproduct?._lines
      ? Object.entries(productData.foodheaproduct._lines)
      : productData.OFFproduct?._lines
      ? Object.entries(productData.OFFproduct._lines)
      : []
  )?.map(([key, line]) => ({
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
    forced: line._forced,
  }));
  console.log("🚀 ~ createProduct ~ lines:", lines);
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
    (productData.foodheaproduct?._ingredients?.length > 0
      ? productData.foodheaproduct._ingredients
      : productData.OFFproduct?._ingredients?.length > 0
      ? productData.OFFproduct._ingredients
      : []
    )?.map(transformIngredient) ?? [];

  // Récupération des allergènes (sans doublon)
  const allAllergens = (
    productData.foodheaproduct?._allergenes_lst
      ? productData.foodheaproduct._allergenes_lst
      : productData.OFFproduct?._allergenes_lst
      ? productData.OFFproduct._allergenes_lst
      : ""
  )?.split(",").map(item => item.trim()) || [];
  


  // Convertion du Set en tableau
  const uniqueAllergens = [...allAllergens];

  // Récupération et transformation de _origin sous forme de JSON
  let originJson = [];
  if (productData.foodheaproduct?._origin) {
    const originString = productData.foodheaproduct._origin;
    const originArray = originString.split("\r\n"); // Split based on the new lines

    originJson = originArray.map((item) => {
      const parts = item.split(" - "); // Split each ingredient-origin pair by " - "
      return {
        ingredient: parts[0]?.trim() ?? "",
        origin: parts[1]?.trim() ?? "",
      };
    });
  }

  // Retour de l'objet produit avec les allergènes
  return {
    isFoodheaProduct: !!productData.foodheaproduct,
    image: getValidValue(
      productData.foodheaproduct?._photoUrl,
      productData.OFFproduct?._photoUrl,
      null
    ),
    name: getValidValue(
      productData.foodheaproduct?._name,
      productData.OFFproduct?._name,
      ""
    ),
    generic_name: getValidValue(
      productData.foodheaproduct?._generic_name,
      productData.OFFproduct?._generic_name,
      "Nom inconnu"
    ),
    transparency_scale: 0,
    trademark: getValidValue(
      productData.foodheaproduct?._trademark_txt,
      productData.OFFproduct?._trademark_txt,
      "Marque inconnue"
    ),
    nutriscore: getValidValue(
      productData.foodheaproduct?._nutriscore,
      productData.OFFproduct?._nutriscore,
      "inconnue"
    ),
    nova: getValidValue(
      productData.foodheaproduct?._nova,
      productData.OFFproduct?._nova,
      "inconnue"
    ),
    gtin: scannedResult,
    additifs,
    adviceconso: getValidValue(
      productData.foodheaproduct?._adviceconso,
      productData.OFFproduct?._adviceconso,
      "inconnue"
    ),
    planetScore: getValidValue(
      productData.foodheaproduct?._planetscore?.[0]?._url,
      productData.OFFproduct?._planetscore?.[0]?._url,
      "public/assets/history/64.png"
    ),
    nutriscore_comment: getValidValue(
      productData.foodheaproduct?._nutriscore_comment,
      productData.OFFproduct?._nutriscore_comment,
      "inconnue"
    ),
    recipes: recipes,
    portion: getValidValue(
      productData.foodheaproduct?._portion,
      productData.OFFproduct?._portion,
      " "
    ),
    portioneq: getValidValue(
      productData.foodheaproduct?._portioneq,
      productData.OFFproduct?._portioneq,
      " "
    ),
    useportion: getValidValue(
      productData.foodheaproduct?._useportion,
      productData.OFFproduct?._useportion,
      " "
    ),
    unit: getValidValue(
      productData.foodheaproduct?._unit,
      productData.OFFproduct?._unit,
      " "
    ),
    lines,
    ingredients,
    allergens: uniqueAllergens,
    origin: originJson,
    emballage: getValidValue(
      productData.foodheaproduct?._emballage,
      productData.OFFproduct?._emballage,
      " "
    ),
    transformation: getValidValue(
      productData.foodheaproduct?._transformation,
      productData.OFFproduct?._transformation,
      " "
    ),
  };
}
