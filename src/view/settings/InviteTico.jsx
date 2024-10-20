import React from "react";
import hands from "../../assets/parametres/hands.png";
import background from "../../assets/parametres/background.png";
import { Share } from "@capacitor/share";
function InviteTico() {
    const handleShare = async () => {
        await Share.share({
          title: "TiCO App",
          text: "Découvrez l'application TiCO et partagez-la avec votre entourage !",
          url: "https://example.com/tico", // Add your app's URL
          dialogTitle: "Partager TiCO",
        });
      };
  return (
    <div className="flex flex-col items-center justify-center bg-white h-full w-full">
      <div
        className="flex flex-col items-center justify-center grow-[3] w-full "
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom center",
          backgroundSize: "contain",
        }}
      >
        {/* Logo Section */}
        <div className="flex items-end justify-center w-full grow">
          <img className="w-48" src={hands} alt="TiCO Logo" />
        </div>

          <div className="flex flex-col items-center justify-center  text-center w-full px-6 grow-[3] max-h-[60%]">
            <h2 className="text-2xl titre-bold text-[#006aff]">
              Faire connaître{" "}
              <span className="underline underline-offset-4 decoration-orange-400">
                TiCO
              </span>
            </h2>
            <div className="text-xl text-[#006aff]">
              Vous souhaitez faire connaître{" "}
              <span className="font-bold">TiCO</span> à votre entourage ?
            </div>
            <div className="text-xl text-[#006aff]">
              N'hésitez pas à partager l'application autour de vous.
            </div>
          </div>
      
      </div>

      <div className="w-full px-6 grow-[1] flex items-center justify-center">
        <button
          className="bg-[#FF8C00] hover:bg-orange-600 text-white p-2 rounded-lg transition-colors duration-300 w-1/2 font-bold"
          onClick={handleShare}
        >
          Je partage
        </button>
      </div>
    </div>
  );
}

export default InviteTico;