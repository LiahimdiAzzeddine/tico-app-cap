import React from "react";
import { IonPage, IonContent, IonHeader, IonToolbar } from "@ionic/react";
import { useIonRouter } from "@ionic/react";
import Header from "../modales/Header";

const TapLayout = ({ children,icon,background="#fff" }) => {
  const history = useIonRouter();
  const goToPage = (path) => {
    history.push(path, "root", "replace");
  };

  return (
    <IonPage id="main-content" style={{ backgroundColor: background,paddingTop:"env(safe-area-inset-top)" }}>
      <IonHeader
         className="ion-no-border z-0"
        style={{ "--ion-background-color": background }}
      >
        <IonToolbar style={{ "--ion-toolbar-background": background,padding:0 }}>
 
          <Header image={icon} onClose={() => goToPage("/tabs/tab3")}/>
        </IonToolbar>
      </IonHeader>
      <IonContent className="flex flex-col ion-no-padding h-full" scroll-y="false" >
      { children }
      </IonContent>
    </IonPage>
  );
};

export default TapLayout;
