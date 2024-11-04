import React from 'react';
import { IonModal, IonContent } from '@ionic/react';
import ModalHeader from './ModalHeader';

const WhiteModal = ({ isOpen, onClose,image, children }) => {
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      style={{
        "--background": "#fff",
        "--height": "100%",
        "--max-height": "100%",
        "--width": "100%",
        "--max-width": "100%",
        "--min-height": "100%",
        "--min-width": "100%",
      }}
    >
      {/* Custom Header */}
     
      <ModalHeader image={image} onClose={onClose} />
      <IonContent className="ion-padding" style={{ overflow: 'hidden' }}>
      {React.cloneElement(children, { onClose })}
      </IonContent>
    </IonModal>
  );
};

export default WhiteModal;
