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
      const response = await privateClient.post("/api/auth/forgot-password", userData);
      if (response.data.success) {
        return { success: true };
      } else {
        setError(response.data.message);
        return { success: false };
      }
    } catch (err) {
      setError(
        err.response?.data?.errors || "Une erreur est survenue. Veuillez réessayer."
      );
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { handleForgotPassword, loading, error };
};

export default useForgotPassword;
