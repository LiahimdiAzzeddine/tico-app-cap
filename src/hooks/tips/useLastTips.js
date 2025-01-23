import { useState, useEffect } from "react";
import axios from "../../api/axios";

const useLastTips = (page = 1, limit = 10, tipPreferences = []) => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchLastTips = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/tips/latest', {
          params: {
            page,
            limit,
            preferences: tipPreferences, 
          },
        });
        setTips(response.data);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (tipPreferences) {
      fetchLastTips();
    }
  }, [page, limit, tipPreferences]); // Dépendre des préférences pour les mises à jour

  return { tips, loading, error };
};

export default useLastTips;
