import React from "react";
import tico_intro from "../../assets/intro/tico_intro.svg";
import light from "../../assets/intro/light.svg";


function Intro7() {
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
        <div className="w-[89%] m-auto max-w-sm aspect-square flex items-center justify-center intro7 bg-no-repeat bg-contain bg-center relative">
          <div className="flex flex-col items-center justify-center w-full text-center gap-8 leading-archivo ">
            {/* TiCO Intro */}
            <div className="mb-10 ">
            <div className="text-xl text-custom-blue ArchivoLight leading-archivo">
            <span className="pallybold leading-archivo">
                Ti<span className="tracking-tightest leading-archivo">CO</span>
              </span> est la seule application
            </div>
            <div className="text-xl text-custom-blue ArchivoLight leading-archivo">
              qui{" "}
              <span className="font-bold">
                demande aux marques <br></br>de faire la lumière&nbsp;
              </span>
              sur leurs produits,<br></br> leur origine, leur fabrication,
            </div>
            <div className="text-xl text-custom-blue ArchivoLight leading-archivo">
              leur composition.
            </div>
            </div>
             <img src={light} className="iphonexr:w-40 iphonexr:h-40 iphonese:w-36 iphonese:h-36 absolute iphonexr:-bottom-10 iphonese:-bottom-7" />
          </div>
        </div>
      </div>
      {/* Empty div for spacing */}
      <div className="grow min-h-[8vh]"></div>
    </div>
  );
}

export default Intro7;
