import React from "react";
import produitFleche from "../../../assets/recettes/recipeFleche.svg";
import productBg from "../../../assets/history/productBg.svg";
import image64 from "../../../assets/history/64.png";

// Optional: Default image if loading fails
const defaultImage = image64;

const Item = ({ recipe, index, length, OpenFb }) => {
  if (!recipe) {
    return null;
  }

  return (
    <div key={index}>
      <div className="flex items-center py-4">
        {/* Product image */}
        <div
          className="w-20 h-20 mr-4 rounded-xl overflow-hidden flex-shrink-0 border-red-500 border-2"
          style={{
            backgroundImage: `url(${productBg})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        >
          <img
            src={recipe.image || defaultImage} // Use default image if product.image is missing
            alt={recipe.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = defaultImage;
            }}
          />
        </div>

        {/* Product details */}
        <div className="flex-1">
          <div className="font-bold text-custom-red text-lg">{recipe.title}</div>
          <div className="text-gray-500">{recipe?.subtitle?.substring(0, 30) + "..."  || 'N/A'}</div>
        </div>

        {/* Arrow button */}
        <button onClick={() => OpenFb(recipe)}>
          <img src={produitFleche} alt="flèche" className="w-8 h-8 ml-4" />
        </button>
      </div>

      {index < length - 1 && (
        <hr className="w-full border-t border-gray-300 mt-4" />
      )}
    </div>
  );
};

export default Item;
