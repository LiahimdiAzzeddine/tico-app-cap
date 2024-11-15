import { useState, useEffect } from 'react';
import axios from "../../api/axios";

const useLastTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLastTips = async () => {
      setLoading(true);
      setError(null);
      try {
        // Appel à l'API pour récupérer les 10 derniers conseils
        const response = await axios.get('/api/tips/latest');
        setTips(response.data);
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    // Exécuter la récupération des conseils
    fetchLastTips();
  }, []);

  return { tips, loading, error };
};

export default useLastTips;
