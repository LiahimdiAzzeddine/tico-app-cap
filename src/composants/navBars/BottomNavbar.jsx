import React, { useEffect, useState } from "react";
import { IonFooter, IonToolbar, useIonRouter } from "@ionic/react";
import { Keyboard } from "@capacitor/keyboard";
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
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const history = useIonRouter();
  const { triggerAlert } = useAlert();

  const goToPage = (path) => {
    history.push(path, "root", "replace");
  };

  const goToSubPage = (path) => {
    history.push(path, "forward", "push");
  };

  const handleButtonClick = async (path, isAuthRequired) => {
    if (isAuthRequired && !authState) {
      triggerAlert(
        "Se connecter pour accéder à cette fonctionnalité",
        "Connexion requise",
        () => goToSubPage("/settings"),
        "",
        "Se connecter"
      );
      return;
    }
    await triggerHapticFeedback();
    goToPage(path);
  };

  const triggerHapticFeedback = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (error) {
      console.error("Haptics not supported on this device");
    }
  };

  useEffect(() => {
    setAuthState(isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardWillShow', () => {
      setIsKeyboardVisible(true);
    });

    const hideListener = Keyboard.addListener('keyboardWillHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return (
    !isKeyboardVisible && ( // Cacher le footer si le clavier est visible
      <IonFooter className="ion-no-border m-0 p-0 bg-white" mode="md">
        <IonToolbar
          className="bg-[#f7f7f700] toolbar-custom safe-area-bottom"
          style={{
            "--ion-toolbar-background": "#ffff",
          }}
        >
          <div className="flex justify-around items-center pt-3 px-2 some-child-element">
            {/* Bouton Accueil */}
            <button
              className="flex flex-col items-center hover:opacity-80 transition-opacity duration-200"
              onClick={() => handleButtonClick("/tab1", true)}
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
              onClick={() => handleButtonClick("/tab2", false)}
              aria-label="Favoris"
            >
              <img src={favoris_active} alt="Favoris" className="w-14 h-14" />
            </button>

            {/* Bouton Scanner */}
            <button
              className="flex flex-col items-center hover:opacity-80 transition-opacity duration-200"
              onClick={() => handleButtonClick("/tab3", false)}
              aria-label="Scanner"
            >
              <img src={scanner} alt="Scanner" className="w-auto h-14" />
            </button>

            {/* Bouton Recipes */}
            <button
              className="flex flex-col items-center hover:opacity-80 transition-opacity duration-200"
              onClick={() => handleButtonClick("/tab4", true)}
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
              onClick={() => handleButtonClick("/tab5", true)}
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
    )
  );
};

export default BottomNavbar;
