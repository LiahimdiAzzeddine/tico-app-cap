import React from "react";
import { IonPage, IonContent,IonHeader,IonToolbar } from "@ionic/react";
import { useIonRouter } from "@ionic/react";
import ModalHeader from "../modales/ModalHeader";

const AuthLayout = ({ children,image="bx",Close  }) => {
  const history = useIonRouter();
  
  return ( 
    <IonPage id="main-content" style={{ paddingTop:"env(safe-area-inset-top)",backgroundColor: '#ffeca7' }}>
      <IonHeader
        className="ion-no-border z-0"
        style={{ "--ion-background-color": "#ffeda3" }}
      >
        <IonToolbar
          style={{ "--ion-toolbar-background": "#ffeda3", padding: 0 }}
        >
          <ModalHeader
            image={image}
            onClose={() =>  Close()}
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
