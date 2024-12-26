import React from "react";
import { IonPage, IonContent, IonHeader, IonToolbar } from "@ionic/react";
import { useIonRouter } from "@ionic/react";
import { useLocation } from "react-router-dom";
import ModalHeader from "../../composants/modales/ModalHeader";

const TapLayout = ({ children }) => {
  const location = useLocation();
  const history = useIonRouter();
  const goToPage = (path) => {
    history.push(path, "root", "replace");
  };

  // Définir les couleurs de fond en fonction de la route actuelle
  const backgroundColors = {
    "/tabs/tab5": "#fff",
    "/tabs/tab4": "#fff",
  };
  const closeIcon = {
    "/tabs/tab4":"rf",
    "/tabs/tab5": "of",
  };

  const background = backgroundColors[location.pathname] || "#ffffff";
  const icon = closeIcon[location.pathname] || "";
  return (
    <IonPage id="main-content" style={{ backgroundColor: background,paddingTop:"env(safe-area-inset-top)" }}>
      <IonHeader
         className="ion-no-border z-0"
        style={{ "--ion-background-color": background }}
      >
        <IonToolbar style={{ "--ion-toolbar-background": background,padding:0 }}>
          <ModalHeader
            image={icon}
            onClose={() =>  goToPage("/tabs")}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent className="flex flex-col ion-no-padding h-full" scroll-y="false" >
      { children }
      </IonContent>
    </IonPage>
  );
};

export default TapLayout;
