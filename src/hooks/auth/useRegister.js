import { useState } from "react";
import axios from "../../api/axios";
import { useToast } from "../../context/ToastContext";
import { useAlert } from "../../context/AlertProvider";
import { useHistory } from "react-router-dom";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const { triggerToast } = useToast();
  const { triggerAlert } = useAlert();
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

      // Afficher une notification de succès
      triggerToast("Enregistrement réussi", "success");

      // Rediriger vers la page de connexion
      history.replace("/login");

      // Déclencher une alerte avec deep link pour ouvrir l'application email
      triggerAlert(
        "Nous avons envoyé un email de confirmation à votre boîte mail.",
        "Validation",
        null, // Action personnalisée pour ouvrir l'application email
        "ios",
        "Ok"
      );

      return response.data;
    } catch (error) {
      // Gérer les erreurs et afficher une notification d'échec
      const errorMessage =
        error.response?.data?.message || "Une erreur s'est produite lors de l'enregistrement.";
      triggerToast(errorMessage, "danger");
      throw error.response?.data || error; // Rejeter l'erreur pour un traitement externe éventuel
    } finally {
      setLoading(false); // Réinitialiser l'état du chargement
    }
  };

  return { register, loading };
};

export default useRegister;
