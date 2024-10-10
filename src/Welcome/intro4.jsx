import React from "react";
import tico_intro from "../assets/intro/tico_intro.png";

function Intro4() {
  return (
    <div className="flex flex-col items-center justify-start bg-white min-h-screen w-full">
      {/* Section Image */}
      <div className="text-center flex flex-col h-[30vh] justify-end z-50">
        <img className="w-52 sm:w-64" src={tico_intro} alt="Tico Intro" />
      </div>

      {/* Section Texte */}
      <div className="flex flex-col justify-center items-center w-full h-[60vh] sm:h-[55vh] p-4 sm:pb-4 pb-6 mt-[-2rem]">
        <div className="blob w-full max-w-md p-6 sm:p-8 rounded-lg shadow-md">
          <div className="introText text-center flex flex-col gap-y-4 sm:gap-y-2 px-4 py-6 sm:py-8">
            <h2 className="text-2xl font-bold text-[#006aff] mb-2">
              Prêt à
              <span className="text-2xl underline underline-offset-4 decoration-orange-400">
                commencer
              </span>
              ?
            </h2>
            <div className="text-lg sm:text-xl text-[#006aff]">
              Scannez votre premier produit, explorez nos recettes, et
              participez à rendre l'alimentation
              <span className="font-bold">plus transparente et durable !</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro4;
