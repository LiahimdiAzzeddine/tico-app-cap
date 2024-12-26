export function createRecipe(recipeData) {
  const extractMinutes = (timeString) => {
    if (!timeString) return 0;

    const hours = timeString.match(/(\d+)\s*h/);
    const minutes = timeString.match(/(\d+)\s*min/);

    let totalMinutes = 0;
    if (hours) totalMinutes += parseInt(hours[1]) * 60;
    if (minutes) totalMinutes += parseInt(minutes[1]);

    return totalMinutes;
  };
  // Fonction pour formater les minutes en heures et minutes
  const formatTime = (totalMinutes) => {
    if (totalMinutes === 0) return null;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) return `${minutes} min`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes} min`;
  };

  const calculateTotalTime = () => {
    const cookTime = extractMinutes(recipeData?.timecook);
    const restTime = extractMinutes(recipeData?.timerest);
    const bakeTime = extractMinutes(recipeData?.timebake);

    const totalMinutes = cookTime + restTime + bakeTime;
    return formatTime(totalMinutes);
  };

  // Extracting ingredients data; ensure it maintains its structure if it's an array
  const ingredients = Array.isArray(recipeData.ingredients)
    ? recipeData.ingredients.map((ingredient) => ({
        qt: ingredient.qt ?? "",
        unit: ingredient.unit ?? "",
        name: ingredient.name ?? "",
      }))
    : [];

  // Extracting and formatting recette steps if they exist
  const recette =
    recipeData.recette && typeof recipeData.recette === "object"
      ? Object.keys(recipeData.recette).map((stepKey) => ({
          step: stepKey,
          description: recipeData.recette[stepKey] ?? "",
        }))
      : [];
  const totalTime = calculateTotalTime();
  // Return the formatted recipe object
  return {
    id: recipeData.id ?? null,
    title: recipeData.title ?? "Titre de la recette",
    subtitle: recipeData.subtitle ?? "Sous-titre de la recette",
    nbperson: recipeData.nbperson ?? 0,
    image: recipeData.image_name ? recipeData.image_name : null,
    recette, // Include the transformed recette steps data
    timecook: recipeData.timecook ?? "Temps de cuisson non précisé",
    timebake: recipeData.timebake ?? "Temps de cuisson au four non précisé",
    timerest: recipeData.timerest ?? "Temps de repos non précisé",
    ingredients, // Include the transformed ingredients data
    labels: recipeData.labels ?? "",
    labels_more: recipeData.labels_more ?? "",
    regimes: recipeData.regimes ?? Array(),
    type: recipeData.type ?? Array(),
    difficulte: recipeData.difficulte ?? "",
    totalTime: totalTime,
  };
}
