import React from "react";
import { IonModal, IonContent,IonPage } from "@ionic/react";
import ModalHeader from "./ModalHeader";

const ModalPage=({ isOpen, onClose,children,bgHeader="#fad4ce",bgcontent="#fdf2f0",image,scroll=true }) => {
    return (
      <IonModal
        isOpen={isOpen}
        onDidDismiss={onClose}
        style={{
          "--background": "#fdf2f0",
          "--ion-padding": "0",
        }}
        className="h-screen"
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
