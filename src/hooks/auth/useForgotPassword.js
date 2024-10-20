import { useState } from "react";
import useAxiosPrivate from "../useAxiosPrivate";

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const privateClient = useAxiosPrivate();


  const handleForgotPassword = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await privateClient.post('/api/auth/forgot-password', userData);
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
