import React from "react";
import { IonModal, IonContent,IonPage } from "@ionic/react";
import ModalHeader from "./ModalHeader";
import { StatusBar, Style } from '@capacitor/status-bar';

const ModalPage=({ isOpen, onClose,children,bgHeader="#fad4ce",bgcontent="#fdf2f0",image,scroll=true }) => {
  const hideStatusBar = async () => {
    await StatusBar.hide();
  };
  const setStatusBarStyleLight = async () => {
    await StatusBar.setStyle({ style: Style.Light });
  };

    return (
      <IonModal
        isOpen={isOpen}
        onDidDismiss={onClose}
        style={{
          "--background": "#fdf2f0",
          "--ion-padding": "0",
          "--height": "100%",
          "--max-height": "100%",
          "--width": "100%",
          "--max-width": "100%",
          "--min-height": "100%",
          "--min-width": "100%",
          paddingTop:"env(safe-area-inset-top)",
        }}        
      >
        <IonPage id="main-content" style={{ backgroundColor:bgHeader }}>
        <div style={{backgroundColor:bgHeader}}>
          <ModalHeader onClose={onClose} image={image} />
        </div>
        <IonContent  scroll-y={scroll} className="flex flex-col ion-no-padding h-full"  style={{ "--background":bgcontent }}>
          {children}
          </IonContent>
        </IonPage>
      </IonModal>
    );
  };
export default ModalPage
