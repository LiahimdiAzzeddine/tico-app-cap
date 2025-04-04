import React from "react";
import tico_intro from "../../assets/intro/tico_intro.svg";
import barcode from "../../assets/intro/barcode.svg";
import Bole from "../../assets/intro/BIENVENUEV4-20.svg";

function Intro2() {
  return (
    <div className="flex flex-col items-center justify-between bg-white min-h-screen w-full" style={{paddingTop:"env(safe-area-inset-top)" }}>
      {/* Logo Section */}
      <div className="grow flex items-end justify-center w-full">
        <img className="w-60" src={tico_intro} alt="TiCO Logo" />
      </div>

      <div className="grow flex items-center justify-center w-full max-w-sm px-2">
        <div
          className="w-full max-w-sm aspect-square flex items-center justify-center bg-no-repeat bg-contain bg-center relative intro2"
        >
          <img
            src={barcode}
            className="max-h-20 mx-auto z-10 absolute top-[-1vh] left-0 right-0"
            alt="Barcode"
          />
          <div className="flex flex-col items-center justify-center w-4/5 gap-8 text-center pt-16">
            <div className="text-xl text-custom-blue ArchivoLight leading-archivo">
            <span className="font-bold Archivo">Scannez</span>, cliquez<br></br> et demandez&nbsp;aux marques<br></br> de <span className="font-bold Archivo">soumettre </span>
            <span className="font-bold Archivo">leurs produits aux évaluations </span>
            de nos experts <br></br>indépendants&nbsp;!
            </div>
            <img src={Bole} className="iphonexr:w-12 iphonexr:h-12 iphonese:w-12 iphonese:h-12" />

          </div>
          
        </div>
      </div>
      {/* Empty div for spacing */}
      <div className="grow min-h-[8vh]"></div>
    </div>
  );
}

export default Intro2;
