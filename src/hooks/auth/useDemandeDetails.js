import { useEffect, useState } from 'react';
import useAxiosPrivate from '../useAxiosPrivate';

const useDemandeDetails = (id) => {
  const [demande, setDemande] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const privateClient=useAxiosPrivate();

  useEffect(() => {
    if (!id) return;

    const fetchDemande = async () => {
      setLoading(true);
      try {
        const response = await privateClient.get(`/api/requests/show/${id}`);
        setDemande(response.data);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement de la demande.');
        setDemande(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDemande();
  }, [id]);

  return { demande, loading, error };
};

export default useDemandeDetails;
