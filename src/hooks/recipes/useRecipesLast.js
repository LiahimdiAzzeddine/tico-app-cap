import { useState, useEffect } from "react";
import axios from "../../api/axios";

const useRecipesLast = () => {
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/recipe/last');
        console.log("recipes : ",response.data);
        setRecipes(response.data ? Object.values(response.data) : []); 
      } catch (err) {
        setError(err.response ? err.response.data.error : "An error occurred");
        setRecipes([]); 
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return { recipes, loading, error };
};

export default useRecipesLast;
