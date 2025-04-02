import { useState, useEffect } from "react";
import axios from "../../api/axios";

const useRecipesLast = (regimePreferences = null, allergenPreferences = null, title = '',search) => {
  const [recipes, setRecipes] = useState([]);  // Initialiser avec un tableau vide plutôt que null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {  // Renommé fetchProfile en fetchRecipes pour plus de clarté
      try {
        setLoading(true);
        const params = {};

        // Ajouter les préférences au payload si elles existent
        if (regimePreferences) params.regimePreferences = regimePreferences;
        if (allergenPreferences) params.allergenPreferences = allergenPreferences;

        // Ajouter le titre à la requête si fourni
        if (title) params.title = title;

        // Requête GET avec les paramètres
        const response = await axios.get('/api/recipe/last', { params });
        setRecipes(response.data ? Object.values(response.data) : []);
      } catch (err) {
        setError(err.response?.data?.error || "Une erreur est survenue");  // Utilisation de l'opérateur optionnel
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [regimePreferences, allergenPreferences, search]);

  return { recipes, loading, error };
};

export default useRecipesLast;