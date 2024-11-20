import { useState, useEffect } from "react";
import axios from "../api/axios"; 

const useFAQ = () => {
  const [faqs, setFAQs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get('/api/faqs'); // Remplace par l'URL correcte de ton API
        console.log("FAQs fetched: ", response.data);
        setFAQs(response.data ? Object.values(response.data) : []); 
      } catch (err) {
        setError(err.message ? err.message : "An error occurred");
        setFAQs([]); 
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  return { faqs, loading, error };
};

export default useFAQ;
