import React from "react";
import { IonAlert } from "@ionic/react";

const AlertComponent = ({ isOpen, onClose, header, message, buttons }) => {
  // Vérifiez si des boutons sont fournis, sinon utilisez un bouton par défaut
  const alertButtons = buttons && buttons.length > 0 ? 
    buttons.map((button) => ({
      text: button.text,
      handler: button.onClick,
    })) : 
    [{ text: 'OK', handler: onClose }]; // Bouton par défaut "OK"

  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header={header}
      message={message}
      buttons={alertButtons}
    />
  );
};

export default AlertComponent;
