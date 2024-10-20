import { useState } from "react";
import useAxiosPrivate from "../useAxiosPrivate";
import { useToast } from "../../context/ToastContext";

const useChangePassword = () => {
  const privateClient = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { triggerToast } = useToast();

  const changePassword = async (currentPassword, newPassword, newPasswordConfirmation) => {
    setLoading(true);
    setError(null);

    try {
      const response = await privateClient.post('api/profile/change-password', {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: newPasswordConfirmation,
      });
      triggerToast(response.data.message || "Mot de passe changé avec succès.", "success");
    } catch (err) {
      const errorMsg = err.response?.data?.error || { message: "Une erreur est survenue." };
      triggerToast(errorMsg.message || "Échec de la mise à jour du mot de passe.", "danger");
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading, error };
};

export default useChangePassword;
