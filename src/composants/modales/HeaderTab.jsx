import React, { useState } from "react";
import PropTypes from "prop-types";
import Tico from "../../assets/auth/tico.png";
import FilterConseils from "../../assets/tab/FILTRE_CONSEILS.svg";
import FilterRecettes from "../../assets/tab/FILTRE_RECETTES.svg";
import ModalPage from "./ModalPage";
import TipSettings from "../tips/TipSettings";
import RecipeSettings from "../recettes/RecipeSettings";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

function HeaderTab({ image, onClose, filter = 1,setRelod }) {
  const [showModalTip, setShowModalTip] = useState(false);
  const [showModalRe, setShowModalRe] = useState(false);
  const isAuthenticated = useIsAuthenticated();

  const filterImg = filter === 2 ? FilterConseils : FilterRecettes;

 // Gestion des modales selon le filtre
const handleFilterClick = () => {
  if (isAuthenticated) {
    if (filter === 2) {
      setShowModalTip(true); // Ouvre la modale pour les conseils
    } else {
      setShowModalRe(true); // Ouvre la modale pour les recettes
    }
  } else {
    alert("Vous devez être connecté pour accéder à cette page.");
  }
};


  return (
    <>
      <div
        className="flex justify-between items-center pt-2 pb-2 px-5 modal-background"
        style={{ zIndex: 10 }}
      >
        <button
          className="text-custom-blue transform transition-transform duration-150 ease-in-out active:scale-90"
          onClick={onClose}
        >
          <img src={image} alt="Close" className="w-auto h-10" />
        </button>
        <div className="flex flex-row items-end">
          <div className="text-orange-500 font-bold text-2xl flex flex-row titre-bold items-center space-x-2 ">
            <img
              src={filterImg}
              alt="Filter"
              onClick={handleFilterClick} // Appel de la fonction pour gérer les modales
              className="h-8 transform transition-transform duration-150 ease-in-out active:scale-90"
            />
            <img src={Tico} alt="Tico" className="h-6" />
          </div>
        </div>
      </div>

      {/* Modale pour les conseils */}
      <ModalPage
        isOpen={showModalTip}
        onClose={() => setShowModalTip(false)}
        bgHeader="#ffeda3"
        bgcontent="#ffeda3"
        image="of"
      >
        <TipSettings setShowModalTip={setShowModalTip} setRelod={setRelod} />
      </ModalPage>

      {/* Modale pour les recettes */}
      <ModalPage
        isOpen={showModalRe}
        onClose={() => setShowModalRe(false)}
        bgHeader="#fdf2f0"
        bgcontent="#fdf2f0"
        image="rf"
      >
        <RecipeSettings setShowModalRe={setShowModalRe} setRelod={setRelod} />
      </ModalPage>
    </>
  );
}

// Définition des PropTypes pour vérifier les types des props
HeaderTab.propTypes = {
  image: PropTypes.any, // Optionnel : string pour identifier l'image
  onClose: PropTypes.func.isRequired, // Obligatoire : fonction pour gérer la fermeture
  filter: PropTypes.number, // Optionnel : nombre pour déterminer le filtre
};

export default HeaderTab;
