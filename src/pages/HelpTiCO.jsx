import React, { useState } from "react";
import { IonIcon, useIonLoading } from "@ionic/react";
import hands from "../assets/help/helpHands.svg";
import { logoEuro } from "ionicons/icons";
import useStripe from "../hooks/useStripe";
import { Share } from "@capacitor/share";
import { useAlert } from "../context/AlertProvider";
import HomeLayout from "../composants/layout/HomeLyout";
import leftFlech from "../assets/intro/leftFlech.svg";
import rightFlech from "../assets/intro/rightFlech.svg";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const HelpTiCO = () => {
  const [amount, setAmount] = useState();
  const { handleDonate, loading } = useStripe();
  const { triggerAlert } = useAlert();
  const [present, dismiss] = useIonLoading();

  const handleShare = async () => {
    await Share.share({
      title: "TiCO App",
      text: "Découvrez l'application TiCO et partagez-la avec votre entourage !",
      url: apiUrl + "/tico/helptico",
      dialogTitle: "Partager TiCO",
    });
  };
  const clickHelp = async () => {
    if (amount > 0) {
      await present({
        mode: "ios",
        spinner: "bubbles",
        cssClass: "custom-loading-help",
        duration: 10000,
      });
      handleDonate(amount);
    } else {
      triggerAlert(
        "Le montant ne doit pas être nul.",
        "Attention",
        null,
        "ios",
        "",
        "Compris",
        true
      );
    }
  };

  return (
    <HomeLayout>
      <div className="flex flex-col items-center justify-start w-full h-full">
        <div className="flex items-center justify-center relative aspect-square bg-no-repeat bg-contain bg-center max-h-56 w-72 tico_intro">
          <span className="absolute text-xl top-[15%] text-center text-custom-blue titre-bold leading-clash">
          Nouvelles&nbsp;fonctionnalités
          bientôt&nbsp;disponibles
          </span>
          <img
            className="absolute w-48 bottom-1 left-1/2 transform -translate-x-1/2"
            src={hands}
            alt="TiCO hands"
          />
        </div>

        <div className="flex grow items-center justify-start w-full max-w-sm px-2 pb-4">
          <div className="w-full max-w-sm flex flex-col items-center h-full justify-center space-y-6">
            <div className="text-custom-blue w-full text-center ArchivoLight leading-archivo tracking-normal">

            Ensemble, <span className="font-bold ArchivoLightBold">faisons grandir la transparence</span>&nbsp;!
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
               <span className="ArchivoBold"> Partager</span> <span className="pallybold leading-archivo">Ti<span className="tracking-tightest leading-archivo">CO</span></span>
              </button>
            </div>

            <div className="max-w-sm flex flex-col items-center justify-start space-y-4 w-full">
              <div className=" text-custom-blue  w-full text-center ArchivoLight leading-archivo tracking-normal">
              Tout soutien permettra d’améliorer l’application.<br></br> 
              <span className="font-bold ArchivoLightBold">Chaque contribution compte</span> pour bâtir <br></br>un futur plus clair et responsable.
              </div>
              <div className="flex w-2/4 items-center border-[1.2px] border-custom-blue rounded-xl">
                <input
                  type="number" placeholder="0" min="1" input pattern="[0-9]*" inputmode="numeric"
                  className="w-full p-2 text-right outline-none rounded-l-xl"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={loading} // Désactiver l'input si en cours de traitement
                />
                <IonIcon
                  className="w-8 text-custom-blue text-xl pr-2"
                  icon={logoEuro}
                />
              </div>
              <div className="relative flex flex-col items-center justify-center w-2/4">
                <img
                  src={rightFlech}
                  className="absolute top-1 -right-5  w-8 h-auto" // Ajustez les valeurs pour positionner parfaitement
                />
                <button
                  className={`bg-custom-blue text-white text-lg py-2 px-6 rounded-xl transform transition-transform duration-150 ease-in-out active:scale-90 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => {
                    clickHelp();
                    setAmount("");
                  }}
                  disabled={loading} // Désactiver le bouton pendant le traitement
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 text-white mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Traitement...
                    </div>
                  ) : (
                    <><span className="ArchivoBold">Aider</span> <span className="pallybold leading-archivo">Ti<span className="tracking-tightest leading-archivo">CO</span></span></>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default React.memo(HelpTiCO);
