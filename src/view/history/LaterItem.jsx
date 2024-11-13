import React from "react";
import { searchOutline, trashOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import productBg from "../../assets/history/productBg.svg";
import image64 from "../../assets/history/64.png";

const defaultImage = image64; // Image par défaut

const LaterItem = ({ product, index, length, OpenFb, onDelete }) => {
  if (!product) {
    return null;
  }

  return (
    <div key={index}>
      <div className="flex items-center py-4">
        {/* Image du produit */}
        <div
          className="w-16 h-16 mr-4 rounded flex flex-col justify-center items-center bg-no-repeat bg-contain bg-center m-auto"
          style={{ backgroundImage: `url(${productBg})` }}
        >
          <img
            src={product.image || defaultImage}
            alt={product.gtin}
            className="w-auto h-16 mr-4 rounded object-cover m-auto"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultImage;
            }}
            style={{ margin: "auto" }}
          />
        </div>

        {/* Détails du produit */}
        <div className="flex-1">
          <div className="font-bold text-green-600 text-lg">{product.gtin}</div>
          <div className="text-gray-500">{product.name}</div>
        </div>

        {/* Icône de recherche */}
        <button onClick={() => OpenFb(product.gtin)} className="ml-4 p-2 text-blue-500 hover:text-blue-700">
          <IonIcon icon={searchOutline} className="w-6 h-6" />
        </button>

        {/* Bouton de suppression avec icône */}
        <button onClick={() => onDelete(product.gtin)} className="ml-4 p-2 text-red-500 hover:text-red-700">
          <IonIcon icon={trashOutline} className="w-6 h-6" />
        </button>
      </div>
      {index < length - 1 && (
        <hr className="w-full border-t border-green-600 mt-4" />
      )}
    </div>
  );
};

export default LaterItem;
