import React, { useState } from "react";
import recetteBadge from "../../assets/fb/recetteBadge.svg";
import horloge from "../../assets/fb/horloge.svg";
import flecheRed from "../../assets/fb/flecheRed.svg";
import SuggestRecipe from "../recettes/SuggestRecipe";
import WhiteModal from "../modales/WhiteModal";
import RecipeModal from "../modales/RecipeModal";
import defaultImageRecette from "../../assets/recettes/defaultImageRecette.png";
import { useAlert } from "../../context/AlertProvider";
import { useHistory } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

function Recettes({ recettes,targetRefRecettes }) {
  const [showModalAddRecipe, setShowModalAddRecipe] = useState(false);
  const [showModalRecipe, setShowModalRecipe] = useState(false);
  const [selectedRecette, setSelectedRecette] = useState(null);
  const isAuthenticated = useIsAuthenticated();
  const { triggerAlert } = useAlert();
  const history = useHistory();
  
  const handleRecetteClick = (recette) => {
    setSelectedRecette(recette);
    setShowModalRecipe(true);
  };
  const handleAddrecipe=()=>{
    if (!isAuthenticated) {
      triggerAlert(
        "pour Proposer une recette pour ce produit, il faut être connecté",
        "Attention",
        () => {
          history.replace("/login");
        },
        "ios",
        "Se connecter"
      );
    } else {
      setShowModalAddRecipe(true);
    }
    
  }

  return (
    <>
      <div className="flex flex-col w-full space-y-4 py-10 pb-5" ref={targetRefRecettes}>
        {recettes.map((item, index) => (
          <div
            key={item.id}
            className="relative bg-custom-rose rounded-e-full px-6 py-6 flex items-center"
            style={{ width: "95%" }}
            onClick={() => handleRecetteClick(item)}
          >
            {/* Badge "Recettes" */}
            {index === 0 && (
              <img
                src={recetteBadge}
                alt="Recettes Badge"
                className="absolute -top-12 -right-1 w-20 h-20"
              />
            )}
            <div className="space-x-4 flex items-center">
              {/* Image de la recette */}
              <img
                src={defaultImageRecette}
                alt={item.title}
                className="w-20 h-20 rounded-2xl border-custom-blue border-2 object-cover"
              />

              {/* Informations de la recette */}
              <div className="flex flex-col">
                <h2 className="text-md font-bold text-custom-red">
                  {item.title}
                </h2>
                <p className="text-sm text-custom-red-clear italic">
                  {item.subtitle}
                </p>

                {/* Temps de préparation et de cuisson */}
                <div className="flex flex-row items-center text-sm text-custom-red-clear mt-2 space-x-4">
                  <img src={horloge} alt="Horloge" className="w-8" />
                  <div className="flex flex-col items-start">
                  {item.timecook&&(
                    <div>{item.timecook}  de préparation</div>)}
                    {item.timerest&&(
                    <div>{item.timerest}  de cuisson</div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center justify-center space-x-3">
        <img src={flecheRed} alt="Fleche" className="w-12" />
        <button
          onClick={() => handleAddrecipe()}
          className="text-gl text-white bg-custom-red rounded-md font-bold w-48 p-2 mb-6"
        >
          Proposer une recette pour ce produit
        </button>
      </div>

      {/* Modal pour proposer une recette */}
      <WhiteModal
        isOpen={showModalAddRecipe}
        onClose={() => setShowModalAddRecipe(false)}
        image={"rf"}
        scroll={true}
      >
        <SuggestRecipe onClose={() => setShowModalAddRecipe(false)} />
      </WhiteModal>

      {/* Modal pour afficher les détails de la recette */}
      {selectedRecette && (
        <RecipeModal
          isOpen={showModalRecipe}
          onClose={() => setShowModalRecipe(false)}
          recipe={selectedRecette}
        />
      )}
    </>
  );
}

export default Recettes;
