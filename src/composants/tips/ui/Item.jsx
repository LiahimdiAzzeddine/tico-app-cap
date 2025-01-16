import React from "react";
import produitFleche from "../../../assets/tips/elementFleche.svg"; // Flèche pour ouvrir le feedback ou la vue détaillée
import defaultImage from "../../../assets/history/64.png"; // Image par défaut pour un conseil

const Item = ({ tip, index, length, OpenTip }) => {
  if (!tip) {
    return null;
  }
  const imageSrc = tip.image ? tip.image : defaultImage;

  return (
    <div key={index}>
      <div className="flex items-center py-4"
      onClick={() => OpenTip(tip)}
      >
        {/* Image du conseil */}
        <div className="w-20 h-20 mr-4 rounded-xl overflow-hidden  border-custom-text-orange border-2">
          <img
            src={imageSrc} // Utiliser l'image correcte (soit tip.image ou defaultImage)
            alt={tip.title}
            className="w-full h-full  object-cover "
          />
        </div>

        {/* Détails du conseil */}
        <div className="flex-1">
          <div className="text-custom-text-orange leading-archivo ArchivoExtraBold">
            {tip.title} {/* Afficher le titre du conseil */}
          </div>
          <div
            className="text-custom-blue  leading-none Archivo"
            dangerouslySetInnerHTML={{
              __html: tip?.details?.substring(0, 50) + "...",
            }}
          />
        </div>

        {/* Flèche */}
        <button onClick={() => OpenTip(tip)}>
            <img src={produitFleche} alt="flèche" className="w-10 h-10 ml-4" />
        </button>
      </div>

      {/* Séparateur */}
      {index < length - 1 && (
        <hr className="w-full border-t border-custom-orange" />
      )}
    </div>
  );
};

export default Item;
