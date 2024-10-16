import React from 'react';
import { IonModal, IonContent } from '@ionic/react';
import X from '../../assets/auth/XV6-33.png';
import Tico from '../../assets/auth/tico.png';

const CustomModal = ({ isOpen, onClose, children }) => {
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
      <div className="flex justify-between items-center mb-6 p-4 modal-background">
        <button className="text-[#006aff]" onClick={onClose}>
          <img src={X} alt="Close" className="w-8 h-8" />
        </button>
        <div className="text-orange-500 font-bold text-2xl titre-bold">
          <img src={Tico} alt="Tico" className="h-6" />
        </div>
      </div>

      <IonContent className="ion-padding" style={{ overflow: 'hidden', "--background": "#ffeca7" }}>
        {children}
      </IonContent>
    </IonModal>
  );
};

export default CustomModal;
