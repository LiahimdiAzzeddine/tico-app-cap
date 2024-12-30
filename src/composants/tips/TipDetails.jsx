import React from "react";
import { Share } from "@capacitor/share";
const apiUrl = import.meta.env.VITE_BACKEND_URL;

const TipDetails = ({ tip }) => {
  const { id, title, image, details } = tip;

   // Méthode de partage
   // Méthode de partage avec deep link
  const shareTip = async () => {
    try {
      // Construisez votre deep link. Le format dépend de la configuration de votre application
      // Exemple: "monapp://tips/details/[id]"
      const deepLink = `${apiUrl}/tico/tip/${id}`;

      await Share.share({
        title: title,
        text: `Découvre ce conseil : ${title}`,
        url: deepLink, // Le deep link sera utilisé comme URL
        dialogTitle: 'Partager ce conseil'
      });
    } catch (error) {
      console.error('Erreur lors du partage', error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Contenu principal */}
      <div className="flex-grow bg-white rounded-b-[2rem] pb-8">
        {/* Section Titre et Image */}
        <div className="bg-custom-orange px-4 pt-4 pb-4 rounded-b-[2rem] w-full">
          <div
            className="w-full flex items-end justify-end bg-no-repeat bg-contain bg-center relative bgImage"
          >
            <div className="flex flex-col justify-end items-center w-full">
              <h2 className="text-center text-custom-blue  text-2xl ArchivoExtraBold py-2">
                {title}
              </h2>
              <div className="w-full flex flex-col justify-end items-end pr-2 pb-3">
                <img
                  src={image}
                  alt={title}
                  className="w-auto h-40 rounded-2xl border-custom-text-orange  border-2 object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section Détails */}
        <div className="px-6 pt-6">
          <h2 className="text-custom-text-orange text-2xl ArchivoBold pb-3 leading-archivo ">
            Notre ti'conseil
          </h2>
          <p
            className="text-[#ffb76c] text-base break-words leading-snug"
            dangerouslySetInnerHTML={{ __html: details }}
          />
        </div>
      </div>

      {/* Section Bouton */}
      <div className="w-full flex flex-col items-center justify-center py-4">
        <button
          type="button"
          onClick={shareTip}
          className=" bg-custom-text-orange text-white ] ArchivoBold px-3 py-2 rounded-lg"
        >
          Partager autour de moi
        </button>
      </div>
    </div>
  );
};

export default TipDetails;