import React from "react";
import { IonPage, IonContent, IonHeader, IonToolbar } from "@ionic/react";
import { useIonRouter } from "@ionic/react";
import HeaderTab from "../modales/HeaderTab";

const TapLayout = ({ children,icon,background="#fff",filter=2,setRelod }) => {
  const history = useIonRouter();
  const goToPage = (path) => {
    history.push(path, "root", "replace");
  };

  return (
    <IonPage id="main-content" style={{ backgroundColor: background,paddingTop:"env(safe-area-inset-top)"}}>
      <IonHeader
         className="ion-no-border z-0"
        style={{ "--ion-background-color": background }}
      >
        <IonToolbar style={{ "--ion-toolbar-background": background,padding:0 }}>
 
          <HeaderTab image={icon} onClose={() => goToPage("/tab3")} filter={filter} setRelod={setRelod} />
        </IonToolbar>
      </IonHeader>
      <IonContent className="flex flex-col ion-no-padding h-full" scroll-y="false" >
      { children }
      </IonContent>
    </IonPage>
  );
};

export default TapLayout;
