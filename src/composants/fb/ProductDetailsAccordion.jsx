import React, { useState, useRef } from "react";
import Draggable from "react-draggable";

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
const ProductDetailsAccordion = () => {
  const [openPanel, setOpenPanel] = useState(null);
  const [bubbleVisible] = useState(true); // Bulle toujours visible
  const [isOpen, setIsOpen] = useState(false);

  const disabledPanels = []; // Désactive les panneaux 2, 4 et 6
  const nodeRef = useRef(null);
  const isDraggingRef = useRef(false);

 
  const togglePanel = (panel) => {
    setOpenPanel(openPanel === panel ? null : panel);
  };

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
    <NutritionalInfo togglePanel={togglePanel} />,
    <IngredientsInfo />,
    <OriginsInfo />,
    <LabelsInfo />,
    <BrandInfo />,
    <UsageInfo />,
    <PackagingInfo />,
  ];

  return (
    <>
      <div
        className=" relative py-6"
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
                top: "50%",
                left: "75%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <img src={BubbleImg} alt="Bubble" className="w-16 h-auto" />
            </div>
          </Draggable>
        )}

        {[...Array(7)].map((_, index) => {
          const panel = index + 1;
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
            <div key={panel} className="pt-3 pb-2 border-b">
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
              {openPanel === panel && !isDisabled && (
                <div className="mt-2 ">{panelContents[panel - 1]}</div>
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
