import { useState, useEffect } from "react";
import axios from "../../api/axios";

const useRecipesLast = (regimePreferences = null, allergenPreferences = null) => {
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true); // Assurez-vous que le chargement est activé avant le début de l'appel
        const params = {};

        // Ajouter les préférences au payload si elles existent
        if (regimePreferences) params.regimePreferences = regimePreferences;
        if (allergenPreferences) params.allergenPreferences = allergenPreferences;

        // Requête GET avec les paramètres
        const response = await axios.get('/api/recipe/last', { params });
        setRecipes(response.data ? Object.values(response.data) : []);
      } catch (err) {
        setError(err.response ? err.response.data.error : "An error occurred");
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [regimePreferences, allergenPreferences]); // Dépendances pour relancer l'effet en cas de changement des préférences

  return { recipes, loading, error };
};

export default useRecipesLast;
