import React from "react";
import hands from "../../assets/parametres/hands.png";
import background from "../../assets/parametres/background.png";
import { Share } from "@capacitor/share";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

function InviteTico() {
  const handleShare = async () => {
    await Share.share({
      title: "TiCO App",
      text: "Découvrez l'application TiCO et partagez-la avec votre entourage !",
      url: apiUrl,
      dialogTitle: "Partager TiCO",
    });
  };

  return (
    <div className="w-full h-full">
      <div className="details overflow-hidden h-full p-2 flex flex-col items-center justify-center">
        <div className="bg-white flex flex-col items-center justify-center h-full max-h-[590px] relative w-full max-w-sm">
          {/* Hands icon */}
          <div className="absolute top-0">
            <img
              src={hands}
              alt="TiCO Logo"
              className="w-52"
            />
          </div>
          <div
            className="w-full max-w-sm flex flex-col items-end justify-center h-5/6"
            style={{
              backgroundImage: `url(${background})`,
              backgroundRepeat: "no-repeat",
              backgroundPositionX:"center",
              backgroundPositionY:"68%",
              backgroundSize: "contain",
            }}
          >
            {/* Content container */}
            <div className="flex flex-col items-center justify-center w-full px-4 pt-[10%] ">
              {/* Text content */}
              <div className="text-center space-y-5">
                <h2 className="text-2xl text-custom-blue pb-4">
                  <span className="titre-bold">
                    Faire connaître{" "}
                    <span className="pallybold">
                      Ti<span className="tracking-tightest">CO</span>
                    </span>
                  </span>
                </h2>

                <div className="text-custom-blue text-lg Archivo leading-archiv">
                  Vous souhaitez faire connaître{" "}
                  <span className="pallybold leading-archiv">
                    Ti<span className="tracking-tightest leading-archiv">CO</span>
                  </span><br></br>
                  à votre entourage ?
                </div>

                <div className="text-custom-blue text-lg Archivo leading-archivo">
                  N'hésitez pas à partager<br></br> l'application autour de vous.
                </div>
              </div>
            </div>
          </div>
          {/* Share button */}
          <div className="w-full max-w-sm p-2 flex items-start justify-center">
            <button
              className="bg-[#FF8C00] text-xl text-white p-2 rounded-lg transition-colors duration-300 w-1/2 font-bold"
              onClick={handleShare}
            >
              Je partage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InviteTico;
