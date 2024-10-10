import React from "react";
import tico_intro from "../assets/intro/tico_intro.png";

function Intro3() {
  return (
    <div className="flex flex-col items-center justify-start bg-white min-h-screen w-full">
      {/* Section Image */}
      <div className="text-center flex flex-col h-[30vh] justify-end z-50">
        <img className="w-52 sm:w-64" src={tico_intro} alt="Tico Intro" />
      </div>
      {/* Section Texte */}
      <div className="flex flex-col justify-center items-center w-full h-[60vh] sm:h-[55vh] p-4 sm:pb-6 pb-8">
        <div className="blob w-full max-w-md p-6 sm:p-8rounded-lg shadow-md">
          <div className="introText text-center flex flex-col gap-y-4 sm:gap-y-2 px-4 py-6 sm:py-8">
            <div className="text-lg sm:text-xl text-[#006aff]">
              <span className="font-bold">Tico</span>, c'est aussi un allié au
              quotidien&nbsp;!
            </div>
            <div className="text-lg sm:text-xl text-[#006aff]">
              Découvrez des astuces pour cuisiner sainement et des recettes pour{" "}
              <span className="font-bold">
                prendre soin de vous et de la planète.🌿
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro3;
