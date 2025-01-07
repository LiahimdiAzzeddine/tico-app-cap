import React, { useState } from "react";
import productDeffaultImg from "../../assets/history/64.png";
function NameProduct(props) {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoom = () => {
    setIsZoomed(true);
  };

  const closeZoom = () => {
    setIsZoomed(false);
  };

  return (
    <div>
      <div className="flex flex-row justify-center pb-6 px-4 space-x-10">
        {/* Ajout de l'image */}
        <div className="max-w-28 max-h-32 w-auto h-auto flex flex-col justify-center items-center">
          <img
            src={props.ImageSrc ? props.ImageSrc : productDeffaultImg}
            alt={`${props.Name} - ${props.Brand}`}
            className="max-w-28 max-h-32 w-auto h-auto   object-cover cursor-pointer"
            onClick={handleZoom}
          />
        </div>
        <div className="flex flex-col justify-around space-y-1">
          <div>
            <span className="text-xl titre-roboto-bold text-[#0f548d] ArchivoBold leading-archivo">{props.Name}</span><br></br>
            <span className="text-sm text-[#42a29a] leading-archivo ArchivoBold">{props.Brand}</span>
          </div>
          
          <div className="text-sm text-[#42a29a] font-bold ArchivoBoldItalique">
            Produit {(Number(props.Transparent) + 1) * 10}% transparent {Number(props.Transparent)==9?"!":""}
          </div>
        </div>
      </div>
      {/* Modal Fullscreen View */}
      <div className="relative">
        {isZoomed && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
            {/* Close Button */}
            <button
              onClick={closeZoom}
              className="absolute top-4 right-4 text-white text-2xl font-bold focus:outline-none"
            >
              &times;
            </button>
            {/* Fullscreen Image */}
            <img
              src={props.ImageSrc}
              alt="Zoomed Tomato Concentrate Tube"
              className="w-full h-auto max-h-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default NameProduct;
