import React, { useState } from "react";
import illustrationOrigines from "../../assets/fb/BubbleImg.svg";
import { chevronForwardOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { ContactModal, ContactAdditif, NutrriInfo, Solliciter } from "./Modal";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Nutri_score_A from "../../assets/fb/score/Nutri_score_A.png";
import Nutri_score_B from "../../assets/fb/score/Nutri-score-B.png";
import Nutri_score_C from "../../assets/fb/score/Nutri-score-C.png";
import Nutri_score_D from "../../assets/fb/score/Nutri-score-D.png";
import Nutri_score_E from "../../assets/fb/score/Nutri-score-E.png";
import Sections from "./Sections";
import { useHistory } from "react-router-dom";
import { useAlert } from "../../context/AlertProvider";

const InfoSection = ({ product,togglePanel,scrollToTarget,scrollToTargetById,targetRefNutriInfo,targetRefRecettes,targetRefAdditifs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenadd, setIsOpenadd] = useState(false);
  const [isOpenNutrition, setIsOpenNutrition] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const history = useHistory();
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
    A: "Riche en nutriments bénéfiques et faibles en éléments à limiter&nbsp;! A&nbspprivilégier&nbsp;!",
    B: "Ca reste de bons choix pour votre alimentation",
    C: "Ce ne sont pas des aliments à&nbsp;éviter, mais à consommer dans le cadre d'une alimentation variée&nbsp;!",
    D:"Plutôt à limiter, à&nbsp;consommer avec modération&nbsp;!",
    E: "A consommer avec parcimonie et pour le plaisir&nbsp;!",
  };
  const OpenContactSolliciter = () => {
    if (!isAuthenticated) {
      triggerAlert(
        "Connecte-toi pour encourager la marque",
        "Attention",
        () => {
          history.replace("/login");
        },
        "ios",
        "Se connecter"
      );
    } else {
      setIsOpen(true)
    }
  };


  // Select the image based on product.nutriscore or provide a default
  const selectedNutriscoreImage = nutriscoreImages[product?.nutriscore] || null;
  const selectedComent = nutriscoreComment[product?.nutriscore] || null;


  return (
    <div className="pt-2">
      <div className="relative w-full px-2 pt-12 pb-6 mx-auto bg-custom-green-clear">
        {/* Title positioned between the white background and blue container */}
        <div className="absolute -top-4 left-0 right-0 flex justify-start">
          <span className="bg-[#a9d7d4] px-4 py-2 rounded-e-full text-custom-blue font-bold text-base ArchivoBold">
            LA SYNTHÈSE
          </span>
        </div>
        <div className="grid grid-cols-2 divide-p divide-custom-green-divider">
          {/* Nutrition Section */}
          <div className="pb-2 pr-2 border-b border-custom-green-divider flex flex-col justify-start">
            <div className="text-sm font-bold text-custom-blue z-10 w-full">
              <span className="marker-effect-cyan font-bold whitespace-nowrap overflow-hidden text-ellipsis ArchivoBold">
                Informations nutritionnelles
              </span>
            </div>
            {selectedNutriscoreImage && (
            <div className="flex flex-row items-center justify-around py-2 space-x-4 ">

                <img src={selectedNutriscoreImage} className="w-28 h-auto" />
                <div>
                <IonIcon
                  className="text-2xl text-custom-blue"
                  icon={chevronForwardOutline}
                  onClick={() => setIsOpenNutrition(true)}
                />
                
              </div>             
            </div> )}
            <div className="text-xs text-[#42a29a] Archivo">
            {selectedComent ? (
               <span dangerouslySetInnerHTML={{ __html: selectedComent }} />
            ):(
              "Données non communiquées par le fabricant"
            )}
            </div>
            {(!(selectedComent) || !(selectedNutriscoreImage))  && (
                <div className="text-xs flex flex-row space-x-2 mt-3">
                  <div className="text-custom-gray Archivo">
                    Encourager la marque à atteindre 100% de transparence
                  </div>
                  <div>
                    <img
                      className="w-28 mt-2 transition-transform duration-150 ease-in-out active:scale-95"
                      src={illustrationOrigines}
                      alt="Illustration des origines du produit"
                      onClick={() => OpenContactSolliciter()}
                    />
                  </div>
                </div>
              )}
          </div>

          {/* Additifs Section */}
          <div className="px-2 pb-3 border-l border-b border-custom-green-divider flex flex-col justify-start">
            <div className="text-sm font-bold text-custom-blue z-10">
              <span className="marker-effect-cyan font-bold ArchivoBold">
                Naturalité des ingrédients
              </span>
            </div>
            <div className="flex flex-row items-center justify-between py-2 space-x-1 ">
              <div className="text-custom-blue flex items-center justify-center text-xs font-bold Archivo">
                {product?.additifs?.length
                  ? "Contient "+ product?.additifs?.length+" additifs"
                  : "Données non communiquées par le fabricant"}{" "}
              </div>
              {product?.additifs?.length>0 &&(
<div>
                <IonIcon
                  className="text-2xl text-custom-blue"
                  icon={chevronForwardOutline}
                  onClick={() => setIsOpenadd(true)}
                />
              </div>
              )
            }
            </div>
            {(product?.commentaire) ? (
              <div className="text-xs text-[#42a29a]"></div>
            ) : (
              <div className="text-xs flex flex-row space-x-2">
                <div className="text-custom-gray">
                  Encourager la marque à atteindre 100% de transparence
                </div>
                <div>
                  <img
                    className="w-28 mt-2 transition-transform duration-150 ease-in-out active:scale-95"
                    src={illustrationOrigines}
                    alt="Illustration des origines du produit"
                    onClick={() => OpenContactSolliciter()}
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
                <span className="marker-effect-cyan font-bold whitespace-nowrap overflow-hidden text-ellipsis z-50 ArchivoBold">
                  Impact environnemental
                </span>
              </div>
              <div className="flex flex-row items-center justify-around py-2 space-x-4">
                {product?.commentaire ? (
                  <>
                    {product?.planetScore ? (
                      <img src={product?.planetScore} className="w-36 h-auto" />
                    ) : (
                      <div className="text-gray-500 flex items-center justify-center text-[0.60rem] Archivo">
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
                  <div className="text-xs flex flex-row space-x-2 Archivo">
                    <div className="text-custom-gray">
                      Encourager la marque à atteindre 100% de transparence
                    </div>
                    <div>
                      <img
                        className="w-28 mt-2 transition-transform duration-150 ease-in-out active:scale-95"
                        src={illustrationOrigines}
                        alt="Illustration des origines du produit"
                        onClick={() => OpenContactSolliciter()}
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
              <span className="marker-effect-cyan font-bold whitespace-nowrap overflow-hidden text-ellipsis z-50 ArchivoBold">
                Origines
              </span>
            </div>
            <div className="flex flex-row items-center justify-start py-2 space-x-1 Archivo">
              {product?.commentaire ? (
                <div className="text-xs text-[#42a29a]"></div>
              ) : (
                <div className="text-xs flex flex-row space-x-2">
                  <div className="text-custom-gray Archivo">
                    Encourager la marque à atteindre 100% de transparence
                  </div>
                  <div>
                    <img
                      className="w-28 mt-2 transition-transform duration-150 ease-in-out active:scale-95"
                      src={illustrationOrigines}
                      alt="Illustration des origines du produit"
                      onClick={() => OpenContactSolliciter()}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Solliciter
        isOpen={isOpen} setIsOpen={setIsOpen} 
        gtin={product?.gtin}
        productName={product?.name}
        authUser={authUser}
       
      />
        <ContactAdditif
          isOpen={isOpenadd}
          setIsOpen={setIsOpenadd}
          additifs={product?.additifs}
          targetRefAdditifs={targetRefAdditifs}
          togglePanel={togglePanel} 
          scrollToTarget={scrollToTargetById}
        />
        <NutrriInfo isOpen={isOpenNutrition} setIsOpen={setIsOpenNutrition} nutriscore={product?.nutriscore} nutriscore_comment={product?.nutriscore_comment} togglePanel={togglePanel} scrollToTarget={scrollToTarget} targetRefNutriInfo={targetRefNutriInfo} />
        <Sections scrollToTarget={scrollToTarget} targetRefRecettes={targetRefRecettes} gtin={product?.gtin} productName={product?.name}/>
      </div>
    
    </div>
  );
};

export default React.memo(InfoSection);
