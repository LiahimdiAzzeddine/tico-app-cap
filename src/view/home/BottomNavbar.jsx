import React, { useEffect, useState } from "react";
import { IonFooter, IonToolbar } from "@ionic/react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useNavigate } from "react-router-dom";

// Importing icons
import accueil from "../../assets/navbar/accueil.png";
import favoris from "../../assets/navbar/favoris.png";
import astuces from "../../assets/navbar/astuces.png";
import scanner from "../../assets/navbar/scanner.png";
import recipes from "../../assets/navbar/profil.png";
import accueil_active from "../../assets/navbar/accueil_active.svg";
import favoris_active from "../../assets/navbar/favoris_active.svg";
import astuces_active from "../../assets/navbar/astuces_active.svg";
import recipes_active from "../../assets/navbar/profil_active.svg";
import AlertComponent from "../composants/AlertComponent";

const BottomNavbar = () => {
  const [showAlert, setShowAlert] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const [authState, setAuthState] = useState(isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    setAuthState(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <>
    
    <IonFooter className="ion-no-border"  style={{ "--ion-background-color": "#ffff"}}>
      <IonToolbar className="bg-[#f7f7f700] ion-no-padding" style={{"--ion-toolbar-background":"#ffff"}}>
        <div className="flex justify-around items-center py-4 px-2">
          {/* Bouton Accueil */}
          <button className="flex flex-col items-center" onClick={() => navigate("/", { replace: true })}>
            <img
              src={authState ? accueil_active : accueil}
              alt="Accueil"
              className="w-14 h-14 mb-1"
            />
          </button>

          {/* Bouton Favoris */}
          <button className="flex flex-col items-center" onClick={() => setShowAlert(true)}>
            <img
              src={authState ? favoris_active : favoris}
              alt="Favoris"
              className="w-14 h-14 mb-1"
            />
          </button>

          {/* Bouton Scanner */}
          <button className="flex flex-col items-center" onClick={() => navigate("/scanner", { replace: true })}>
            <img
              src={scanner}
              alt="Scanner"
              className="w-auto h-14 mb-1"
            />
          </button>

          {/* Bouton recipes */}
          <button className="flex flex-col items-center"  onClick={() => navigate("/recipes", { replace: true })}>
            <img
              src={authState ? recipes_active : recipes}
              alt="Recipes"
              className="w-14 h-14 mb-1"
            />
          </button>

          {/* Bouton Astuces */}
          <button className="flex flex-col items-center" onClick={() => navigate("/tips", { replace: true })}>
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
  header="Information"
  message="Cette fonctionnalité sera disponible dans la prochaine version de l'application."
/>

    </>
  );
};

export default BottomNavbar;
