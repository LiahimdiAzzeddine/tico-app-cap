import React from 'react';
import { IonIcon } from "@ionic/react";
import { chevronDown } from "ionicons/icons";

function LoadingStateFag() {
  // Simule un tableau d'éléments de chargement (ajustez la longueur selon vos besoins)
  const loadingItems = Array.from({ length: 5 }); // Par défaut, 5 éléments de chargement

  return (
    <div className="flex flex-col space-y-4 h-full px-4">
      {loadingItems.map((_, index) => (
        <div 
          key={index} 
          className="border-b border-custom-text-orange py-4 animate-pulse"
        >
          {/* Simule la ligne de question */}
          <div className="flex justify-between items-center cursor-pointer">
            <div className="w-5/6">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            </div>

            {/* Icône de flèche fixe */}
            <IonIcon icon={chevronDown} className="text-gray-400 text-xl" />
          </div>

          {/* Simule la réponse en cours de chargement */}
          <div className="mt-2 p-4 rounded-e-full bg-[#fff5d3] border border-yellow-300">
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingStateFag;
