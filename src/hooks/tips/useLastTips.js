import { useState, useEffect } from 'react';
import axios from "../../api/axios";

const useLastTips = (page = 1, limit = 10) => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLastTips = async () => {
      setLoading(true);
      setError(null);
      try {
        // Appel à l'API pour récupérer les conseils avec pagination
        const response = await axios.get('/api/tips/latest', {
          params: { page, limit }
        });
        // Mettre à jour l'état des conseils en concaténant les nouveaux conseils
        setTips((prevTips) => [...prevTips, ...response.data]);
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    // Exécuter la récupération des conseils
    fetchLastTips();
  }, [page, limit]); // Ajout des dépendances page et limit pour la pagination

  return { tips, loading, error };
};

export default useLastTips;
