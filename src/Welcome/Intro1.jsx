import React from "react";
import tico_intro from "../assets/intro/tico_intro.png";
import { addCircleOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

function Intro1() {
  return (
    <div className="flex flex-col items-center justify-start bg-white min-h-screen w-full">
      {/* Section Image */}
      <div className="text-center flex flex-col h-[30vh] justify-end z-50">
        <img className="w-52 sm:w-64" src={tico_intro} alt="Tico Intro" />
      </div>

      {/* Section Texte */}
      <div className="flex flex-col justify-center items-center w-full h-[60vh] sm:h-[55vh] p-4 sm:pb-6 pb-8">
        <div className="blob w-full max-w-md p-6 sm:p-8 rounded-lg shadow-md">
          <div className="introText text-center flex flex-col gap-y-4 sm:gap-y-2 px-4 py-6 sm:py-8">
            <h2 className="text-2xl font-bold text-[#006aff] underline underline-offset-4 decoration-orange-400">
              Bienvenue !
            </h2>
            <div className="text-lg sm:text-xl text-[#006aff]">
              <span className="font-bold">TiCO</span> vous accompagne vers
              une alimentation
            </div>

            {/* Liste des caractéristiques */}
            <div className="flex flex-col w-full items-center">
              <ul className="list-none p-0 w-11/12 sm:w-5/6">
                {["simple", "transparente", "responsable 🌱"].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-start text-lg sm:text-xl text-[#006aff] mb-3 sm:mb-1 font-bold"
                  >
                    <IonIcon
                      className="text-orange-400 mr-2 text-2xl sm:text-lg"
                      icon={addCircleOutline}
                      slot="start"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro1;
