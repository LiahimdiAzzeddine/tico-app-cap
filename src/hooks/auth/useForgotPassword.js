import { useState } from "react";
import axios from "../../api/axios";

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleForgotPassword = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/auth/forgot-password', userData);
      if (response.data.success) {
      } else {
        
        setError(response.data.message);
      }
    } catch (err) {
        console.log(err.response.data.errors)
      setError(err.response ? err.response.data.errors : { general: 'Une erreur est survenue.' });
    } finally {
      setLoading(false);
    }
  };

  return { handleForgotPassword, loading, error };
};

export default useForgotPassword;
