import { useState, useEffect } from "react";
import axios from "../../api/axios";

const useRecipeById = (id) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/recipe/${id}`);
        console.log("Recipe : ", response.data);
        setRecipe(response.data); // Assuming the API returns the recipe object directly
      } catch (err) {
        setError(err.response ? err.response.data.error : "An error occurred");
        setRecipe(null); // Set to null if there's an error
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe(); // Fetch recipe only if id is provided
    }
  }, [id]);

  return { recipe, loading, error };
};

export default useRecipeById;
