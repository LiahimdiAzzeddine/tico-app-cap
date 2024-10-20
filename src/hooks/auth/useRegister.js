import { useState } from "react";
import axios from "../../api/axios";
import { useToast } from "../../context/ToastContext";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const { triggerToast } = useToast();

  const register = async ({ username, email, password, password_confirmation, role_id }) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/register", {
        username,
        email,
        password,
        password_confirmation,
        role_id,
      });

      triggerToast("Enregistrement réussi", "success");
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Une erreur s'est produite lors de l'enregistrement.";
      triggerToast(errorMessage, "danger");
      throw error.response?.data || error;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
};

export default useRegister;
