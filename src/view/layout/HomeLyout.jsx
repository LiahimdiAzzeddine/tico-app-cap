import React from "react";
import { IonPage, IonContent, IonHeader, IonToolbar } from "@ionic/react";
import BottomNavbar from "../home/BottomNavbar";
import { Outlet, useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";
import ModalHeader from "../composants/ModalHeader";

const HomeLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Définir les couleurs de fond en fonction de la route actuelle
  const backgroundColors = {
    "/home": "#c7f0d9",
    "/favoris": "#f0d9c7",
    "/tips": "#d9c7f0",
    "/recipes": "#fce5e2",
    "/": "#ffeca7",
  };
  const closeIcon = {
    "/": "bx",
    "/laterProducts":"bx"
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
      <IonContent className="flex flex-col h-[60rem] ion-no-padding" scroll-y="false">
        <div
          className="flex flex-col h-full rounded-b-[2rem]"
          style={{ backgroundColor: background }}
        >
          {/* Scrollable Outlet Content overflow-y-auto */}
          <div className="flex-grow">
            <Outlet />
          </div>
        </div>
      </IonContent>
      <BottomNavbar />
    </IonPage>
  );
};

export default HomeLayout;
