import { useState, useEffect } from "react";
import axios from "../../api/axios";

const useTipById = (id) => {
  const [tip, setTip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchTipById = async () => {
      setLoading(true);
      setError(null);

      try {
        // Appel à l'API pour récupérer le conseil par ID
        const response = await axios.get(`/api/tips/${id}`);
        setTip(response.data);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
        
    };

    fetchTipById();
  }, [id]);

  return { tip, loading, error };
};

export default useTipById;
