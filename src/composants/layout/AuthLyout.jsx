import React from "react";
import { IonPage, IonContent,IonHeader,IonToolbar } from "@ionic/react";
import {useHistory } from "react-router-dom";
import X from "../../assets/auth/XV6-33.png";
import Tico from "../../assets/auth/tico.png";
import ModalHeader from "../modales/ModalHeader";

const AuthLayout = ({ children }) => {
  const history = useHistory();

  return (
    
    <IonPage id="main-content" style={{ paddingTop:"env(safe-area-inset-top)" }}>
      <IonHeader
        className="ion-no-border z-0"
        style={{ "--ion-background-color": "#ffeda3" }}
      >
        <IonToolbar
          style={{ "--ion-toolbar-background": "#ffeda3", padding: 0 }}
        >
          <ModalHeader
            image={"bx"}
            onClose={() => history.replace("/scanner")}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent className="flex flex-col h-full">
        <div className="flex flex-col h-full bg-[#ffeda3]">    
          {/* Scrollable Outlet Content */}
          <div className="flex-grow overflow-y-auto p-4">
          { children }
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AuthLayout;
