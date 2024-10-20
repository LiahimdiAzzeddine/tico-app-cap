import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonMenu,
  IonToast,
  IonIcon,
} from "@ionic/react";
import useLogout from "../../hooks/auth/useLogout";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { logOut, logIn, settings,trailSign } from "ionicons/icons"; // Importing icons for settings, logout, and login
import tico from "../../assets/navbar/tico.png";
import accueil from "../../assets/navbar/accueil.png";
import accueil_active  from "../../assets/navbar/accueil_active.png";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext"; 

function Menu() {
  const { triggerToast } = useToast();
  const navigate = useNavigate();
  const logout = useLogout();
  const isAuthenticated = useIsAuthenticated();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      triggerToast("Déconnexion réussie.", "success");
      
    } else {
      triggerToast("Erreur lors de la déconnexion. Veuillez réessayer.","danger");
    }
  };

  return (
    <IonMenu contentId="main-content">
      <IonHeader className="bg-blue-600 text-white ion-no-border">
        <IonToolbar className="px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img src={tico} alt="Tico" className="h-8 mr-2" />
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="space-y-2">
          {/* Accueil Button */}
          <button
            onClick={() => (window.location.href = "/home")}
            className="flex items-center w-full py-2 px-2 bg-white hover:bg-blue-100 rounded-lg shadow-md transition duration-300"
          >
            <img
              src={isAuthenticated ? accueil_active : accueil}
              alt="Accueil"
              className="w-10 h-10 mr-3"
            />
            <span className="text-blue-600 text-lg font-medium">Accueil</span>
          </button>

          

          {/* Paramètres Button */}
          <button
           onClick={() => {
            navigate("/settings", { replace: true });
          }}
            className="flex items-center w-full py-2 px-2 bg-white hover:bg-blue-100 rounded-lg shadow-md transition duration-300"
          >
            <span className="text-blue-600 mr-3">
              <IonIcon icon={settings} className="w-10 h-10" />
            </span>
            <span className="text-blue-600 text-lg font-medium">
              Paramètres
            </span>
          </button>

          {/* Login Button - only visible if the user is not authenticated */}
          {!isAuthenticated && (
            <button
              onClick={() => {
                navigate("/login", { replace: true });
              }}
              className="flex items-center w-full py-2 px-2 bg-white hover:bg-green-100 rounded-lg shadow-md transition duration-300"
            >
              <span className="text-green-600 mr-3">
                <IonIcon icon={logIn} className="w-10 h-10" />
              </span>
              <span className="text-green-600 text-lg font-medium">Se connecter</span>
            </button>
          )}
          {!isAuthenticated && (
            <button
              onClick={() => {
                navigate("/signup", { replace: true });
              }}
              className="flex items-center w-full py-2 px-2 bg-white hover:bg-green-100 rounded-lg shadow-md transition duration-300"
            >
              <span className="text-green-600 mr-3">
                <IonIcon icon={trailSign} className="w-10 h-10" />
              </span>
              <span className="text-green-600 text-lg font-medium">S'inscription</span>
            </button>
          )}

          {/* Logout Button - only visible if the user is authenticated */}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center w-full py-1 px-2 bg-white hover:bg-red-100 rounded-lg shadow-md transition duration-300"
            >
              <span className="text-red-600 mr-3">
                <IonIcon icon={logOut} className="w-10 h-10" />
              </span>
              <span className="text-red-600 text-lg font-medium">
                Déconnexion
              </span>
            </button>
          )}
        </div>
      </IonContent>


    </IonMenu>
  );
}

export default Menu;
