import React, { useState } from "react";
import Partage from "../../assets/fb/top.svg";
import Recettes from "../../assets/fb/recettes.svg"; // Correction de la casse
import BubbleImg from "../../assets/fb/BubbleImg.svg";
import { Share } from "@capacitor/share";
import { ContactModal } from "./Modal";
import { useGlobalContext } from "./GlobalProvider";
import { motion } from "framer-motion";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Sections({ scrollToTarget, targetRefRecettes, gtin, productName }) {
  const [isOpen, setIsOpen] = useState(false);
  const { setHasRequested, hasRequested } = useGlobalContext();

  // Fonction de partage
  const handleShare = async () => {
    try {
      await Share.share({
        title: "Découvrez cette fiche produit",
        text: "Découvrez les informations nutritionnelles et d'autres détails sur ce produit.", // Ajout d'un texte de description
        url: backendUrl + "/tico/fp/" + gtin, // Assurez-vous que cette URL est accessible
        dialogTitle: "Fiche produit",
      });
    } catch (error) {
      console.error("Erreur lors du partage:", error);
    }
  };
  const scrollRecettes = () => {
    scrollToTarget(targetRefRecettes);
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center px-6">
        <div className="bg-[#b6e1dd] rounded-full w-full px-4 py-4 shadow-xl">
          <div className="flex flex-row">
            <button
              onClick={handleShare}
              className="w-2/3 flex flex-row justify-center items-center transform transition-transform duration-150 ease-in-out active:scale-95"
            >
              <motion.img src={Partage} className="h-12 cursor-pointer" alt="Partage" />
            </button>
            <div
              onClick={() => scrollRecettes()}
              className="w-2/3 flex flex-row justify-center items-center transform transition-transform duration-150 ease-in-out active:scale-95"
            >
              <motion.img src={Recettes} className="h-12 cursor-pointer" alt="Recettes" />
            </div>

            <div
              className="w-2/3 flex flex-row justify-center items-center transform transition-transform duration-150 ease-in-out active:scale-95"
              onClick={() => setIsOpen(true)}
            >
              <motion.img
                src={BubbleImg}
                className="h-12 cursor-pointer"
                alt="BubbleImg"
              />
            </div>
          </div>
        </div>
      </div>
      <ContactModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        gtin={gtin}
        productName={productName}
      />
    </>
  );
}

export default Sections;
