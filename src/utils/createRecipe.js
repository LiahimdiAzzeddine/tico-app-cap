export function createRecipe(recipeData) {
  // Extracting ingredients data; ensure it maintains its structure if it's an array
  const ingredients = Array.isArray(recipeData.ingredients)
      ? recipeData.ingredients.map(ingredient => ({
          qt: ingredient.qt ?? "",
          unit: ingredient.unit ?? "",
          name: ingredient.name ?? ""
      }))
      : [];

  // Extracting and formatting recette steps if they exist
  const recette = recipeData.recette && typeof recipeData.recette === 'object'
      ? Object.keys(recipeData.recette).map(stepKey => ({
          step: stepKey,
          description: recipeData.recette[stepKey] ?? ""
      }))
      : [];

  // Return the formatted recipe object
  return {
      id: recipeData.id ?? null,
      title: recipeData.title ?? "Titre de la recette",
      subtitle: recipeData.subtitle ?? "Sous-titre de la recette",
      nbperson: recipeData.nbperson ?? 0,
      image: recipeData.image_name ? recipeData.image_name: null,
      recette,  // Include the transformed recette steps data
      timecook: recipeData.timecook ?? "Temps de cuisson non précisé",
      timebake: recipeData.timebake ?? "Temps de cuisson au four non précisé",
      timerest: recipeData.timerest ?? "Temps de repos non précisé",
      ingredients,  // Include the transformed ingredients data
      labels: recipeData.labels ?? "",
      labels_more: recipeData.labels_more ?? "",
      regimes: recipeData.regimes ?? "",
      type: recipeData.type ?? "",
      difficultes: recipeData.difficultes ?? "",
  };
}
