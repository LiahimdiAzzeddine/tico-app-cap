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
