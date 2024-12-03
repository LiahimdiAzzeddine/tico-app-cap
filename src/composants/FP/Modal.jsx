import React, { useState } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useAlert } from "../../context/AlertProvider";
import { useHistory } from "react-router-dom";
import useProductIssues from "../../hooks/contact/useProductIssues";
import useTransparencyRequests from "../../hooks/contact/useTransparencyRequests";
import background from "../../assets/fb/popup/background.svg";
import closeImg from "../../assets/fb/popup/close.svg";
import ContactImg from "../../assets/fb/BubbleImg.svg";
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
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      cssClass="custom-ion-modal"
    >
      <motion.div
        className="relative w-full max-w-lg h-auto z-50 m-1 mx-auto"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div
          className="w-full h-full aspect-square flex items-center justify-center bg-no-repeat bg-contain bg-center"
          style={{
            backgroundImage: `url(${background})`,
          }}
        >
          {/* Bouton de fermeture */}
          <button onClick={onClose} className="absolute left-8 top-0 p-2 z-50">
            <img src={closeImg} className="w-12 h-auto" alt="Close" />
          </button>

          {/* Contenu du modal */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-12 pt-6 bottom-7 bg-opacity-90">
            {children}
          </div>
        </div>
      </motion.div>
    </IonModal>
  );
};

export default Modal;

