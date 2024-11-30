import React from "react";
import FICHETOP from "../../../assets/fb/FICHETOP.svg";
import Allergenes from "./Allergenes";
import Additifs from "./Additifs";

function IngredientsInfo({ togglePanel, ingredients,allergenesArray,additifsArray }) {
  // Fonction pour formater les sous-produits
  const formatSubIngredients = (subIngredients) => {
    return subIngredients
      .map((sub) => {
        let subText = `${sub.label}`;
        if (sub.quantity) {
          subText += ` ${sub.quantity}%`;
        }
        if (sub.details) {
          subText += ` : ${sub.details}`;
        }
        if (sub.children && sub.children.length > 0) {
          subText += ` [${formatSubIngredients(sub.children)}]`;
        }
        return subText;
      })
      .join(", ");
  };

  return (
    <div className="bg-custom-green-clear rounded-e-[3rem] left-0 w-[95%] min-h-72 z-0 relative pb-4">
      <div className="px-4 py-6">
        <h1 className="text-xl text-custom-blue font-bold pt-3">
          <span className="marker-effect-cyan">Ingrédients</span>
        </h1>

        <div className="mt-4">
          {ingredients && ingredients.length > 0 ? (
            ingredients.map((ingredient, index) => (
              <div key={index} className="mb-4">
                {/* Titre pour les ingrédients principaux */}
                <h2 className="text-lg text-custom-blue font-semibold">
                  {ingredient.label}
                  {ingredient.quantity && ` ${ingredient.quantity}`} :
                </h2>
                {/* Détails des ingrédients */}
                <p className="text-custom-blue">
                  {ingredient.details}
                  {ingredient.children && ingredient.children.length > 0 && (
                    <span> [{formatSubIngredients(ingredient.children)}]</span>
                  )}
                </p>
              </div>
            ))
          ) : (
            <p className="text-custom-blue">Aucun ingrédient disponible.</p>
          )}
        </div>
        {allergenesArray&&(
        <Allergenes allergenes={allergenesArray}/>  
        )}
        {additifsArray&&(
          <Additifs additifs={additifsArray}/>
        )}

      </div>
      <img
        src={FICHETOP}
        className="w-12 absolute bottom-0 right-0 cursor-pointer"
        onClick={() => togglePanel(2)}
        alt="Toggle Panel"
      />
    </div>
  );
}

export default IngredientsInfo;
