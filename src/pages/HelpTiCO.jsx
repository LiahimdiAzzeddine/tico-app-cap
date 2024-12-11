import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import tico_intro from "../assets/home/tico_intro.svg";
import hands from "../assets/help/helpHands.svg";
import { logoEuro } from "ionicons/icons";
import Spinner from "../composants/Spinner";
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
      url: apiUrl + "/partager_tico",
      dialogTitle: "Partager TiCO",
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between w-full h-full">
        <div
          className="grow-0 flex items-center justify-center relative aspect-square bg-no-repeat bg-contain bg-center w-72"
          style={{ backgroundImage: `url(${tico_intro})` }}
        >
          <span className="absolute text-2xl top-[26%] text-center text-custom-blue titre-bold">
            Bientôt disponible
          </span>
          <img
            className="absolute w-52 bottom-[10%] left-1/2 transform -translate-x-1/2"
            src={hands}
            alt="TiCO hands"
          />
        </div>

        <div className="flex grow items-center justify-start w-full max-w-sm px-2 h-auto pb-4">
          <div className="w-full max-w-sm flex flex-col items-center h-full justify-center space-y-6">
            <p className="text-lg text-[#446d8f] w-full font-bold text-center">
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
              <p className="text-lg text-[#446d8f] w-full font-bold text-center">
                Aider TiCO financièrement à hauteur de :
              </p>
              <div className="flex w-2/4 items-center border-2 border-custom-blue rounded-xl">
            <input
              type="number"
              className="w-full p-2 text-right outline-none rounded-l-xl"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <IonIcon className="w-8 text-custom-blue text-xl pr-2" icon={logoEuro} />
          </div>
              <button
                className="bg-custom-blue text-white font-bold w-2/4 text-lg py-2 px-6 rounded-xl transform transition-transform duration-150 ease-in-out active:scale-90"
                onClick={() => handleDonate(amount)}
              >
                Aider TiCO
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="h-screen fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default HelpTiCO;
