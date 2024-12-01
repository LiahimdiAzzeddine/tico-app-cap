import { useState } from "react";
import axios from "../../api/axios";
import { useToast } from "../../context/ToastContext"; // Vérifie le chemin

const PRODUCT_ISSUES_URL = "/api/product-issues/store";

const useProductIssues = () => {
  const { triggerToast } = useToast(); // Contexte pour les notifications
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sended, setSended] = useState(false);

  const handleSubmit = async (formValues) => {
    setLoading(true);
    setError(null);

    try {
      // Appel API
      const response = await axios.post(PRODUCT_ISSUES_URL, formValues);

      // Succès : Ajoute des détails si nécessaire
      triggerToast("Message envoyé avec succès !", "success");
      setSended(response?.data || true); // Stocke la réponse ou un état
    } catch (err) {
      const errors = err.response?.data?.errors || "Erreur inconnue.";
      setError(errors);
      triggerToast("Erreur lors de l'envoi du message.", "danger");
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

export default useProductIssues;
