import React from "react";
import FICHETOP from "../../../assets/fb/FICHETOP.svg";
import planetScore from "../../../assets/fb/planetScore/b-abe-planet-score-243x132.png";
import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
} from "@ionic/react";
import fleche from "../../../assets/fb/flechBottom.svg";

const panelConfigs = [
  {
    id: "10",
    title: "Pesticides",
    disabled: false,
    content: <div className="p-4 text-mockup-green">Contenu sur les pesticides...</div>,
  },
  {
    id: "20",
    title: "Biodiversité",
    disabled: false,
    content: <div className="p-4 text-mockup-green">Contenu sur la biodiversité...</div>,
  },
  {
    id: "30",
    title: "Climat",
    disabled: false,
    content: <div className="p-4 text-mockup-green">Contenu sur le climat...</div>,
  },
  {
    id: "40",
    title: "Bien-être animal",
    disabled: false,
    content: <div className="p-4 text-mockup-green">Contenu sur le bien-être animal...</div>,
  },
];

function TransformationInfo({ togglePanel }) {
  // Add a handler for child accordion changes
  const handleChildAccordionChange = (e) => {
    // Stop event propagation to prevent parent accordion from closing
    e.stopPropagation();
  };

  // Handler for preventing clicks from bubbling up
  const handleItemClick = (e) => {
    // Stop event propagation to prevent parent accordion from toggling
    e.stopPropagation();
  };

  return (
    <div
      className="bg-custom-green-clear rounded-e-[2rem] left-0 min-h-72 z-0 relative pb-8"
      style={{ width: "calc(100% - 16px)" }}
      onClick={(e) => e.stopPropagation()} // Stop clicks on container from bubbling up
    >
      <div className=" py-6">
        <h1 className="text-xl px-4 text-custom-blue font-bold">
          <span className="marker-effect-cyan ArchivoExtraBold">
            Planet-Score
          </span>
        </h1>
        <div className="px-4 py-4 flex flex-col gap-1 w-11/12 justify-center justify-items-center m-auto bg-no-repeat bg-contain bg-bottom recetteBg">
          <div className="w-full  py-3">
            <img
              src={planetScore}
              className="w-9/12 m-auto max-w-60 max-h-60"
              alt="Planet score b"
            />
          </div>
          <div className="text-sm text-mockup-green Archivo pb-4">
            Le Planet-Score est un système d'évaluation complet qui donne une
            vision globale de la durabilité d'un produit. Il prend en compte
            deux grandes thématiques :
            <ul className="list-outside">
              <li>- &nbsp;Impact environnemental</li>
              <li>- &nbsp;Bien-être animal</li>
            </ul>
          </div>
          <div className="text-sm text-mockup-green Archivo">
            Basé sur des données scientifiques solides, c'est le score le plus
            précis pour mesurer l'impact d'un produit sur l'environnement. Son
            évaluation est réalisée par une équipe d'experts indépendants,
            garantissant une analyse fiable et objective.
          </div>
        </div>
        <div className="w-full pb-6">
          <IonAccordionGroup
            id="group2"
            onIonChange={handleChildAccordionChange} // Add event handler for changes
            onClick={(e) => e.stopPropagation()} // Stop all click events in this group
          >
            {panelConfigs.map((panel) => (
              <IonAccordion
                key={panel.id}
                value={panel.id}
                disabled={panel.disabled}
                className="z-0 pl-0"
                style={{ display: "contents" }}
                toggleIcon={<></>}
                onClick={(e) => e.stopPropagation()} // Stop propagation on accordion
              >
                <IonItem
                  slot="header"
                  lines="inset"
                  style={{
                    overflow: "visible",
                    "--border-color": "#c6e8e5",
                    "--inner-border-width": "0 0 2px 0",
                    "--padding-end": "16px",
                    "--padding-top": "2px",
                    "--background": "transparent",
                  }}
                  className={`relative ${panel.id === "4" ? "z-50" : "z-0"} ${
                    panel.disabled ? "text-custom-gray" : "text-custom-blue"
                  }`}
                  onClick={handleItemClick} // Stop propagation on header items
                >
                  <IonLabel
                    className="text-xl z-40 ion-no-padding"
                    style={{ display: "contents" }}
                    onClick={(e) => e.stopPropagation()} // Stop propagation on label
                  >
                    <span
                      className="ArchivoExtraBold mr-1 pt-2"
                      onClick={(e) => e.stopPropagation()} // Stop propagation on text
                    >
                      {panel.title}
                    </span>
                    {!panel.disabled && (
                      <img
                        src={fleche}
                        className="w-9 h-auto px-2 pt-3"
                        onClick={(e) => e.stopPropagation()} // Stop propagation on arrow
                        alt="Toggle arrow"
                      />
                    )}
                  </IonLabel>
                </IonItem>

                <div
                  slot="content"
                  className="z-0 p-0"
                  onClick={(e) => e.stopPropagation()} // Stop propagation on content
                >
                  {panel.content}
                </div>
              </IonAccordion>
            ))}
          </IonAccordionGroup>
        </div>
        <img
          src={FICHETOP}
          className="w-12 absolute bottom-1 right-0"
          onClick={(e) => {
            e.stopPropagation(); // Stop propagation
            togglePanel(3);
          }}
          alt="Toggle Panel"
        />
      </div>
    </div>
  );
}

export default TransformationInfo;
