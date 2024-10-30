import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import fleche from "../../assets/fb/flechBottom.svg";
import BubbleImg from "../../assets/fb/BubbleImg.svg";

const ProductDetailsAccordion = () => {
    const [openPanel, setOpenPanel] = useState(null);
    const [bubbleVisible, setBubbleVisible] = useState(false);
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);

    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'right-start', // Utilise right-start pour un alignement partiel à droite
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [-40, -75], // Ajuste la position [x, y] pour un placement partiel
                },
            },
            {
                name: 'preventOverflow',
                options: {
                    boundary: 'clippingParents',
                    altAxis: true,
                    padding: 10, // Ajoute un padding pour éviter de coller aux bords
                },
            },
            {
                name: 'flip',
                options: {
                    fallbackPlacements: ['left-start'], // Bascule à gauche si pas assez d'espace à droite
                },
            },
            {
                name: 'computeStyles',
                options: {
                    gpuAcceleration: true, // Améliore les performances
                },
            },
        ],
    });

    const togglePanel = (panel, event) => {
        const isOpen = openPanel === panel;
        setOpenPanel(isOpen ? null : panel);
        
        if (!isOpen) {
            setReferenceElement(event.currentTarget);
            setBubbleVisible(true);
        } else {
            setBubbleVisible(false);
        }
    };

    return (
        <div className="border-b border-gray-200 divide-y divide-gray-200 px-4 relative">
            {bubbleVisible && (
                <div
                    ref={setPopperElement}
                    style={{
                        ...styles.popper,
                        zIndex: 10,
                    }}
                    {...attributes.popper}
                >
                    <img
                        src={BubbleImg}
                        alt="Bubble"
                        className="w-16 h-auto"
                        style={{ pointerEvents: 'none' }}
                    />
                </div>
            )}

            {[...Array(9)].map((_, index) => {
                const panel = index + 1;
                let title;
                switch(panel) {
                    case 1: title = "Scores"; break;
                    case 2: title = "Informations nutritionnelles"; break;
                    case 3: title = "Degré de transformation"; break;
                    case 4: title = "Origines"; break;
                    case 5: title = "Ingrédients, additifs"; break;
                    case 6: title = "Labels et mentions"; break;
                    case 7: title = "La marque et le produit"; break;
                    case 8: title = "Utilisation et conservation"; break;
                    case 9: title = "L'emballage"; break;
                    default: title = "";
                }

                return (
                    <div key={panel} className="pt-4 pb-2">
                        <button
                            onClick={(event) => togglePanel(panel, event)}
                            className={`w-full flex justify-start items-center font-bold text-xl ${
                                openPanel === panel ? 'text-custom-gray' : 'text-custom-blue'
                            }`}
                        >
                            {title} <img src={fleche} className="w-10 h-auto px-2" />
                        </button>
                        {openPanel === panel && <div className="mt-2 text-custom-gray"></div>}
                    </div>
                );
            })}
        </div>
    );
};

export default ProductDetailsAccordion;