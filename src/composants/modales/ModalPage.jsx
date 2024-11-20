import React from "react";
import { IonModal, IonContent } from "@ionic/react";
import ModalHeader from "./ModalHeader";

const ModalPage=({ isOpen, onClose,children,bgHeader="#fad4ce",bgcontent="#fdf2f0" }) => {
    return (
      <IonModal
        isOpen={isOpen}
        onDidDismiss={onClose}
        style={{
          "--background": "#fdf2f0",
          "--ion-padding": "0",
        }}
      >
        <div style={{backgroundColor:bgHeader}}>
          <ModalHeader onClose={onClose} />
        </div>
        <IonContent className="ion-padding" style={{ "--background": bgcontent }}>
          {children}
        </IonContent>
      </IonModal>
    );
  };
export default ModalPage