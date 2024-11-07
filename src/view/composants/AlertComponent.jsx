import React from "react";
import { IonAlert } from "@ionic/react";

const AlertComponent = ({ isOpen, onClose, header, message, buttons = ["OK"] }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header={header}
      message={message}
      buttons={buttons}
    />
  );
};

export default AlertComponent;
