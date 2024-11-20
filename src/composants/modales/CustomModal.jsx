import React from 'react';
import { IonModal, IonContent } from '@ionic/react';
import ModalHeader from './ModalHeader';

const CustomModal = ({ isOpen, onClose, children,image }) => {
  return (
    <IonModal
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
      }}
    >
      {/* Custom Header */}
      <ModalHeader image={image} onClose={onClose} />
      <IonContent className="ion-padding" style={{ overflow: 'hidden', "--background": "#ffeca7" }}>
      {React.cloneElement(children, { onClose })}
      </IonContent>
    </IonModal>
  );
};

export default CustomModal;
