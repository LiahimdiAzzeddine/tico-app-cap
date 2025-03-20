import React, { useState } from "react";
import FICHETOP from "../../../assets/fb/FICHETOP.svg";
import {
  logoYoutube,
  logoFacebook,
  logoInstagram,
  logoLinkedin,
  chatbubbleEllipsesOutline
} from "ionicons/icons";
import { IonIcon } from "@ionic/react";

function SocialLinks({ networks }) {
  const getIcon = (label) => {
    switch (label) {
      case "Facebook":
        return logoFacebook;
      case "LinkedIn":
        return logoLinkedin;
      case "Instagram":
        return logoInstagram;
      case "YouTube":
        return logoYoutube;
      default:
        return chatbubbleEllipsesOutline;
    }
  };

  return (
    <div className="flex gap-3">
      {networks && networks.length > 0 ? (
        networks.map((network) => (
          <a
            key={network._label || network._url}
            href={network._url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 text-mockup-green"
          >
            <IonIcon
              icon={getIcon(network._label)}
              className="w-8 h-8 text-mockup-green"
              alt={network._label}
            />
          </a>
        ))
      ) : (
        <span className="text-xs text-gray-400">Aucun réseau social</span>
      )}
    </div>
  );
}

function ReadMoreText({ text, maxLength = 150 }) {
  const [showFullText, setShowFullText] = useState(false);
  
  if (!text) return <p className="text-xs text-gray-400">Aucune information disponible</p>;
  
  const toggleText = () => {
    setShowFullText((prevState) => !prevState);
  };
  
  const shouldShowToggle = text.length > maxLength;
  const displayText = showFullText ? text : text.slice(0, maxLength) + (shouldShowToggle ? "... " : "");
  
  return (
    <p className="inline">
      {displayText}
      {shouldShowToggle && (
        <button
          onClick={toggleText}
          className="text-[#2c6b66] font-bold Archivo underline"
        >
          {showFullText ? "Lire moins" : "Lire plus"}
        </button>
      )}
    </p>
  );
}

function EntitySection({ entity, title, entityType,isVisible }) {
  const socialNetworks = Object.values(entity?._reseaux || {});
  
  // Fonction pour extraire l'ID de la vidéo YouTube
  const getYoutubeId = (url) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };
  
  const youtubeId = entity?._historyvideo ? getYoutubeId(entity._historyvideo) : null;

  return (
    <>
      <h1 className="text-xl text-custom-blue font-bold ArchivoExtraBold">
        <span className="marker-effect-cyan">{title}</span>
      </h1>

      <div className="px-1 py-1 flex flex-row gap-3">
        {entity?._logoUrl ? (
          <img 
          src={entity?._logoUrl?.startsWith("http://") ? entity._logoUrl.replace("http://", "https://") : entity?._logoUrl} 
          className="w-2/5 object-contain" 
          alt={title} 
        />
        
        ) : (
          <div className="w-2/5 min-h-20 bg-gray-200 flex items-center justify-center rounded">
            <span className="text-gray-400 text-xs">Logo non disponible</span>
          </div>
        )}
        <div className="flex flex-col gap-3">
          <SocialLinks networks={socialNetworks} />
          <div className="flex flex-col font-bold gap-1">
            {entity?._url && (
              <a
                href={entity._url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#2c6b66] Archivo normal-case underline underline-offset-1 cursor-pointer"
              >
                Site internet
              </a>
            )}
            {entity?._email && (
            <a
              href="#"
              className="text-xs text-[#2c6b66] Archivo normal-case underline underline-offset-1 cursor-pointer"
              onClick={(e) => {
                window.location.href = "mailto:"+entity?._email;
                e.preventDefault();
            }}
            >
              Contact SAV
            </a>)}
          </div>
        </div>
      </div>
      
      <div className="px-1 text-[#2c6b66] text-sm Archivo">
        <ReadMoreText text={entity?._history} />
      </div>

      {(youtubeId && isVisible) && (
        <div className="px-4">
          <iframe
            className="w-full h-40 bg-custom-blue rounded"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={`Vidéo de ${entityType}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      )}
    </>
  );
}

function BrandInfo({ togglePanel, markInfo, provider,openPanel }) {
  return (
    <div
      className="bg-custom-green-clear rounded-e-[2rem] left-0 z-0 relative pb-12"
      style={{ width: "calc(100% - 16px)" }}
    >
      <div className="px-4 py-6 flex flex-col gap-4">
        {markInfo&&(
          <EntitySection 
          entity={markInfo} 
          title="La marque" 
          entityType="de la marque" 
          isVisible={openPanel}
        />
        )}
        {provider&&(
        <EntitySection 
          entity={provider} 
          title="L'entreprise" 
          entityType="de l'entreprise" 
          isVisible={openPanel}
        />  
        )}
        <img
          src={FICHETOP}
          className="w-12 absolute bottom-1 right-0 cursor-pointer transition-transform hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            togglePanel(6);
          }}
          alt="Toggle Panel"
        />
      </div>
    </div>
  );
}

export default React.memo(BrandInfo);