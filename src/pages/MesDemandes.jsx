import React, { useEffect, useState } from "react";
import { useIonRouter } from "@ionic/react";
import SimpleLyout from "../composants/layout/SimpleLyout";
import VF from "../assets/history/vf.svg";
import EmptyLater from "../composants/history/ui/EmptyLater";
import { attachOutline } from "ionicons/icons";
import useGetRequestsByUserId from "../hooks/auth/useGetRequestsByUserId";
import Demande from "../composants/history/Demande";
import useIncrementInsistCount from "../hooks/auth/useIncrementInsistCount";


const MesDemandes = () => {
  const history = useIonRouter();
  const { incrementInsistCount, loading: loadingIncre, error: errorIncre } = useIncrementInsistCount();
  const { loading, error, requests, fetchRequests, setError } =
    useGetRequestsByUserId();

  // Charger la liste initiale des produits
  useEffect(() => {
    const fetchProducts = async () => {
      await fetchRequests();
    };

    fetchProducts();
  }, []);

  // Composant pour afficher l'état de chargement
  const LoadingState = () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-8 w-8 bg-gray-200 rounded-full mb-2"></div>
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  // Composant pour afficher les erreurs
  const ErrorMessage = ({ message }) => (
    <div className="flex items-center justify-center h-full text-red-500 p-4 text-center">
      <p>{message}</p>
    </div>
  );

  return (
    <>
      <SimpleLyout
        Close={() => {
          history.goBack();
        }}
        image={VF}
      >
        <div className="p-4 details flex flex-col h-full">
          <div className="flex flex-col items-center justify-center min-h-[10vh] backgroundHistorique ">
            <h2 className="text-center text-custom-green-text text-[1.7rem] titre-bold z-10">
              Suivi&nbsp;de&nbsp;mes&nbsp;demandes
            </h2>
          </div>

          <div className="mt-2 flex-grow overflow-y-auto">
            {loading && <LoadingState />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && (
              <>
                {requests.length > 0 ? (
                  requests.map((demande, index) => (
                    <Demande
                      demande={demande}
                      index={index}
                      length={requests.length}
                      key={demande.gtin || index}
                      incrementInsistCount={incrementInsistCount} // Passer la méthode comme prop
                    />
                  ))
                ) : (
                  <EmptyLater
                    title="Aucun demande"
                    description="Envoyez une demande de transparence pour consulter les demandes ici."
                    icon={attachOutline}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </SimpleLyout>
    </>
  );
};

export default React.memo(MesDemandes);
