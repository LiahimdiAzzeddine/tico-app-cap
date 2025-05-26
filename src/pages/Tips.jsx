import React, { useState, useEffect } from "react";
import { EmptyState } from "../composants/tips/ui/EmptyState";
import Item from "../composants/tips/ui/Item";
import LoadingState from "../composants/recettes/ui/LoadingState";
import useLastTips from "../hooks/tips/useLastTips";
import { createTip } from "../utils/createTip";
import { ErrorState } from "../composants/ui/ErrorState";
import TapLayout from "../composants/layout/TapLyout";
import ModalPage from "../composants/modales/ModalPage";
import TipDetails from "../composants/tips/TipDetails";
import OF from "../assets/tips/OFleche.svg";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { getTipPreferences } from "../hooks/useCapacitorStorage";

function Tips() {
  const [page, setPage] = useState(1);
  const [tipPreferences, setTipPreferences] = useState(null); // Ajout des préférences
  const { tips, loading, error } = useLastTips(page, 1000, tipPreferences); // Passage des préférences
  const [showModalRecipe, setShowModalRecipe] = useState(false);
  const [selectedTip, setSelectedTip] = useState(null);
  const authUser = useAuthUser();
  const userId = authUser?.id;
  const [relod, setRelod] = useState(false);

  // Charger les préférences utilisateur au montage
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const storedPreferences = await getTipPreferences(userId);
        setTipPreferences([...storedPreferences]);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des préférences :",
          error
        );
      }
    };

    fetchPreferences();
  }, [userId, relod]);

  const tipsList = Array.isArray(tips) ? tips.map((tip) => createTip(tip)) : [];

  const handleTipClick = (tip) => {
    setSelectedTip(tip); // Définit le conseil sélectionné
    setShowModalRecipe(true); // Affiche la modale
  };

  const handleModalClose = () => {
    setShowModalRecipe(false); // Ferme la modale
    setSelectedTip(null); // Réinitialise le conseil sélectionné
  };

  const loadMoreTips = () => {
    setPage((prevPage) => prevPage + 1); // Augmente le numéro de page
  };

  return (
    <TapLayout icon={OF} filter={2} setRelod={setRelod}>
      <div className="details h-full w-full">
        <div className="h-[17%] pb-4">
          <div className="flex flex-col items-center justify-center h-5/6 max-h-28 backgroundTips">
            <h2 className="text-center text-custom-text-orange text-2xl titre-bold">
              Ti'conseils
            </h2>
          </div>
        </div>

        <div className="flex flex-col h-[83%] justify-center items-center bg-white">
          <div className="flex flex-col h-full w-full px-6 overflow-auto">
            {loading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState message={error} />
            ) : tipsList.length > 0 ? (
              tipsList.map((tip, index) => (
                <Item
                  key={tip.id}
                  tip={tip}
                  index={index}
                  length={tipsList.length}
                  OpenTip={() => handleTipClick(tip)} // Passe l'objet tip complet
                />
              ))
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>

      {/* Modale pour afficher les détails d'un conseil */}
      <ModalPage
        isOpen={showModalRecipe}
        onClose={handleModalClose}
        bgHeader="#ffeda3"
        bgcontent="#ffeda3"
        image="of"
      >
        {selectedTip && <TipDetails tip={selectedTip} />}{" "}
        {/* Affiche les détails */}
      </ModalPage>
    </TapLayout>
  );
}

export default React.memo(Tips);