// contact Modal
export const ContactModal = ({ isOpen, setIsOpen, gtin }) => {
  const [isOpenTiCO, setIsOpenTiCO] = useState(false);
  const [isOpenSolliciter, setIsOpenSolliciter] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const { triggerAlert } = useAlert();
  const history = useHistory();

  const OpenContactTiCO = () => {
    if (!isAuthenticated) {
      triggerAlert(
        "pour contacter Tico, il faut être connecté",
        "Attention",
        () => {
          history.replace("login");
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
        "Connecte-toi pour encourager la marque",
        "Attention",
        () => {
          history.replace("login");
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
        <div className="flex flex-col w-full h-full items-center justify-center max-sm:">
          {/* Fixed Header with Buttons */}
          <div className="sticky top-0">
            {/* Bubble Icon */}
            <img
              src={ContactImg}
              alt="Bubble text icon"
              className="w-20 h-auto "
            />
          </div>
          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto p-6  flex flex-col items-center justify-start md:justify-center w-full space-y-6">
            {/* Title */}
            <h1 className="text-2xl text-custom-blue font-bold">
              <span className="marker-effect-cyan z-10">Contact</span>
            </h1>

            {/* Options */}
            <div
              className="text-xl text-custom-blue flex items-start"
              onClick={OpenContactTiCO}
            >
              <img src={flecheLeft} className="w-5 mr-2" />
              <span>
                Contacter <span className="font-bold">TiCO</span>
              </span>
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
              <img src={flecheLeft} className="w-5 mr-2" />
              <span>Encourager la marque pour faire la transparence</span>
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
        <img src={ContactImg} alt="Bubble text icon" className="w-20 h-auto " />

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
            <h1 className="text-2xl text-custom-blue flex items-start">
              <img src={flecheLeft} className="w-5 mr-2" />
              <span>
                Contacter <span className="font-bold">TiCO</span>
              </span>
            </h1>
            <div className="text-xl text-custom-blue flex items-start">
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
                className="bg-custom-green px-4 py-2 text-xl text-white rounded hover:bg-teal-700"
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
export const Solliciter = ({ isOpen, setIsOpen, authUser, gtin }) => {
  const { handleSubmit, loading, error, sended } = useTransparencyRequests();
  const [formValues, setFormValues] = useState({
    user_id: authUser?.id || "",
    gtin: gtin || "",
  });

  const handleRequest = () => {
    handleSubmit(formValues);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="flex flex-col items-center justify-center w-full space-y-4">
        {/* Bubble Icon */}
        <img src={ContactImg} alt="Bubble text icon" className="w-20 h-auto " />
        {/* Title */}
        <h1 className="text-xl text-custom-blue flex items-start">
          <img src={flecheLeft} className="w-5 mr-2" />
          <span>Encourager la marque pour faire la transparence</span>
        </h1>

        {/* Bouton pour envoyer la demande */}
        {!sended ? (
          <button
            onClick={handleRequest}
            className="bg-custom-blue text-white px-2 py-1 rounded-xl text-lg"
            disabled={loading}
          >
            {loading ? (
              <span>Envoi en cours...</span>
            ) : (
              <>
                <span className="font-bold text-xl">Oui,</span> je souhaite plus
                <br />
                d'informations sur ce produit
              </>
            )}
          </button>
        ) : (
          <p className="text-green-500 font-bold text-sm">
            Votre demande a été envoyée avec succès&ensp;!
          </p>
        )}

        {/* Message d'erreur */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Lien pour annuler */}
        <div className="text-custom-gray text-center w-full">
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

export const ContactAdditif = ({ isOpen, setIsOpen, additifs }) => {
  const [showAll, setShowAll] = useState(false);
  const [showInfo, setShowInfo] = useState("additifs");

  const displayedAdditifs = showAll ? additifs : additifs.slice(0, 3);

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="flex flex-col w-full h-full items-center justify-center">
        {/* Fixed Header with Buttons */}
        <div className="sticky">
          <div className="flex flex-row gap-1 max-w-xs mx-auto pt-2">
            <button
              style={{ border: "2px solid #0f548d" }}
              className={`flex-1 p-1 rounded-xl  ${
                showInfo === "transformation"
                  ? "bg-custom-blue font-bold text-white"
                  : "text-custom-blue"
              }`}
              onClick={() => setShowInfo("transformation")}
            >
              Naturalité
            </button>

            <button
              style={{ border: "2px solid #0f548d" }}
              className={`flex-1 p-1 rounded-xl  ${
                showInfo === "additifs"
                  ? "bg-custom-blue text-white font-bold"
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
          <div className="max-w-md mx-auto">
            {/* Content Section */}
            {showInfo === "transformation" ? (
              <div className="space-y-2 pt-4">
                <div className="text-custom-blue text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  consequuntur nostrum blanditiis dicta laboriosam.
                </div>
                <div className="text-custom-blue text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing
                  elit.mollitia incidunt sit consequuntur nostrum blanditiis
                  dicta.
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-3">
                <div className="space-y-4">
                  <div className="flex items-end space-x-2">
                    <span className="text-custom-blue font-bold text-2xl">
                      +2
                    </span>
                    <img
                      src={Additif}
                      alt="Additives"
                      className="w-11 sm:w-12 h-auto"
                    />
                  </div>
                </div>
                <h1 className="text-xl text-custom-blue font-bold text-center py-2">
                  <span className="marker-effect-cyan z-10">Additifs</span>
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
                        <span className="font-bold text-custom-blue">
                          {item.code}
                        </span>
                        <span className="text-custom-blue">: {item.label}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-center">
                      Aucun additif disponible.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Footer */}
        <div>
          <button className="w-full text-center text-[#2c6c67] underline underline-offset-2 focus:outline-none">
            En savoir plus
          </button>
        </div>
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
    A: "Bravo ! Ce produit est excellent sur le plan nutritionnel.",
    B: "Ce produit est bon sur le plan nutritionnel, une bonne option pour une alimentation équilibrée.",
    C: "Ce produit a une qualité nutritionnelle moyenne, consommez-le avec modération.",
    D: "Attention ! Ce produit contient des nutriments à limiter, mais peut s’intégrer dans une alimentation variée.",
    E: "Ce produit est à consommer occasionnellement en raison de sa faible qualité nutritionnelle.",
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
      <div className="flex flex-col w-full h-full items-center justify-center">
        {/* Fixed Header with Buttons */}
        <div className="sticky top-0">
          {/* Title */}
          <h1 className="text-xl text-custom-blue flex flex-col items-center justify-center py-1">
            <span className="font-bold">Nutrition</span>
          </h1>
          <div className="py-2 flex justify-center">
              <img
                className="w-1/3"
                src={selectedNutriscoreImage}
                alt="Nutri-Score"
              />
            </div>
        </div>
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-aut">
          <div className="max-w-md mx-auto">
            <div className=" text-custom-blue text-center">
            Les produits classés E sont ceux qui contiennent le plus d’éléments à limiter (graisses saturées, sucres, sel). Ils sont à consommer avec parcimonie. Toutefois, certains produits peuvent être classés E tout en étant intéressants nutritionnellement, comme certaines huiles. L’important, c’est de les intégrer à petite dose dans votre alimentation globale.            </div>
          </div>
        </div>
        {/* Fixed Footer */}
        <div>
          <button
            className="w-full text-center text-[#2c6c67] underline underline-offset-2 focus:outline-none"
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