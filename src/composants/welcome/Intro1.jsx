import React from "react";
import tico_intro from "../../assets/intro/tico_intro.svg";
import plusIcon from "../../assets/intro/plus.png";
import background from "../../assets/intro/background4.png";

function Intro1() {
  return (
    <div
      className="flex flex-col items-center justify-between bg-white min-h-screen w-full"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      {/* Logo Section */}
      <div className="grow flex items-end justify-center w-full">
        <img className="w-60" src={tico_intro} alt="TiCO Logo" />
      </div>

      {/* Main Content Section */}
      <div className="grow flex items-center justify-center w-full max-w-sm">
        <div
          className="w-full aspect-square flex items-center justify-center bg-no-repeat bg-contain bg-center relative"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="flex flex-col items-center justify-evenly gap-2 text-center">
            <div className="text-xl text-custom-blue ArchivoLight leading-archivo">
              <div className="text-xl text-custom-blue ArchivoLight leading-archivo">
                Faire la transparence,
              </div>
              <div className="text-xl text-custom-blue ArchivoLight leading-archivo">
                c’est{" "}
                <span className="font-bold Archivo">
                  lever le voile sur l’opacité <br></br>alimentaire{" "}
                </span>
                en partageant <div className="text-xl text-custom-blue ArchivoLight leading-archivo">des informations :</div>
              </div>
            </div>

            {/* Feature List */}
            <ul className="list-none p-0 w-7/12 m-auto">
              {["claires", "complètes", "accessibles"].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-start text-xl text-custom-blue my-2 Archivo font-bold"
                >
                  <img
                    src={plusIcon}
                    alt="Check Icon"
                    className="mr-4 w-10 h-10"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="text-xl text-custom-blue ArchivoLight leading-archivo">
              Et ça, c’est notre credo&nbsp;!
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
