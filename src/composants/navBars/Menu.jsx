import React from "react";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonMenu,
  IonIcon,
} from "@ionic/react";
import { bookmarkOutline } from "ionicons/icons"; 
import useLogout from "../../hooks/auth/useLogout";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { logOut, logIn, settings, trailSign, home } from "ionicons/icons"; // Importing icons for settings, logout, and login
import tico from "../../assets/navbar/tico.png";
import { useHistory } from "react-router-dom";
import { useToast } from "../../context/ToastContext";

function Menu() {
  const { triggerToast } = useToast();
  const history = useHistory();
  const logout = useLogout();
  const isAuthenticated = useIsAuthenticated();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      triggerToast("Déconnexion réussie.", "success");
    } else {
      triggerToast(
        "Erreur lors de la déconnexion. Veuillez réessayer.",
        "error"
      );
    }
  };

  return (
    <IonMenu contentId="main-content">
      <IonHeader className="bg-blue-600 text-white ion-no-border z-0">
        <IonToolbar
          className="px-4"
          style={{ "--ion-toolbar-background": "#ffff" }}
        >
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
            onClick={() => {
              history.replace("/");
            }}
            className="flex items-center w-full py-2 px-2 bg-white hover:bg-blue-100 rounded-lg shadow-md transition duration-300"
          >
            <span className="text-orange-400 mr-3">
              <IonIcon icon={home} className="w-10 h-10" />
            </span>
            <span className="text-orange-400 text-lg font-medium">Accueil</span>
          </button>
           {/* laterProducts  Button */}
          <button
            onClick={() => {
              history.replace("/laterProducts");
            }}
            className="flex items-center w-full py-2 px-2 bg-white hover:bg-blue-100 rounded-lg shadow-md transition duration-300"
          >
            <span className="text-custom-gray mr-3">
              <IonIcon icon={bookmarkOutline} className="w-10 h-10" />
            </span>
            <span className="text-custom-gray text-lg font-medium">Produits à Consulter</span>
          </button>

          {/* Paramètres Button */}
          <button
            onClick={() => {
              history.replace("/settings");
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
                history.replace("/login");
              }}
              className="flex items-center w-full py-2 px-2 bg-white hover:bg-green-100 rounded-lg shadow-md transition duration-300"
            >
              <span className="text-custom-red-clear mr-3">
                <IonIcon icon={logIn} className="w-10 h-10" />
              </span>
              <span className="text-custom-red-clear text-lg font-medium">
                Se connecter
              </span>
            </button>
          )}
          {!isAuthenticated && (
            <button
              onClick={() => {
                history.replace("/signup");
              }}
              className="flex items-center w-full py-2 px-2 bg-white hover:bg-green-100 rounded-lg shadow-md transition duration-300"
            >
              <span className="text-green-600 mr-3">
                <IonIcon icon={trailSign} className="w-10 h-10" />
              </span>
              <span className="text-green-600 text-lg font-medium">
                S'inscription
              </span>
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
