import React from "react";

function LoadingFbState() {
  // Simule un tableau d'éléments de chargement (ajustez la longueur selon vos besoins)
  return (
    <div className="flex flex-col space-y-1 h-full px-4">
      <div className="h-10 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="flex items-center py-4 animate-pulse">
        {/* Simule l'image du produit */}
        <div className="w-28 h-24 mr-4 rounded-lg overflow-hidden flex justify-start items-start flex-shrink-0 bg-gray-200"></div>

        {/* Simule les détails du produit */}
        <div className="flex-1 flex space-y-6 justify-start items-start flex-col">
          <div className="h-8 bg-gray-200 rounded w-full"></div>
          <div className="h-6 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
      <div className="h-96 bg-gray-200 rounded w-full"></div>
    </div>
  );
}

export default LoadingFbState;
