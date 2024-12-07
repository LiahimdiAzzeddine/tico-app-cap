import { useState } from "react";
import useAxiosPrivate from "../useAxiosPrivate";
import { useToast } from "../../context/ToastContext";
import axios from "../../api/axios";
import { useHistory } from "react-router-dom"; 

const useChangePassword = () => {
  const privateClient = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { triggerToast } = useToast();
  const history = useHistory();
  
  const changePassword = async (currentPassword, newPassword, newPasswordConfirmation,emailParam) => {
    setLoading(true);
    setError(null);

    try {
      if(emailParam){
       const response= await axios.post('api/auth/change-password', {
          email: emailParam,
          new_password: newPassword,
          new_password_confirmation: newPasswordConfirmation,
        });
        console.log("🚀 ~ changePassword ~ response:", response)
        triggerToast(response.data.message || "Mot de passe changé avec succès.", "success");
        history.replace("/scanner"); 
      }else{
        const response=await privateClient.post('api/profile/change-password', {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: newPasswordConfirmation,
      });
      triggerToast(response.data.message || "Mot de passe changé avec succès.", "success");
      }
      
      
    } catch (err) {
      console.log("🚀 ~ changePassword ~ err:", err)
      const errorMsg = err.response?.data?.errors || { message: "Une erreur est survenue." };
      triggerToast(errorMsg.message || "Échec de la mise à jour du mot de passe.", "danger");
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading, error };
};

export default useChangePassword;
