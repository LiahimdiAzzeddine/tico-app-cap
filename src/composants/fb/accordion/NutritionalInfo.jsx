import React from "react";
import FICHETOP from "../../../assets/fb/FICHETOP.svg";
import NutritionTable from "../NutritionTable";
import Scores from "./Scores";

function NutritionalInfo({ togglePanel,product }) {
  return (
    <div className="bg-custom-green-clear rounded-e-[3rem] left-0 w-[95%] min-h-72 z-0 relative">
      <div className="px-2 py-6">
      <div className="text-sm text-[#2c6c67]">La portion recommandée pour ce produit est de :</div>
      <div className="text-base font-bold text-center p-2 text-[#2c6c67]" >{product.portion}{product.unit} {product.portioneq}</div>
      <h1 className="text-xl text-custom-blue font-bold pt-3 px-2">
        <span className="marker-effect-cyan">Profil nutritionnel</span>
      </h1>
      <NutritionTable product={product}/>
      <Scores/>
      <img
        src={FICHETOP}
        className="w-12 absolute bottom-0 right-0"
        onClick={() => togglePanel(1)} // Corrigé : utilisation d'une fonction de rappel
        alt="Toggle Panel"
      /> 
       </div>
    </div>
  );
}

export default NutritionalInfo;
