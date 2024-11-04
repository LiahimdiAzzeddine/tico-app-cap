import React from "react";
import produoitFleche from "../../assets/home/produitFleche.png";

const Item = ({ product, index, length }) => {
    if (!product) {
      return null;
    }
  return (
    <div key={index}>
      <div className="flex items-center p-2">
        <img
          src={product.image}
          alt={product.title}
          className="w-16 h-16 mr-4 rounded"
        />
        <div className="flex-grow">
          <p className="text-orange-500 font-semibold text-lg">
            {product.title}
          </p>
          <p className="text-gray-600">{product.brand}</p>
        </div>
        <button className="">
          <img src={produoitFleche} alt="Tico" className="h-12" />
        </button>
      </div>
      {index < length - 1 && (
        <hr className="border-t-2 border-blue-400 my-4" />
      )}
    </div>
  );
}

export default Item;
