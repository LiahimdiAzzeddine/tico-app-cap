import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { chevronDown, chevronUp } from "ionicons/icons";
const FAQItem = ({ question, answer,index, length }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const highlightTiCO = (text) => {
      // Diviser le texte en morceaux, isolant "TiCO" avec une regex
      const parts = text.split(/(TiCO)/i);
    
      // Transformer les morceaux avec les styles spécifiques pour "TiCO"
      const highlightedText = parts.map((part, index) =>
        part.toLowerCase() === 'tico' ? (
          `<span key="${index}" class="pallybold leading-archivo">Ti<span class="tracking-tightest leading-archivo">CO</span></span>`
        ) : (
          part
        )
      ).join(''); // Réassembler le texte après transformation
    
      // Retourner le contenu avec dangerouslySetInnerHTML
      return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
    };
    
    
  
    return (
      <div className="">
        
        <div
          className="flex justify-between items-center cursor-pointer px-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-5/6">
            <p className="text-custom-blue text-lg">{highlightTiCO(question)}</p>
          </div>
          
          <IonIcon
            icon={isOpen ? chevronUp : chevronDown}
            className="text-custom-blue text-xl"
          />
        </div>
        {isOpen && (
          <div 
            className="my-2 p-4 rounded-e-[5rem] w-[96%] bg-[#fff5d3]  " 
          
          >
            <div className="text-[#1a5b90] w-11/12 text-sm">
            {highlightTiCO(answer)}
            </div>
          </div>
        )}
        {index < length - 1 ? (
        <div className="p-4">
          <hr className="w-full border-t border-custom-text-orange" />
        </div>):(<div className="p-4"></div>)}
         
      </div>
    );
  };
  export default FAQItem;