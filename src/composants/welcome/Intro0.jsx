import React from "react";
import tico_intro from "../../assets/intro/tico_intro.svg";
import background from "../../assets/intro/BIENVENUE0.svg";
import Loupe from "../../assets/intro/Loupe.svg";
function Intro0() {
  return (
    <div className="flex flex-col items-center justify-between bg-white min-h-screen w-full bg-no-repeat intro0"
    >
      {/* Logo Section */}
      <div className="grow flex items-end justify-center w-full">
        <img className="w-64" src={tico_intro} alt="TiCO Logo" />
      </div>

      {/* Main Content Section */}
      <div className="grow flex items-center justify-center w-full max-w-sm px-2">
        <div className="w-full aspect-square flex items-start justify-center relative">
          <div className="flex flex-col items-center justify-evenly w-4/6 text-center space-y-8 pt-8">
            <h2 className="text-3xl titre-bold text-custom-blue underline underline-offset-4 decoration-orange-400">
              Bienvenue !
            </h2>
            
            <div className="text-xl text-custom-blue Archivo">
            <span className="pallybold">Ti<span className="tracking-[-0.08em]">CO</span></span> est l’application <span className="font-bold">qui évalue la transparence</span> des produits alimentaires.
            </div>
            <img src={Loupe} className="w-32 h-32 absolute left-14 bottom-0" />
          </div>
        </div>
      </div>

      {/* Empty div for spacing */}
      <div className="grow min-h-[8vh]"></div>
    </div>
  );
}

export default Intro0;
