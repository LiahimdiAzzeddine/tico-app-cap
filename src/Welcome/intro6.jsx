import React from "react";
import tico_intro from "../assets/intro/tico_intro.png";

function Intro6() {
  return (
    <div className="flex flex-col items-center justify-start bg-white min-h-screen w-full">
      {/* Logo Section */}
      <div className="text-center flex flex-col h-[30vh] justify-end z-50">
        <img className="sm:w-48 w-60" src={tico_intro} alt="Tico Intro" />
      </div>

      {/* Blob and Buttons Section */}
      <div className="h-[60vh] flex flex-col justify-center sm:pb-5 pb-8 px-5">
        <div className="sm:sm:w-auto sm:m-auto sm:h-auto w-[90vw]">
          <div className="blob introText text-center flex flex-col items-center lg:gap-y-4 gap-y-4 px-8 py-16 ">
            {/* Button to create an account */}
            <button class="bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded transition-colors ">
              Je crée mon compte
            </button>

            {/* Button to use as a guest */}
            <button class="bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded transition-colors">
              J’utilise TiCO en tant qu’invité
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro6;
