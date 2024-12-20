import React from 'react';
import { IonModal, IonContent } from '@ionic/react';
import ModalHeader from './ModalHeader';

const WhiteModal = ({ isOpen, onClose,image,scroll=false, children,ContentPadding="ion-padding" }) => {
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
        paddingTop:"env(safe-area-inset-top)",
      }}
    >
      {/* Custom Header */}
     
      <ModalHeader image={image} onClose={onClose} />
      <IonContent className={ContentPadding} style={{ overflow: 'hidden' }} scroll-y={scroll}>
      {React.cloneElement(children, { onClose })}
      </IonContent>
    </IonModal>
  );
};

export default WhiteModal;
