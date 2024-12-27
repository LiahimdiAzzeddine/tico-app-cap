import React from "react";
import { IonModal, IonContent, IonHeader, IonToolbar } from "@ionic/react";
import ModalHeader from "./ModalHeader";

const CustomModal = ({ isOpen, onClose, children, image }) => {
  return (
    <IonModal
      trigger="open-modal"
      isOpen={isOpen}
      onDidDismiss={onClose}
      style={{
        "--background": "#ffeca7",
        "--height": "100%",
        "--max-height": "100%",
        "--width": "100%",
        "--max-width": "100%",
        "--min-height": "100%",
        "--min-width": "100%",
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      {/* Custom Header */}
      <IonHeader>
        <IonToolbar>
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
