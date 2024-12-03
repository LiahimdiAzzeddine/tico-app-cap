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
        
            <div className="text-xl text-custom-blue ">
            Bien plus qu’une application, <span className="font-bold">un allié au quotidien !</span>
            </div>
            <div className="text-xl text-custom-blue ">
            Recettes faciles<br></br> Astuces utiles 
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
