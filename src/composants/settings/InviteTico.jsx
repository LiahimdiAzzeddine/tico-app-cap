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
      url: apiUrl + "/Partager",
      dialogTitle: "Partager TiCO",
    });
  };

  return (
    <div className="w-full h-full">
      <div className="details overflow-hidden h-full p-2">
        <div className="bg-white flex flex-col items-center justify-center  h-full ">
          {/* Hands icon */}
          <div className=" absolute top-12 mb-2">
            <img src={hands} alt="TiCO Logo" className="w-44" />
          </div>
          <div
            className="w-full max-w-sm  flex flex-col items-center justify-center h-5/6 "
            style={{
              backgroundImage: `url(${background})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain",
            }}
          >
            {/* Content container */}
            <div className="flex flex-col items-center justify-center w-full px-6 ">
              {/* Text content */}
              <div className="text-center">
                <h2 className="text-2xl  text-custom-blue mb-6">
                  <span className="titre-bold">Faire connaître TiCO</span>
                </h2>

                <p className="text-custom-blue mb-4 text-lg">
                  Vous souhaitez faire connaître{" "}
                  <span className="font-bold">TiCO</span> à votre entourage ?
                </p>

                <p className="text-custom-blue text-lg">
                  N'hésitez pas à partager l'application autour de vous.
                </p>
              </div>
            </div>
          </div>
          {/* Share button */}
          <div className="w-full max-w-sm p-2 flex items-start justify-center h-1/6">
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
