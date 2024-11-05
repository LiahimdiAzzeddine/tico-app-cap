import React from "react";
import produitFleche from "../../assets/history/productFlech.svg";
import productBg from "../../assets/history/productBg.svg"

// Optionnel : Image par défaut en cas d'échec du chargement
const defaultImage = "https://via.placeholder.com/64"; // Changez l'URL selon vos besoins

const Item = ({ product, index, length }) => {
  if (!product) {
    return null;
  }

  return (
    <div key={index}>
      <div className="flex items-center py-4">
      {/* Image du produit */}
     
      <div className="w-16 h-16 mr-4 rounded flex flex-col justify-center items-center   bg-no-repeat bg-contain bg-center m-auto" style={{
            backgroundImage: `url(${productBg})`,
          }}>
        <img
          src={product.image || defaultImage} // Utiliser une image par défaut si product.image est vide
          alt={product.title}
          className="w-auto h-16 mr-4 rounded object-cover m-auto" // Ajout de "object-cover" pour garder le ratio
          onError={(e) => {
            e.target.onerror = null; // Éviter une boucle infinie
            e.target.src = defaultImage; // Image par défaut en cas d'erreur
          }}
        />
      </div>
      

      {/* Détails du produit */}
      <div className="flex-1">
        <div className="font-bold text-green-600 text-lg">{product.title}</div>
        <div className="text-gray-500">{product.brand}</div>
      </div>

      {/* Flèche */}
      <img
        src={produitFleche}
        alt="flèche"
        className="w-10 h-10 ml-auto"
      />
    </div>
      {index < length - 1 && (
                <hr className="w-full border-t border-green-600 mt-4" />

      )}
    </div>
  );
};

export default Item;
