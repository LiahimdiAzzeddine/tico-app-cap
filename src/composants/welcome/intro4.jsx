import React from "react";
import tico_intro from "../../assets/intro/tico_intro.svg";
import background from "../../assets/intro/BIENVENUEV3-14.svg";
import leftFlech from "../../assets/intro/leftFlech.svg";
import rightFlech from "../../assets/intro/rightFlech.svg";

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
          className="w-full max-w-sm aspect-square flex items-center justify-center intro4 bg-no-repeat bg-contain bg-center"
        >
          <div className="flex flex-col items-center justify-center w-4/5 text-center gap-8">
        
            <div className="text-xl text-custom-blue ">
            Bien plus qu’une application,<br></br> <span className="font-bold">un allié au quotidien !</span>
            </div>
            <div className="text-xl text-custom-blue flex flex-col space-y-4">
            <div className="flex flex-row gap-3"><img src={leftFlech} className="w-6 h-6"/><div className="Archivo"> Des <span className="ArchivoBold">recettes</span> faciles</div></div> 
            <div className="flex flex-row gap-3"><span className="w-6"></span><div className="Archivo">Des <span className="ArchivoBold">astuces</span> utiles</div> <img src={rightFlech} className="w-6 h-6"/></div> 
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
