import { useState, useEffect } from 'react';
import axios from "../../api/axios";

const useLastRecipes = (ids = []) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLastRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        // Example API endpoint - adjust to your actual endpoint
        const response = await axios.get('/api/recipes/last', {
          params: { ids }
        });
        setRecipes(response.data);
        
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        console.log("err")
        setLoading(false);
      }
    };

    // Only fetch if ids array is not empty
    if (ids.length > 0) {
      fetchLastRecipes();
    }
  }, [ids]);

  return { recipes, loading, error };
};

export default useLastRecipes;
