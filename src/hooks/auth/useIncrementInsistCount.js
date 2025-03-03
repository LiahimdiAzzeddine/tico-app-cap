import { useState } from "react";
import useAxiosPrivate from "../useAxiosPrivate";

const API_URL = "/api/requests";

const useIncrementInsistCount = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const privateClient = useAxiosPrivate();


  const incrementInsistCount = async (demandeId, setDemandeState) => {
    if (loading) return; // Empêche plusieurs appels en même temps
    setLoading(true);
    setError(null);

    try {
      const response = await privateClient.post(`${API_URL}/${demandeId}/increment-insist`);

      if (response.status === 200) {
        setDemandeState(response.data.data); // Mettre à jour l'état avec la nouvelle demande
      } else {
        throw new Error("Erreur lors de l'incrémentation du compteur d'insistance");
      }
    } catch (err) {
      setError(err.message); // Enregistrer l'erreur
      console.error("Erreur de requête:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    incrementInsistCount,
    loading,
    error
  };
};

export default useIncrementInsistCount;
