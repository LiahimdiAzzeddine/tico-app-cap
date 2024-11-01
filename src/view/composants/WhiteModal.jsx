import React from 'react';
import { IonModal, IonContent } from '@ionic/react';
import Return from '../../assets/home/Return.png';
import Tico from '../../assets/auth/tico.png';
import flecheRecette from "../../assets/recettes/fleche.svg"

const WhiteModal = ({ isOpen, onClose,type, children }) => {
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
      <div className="flex justify-between items-center mb-1 mt-1 mx-1 p-4 modal-background">
        <button className="text-[#006aff]" onClick={onClose}>
          {type=="r"?
          <img src={flecheRecette} alt="Close" className="w-10 h-10" />:<img src={Return} alt="Close" className="w-10 h-10" />}
        </button>
        <div className="text-orange-500 font-bold text-2xl titre-bold">
          <img src={Tico} alt="Tico" className="h-7" />
        </div>
      </div>

      <IonContent className="ion-padding" style={{ overflow: 'hidden' }}>
      {React.cloneElement(children, { onClose })}
      </IonContent>
    </IonModal>
  );
};

export default WhiteModal;
