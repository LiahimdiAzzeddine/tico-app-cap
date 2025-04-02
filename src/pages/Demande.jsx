import React from "react";
import SimpleLyout from "../composants/layout/SimpleLyout";
import VF from "../assets/history/vf.svg";
import { IonButton, useIonRouter } from "@ionic/react";
import Position from "../assets/demandes/position.svg";
import Ligne from "../assets/demandes/ligne.svg";
import TopPosition from "../assets/demandes/topPosition.svg";

const ProgressBarSVG = ({ position }) => {
    // Assurer que la valeur reste entre 0 et 1000
    const clampedPosition = Math.min(1000, Math.max(0, position));
  
    // Largeur de la ligne
    const width = 300; // Largeur totale de la ligne
    const height = 20; // Hauteur du SVG
  
    // Calcul de la position du point
    const pointX = (clampedPosition / 1000) * width;
  
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Ligne de fond */}
        <line x1="0" y1="10" x2={width} y2="10" stroke="#ccc" strokeWidth="4" />
        
        {/* Point dynamique */}
        <circle cx={pointX} cy="10" r="6" fill="#4E986D" />
  
        {/* Marque finale (1000 demandes) */}
        <circle cx={width} cy="10" r="6" fill="#ff6600" />
      </svg>
    );
  };
const Demande = () => {
  const history = useIonRouter();

  return (
    <>
      <SimpleLyout
        Close={() => {
          history.goBack();
        }}
        image={VF}
      >
        <div className="p-4 details flex flex-col h-full">
          {/* Titre avec fond */}
          <div className="relative flex justify-center items-center mb-4 backgroundHistorique min-h-[90px]">
            <div className="absolute rounded-full w-[230px] "></div>
            <h2 className="text-center text-custom-green-text text-[1.7rem] titre-bold z-10">
            Suivi&nbsp;de&nbsp;mes&nbsp;demandes
            </h2>
          </div>
         

          {/* Contenu principal */}
          <div className="flex-grow overflow-y-auto flex flex-col justify-center items-center gap-6 text-center">
            {/* Nombre de demandes */}
            <div className="text-custom-green-text text-lg Archivo">
              XX demandes sur ce produit
            </div>

            {/* Illustration avec images */}
            <div className="flex items-center space-x-2">
                {/** 
              <img src={Position} alt="position" className="w-10 h-10" />
              <img src={Ligne} alt="ligne" className="w-28" />
              <img src={TopPosition} alt="TopPosition" className="w-10 h-10" />*/}
              <ProgressBarSVG position={500}/>
            </div>

            {/* Objectif 1000 demandes */}
            <div className="text-custom-green-text text-xl ArchivoExtraBold">
              Objectif 1000 demandes
            </div>
            <div className="text-custom-green-text text-base leading-relaxed Archivo px-4">
              À partir de <b>50 demandes</b>, nous entrons en contact avec les marques.
              À partir de <b>1000 demandes</b>, elles n’ont plus le choix, elles doivent agir.
            </div>

            {/* Message d’invitation */}
            <div className="text-custom-blue text-lg italic Archivo">
              Pour plus d’impact, invitez votre entourage à solliciter cette marque.
            </div>

            {/* Bouton d'envoi */}
            <IonButton
              fill="clear"
              className="bg-[#4E986D] ArchivoBold text-white text-lg py-2 px-8 rounded-xl !normal-case"
            >
              Envoyer
            </IonButton>
          </div>
        </div>
      </SimpleLyout>
    </>
  );
};

export default React.memo(Demande);
