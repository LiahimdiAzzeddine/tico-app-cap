import {
  IonModal,
  IonContent,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { alertCircle, searchCircle } from "ionicons/icons";
import FicheProduit from "../fb/FicheProduit";
import { useEffect, useState } from "react";
import useGetProduct from "../../hooks/product/useGetProduit";
import { addProduct,addLaterProduct } from "../../hooks/useIndexedDB";
import { useNetwork } from "../../context/NetworkContext";
import { useToast } from "../../context/ToastContext";
import { ErrorMessage } from "./UI/ErrorMessage";
import ModalHeader from "../modales/ModalHeader";
import { createProduct } from "../../utils/product";
import LoadingFbState from "./UI/LoadingFbState";


const ScanResultModal = ({
  scannedResult,
  modalisOpen,
  closeModal,
  setBreakpoint,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [modalBreakpoint, setModalBreakpoint] = useState(0.3);
  const {
    productData,
    loading,
    error,
    fetchProduct,
    setProductData,
    setError,
  } = useGetProduct(scannedResult);
  const [product, setProduct] = useState(null);
  const { isConnected } = useNetwork();
  const { triggerToast } = useToast();

  const DetectBreakpoint = (point) => {
  console.log("Breakpoint détecté :", point);
  setModalBreakpoint(point);
  setBreakpoint(point);
  
};

  

  // Effet pour lancer la récupération des données du produit
  useEffect(() => {
    if (scannedResult && isConnected) {
      fetchProduct();
    } else {
      setProductData(null);
    }
  }, [scannedResult, isConnected]);

  // Effet pour ajouter le produit à l'historique dès que les données sont prêtes
  useEffect(() => {
    if (productData && !loading && !error) {
      // Create the product using the imported function
      const product = createProduct(scannedResult, productData);
      setProduct(product);
      addToHistory(scannedResult, product);
    } else {
      const product = createProduct(scannedResult, {});
      setProduct(product);
    }
  }, [productData]);

  const addToHistory = async (scannedResult, product) => {
    try {
      await addProduct(product);
    } catch (error) {
        triggerToast(
          "Erreur lors de l'ajout du produit à l'historique",
          "error"
        );
      console.error("Erreur lors de l'ajout du produit à l'historique", error);
    }
  };
  const addToLaterProducts = async (scannedResult, product) => {
    try {
      await addLaterProduct(product);
      triggerToast("Produit ajouté à l'historique", "success");
    } catch (error) {
        triggerToast(
          "Erreur lors de l'ajout du produit à l'historique",
          "error"
        );
      
      console.error("Erreur lors de l'ajout du produit à l'historique", error);
    }
  };

  const handleDismiss = () => {
    setProductData(null);
    closeModal();
    setError(null);
  };

  return (
    <IonModal
      isOpen={modalisOpen}
      onClose={handleDismiss}
      trigger="open-modal"
      initialBreakpoint={0.35}
      breakpoints={[0, 0.35, 1]}
      handleBehavior="cycle"
      onIonModalWillPresent={() => setIsAnimating(true)}
      onIonModalDidDismiss={handleDismiss}
      onIonBreakpointDidChange={(e) => DetectBreakpoint(e.detail.breakpoint)}
      className={`full-screen-modal scan-result-modal ${
        isAnimating ? "modal-vibrate" : ""
      }`}
      onAnimationEnd={() => setIsAnimating(false)}
      keepContentsMounted={true}
      style={{
        "--border-radius": modalBreakpoint === 1 ? "0" : "2rem 2rem 0 0",
      }}
    >
      {/***/}
      <ModalHeader image={"fb"} heart={true} onClose={() => handleDismiss(false)} />

      <IonContent className="ion-padding-bottom">
        {loading ? (
          <LoadingFbState />
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
          <FicheProduit productData={product} resetBarcode={handleDismiss} />
        ) : (
          <>
            {isConnected ? (
              <ErrorMessage
                message="Désolé, nous n'avons pas reçu de réponse du serveur."
                icon={searchCircle}
                onClose={handleDismiss}
              />
            ) : (
              <div className="flex flex-col items-center justify-center px-6 text-center">
                <IonIcon
                  icon={alertCircle}
                  className="w-16 h-16 text-yellow-500"
                />
                <h2 className="text-xl font-semibold mb-1">Hors ligne</h2>
                <p className="text-gray-600 mb-2">
                Vous êtes hors ligne. Souhaitez-vous garder ce produit pour plus tard ?
                </p>
                <IonButton
                  onClick={() => addToLaterProducts(scannedResult, product)}
                  color="primary"
                >
                 Sauvegarder
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
