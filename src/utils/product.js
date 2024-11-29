import {createRecipe} from "./createRecipe"
export function createProduct(scannedResult, productData) {
  // Extracting and transforming the additifs data
  const additifs = productData.foodheaproduct?._additifs?.map(additif => ({
    code: additif._code,
    label: additif._label,
    label2: additif._label2,
    fonction1: additif._fonction1,
    fonction2: additif._fonction2,
    noteUFC: additif._noteufc,
    url: additif._url,
  })) ?? [];
   // Extracting and transforming the recettes data
   const recipes = productData.foodheaproduct?._recettes?.map(recipe => createRecipe(recipe)) ?? [];

   // Extracting and transforming the lines data
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

  return {
    image: productData.OFFproduct?._photoUrl ?? "default_image_url.jpg",
    name: productData.foodheaproduct?._name ?? "Produit inconnu",
    generic_name: productData.foodheaproduct?._generic_name ?? "Produit inconnu",
    trademark: productData.OFFproduct?._trademark ?? "Marque inconnue",
    nutriscore: productData.foodheaproduct?._nutriscore ?? "inconnue",
    nova: productData.foodheaproduct?._nova ?? "inconnue",
    gtin: scannedResult,
    additifs,
    transparent:'---',
    adviceconso:productData.foodheaproduct?._adviceconso ?? "inconnue",
    planetScore:productData?.foodheaproduct?._planetscore[0]._url ?? "default_image_url.jpg",
    nutriscore_comment:productData.foodheaproduct?._nutriscore_comment ?? "inconnue",
    recipes:recipes,
    portion:productData.foodheaproduct?._portion ?? " ",
    portioneq:productData.foodheaproduct?._portioneq ?? " ",
    useportion:productData.foodheaproduct?._useportion ?? " ",
    unit:productData.foodheaproduct?._unit ?? " ",
    lines,
  };
}
