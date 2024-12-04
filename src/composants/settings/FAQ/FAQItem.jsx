import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { chevronDown, chevronUp } from "ionicons/icons";
const FAQItem = ({ question, answer,index, length }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const highlightTiCO = (text) => {
      // On divise le texte en morceaux, en utilisant une expression régulière pour isoler "TiCO"
      const parts = text.split(/(TiCO)/i);
      const highlightedText = parts.map((part, index) => 
        // Si le mot est "TiCO", on le met en gras
        part.toLowerCase() === 'tico' ? (
          `<strong key="${index}">TiCO</strong>`
        ) : (
          part
        )
      ).join('');  // On assemble les morceaux après transformation
      
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
            className="text-blue-500 text-xl"
          />
        </div>
        {isOpen && (
          <div 
            className="my-2 p-4 rounded-e-[5rem] w-[99%] bg-[#fff5d3] border-y border-r border-yellow-200 " 
          
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