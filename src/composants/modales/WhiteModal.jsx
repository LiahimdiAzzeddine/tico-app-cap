import React from "react";
import { IonModal, IonContent, IonHeader, IonToolbar } from "@ionic/react";
import ModalHeader from "./ModalHeader";

const WhiteModal = ({
  isOpen,
  onClose,
  image,
  scroll = false,
  children,
  ContentPadding = "ion-padding",
}) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      {/* Custom Header */}
      <IonHeader
        className="ion-no-border z-0"
        style={{ "--ion-background-color": "#fff" }}
      >
        <IonToolbar class="z-0" style={{ "--ion-toolbar-background": "#fff" }}>
          <ModalHeader image={image} onClose={onClose} />
        </IonToolbar>
      </IonHeader>

      <IonContent
        className={ContentPadding}
        style={{ overflow: "hidden" }}
        scroll-y={scroll}
      >
        {React.cloneElement(children, { onClose })}
      </IonContent>
    </IonModal>
  );
};

export default WhiteModal;
