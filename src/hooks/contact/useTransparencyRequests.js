import { useState } from "react";
import axios from "../../api/axios";
import { useToast } from "../../context/ToastContext"; 
import { useGlobalContext } from "../../composants/FP/GlobalProvider";

const TRANSPARENCY_REQUESTS_URL = "/api/transparency-requests/store";

const useTransparencyRequests = () => {
  const { triggerToast } = useToast(); // Contexte pour les notifications
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sended, setSended] = useState(false);
  const { setHasRequested,hasRequested  } = useGlobalContext();
    

  const handleSubmit = async (formValues) => {
    setLoading(true);
    setError(null); // Réinitialise l'erreur avant de soumettre

    try {
      // Appel API
      const response = await axios.post(TRANSPARENCY_REQUESTS_URL, formValues);
      // Succès : Ajoute des détails si nécessaire
      triggerToast("Demande envoyée avec succès !", "success");
      setSended(true);
      setHasRequested(true)
    } catch (err) {
      const errors = "Erreur inconnue.";
      setError(errors); // Met à jour l'état des erreurs
      triggerToast("Erreur lors de l'envoi de la demande.", "danger");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    loading,
    error,
    sended,
  };
};

export default useTransparencyRequests;
