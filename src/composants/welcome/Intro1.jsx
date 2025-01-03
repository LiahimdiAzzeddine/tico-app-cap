import React from "react";
import tico_intro from "../../assets/intro/tico_intro.svg";
import plusIcon from "../../assets/intro/plus.png";
import background from "../../assets/intro/background4.png";

function Intro1() {
  return (
    <div className="flex flex-col items-center justify-between bg-white min-h-screen w-full pt-2">
      {/* Logo Section */}
      <div className="grow flex items-end justify-center w-full">
        <img className="w-64" src={tico_intro} alt="TiCO Logo" />
      </div>

      {/* Main Content Section */}
      <div className="grow flex items-center justify-center w-full max-w-sm">
        <div
          className="w-full aspect-square flex items-center justify-center bg-no-repeat bg-contain bg-center relative"
          style={{backgroundImage: `url(${background})`}}
        >
          <div className="flex flex-col items-center justify-evenly gap-3 text-center">
           
            <div className="text-xl text-custom-blue Archivo">
            Quand l’information est...
            </div>

            {/* Feature List */}
            <ul className="list-none p-0 w-10/12 m-auto">
              {["claire", "complète", "accessible"].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-start text-xl text-custom-blue my-2 ArchivoBold"
                >
                  <img src={plusIcon} alt="Check Icon" className="mr-4 w-10 h-10" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="text-xl text-custom-blue Archivo">
            alors <span className="font-bold ArchivoBold">le choix est libre.</span><br></br>
C’est ça, la transparence&nbsp;!
            </div>
          </div>
        </div>
      </div>

      {/* Empty div for spacing */}
      <div className="grow min-h-[8vh]"></div>
    </div>
  );
}

export default Intro1;
