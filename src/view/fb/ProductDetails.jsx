import React, { useState } from "react";
import BubbleImg from "../../assets/fb/BubbleImg.svg";
import testImage from "../../assets/fb/testImage.png";
import Nutriscore from "../../assets/fb/score/NutriscoreA.png";
import Additif from "../../assets/fb/additifs.svg";
import planetScore from "../../assets/fb/planet-scora-a.png";
import plus from "../../assets/fb/plus.svg";
import {ContactModal,ContactAdditif} from "./Modal"

function ProductDetails() {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenadd, setIsOpenadd] = useState(false);

  const handleZoom = () => {
    setIsZoomed(true);
  };

  const closeZoom = () => {
    setIsZoomed(false);
  };
  return (
    <>
    <div className="flex flex-row gap-4 px-4">
      {/* Left Section */}
      <div className="flex flex-col items-center justify-center w-1/2 relative">
        {/* Bubble Icon */}
        <div className="absolute top-1 left-0 z-10 transform translate-x-[15%]">
          <img src={BubbleImg} alt="Bubble text icon" className="w-auto h-16" onClick={() => setIsOpen(true)} />
        </div>
        {/* Product Image */}
        <div className="relative z-0">
          <img
            src={testImage}
            alt="Tomato Concentrate Tube"
            className="w-full h-auto object-cover cursor-pointer"
            onClick={handleZoom}
          />
        </div>

        {/* Modal Fullscreen View */}
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
              src={testImage}
              alt="Zoomed Tomato Concentrate Tube"
              className="w-full h-auto max-h-full object-contain"
            />
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-center justify-center w-1/2 bg-[#ecf8f8] rounded-3xl p-4">
        {/* Nutri-Score and Additives */}
        <div className="flex flex-row w-full justify-between items-center mb-4">
          <div className="flex flex-col items-center w-1/2">
            <img
              src={Nutriscore}
              alt="Nutri-Score"
              className="w-10 sm:w-16 h-auto"
            />
          </div>
          <div className="flex flex-col w-1/2 items-center text-center" onClick={() => setIsOpenadd(true)}>
            <div className="text-gl text-custom-blue font-bold">ADDITIFS</div>
            <div className="flex flex-row items-end space-x-1 sm:space-x-2 mt-1">
              <span className="text-custom-blue font-bold text-gl">+2</span>
              <img
                src={Additif}
                alt="Additives"
                className="w-8 sm:w-12 h-auto"
              />
            </div>
          </div>
        </div>

        {/* Planet Score */}
        <div className="w-full mb-4">
          <img src={planetScore} alt="Planet Score" className="w-full h-auto" />
        </div>

        {/* Plus Icon */}
        <div className="w-full flex justify-end">
          <img src={plus} alt="Plus Icon" className="w-6 sm:w-10 h-auto" />
        </div>
      </div>
    </div>
    <ContactModal isOpen={isOpen} setIsOpen={setIsOpen}/>
    <ContactAdditif isOpen={isOpenadd} setIsOpen={setIsOpenadd} />
    </>
  );
}

export default ProductDetails;
