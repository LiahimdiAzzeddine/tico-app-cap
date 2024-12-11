import React, { useState, useRef } from "react";
import { motion } from "framer-motion"; 
import fleche from "../../assets/fb/flechBottom.svg";
import BubbleImg from "../../assets/fb/BubbleImg.svg";  // L'image Bubble
import NutritionalInfo from "./accordion/NutritionalInfo";
import OriginsInfo from "./accordion/OriginsInfo";
import IngredientsInfo from "./accordion/IngredientsInfo";
import LabelsInfo from "./accordion/LabelsInfo";
import BrandInfo from "./accordion/BrandInfo";
import UsageInfo from "./accordion/UsageInfo";
import PackagingInfo from "./accordion/PackagingInfo";
import { ContactModal } from "./Modal";

// Composants pour chaque contenu de panneau
const ProductDetailsAccordion = ({ product, togglePanel, openPanel, targetRefNutriInfo,targetRefAdditifs,scrollToTarget }) => {
  const [isOpen, setIsOpen] = useState(false);

  const disabledPanels = [3, 4, 5, 6, 7, 8]; // Désactive les panneaux 2, 4 et 6

  const panelContents = [
    <NutritionalInfo togglePanel={togglePanel} product={product} scrollToTarget={scrollToTarget} targetRefNutriInfo={targetRefNutriInfo} />,
    <IngredientsInfo togglePanel={togglePanel} ingredients={product?.ingredients} allergenesArray={product?.allergens} additifsArray={product?.additifs}  targetRefAdditifs={targetRefAdditifs} scrollToTarget={scrollToTarget} />,
    <></>, // Naturalité des ingrédients
    <OriginsInfo togglePanel={togglePanel} origin={product.origin} />,
    <LabelsInfo />,
    <BrandInfo />,
    <UsageInfo />,
    <PackagingInfo />,
  ];

  return (
    <>
      <div className="relative py-6" style={{ position: "relative" }}>
        {[...Array(8)].map((_, index) => {
          const panel = index + 1;
          const panelref = index + 1 + "section";
          const title = [
            "Informations nutritionnelles",
            "Ingrédients, additifs",
            "Naturalité des ingrédients",
            "Origines",
            "Labels et mentions",
            "le produit, La marque",
            "Utilisation et conservation",
            "L'emballage",
          ][index];

          const isDisabled = disabledPanels.includes(panel);

          return (
            <div key={panel} className="pt-3 pb-2 border-b" ref={panel === 1 ? targetRefNutriInfo : panel==2 ?targetRefAdditifs:null}>
              <div className="relative">
                <button
                  onClick={() => !isDisabled && togglePanel(panel)}
                  className={`px-2 w-full flex justify-start items-center font-bold text-xl ${
                    isDisabled
                      ? "text-custom-gray cursor-not-allowed"
                      : openPanel === panel
                      ? "text-custom-blue"
                      : "text-custom-blue"
                  }`}
                  disabled={isDisabled}
                >
                  {title}
                  {!isDisabled && <img src={fleche} className="w-10 h-auto px-2" />}
                </button>
                {/* Positionner l'image BubbleImg au-dessus du titre */}
                {panel === 4 && (
                  <img
                    src={BubbleImg}
                    onClick={() => setIsOpen(true)}
                    alt="Bubble"
                    className="absolute top-1/2 left-3/4 transform -translate-x-1/4 translate-y-[-50%] w-20"
                  />
                )}
              </div>
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
      <ContactModal isOpen={isOpen} setIsOpen={setIsOpen} gtin={product?.gtin} productName={product?.name} />
    </>
  );
};

export default ProductDetailsAccordion;
