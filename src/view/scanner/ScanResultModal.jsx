import { IonModal, IonContent } from "@ionic/react";
import FicheProduit from "../fb/FicheProduit";
import { useEffect, useState } from "react";

const ScanResultModal = ({ scannedResult, modalisOpen, closeModal, setModalisOpen }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleDismiss = () => {
    console.log("Modal dismissed");
    setModalisOpen(false);
  };

  const handleModalWillPresent = () => {
    setIsAnimating(true);
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  return (
    <IonModal
      isOpen={modalisOpen}
      onClose={() => closeModal(false)}
      trigger="open-modal"
      initialBreakpoint={0.3}
      breakpoints={[0, 0.3, 1]}
      handleBehavior="cycle"
      onIonModalWillPresent={handleModalWillPresent}
      onIonModalDidDismiss={handleDismiss}
      cssClass={`full-screen-modal ${isAnimating ? "modal-vibrate" : ""}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <IonContent className="ion-padding">
        <div className="ion-margin-top">
          {scannedResult && <FicheProduit barcode={scannedResult} resetBarcode={closeModal} />}
        </div>
      </IonContent>
    </IonModal>
  );
};

export default ScanResultModal;
