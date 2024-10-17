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
import { logOut, logIn, settings } from "ionicons/icons"; // Importing icons for settings, logout, and login
import tico from "../../assets/navbar/tico.png";
import accueil from "../../assets/navbar/accueil.png";
import profil from "../../assets/navbar/profil.png";
import accueil_active from "../../assets/navbar/accueil_active.png";
import profil_active from "../../assets/navbar/profil_active.png";
import { useNavigate } from "react-router-dom";


function Menu() {
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("");

  const logout = useLogout();
  const isAuthenticated = useIsAuthenticated();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      setToastMessage("Déconnexion réussie.");
      setToastColor("success");
    } else {
      setToastMessage("Erreur lors de la déconnexion. Veuillez réessayer.");
      setToastColor("danger");
    }
    setShowToast(true);
  };

  return (
    <IonMenu contentId="main-content">
      <IonHeader className="bg-blue-600 text-white">
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

          {/* Profil Button */}
          <button
            onClick={() => (window.location.href = "/profile")}
            className="flex items-center w-full py-2 px-2 bg-white hover:bg-blue-100 rounded-lg shadow-md transition duration-300"
          >
            <img
              src={isAuthenticated ? profil_active : profil}
              alt="Profil"
              className="w-10 h-10 mr-3"
            />
            <span className="text-blue-600 text-lg font-medium">Profil</span>
          </button>

          {/* Paramètres Button */}
          <button
            onClick={() => (window.location.href = "/settings")}
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
              onClick={() => {navigate("/", { replace: true });}}
              className="flex items-center w-full py-2 px-2 bg-white hover:bg-green-100 rounded-lg shadow-md transition duration-300"
            >
              <span className="text-green-600 mr-3">
                <IonIcon icon={logIn} className="w-10 h-10" />
              </span>
              <span className="text-green-600 text-lg font-medium">Login</span>
            </button>
          )}

          {/* Logout Button - only visible if the user is authenticated */}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center w-full py-1 px-2 bg-white hover:bg-red-100 rounded-lg shadow-md transition duration-300"
            >
              <span className="text-red-600 mr-3">
                <IonIcon icon={logOut}  className="w-10 h-10"/>
              </span>
              <span className="text-red-600 text-lg font-medium">
                Déconnexion
              </span>
            </button>
          )}
        </div>
      </IonContent>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={3000}
        color={toastColor}
        position="top"
      />
    </IonMenu>
  );
}

export default Menu;
