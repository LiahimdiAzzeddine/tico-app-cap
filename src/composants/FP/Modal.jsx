import React, { useState } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useAlert } from "../../context/AlertProvider";
import { useIonRouter } from "@ionic/react";
import useProductIssues from "../../hooks/contact/useProductIssues";
import useTransparencyRequests from "../../hooks/contact/useTransparencyRequests";

import closeImg from "../../assets/fb/popup/close.svg";
import ContactImg from "../../assets/fb/BubbleImg.svg";
import BubbleIImage from "../../assets/fb/BubbleIImage.svg";
import flecheLeft from "../../assets/fb/popup/flecheleft.svg";
import { motion } from "framer-motion";
import Additif from "../../assets/fb/additifs.svg";
import pastilleNote1 from "../../assets/fb/pastille-note-1.svg";
import pastilleNote2 from "../../assets/fb/pastille-note-2.svg";
import pastilleNote3 from "../../assets/fb/pastille-note-3.svg";
import pastilleNote4 from "../../assets/fb/pastille-note-4.svg";
import Nutri_score_A from "../../assets/fb/score/Nutri_score_A.png";
import Nutri_score_B from "../../assets/fb/score/Nutri-score-B.png";
import Nutri_score_C from "../../assets/fb/score/Nutri-score-C.png";
import Nutri_score_D from "../../assets/fb/score/Nutri-score-D.png";
import Nutri_score_E from "../../assets/fb/score/Nutri-score-E.png";
import { IonModal } from "@ionic/react";

const Modal = ({ isOpen, onClose, children }) => {
  const handleBackgroundClick = (e) => {
    // Vérifie si le clic vient de l'arrière-plan (pas d'un enfant)
    if (e.target.classList.contains("customionmodal")) {
      onClose();
    }
  };
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      cssClass="custom-ion-modal"
      onClick={handleBackgroundClick}
    >
      <div className="customionmodal w-full h-full flex justify-center items-center">
        <motion.div
          className="relative w-full max-w-lg h-auto z-50 m-1 mx-auto"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="w-full h-full aspect-square flex items-center justify-center bg-no-repeat bg-contain bg-center z-30 custom-modal-background">
            {/* Bouton de fermeture */}
            <button
              onClick={onClose}
              className="absolute left-8 top-0 p-2 z-50"
            >
              <img src={closeImg} className="w-12 h-auto" alt="Close" />
            </button>

            {/* Contenu du modal */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-12 pt-6 bottom-7 bg-opacity-90">
              {children}
            </div>
          </div>
        </motion.div>
      </div>
    </IonModal>
  );
};

export default Modal;

// contact Modal
export const ContactModal = ({ isOpen, setIsOpen, gtin, productName }) => {
  const [isOpenTiCO, setIsOpenTiCO] = useState(false);
  const [isOpenSolliciter, setIsOpenSolliciter] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const { triggerAlert } = useAlert();
  const history = useIonRouter();
  const goToPage = (path) => {
    history.push(path, "root", "replace");
  };

  const OpenContactTiCO = () => {
    if (!isAuthenticated) {
      triggerAlert(
        "Se connecter pour nous contacter",
        "Attention",
        () => {
          goToPage("/login");
        },
        "ios",
        "Se connecter"
      );
    } else {
      setIsOpen(false);
      setIsOpenTiCO(true);
    }
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
      setIsOpen(false);
      setIsOpenSolliciter(true);
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col w-full h-full items-start justify-start max-sm:">
          <div className="flex-1 overflow-y-auto px-6  flex flex-col items-center justify-start md:justify-center w-full space-y-6">
            {/* Fixed Header with Buttons */}
            <div className="sticky pt-6 ">
              {/* Bubble Icon */}
              <img
                src={BubbleIImage}
                alt="Bubble text icon"
                className="w-20 h-auto "
              />
            </div>
            {/* Title */}
            <h1 className="text-2xl text-custom-blue font-bold ArchivoExtraBold">
              <span className="marker-effect-cyan z-10">Contact</span>
            </h1>

            {/* Options */}
            <div
              className="text-xl text-custom-blue flex items-start"
              onClick={OpenContactTiCO}
            >
              <span className="ArchivoLight">
                Contacter{" "}
                <span className="pallybold leading-normal">
                  Ti<span className="tracking-tightest leading-normal">CO</span>
                </span>
              </span>
              <img src={flecheLeft} className="w-6 ml-2 scale-x-[-1]" />
            </div>
            {/** 
          <div className="text-xl text-custom-blue flex items-start">
            <span>Contacter SAV</span>
            <img src={flecheRight} className="w-5 ml-2" />
          </div>
          */}
            <div
              className="text-xl text-custom-blue flex items-start"
              onClick={OpenContactSolliciter}
            >
              <img src={flecheLeft} className="w-6" />
              <span className="ArchivoLight text-center leading-archivo ">
                Encourager la marque à faire la transparence   <span className="pallybold leading-archivo">
    Ti<span className="tracking-tightest leading-archivo">CO</span>
  </span>
              </span>
            </div>
          </div>
        </div>
      </Modal>
      <ContactTiCO
        isOpen={isOpenTiCO}
        setIsOpen={setIsOpenTiCO}
        authUser={authUser}
        gtin={gtin}
      />
      <Solliciter
        isOpen={isOpenSolliciter}
        setIsOpen={setIsOpenSolliciter}
        authUser={authUser}
        gtin={gtin}
        productName={productName}
      />
    </>
  );
};

