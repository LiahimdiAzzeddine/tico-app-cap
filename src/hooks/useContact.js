import { useState } from "react";
import axios from "../api/axios";
import { useToast } from "../context/ToastContext"; // Assure-toi du bon chemin d'import

const LOGIN_URL = "/api/auth/contact";

const useContact = () => {
  const { triggerToast } = useToast(); // Utilise le triggerToast du contexte
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sended, setSended] = useState(null);

  const handleSubmit = async (formValues) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(LOGIN_URL, formValues);
      triggerToast("Message envoyé avec succès !", "success"); // Affiche un toast de succès
      setSended(true);
    } catch (err) {
      const errors = err.response?.data?.errors || {};
      setError(errors);
      triggerToast("Erreur lors de l'envoi du message.", "danger"); // Affiche un toast d'erreur
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

export default useContact;
