import React from "react";
import BubbleImg from "../../assets/fb/BubbleImg.svg";
import testImage from "../../assets/fb/testImage.png";
function ProductDetails() {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col items-center justify-center w-1/2">
        {/* Bulles de texte */}
        <div className="relative w-1/2 md:w-1/3">
          <img
            src={BubbleImg}
            alt="Bulles de texte"
            className="w-full h-auto"
          />
        </div>
        {/* Tube de concentré de tomates */}
        <div className="relative w-3/4 md:w-1/2 -mt-5">
          <img
            src={testImage}
            alt="Tube de concentré de tomates"
            className="w-full h-auto"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-1/2 bg-[#ecf8f8] min-h-96">

      </div>
    </div>
  );
}

export default ProductDetails;
