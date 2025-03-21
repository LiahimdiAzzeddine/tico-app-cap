import React, { useState, useCallback, useMemo } from "react";
import FICHETOP from "../../../assets/fb/FICHETOP.svg";
import {
  logoYoutube,
  logoFacebook,
  logoInstagram,
  logoLinkedin,
  chatbubbleEllipsesOutline,
} from "ionicons/icons";
import { IonIcon } from "@ionic/react";

// Moved icons to a constant map to avoid recreating on each render
const SOCIAL_ICONS = {
  Facebook: logoFacebook,
  LinkedIn: logoLinkedin,
  Instagram: logoInstagram,
  YouTube: logoYoutube,
};

const SocialLinks = React.memo(({ networks }) => {
  // Use memoized function to avoid recreating on each render
  const getIcon = useCallback((label) => {
    return SOCIAL_ICONS[label] || chatbubbleEllipsesOutline;
  }, []);

  if (!networks || networks.length === 0) {
    return <span className="text-xs text-gray-400">Aucun réseau social</span>;
  }

  return (
    <div className="flex gap-3">
      {networks.map((network) => (
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
      ))}
    </div>
  );
});

SocialLinks.displayName = "SocialLinks";

const ReadMoreText = React.memo(({ text, maxLength = 150 }) => {
  const [showFullText, setShowFullText] = useState(false);

  if (!text) {
    return <p className="text-xs text-gray-400">Aucune information disponible</p>;
  }

  const toggleText = useCallback(() => {
    setShowFullText((prevState) => !prevState);
  }, []);

  const shouldShowToggle = text.length > maxLength;
  const displayText = showFullText
    ? text
    : text.slice(0, maxLength) + (shouldShowToggle ? "... " : "");

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
});

ReadMoreText.displayName = "ReadMoreText";

// Helper function to extract YouTube ID - moved outside component to avoid recreation
const getYoutubeId = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  return match ? match[1] : null;
};

const EntitySection = React.memo(({ entity, title, entityType }) => {
  const socialNetworks = useMemo(() => 
    Object.values(entity?._reseaux || {}), 
    [entity?._reseaux]
  );

  const youtubeId = useMemo(() => 
    entity?._historyvideo ? getYoutubeId(entity._historyvideo) : null, 
    [entity?._historyvideo]
  );
  
  const youtubeData = useMemo(() => {
    if (!youtubeId) return { thumbnail: null, webUrl: "#", deepLink: "#", intent: "#" };
    
    return {
      thumbnail: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
      webUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
      deepLink: `youtube://watch?v=${youtubeId}`,
      intent: `intent://www.youtube.com/watch?v=${youtubeId}#Intent;package=com.google.android.youtube;scheme=https;end;`
    };
  }, [youtubeId]);

  // Use callback to avoid recreation on each render
  const handleVideoClick = useCallback((e) => {
    if (!youtubeId) return;
    e.preventDefault();

    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isAndroid) {
      window.location.href = youtubeData.intent;
    } else if (isIOS) {
      window.location.href = youtubeData.deepLink;
    }

    // Fallback: open in browser if app doesn't open
    setTimeout(() => {
      window.open(youtubeData.webUrl, "_blank");
    }, 1000);
  }, [youtubeId, youtubeData]);

  // Ensure https for logo URLs
  const secureLogoUrl = useMemo(() => {
    if (!entity?._logoUrl) return null;
    return entity._logoUrl.startsWith("http://")
      ? entity._logoUrl.replace("http://", "https://")
      : entity._logoUrl;
  }, [entity?._logoUrl]);

  return (
    <>
      <h1 className="text-xl text-custom-blue font-bold ArchivoExtraBold">
        <span className="marker-effect-cyan">{title}</span>
      </h1>

      <div className="px-1 py-1 flex flex-row gap-3">
        {secureLogoUrl ? (
          <img
            src={secureLogoUrl}
            className="w-2/5 object-contain"
            alt={title}
            loading="lazy"
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
                href={`mailto:${entity._email}`}
                className="text-xs text-[#2c6b66] Archivo normal-case underline underline-offset-1 cursor-pointer"
              >
                Contact SAV
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="px-1 text-[#2c6b66] text-sm Archivo">
        <ReadMoreText text={entity?._history} />
      </div>

      {youtubeId && (
        <div className="px-4">
          <a
            href={youtubeData.webUrl}
            onClick={handleVideoClick}
            className="relative block"
          >
            <img
              src={youtubeData.thumbnail}
              alt={`Vidéo de ${entityType}`}
              className="w-full h-40 object-cover rounded"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9.5 7.5v9l7-4.5z" />
              </svg>
            </div>
          </a>
        </div>
      )}
    </>
  );
});

EntitySection.displayName = "EntitySection";

const BrandInfo = React.memo(({ togglePanel, markInfo, provider, openPanel }) => {
  // Use callback to stabilize the togglePanel function
  const handleToggle = useCallback((e) => {
    e.stopPropagation();
    togglePanel(6);
  }, [togglePanel]);

  return (
    <div
      className="bg-custom-green-clear rounded-e-[2rem] left-0 z-0 relative pb-12"
      style={{ width: "calc(100% - 16px)" }}
    >
      <div className="px-4 py-6 flex flex-col gap-4">
        {markInfo && (
          <EntitySection
            entity={markInfo}
            title="La marque"
            entityType="de la marque"
          />
        )}
        {provider && (
          <EntitySection
            entity={provider}
            title="L'entreprise"
            entityType="de l'entreprise"
          />
        )}
        <img
          src={FICHETOP}
          className="w-12 absolute bottom-1 right-0 cursor-pointer transition-transform hover:scale-110"
          onClick={handleToggle}
          alt="Toggle Panel"
        />
      </div>
    </div>
  );
});

BrandInfo.displayName = "BrandInfo";

export default BrandInfo;