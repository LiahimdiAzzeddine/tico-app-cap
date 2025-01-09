export function createViewRecipe(recipeData,total_time) {
  // Mapping des ingrédients pour correspondre à la structure attendue dans RecipeModal
  const ingredients = Array.isArray(recipeData.ingredients)
    ? recipeData.ingredients.map((ingredient) => ({
        qt: ingredient.quantity ?? "",
        unit: ingredient.unit ?? "",
        name: ingredient.name ?? "",
      }))
    : [];

  // Mapping des étapes de la recette pour correspondre à la structure attendue dans RecipeModal
  const steps = Array.isArray(recipeData.steps)
    ? recipeData.steps.map((step) => ({
        description: step ?? "",
      }))
    : [];

  // Formatage des régimes
  const regimes = recipeData.filters ?? [];

  // Retourner l'objet formaté pour que les clés correspondent à celles de RecipeModal
  return {
    title: recipeData.titre ?? "Untitled",
    subtitle: recipeData.subtitle ?? "", // Ajout d'une clé pour le sous-titre si nécessaire
    timecook: recipeData.prep_time ?? "Temps de préparation non précisé",
    timebake: recipeData.cook_time ?? "Temps de cuisson non précisé",
    timerest: recipeData.rest_time ?? "Temps de repos non précisé",
    totalTime:total_time ?? "Temps de repos non précisé",
    image: recipeData.image ?? "", // Ajouter une image si nécessaire
    difficulte: recipeData.difficulty ?? "", // Difficulté
    regimes:regimes, // List des régimes (Végétarien, Sans oeufs, etc.)
    ingredients, // List des ingrédients
    recette: steps, // List des étapes formatées
    type: recipeData.types ?? [], // Types de la recette (Entrée, etc.)
  };
}
