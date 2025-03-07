import React, { useState } from "react";
import hands from "../assets/help/helpHands.svg";
import { Share } from "@capacitor/share";
import HomeLayout from "../composants/layout/HomeLyout";
import leftFlech from "../assets/intro/leftFlech.svg";
import rightFlech from "../assets/intro/rightFlech.svg";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const HelpTiCO = () => {

  const handleShare = async () => {
    await Share.share({
      title: "TiCO App",
      text: "Découvrez l'application TiCO et partagez-la avec votre entourage !",
      url: apiUrl + "/tico/helptico",
      dialogTitle: "Partager TiCO",
    });
  };
 
  const OpenSite = () => {
    const url = "https://www.onparticipe.fr/c/tico_scan";
    window.open(url, "_blank");
  };
  

  return (
    <HomeLayout>
      <div className="flex flex-col items-center justify-start w-full h-full">
        <div className="flex items-center justify-center relative aspect-square bg-no-repeat bg-contain bg-center max-h-56 w-72 tico_intro">
          <span className="absolute text-2xl top-[14%] text-center text-custom-blue titre-bold leading-clash">
            Vous&nbsp;avez&nbsp;le&nbsp;pouvoir
            de&nbsp;changer&nbsp;les&nbsp;choses
          </span>
          <img
            className="absolute w-48 bottom-1 left-1/2 transform -translate-x-1/2"
            src={hands}
            alt="TiCO hands"
          />
        </div>

        <div className="flex flex-col grow items-center justify-around w-full max-w-sm px-2 pb-4">
          <div className="w-full max-w-sm flex flex-col items-center h-full justify-evenly space-y-4 ">
          <div className="max-w-sm flex flex-col items-center justify-start space-y-8 w-full">
            <div className="text-custom-blue w-full text-center ArchivoLight leading-archivo tracking-normal">
              Ensemble,{" "}
              <span className="font-bold ArchivoLightBold">
                faisons grandir la transparence
              </span>
              &nbsp;!
            </div>
            <div className="relative flex flex-col items-center justify-center w-2/4">
              {/* Flèche */}
              <img
                src={leftFlech}
                className="absolute top-0 -left-11 w-8 h-auto" // Ajustez les valeurs pour positionner parfaitement
              />
              {/* Bouton */}
              <button
                onClick={handleShare}
                className="bg-custom-blue  text-white text-lg py-2 px-6 rounded-xl w-full transform transition-transform duration-150 ease-in-out active:scale-90"
              >
                <span className="ArchivoBold"> Partager</span>{" "}
                <span className="pallybold leading-archivo">
                  Ti
                  <span className="tracking-tightest leading-archivo">CO</span>
                </span>
              </button>
            </div></div>

            <div className="max-w-sm flex flex-col items-center justify-start space-y-7 w-full">
              <div className=" text-custom-blue  w-full text-center ArchivoLight leading-archivo tracking-normal">
              Soutenir le développement de <span className="pallybold leading-archivo">Ti<span className="tracking-tightest leading-archivo">CO</span></span> et découvrir comment 
              <span className="ArchivoBold"> obtenir le guide de décryptage et le calendrier </span>des fruits,légumes, conseils et recettes de saison.
              </div>
              <div className="relative flex flex-col items-center justify-center w-2/4">
                <img
                  src={rightFlech}
                  className="absolute top-1 -right-8  w-8 h-auto" // Ajustez les valeurs pour positionner parfaitement
                />
                <button
                  className={`bg-custom-blue text-white text-lg py-2 px-6 rounded-xl transform transition-transform duration-150 ease-in-out active:scale-90`}
                  onClick={() => {
                    OpenSite();
                  }}
                 
                >
                      <span className="ArchivoBold">Faire&nbsp;un&nbsp;don</span>
                </button>
              </div>
              
            </div>
            <div className="text-custom-blue w-full text-center ArchivoLight leading-archivo tracking-normal ">
                Merci d'être acteur du changement&nbsp;!
              </div>
          </div> 
         
        </div>
      </div>
    </HomeLayout>
  );
};

export default React.memo(HelpTiCO);
