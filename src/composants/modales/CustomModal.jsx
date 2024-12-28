import React from "react";
import {
  IonModal,
  IonContent,
  IonHeader,
  IonToolbar
} from "@ionic/react";
import ModalHeader from "./ModalHeader";

const CustomModal = ({ isOpen, onClose, children, image }) => {
  return (
    <IonModal trigger="open-modal" isOpen={isOpen} onDidDismiss={onClose}>
      {/* Custom Header */}
      <IonHeader
        className="ion-no-border z-0"
        style={{ "--ion-background-color": "#ffeca7" }}
      >
        <IonToolbar style={{ "--ion-toolbar-background": "#ffeca7" }}>
          <ModalHeader image={image} onClose={onClose} />
        </IonToolbar>
      </IonHeader>
      <IonContent
        className="ion-padding"
        style={{ overflow: "hidden", "--background": "#ffeca7" }}
      >
        {React.cloneElement(children, { onClose })}
      </IonContent>
    </IonModal>
  );
};

export default CustomModal;
