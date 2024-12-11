import React from "react";
import FICHETOP from "../../../assets/fb/FICHETOP.svg";
import Allergenes from "./Allergenes";
import Additifs from "./Additifs";

function IngredientsInfo({
  togglePanel,
  ingredients = [], 
  allergenesArray = [], 
  additifsArray = [],
  targetRefAdditifs,
  scrollToTarget,
}) {
  const scrollTop=()=>{
    scrollToTarget(targetRefAdditifs);
    togglePanel(2)
  }
  // Fonction pour formater les sous-produits
  const formatSubIngredients = (subIngredients = []) => {
    return subIngredients.map((sub, index) => {
      let subText = (
        <span
          className={`${
            sub.allergene && sub.allergene !== "" ? "underline" : ""
          }`}
        >
          {sub.label || "Inconnu"} {/* Valeur par défaut si label est manquant */}
        </span>
      );
      if (sub.quantity) {
        subText = (
          <>
            {subText} {sub.quantity}% 
          </>
        );
      }
      if (sub.details) {
        subText = (
          <>
            {subText} : {sub.details}
          </>
        );
      }
      if (sub.children && sub.children.length > 0) {
        subText = (
          <>
            {subText} ({formatSubIngredients(sub.children)})
          </>
        );
      }
  
      // Vérifie si c'est le dernier élément pour ne pas afficher la virgule
      const isLastElement = index === subIngredients.length - 1;
  
      return (
        <span key={index}>
          {subText}
          {!isLastElement && ", "}
        </span>
      );
    });
  };
  

  return (
    <div className="bg-custom-green-clear rounded-e-[3rem] left-0 w-[95%] min-h-40 z-0 relative pb-4">
      <div className="px-4 py-6">
        <h1 className="text-xl text-custom-blue font-bold pt-3">
          <span className="marker-effect-cyan ArchivoBold">Ingrédients</span>
        </h1>

        <div className="mt-4">
          {ingredients.length > 0 ? (
            ingredients.map((ingredient, index) => (
              <div key={index} className="mb-3">
                {/* Titre pour les ingrédients principaux */}
                <h2
                  className={`ArchivoBold text-custom-blue font-semibold ${
                    ingredient.allergene && ingredient.allergene !== ""
                      ? "underline"
                      : ""
                  }`}
                >
                  {ingredient.label || "Inconnu"} {/* Valeur par défaut si label est manquant */}
                  {ingredient.quantity && ` ${ingredient.quantity}`}
                  {ingredient.children && ingredient.children.length > 0 ? ":" : ""}
                </h2>
                {/* Détails des ingrédients */}
                <p className="text-custom-blue Archivo text-sm">
                  {ingredient.details || ""} 
                  {ingredient.children && ingredient.children.length > 0 && (
                    <span className="Archivo">
                      {formatSubIngredients(ingredient.children)}
                    </span>
                  )}
                </p>
              </div>
            ))
          ) : (
            <p className="text-custom-blue ArchivoBold">
              Aucun ingrédient disponible.
            </p>
          )}
        </div>

        {/* Affichage des allergènes et additifs si présents */}
        {allergenesArray.length > 0 && <Allergenes allergenes={allergenesArray} />}
        {additifsArray.length > 0 && <Additifs additifs={additifsArray}  targetRefAdditifs={targetRefAdditifs} />}
      </div>

      {/* Image pour toggler */}
      <img
        src={FICHETOP}
        className="w-12 absolute bottom-0 right-0 cursor-pointer"
        onClick={() => scrollTop()}
        alt="Toggle Panel"
      />
    </div>
  );
}

export default IngredientsInfo;
