import React from "react";
import { IonFooter, IonToolbar } from "@ionic/react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

// Importing icons
import accueil from "../../assets/navbar/accueil.png";
import favoris from "../../assets/navbar/favoris.png";
import astuces from "../../assets/navbar/astuces.png";
import scanner from "../../assets/navbar/scanner.png";
import profil from "../../assets/navbar/profil.png";
import accueil_active from "../../assets/navbar/accueil_active.png";
import favoris_active from "../../assets/navbar/favoris_active.png";
import astuces_active from "../../assets/navbar/astuces_active.png";
import profil_active from "../../assets/navbar/profil_active.png";

const BottomNavbar = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <IonFooter>
      <IonToolbar className="bg-white">
        <div className="flex justify-around items-center py-4 px-1">
          {/* Bouton Accueil */}
          <button className="flex flex-col items-center">
            <img
              src={isAuthenticated ? accueil_active : accueil}
              alt="Accueil"
              className="w-12 h-12 mb-1"
            />
          </button>

          {/* Bouton Favoris */}
          <button className="flex flex-col items-center">
            <img
              src={isAuthenticated ? favoris_active : favoris}
              alt="Favoris"
              className="w-12 h-12 mb-1"
            />
          </button>

          {/* Bouton Scanner */}
          <button className="flex flex-col items-center">
            <img
              src={scanner}
              alt="Scanner"
              className="w-auto h-12 mb-1"
            />
          </button>

          {/* Bouton Profil */}
          <button className="flex flex-col items-center">
            <img
              src={isAuthenticated ? profil_active : profil}
              alt="Profil"
              className="w-12 h-12 mb-1"
            />
          </button>

          {/* Bouton Astuces */}
          <button className="flex flex-col items-center">
            <img
              src={isAuthenticated ? astuces_active : astuces}
              alt="Astuces"
              className="w-12 h-12 mb-1"
            />
          </button>
        </div>
      </IonToolbar>
    </IonFooter>
  );
};

export default BottomNavbar;
