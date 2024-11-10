import {
  IonModal,
  IonContent,
  IonProgressBar,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { alertCircle, closeCircle, searchCircle } from "ionicons/icons";
import FicheProduit from "../fb/FicheProduit";
import { useEffect, useState } from "react";
import useGetProduct from "../../hooks/product/useGetProduit";
import { addProduct } from "../../hooks/useIndexedDB"; 
import { useNetwork } from "../../context/NetworkContext";
import { useToast } from "../../context/ToastContext";
import { ErrorMessage } from "./UI/ErrorMessage";


// Composant de chargement
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center p-6">
    <IonProgressBar type="indeterminate" className="rounded-full" />
    <p className="text-gray-600">Recherche du produit...</p>
  </div>
);

const ScanResultModal = ({
  scannedResult,
  modalisOpen,
  closeModal,
  setModalisOpen,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [modalBreakpoint, setModalBreakpoint] = useState(0.3);
  const { productData, loading, error, fetchProduct,setProductData } = useGetProduct(scannedResult);
  const { isConnected } = useNetwork();
  const { triggerToast } = useToast();

  // Effet pour lancer la récupération des données du produit
  useEffect(() => {
    if (scannedResult && isConnected) {
      fetchProduct();
    }else{
      setProductData(null)
    }
  }, [scannedResult, fetchProduct]);

  // Effet pour ajouter le produit à l'historique dès que les données sont prêtes
  useEffect(() => {
    if (productData && !loading && !error) {
      addToHistory(scannedResult, productData);
    }
  }, [productData, scannedResult, loading, error]);

  const addToHistory = async (scannedResult, productData) => {
    const product = {
      image: productData.OFFproduct?._photoUrl ?? "default_image_url.jpg",
      title: productData.OFFproduct?._name ?? "Produit inconnu",
      brand: productData.foodheaproduct?._name ?? "Marque inconnue",
      Barrcode: scannedResult,
    };

    console.log("Produit ajouté à l'historique :", product);
    try {
      await addProduct(product);
      if (!isConnected) {
        triggerToast("Produit ajouté à l'historique", "success");
      }
    } catch (error) {
      if (!isConnected) {
        triggerToast("Erreur lors de l'ajout du produit à l'historique", "error");
      }
      console.error("Erreur lors de l'ajout du produit à l'historique", error);
    }
  };

  const handleDismiss = () => {
    setModalisOpen(false);
  };

  return (
    <IonModal
      isOpen={modalisOpen}
      onClose={() => closeModal(false)}
      trigger="open-modal"
      initialBreakpoint={0.3}
      breakpoints={[0, 0.3, 1]}
      handleBehavior="cycle"
      onIonModalWillPresent={() => setIsAnimating(true)}
      onIonModalDidDismiss={handleDismiss}
      onIonBreakpointDidChange={(e) => setModalBreakpoint(e.detail.breakpoint)}
      className={`full-screen-modal scan-result-modal ${isAnimating ? "modal-vibrate" : ""}`}
      onAnimationEnd={() => setIsAnimating(false)}
      keepContentsMounted={true}
      style={{
        "--border-radius": modalBreakpoint === 1 ? "0" : "2rem 2rem 0 0",
      }}
    >
      <IonContent className="ion-padding-bottom">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          error === "Produit non trouvé." ? (
            <ErrorMessage
              message={`Désolé, nous n'avons pas trouvé ce produit : ${scannedResult}`}
              icon={searchCircle}
              onClose={handleDismiss}
            />
          ) : (
            <ErrorMessage
              message={`Une erreur est survenue lors de la recherche : ${error}`}
              icon={alertCircle}
              onClose={handleDismiss}
            />
          )
        ) : productData ? (
          <FicheProduit barcode={scannedResult} resetBarcode={handleDismiss} />
        ) : (
          <>
            {isConnected ? (
              <ErrorMessage
                message="Désolé, nous n'avons pas reçu de réponse du serveur."
                icon={searchCircle}
                onClose={handleDismiss}
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <IonIcon icon={alertCircle} className="w-16 h-16 text-yellow-500" />
                <h2 className="text-xl font-semibold mb-2">Hors ligne</h2>
                <p className="text-gray-600 mb-4">Vous êtes hors ligne. Souhaitez-vous ajouter ce produit à votre historique ?</p>
                <IonButton onClick={() => addToHistory(scannedResult, {})} color="primary">
                  Ajouter à l'historique
                </IonButton>
              </div>
            )}
          </>
        )}
      </IonContent>
    </IonModal>
  );
};

export default ScanResultModal;
