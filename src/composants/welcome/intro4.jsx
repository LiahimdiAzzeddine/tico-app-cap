import React from "react";
import tico_intro from "../../assets/intro/tico_intro.svg";
import background from "../../assets/intro/background4.png";

function Intro4() {
  return (
    

    <div className="flex flex-col items-center justify-between bg-white min-h-screen w-full">
      {/* Logo Section */}
      <div className="grow flex items-end justify-center w-full pt-1">
        <img className="w-64" src={tico_intro} alt="TiCO Logo" />
      </div>

      {/* Buttons Section with Background */}
      <div className="grow flex items-center justify-start w-full max-w-sm">
        <div
          className="w-full max-w-sm aspect-square flex items-center justify-center bg-no-repeat bg-contain bg-center"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="flex flex-col items-center justify-center w-4/5 text-center gap-4">
           <h2 className="text-2xl titre-bold text-custom-blue mb-2">Prêt à{" "}
              <span className="text-2xl underline underline-offset-4 decoration-orange-400">
                commencer
              </span>
              {" "}?
            </h2>
            <div className="text-xl text-custom-blue ">
              Scannez votre premier produit, explorez nos recettes, et
              participez à rendre l'alimentation
              <span className="font-bold"> plus transparente et durable !</span>
            </div>
          </div>
        </div>
      </div>
      {/* Empty div for spacing */}
      <div className="grow min-h-[8vh]"></div>
    </div>
    
  );
}

export default Intro4;
