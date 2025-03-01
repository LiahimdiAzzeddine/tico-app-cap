import { useState } from "react";
import useAxiosPrivate from "../useAxiosPrivate";

const useGetRequestsByUserId = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requests, setRequests] = useState([]);
  const privateClient=useAxiosPrivate();

  const fetchRequests = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await privateClient.get(`/api/requests/user`);
      const data = response.data;

      if (response.status === 200) {
        setRequests(data.data);
          console.log("🚀 ~ fetchRequests ~ data.data:", data.data)
        return data.data;
      } else {
        setError("Erreur inattendue lors de la récupération des demandes.");
        return false;
      }
       
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Aucune demande trouvée pour cet utilisateur.");
      } else {
        setError("Erreur lors de la récupération des demandes.");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    requests,
    fetchRequests,
    setError,
  };
};

export default useGetRequestsByUserId;
