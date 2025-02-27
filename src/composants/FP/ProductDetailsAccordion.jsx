import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import fleche from "../../assets/fb/flechBottom.svg";
import BubbleImg from "../../assets/fb/BubbleImg.svg"; // L'image Bubble
import NutritionalInfo from "./accordion/NutritionalInfo";
import OriginsInfo from "./accordion/OriginsInfo";
import IngredientsInfo from "./accordion/IngredientsInfo";
import LabelsInfo from "./accordion/LabelsInfo";
import BrandInfo from "./accordion/BrandInfo";
import UsageInfo from "./accordion/UsageInfo";
import PackagingInfo from "./accordion/PackagingInfo";
import { Solliciter } from "./Modal";
import { useAlert } from "../../context/AlertProvider";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useIonRouter } from "@ionic/react";
import { useGlobalContext } from "./GlobalProvider";

// Composants pour chaque contenu de panneau
const ProductDetailsAccordion = ({
  product,
  togglePanel,
  openPanel,
  targetRefNutriInfo,
  targetRefAdditifs,
  scrollToTarget,
}) => {
  const { setHasRequested,hasRequested,setIsCourager  } = useGlobalContext();

  const { triggerAlert } = useAlert();
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const history = useIonRouter();
  const goToPage = (path) => {
    history.push(path, "root", "replace");
  };
  const OpenContactSolliciter = () => {
    if (!isAuthenticated) {
      triggerAlert(
        "Se connecter pour encourager la marque",
        "Attention",
        () => {
          goToPage("/login");
        },
        "ios",
        "Se connecter"
      );
    } else {
      setIsCourager(true);
    }
  };

  const disabledPanels = [3, 4, 5, 6, 7, 8]; // Désactive les panneaux 2, 4 et 6

  const panelContents = [
    <NutritionalInfo
      togglePanel={togglePanel}
      product={product}
      scrollToTarget={scrollToTarget}
      targetRefNutriInfo={targetRefNutriInfo}
    />,
    <IngredientsInfo
      togglePanel={togglePanel}
      ingredients={product?.ingredients}
      allergenesArray={product?.allergens}
      additifsArray={product?.additifs}
      targetRefAdditifs={targetRefAdditifs}
      scrollToTarget={scrollToTarget}
    />,
    <></>, // Naturalité des ingrédients
    <OriginsInfo togglePanel={togglePanel} origin={product.origin} />,
    <LabelsInfo />,
    <BrandInfo />,
    <UsageInfo />,
    <PackagingInfo />,
  ];

  return (
    <>
      <div className="relative pb-6" style={{ position: "relative" }}>
        {[...Array(8)].map((_, index) => {
          const panel = index + 1;
          const panelref = index + 1 + "section";
          const title = [
            "Informations nutritionnelles",
            "Ingrédients, additifs",
            "Naturalité des ingrédients",
            "Origines",
            "Labels et mentions",
            "Produit & marque",
            "Utilisation et conservation",
            "Emballage",
          ][index];

          const isDisabled = disabledPanels.includes(panel);

          return (
            <div
              key={panel}
              className="pt-3"
              ref={
                panel === 1
                  ? targetRefNutriInfo
                  : panel == 2
                  ? targetRefAdditifs
                  : null
              }
            >
              <div className="relative">
                <button
                  onClick={() => !isDisabled && togglePanel(panel)}
                  className={`px-3 w-full flex justify-start items-center ArchivoExtraBold text-xl ${
                    isDisabled
                      ? "text-custom-gray cursor-not-allowed"
                      : openPanel === panel
                      ? "text-custom-blue"
                      : "text-custom-blue"
                  }`}
                  disabled={isDisabled}
                >
                  {title}
                  {!isDisabled && (
                    <img src={fleche} className="w-9 h-auto px-2" />
                  )}
                </button>
                {/* Positionner l'image BubbleImg au-dessus du titre */}
                {panel === 4 && (
                  <img
                    src={BubbleImg}
                    onClick={() => OpenContactSolliciter()}
                    alt="Bubble"
                    className={`absolute top-1/2 left-3/4 transform -translate-x-1/4 translate-y-[-50%] w-20 ${!hasRequested ? 'animate-pulse' : ''} scale-100 active:scale-105`}
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
              <div className="px-3 pt-1">
                <hr
                  className={`w-full mx-auto ${
                    isDisabled ? "border-gray-200" : "border-[#c6e8e5]"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
     
    </>
  );
};

export default ProductDetailsAccordion;
