import React from "react";
import Nutri_score_A from "../../../assets/fb/score/Nutri_score_A.png";
import Nutri_score_B from "../../../assets/fb/score/Nutri-score-B.png";
import Nutri_score_C from "../../../assets/fb/score/Nutri-score-C.png";
import Nutri_score_D from "../../../assets/fb/score/Nutri-score-D.png";
import Nutri_score_E from "../../../assets/fb/score/Nutri-score-E.png";

function Scores({ nutriscore }) {
  // Définition des images associées à chaque score
  const nutriscoreImages = {
    A: Nutri_score_A,
    B: Nutri_score_B,
    C: Nutri_score_C,
    D: Nutri_score_D,
    E: Nutri_score_E,
  };

  // Définition des phrases associées à chaque score
  const nutriscorePhrase = {
    A: "Les produits notés&nbsp;A sont généralement riches en nutriments bénéfiques (fibres, protéines, vitamines) et faibles en éléments à limiter comme les graisses saturées, les sucres ou le sel. Ce sont des aliments à privilégier dans le cadre d’une alimentation équilibrée.",
    B: "Les produits classés&nbsp;B restent de bons choix pour votre alimentation. Ils contiennent un bon mix de nutriments, avec parfois un peu plus de graisses, sucres ou sel que les produits notés&nbsp;A et un peu moins que les produits notés&nbsp;C.",
    C: "Un produit avec un Nutri-Score&nbsp;C peut contenir plus de graisses, de sucre ou de sel. Mais attention, ça ne veut pas dire qu’il faut l’éviter&nbsp;! Certains aliments comme les huiles végétales, riches en bonnes graisses, peuvent avoir un C tout en étant bons pour la santé. Tout est une question d’équilibre&nbsp;!",
    D: "Un produit noté&nbsp;D contient généralement des nutriments à limiter (graisses saturées, sucres ou sel). Mais certains, comme les fromages, apportent aussi des nutriments intéressants comme le calcium. Ils peuvent faire partie d’une alimentation variée si on les consomme avec modération.",
    E: "Les produits classés&nbsp;E sont ceux qui contiennent le plus d’éléments à limiter (graisses saturées, sucres, sel). Ils sont à consommer avec parcimonie. Toutefois, certains produits peuvent être classés&nbsp;E tout en étant intéressants nutritionnellement, comme certaines huiles. L’important, c’est de les intégrer à petite dose dans votre alimentation globale.",
  };

  // Validation du Nutri-score et gestion des valeurs manquantes
  const selectedNutriscoreImage = nutriscoreImages[nutriscore] || Nutri_score_E; 
  const selectedNutriscorePhrase = nutriscorePhrase[nutriscore] || "Ce produit est à consommer avec précaution."; 

  return (
    <>
      <h1 className="text-xl text-custom-blue font-bold py-3 px-2">
        <span className="marker-effect-cyan ArchivoBold">Nutri-Score</span>
      </h1>
      <div className="p-2 flex flex-col gap-4">
        <img
          src={selectedNutriscoreImage}
          alt={`Nutri-Score ${nutriscore}`}
          className="w-40 h-auto m-auto p-2"
        />
        <div className="indent-8 text-custom-blue Archivo">
          Le Nutri-Score est une note qui vous permet d’avoir une information sur la qualité nutritionnelle d’un coup d’oeil. Il vous permet de comparer les produits d’une même catégorie. Le Nutri-Score est à considérer dans le cadre d’une alimentation variée, tout est question d’équilibre.
        </div>
        <div className="indent-8 text-custom-blue Archivo">
          <span dangerouslySetInnerHTML={{ __html: selectedNutriscorePhrase }} />
        </div>
      </div>
    </>
  );
}

export default Scores;
