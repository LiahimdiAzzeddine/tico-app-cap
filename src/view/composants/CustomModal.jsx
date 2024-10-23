import React from 'react';
import { IonModal, IonContent } from '@ionic/react';
import X from '../../assets/auth/XV6-33.png';
import Tico from '../../assets/auth/tico.png';
import ReturnImage from '../../assets/home/return.png';

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
      <div className="flex justify-between items-center mb-5 mt-1 p-4 mx-1 modal-background">
        <button className="text-[#006aff]" onClick={onClose}>
          <img src={image=="x"?X:ReturnImage} alt="Close" className="w-10 h-10" />
        </button>
        <div className="text-orange-500 font-bold text-2xl titre-bold ">
          <img src={Tico} alt="Tico" className="h-7" />
        </div>
      </div>

      <IonContent className="ion-padding" style={{ overflow: 'hidden', "--background": "#ffeca7" }}>
      {React.cloneElement(children, { onClose })}
      </IonContent>
    </IonModal>
  );
};

export default CustomModal;