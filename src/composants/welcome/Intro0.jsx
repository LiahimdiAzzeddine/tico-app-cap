import React from "react";
import tico_intro from "../../assets/intro/tico_intro.svg";
import Loupe from "../../assets/intro/Loupe.svg";
function Intro0() {
  return (
    <div className="h-screen">
    <div className="flex flex-col items-center justify-around bg-white h-full min-h-[60vh] w-full bg-no-repeat intro0 max-w-sm m-auto">
      {/* Logo Section */}
      <div className=" flex items-end justify-center w-full">
        <img className="w-60" src={tico_intro} alt="TiCO Logo" />
      </div>

      {/* Main Content Section */}
     
          <div className="flex px-2 flex-col items-center justify-center w-4/6 text-center space-y-10 aspect-square">
            <h2 className="text-3xl titre-bold text-custom-blue underline underline-offset-4 decoration-orange-400 pt-2">
              Bienvenue !
            </h2>
            
            <div className="text-xl text-custom-blue Archivo leading-normal">
            <span className="pallybold leading-normal">Ti<span className="tracking-tightest leading-normal">CO</span></span> est l’application qui <span className="font-bold">évalue la transparence</span> des produits alimentaires.
            </div>
            <img src={Loupe} className="w-36 h-36 absolute left-14 bottom-12" />
          </div>
        

    </div>
    {/* Empty div for spacing */}
      <div className="grow min-h-[8vh]"></div>
    </div>
  );
}

export default Intro0;
