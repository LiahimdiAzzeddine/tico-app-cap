import React from "react";
import BubbleImg from "../../assets/fb/BubbleImg.svg";
import testImage from "../../assets/fb/testImage.png";
import Nutriscore from "../../assets/fb/score/NutriscoreA.png";
import Additif from "../../assets/fb/additifs.svg";
import planetScore from "../../assets/fb/planet-scora-a.png";
import plus from "../../assets/fb/plus.png";

function ProductDetails() {
  return (
    <div className="flex flex-row gap-4 px-4">
      {/* Left Section */}
      <div className="flex flex-col items-center justify-center w-1/2 relative">
  {/* Bubble Icon */}
  <div className="absolute  top-1 z-10 transform -translate-x-3/4">
    <img src={BubbleImg} alt="Bubble text icon" className="w-14 h-14" />
  </div>
  {/* Product Image */}
  <div className="relative z-0">
    <img
      src={testImage}
      alt="Tomato Concentrate Tube"
      className="w-full h-auto object-cover"
    />
  </div>
</div>


      {/* Right Section */}
      <div className="flex flex-col items-center justify-center w-1/2 bg-[#ecf8f8] rounded-3xl p-4">
        {/* Nutri-Score and Additives */}
        <div className="flex flex-row w-full justify-between items-center mb-4">
          <div className="flex flex-col items-center w-1/2">
            <img src={Nutriscore} alt="Nutri-Score" className="rotate-90 w-full h-auto" />
          </div>
          <div className="flex flex-col w-1/2 items-center text-center">
            <div className="text-sm text-blue-500 font-bold">ADDITIFS</div>
            <div className="flex flex-row items-center space-x-2 mt-1">
              <span className="text-blue-500 font-bold">+2</span>
              <img src={Additif} alt="Additives" className="w-8 h-auto" />
            </div>
          </div>
        </div>

        {/* Planet Score */}
        <div className="w-full mb-4">
          <img src={planetScore} alt="Planet Score" className="w-full h-auto" />
        </div>

        {/* Plus Icon */}
        <div className="w-full flex justify-end">
          <img src={plus} alt="Plus Icon" className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
