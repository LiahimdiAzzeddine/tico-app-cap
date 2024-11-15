import React from 'react';

function LoadingState() {
  // Simule un tableau d'éléments de chargement (ajustez la longueur selon vos besoins)
  const loadingItems = Array.from({ length: 5 });

  return (
    <div className="flex flex-col space-y-4 h-full px-4">
      {loadingItems.map((_, index) => (
        <div key={index} className="flex items-center py-4 animate-pulse">
          {/* Simule l'image du produit */}
          <div
            className="w-20 h-20 mr-4 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200 border-gray-500 border-2"
          ></div>

          {/* Simule les détails du produit */}
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>

          {/* Simule le bouton de la flèche */}
          <div className="w-8 h-8 ml-4 bg-gray-200 rounded-full"></div>
        </div>
      ))}
    </div>
  );
}

export default LoadingState;
