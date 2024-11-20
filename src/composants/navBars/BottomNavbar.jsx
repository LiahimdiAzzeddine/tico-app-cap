import React, { useEffect, useState } from "react";
import { IonFooter, IonToolbar } from "@ionic/react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useHistory } from 'react-router-dom'; // Import du hook useHistory
import { Haptics, ImpactStyle } from "@capacitor/haptics"; // Import Capacitor Haptics

import accueil from "../../assets/navbar/accueil.png";
import favoris from "../../assets/navbar/favoris.png";
import astuces from "../../assets/navbar/astuces.png";
import scanner from "../../assets/navbar/scanner.svg";
import recipes from "../../assets/navbar/profil.png";
import accueil_active from "../../assets/navbar/accueil_active.svg";
import favoris_active from "../../assets/navbar/favoris_active.svg";
import astuces_active from "../../assets/navbar/astuces_active.svg";
import recipes_active from "../../assets/navbar/profil_active.svg";
import AlertComponent from "../AlertComponent";

const BottomNavbar = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const isAuthenticated = useIsAuthenticated();
  const [authState, setAuthState] = useState(isAuthenticated);
  const history = useHistory();

  useEffect(() => {
    setAuthState(isAuthenticated);
  }, [isAuthenticated]);

  const handleButtonClick = async (path, isAuthRequired) => {
    // Si l'utilisateur n'est pas authentifié et la route nécessite une authentification
    if (isAuthRequired && !authState) {
      setAlertMessage("Vous devez être connecté pour accéder à cette fonctionnalité. Veuillez vous connecter ou créer un compte.");
      setShowAlert(true);
      return; // Empêche la navigation
    }

    // Ajout de retour haptique sur le clic
    await triggerHapticFeedback();
    history.replace(path);
  };

  const triggerHapticFeedback = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (error) {
      console.error("Haptics not supported on this device");
    }
  };

  const handleAlertAction = (action) => {
    if (action === "connect") {
      // Rediriger vers la page de connexion ou d'inscription
      history.replace("/settings");
    }
    setShowAlert(false); // Fermer l'alerte après l'action
  };

  return (
    <>
      <IonFooter
        className="ion-no-border"
        style={{ "--ion-background-color": "#ffff" }}
      >
        <IonToolbar
          className="bg-[#f7f7f700] ion-no-padding"
          style={{ "--ion-toolbar-background": "#ffff" }}
        >
          <div className="flex justify-around items-center py-4 px-2">
            {/* Bouton Accueil */}
            <button
              className="flex flex-col items-center hover:opacity-80 transition-opacity duration-200"
              onClick={() => handleButtonClick('/home', true)} // Auth requis
              aria-label="Accueil"
            >
              <img
                src={authState ? accueil_active : accueil}
                alt="Accueil"
                className="w-14 h-14 mb-1"
              />
            </button>

            {/* Bouton Favoris */}
            <button
              className="flex flex-col items-center hover:opacity-80 transition-opacity duration-200"
              onClick={() =>alert("Cette fonctionnalité sera disponible dans la prochaine version de l'application.")} // Auth requis
              aria-label="Favoris"
            >
              <img
                src={authState ? favoris_active : favoris}
                alt="Favoris"
                className="w-14 h-14 mb-1"
              />
            </button>

            {/* Bouton Scanner */}
            <button
              className="flex flex-col items-center hover:opacity-80 transition-opacity duration-200"
              onClick={() => handleButtonClick('/scanner', false)} // Pas d'auth requis
              aria-label="Scanner"
            >
              <img src={scanner} alt="Scanner" className="w-auto h-14 mb-1" />
            </button>

            {/* Bouton Recipes */}
            <button
              className="flex flex-col items-center hover:opacity-80 transition-opacity duration-200"
              onClick={() => handleButtonClick('/recipes', true)} // Auth requis
              aria-label="Recipes"
            >
              <img
                src={authState ? recipes_active : recipes}
                alt="Recipes"
                className="w-14 h-14 mb-1"
              />
            </button>

            {/* Bouton Astuces */}
            <button
              className="flex flex-col items-center hover:opacity-80 transition-opacity duration-200"
              onClick={() => handleButtonClick('/tips', true)} // Auth requis
              aria-label="Astuces"
            >
              <img
                src={authState ? astuces_active : astuces}
                alt="Astuces"
                className="w-14 h-14 mb-1"
              />
            </button>
          </div>
        </IonToolbar>
      </IonFooter>

      {/* Utilisation de AlertComponent */}
      <AlertComponent
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        header="Connexion requise"
        message={alertMessage}
        buttons={[
          {
            text: "D'accord",
            onClick: () => setShowAlert(false),
          },
          {
            text: "S'inscrire ou se connecter",
            onClick: () => handleAlertAction("connect"),
          },
        ]}
      />
    </>
  );
};

export default BottomNavbar;
