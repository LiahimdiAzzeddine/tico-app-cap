import React from "react";
import tico_intro from "../assets/intro/tico_intro.png";
import barcode from "../assets/intro/barcode.svg";
import background from "../assets/intro/background2.png";

function Intro2() {
  return (
    <div className="flex flex-col items-center justify-between bg-white min-h-screen w-full">
      {/* Logo Section */}
      <div className="grow flex items-end justify-center w-full pt-1">
        <img className="w-56" src={tico_intro} alt="TiCO Logo" />
      </div>

      <div className="grow flex items-center justify-start w-full max-w-sm  ">
        
        <div
          className="w-full max-w-sm aspect-square flex items-center justify-center bg-no-repeat bg-contain bg-center relative"
          style={{ backgroundImage: `url(${background})` }}
        >
          <img
          src={barcode}
          className="max-h-20 sm:max-h-24 mx-auto z-10 absolute top-[-2vh] left-0 right-0"
          alt="Barcode"
        />
          <div className="flex flex-col items-center justify-center w-4/5 gap-3 text-center">
            <div className="text-xl text-[#006aff] ">
              Scannez vos produits et accédez à des informations claires et
              utiles.
            </div>
            <div className="text-lg text-[#006aff]">
              <div className="font-bold text-xl">Ensemble,</div> encourageons plus de
              transparence et des pratiques responsables. 🌍✨
            </div>
          </div>
        </div>
      </div>
      {/* Empty div for spacing */}
      <div className="grow min-h-[8vh]"></div>
    </div>
  );
}

export default Intro2;
