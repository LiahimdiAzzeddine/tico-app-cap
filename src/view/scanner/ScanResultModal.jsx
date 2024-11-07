import { IonModal, IonContent } from "@ionic/react";
import FicheProduit from "../fb/FicheProduit";
import { useEffect, useState } from "react";
import useGetProduct from "../../hooks/product/useGetProduit";
import { IonProgressBar } from '@ionic/react';

const ScanResultModal = ({ scannedResult="3266980784614", modalisOpen, closeModal, setModalisOpen }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [modalBreakpoint, setModalBreakpoint] = useState(0.3);
  const { productData, loading, error, fetchProduct } = useGetProduct(scannedResult);

  useEffect(() => {
      fetchProduct(scannedResult); 
  }, []);

  const handleDismiss = () => {
    setModalisOpen(false);
  };

  const handleModalWillPresent = () => {
    setIsAnimating(true);
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  const handleBreakpointChange = (event) => {
    setModalBreakpoint(event.detail.breakpoint); // Met à jour le breakpoint actuel
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
      onIonBreakpointDidChange={handleBreakpointChange} // Ajoute l'événement pour le breakpoint
      cssClass={`full-screen-modal scan-result-modal ${isAnimating ? "modal-vibrate" : ""}`}
      onAnimationEnd={handleAnimationEnd}
      keepContentsMounted={true}
      style={{
        "--border-radius": modalBreakpoint === 1 ? "0" : "1rem 1rem 0 0" // Applique le border-radius selon le breakpoint
      }}
    >
      <div className="ion-margin-top">
        <div className="h-4"></div>
      </div>
      <IonContent className="ion-padding-bottom">
        <div className="ion-margin-top">
        {loading ? (
            <IonProgressBar type="indeterminate"></IonProgressBar>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            scannedResult && (
              <FicheProduit barcode={scannedResult} resetBarcode={handleDismiss} />
            )
          )}
        </div>
      </IonContent>
    </IonModal>
  );
};

export default ScanResultModal;
