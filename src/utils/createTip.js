
export function createTip(tipData) {
  console.log("🚀 ~ createTip ~ tipData:", tipData);

  // Formater l'URL de l'image
  const formatImageUrl = (url) => {
    let formattedUrl = url.trim().replace(/\s/g, '%20'); // Remplacer les espaces
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`; // Ajouter https:// si manquant
    }
    return formattedUrl;
  };

  return {
    id: tipData.id ?? null,
    title: tipData.titre ?? "Titre du conseil",
    image: formatImageUrl(tipData.category?.image_url), // Formater l'image principale
    details: tipData.details ?? "Détails non disponibles",
    createdAt: tipData.created_at ?? "Date inconnue",
    category: {
      name: tipData.category?.label ?? "Catégorie inconnue",  // Nom de la catégorie
      image: formatImageUrl(tipData.category?.image_url),     // Formater l'image de la catégorie
    },
    publicationDate: tipData.publication ?? "Date de publication inconnue",  // Date de publication
  };
}
