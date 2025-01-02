import React from "react";
import tico_intro from "../../assets/intro/tico_intro.svg";
import barcode from "../../assets/intro/barcode.svg";
import background from "../../assets/intro/background2.svg";

function Intro2() {
  return (
    <div className="flex flex-col items-center justify-between bg-white min-h-screen w-full">
      {/* Logo Section */}
      <div className="grow flex items-end justify-center w-full">
        <img className="w-64" src={tico_intro} alt="TiCO Logo" />
      </div>

      <div className="grow flex items-center justify-center w-full max-w-sm px-2">
        <div
          className="w-full max-w-sm aspect-square flex items-center justify-center bg-no-repeat bg-contain bg-center relative "
          style={{ backgroundImage: `url(${background})` }}
        >
          <img
            src={barcode}
            className="max-h-20 mx-auto z-10 absolute top-[-1vh] left-0 right-0"
            alt="Barcode"
          />
          <div className="flex flex-col items-center justify-center w-4/5 gap-3 text-center">
            <div className="text-xl text-custom-blue Archivo">
              Encourager<br></br> des pratiques plus responsables d’un{" "}
              <span className="font-bold ArchivoBold">simple scan&nbsp;!</span>
            </div>
          </div>
        </div>
      </div>
      {/* Empty div for spacing */}
      <div className="grow min-h-[8vh]"></div>
    </div>
  );
}

export default Intro2;
