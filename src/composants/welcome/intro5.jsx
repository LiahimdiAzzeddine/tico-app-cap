import React from "react";
import tico_intro from "../../assets/intro/tico_intro.svg";
import fleche from "../../assets/intro/fleche.png";
import background from "../../assets/intro/background5.png";

function Intro5() {
  return (
    <div className="flex flex-col items-center justify-between bg-white min-h-screen w-full" style={{paddingTop:"env(safe-area-inset-top)" }}>
      {/* Logo Section */}
      <div className="grow flex items-end justify-center w-full">
        <img className="w-60" src={tico_intro} alt="TiCO Logo" />
      </div>

      {/* Section Texte avec image de fond */}
      <div className="grow flex items-center justify-center w-full max-w-sm  px-6">
        <div
          className="w-full max-w-sm aspect-square flex items-center justify-center bg-no-repeat bg-contain bg-center relative "
          style={{ backgroundImage: `url(${background})` }}
        >
          {/* Texte avec flèche */}
          <div className="flex flex-col items-center absolute justify-center w-2/3 ">
            <h2 className="text-3xl titre-bold text-custom-blue mb-6 ">
            C’est parti !
            </h2>
          </div>
            {/* Flèche */}
            <img
            className="absolute w-1/2 right-3 bottom-12"
            src={fleche}
            alt="Flèche"
          />
        </div>
      </div>
        {/* Empty div for spacing */}
        <div className="grow min-h-[8vh]"></div>
    </div>
  );
}

export default Intro5;
