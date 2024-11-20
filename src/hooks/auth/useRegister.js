import { useState } from "react";
import axios from "../../api/axios";
import { useToast } from "../../context/ToastContext";
import { useHistory } from "react-router-dom"; 

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const { triggerToast } = useToast();
  const history = useHistory();

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
      history.replace("/login")
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
