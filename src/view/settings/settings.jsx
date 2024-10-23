import { IonPage, IonContent,IonButton } from "@ionic/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import X from "../../assets/auth/XV6-33.png";
import Tico from "../../assets/auth/tico.png";
import WhiteModal from "../composants/WhiteModal";
import FAQComponent from "./FAQ/FAQComponent";
import useLogout from "../../hooks/auth/useLogout";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import Contact from "./contact";
import CustomModal from "../composants/CustomModal";
import PersonalInfo from "./PersonalInfo";
import { useToast } from "../../context/ToastContext";
import AccountCreationForm from "../auth/Register";
import Login from "../auth/login";
import InviteTico from "./InviteTico";

function Settings() {
  const { triggerToast } = useToast();
  const navigation = useNavigate();
  const [showModalFAQ, setShowModalFAQ] = useState(false);
  const [showModalContact, setShowModalContact] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [showModalInscription, setShowModalInscription] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalInviteTico, setShowModalInviteTico] = useState(false);

  const logout = useLogout();
  const isAuthenticated = useIsAuthenticated();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      triggerToast("Déconnexion réussie.", "success");
    } else {
      triggerToast(
        "Erreur lors de la déconnexion. Veuillez réessayer.",
        "danger"
      );
    }
  };

  return (
    <>
      <IonPage>
        {/* Custom Header */}
        <div className="bg-[#ffeca7]">
          <div className="flex justify-between items-center mb-5 mt-1 p-4 mx-1 modal-background ">
            <button
              className="text-[#006aff]"
              onClick={() => {
                navigation("/scanner", { replace: true });
              }}
            >
              <img src={X} alt="Close" className="w-10 h-10" />
            </button>
            <div className="text-orange-500 font-bold text-2xl titre-bold">
              <img src={Tico} alt="Tico" className="h-7" />
            </div>
          </div>
        </div>
        <IonContent
          className="ion-padding"
          style={{ overflow: "hidden", "--background": "#ffeca7" }}
        >
          {/* Menu Items */}
          <div className="flex flex-col h-full">
            <h2 className="grow-0 text-center text-[#006aff] text-2xl titre-bold underline underline-offset-4 decoration-orange-400">
              Mon compte
            </h2>
            <div className="flex flex-col items-center justify-center space-y-4 grow-[3]">
              {isAuthenticated && (
                <button
                  className="bg-orange-500 text-white py-2 px-6 rounded-xl w-3/4 active:bg-orange-700 transition duration-75 transform active:scale-95"
                  onClick={() => {
                    setShowModalInfo(true);
                  }}
                >
                  Mes informations
                </button>
              )}
              {!isAuthenticated && (
                <button
                  className="bg-orange-500 text-white py-2 px-6 rounded-xl w-3/4 active:bg-orange-700 transition duration-75 transform active:scale-95"
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
                className="bg-blue-500 text-white py-2 px-6 rounded-xl w-3/4 active:bg-blue-700 transition duration-75 transform active:scale-95"
                onClick={() => {
                  setShowModalContact(true);
                }}
              >
                Nous contacter
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-6 rounded-xl w-3/4 active:bg-blue-700 transition duration-75 transform active:scale-95"
                onClick={() => {
                  setShowModalFAQ(true);
                }}
              >
                FAQ
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-6 rounded-xl w-3/4 active:bg-blue-700 transition duration-75 transform active:scale-95"
                onClick={() => {
                  setShowModalInviteTico(true);
                }}
              >
                Faire connaître TiCO
              </button>
              {/* 
              <button className="bg-blue-500 text-white py-2 px-6 rounded-xl w-3/4 hover:bg-blue-600 active:bg-blue-700 transition duration-75 transform active:scale-95">
                Noter l'application
              </button>*/}
            </div>

            {/* Logout Section */}

            <div className="grow-[1] flex flex-col items-center mt-2">
              {isAuthenticated && (
                
                <IonButton
                className="text-white font-bold transition duration-75 transform active:scale-95 normal-case ion-button"
                onClick={handleLogout}
              >
                Se déconnecter
              </IonButton>
              )}
              {!isAuthenticated && (
                <IonButton
                className="text-white font-bold transition duration-75 transform active:scale-95 normal-case ion-button"
                onClick={() => setShowModalLogin(true)}
              >
                Se connecter
              </IonButton>
              )}
              <div className="text-center text-blue-500 mt-4">
                <a href="#" className="underline">
                  CGU
                </a>{" "}
                -{" "}
                <a href="#" className="underline">
                  Confidentialité
                </a>
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
      <WhiteModal isOpen={showModalFAQ} onClose={() => setShowModalFAQ(false)}>
        <FAQComponent />
      </WhiteModal>
      {/* Contact Modal */}
      <CustomModal
        isOpen={showModalContact}
        onClose={() => setShowModalContact(false)}
      >
        <Contact />
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
      {/* Login Modal */}
      <CustomModal
        isOpen={showModalLogin}
        onClose={() => setShowModalLogin(false)}
      >
        <Login />
      </CustomModal>
    </>
  );
}

export default Settings;
