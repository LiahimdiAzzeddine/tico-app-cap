import { useState } from "react";
import useAxiosPrivate from "../useAxiosPrivate";
import { useToast } from "../../context/ToastContext";
import axios from "../../api/axios";
import { useIonRouter } from "@ionic/react";

const useChangePassword = () => {
  const privateClient = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [onClose, setOnClose] = useState(false);
  const [error, setError] = useState(null);
  const { triggerToast } = useToast();
  const history = useIonRouter();
  const goToPage = (path) => {
    history.push(path, "root", "replace");
  };
  
  const changePassword = async (currentPassword, newPassword, newPasswordConfirmation, emailParam, token) => {
    setLoading(true);
    setError(null);

    try {
      let response;
      if (emailParam) {
        // Envoi de la requête pour changer le mot de passe avec l'email et token
        response = await axios.post('api/auth/change-password', {
          email: emailParam,
          new_password: newPassword,
          new_password_confirmation: newPasswordConfirmation,
          token: token,
        });
        triggerToast(response.data.message || "Mot de passe changé avec succès.", "success");
        goToPage("/tabs"); 
      } else {
        // Envoi de la requête pour changer le mot de passe pour un utilisateur connecté
        response = await privateClient.post('api/profile/change-password', {
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: newPasswordConfirmation,
        });
        triggerToast(response.data.message || "Mot de passe changé avec succès.", "success");
        setOnClose(true);
      }
      
    } catch (err) {
      console.log("🚀 ~ changePassword ~ err:", err);
      if (err.response && err.response.data && err.response.data.errors) {
        // Gestion des erreurs spécifiques par champ
        const errorMessages = err.response.data.errors;
        const formattedErrors = Object.keys(errorMessages).map((key) => {
          return {
            field: key,
            message: errorMessages[key].join(", "),  // On concatène les erreurs pour chaque champ
          };
        });

        // Si les erreurs existent, on les stocke dans l'état
        setError(formattedErrors);
        // Affichage du toast d'erreur pour l'utilisateur
        triggerToast("Erreur de validation. Vérifiez les champs indiqués.", "danger");
      } else {
        // Si l'erreur ne contient pas de validation spécifique, on affiche un message générique
        triggerToast("Échec de la mise à jour du mot de passe.", "danger");
      }
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading, error, onClose };
};

export default useChangePassword;
