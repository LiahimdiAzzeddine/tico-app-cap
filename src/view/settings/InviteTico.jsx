import React from "react";
import hands from "../../assets/parametres/hands.png";
import background from "../../assets/parametres/background.png";
import { Share } from "@capacitor/share";

function InviteTico() {
  const handleShare = async () => {
    await Share.share({
      title: "TiCO App",
      text: "Découvrez l'application TiCO et partagez-la avec votre entourage !",
      url: "https://example.com/tico",
      dialogTitle: "Partager TiCO",
    });
  };

  return (
    <div className="details bg-white flex flex-col items-center">
      <div 
        className="w-full max-w-sm  flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      >
        {/* Content container */}
        <div className="relative flex flex-col items-center w-full px-8 -top-20">
          {/* Hands icon */}
          <div className="mb-5">
            <img 
              src={hands} 
              alt="TiCO Logo" 
              className="w-44"
            />
          </div>

          {/* Text content */}
          <div className="text-center">
            <h2 className="text-2xl titre-bold text-custom-blue mb-6">
              Faire connaître{" "}
              <span className="underline underline-offset-4 decoration-orange-400">
                TiCO
              </span>
            </h2>
            
            <p className="text-custom-blue mb-4">
              Vous souhaitez faire connaître{" "}
              <span className="font-bold">TiCO</span> à votre entourage ?
            </p>
            
            <p className="text-custom-blue">
              N'hésitez pas à partager l'application autour de vous.
            </p>
          </div>

        
        </div> 
         
      </div>
      {/* Share button */}
      <div className="w-full px-6 grow-[1] flex items-center justify-center">
        <button
          className="bg-[#FF8C00] hover:bg-orange-600 text-white p-2 rounded-lg transition-colors duration-300 w-1/2 lg:w-1/4 font-bold"
          onClick={handleShare}
        >
          Je partage
        </button>
      </div>
    </div>
  );
}

export default InviteTico;