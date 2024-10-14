import React, { useState } from "react";
import { IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon } from "@ionic/react";
import tico_intro from "../../assets/intro/tico_intro.png";
import background from "../../assets/intro/background6.png";
import Tico from "../../assets/auth/tico.png";
import X from "../../assets/auth/XV6-33.png";
import AccountCreationForm from "../auth/Register";

const Intro6 = () => {
  // State to manage modal visibility
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col items-center justify-between bg-white min-h-screen w-full">
      {/* Logo Section */}
      <div className="grow flex items-end justify-center w-full pt-1">
        <img className="w-64" src={tico_intro} alt="TiCO Logo" />
      </div>

      {/* Buttons Section with Background */}
      <div className="grow flex items-center justify-start w-full max-w-sm px-2">
        <div
          className="w-full max-w-sm aspect-square flex items-center justify-center bg-no-repeat bg-contain bg-center"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="flex flex-col items-center justify-center w-3/5">
            <button
              className="bg-[#ff8300] hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-md mb-4 w-full transition-colors duration-300"
              onClick={() => setShowModal(true)} // Open modal on click
            >
              Je crée mon compte
            </button>
            <button className="bg-[#ff8300] hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-md w-full transition-colors duration-300">
              J'utilise TiCO <br /> en tant qu'invité
            </button>
          </div>
        </div>
      </div>
      
    
      <IonModal
        isOpen={showModal}
        onDidDismiss={() => setShowModal(false)}
        style={{
          "--background": "#ffeca7",
          "--height": "100%",        // Occupe 100% de la hauteur
          "--max-height": "100%",     // Maximum de la hauteur
          "--width": "100%",         // Occupe 100% de la largeur
          "--max-width": "100%",      // Maximum de la largeur
          "--min-height": "100%",      // Minimum de la hauteur
          "--min-width": "100%",       // Minimum de la largeur
        }}
      >
        {/* Custom Header */}
        <div className="flex justify-between items-center mb-6 p-4 modal-background">
          <button className="text-[#006aff]" onClick={() => setShowModal(false)}>
            <img src={X} alt="Close" className="w-8 h-8" />
          </button>
          <div className="text-orange-500 font-bold text-2xl titre-bold">
            <img src={Tico} alt="Tico" className="h-6" />
          </div>
        </div>

        <IonContent className="ion-padding" style={{ overflow: 'hidden', height: 'inner-scroll', "--background": "#ffeca7" }} >
          <AccountCreationForm />
        </IonContent>
      </IonModal>
      {/* Empty div for spacing */}
      <div className="grow min-h-[8vh]"></div>
    </div>
  );
};

export default Intro6;
