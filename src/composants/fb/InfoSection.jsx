import React, { useState } from "react";
import titreBg from "../../assets/fb/titreBg.svg";
import pictoNutrition from "../../assets/fb/pictoNutrition.png";
import pictoAdditifs from "../../assets/fb/additifs.svg";
import pictoTransformation from "../../assets/fb/pictoTransformation.png";
import pictoenvirronnement from "../../assets/fb/pictoenvirronnement.png";
import pictoRemuneration from "../../assets/fb/pictorémunération.png";
import illustrationOrigines from "../../assets/fb/BubbleImg.svg";
import pastilleNoteA from "../../assets/fb/pastille-note-a.svg";
import pastilleNoteB from "../../assets/fb/pastille-note-b.svg";
import pastilleNoteC from "../../assets/fb/pastille-note-c.svg";
import pastilleNoteD from "../../assets/fb/pastille-note-d.svg";
import pastilleNoteE from "../../assets/fb/pastille-note-e.svg";
import { chevronForwardOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import pastilleNote1 from "../../assets/fb/pastille-note-1.svg";
import pastilleNote2 from "../../assets/fb/pastille-note-2.svg";
import pastilleNote3 from "../../assets/fb/pastille-note-3.svg";
import pastilleNote4 from "../../assets/fb/pastille-note-4.svg";
import FlecheContact from "../../assets/fb/FlecheContact.svg";
import { ContactModal, ContactAdditif } from "./Modal";
import { IonContent, IonModal } from "@ionic/react";
import NutritionContent from "./NutritionContent";
import ReturnImage from "../../assets/fb/flech.svg";


const InfoSection = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenadd, setIsOpenadd] = useState(false);
  const [isOpenNutrition, setIsOpenNutrition] = useState(false);

  // Mapping nutriscore to images
  const nutriscoreImages = {
    A: pastilleNoteA,
    B: pastilleNoteB,
    C: pastilleNoteC,
    D: pastilleNoteD,
    E: pastilleNoteE,
  };
  // Mapping nova to images
  const novaImages = {
    1: pastilleNote1,
    2: pastilleNote2,
    3: pastilleNote3,
    4: pastilleNote4,
  };

  // Select the image based on product.nutriscore or provide a default
  const selectedNutriscoreImage =
    nutriscoreImages[product?.nutriscore] || pastilleNoteB;
  const selectedNovaImage = novaImages[product?.nova] || pastilleNote4;

  return (
    <>
    
      <div className="w-full px-2 py-4 mx-auto bg-custom-green-clear">
      <div className="text-center text-blue-700 text-lg font-medium mb-4">
        LA SYNTHÈSE SUR LE PRODUIT
      </div>
        <div className="grid grid-cols-2 divide-p divide-custom-green-divider">
          {/* Nutrition Section */}
          <div className="pb-3 pr-2 border-b border-custom-green-divider flex flex-col justify-around">
            <div
              className="text-lg font-semibold text-custom-blue bg-no-repeat bg-contain h-8 flex flex-row items-end relative"
              style={{
                backgroundImage: `url(${titreBg})`,
              }}
            >
              <div className="w-4"></div>Nutrition
            </div>
            <div className="flex flex-row items-center justify-between mt-1 space-x-1 ">
              <img
                src={pictoNutrition}
                className="w-9 h-auto"
                alt="Pictogramme Nutrition"
              />
              {product?.nutriscore ? (
                <div
                  className="text-white font-bold text-lg rounded-full min-w-12 min-h-12 flex items-center justify-center bg-contain bg-no-repeat"
                  style={{
                    backgroundImage: `url(${selectedNutriscoreImage})`,
                    backgroundPosition: "center",
                  }}
                >
                  {product.nutriscore}
                </div>
              ) : (
                <div className="text-gray-500 flex items-center justify-center text-[0.60rem]">
                  Données non communiquées par le fabricant
                  <br />
                  <a
                    href="mailto:contact@example.com"
                    className="text-custom-blue underline"
                  >
                    Contacter le fabricant
                  </a>
                </div>
              )}
              <div>
                <IonIcon
                  className="text-2xl text-custom-blue"
                  icon={chevronForwardOutline}
                  onClick={() => setIsOpenNutrition(true)}
                />
              </div>
            </div>
          </div>

          {/* Additifs Section */}
          <div className="pl-3 pb-3 border-l border-b border-custom-green-divider flex flex-col justify-around">
            <div
              className="text-lg font-semibold text-custom-blue bg-no-repeat bg-contain h-8 flex flex-row items-end relative"
              style={{
                backgroundImage: `url(${titreBg})`,
              }}
            >
              <div className="w-4"></div>Additifs
            </div>
            <div className="flex flex-row items-center justify-between mt-1 space-x-1 ">
              <img
                src={pictoAdditifs}
                className="w-7 h-auto"
                alt="Pictogramme Additifs"
              />
              <div className="text-custom-blue flex items-center justify-center text-xs">
                Contient{" "}
                {product?.additifs?.length
                  ? product?.additifs?.length
                  : "Données non communiquées par le fabricant"}{" "}
                additifs
              </div>
              <div>
                <IonIcon
                  className="text-2xl text-custom-blue"
                  icon={chevronForwardOutline}
                  onClick={() => setIsOpenadd(true)}
                />
              </div>
            </div>
          </div>

          {/* Transformation, Environnement, Juste rémunération Sections */}
          <div className="py-2 pr-2  border-custom-green-divider">
            {/* Transformation */}
            <div>
              <div
                className="text-lg font-semibold text-custom-blue bg-no-repeat bg-contain h-8 flex flex-row items-end relative"
                style={{
                  backgroundImage: `url(${titreBg})`,
                }}
              >
                <div className="w-4"></div>Transformation
              </div>
              <div className="flex flex-row items-center justify-between mt-1 space-x-1 ">
                <img
                  src={pictoTransformation}
                  className="w-9 h-auto"
                  alt="Pictogramme Transformation"
                />
                {product?.nova2 ? (
                  <div
                    className="text-white font-bold text-lg rounded-full min-w-12 min-h-12 flex items-center justify-center bg-contain bg-no-repeat"
                    style={{
                      backgroundImage: `url(${selectedNovaImage})`,
                      backgroundPosition: "center",
                    }}
                  >
                    {product.nova}
                  </div>
                ) : (
                  <div className="text-gray-500 flex items-center justify-center text-[0.60rem]">
                    Pas encore renseignée
                    <br />
                    sollicitez la marque pour plus de transparence
                  </div>
                )}
                <div>
                  <IonIcon
                    className="text-2xl text-custom-blue"
                    icon={chevronForwardOutline}
                  />
                </div>
              </div>
            </div>

            {/* Environnement */}
            <div className="mt-4 border-t pt-2 border-custom-green-divider">
              <div
                className="text-lg font-semibold text-custom-blue bg-no-repeat bg-contain h-8 flex flex-row items-end relative"
                style={{
                  backgroundImage: `url(${titreBg})`,
                }}
              >
                <div className="w-4"></div>Environnement
              </div>
              <div className="flex flex-row items-center justify-between mt-1 space-x-1 ">
                <img
                  src={pictoenvirronnement}
                  className="w-9 h-auto"
                  alt="Pictogramme Environnement"
                />
                <div className="text-gray-500 flex items-center justify-center text-[0.60rem]">
                  Pas encore renseignée
                  <br />
                  sollicitez la marque pour plus de transparence
                </div>
                <div>
                  <IonIcon
                    className="text-2xl text-custom-blue"
                    icon={chevronForwardOutline}
                  />
                </div>
              </div>
            </div>

            {/* Juste rémunération */}
            <div className="mt-4 border-t pt-2 border-custom-green-divider">
              <div
                className="text-lg font-semibold text-custom-blue bg-no-repeat bg-contain h-8 flex flex-row items-end relative"
                style={{
                  backgroundImage: `url(${titreBg})`,
                }}
              >
                <div className="w-3"></div>Juste rémunération
              </div>
              <div className="flex flex-row items-center justify-between mt-1 space-x-1 ">
                <img
                  src={pictoRemuneration}
                  className="w-9 h-auto"
                  alt="Pictogramme Juste rémunération"
                />
                <div className="text-gray-500 flex items-center justify-center text-[0.60rem]">
                  Pas encore renseignée
                  <br />
                  sollicitez la marque pour plus de transparence
                </div>
                <div>
                  <IonIcon
                    className="text-2xl text-custom-blue"
                    icon={chevronForwardOutline}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Origines Section (Full Height) */}
          <div className="py-3 pl-2 border-l border-custom-green-divider">
            <div
              className="text-lg font-semibold text-custom-blue bg-no-repeat bg-contain h-8 flex flex-row items-end relative"
              style={{
                backgroundImage: `url(${titreBg})`,
              }}
            >
              <div className="w-4"></div>Origines
            </div>
            <div className="text-gray-500 mt-2 px-2 text-sm">
              Pas encore renseignée
              <br />
              sollicitez la marque pour plus de transparence
              <div className="mt-6 flex flex-row justify-around items-start">
                <img className="w-12" src={FlecheContact} />
                <img
                  className="w-20 mt-2 transition-transform duration-150 ease-in-out active:scale-95"
                  src={illustrationOrigines}
                  alt="Illustration des origines du produit"
                  onClick={() => setIsOpen(true)}
                />
              </div>
            </div>
          </div>
        </div>
        <ContactModal isOpen={isOpen} setIsOpen={setIsOpen} />
        <ContactAdditif
          isOpen={isOpenadd}
          setIsOpen={setIsOpenadd}
          additifs={product?.additifs}
        />
      </div>
      <IonModal isOpen={isOpenNutrition}>
        <div className="flex justify-start space-x-3 items-center pt-3 pb-2 px-3  modal-background ">
          <button
            className="text-custom-blue transform transition-transform duration-150 ease-in-out active:scale-90"
            onClick={() => setIsOpenNutrition(false)}
          >
            <img src={ReturnImage} alt="Close" className="w-auto h-11" />
          </button>
          <h1 className="text-2xl">{product?.name}</h1>
        </div>
        <IonContent className="ion-padding-bottom">
          <NutritionContent nutriscore={product?.nutriscore} />
        </IonContent>
      </IonModal>
    </>
  );
};

export default React.memo(InfoSection);
