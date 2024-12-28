import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import hands from "../assets/help/helpHands.svg";
import { logoEuro } from "ionicons/icons";
import useStripe from "../hooks/useStripe"; 
import { Share } from "@capacitor/share";
const apiUrl = import.meta.env.VITE_BACKEND_URL;

const HelpTiCO = () => {
  const [amount, setAmount] = useState();
  const { handleDonate, loading } = useStripe();
  const handleShare = async () => {
    await Share.share({
      title: "TiCO App",
      text: "Découvrez l'application TiCO et partagez-la avec votre entourage !",
      url: apiUrl + "/tico/helptico",
      dialogTitle: "Partager TiCO",
    });
    
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between w-full h-full">
        <div
          className="flex items-center justify-center relative aspect-square bg-no-repeat bg-contain bg-center max-h-56 w-64 tico_intro"
        >
          <span className="absolute text-2xl top-[26%] text-center text-custom-blue titre-bold">
            Bientôt disponible
          </span>
          <img
            className="absolute w-44 bottom-2 left-1/2 transform -translate-x-1/2"
            src={hands}
            alt="TiCO hands"
          />
        </div>

        <div className="flex grow items-center justify-start w-full max-w-sm px-2 pb-4">
          <div className="w-full max-w-sm flex flex-col items-center h-full justify-center space-y-6">
            <p className="text-lg text-[#446d8f] w-full font-bold text-center ArchivoLight">
              Vous pouvez nous aider à développer les nouvelles fonctionnalités :
            </p>
            <div className="flex flex-col items-center justify-center w-2/4">
              <button
                onClick={handleShare}
                className="bg-custom-blue text-white font-bold text-lg py-2 px-6 rounded-xl w-full transform transition-transform duration-150 ease-in-out active:scale-90"
              >
                Partager TiCO
              </button>
            </div>
            <div className="max-w-sm flex flex-col items-center justify-start space-y-4 w-full">
              <p className="text-lg text-[#446d8f] w-full font-bold text-center ArchivoLight">
                Aider TiCO financièrement à hauteur de :
              </p>
              <div className="flex w-2/4 items-center border-2 border-custom-blue rounded-xl">
                <input
                  type="number"
                  className="w-full p-2 text-right outline-none rounded-l-xl"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={loading} // Désactiver l'input si en cours de traitement
                />
                <IonIcon className="w-8 text-custom-blue text-xl pr-2" icon={logoEuro} />
              </div>
              <button
                className={`bg-custom-blue text-white font-bold w-2/4 text-lg py-2 px-6 rounded-xl transform transition-transform duration-150 ease-in-out active:scale-90 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => {if(amount>0){handleDonate(amount)};setAmount("");}}
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
                  "Aider TiCO"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpTiCO;
