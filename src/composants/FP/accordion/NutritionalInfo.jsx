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
    <div className="bg-custom-green-clear rounded-e-[3rem] left-0 w-[95%] min-h-72 z-0 relative pb-4">
      <div className="px-2 py-6">
        <div className="text-sm text-[#2c6c67] Archivo">
          La portion recommandée pour ce produit est de :
        </div>
        <div className="text-base font-bold text-center p-2 text-[#2c6c67] Archivo">
          {/* Affichage conditionnel pour les valeurs manquantes */}
          {portion && portion != 0 && unit && unit != "" ? (
            <>
              {portion} {portion ? unit : ""}{" "}
              {portioneq && portioneq != " " && portioneq != ""
                ? "ou " + portioneq
                : ""}
            </>
          ) : (
            "Données sur la portion non disponibles"
          )}
        </div>
        <h1 className="text-xl text-custom-blue font-bold pt-3 px-2 ArchivoBold">
          <span className="marker-effect-cyan ArchivoBold">
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
          className="w-12 absolute bottom-0 right-0"
          onClick={() => scrollTop()}
          alt="Toggle Panel"
        />
      </div>
    </div>
  );
}

export default NutritionalInfo;
