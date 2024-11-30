import React from "react";
import Nutri_score_A from "../../../assets/fb/score/Nutri_score_A.png";
import Nutri_score_B from "../../../assets/fb/score/Nutri-score-B.png";
import Nutri_score_C from "../../../assets/fb/score/Nutri-score-C.png";
import Nutri_score_D from "../../../assets/fb/score/Nutri-score-D.png";
import Nutri_score_E from "../../../assets/fb/score/Nutri-score-E.png";

function Scores({ nutriscore }) {
  const nutriscoreImages = {
    A: Nutri_score_A,
    B: Nutri_score_B,
    C: Nutri_score_C,
    D: Nutri_score_D,
    E: Nutri_score_E,
  };

  const nutriscorePhrase = {
    A: "Bravo ! Ce produit est excellent sur le plan nutritionnel.",
    B: "Ce produit est bon sur le plan nutritionnel, une bonne option pour une alimentation équilibrée.",
    C: "Ce produit a une qualité nutritionnelle moyenne, consommez-le avec modération.",
    D: "Attention ! Ce produit contient des nutriments à limiter, mais peut s’intégrer dans une alimentation variée.",
    E: "Ce produit est à consommer occasionnellement en raison de sa faible qualité nutritionnelle.",
  };

  const selectedNutriscoreImage = nutriscoreImages[nutriscore] || Nutri_score_E; // Image par défaut
  const selectedNutriscorePhrase = nutriscorePhrase[nutriscore] || "Ce produit est à consommer avec précaution.";

  return (
    <>
      <h1 className="text-xl text-custom-blue font-bold py-3 px-2">
        <span className="marker-effect-cyan">Nutri-Score</span>
      </h1>
      <div className="p-2 flex flex-col gap-1">
        <img
          src={selectedNutriscoreImage}
          alt={`Nutri-Score ${nutriscore}`}
          className="w-40 h-auto m-auto p-2"
        />
        <div className="indent-8 text-sm text-custom-green-text">
          Le Nutri-Score est une note qui vous permet d’avoir une information
          sur la qualité nutritionnelle d’un coup d’œil. Il vous permet de
          comparer les produits d’une même catégorie. Le Nutri-Score est à
          considérer dans le cadre d’une alimentation variée, tout est question
          d’équilibre.
        </div>
        <div className="indent-8 text-sm text-custom-green-text">
          {selectedNutriscorePhrase}
        </div>
      </div>
    </>
  );
}

export default Scores;
