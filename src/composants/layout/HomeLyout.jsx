import React from "react";
import { IonPage, IonContent, IonHeader, IonToolbar } from "@ionic/react";
import BottomNavbar from "../../composants/navBars/BottomNavbar";
import { useHistory, useLocation } from "react-router-dom";
import ModalHeader from "../../composants/modales/ModalHeader";

const HomeLayout = ({ children }) => {
  const history = useHistory();
  const location = useLocation();

  // Définir les couleurs de fond en fonction de la route actuelle
  const backgroundColors = {
    "/": "#c7f0d9",
    "/helptico": "#e1f5f5",
    "/tips": "#d9c7f0",
    "/recipes": "#fff",
    "/home": "#c7f0d9",
  };
  const closeIcon = {
    "/home": "vx",
    "/helptico": "bx",
    "/laterProducts": "bx",
    "/recipes": "rf",
  };

  const background = backgroundColors[location.pathname] || "#ffffff";
  const icon = closeIcon[location.pathname] || "vx";

  return (
    <IonPage id="main-content" style={{ backgroundColor: background }}>
      <IonHeader
         className="ion-no-border z-0"
        style={{ "--ion-background-color": background }}
      >
        <IonToolbar
          style={{ "--ion-toolbar-background": background, padding: 0 }}
        >
          <ModalHeader
            image={icon}
            onClose={() => history.replace("/scanner")}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-no-padding">
        <div className="flex flex-col h-full">
          {/* Section avec bordure arrondie qui s'étend jusqu'à la navbar */}
          <div
            className="flex flex-col rounded-b-[2rem] flex-1 overflow-hidden"
            style={{ backgroundColor: background }}
          >
            {/* Contenu défilable */}
            <div className="flex-1 overflow-y-auto">{children}</div>
          </div>

          {/* Navigation fixe en bas */}

          <BottomNavbar />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomeLayout;
