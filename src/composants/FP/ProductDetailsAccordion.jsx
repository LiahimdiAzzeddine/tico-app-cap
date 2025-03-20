import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
} from "@ionic/react";
import fleche from "../../assets/fb/flechBottom.svg";
import BubbleImg from "../../assets/fb/BubbleImg.svg";
import NutritionalInfo from "./accordion/NutritionalInfo";
import OriginsInfo from "./accordion/OriginsInfo";
import IngredientsInfo from "./accordion/IngredientsInfo";
import LabelsInfo from "./accordion/LabelsInfo";
import BrandInfo from "./accordion/BrandInfo";
import UsageInfo from "./accordion/UsageInfo";
import PackagingInfo from "./accordion/PackagingInfo";
import { useAlert } from "../../context/AlertProvider";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useIonRouter } from "@ionic/react";
import { useGlobalContext } from "./GlobalProvider";
import TransformationInfo from "./accordion/TransformationInfo";
import Naturalite from "./accordion/Naturalite";

const ProductDetailsAccordion = ({
  product,
  togglePanel,
  openPanel,
  targetRefNutriInfo,
  targetRefAdditifs,
  scrollToTarget,
}) => {
  console.log("🚀 ~ product:", product);
  const { hasRequested, setIsCourager } = useGlobalContext();
  const { triggerAlert } = useAlert();
  const isAuthenticated = useIsAuthenticated();
  const history = useIonRouter();

  const goToPage = (path) => {
    history.push(path, "root", "replace");
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

  const handleAccordionChange = (e) => {
    const value = e.detail.value;
    if (value) {
      togglePanel(parseInt(value));
    } else {
      togglePanel(null);
    }
  };

  const panelConfigs = [
    {
      id: "1",
      title: "Informations nutritionnelles",
      disabled: false,
      ref: targetRefNutriInfo,
      content: (
        <NutritionalInfo
          togglePanel={togglePanel}
          product={product}
          scrollToTarget={scrollToTarget}
          targetRefNutriInfo={targetRefNutriInfo}
        />
      ),
    },
    {
      id: "2",
      title: "Ingrédients, additifs",
      disabled: false,
      ref: targetRefAdditifs,
      content: (
        <IngredientsInfo
          togglePanel={togglePanel}
          ingredients={product?.ingredients}
          allergenesArray={product?.allergens}
          additifsArray={product?.additifs}
          targetRefAdditifs={targetRefAdditifs}
          scrollToTarget={scrollToTarget}
        />
      ),
    },
    {
      id: "3",
      title: "Impact environnemental",
      disabled: product.scores?._scoreEnv ? false : true,
      content: (
        <TransformationInfo
          togglePanel={togglePanel}
          scoreEnv={product.scores?._scoreEnv}
        />
      ),
    },
    {
      id: "4",
      title: "Origines",
      disabled: product.scores?._scoreOrigin ? false : true,
      content: (
        <OriginsInfo
          togglePanel={togglePanel}
          scoreOrigin={product.scores?._scoreOrigin}
          transformation={product.transformation}
          transcondi={product.transcondi}
        />
      ),
    },
    {
      id: "5",
      title: "Labels et mentions",
      disabled: product.engagements?.lenght >0 ? false : true,
      content: (
        <LabelsInfo
          togglePanel={togglePanel}
          engagements={product.engagements}
        />
      ),
    },
    {
      id: "6",
      title: "Marque & entreprise",
      disabled: product?.markInfo || product?.provider ? false : true,
      content: (
        <BrandInfo
          togglePanel={togglePanel}
          markInfo={product.markInfo}
          provider={product?.provider}
          openPanel={openPanel} 
        />
      ),
    },
    {
      id: "7",
      title: "Utilisation & conservation",
      disabled: product?.conservation || product?.utilisation ? false : true,
      content: (
        <UsageInfo
          togglePanel={togglePanel}
          conservation={product?.conservation}
          utilisation={product?.utilisation}
        />
      ),
    },
    {
      id: "8",
      title: "Naturalité des ingrédients",
      disabled: product.scores?._scoreNat ? false : true,
      content: (
        <Naturalite
          togglePanel={togglePanel}
          scoreNat={product.scores?._scoreNat}
        />
      ),
    },
    {
      id: "9",
      title: "Emballage",
      disabled: product.scores?._pack ? false : true,
      content: (
        <PackagingInfo togglePanel={togglePanel} pack={product.scores?._pack} />
      ),
    },
  ];

  // Trouver l'index du premier onglet désactivé
  const firstDisabledPanelIndex = useMemo(() => {
    return panelConfigs.findIndex(panel => panel.disabled === true);
  }, [panelConfigs]);

  return (
    <div className="pb-6">
      <IonAccordionGroup
        id="group1"
        value={openPanel ? openPanel.toString() : undefined}
        onIonChange={handleAccordionChange}
      >
        {panelConfigs.map((panel, index) => (
          <IonAccordion
            key={panel.id}
            value={panel.id}
            disabled={panel.disabled}
            className="z-0 pl-0"
            style={{ display: "contents" }}
            toggleIcon={<></>}
          >
            <IonItem
              slot="header"
              lines="inset"
              style={{
                overflow: "visible",
                "--border-color":
                  openPanel == panel.id ? "transparent" : "#c6e8e5",
                "--inner-border-width": "0 0 2px 0",
                "--padding-end": "16px",
                "--padding-top": "2px",
              }}
              className={`relative ${panel.id === firstDisabledPanelIndex ? "z-50" : "z-0"} ${
                panel.disabled ? "text-custom-gray" : "text-custom-blue"
              }`}
            >
              <IonLabel
                className="text-xl z-40 ion-no-padding"
                style={{ display: "contents" }}
              >
                <span className="ArchivoExtraBold mr-1 pt-2">
                  {panel.title}
                </span>
                {!panel.disabled && (
                  <img src={fleche} className="w-9 h-auto px-2 pt-3" />
                )}
              </IonLabel>

              {/* Image bulle uniquement pour le premier panel désactivé */}
              {panel.disabled && index === firstDisabledPanelIndex && (
                <motion.img
                  src={BubbleImg}
                  onClick={(event) => {
                    event.preventDefault(); // Empêche le comportement par défaut
                    event.stopPropagation(); // Empêche l'ouverture de l'accordéon
                    OpenContactSolliciter();
                  }}
                  alt="Bubble"
                  className="absolute right-8 w-14 z-50"
                  animate={hasRequested ? { scale: 1 } : { scale: [1, 1.2, 1] }}
                  transition={{
                    repeat: hasRequested ? 0 : Infinity,
                    duration: 2.5,
                    ease: "easeInOut",
                  }}
                  style={{
                    pointerEvents: "auto", // Rend l'image cliquable
                    opacity: "1 !important", // Forcer l'affichage normal de l'image
                    filter: "none !important", // Annule tout effet de désactivation
                  }}
                />
              )}
            </IonItem>
            <div slot="content" className="z-0 p-0" ref={panel.ref}>
              {panel.content}
            </div>
          </IonAccordion>
        ))}
      </IonAccordionGroup>
    </div>
  );
};

export default ProductDetailsAccordion;