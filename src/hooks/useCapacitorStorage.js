import { Storage } from "@capacitor/storage";

// Ajoute ou met à jour une entrée pour la première visite
export const setFirstVisit = async (isFirstVisit) => {
  try {
    await Storage.set({
      key: 'firstVisit',
      value: JSON.stringify(isFirstVisit), // Convertit la valeur en chaîne pour le stockage
    });
  } catch (error) {
    console.error("Error setting first visit status with Capacitor Storage:", error);
  }
};

// Récupère l'état de la première visite
export const getFirstVisit = async () => {
  try {
    const { value } = await Storage.get({ key: 'firstVisit' });
    return value !== null ? JSON.parse(value) : null; // Convertit la chaîne stockée en valeur d'origine
  } catch (error) {
    console.error("Error getting first visit status with Capacitor Storage:", error);
    return null;
  }
};

// Fonction pour sauvegarder les préférences de l'utilisateur
export const storePreferences = async (userId, values) => {
  if (!userId) {
    console.error("Utilisateur non connecté.");
    return;
  }

  try {
    const key = `user_preferences_${userId}`;
    await Storage.set({
      key,
      value: JSON.stringify(values),
    });
    console.log("Préférences sauvegardées avec succès.");
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des préférences :", error);
  }
};

// Fonction pour charger les préférences existantes
export const getPreferences = async (userId) => {
  if (!userId) {
    console.error("Utilisateur non connecté.");
    return;
  }

  try {
    const key = `user_preferences_${userId}`;
    const { value } = await Storage.get({ key });
    if (value) {
      console.log("Préférences chargées :", JSON.parse(value));
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    console.error("Erreur lors du chargement des préférences :", error);
    return null;
  }
};
// Fonction pour sauvegarder les préférences des astuces
export const storeTipPreferences = async (userId, selectedTips) => {
  if (!userId) {
    console.error("Utilisateur non connecté.");
    return;
  }

  try {
    const key = `user_tip_preferences_${userId}`;
    await Storage.set({
      key,
      value: JSON.stringify(Array.from(selectedTips)), // Convertir Set en tableau
    });
    console.log("Préférences des astuces sauvegardées avec succès.");
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des préférences des astuces :", error);
  }
};

// Fonction pour charger les préférences des astuces
export const getTipPreferences = async (userId) => {
  if (!userId) {
    console.error("Utilisateur non connecté.");
    return;
  }

  try {
    const key = `user_tip_preferences_${userId}`;
    const { value } = await Storage.get({ key });
    if (value) {
      console.log("Préférences des astuces chargées :", JSON.parse(value));
      return new Set(JSON.parse(value)); // Convertir tableau en Set
    }
    return new Set(); // Retourne un Set vide si aucune préférence trouvée
  } catch (error) {
    console.error("Erreur lors du chargement des préférences des astuces :", error);
    return new Set();
  }
};