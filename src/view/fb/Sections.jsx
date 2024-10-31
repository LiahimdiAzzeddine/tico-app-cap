import React from "react";
import Partage from "../../assets/fb/top.svg";
import Recettes from "../../assets/fb/recettes.svg"; // Correction de la casse
import BubbleImg from "../../assets/fb/BubbleImg.svg";
import { Share } from "@capacitor/share";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Sections() {
  // Fonction de partage
  const handleShare = async () => {
    try {
      await Share.share({
        title: "Découvrez cette fiche produit",
        text: "Découvrez les informations nutritionnelles et d'autres détails sur ce produit.", // Ajout d'un texte de description
        url: backendUrl+"/fiche-produit/154861", // Assurez-vous que cette URL est accessible
        dialogTitle: "Fiche produit",
      });
    } catch (error) {
      console.error("Erreur lors du partage:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-end justify-center pb-4">
      <div className="bg-[#b6e1dd] rounded-s-full w-[95%] px-3 py-9">
        <div className="flex flex-row">
          <button
            onClick={handleShare}
            className="w-2/3 flex flex-row justify-center items-center transform transition-transform duration-150 ease-in-out active:scale-95"
          >
            <img src={Partage} className="h-16" alt="Partage" />
          </button>
          <div
            className="w-2/3 flex flex-row justify-center items-center transform transition-transform duration-150 ease-in-out active:scale-95"
          >
            <img src={Recettes} className="h-16" alt="Recettes" />
          </div>
          <div
            className="w-2/3 flex flex-row justify-center items-center transform transition-transform duration-150 ease-in-out active:scale-95"
          >
            <img src={BubbleImg} className="h-16" alt="BubbleImg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sections;
