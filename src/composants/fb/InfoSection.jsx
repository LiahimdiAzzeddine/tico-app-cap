import React, { useState } from "react";
import illustrationOrigines from "../../assets/fb/BubbleImg.svg";

import { chevronForwardOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { ContactModal, ContactAdditif } from "./Modal";
import { IonContent, IonModal } from "@ionic/react";
import NutritionContent from "./NutritionContent";
import ReturnImage from "../../assets/fb/flech.svg";

import Nutri_score_A from "../../assets/fb/score/Nutri_score_A.png";
import Nutri_score_B from "../../assets/fb/score/Nutri-score-B.png";
import Nutri_score_C from "../../assets/fb/score/Nutri-score-C.png";
import Nutri_score_D from "../../assets/fb/score/Nutri-score-D.png";
import Nutri_score_E from "../../assets/fb/score/Nutri-score-E.png";
import Sections from "./Sections";

const InfoSection = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenadd, setIsOpenadd] = useState(false);
  const [isOpenNutrition, setIsOpenNutrition] = useState(false);


  // Mapping nutriscore to images
  const nutriscoreImages = {
    A: Nutri_score_A,
    B: Nutri_score_B,
    C: Nutri_score_C,
    D: Nutri_score_D,
    E: Nutri_score_E,
  };


  // Select the image based on product.nutriscore or provide a default
  const selectedNutriscoreImage =
    nutriscoreImages[product?.nutriscore] || Nutri_score_E;

  return (
    <div className="pt-2">
      <div className="relative w-full px-2 pt-12 pb-6 mx-auto bg-custom-green-clear">
        {/* Title positioned between the white background and blue container */}
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="bg-[#a9d7d4] px-4 py-2 rounded-full text-custom-blue font-bold text-base">
            LA SYNTHÈSE SUR LE PRODUIT
          </span>
        </div>
        <div className="grid grid-cols-2 divide-p divide-custom-green-divider">
          {/* Nutrition Section */}
          <div className="pb-2 pr-2 border-b border-custom-green-divider flex flex-col justify-start">
            <div className="text-sm font-bold text-custom-blue z-10 w-full">
              <span className="marker-effect-cyan font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                Informations nutritionnelles
              </span>
            </div>
            <div className="flex flex-row items-center justify-around py-2 space-x-4 ">
              {product?.nutriscore ? (
                <img src={selectedNutriscoreImage} className="w-28 h-auto" />
              ) : (
                <div className="text-gray-500 flex items-center justify-center text-xs">
                  Données non communiquées
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
            <div className="text-xs text-[#42a29a]">
              {product?.nutriscore_comment}
            </div>
            {!(product?.nutriscore_comment && product?.nutriscore)  && (
                <div className="text-xs flex flex-row space-x-2 mt-3">
                  <div className="text-custom-gray">
                    Encouragez la marque à atteindre 100% de transparence
                  </div>
                  <div>
                    <img
                      className="w-28 mt-2 transition-transform duration-150 ease-in-out active:scale-95"
                      src={illustrationOrigines}
                      alt="Illustration des origines du produit"
                      onClick={() => setIsOpen(true)}
                    />
                  </div>
                </div>
              )}
          </div>

          {/* Additifs Section */}
          <div className="px-2 pb-3 border-l border-b border-custom-green-divider flex flex-col justify-start">
            <div className="text-sm font-bold text-custom-blue z-10">
              <span className="marker-effect-cyan font-bold">
                Naturalité des ingrédients
              </span>
            </div>
            <div className="flex flex-row items-center justify-between py-2 space-x-1 ">
              <div className="text-custom-blue flex items-center justify-center text-xs font-bold">
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
            {product?.commentaire ? (
              <div className="text-xs text-[#42a29a]"></div>
            ) : (
              <div className="text-xs flex flex-row space-x-2">
                <div className="text-custom-gray">
                  Encouragez la marque à atteindre 100% de transparence
                </div>
                <div>
                  <img
                    className="w-28 mt-2 transition-transform duration-150 ease-in-out active:scale-95"
                    src={illustrationOrigines}
                    alt="Illustration des origines du produit"
                    onClick={() => setIsOpen(true)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Impact environnemental, */}
          <div className="py-2 pr-2  border-custom-green-divider">
            {/* Impact environnemental */}
            <div>
              <div className="text-sm font-bold text-custom-blue  w-full">
                <span className="marker-effect-cyan font-bold whitespace-nowrap overflow-hidden text-ellipsis z-50">
                  Impact environnemental
                </span>
              </div>
              <div className="flex flex-row items-center justify-around py-2 space-x-4">
                {product?.commentaire ? (
                  <>
                    {product?.planetScore ? (
                      <img src={product?.planetScore} className="w-36 h-auto" />
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
                      />
                    </div>
                  </>
                ) : (
                  <div className="text-xs flex flex-row space-x-2">
                    <div className="text-custom-gray">
                      Encouragez la marque à atteindre 100% de transparence
                    </div>
                    <div>
                      <img
                        className="w-28 mt-2 transition-transform duration-150 ease-in-out active:scale-95"
                        src={illustrationOrigines}
                        alt="Illustration des origines du produit"
                        onClick={() => setIsOpen(true)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Origines Section (Full Height) */}
          <div className="py-2 px-2 border-l border-custom-green-divider">
            <div className="text-sm font-bold text-custom-blue z-10 w-full">
              <span className="marker-effect-cyan font-bold whitespace-nowrap overflow-hidden text-ellipsis z-50">
                Origines
              </span>
            </div>
            <div className="flex flex-row items-center justify-start py-2 space-x-1">
              {product?.commentaire ? (
                <div className="text-xs text-[#42a29a]"></div>
              ) : (
                <div className="text-xs flex flex-row space-x-2">
                  <div className="text-custom-gray">
                    Encouragez la marque à atteindre 100% de transparence
                  </div>
                  <div>
                    <img
                      className="w-28 mt-2 transition-transform duration-150 ease-in-out active:scale-95"
                      src={illustrationOrigines}
                      alt="Illustration des origines du produit"
                      onClick={() => setIsOpen(true)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <ContactModal isOpen={isOpen} setIsOpen={setIsOpen} />
        <ContactAdditif
          isOpen={isOpenadd}
          setIsOpen={setIsOpenadd}
          additifs={product?.additifs}
        />
        <Sections />
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
    </div>
  );
};

export default React.memo(InfoSection);
