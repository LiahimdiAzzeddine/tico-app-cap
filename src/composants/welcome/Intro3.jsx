import React from "react";
import tico_intro from "../../assets/intro/tico_intro.svg";
import background from "../../assets/intro/background3.png";

function Intro3() {
  return (
    <div
      className="flex flex-col items-center justify-between bg-white min-h-screen w-full"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      {/* Logo Section */}
      <div className="grow flex items-end justify-center w-full pt-1">
        <img className="w-60" src={tico_intro} alt="TiCO Logo" />
      </div>

      {/* Buttons Section with Background */}
      <div className="grow flex items-center justify-start w-full max-w-sm">
        <div
          className="w-full max-w-sm aspect-square flex items-center justify-center bg-no-repeat bg-contain bg-center"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="flex flex-col items-center justify-center w-4/5 text-center gap-3">
            <div className="text-xl text-custom-blue leading-archivo ArchivoLight">
              <span className="font-bold block Archivo">
                En évaluant la transparence
              </span>
              <span className="block">des produits alimentaires,</span>
              <span className="block">nous incitons les marques</span>
              <span className="block">
                à <span className="font-bold Archivo">décrypter leurs produits</span>
              </span>
              <span className="block">pour offrir la possibilité</span>
              <span className="block">
                aux consommateurs de{" "}
                <span className="font-bold Archivo">
                  faire<br></br> des choix éclairés.
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Empty div for spacing */}
      <div className="grow min-h-[8vh]"></div>
    </div>
  );
}

export default Intro3;
