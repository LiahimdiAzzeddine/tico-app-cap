import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Storage } from "@capacitor/storage";
import Tico from "../../assets/auth/tico.png";
import FilterConseils from "../../assets/tab/FILTRE_CONSEILS.svg";
import FilterRecettes from "../../assets/tab/FILTRE_RECETTES.svg";
import SearchRecettes from "../../assets/tab/search.svg";

import ModalPage from "./ModalPage";
import TipSettings from "../tips/TipSettings";
import RecipeSettings from "../recettes/RecipeSettings";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useGlobalTabsContext } from "../../context/useTabsContext";
import { IonButton } from "@ionic/react";


function HeaderTab({ image, onClose, filter = 1, setRelod }) {
  const [showModalTip, setShowModalTip] = useState(false);
  const [showModalRe, setShowModalRe] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const {showInput, setShowInput}=useGlobalTabsContext()

  // Vérifier la première visite pour les recettes
  const checkFirstVisitRecipes = async () => {
    const { value } = await Storage.get({ key: "firstVisitRecipes" });
    if (!value) {
      setShowModalRe(true); // Ouvre la modale pour RecipeSettings
      await Storage.set({ key: "firstVisitRecipes", value: "true" }); // Enregistre l'état
    }
  };

  // Vérifier la première visite pour les conseils
  const checkFirstVisitTips = async () => {
    const { value } = await Storage.get({ key: "firstVisitTips" });
    if (!value) {
      setShowModalTip(true); // Ouvre la modale pour TipSettings
      await Storage.set({ key: "firstVisitTips", value: "true" }); // Enregistre l'état
    }
  };

  // Appeler la vérification en fonction du filtre
  useEffect(() => {
    if (filter === 1) {
      checkFirstVisitRecipes(); // Vérifie pour les recettes
    } else if (filter === 2) {
      checkFirstVisitTips(); // Vérifie pour les conseils
    }
  }, [filter]);

  const handleFilterClick = () => {
    if (isAuthenticated) {
      if (filter === 2) {
        setShowModalTip(true);
      } else {
        setShowModalRe(true);
      }
    } else {
      alert("Vous devez être connecté pour accéder à cette page.");
    }
  };

  return (
    <>
      <div
        className="flex justify-between items-center pt-2 pb-2 px-0 modal-background"
        style={{ zIndex: 10 }}
      >
        <button
          className="text-custom-blue transform transition-transform duration-150 ease-in-out active:scale-90"
          onClick={onClose}
        >
          <IonButton fill="clear" className="p-0 m-0"  >
          <img src={image} alt="Close" className="w-auto h-10" />
          </IonButton>
        </button>
        <div className="flex flex-row items-end">
          <div className="text-orange-500 font-bold text-2xl flex flex-row titre-bold items-center">
           
            {filter == 1 &&(
              <IonButton fill="clear" className="p-0 m-0 ionRecipebutton" onClick={()=>{setShowInput(!showInput)}} >
                <img
              src={SearchRecettes}
              alt="Filter"
              
              className="h-8 transform transition-transform duration-150 ease-in-out active:scale-90"
            />
            </IonButton>
            )}
            <IonButton fill="clear" className="p-0 m-0 ionRecipebutton" onClick={handleFilterClick} >
           <img
              src={filter === 2 ? FilterConseils : FilterRecettes}
              alt="Filter"
              
              className="h-8 transform transition-transform duration-150 ease-in-out active:scale-90"
            /></IonButton>
            <IonButton fill="clear" className="p-0 m-0 ionTicobutton" >
            <img src={Tico} alt="Tico" className="h-6" />
            </IonButton>
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

HeaderTab.propTypes = {
  image: PropTypes.any,
  onClose: PropTypes.func.isRequired,
  filter: PropTypes.number,
};

export default HeaderTab;
