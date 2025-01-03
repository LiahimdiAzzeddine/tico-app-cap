import React from "react";
import tico_intro from "../../assets/intro/tico_intro.svg";
import Loupe from "../../assets/intro/Loupe.svg";
function Intro0() {
  return (
    <div className="flex flex-col items-center justify-between bg-white min-h-screen w-full bg-no-repeat intro0 max-w-sm m-auto">
      {/* Logo Section */}
      <div className="grow flex items-end justify-center w-full m-auto">
        <img className="w-64" src={tico_intro} alt="TiCO Logo" />
      </div>

      {/* Main Content Section */}
      <div className="grow flex items-center justify-center w-full max-w-sm px-2">
        <div className="w-full aspect-square flex items-start justify-center relative">
          <div className="flex flex-col items-center justify-center w-4/6 text-center space-y-8 min-h-[70%]">
            <h2 className="text-3xl titre-bold text-custom-blue underline underline-offset-4 decoration-orange-400 pt-2">
              Bienvenue !
            </h2>
            
            <div className="text-xl text-custom-blue Archivo leading-normal">
            <span className="pallybold leading-normal">Ti<span className="tracking-tightest leading-normal">CO</span></span> est l’application qui <span className="font-bold">évalue la transparence</span> des produits alimentaires.
            </div>
            <img src={Loupe} className="w-36 h-36 absolute left-14 -bottom-5" />
          </div>
        </div>
      </div>

      {/* Empty div for spacing */}
      <div className="grow min-h-[8vh]"></div>
    </div>
  );
}

export default Intro0;
