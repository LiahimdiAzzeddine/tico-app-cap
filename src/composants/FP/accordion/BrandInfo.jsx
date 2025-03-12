import React, { useState } from "react";
import FICHETOP from "../../../assets/fb/FICHETOP.svg";
import {
  logoYoutube,
  logoFacebook,
  logoInstagram,
  logoLinkedin,
  chatbubbleEllipsesOutline,
} from "ionicons/icons";
import { IonIcon } from "@ionic/react";

function BrandInfo({ togglePanel }) {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div
      className="bg-custom-green-clear rounded-e-[2rem] left-0 min-h-72 z-0 relative pb-8"
      style={{ width: "calc(100% - 16px)" }}
    >
      <div className="px-4 py-6 flex flex-col gap-4">
        <h1 className="text-xl text-custom-blue font-bold ArchivoExtraBold">
          <span className="marker-effect-cyan ArchivoExtraBold">La marque</span>
        </h1>

        <div className="px-4 py-1 flex flex-row gap-3">
          {/* Logo de la marque */}
          <img
            src="https://cdn.worldvectorlogo.com/logos/logo-bleu-blanc-coeur-1.svg"
            className="w-1/3"
            alt="Marque"
          />

          {/* Réseaux sociaux */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <IonIcon
                icon={logoYoutube}
                className="w-7 h-7 text-mockup-green"
                alt="YouTube"
              />
              <IonIcon
                icon={logoFacebook}
                className="w-7 h-7 text-mockup-green"
                alt="Facebook"
              />
              <IonIcon
                icon={logoInstagram}
                className="w-7 h-7 text-mockup-green"
                alt="Instagram"
              />
              <IonIcon
                icon={logoLinkedin}
                className="w-7 h-7 text-mockup-green"
                alt="LinkedIn"
              />
              <IonIcon
                icon={chatbubbleEllipsesOutline}
                className="w-7 h-7 text-mockup-green"
                alt="chatbubbleEllipsesOutline"
              />
            </div>

            {/* Liens du site */}
            <div className="flex flex-col font-bold gap-1">
              <a
                href="#"
                className="text-xs text-[#2c6b66] Archivo normal-case underline underline-offset-1 cursor-pointer"
              >
                Site internet
              </a>
              <a
                href="#"
                className="text-xs text-[#2c6b66] Archivo normal-case underline underline-offset-1 cursor-pointer"
              >
                Contact SAV
              </a>
            </div>
          </div>
        </div>

        {/* Texte avec "Lire plus" */}
        <div className="px-4 text-[#2c6b66] text-sm  Archivo">
          {showFullText ? (
            <>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </>
          ) : (
            <>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit...
            </>
          )}
          <button
            onClick={toggleText}
            className="text-[#2c6b66] font-bold  Archivo underline"
          >
            {showFullText ? "Lire moins" : "Lire plus"}
          </button>
        </div>

        {/* Vidéo */}
        <div className="px-4">
          <video className="w-full bg-custom-blue h-40" controls>
            <source src="video.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>
        </div>
        <h1 className="text-xl text-custom-blue font-bold ArchivoExtraBold">
          <span className="marker-effect-cyan ArchivoExtraBold">
            L’entreprise
          </span>
        </h1>

        <div className="px-4 py-1 flex flex-row gap-3">
          {/* Logo de la marque */}
          <img
            src="https://cdn.worldvectorlogo.com/logos/logo-bleu-blanc-coeur-1.svg"
            className="w-1/3"
            alt="Marque"
          />

          {/* Réseaux sociaux */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <IonIcon
                icon={logoYoutube}
                className="w-7 h-7 text-mockup-green"
                alt="YouTube"
              />
              <IonIcon
                icon={logoFacebook}
                className="w-7 h-7 text-mockup-green"
                alt="Facebook"
              />
              <IonIcon
                icon={logoInstagram}
                className="w-7 h-7 text-mockup-green"
                alt="Instagram"
              />
              <IonIcon
                icon={logoLinkedin}
                className="w-7 h-7 text-mockup-green"
                alt="LinkedIn"
              />
              <IonIcon
                icon={chatbubbleEllipsesOutline}
                className="w-7 h-7 text-mockup-green"
                alt="chatbubbleEllipsesOutline"
              />
            </div>

            {/* Liens du site */}
            <div className="flex flex-col font-bold gap-1">
              <a
                href="#"
                className="text-xs text-[#2c6b66] Archivo normal-case underline underline-offset-1 cursor-pointer"
              >
                Site internet
              </a>
              <a
                href="#"
                className="text-xs text-[#2c6b66] Archivo normal-case underline underline-offset-1 cursor-pointer"
              >
                Contact SAV
              </a>
            </div>
          </div>
        </div>

        {/* Texte avec "Lire plus" */}
        <div className="px-4 text-[#2c6b66] text-sm  Archivo">
          {showFullText ? (
            <>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </>
          ) : (
            <>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit...
            </>
          )}
          <button
            onClick={toggleText}
            className="text-[#2c6b66] font-bold  Archivo underline"
          >
            {showFullText ? "Lire moins" : "Lire plus"}
          </button>
        </div>

        {/* Vidéo */}
        <div className="px-4 pb-6">
          <video className="w-full bg-custom-blue h-40" controls>
            <source src="video.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>
        </div>
        <img
          src={FICHETOP}
          className="w-12 absolute bottom-1 right-0"
          onClick={(e) => {
            e.stopPropagation(); // Stop propagation
            togglePanel(6);
          }}
          alt="Toggle Panel"
        />
      </div>
    </div>
  );
}
[];

export default BrandInfo;
