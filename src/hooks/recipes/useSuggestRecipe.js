import { useState } from "react";
import axios from "../../api/axios";
import { useToast } from "../../context/ToastContext";

const recipe_URL = "/api/recipe/store";
const useSuggestRecipe = () => {
  const { triggerToast } = useToast(); // Utilisation du contexte de notification
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // Correction du nom

  const handleSubmit = async (formValues) => {
    setLoading(true);
    setError(null);
    setSuccess(false); // Réinitialisation de l'état de succès

    try {
      // Envoi des données de la recette via un appel POST à l'API
      const response = await axios.post(recipe_URL, formValues);

      // Affiche un toast de succès avec un message approprié
      triggerToast("Recette envoyée avec succès !", "success");
      setSuccess(true);
    } catch (err) {
      // Gestion des erreurs retournées par l'API
      const errorMessage = err.response?.data?.message || "Une erreur est survenue";
      const errors = err.response?.data?.errors || {};

      setError(errors);
      triggerToast(errorMessage, "danger"); // Affiche un toast d'erreur avec le message

      // Optionnel : Console pour le débogage
      console.error("Erreur lors de l'envoi de la recette:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    loading,
    error,
    success, // Correction du nom
  };
};

export default useSuggestRecipe;
