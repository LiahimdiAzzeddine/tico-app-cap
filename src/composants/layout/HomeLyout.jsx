import React from "react";
import { IonPage, IonContent, IonHeader, IonToolbar } from "@ionic/react";
import { useLocation } from "react-router-dom";
import ModalHeader from "../../composants/modales/ModalHeader";
import { useIonRouter } from "@ionic/react";
import BottomNavbar from "../navBars/BottomNavbar";

const HomeLayout = ({ children }) => {
  const history = useIonRouter();
    const goToPage = (path) => {
      history.push(path,"root", "replace");
    };
  const location = useLocation();

  // Définir les couleurs de fond en fonction de la route actuelle
  const backgroundColors = {
    "/": "#c7f0d9",
    "/tab2": "#e1f5f5",
    "/tab5": "#d9c7f0",
    "/tab4": "#fff",
    "/tab1": "#c7f0d9",
  };
  const closeIcon = {
    "/tab1": "vx",
    "/tab2": "bx",
    "/laterProducts": "bx",
    "/tab4": "rf",
  };

  const background = backgroundColors[location.pathname] || "#ffffff";
  const icon = closeIcon[location.pathname] || "";

  return (
    <IonPage id="main-content" style={{ backgroundColor: background,paddingTop:"env(safe-area-inset-top)" }}>
      <IonHeader
         className="ion-no-border z-0"
        style={{ "--ion-background-color": background}}
      >
        <IonToolbar
          style={{ "--ion-toolbar-background": background, padding: 0 }}
        >
          <ModalHeader
            image={icon}
            onClose={() => goToPage("/tab3")}
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
          <BottomNavbar/>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomeLayout;
