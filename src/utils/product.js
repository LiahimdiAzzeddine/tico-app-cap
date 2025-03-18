import { createRecipe } from "./createRecipe";
// Helper function to get the first valid value from a list of options
function getValidValue(...values) {
  return values.find(value => value && value !== "") ?? null;
}

// Helper function to get data from either foodheaproduct or OFFproduct
function getProductData(foodheaData, offData, defaultValue = []) {
  return (foodheaData?.length > 0 ? foodheaData : offData?.length > 0 ? offData : defaultValue);
}

// Helper function to get property from either source
function getProperty(foodheaProduct, offProduct, property, defaultValue) {
  return foodheaProduct?.[property] ?? offProduct?.[property] ?? defaultValue;
}

export function createProduct(scannedResult, productData) {
  const { foodheaproduct, OFFproduct, recipes = [], alreadyRequest } = productData;
  
  // Transform ingredients recursively
  const transformIngredient = (ingredient) => ({
    id: ingredient._id,
    quantity: ingredient._qt ?? "",
    label: ingredient._label ?? "",
    codeAdditif: ingredient._code_additif ?? "",
    allergene: ingredient._allergene ?? "",
    additif: ingredient._additif ? {
      code: ingredient._additif._code,
      label: ingredient._additif._label,
      label2: ingredient._additif._label2,
      fonction1: ingredient._additif._fonction1,
      fonction2: ingredient._additif._fonction2,
      noteUFC: ingredient._additif._noteufc,
      url: ingredient._additif._url,
    } : null,
    children: (ingredient._children ?? []).map(transformIngredient),
  });

  // Process additives
  const additifs = getProductData(foodheaproduct?._additifs, OFFproduct?._additifs)
    .map(additif => ({
      code: additif._code,
      label: additif._label,
      label2: additif._label2,
      fonction1: additif._fonction1,
      fonction2: additif._fonction2,
      noteUFC: additif._noteufc,
      url: additif._url,
    }));

  // Process recipes
  const transformedRecipes = recipes.length > 0 
    ? recipes.map(recipe => createRecipe(recipe)) 
    : [];

  // Process nutritional lines
  const lines = Object.entries(getProperty(foodheaproduct, OFFproduct, '_lines', {}))
    .map(([key, line]) => ({
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

  // Process ingredients
  const ingredients = getProductData(foodheaproduct?._ingredients, OFFproduct?._ingredients)
    .map(transformIngredient);

  // Process allergens
  const allergensString = getProperty(foodheaproduct, OFFproduct, '_allergenes_lst', '');
  const uniqueAllergens = allergensString ? 
    [...new Set(allergensString.split(',').map(item => item.trim()))] : 
    [];

  // Process origin information
  let originJson = [];
  /*
  if (foodheaproduct?._origin) {
    originJson = foodheaproduct._origin
      .split('\r\n')
      .map(item => {
        const parts = item.split(' - ');
        return {
          ingredient: parts[0]?.trim() ?? "",
          origin: parts[1]?.trim() ?? "",
        };
      });
  }*/

  // Return the transformed product
  return {
    isFoodheaProduct: !!foodheaproduct,
    image: getValidValue(
      foodheaproduct?._photoUrl,
      OFFproduct?._photoUrl
    ),
    name: getValidValue(
      foodheaproduct?._name,
      OFFproduct?._name,
      ""
    ),
    generic_name: getValidValue(
      foodheaproduct?._generic_name,
      OFFproduct?._generic_name,
      "Nom inconnu"
    ),
    transparency_scale: 0,
    trademark: getValidValue(
      foodheaproduct?._trademark_txt,
      OFFproduct?._trademark_txt,
      "Marque inconnue"
    ),
    nutriscore: getValidValue(
      foodheaproduct?._nutriscore,
      OFFproduct?._nutriscore,
      "inconnue"
    ),
    nova: getValidValue(
      foodheaproduct?._nova,
      OFFproduct?._nova,
      "inconnue"
    ),
    gtin: scannedResult,
    additifs,
    adviceconso: getValidValue(
      foodheaproduct?._adviceconso,
      OFFproduct?._adviceconso,
      "inconnue"
    ),
    planetScore: getValidValue(
      foodheaproduct?._planetscore?.[0]?._url,
      OFFproduct?._planetscore?.[0]?._url,
      "public/assets/history/64.png"
    ),
    nutriscore_comment: getValidValue(
      foodheaproduct?._nutriscore_comment,
      OFFproduct?._nutriscore_comment,
      "inconnue"
    ),
    recipes: transformedRecipes,
    portion: getValidValue(
      foodheaproduct?._portion,
      OFFproduct?._portion,
      " "
    ),
    portioneq: getValidValue(
      foodheaproduct?._portioneq,
      OFFproduct?._portioneq,
      " "
    ),
    useportion: getValidValue(
      foodheaproduct?._useportion,
      OFFproduct?._useportion,
      " "
    ),
    unit: getValidValue(
      foodheaproduct?._unit,
      OFFproduct?._unit,
      " "
    ),
    lines,
    ingredients,
    allergens: uniqueAllergens,
    origin: originJson,
    emballage: getValidValue(
      foodheaproduct?._emballage,
      OFFproduct?._emballage,
      " "
    ),
    transformation: getValidValue(
      foodheaproduct?._transformation,
      OFFproduct?._transformation,
      null
    ),
    transcondi: getValidValue(
      foodheaproduct?._transcondi,
      OFFproduct?._transcondi,
      null
    ),
    alreadyRequest,
    scores:foodheaproduct?._scores,
  };
}
