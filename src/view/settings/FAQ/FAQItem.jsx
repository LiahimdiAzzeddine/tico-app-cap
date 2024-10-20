import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { chevronDown, chevronUp } from "ionicons/icons";
const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const highlightTiCO = (text) => {
      const parts = text.split(/(TiCO)/i);
      return parts.map((part, index) => 
        part.toLowerCase() === 'tico' ? (
          <strong key={index}>TiCO</strong>
        ) : (
          part
        )
      );
    };
  
    return (
      <div className="border-b border-blue-300 py-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="text-orange-400">{highlightTiCO(question)}</p>
          <IonIcon
            icon={isOpen ? chevronUp : chevronDown}
            className="text-blue-500"
          />
        </div>
        {isOpen && (
          <div 
            className="mt-2 text-gray-600 p-4 bg-yellow-200 rounded-e-full border border-yellow-300" 
            style={{ backgroundColor: '#FEEFB3' }} // Couleur de fond similaire à l'image
          >
            {highlightTiCO(answer)}
          </div>
        )}
      </div>
    );
  };
  export default FAQItem;