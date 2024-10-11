import React from "react";
import tico_intro from "../assets/intro/tico_intro.png";
import plusIcon from "../assets/intro/plus.png";
import background from "../assets/intro/background.svg";

function Intro1() {
  return (
    <div className="flex flex-col items-center justify-between bg-white min-h-screen w-full">
      {/* Logo Section */}
      
      <div className="grow flex items-end justify-center w-full pt-1">
        <img className="w-56" src={tico_intro} alt="TiCO Logo" />
      </div>
      <div className="grow flex items-center justify-start w-full max-w-sm">
        <div
          className="w-full max-w-sm aspect-square flex items-center justify-center bg-no-repeat bg-contain bg-center"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="flex flex-col items-center justify-center w-2/3 text-center gap-4">
            <h2 className="text-2xl font-bold text-[#006aff] underline underline-offset-4 decoration-orange-400">
              Bienvenue !
            </h2>
            <div className="text-xl sm:text-xl text-[#006aff]">
              <span className="font-bold">TiCO</span> vous accompagne vers une
              alimentation
            </div>
            {/* Liste des caractéristiques */}
            <div className="flex flex-col w-full items-center">
              <ul className="list-none p-0 w-11/12 sm:w-5/6">
                {["simple", "transparente", "responsable 🌱"].map(
                  (item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-start text-xl sm:text-xl text-[#006aff] mb-3 sm:mb-1 font-bold"
                    >
                      <img
                        src={plusIcon}
                        alt="Check Icon"
                        className="mr-2 w-8 h-8 sm:w-6 sm:h-6"
                      />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Empty div for spacing */}
      <div className="grow min-h-[8vh]"></div>
    </div>
  );
}

export default Intro1;
