import React from "react";
import tico_intro from "../assets/home/tico_intro.svg";
import hands from "../assets/help/helpHands.svg";
import { logoEuro } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
const HelpTiCO = () => {
  return (

      <div className="flex flex-col items-center justify-between w-full h-full">
        {/* Logo Section */}
        <div
          className="grow-0 flex items-center justify-center relative aspect-square bg-no-repeat bg-contain bg-center w-72"
          style={{ backgroundImage: `url(${tico_intro})` }}
        >
          <span className="absolute text-2xl  top-[26%] text-center text-custom-blue titre-bold">
            Bientôt disponible
          </span>
          <img
            className="absolute w-52 bottom-[10%] left-1/2 transform -translate-x-1/2"
            src={hands}
            alt="TiCO hands"
          />
        </div>

        {/* Buttons Section with Background */}
        <div className="flex grow items-center justify-start w-full max-w-sm px-2 h-auto pb-4">
          <div className="w-full max-w-sm  flex flex-col items-center h-full justify-center space-y-6 ">
            <p className="text-lg text-[#446d8f] w-full font-bold text-center">
              Vous pouvez nous aider à développer les nouvelles fonctionnalités
              :
            </p>
            <div className="flex flex-col items-center justify-center w-2/4">
              <button
                className="bg-custom-blue text-white font-bold  text-lg py-2 px-6 rounded-xl w-full transform transition-transform duration-150 ease-in-out active:scale-90"
                onClick={() => console.log()}
              >
                Partager TiCO
              </button>
            </div>
            <div className="max-w-sm  flex flex-col items-center justify-start space-y-4 w-full ">
              <p className="text-lg text-[#446d8f] w-full font-bold text-center">
                Aider TiCO financièrement à hauteur de :
              </p>
              <div className="flex flex-col items-center  justify-start space-y-4 w-full ">
              <div className="flex flex-row items-center w-full justify-center">
                  <input
                    type="number"
                    className="border-2 border-custom-blue rounded-xl w-2/4 min-h-9"
                  />
                  <IonIcon
                    className="w-8 text-custom-blue text-xl"
                    icon={logoEuro}
                  />
                </div>
                

                <button
                  className="bg-custom-blue text-white font-bold w-2/4 text-lg py-2 px-6 rounded-xl  transform transition-transform duration-150 ease-in-out active:scale-90"
                  onClick={() => console.log()}
                >
                  Aider TiCO
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default HelpTiCO;