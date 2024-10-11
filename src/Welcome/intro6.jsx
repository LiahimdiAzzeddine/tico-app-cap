import React from "react";
import tico_intro from "../assets/intro/tico_intro.png";
import background from "../assets/intro/background6.png";

const Intro6 = () => {
  return (
    <div className="flex flex-col items-center justify-between bg-white min-h-screen w-full">
      {/* Logo Section */}
      
      <div className="grow flex items-end justify-center w-full pt-1">
        <img className="w-56" src={tico_intro} alt="TiCO Logo" />
      </div>

      {/* Buttons Section with Background */}
      <div className="grow flex items-center justify-start w-full max-w-sm  px-2">
        <div
          className="w-full max-w-sm aspect-square flex items-center justify-center bg-no-repeat bg-contain bg-center"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="flex flex-col items-center justify-center w-2/3">
            <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-6 rounded-md mb-4 w-full transition-colors duration-300">
              Je crée mon compte
            </button>
            <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-6 rounded-md w-full transition-colors duration-300">
              J'utilise TiCO en <br/> tant qu'invité
            </button>
          </div>
        </div>
      </div>
      {/* Empty div for spacing */}
      <div className="grow min-h-[8vh]"></div>
    </div>
  );
};

export default Intro6;
