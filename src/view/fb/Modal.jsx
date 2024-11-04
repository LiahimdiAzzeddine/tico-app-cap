import React, { useState } from "react";
import background from "../../assets/fb/popup/background.svg";
import closeImg from "../../assets/fb/popup/close.svg";
import ContactImg from "../../assets/fb/BubbleImg.svg";
import flecheLeft from "../../assets/fb/popup/flecheleft.svg";
import flecheRight from "../../assets/fb/popup/flecheRight.svg";
import { motion, AnimatePresence } from "framer-motion";
import Additif from "../../assets/fb/additifs.svg";
import { Link } from "react-router-dom";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={onClose}
          />

          {/* Modal container with SVG background and animation */}
          <motion.div
            className="relative w-full max-w-lg h-auto z-50 m-1"
            initial={{ opacity: 0, scale: 0.5 }} // Départ de l'animation
            animate={{ opacity: 1, scale: 1 }} // Animation d'ouverture
            exit={{ opacity: 0, scale: 0.5 }} // Animation de fermeture
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div
              className="w-full h-full aspect-square flex items-center justify-center bg-no-repeat bg-contain bg-center"
              style={{
                backgroundImage: `url(${background})`,
              }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute left-8 top-0 p-2 z-50"
              >
                <img src={closeImg} className="w-12 h-auto" />
              </button>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-12 py-8 bottom-8 bg-opacity-90">
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

// contact Modal
export const ContactModal = ({ isOpen, setIsOpen }) => {
  const [isOpenTiCO, setIsOpenTiCO] = useState(false);
  const [isOpenSolliciter, setIsOpenSolliciter] = useState(false);

  const OpenContactTiCO = () => {
    setIsOpen(false);
    setIsOpenTiCO(true);
  };
  const OpenContactSolliciter = () => {
    setIsOpen(false);
    setIsOpenSolliciter(true);
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col items-center justify-center w-full space-y-4">
          {/* Bubble Icon */}
          <img
            src={ContactImg}
            alt="Bubble text icon"
            className="w-20 h-auto "
          />

          {/* Title */}
          <h1 className="text-2xl text-custom-blue font-bold">
            <span className="marker-effect">Contact</span>
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

          <div className="text-xl text-custom-blue flex items-start">
            <span>Contacter SAV</span>
            <img src={flecheRight} className="w-5 ml-2" />
          </div>

          <div className="text-xl text-custom-blue flex items-start" onClick={OpenContactSolliciter}>
            <img src={flecheLeft} className="w-5 mr-2" />
            <span>Solliciter le fabricant pour plus de transparence</span>
          </div>
        </div>
      </Modal>
      <ContactTiCO isOpen={isOpenTiCO} setIsOpen={setIsOpenTiCO} />
      <Solliciter isOpen={isOpenSolliciter} setIsOpen={setIsOpenSolliciter} />

    </>
  );
};

export const ContactTiCO = ({ isOpen, setIsOpen }) => {
  const [messageSent, setMessageSent] = useState(false); // État pour gérer l'affichage du message
  const [loading, setLoading] = useState(false); // État pour gérer le chargement

  const handleSend = () => {
    setLoading(true); // Démarre le chargement
    // Simule une requête API avec setTimeout (remplace-le par ta logique d'envoi)
    setTimeout(() => {
      setLoading(false); // Arrête le chargement
      setMessageSent(true); // Met à jour l'état pour afficher le message de confirmation
    }, 2000); // Simule un délai de 2 secondes
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="flex flex-col items-center justify-center w-full space-y-2">
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
        ) : messageSent ? (
          // Affiche le message de confirmation si le message a été envoyé
          <div className="text-xl text-custom-blue font-bold text-center">
            Merci, votre signalement a bien été pris en compte !
          </div>
        ) : (
          <>
            {/* Title */}
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
              className="w-full min-h-20 min-w-60 rounded-xl resize-none p-1 border-[1px] border-custom-green"
              placeholder="Votre message..."
            />
            <div className="flex flex-col justify-center items-center space-y-3 ">
              <button
                className="bg-custom-green px-4 py-1 text-xl text-white rounded hover:bg-teal-700"
                onClick={handleSend} // Appelle handleSend au clic
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
export const Solliciter = ({ isOpen, setIsOpen }) => {
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="flex flex-col items-center justify-center w-full space-y-4">
        {/* Bubble Icon */}
        <img src={ContactImg} alt="Bubble text icon" className="w-20 h-auto " />
            {/* Title */}
            <h1 className="text-xl text-custom-blue flex items-start">
              <img src={flecheLeft} className="w-5 mr-2" />
              <span>
              Solliciter le fabricant
              pour plus de transparence
              </span>
            </h1>
            <button className="bg-custom-blue text-white px-2 py-1 rounded-xl text-lg">
            <span className="font-bold text-xl">Oui,</span> je souhaite plus<br></br>
            d'informations sur ce produit
            </button>
            <div className="text-custom-gray text-center w-full">
            Finalement j'ai tout ce qu'il me faut <br></br>
            <Link to={"#"} className="underline underline-offset-2" >Annuler ma demande</Link>
            </div>
           
      </div>
    </Modal>
  );
};
export const ContactAdditif = ({ isOpen, setIsOpen }) => {
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="flex flex-col items-center justify-center w-full space-y-4">
        {/* Bubble Icon */}
        <div className="flex flex-col w-1/2 items-center text-center opacity-40">
          <div className="flex flex-row items-end space-x-1 sm:space-x-2 mt-1">
            <span className="text-custom-blue font-bold text-2xl">+2</span>
            <img
              src={Additif}
              alt="Additives"
              className="w-11 sm:w-12 h-auto"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl text-custom-blue font-bold">
          <span className="marker-effect">Additifs</span>
        </h1>

        {/* Additives List */}
        <div className="space-y-0 flex flex-col justify-center items-center">
          <div className="flex items-center space-x-2 ">
            <span className="bg-green-500 w-4 h-4 rounded-full"></span>
            <span className="font-bold text-custom-blue">E301</span>
            <span className="text-custom-blue">: Ascorbate de sodium</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-yellow-500 w-4 h-4 rounded-full"></span>
            <span className="font-bold text-custom-blue">E331</span>
            <span className="text-custom-blue">: Citrate de sodium</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-red-500 w-4 h-4 rounded-full"></span>
            <span className="font-bold text-custom-blue">E407</span>
            <span className="text-custom-blue">: Carraghénanes</span>
          </div>
        </div>

        {/* Voir Plus Link */}
        <a href="#" className="text-custom-blue underline mt-4 italic">
          Voir plus
        </a>
      </div>
    </Modal>
  );
};