export const ContactTiCO = ({ isOpen, setIsOpen, authUser, gtin }) => {
  const [message, setMessage] = useState(""); // État pour le message saisi
  const { handleSubmit, loading, error, sended } = useProductIssues(); // Hook pour gérer l'API

  const handleSend = async () => {
    if (!message.trim()) {
      alert("Veuillez écrire un message avant d'envoyer.");
      return;
    }

    const formValues = {
      user_id: authUser.id, // Utilise les données de l'utilisateur authentifié
      message,
      gtin: gtin,
    };

    await handleSubmit(formValues); // Envoie le message via l'API
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="flex flex-col items-center justify-center w-full space-y-3">
        {/* Bubble Icon */}
        <img
          src={BubbleIImage}
          alt="Bubble text icon"
          className="w-20 h-auto pt-1"
        />

        {loading ? (
          // Affiche le spinner pendant le chargement
          <div className="flex flex-col items-center justify-center">
            <div className="loader w-10 h-10 border-4 border-t-4 border-t-custom-green rounded-full animate-spin" />
            <div className="text-xl text-custom-blue font-bold text-center mt-2">
              Envoi en cours...
            </div>
          </div>
        ) : sended ? (
          // Affiche le message de confirmation si le message a été envoyé
          <div className="text-xl text-custom-blue font-bold text-center">
            Merci, votre signalement a bien été pris en compte !
          </div>
        ) : (
          <>
            {/* Titre */}
            <h1 className="text-xl ArchivoLight text-custom-blue flex items-start">
              <img src={flecheLeft} className="w-6 mr-2" />
              <span>
                Contacter{" "}
                <span className="pallybold leading-normal">
                  Ti<span className="tracking-tightest leading-normal">CO</span>
                </span>
              </span>
            </h1>
            <div className="text-lg text-custom-blue flex items-start ArchivoLight leading-[22px]">
              Un problème sur la fiche produit&nbsp;? Dites-nous en plus&nbsp;:
            </div>
            <textarea
              className="w-full min-h-20 min-w-60 rounded-xl resize-none p-2 border-[1px] border-custom-green"
              placeholder="Votre message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)} // Met à jour le message saisi
            />
            {error && (
              <div className="text-red-500 text-xs p-0">
                Erreur : {JSON.stringify(error)}
              </div>
            )}
            <div className="flex flex-col justify-center items-center space-y-3">
              <button
                className="bg-custom-green px-4 py-2 text-lg text-white rounded hover:bg-teal-700 Archivo"
                onClick={handleSend} // Appelle handleSend au clic
                disabled={loading}
              >
                Envoyer
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
export const Solliciter = ({
  isOpen,
  setIsOpen,
  authUser,
  gtin,
  productName,
}) => {
  const { handleSubmit, loading, error, sended } = useTransparencyRequests();
  const [formValues, setFormValues] = useState({
    user_id: authUser?.id || "",
    gtin: gtin || "",
    productName: productName,
  });

  const handleRequest = () => {
    handleSubmit({
      user_id: authUser?.id || "",
      gtin: gtin || "",
      productName: productName,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="flex flex-col items-center justify-center w-full space-y-9">
        {/* Bubble Icon */}
        <img
          src={BubbleIImage}
          alt="Bubble text icon"
          className="w-20 h-auto"
        />
        {/* Title 
        <h1 className="text-xl text-custom-blue flex items-start">
          <img src={flecheLeft} className="w-6 mr-1" />
          <span className="ArchivoLight leading-[22px] text-center">Encourager la marque <br></br>pour faire la transparence</span>
        </h1>*/}

        {/* Bouton pour envoyer la demande */}
        {!sended ? (
          <div className="text-xl text-custom-blue flex items-start">
            <img
              src={flecheLeft}
              className="w-7 absolute -translate-x-10 -translate-y-2 "
            />
            <button
              onClick={handleRequest}
              className="bg-custom-blue text-white px-8 py-1 rounded-xl"
              disabled={loading}
            >
              {loading ? (
                <span>Envoi en cours...</span>
              ) : (
                <>
                  Encourager
                  <br />
                  la marque
                </>
              )}
            </button>
          </div>
        ) : (
          <p className="text-[#6dc3bc] font-bold text-sm">
            Votre demande a été envoyée avec succès!
          </p>
        )}

        {/* Message d'erreur */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Lien pour annuler */}
        <div className="text-[#6dc3bc] text-center w-full">
          Finalement j'ai tout ce qu'il me faut <br />
          <button
            onClick={() => setIsOpen(false)}
            className="underline underline-offset-2"
          >
            Annuler ma demande
          </button>
        </div>
      </div>
    </Modal>
  );
};

export const ContactAdditif = ({
  isOpen,
  setIsOpen,
  additifs,
  targetRefAdditifs,
  togglePanel,
  scrollToTarget,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [showInfo, setShowInfo] = useState("additifs");

  const displayedAdditifs = showAll ? additifs : additifs.slice(0, 3);
  const MoreInfo = async () => {
    setIsOpen(false);
    await togglePanel(2);
    scrollToTarget(targetRefAdditifs, "additifs");
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="flex flex-col w-full h-full items-center justify-center">
        {/* Fixed Header with Buttons */}
        <div className="sticky">
          <div className="flex flex-row gap-1 max-w-xs mx-auto pt-2">
            {/** */}
            <button
              style={{ border: "1px solid #0f548d" }}
              className={`flex-1 p-1 rounded-2xl ArchivoLight  cursor-not-allowed  ${
                showInfo === "transformation"
                  ? "bg-custom-blue font-bold text-white"
                  : "text-custom-blue"
              }`}
              onClick={() => setShowInfo("transformation")}
            >
              Naturalité
            </button>

            <button
              style={{ border: "1px solid #0f548d" }}
              className={`flex-1 p-1 rounded-2xl ArchivoLight  ${
                showInfo === "additifs"
                  ? "bg-custom-blue text-white"
                  : "text-custom-blue"
              }`}
              onClick={() => setShowInfo("additifs")}
            >
              Additifs
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-4">
          <div className="max-w-md mx-auto h-full">
            {/* Content Section */}
            {showInfo === "transformation" ? (
              <div className="space-y-2 flex pb-7 flex-col justify-center items-center h-full">
                <div className="text-custom-blue text-start ArchivoLight leading-archivo">
                  La naturalité des ingrédients s’oppose à
                  l’ultra-transformation. Il est important de choisir des
                  aliments peu ou pas transformés pour prendre soin de votre
                  santé.
                </div>
                <div className="text-custom-blue text-start ArchivoLight leading-archivo">
                  En attendant plus d’information sur ce produit regardez les
                  types d’additifs et la liste des ingrédients, si vous pourriez
                  les avoir dans votre cuisine c’est tout bon, sinon cela
                  nécessite plus d’information de la part de la marque.
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-3">
                <div className="">
                  <div className="flex items-end space-x-2 pt-1">
                    <span className="text-custom-blue font-bold text-2xl">
                      +{additifs.length}
                    </span>
                    <img
                      src={Additif}
                      alt="Additives"
                      className="w-12 sm:w-12 h-auto"
                    />
                  </div>
                </div>
                <h1 className="text-xl text-custom-blue font-bold text-center py-6">
                  <span className="marker-effect-cyan z-10 ArchivoExtraBold text-2xl">
                    Additifs
                  </span>
                </h1>

                <div className="space-y-2">
                  {additifs && additifs.length > 0 ? (
                    displayedAdditifs.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center space-x-2"
                      >
                        <img
                          src={getPastilleImage(item.noteUFC)}
                          alt={`Pastille for note ${item.noteUFC}`}
                          className="w-4 h-4"
                        />
                        <span className="font-bold text-custom-blue ArchivoBold">
                          {item.code}
                        </span>
                        <span className="text-custom-blue Archivo">
                          : {item.label}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-custom-blue text-center ArchivoLight tracking-normal">
                      Ne contient pas d'additifs<br></br>À confirmer par la
                      marque
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="pt-4">
            {(showInfo === "additifs") ?(
              <button
                className="w-full text-center text-custom-blue  underline underline-offset-2 focus:outline-none ArchivoItalic"
                onClick={MoreInfo}
              >
                En savoir plus
              </button>
            ):("")}
          </div>
        </div>

        {/* Fixed Footer */}
      </div>
    </Modal>
  );
};

export const NutrriInfo = ({
  isOpen,
  setIsOpen,
  nutriscore,
  nutriscore_comment,
  togglePanel,
  scrollToTarget,
  targetRefNutriInfo,
}) => {
  const nutriscoreImages = {
    A: Nutri_score_A,
    B: Nutri_score_B,
    C: Nutri_score_C,
    D: Nutri_score_D,
    E: Nutri_score_E,
  };
  const nutriscorePhrase = {
    A: "Les produits notés&nbsp;A sont généralement riches en nutriments bénéfiques (fibres, protéines, vitamines) et faibles en éléments à limiter comme les graisses saturées, les sucres ou le sel. Ce sont des aliments à privilégier dans le cadre d’une alimentation équilibrée.",
    B: "Les produits classés&nbsp;B restent de bons choix pour votre alimentation. Ils contiennent un bon mix de nutriments, avec parfois un peu plus de graisses, sucres ou sel que les produits notés&nbsp;A et un peu moins que les produits notés&nbsp;C.",
    C: "Un produit avec un Nutri-Score&nbsp;C peut contenir plus de graisses, de sucre ou de sel. Mais attention, ça ne veut pas dire qu’il faut l’éviter&nbsp;! Certains aliments comme les huiles végétales, riches en bonnes graisses, peuvent avoir un C tout en étant bons pour la santé. Tout est une question d’équilibre&nbsp;!",
    D: "Un produit noté&nbsp;D contient généralement des nutriments à limiter (graisses saturées, sucres ou sel). Mais certains, comme les fromages, apportent aussi des nutriments intéressants comme le calcium. Ils peuvent faire partie d’une alimentation variée si on les consomme avec modération.",
    E: "Les produits classés&nbsp;E sont ceux qui contiennent le plus d’éléments à limiter (graisses saturées, sucres, sel). Ils sont à consommer avec parcimonie. Toutefois, certains produits peuvent être classés&nbsp;E tout en étant intéressants nutritionnellement, comme certaines huiles. L’important, c’est de les intégrer à petite dose dans votre alimentation globale.",
  };

  const selectedNutriscorePhrase =
    nutriscorePhrase[nutriscore] ||
    "Ce produit est à consommer avec précaution.";
  const selectedNutriscoreImage = nutriscoreImages[nutriscore] || Nutri_score_B;

  const MoreInfo = () => {
    setIsOpen(false);
    togglePanel(1);
    scrollToTarget(targetRefNutriInfo);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="flex flex-col w-full max-h-screen h-auto items-center justify-center">
        {/* Fixed Header with Buttons */}
        <div className="sticky top-0">
          {/* Title */}
          <h1 className="text-2xl font-bold text-custom-blue py-2 text-center ArchivoExtraBold">
            <span className="marker-effect-cyan ">Nutrition</span>
          </h1>
          <div className="pt-2 pb-1 flex justify-center">
            <img
              className="w-1/3"
              src={selectedNutriscoreImage}
              alt="Nutri-Score"
            />
          </div>
        </div>
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <div className="max-w-md mx-auto text-custom-blue text-center  leading-tight">
            <span
              className="ArchivoLight "
              dangerouslySetInnerHTML={{ __html: selectedNutriscorePhrase }}
            />
          </div>
        </div>
        {/* Fixed Footer */}
        <div className="py-2 w-full">
          <button
            className="w-full text-sm text-custom-blue underline focus:outline-none"
            onClick={MoreInfo}
          >
            En savoir plus
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Utility function to determine the image based on noteUFC
const getPastilleImage = (note) => {
  if (note == 1) {
    return pastilleNote1; // High severity
  } else if (note == 2) {
    return pastilleNote2; // Medium severity
  } else if (note == 3) {
    return pastilleNote3; // Low-medium severity
  } else {
    return pastilleNote4; // Low severity
  }
};
