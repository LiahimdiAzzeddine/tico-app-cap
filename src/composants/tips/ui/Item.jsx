import React from "react";
import produitFleche from "../../../assets/recettes/recipeFleche.svg"; // Flèche pour ouvrir le feedback ou la vue détaillée
import defaultImage from "../../../assets/history/64.png"; // Image par défaut pour un conseil

const Item = ({ tip, index, length, OpenFb }) => {
  if (!tip) {
    return null;
  }

  return (
    <div key={index}>
      <div className="flex items-center py-4">
        {/* Image du conseil */}
        <div
          className="w-16 h-16 mr-4 rounded flex flex-col justify-center items-center bg-no-repeat bg-contain bg-center m-auto"
          style={{
            backgroundImage: `url(${tip.image || defaultImage})`, // Utilise l'image du conseil ou une image par défaut
          }}
        >
          <img
            src={tip.image || defaultImage} // Utiliser une image par défaut si tip.image est vide
            alt={tip.title}
            className="w-auto h-16 mr-4 rounded object-cover m-auto"
            onError={(e) => {
              e.target.onerror = null; // Éviter une boucle infinie
              e.target.src = defaultImage; // Image par défaut en cas d'erreur
            }}
            style={{ margin: "auto" }}
          />
        </div>

        {/* Détails du conseil */}
        <div className="flex-1">
          <div className="font-bold text-custom-red text-lg">
            {tip.title} {/* Afficher le titre du conseil */}
          </div>
          <div
            className="text-gray-500"
            dangerouslySetInnerHTML={{
              __html: tip?.details?.substring(0, 30) + "...",
            }}
          />
        </div>

        {/* Flèche */}
        <button onClick={() => OpenFb(tip)}>
          <img src={produitFleche} alt="flèche" className="w-10 h-10 ml-auto" />
        </button>
      </div>

      {/* Séparateur */}
      {index < length - 1 && (
        <hr className="w-full border-t border-gray-300 " />
      )}
    </div>
  );
};

export default Item;
