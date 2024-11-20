import React, { useState, useRef  } from 'react';
import Draggable from "react-draggable";

import fleche from "../../assets/fb/flechBottom.svg";
import BubbleImg from "../../assets/fb/BubbleImg.svg";
import Scores from "./accordion/Scores";
import NutritionalInfo from "./accordion/NutritionalInfo";
import OriginsInfo from './accordion/OriginsInfo';
import IngredientsInfo from './accordion/IngredientsInfo';
import LabelsInfo from './accordion/LabelsInfo';
import BrandInfo from './accordion/BrandInfo';
import UsageInfo from './accordion/UsageInfo';
import PackagingInfo from './accordion/PackagingInfo';
import {ContactModal} from "./Modal"


// Composants pour chaque contenu de panneau
const ProductDetailsAccordion = () => {
    const [openPanel, setOpenPanel] = useState(null);
    const [bubbleVisible] = useState(true); // Bulle toujours visible
    const [isOpen, setIsOpen] = useState(false);

    const disabledPanels = [3, 5, 6,7,8]; // Désactive les panneaux 2, 4 et 6
    const nodeRef = useRef(null);
    const isDraggingRef = useRef(false);


    const panelContents = [
        <Scores />,
        <NutritionalInfo />,
        <OriginsInfo/>,
        <IngredientsInfo />,
        <LabelsInfo />,
        <BrandInfo />,
        <UsageInfo />,
        <PackagingInfo />
    ];

    const togglePanel = (panel) => {
        setOpenPanel(openPanel === panel ? null : panel);
    };
 
    const onDrag = () => {
        isDraggingRef.current = true;
      };
    
      const onStop = () => {
        
        if (!isDraggingRef.current) {
            console.log("Bubble image clicked!");
            setIsOpen(true)
        }
        isDraggingRef.current = false;
      };

    return (
        <>
        <div
            className="border-b border-gray-200 divide-y divide-custom-green-divider relative"
            style={{ position: 'relative' }} // Pour positionner la bulle
        >
            {bubbleVisible && (
                
                <Draggable nodeRef={nodeRef} bounds="parent" onStop={onStop} onDrag={onDrag}>
                <div
                
                ref={nodeRef}
                    className="absolute z-50"
                    style={{
                        top: '50%',
                        left: '75%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <img src={BubbleImg} alt="Bubble" className="w-16 h-auto" />
                </div>
            </Draggable>
            )}

            {[...Array(8)].map((_, index) => {
                const panel = index + 1;
                const title = [
                    "Scores",
                    "Informations nutritionnelles",
                    "Origines",
                    "Ingrédients, additifs",
                    "Labels et mentions",
                    "La marque et le produit",
                    "Utilisation et conservation",
                    "L'emballage"
                ][index];

                const isDisabled = disabledPanels.includes(panel);

                return (
                    <div key={panel} className="pt-3 pb-1">
                        <button
                            onClick={() => !isDisabled && togglePanel(panel)}
                            className={`px-4 w-full flex justify-start items-center font-bold text-xl ${isDisabled ? 'text-custom-gray cursor-not-allowed' : (openPanel === panel ? 'text-blue-800' : 'text-custom-blue')}`}
                            disabled={isDisabled}
                        >
                            {title} {isDisabled ? '':<img src={fleche} className="w-10 h-auto px-2" />}
                        </button>
                        {openPanel === panel && !isDisabled && (
                            <div className="mt-2 ">
                                {panelContents[panel - 1]}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
        <ContactModal isOpen={isOpen} setIsOpen={setIsOpen}/>

        </>
    );
};

export default ProductDetailsAccordion;
