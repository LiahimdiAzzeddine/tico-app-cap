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
import OF from "../assets/tips/OFleche.svg";

function Tips() {
  const [page, setPage] = useState(1); // Page actuelle pour la pagination
  const { tips, loading, error } = useLastTips(page, 100); // Récupère les conseils en fonction de la page
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

  // Fonction pour charger plus de conseils lors du clic sur "Charger plus"
  const loadMoreTips = () => {
    setPage((prevPage) => prevPage + 1); // Augmente le numéro de page
  };

  return (
    <TapLayout icon={OF} filter={2}>
      <div className="details h-full w-full">
        <div className="h-[17%] pb-4" >
          <div
            className="flex flex-col items-center justify-center h-5/6 max-h-28 backgroundTips"
          >
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
            {/*tipsList.length > 0 && !loading && (
              <button onClick={loadMoreTips} className="mt-4">Charger plus</button>
            )*/}
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
        {selectedTip && <TipDetails tip={selectedTip} />} {/* Affiche les détails */}
      </ModalPage>
    </TapLayout>
  );
}

export default React.memo(Tips);
