import React, { useState } from "react";
import illustrationOrigines from "../../assets/fb/BubbleImg.svg";
import { chevronForwardOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { ContactAdditif, NutrriInfo, Solliciter } from "./Modal";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Nutri_score_A from "../../assets/fb/score/Nutri_score_A.png";
import Nutri_score_B from "../../assets/fb/score/Nutri-score-B.png";
import Nutri_score_C from "../../assets/fb/score/Nutri-score-C.png";
import Nutri_score_D from "../../assets/fb/score/Nutri-score-D.png";
import Nutri_score_E from "../../assets/fb/score/Nutri-score-E.png";
import Sections from "./Sections";
import { useIonRouter } from "@ionic/react";
import { useAlert } from "../../context/AlertProvider";
import { useGlobalContext } from "./GlobalProvider";
import flecheLeft from "../../assets/fb/FICHEFleche.svg";

const InfoSection = ({
  product,
  togglePanel,
  scrollToTarget,
  scrollToTargetById,
  targetRefNutriInfo,
  targetRefRecettes,
  targetRefAdditifs,
}) => {
  const { setHasRequested, hasRequested, setIsCourager } = useGlobalContext();

  const [isOpenadd, setIsOpenadd] = useState(false);
  const [isOpenNutrition, setIsOpenNutrition] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const history = useIonRouter();
  const goToPage = (path) => {
    history.push(path, "root", "replace");
  };
  const { triggerAlert } = useAlert();
  // Mapping nutriscore to images
  const nutriscoreImages = {
    A: Nutri_score_A,
    B: Nutri_score_B,
    C: Nutri_score_C,
    D: Nutri_score_D,
    E: Nutri_score_E,
  };
  const nutriscoreComment = {
    A: "OK côté nutrition, vérifier la naturalité des ingrédients avant de favoriser ce produit",
    B: "Profil nutritionnel OK, vérifier la naturalité des ingrédients avant de favoriser ce produit",
    C: "Profil nutritionnel moyen, vérifier la naturalité des ingrédients avant de favoriser ce produit",
    D: "À consommer avec modération et vérifier la naturalité des ingrédients.",
    E: "A consommer avec parcimonie et vérifier si les ingrédients sont naturels&nbsp;!",
  };
  const OpenContactSolliciter = () => {
    if (!isAuthenticated) {
      triggerAlert(
        "Se connecter pour encourager la marque",
        "Attention",
        () => {
          goToPage("/login");
        },
        "ios",
        "Se connecter"
      );
    } else {
      setIsCourager(true);
    }
  };

  // Select the image based on product.nutriscore or provide a default
  const selectedNutriscoreImage = nutriscoreImages[product?.nutriscore] || null;
  const selectedComent = nutriscoreComment[product?.nutriscore] || null;

  return (
    <div className="pt-2">
      <div className="relative w-full pr-2 pl-3 pb-6 mx-auto bg-custom-green-clear">
        {/* Title positioned between the white background and blue container */}
        <div className="absolute -top-4 left-0 right-0 flex justify-start ">
          <span className="bg-[#a9d7d4] px-3 py-2 rounded-e-full text-custom-blue font-bold ArchivoBold">
            LA SYNTHÈSE DU PRODUIT
          </span>
        </div>
        <div className="grid grid-cols-2">
          {/* Nutrition Section */}
          <div className="pb-2 pt-12 pr-2 border-b border-custom-green-divider flex flex-col justify-start">
            <div className="text-sm font-bold text-custom-blue z-10 w-full">
              <span className="marker-effect-cyan font-bold whitespace-nowrap overflow-hidden text-ellipsis ArchivoBold text-xs">
                Informations nutritionnelles
              </span>
            </div>
            {selectedNutriscoreImage && (
              <div
                className="flex flex-row items-center justify-between py-2 space-x-4 "
                onClick={() => setIsOpenNutrition(true)}
              >
                <img
                  src={selectedNutriscoreImage}
                  className="w-auto h-12 min-h-12"
                />
                <div>
                  <IonIcon
                    className="text-xl text-custom-blue"
                    icon={chevronForwardOutline}
                    onClick={() => setIsOpenNutrition(true)}
                  />
                </div>
              </div>
            )}
            <div className="text-[0.6rem] text-[#42a29a] ArchivoLightItalic">
              {selectedComent ? (
                <span dangerouslySetInnerHTML={{ __html: selectedComent }} />
              ) : (
                <span className="text-[0.6rem] text-custom-blue ArchivoLight">
                  Données non communiquées par le fabricant
                </span>
              )}
            </div>
            {(!selectedComent || !selectedNutriscoreImage) && (
               <div className="w-full flex  justify-center">
               <div className="flex items-center space-x-2 text-xs w-[9rem]">
               <div className="flex-grow text-[#42a29a] Archivo text-[0.6rem]">
                 <span className="block relative">
                   Indisponible
                   <img
                     src={flecheLeft}
                     className="w-6 absolute right-2 top-2 -rotate-[40deg] transform"
                     alt=""
                   />
                 </span>
               </div>
               
               {/* Icône cliquable */}
               <div className="flex-shrink-0">
                 <img
                   className="w-10 sm:w-8 "
                   src={illustrationOrigines}
                   alt="Illustration des origines du produit"
                   onClick={() => OpenContactSolliciter()}
                 />
               </div>
             </div>
             </div>
            )}
          </div>

          {/* Additifs Section */}
          <div className="pl-3 pb-3 pt-12 border-l border-b border-custom-green-divider flex flex-col justify-start">
            <div className="text-sm font-bold text-custom-blue z-10">
              <span className="marker-effect-cyan font-bold whitespace-nowrap overflow-hidden text-ellipsis ArchivoBold text-xs">
                Naturalité des ingrédients
              </span>
            </div>
            {product?.additifs?.length ? (
              <div
                className="flex flex-row items-center justify-between py-2 space-x-1 "
                onClick={() => setIsOpenadd(true)}
              >
                <div className="text-custom-blue flex items-center justify-center text-[0.7rem] font-bold Archivo min-h-12">
                  {"Contient " + product?.additifs?.length + " additifs"}
                </div>
                {product?.additifs?.length > 0 && (
                  <div>
                    <IonIcon
                      className="text-xl text-custom-blue max-w-6 min-w-6"
                      icon={chevronForwardOutline}
                      onClick={() => setIsOpenadd(true)}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div
                className="flex flex-row items-center justify-between py-2 space-x-1 "
                onClick={() => setIsOpenadd(true)}
              >
                <div className="text-custom-blue flex items-center justify-center text-[0.7rem] font-bold Archivo min-h-12">
                  <span className="text-[0.6rem] text-custom-blue ArchivoLight tracking-normal leading-archivo">
                    Ne contient pas d’additifs
                  </span>
                </div>
                <div>
                  <IonIcon
                    className="text-xl text-custom-blue max-w-6 min-w-6"
                    icon={chevronForwardOutline}
                    onClick={() => setIsOpenadd(true)}
                  />
                </div>
              </div>
            )}

            {product?.commentaire ? (
              <div className="text-[0.6rem] text-[#42a29a]"></div>
            ) : (
              <div className="w-full flex  justify-start">
              <div className="flex items-start">
              <div className="flex-grow text-[#42a29a] Archivo text-[0.6rem]">
              À confirmer par un décryptage du produit
              </div>
            </div>
            </div>
            )}
          </div>

          {/* Impact environnemental, */}
          <div className="pb-6 pt-3 pr-3  border-custom-green-divider">
            {/* Impact environnemental */}
            <div>
              <div className="text-sm font-bold text-custom-blue  w-full">
                <span className="marker-effect-cyan font-bold whitespace-nowrap overflow-hidden text-ellipsis z-50 ArchivoBold text-xs">
                  Impact environnemental
                </span>
              </div>
              <div className="flex flex-row items-center justify-start py-2 space-x-4">
                {product?.commentaire ? (
                  <>
                    {product?.planetScore ? (
                      <img src={product?.planetScore} className="w-36 h-auto" />
                    ) : (
                      <div className="text-custom-blue flex items-center justify-center text-[0.60rem] ArchivoLight">
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
                        className="text-xl text-custom-blue"
                        icon={chevronForwardOutline}
                      />
                    </div>
                  </>
                ) : (
                  <div className="w-full flex  justify-center">
                  <div className="flex items-center space-x-2 text-xs w-[9rem]">
                  <div className="flex-grow text-[#42a29a] Archivo text-[0.6rem]">
                    <span className="block relative">
                      Indisponible
                      <img
                        src={flecheLeft}
                        className="w-6 absolute right-2 top-2 -rotate-[40deg] transform"
                        alt=""
                      />
                    </span>
                  </div>
                  
                  {/* Icône cliquable */}
                  <div className="flex-shrink-0">
                    <img
                      className="w-10 sm:w-8 "
                      src={illustrationOrigines}
                      alt="Illustration des origines du produit"
                      onClick={() => OpenContactSolliciter()}
                    />
                  </div>
                </div>
                </div>
                )}
              </div>
            </div>
          </div>

          {/* Origines Section (Full Height) */}
          <div className="pb-6 pt-3  pl-3 border-l border-custom-green-divider">
            <div className="text-sm font-bold text-custom-blue z-10 w-full">
              <span className="marker-effect-cyan font-bold whitespace-nowrap overflow-hidden text-ellipsis z-50 ArchivoBold text-xs">
                Origines
              </span>
            </div>
            <div className="flex flex-row items-center justify-start py-2 space-x-1 Archivo">
              {product?.commentaire ? (
                <div className="text-xs text-[#42a29a]"></div>
              ) : (
                <div className="w-full flex  justify-center">
                <div className="flex items-center space-x-2 text-xs w-[9rem]">
                <div className="flex-grow text-[#42a29a] Archivo text-[0.6rem]">
                  <span className="block relative">
                    Indisponible
                    <img
                      src={flecheLeft}
                      className="w-6 absolute right-2 top-2 -rotate-[40deg] transform"
                      alt=""
                    />
                  </span>
                </div>
                
                {/* Icône cliquable */}
                <div className="flex-shrink-0">
                  <img
                    className="w-10 sm:w-8 "
                    src={illustrationOrigines}
                    alt="Illustration des origines du produit"
                    onClick={() => OpenContactSolliciter()}
                  />
                </div>
              </div>
              </div>
              )}
            </div>
          </div>
        </div>

        <ContactAdditif
          isOpen={isOpenadd}
          setIsOpen={setIsOpenadd}
          additifs={product?.additifs}
          targetRefAdditifs={targetRefAdditifs}
          togglePanel={togglePanel}
          scrollToTarget={scrollToTargetById}
        />
        <NutrriInfo
          isOpen={isOpenNutrition}
          setIsOpen={setIsOpenNutrition}
          nutriscore={product?.nutriscore}
          nutriscore_comment={product?.nutriscore_comment}
          togglePanel={togglePanel}
          scrollToTarget={scrollToTarget}
          targetRefNutriInfo={targetRefNutriInfo}
        />
        <Sections
          scrollToTarget={scrollToTarget}
          targetRefRecettes={targetRefRecettes}
          gtin={product?.gtin}
          productName={product?.name}
          hasRequested={hasRequested}
          setHasRequested={setHasRequested}
        />
      </div>
    </div>
  );
};

export default React.memo(InfoSection);
