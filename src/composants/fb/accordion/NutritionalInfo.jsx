import React from "react";
import FICHETOP from "../../../assets/fb/FICHETOP.svg";
import NutritionTable from "../NutritionTable";

function NutritionalInfo({ togglePanel }) {
  return (
    <div className="bg-custom-green-clear rounded-e-[3rem] left-0 w-[95%] min-h-72 z-0 relative">
      <div className="px-2 py-6">
      <div className="text-sm text-[#2c6c67]">La portion recommandée pour ce produit est de :</div>
      <div className="text-base font-bold text-center p-2 text-[#2c6c67]" >15g ou 1 cuillère à soupe</div>
      <h1 className="text-xl text-custom-blue font-bold py-3 px-2">
        <span className="marker-effect-cyan">Profil nutritionnel</span>
      </h1>
      <NutritionTable/>
      <div className="px-4 py-1 flex flex-col gap-1">
        <div className="indent-8 text-sm text-custom-green-text">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus esse
          deserunt eius. Sint dignissimos voluptatem perferendis cum totam!
          Maiores hic natus quaerat iure quibusdam atque tempora accusantium in
          non. Molestias!
        </div>
        <div className="indent-8 text-sm text-custom-green-text">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
          dolores est eos distinctio, quo dicta fugit inventore nihil placeat
          non similique accusantium ipsam veniam laborum quis mollitia quisquam
          culpa. Vel!
        </div>
      </div>
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
