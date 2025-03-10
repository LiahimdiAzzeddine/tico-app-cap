import { IonPage, IonContent, IonButton, useIonLoading } from "@ionic/react";
import React, { useState,useEffect } from "react";
import { useIonRouter } from "@ionic/react";

import WhiteModal from "../composants/modales/WhiteModal";
import FAQComponent from "../composants/settings/FAQ/FAQComponent";
import useLogout from "../hooks/auth/useLogout";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import Contact from "../composants/settings/Contact";
import CustomModal from "../composants/modales/CustomModal";
import PersonalInfo from "../composants/settings/PersonalInfo";
import { useToast } from "../context/ToastContext";
import AccountCreationForm from "../composants/auth/Register";
import Login from "../composants/auth/login";
import InviteTico from "../composants/settings/InviteTico";
import ModalHeader from "../composants/modales/ModalHeader";
import CGUConfidentialite from "../composants/settings/CGUConfidentialite";

const Settings = () => {
  const { triggerToast } = useToast();
    const [present, dismiss] = useIonLoading();
  
  const history = useIonRouter();
  const [showModalFAQ, setShowModalFAQ] = useState(false);
  const [showModalContact, setShowModalContact] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [showModalInscription, setShowModalInscription] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalInviteTico, setShowModalInviteTico] = useState(false);
  const [showModalCGU, setShowModalCGU] = useState(false);
  const logout = useLogout();
  const isAuthenticated = useIsAuthenticated();
  const goToPage = (path) => {
    history.push(path, "root", "replace");
  };
  const handleLogout = async () => {
    await present({
      mode: "ios",
      spinner: "bubbles",
      cssClass: "custom-loading-dialog",
    });
    const result = await logout();
    if (result.success) {
      triggerToast("Déconnexion réussie.", "success");
      goToPage("/tab3");
    } else {
      triggerToast(
        "Erreur lors de la déconnexion. Veuillez réessayer.",
        "error"
      );
    }
    await dismiss();
  };

  return (
    <>
      <IonPage style={{paddingTop:"env(safe-area-inset-top)",backgroundColor: '#FFECA7' }}>
        {/* Custom Header */}
        <div className="bg-custom-orange-bg">
          <ModalHeader
            onClose={() => {
              history.goBack();
            }}
            image={"bx"}
          />
        </div>
        <IonContent
          className="ion-padding"
          style={{ overflow: "hidden", "--background": "#FFECA7" }}
        >
          {/* Menu Items */}
          <div className="flex flex-col h-full details">

            {/*isAuthenticated?(
            <h2 className="h-1/6 text-center text-custom-blue text-3xl titre-bold flex items-end justify-center w-full ">
              Mon compte
            </h2>):("")*/}
            <div 
              className={`flex flex-col items-center justify-center space-y-4 h-4/5`}
            >
              
              {isAuthenticated && (
                <button
                  className="bg-custom-text-orange Archivo text-white font-bold  text-lg py-2 w-3/4 px-6 rounded-xl  transform transition-transform duration-150 ease-in-out active:scale-90"
                  onClick={() => {
                    setShowModalInfo(true);
                  }}
                >
                  Mes informations
                </button>
              )}
              {!isAuthenticated && (
                <button
                  className="bg-custom-text-orange Archivo text-white font-bold  text-lg py-2 w-3/4 px-6 rounded-xl  transform transition-transform duration-150 ease-in-out active:scale-90"
                  onClick={() => {
                    setShowModalInscription(true);
                  }}
                >
                  Je crée mon compte
                </button>
              )}
              {/* 
              {isAuthenticated && (
                <button className="bg-blue-500 text-white py-2 px-6 rounded-xl w-3/4 active:bg-blue-700 transition duration-75 transform active:scale-95">
                  Gestion des notifications
                </button>
              )}*/}
              <button
                className="bg-custom-blue Archivo text-white font-bold  text-lg py-2 w-3/4 px-6 rounded-xl  transform transition-transform duration-150 ease-in-out active:scale-90"
                onClick={() => {
                  setShowModalContact(true);
                }}
              >
                Nous contacter
              </button>
              <button
                className="bg-custom-blue Archivo text-white font-bold  text-lg py-2 w-3/4 px-6 rounded-xl  transform transition-transform duration-150 ease-in-out active:scale-90"
                onClick={() => {
                  setShowModalFAQ(true);
                }}
              >
                FAQ
              </button>
              <button
                className="bg-custom-blue Archivo text-white font-bold  text-lg py-2 w-3/4 px-6 rounded-xl  transform transition-transform duration-150 ease-in-out active:scale-90"
                onClick={() => {
                  setShowModalInviteTico(true);
                }}
              >
               <span className="leading-archivo">Faire connaître <span className="pallybold leading-archivo">Ti<span className="tracking-tightest leading-archivo">CO</span></span></span> 
              </button>
              {/* 
              <button className="bg-blue-500 text-white py-2 px-6 rounded-xl w-3/4 hover:bg-blue-600 active:bg-blue-700 transition duration-75 transform active:scale-95">
                Noter l'application
              </button>*/}
            </div>

            {/* Logout Section */}

            <div className="h-1/5 flex flex-col items-center mt-2">
              {isAuthenticated && (
                <button
                  className="bg-custom-text-orange Archivo text-white font-bold  text-lg py-2 w-auto px-6 rounded-xl  transform transition-transform duration-150 ease-in-out active:scale-90"
                  onClick={handleLogout}
                >
                  Se&nbsp;déconnecter
                </button>
              )}
              {!isAuthenticated && (
                <button
                  className="bg-custom-text-orange Archivo text-white font-bold  text-lg py-2 w-auto px-6 rounded-xl  transform transition-transform duration-150 ease-in-out active:scale-90"
                  onClick={() => setShowModalLogin(true)}
                >
                  Se&nbsp;connecter
                </button>
              )}
              <div className="text-center text-orange-500 mt-4"
               onClick={() => {
                setShowModalCGU(true);
              }}
              >
                <a href="#" className="underline ArchivoLight">
                  CGU-Confidentialité
                </a>
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
      <WhiteModal isOpen={showModalFAQ} ContentPadding={"ion-padding-top"} onClose={() => setShowModalFAQ(false)}>
        <FAQComponent />
      </WhiteModal>
      {/* Contact Modal */}
      <CustomModal
        isOpen={showModalContact}
        onClose={() => setShowModalContact(false)}
      >
        <Contact setShowModalContact={setShowModalContact} />
      </CustomModal>
      <CustomModal
        isOpen={showModalInfo}
        onClose={() => setShowModalInfo(false)}
      >
        <PersonalInfo />
      </CustomModal>
      {/* Sign-Up Modal */}
      <CustomModal
        isOpen={showModalInscription}
        onClose={() => setShowModalInscription(false)} // Handle modal close logic
      >
        <AccountCreationForm />
      </CustomModal>
      <WhiteModal
        isOpen={showModalInviteTico}
        onClose={() => setShowModalInviteTico(false)} // Handle modal close logic
      >
        <InviteTico />
      </WhiteModal>
      <WhiteModal
        isOpen={showModalCGU}
        onClose={() => setShowModalCGU(false)} 
        ContentPadding = "ion-padding-horizontal"
      >
        <CGUConfidentialite />
      </WhiteModal>
      {/* Login Modal */}
      <CustomModal
        isOpen={showModalLogin}
        onClose={() => setShowModalLogin(false)}
      >
        <Login redirection={() => setShowModalLogin(false)} />
      </CustomModal>
    </>
  );
};

export default Settings;
