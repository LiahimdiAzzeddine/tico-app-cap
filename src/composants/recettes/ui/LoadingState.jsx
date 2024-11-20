import React from 'react';
import { IonIcon } from "@ionic/react";
import { chevronDown, chevronUp } from "ionicons/icons";

function LoadingState() {
  // Simule un tableau d'éléments de chargement (ajustez la longueur selon vos besoins)
  const loadingItems = Array.from({ length: 5 }); // 5 questions à charger, ajustez si nécessaire

  return (
    <div className="flex flex-col space-y-4 h-full px-4">
      {loadingItems.map((_, index) => (
        <div key={index} className="border-b border-custom-text-orange py-4 animate-pulse">
          <div className="flex justify-between items-center cursor-pointer">
            <div className="w-5/6">
              {/* Simule la question avec un texte animé */}
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            </div>

            {/* Simule l'icône de flèche */}
            <IonIcon icon={chevronDown} className="text-gray-400 text-xl" />
          </div>

          {/* Simule la réponse cachée avec un fond animé */}
          <div className="mt-2 p-4 rounded-e-full text-[#1a5b90] bg-[#fff5d3] border border-yellow-300">
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingState;
