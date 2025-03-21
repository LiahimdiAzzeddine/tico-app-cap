import React, { useState, useCallback, useMemo } from "react";
import FICHETOP from "../../../assets/fb/FICHETOP.svg";
import { IonIcon } from "@ionic/react";
import { logoYoutube, logoFacebook, logoInstagram, logoLinkedin, chatbubbleEllipsesOutline } from "ionicons/icons";

const SOCIAL_ICONS = {
  Facebook: logoFacebook,
  LinkedIn: logoLinkedin,
  Instagram: logoInstagram,
  YouTube: logoYoutube,
};

const SocialLinks = React.memo(({ networks }) => {
  if (!networks?.length) return <span className="text-xs text-gray-400">Aucun réseau social</span>;
  
  return (
    <div className="flex gap-3">
      {networks.map(({ _label, _url }) => (
        <a key={_label || _url} href={_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 text-mockup-green">
          <IonIcon icon={SOCIAL_ICONS[_label] || chatbubbleEllipsesOutline} className="w-8 h-8" />
        </a>
      ))}
    </div>
  );
});

const ReadMoreText = React.memo(({ text, maxLength = 150 }) => {
  const [showFullText, setShowFullText] = useState(false);
  if (!text) return <p className="text-xs text-gray-400">Aucune information disponible</p>;

  const toggleText = useCallback(() => setShowFullText((prev) => !prev), []);
  const displayText = showFullText ? text : `${text.slice(0, maxLength)}...`;

  return (
    <p className="inline">
      {displayText}
      {text.length > maxLength && (
        <button onClick={toggleText} className="text-[#2c6b66] font-bold Archivo underline">
          {showFullText ? "Lire moins" : "Lire plus"}
        </button>
      )}
    </p>
  );
});

const getYoutubeId = (url) => url?.match(/(?:youtube\.com.*[?&]v=|youtu\.be\/)([^"&?\/\s]{11})/)?.[1] || null;

const EntitySection = React.memo(({ entity, title }) => {
  const socialNetworks = useMemo(() => Object.values(entity?._reseaux || {}), [entity?._reseaux]);
  const youtubeId = useMemo(() => getYoutubeId(entity?._historyvideo), [entity?._historyvideo]);
  const youtubeData = useMemo(() => youtubeId ? {
    thumbnail: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
    webUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
  } : null, [youtubeId]);

  const secureLogoUrl = entity?._logoUrl?.replace(/^http:/, "https:") || null;

  return (
    <>
      <h1 className="text-xl text-custom-blue font-bold ArchivoExtraBold">
        <span className="marker-effect-cyan">{title}</span>
      </h1>
      <div className="px-1 py-1 flex flex-row gap-3">
        {secureLogoUrl ? (
          <img src={secureLogoUrl} className="w-2/5 object-contain" alt={title} loading="lazy" />
        ) : (
          <div className="w-2/5 min-h-20 bg-gray-200 flex items-center justify-center rounded">
            <span className="text-gray-400 text-xs">Logo non disponible</span>
          </div>
        )}
        <div className="flex flex-col gap-3">
          <SocialLinks networks={socialNetworks} />
          <div className="flex flex-col font-bold gap-1">
            {entity?._url && <a href={entity._url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#2c6b66] Archivo underline">Site internet</a>}
            {entity?._email && <a href={`mailto:${entity._email}`} className="text-xs text-[#2c6b66] Archivo underline">Contact SAV</a>}
          </div>
        </div>
      </div>
      <div className="px-1 text-[#2c6b66] text-sm Archivo">
        <ReadMoreText text={entity?._history} />
      </div>
      {youtubeData && (
        <div className="px-4">
          <a href={youtubeData.webUrl} className="relative block">
            <img src={youtubeData.thumbnail} alt={`Vidéo de ${title}`} className="w-full h-40 object-cover rounded" loading="lazy" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.5 7.5v9l7-4.5z" />
              </svg>
            </div>
          </a>
        </div>
      )}
    </>
  );
});

const BrandInfo = React.memo(({ togglePanel, markInfo, provider }) => {
  return (
    <div className="bg-custom-green-clear rounded-e-[2rem] relative pb-12" style={{ width: "calc(100% - 16px)" }}>
      <div className="px-4 py-6 flex flex-col gap-4">
        {markInfo && <EntitySection entity={markInfo} title="La marque" />}
        {provider && <EntitySection entity={provider} title="L'entreprise" />}
        <img src={FICHETOP} className="w-12 absolute bottom-1 right-0 cursor-pointer transition-transform hover:scale-110" onClick={() => togglePanel(6)} alt="Toggle Panel" />
      </div>
    </div>
  );
});

export default BrandInfo;