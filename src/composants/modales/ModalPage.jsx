import React from "react";
import {
  IonModal,
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
} from "@ionic/react";
import ModalHeader from "./ModalHeader";

const ModalPage = ({
  isOpen,
  onClose,
  children,
  bgHeader = "#fad4ce",
  bgcontent = "#fdf2f0",
  image,
  scroll = true,
}) => {


  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader
        className="ion-no-border z-0"
        style={{ "--ion-background-color": bgHeader }}
      >
        <IonToolbar style={{ "--ion-toolbar-background": bgHeader }}>
          <ModalHeader onClose={onClose} image={image} />
        </IonToolbar>
      </IonHeader>
      <IonContent
        scroll-y={scroll}
        className="flex flex-col ion-no-padding h-full overflow-hidden"
        style={{ "--background": bgcontent }}
      >
        {children}
      </IonContent>
    </IonModal>
  );
};
export default ModalPage;
