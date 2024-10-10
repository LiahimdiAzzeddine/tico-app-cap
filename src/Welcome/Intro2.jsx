import React from "react";
import tico_intro from "../assets/intro/tico_intro.png";
import barcode from "../assets/intro/barcode.svg";

function Intro2() {
  return (
    <div className="flex flex-col items-center justify-start bg-white min-h-screen w-full">
      {/* Section Image */}
      <div className="text-center flex flex-col h-[30vh] justify-end z-50">
        <img className="w-52 sm:w-64" src={tico_intro} alt="Tico Intro" />
      </div>
      {/* Section Texte et Code-Barres */}
      <div className="flex flex-col justify-center items-center h-[60vh] sm:h-[55vh]">
        {/* Image du code-barres avec une marge négative pour le chevauchement */}
        <img
          src={barcode}
          className="max-h-16 sm:max-h-20 mx-auto mb-[-2.5rem] z-10"
          alt="Barcode"
        />
        <div className="flex flex-col justify-center items-center w-full p-4 sm:pb-6 pb-8">
          <div className="blob w-full max-w-md p-6 sm:p-8 rounded-lg shadow-md">
            <div className="introText text-center flex flex-col gap-y-4 sm:gap-y-2 px-4 py-6 sm:py-8">
              <div className="text-lg sm:text-xl text-[#006aff]">
                Scannez vos produits et accédez à des informations claires et utiles.
              </div>
              <div className="text-lg sm:text-xl text-[#006aff]">
                <span className="font-bold">Ensemble,</span> encourageons plus de transparence et des pratiques responsables. 🌍✨
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro2;
