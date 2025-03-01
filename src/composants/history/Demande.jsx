import React from "react";
import { searchOutline, trashOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import productBg from "../../assets/history/productBg.svg";
import image64 from "../../assets/history/64.png";
import formatDate from "../../utils/formatDate";

const defaultImage = image64; // Image par défaut

const Demande = ({ product, index, length}) => {
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
        <div className="flex-1  leading-archivo">
        <div className="text-gray-500  leading-archivo">{formatDate(product.created_at)}</div>
          <div className="font-bold text-green-600 text-lg  leading-archivo">{product.titre}</div>
          <div className="text-gray-500 leading-archivo">{product.marque}</div>
        </div>

        {/* Icône de recherche */}
        
      </div>
      {index < length - 1 && (
        <hr className="w-full border-t border-green-600 mt-4" />
      )}
    </div>
  );
};

export default Demande;
