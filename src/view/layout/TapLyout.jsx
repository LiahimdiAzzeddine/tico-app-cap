import React from "react";
import { IonPage, IonContent, IonHeader, IonToolbar } from "@ionic/react";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ModalHeader from "../composants/ModalHeader";

const TapLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Définir les couleurs de fond en fonction de la route actuelle
  const backgroundColors = {
    "/tips": "#fff",
    "/recipes": "#fff",
  };
  const closeIcon = {
    "/recipes":"rf",
    "/tips": "of",
  };

  const background = backgroundColors[location.pathname] || "#ffffff";
  const icon = closeIcon[location.pathname] || "vx";
  return (
    <IonPage id="main-content" style={{ backgroundColor: background }}>
      <IonHeader
        className="ion-no-border"
        style={{ "--ion-background-color": background }}
      >
        <IonToolbar style={{ "--ion-toolbar-background": background,padding:0 }}>
          <ModalHeader
            image={icon}
            onClose={() => navigate("scanner", { replace: true })}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent className="flex flex-col ion-no-padding h-full" scroll-y="false" >
            <Outlet />
      </IonContent>
    </IonPage>
  );
};

export default TapLayout;
