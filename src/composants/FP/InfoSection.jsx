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

const InfoSection = ({
  product,
  togglePanel,
  scrollToTarget,
  scrollToTargetById,
  targetRefNutriInfo,
  targetRefRecettes,
  targetRefAdditifs,
}) => {
  const [isOpen, setIsOpen] = useState(false);
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
        "Connecte-toi pour encourager la marque",
        "Attention",
        () => {
         goToPage("/login");
        },
        "ios",
        "Se connecter"
      );
    } else {
      setIsOpen(true);
    }
  };

  // Select the image based on product.nutriscore or provide a default
  const selectedNutriscoreImage = nutriscoreImages[product?.nutriscore] || null;
  const selectedComent = nutriscoreComment[product?.nutriscore] || null;

  return (
    <div className="pt-2">
      <div className="relative w-full px-4 pb-6 mx-auto bg-custom-green-clear"> 
        {/* Title positioned between the white background and blue container */}
        <div className="absolute -top-4 left-0 right-0 flex justify-start ">
          <span className="bg-[#a9d7d4] px-4 py-2 rounded-e-full text-custom-blue font-bold ArchivoBold">
            LA SYNTHÈSE SUR LE PRODUIT
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
              <div className="flex flex-row items-center justify-around py-2 space-x-4 ">
                <img src={selectedNutriscoreImage} className="w-24 h-auto"  onClick={() => setIsOpenNutrition(true)} />
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
                <span className="text-[0.6rem]">Données non communiquées par le fabricant</span>
              )}
            </div>
            {(!selectedComent || !selectedNutriscoreImage) && (
              <div className="text-[0.6rem] flex flex-row space-x-1 mt-2">
                <div className="text-[#42a29a]  Archivo text-[0.6rem]">
                  Encourager la marque à atteindre 100% de transparence
                </div>
                <div>
                  <img
                    className="w-20 mt-1 transition-transform duration-150 ease-in-out active:scale-95"
                    src={illustrationOrigines}
                    alt="Illustration des origines du produit"
                    onClick={() => OpenContactSolliciter()}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Additifs Section */}
          <div className="px-4 pb-3 pt-12 border-l border-b border-custom-green-divider flex flex-col justify-start">
            <div className="text-sm font-bold text-custom-blue z-10">
              <span className="marker-effect-cyan font-bold ArchivoBold text-xs">
                Naturalité des ingrédients
              </span>
            </div>
            <div className="flex flex-row items-center justify-between py-2 space-x-1 ">
              <div className="text-custom-blue flex items-center justify-center text-[0.7rem] font-bold Archivo">
                {product?.additifs?.length
                  ? "Contient " + product?.additifs?.length + " additifs"
                  : (<span className="text-[0.6rem]">Données non communiquées par le fabricant</span>)}
              </div>
              {product?.additifs?.length > 0 && (
                <div>
                  <IonIcon
                    className="text-xl text-custom-blue"
                    icon={chevronForwardOutline}
                    onClick={() => setIsOpenadd(true)}
                  />
                </div>
              )}
            </div>
            {product?.commentaire ? (
              <div className="text-[0.6rem] text-[#42a29a]"></div>
            ) : (
              <div className="text-[0.6rem] flex flex-row space-x-1">
                <div className="text-[#42a29a]  text-[0.6rem]">
                  Encourager la marque à atteindre 100% de transparence
                </div>
                <div>
                  <img
                    className="w-20 mt-1 transition-transform duration-150 ease-in-out active:scale-95"
                    src={illustrationOrigines}
                    alt="Illustration des origines du produit"
                    onClick={() => OpenContactSolliciter()}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Impact environnemental, */}
          <div className="pb-6 pt-3 pr-4  border-custom-green-divider">
            {/* Impact environnemental */}
            <div>
              <div className="text-sm font-bold text-custom-blue  w-full">
                <span className="marker-effect-cyan font-bold whitespace-nowrap overflow-hidden text-ellipsis z-50 ArchivoBold text-xs">
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
                        className="text-xl text-custom-blue"
                        icon={chevronForwardOutline}
                      />
                    </div>
                  </>
                ) : (
                  <div className="text-xs flex flex-row space-x-1 Archivo text-[0.6rem]">
                    <div className="text-[#42a29a]  text-[0.6rem]">
                      Encourager la marque à atteindre 100% de transparence
                    </div>
                    <div>
                      <img
                        className="w-20 mt-1 transition-transform duration-150 ease-in-out active:scale-95"
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
          <div className="pb-6 pt-3  px-4 border-l border-custom-green-divider">
            <div className="text-sm font-bold text-custom-blue z-10 w-full">
              <span className="marker-effect-cyan font-bold whitespace-nowrap overflow-hidden text-ellipsis z-50 ArchivoBold text-xs">
                Origines
              </span>
            </div>
            <div className="flex flex-row items-center justify-start py-2 space-x-1 Archivo">
              {product?.commentaire ? (
                <div className="text-xs text-[#42a29a]"></div>
              ) : (
                <div className="text-xs flex flex-row space-x-1 text-[0.6rem]">
                  <div className="text-[#42a29a]  Archivo text-[0.6rem]">
                    Encourager la marque à atteindre 100% de transparence
                  </div>
                  <div>
                    <img
                      className="w-20 mt-1 transition-transform duration-150 ease-in-out active:scale-95"
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
          isOpen={isOpen}
          setIsOpen={setIsOpen}
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
        />
      </div>
    </div>
  );
};

export default React.memo(InfoSection);
