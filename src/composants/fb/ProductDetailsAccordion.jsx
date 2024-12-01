import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { motion } from "framer-motion"; // Importation de Framer Motion

import fleche from "../../assets/fb/flechBottom.svg";
import BubbleImg from "../../assets/fb/BubbleImg.svg";
import NutritionalInfo from "./accordion/NutritionalInfo";
import OriginsInfo from "./accordion/OriginsInfo";
import IngredientsInfo from "./accordion/IngredientsInfo";
import LabelsInfo from "./accordion/LabelsInfo";
import BrandInfo from "./accordion/BrandInfo";
import UsageInfo from "./accordion/UsageInfo";
import PackagingInfo from "./accordion/PackagingInfo";
import { ContactModal } from "./Modal";

// Composants pour chaque contenu de panneau
const 
ProductDetailsAccordion = ({product,togglePanel,openPanel,targetRefNutriInfo}) => {
  const [bubbleVisible] = useState(false); // Bulle toujours visible
  const [isOpen, setIsOpen] = useState(false);

  const disabledPanels = [4,5,6,7]; // Désactive les panneaux 2, 4 et 6
  const nodeRef = useRef(null);
  const isDraggingRef = useRef(false);

  

  const onDrag = () => {
    isDraggingRef.current = true;
  };

  const onStop = () => {
    if (!isDraggingRef.current) {
      setIsOpen(true);
    }
    isDraggingRef.current = false;
  };

  const panelContents = [
    <NutritionalInfo togglePanel={togglePanel} product={product}/>,
    <IngredientsInfo togglePanel={togglePanel} ingredients={product?.ingredients} allergenesArray={product?.allergens} additifsArray={product?.additifs} />,
    <OriginsInfo togglePanel={togglePanel} origin={product.origin} />,
    <LabelsInfo />,
    <BrandInfo />,
    <UsageInfo />,
    <PackagingInfo />,
  ];

  // Calcul de la position de la bulle en fonction de l'état des panneaux
  const getBubblePosition = () => {
    if (openPanel === null) {
      // Si aucun panneau n'est ouvert, la bulle est au centre
      return { top: "50%", left: "75%" };
    }

    // Si un panneau est ouvert, on peut ajuster la position de la bulle (par exemple, la mettre plus bas ou à droite)
    return { top: "25%", left: "75%" }; // Position modifiée pour donner une distance avec le panneau
  };

  return (
    <>
      <div
        className="relative py-6"
        style={{ position: "relative" }} // Pour positionner la bulle
      >
        {bubbleVisible && (
          <Draggable
            nodeRef={nodeRef}
            bounds="parent"
            onStop={onStop}
            onDrag={onDrag}
          >
            <div
              ref={nodeRef}
              className="absolute z-50"
              style={{
                transform: "translate(-50%, -50%)",
                ...getBubblePosition(), // Applique la position calculée pour la bulle
              }}
            >
              <img src={BubbleImg} alt="Bubble" className="w-16 h-auto" />
            </div>
          </Draggable>
        )}

        {[...Array(7)].map((_, index) => {
          const panel = index + 1;
          const panelref = index + 1+"section";
          const title = [
            "Informations nutritionnelles",
            "Ingrédients, additifs",
            "Origines",
            "Labels et mentions",
            "le produit, La marque",
            "Utilisation et conservation",
            "L'emballage",
          ][index];

          const isDisabled = disabledPanels.includes(panel);

          return (
            <div key={panel} className="pt-3 pb-2 border-b" 
            ref={panel === 1 ? targetRefNutriInfo : null} >
              <button
                onClick={() => !isDisabled && togglePanel(panel)}
                className={`px-2 w-full flex justify-start items-center font-bold text-xl ${
                  isDisabled
                    ? "text-custom-gray cursor-not-allowed"
                    : openPanel === panel
                    ? "text-blue-800"
                    : "text-custom-blue"
                }`}
                disabled={isDisabled}
              >
                {title}{" "}
                {isDisabled ? (
                  ""
                ) : (
                  <img src={fleche} className="w-10 h-auto px-2" />
                )}
              </button>
              {/* Animation Framer Motion pour l'ouverture et la fermeture */}
              {openPanel === panel && !isDisabled && (
                <motion.div
                  className="mt-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {panelContents[panel - 1]}
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
      <ContactModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default ProductDetailsAccordion;
