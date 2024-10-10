import React from "react";
import tico_intro from "../assets/intro/tico_intro.png";

function Intro5() {
  return (
    <div className="flex flex-col items-center justify-start  min-h-screen w-full relative">
      {/* Section Image */}
      <div className="text-center flex flex-col h-[30vh] justify-end z-10">
        <img className="w-52 sm:w-64" src={tico_intro} alt="Image Top" />
      </div>

      {/* Section Texte et Code-Barres avec SVG */}
      <div className="flex flex-col justify-center items-center h-[60vh] sm:h-[55vh] relative z-10">
        {/* SVG en arrière-plan */}
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "80%",
            height: "80%",
            transform: "translate(-50%, -50%)",
            zIndex: 0,
          }}
        >
          <path
            fill="#FF0066"
            d="M38.7,-69.1C50.1,-60.4,59.4,-50,68.5,-38.2C77.7,-26.4,86.9,-13.2,88.9,1.2C91,15.6,85.9,31.1,76.8,43C67.7,54.9,54.5,63.2,41,68C27.5,72.9,13.8,74.2,-0.4,74.9C-14.6,75.7,-29.2,75.7,-41.2,70C-53.2,64.4,-62.6,53,-68.7,40.3C-74.8,27.7,-77.7,13.9,-78.9,-0.7C-80.1,-15.2,-79.6,-30.5,-73.2,-42.6C-66.8,-54.7,-54.3,-63.6,-41.1,-71.2C-27.9,-78.8,-14,-85.1,-0.2,-84.8C13.6,-84.5,27.3,-77.7,38.7,-69.1Z"
            transform="translate(100 100)"
          />
        </svg>

        <div className="flex flex-col justify-center items-center w-full p-4 sm:pb-6 pb-8 relative z-10">
          <div className="w-full max-w-md p-6 sm:p-8 rounded-lg shadow-md">
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

export default Intro5;
