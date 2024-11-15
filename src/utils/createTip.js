export function createTip(tipData) {
    // Vérifie et extrait les données nécessaires pour formater le conseil
    return {
      id: tipData.id ?? null,
      title: tipData.titre ?? "Titre du conseil",
      image: tipData.image ? tipData.image : "default_image_url.jpg",
      details: tipData.details ?? "Détails non disponibles",
      createdAt: tipData.created_at ?? "Date inconnue",
    };
  }
  