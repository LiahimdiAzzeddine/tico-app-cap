import React from "react";
import hands from "../../assets/parametres/hands.png";
import background from "../../assets/parametres/background.png";
import { Share } from "@capacitor/share";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

// Composant pour le titre TiCO
const TicoTitle = () => (
  <span className="pallybold leading-archivo">
    Ti<span className="tracking-tightest leading-archivo">CO</span>
  </span>
);

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
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-sm flex flex-col items-center relative">
        {/* Image des mains */}
        <div className="absolute -top-2 z-10">
          <img src={hands} alt="TiCO Logo" className="w-48 h-auto" />
        </div>

        {/* Contenu principal avec background arrondi */}
        <div className="mt-16 w-full flex flex-col items-center">
          <div 
            className="w-full aspect-square flex flex-col items-center justify-center"
            style={{
              backgroundImage: `url(${background})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Texte centré */}
            <div className="flex flex-col items-center space-y-16 text-center -mt-8">
              <h2 className="text-2xl text-custom-blue">
                <span className="titre-bold leading-archivo">
                  Faire connaître <TicoTitle />
                </span>
              </h2>
              <p className="text-custom-blue text-lg Archivo leading-archivo">
                Envie de faire connaître <TicoTitle />&nbsp;?
              </p>
            </div>
          </div>

          {/* Bouton de partage */}
         
          <button
              className="bg-[#FF8C00] text-xl text-white p-2 rounded-lg transition-colors duration-300 w-1/2 font-bold mt-10"
              onClick={handleShare}
            >
              Je partage
            </button>
        </div>
      </div>
    </div>
  );
}

export default InviteTico;