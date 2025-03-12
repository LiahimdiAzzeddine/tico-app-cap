import React from "react";
import FICHETOP from "../../../assets/fb/FICHETOP.svg";
import NutritionTable from "../NutritionTable";
import Scores from "./Scores";

function NutritionalInfo({
  togglePanel,
  product,
  scrollToTarget,
  targetRefNutriInfo,
}) {
  // Vérification si le produit et ses propriétés sont définis
  const portion = product?.portion || "Non spécifiée";
  const unit = product?.unit || "unités";
  const portioneq = product?.portioneq || "Non spécifiée";
  const nutriscore = product?.nutriscore;
  const linesSize = Object.keys(product?.lines).length || 0;
  const scrollTop = () => {
    scrollToTarget(targetRefNutriInfo);
    togglePanel(1);
  };

  return (
    <div className="bg-custom-green-clear rounded-e-[2rem] left-0 min-h-72 z-0 relative pb-8" style={{ width: 'calc(100% - 16px)' }}>
      <div className="px-2 py-6">
        <div className="text-sm text-custom-blue Archivo">
        Portion indiquée :<span className="text-sm font-bold text-center p-2 text-custom-blue Archivo">
          {/* Affichage conditionnel pour les valeurs manquantes */}
          {portion && portion != 0 && unit && unit != "" ? (
            <>
              {portion} {portion ? unit : ""}{" "}
              {portioneq && portioneq != " " && portioneq != ""
                ? "ou " + portioneq
                : ""}
            </>
          ) : (
            "Non disponible"
          )}
        </span>
        </div>
        
        <h1 className="text-xl text-custom-blue font-bold pt-3 px-2 ArchivoExtraBold">
          <span className="marker-effect-cyan ArchivoExtraBold">
            Profil nutritionnel
          </span>
        </h1>

        {linesSize > 0 ? (
          <NutritionTable product={product} portion={portion} />
        ) : (
          <div className="text-center text-red-500 pt-3">
            Aucune donnée nutritionnelle disponible,{linesSize}
          </div>
        )}

        {nutriscore ? (
          <Scores nutriscore={nutriscore} />
        ) : (
          <div className="text-center text-red-500">
            Nutriscore non disponible
          </div>
        )}

        <img
          src={FICHETOP}
          className="w-12 absolute bottom-1 right-0"
          onClick={() => scrollTop()}
          alt="Toggle Panel"
        />
      </div>
    </div>
  );
}

export default NutritionalInfo;
