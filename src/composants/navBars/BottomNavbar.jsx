import React, { useEffect, useState } from "react";
import { IonFooter, IonToolbar, useIonRouter } from "@ionic/react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { useAlert } from "../../context/AlertProvider";
import accueil from "../../assets/navbar/accueil.png";
import astuces from "../../assets/navbar/astuces.png";
import scanner from "../../assets/navbar/scanner.svg";
import recipes from "../../assets/navbar/profil.png";
import accueil_active from "../../assets/navbar/accueil_active.svg";
import favoris_active from "../../assets/navbar/favoris_active.svg";
import astuces_active from "../../assets/navbar/astuces_active.svg";
import recipes_active from "../../assets/navbar/profil_active.svg";

const BottomNavbar = () => {
  const isAuthenticated = useIsAuthenticated();
  const [authState, setAuthState] = useState(isAuthenticated);
  const history = useIonRouter();
  const { triggerAlert } = useAlert();
  const goToPage = (path) => {
    history.push(path, "root", "replace");
  };
  const goToSubPage = (path) => {
    history.push(path, "forward", "push");
  };
  useEffect(() => {
    setAuthState(isAuthenticated);
  }, [isAuthenticated]);

  const handleButtonClick = async (path, isAuthRequired) => {
    // Si l'utilisateur n'est pas authentifié et la route nécessite une authentification
    if (isAuthRequired && !authState) {
      triggerAlert(
        "Vous devez être connecté pour accéder à cette fonctionnalité. Veuillez vous connecter ou créer un compte.",
        "Connexion requise",
        () => goToSubPage("/settings") // Action si l'utilisateur clique sur "S'inscrire ou se connecter"
      );
      return; // Empêcher la navigation
    }
    // Ajout de retour haptique sur le clic
    await triggerHapticFeedback();

    // Naviguer vers la nouvelle page
    goToPage(path);
  };

  const triggerHapticFeedback = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (error) {
      console.error("Haptics not supported on this device");
    }
  };

  return (
    <IonFooter
     mode="md"
      className="ion-no-border m-0 p-0"
      style={{ "--ion-background-color": "#ffff" }}
    >
      <IonToolbar
       mode="md"
        className="bg-[#f7f7f700] ion-no-padding"
        style={{ "--ion-toolbar-background": "#ffff" }}
      >
        <div className="flex justify-around items-center py-3 px-2">
          {/* Bouton Accueil */}
          <button
            className="flex flex-col items-center hover:opacity-80 transition-opacity duration-200"
            onClick={() => handleButtonClick("/tab1", true)} // Auth requis
            aria-label="Accueil"
          >
            <img
              src={authState ? accueil_active : accueil}
              alt="Accueil"
              className="w-14 h-14"
            />
          </button>

          {/* Bouton Favoris */}
          <button
            className="flex flex-col items-center hover:opacity-80 transition-opacity duration-200"
            /*onClick={() =>
              triggerAlert(
                "Cette fonctionnalité sera disponible dans la prochaine version de l'application.",
                "Fonctionnalité à venir"
              )
            }*/
            onClick={() => handleButtonClick("/tab2", false)}
            aria-label="Favoris"
          >
            <img src={favoris_active} alt="Favoris" className="w-14 h-14" />
          </button>

          {/* Bouton Scanner */}
          <button
            className="flex flex-col items-center hover:opacity-80 transition-opacity duration-200"
            onClick={() => handleButtonClick("/tab3", false)} // Pas d'auth requis
            aria-label="Scanner"
          >
            <img src={scanner} alt="Scanner" className="w-auto h-14" />
          </button>

          {/* Bouton Recipes */}
          <button
            className="flex flex-col items-center hover:opacity-80 transition-opacity duration-200"
            onClick={() => handleButtonClick("/tab4", true)} // Auth requis
            aria-label="Recipes"
          >
            <img
              src={authState ? recipes_active : recipes}
              alt="Recipes"
              className="w-14 h-14"
            />
          </button>

          {/* Bouton Astuces */}
          <button
            className="flex flex-col items-center hover:opacity-80 transition-opacity duration-200"
            onClick={() => handleButtonClick("/tab5", true)} // Auth requis
            aria-label="Astuces"
          >
            <img
              src={authState ? astuces_active : astuces}
              alt="Astuces"
              className="w-14 h-14"
            />
          </button>
        </div>
      </IonToolbar>
    </IonFooter>
  );
};

export default BottomNavbar;
