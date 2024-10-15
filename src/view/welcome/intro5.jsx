import React from "react";
import tico_intro from "../../assets/intro/tico_intro.png";
import fleche from "../../assets/intro/fleche.png";
import background from "../../assets/intro/background5.png";

function Intro5() {
  return (
    <div className="flex flex-col items-center justify-between bg-white min-h-screen w-full">
      {/* Logo Section */}
      <div className="grow flex items-end justify-center w-full pt-1">
        <img className="w-64" src={tico_intro} alt="TiCO Logo" />
      </div>

      {/* Section Texte avec image de fond */}
      <div className="grow flex items-center justify-center w-full max-w-sm  px-5">
        <div
          className="w-full max-w-sm aspect-square flex items-center justify-center bg-no-repeat bg-contain bg-center relative "
          style={{ backgroundImage: `url(${background})` }}
        >
          {/* Texte avec flèche */}
          <div className="flex flex-col items-center absolute justify-center w-2/3 ">
            <h2 className="text-2xl titre-bold text-[#006aff] mb-2 ">
              On vous montre ?
            </h2>
          </div>
            {/* Flèche */}
            <img
            className="absolute w-[40vmin] md:w-[35vmin] lg:w-[30vmin] xl:w-[25vmin] right-0 bottom-11"
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
