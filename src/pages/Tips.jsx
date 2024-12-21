import React, { useState } from "react";
import Background from "../assets/tips/bachground.svg";
import { EmptyState } from "../composants/recettes/ui/EmptyState";
import Item from "../composants/tips/ui/Item";
import LoadingState from "../composants/recettes/ui/LoadingState";
import useLastTips from "../hooks/tips/useLastTips";
import { createTip } from "../utils/createTip";
import { ErrorState } from "../composants/ui/ErrorState";
import TapLayout from "../composants/layout/TapLyout";
import ModalPage from "../composants/modales/ModalPage";
import TipDetails from "../composants/tips/TipDetails";

function Tips() {
  const ids = []; // Ajuste cette liste pour filtrer les conseils si nécessaire
  const { tips, loading, error } = useLastTips(ids);
  const [showModalRecipe, setShowModalRecipe] = useState(false); // État pour afficher ou cacher la modale
  const [selectedTip, setSelectedTip] = useState(null); // Conseil sélectionné pour affichage
  
  const tipsList = Array.isArray(tips)
    ? tips.map((tip) => createTip(tip))
    : [];

  const handleTipClick = (tip) => {
    setSelectedTip(tip); // Définit le conseil sélectionné
    setShowModalRecipe(true); // Affiche la modale
  };

  const handleModalClose = () => {
    setShowModalRecipe(false); // Ferme la modale
    setSelectedTip(null); // Réinitialise le conseil sélectionné
  };

  return (
    <TapLayout>
      <div className="details h-full w-full">
        <div className="h-[15%]">
          <div
            className="flex flex-col items-center justify-center h-5/6 max-h-28 backgroundTips"
           
          >
            <h2 className="text-center text-custom-text-orange text-3xl titre-bold">
              Ti'conseils
            </h2>
          </div>
        </div>

        <div className="flex flex-col h-[85%] justify-center items-center bg-custom-orange">
          <div className="flex flex-col h-5/6 w-full px-6 rounded-b-[2rem] bg-white overflow-auto">
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
                  OpenFb={() => handleTipClick(tip)} // Passe l'objet tip complet
                />
              ))
            ) : (
              <EmptyState />
            )}
          </div>
          <div className="h-1/6 w-full flex flex-col items-center justify-center"></div>
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
        {selectedTip && <TipDetails tip={selectedTip} />} {/* Affiche les détails */}
      </ModalPage>
    </TapLayout>
  );
}

export default Tips;
