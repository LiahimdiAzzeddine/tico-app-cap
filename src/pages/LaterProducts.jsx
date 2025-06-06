import React, { useEffect, useState } from "react";
import { IonContent, IonModal, IonPage, useIonRouter } from "@ionic/react";
import { useNetwork } from "../context/NetworkContext";
import LaterItem from "../composants/history/LaterItem";
import ModalHeader from "../composants/modales/ModalHeader";
import FicheProduit from "../composants/FP/FicheProduit";
import { useAlert } from "../context/AlertProvider"; 

import {
  getAllLaterProducts,
  deleteProductFromLater,
  addProduct,
} from "../hooks/useIndexedDB";
import useGetProductLater from "../hooks/product/useGetProductLater";
import { createProduct } from "../utils/product";
import SimpleLyout from "../composants/layout/SimpleLyout";
import VF from "../assets/history/vf.svg";
import { GlobalProvider } from "../composants/FP/GlobalProvider";
import EmptyLater from "../composants/history/ui/EmptyLater";
import { bookmarkOutline } from "ionicons/icons";

const LaterProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpenFb, setIsOpenFb] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isConnected } = useNetwork();
  const { triggerAlert } = useAlert();
  const history = useIonRouter();

  const {
    productLoading,
    error: productError,
    fetchProduct,
  } = useGetProductLater();

  // État pour gérer le chargement global
  const isLoading = loading || productLoading;

  // Fonction pour gérer les erreurs
  const handleError = (error, context) => {
    console.error(`Erreur dans ${context}:`, error);
    setError(error.message || "Une erreur est survenue");
    // Vous pouvez ajouter ici votre logique de notification d'erreur
  };

  // Fonction pour ouvrir le modal et charger les détails du produit
  const handleOpenFb = async (ean) => {
    if (!ean) {
      triggerAlert(
        "Code EAN invalide",
        "Erreur"
      );
      handleError(new Error("Code EAN invalide"), "handleOpenFb");
      return;
    }

    if (!isConnected) {
      triggerAlert(
        "Pas de connexion internet",
        "Erreur"
      );
      handleError(new Error("Pas de connexion internet"), "handleOpenFb");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fetchedData = await fetchProduct(ean);
      
      if (!fetchedData) {
        throw new Error("Produit non trouvé");
      }

      const newProduct = createProduct(ean, fetchedData);
      
      // Ajouter le produit à l'historique
      await addProduct(newProduct);
      setSelectedProduct(newProduct);
      
      // Supprimer de la liste "à consulter plus tard"
      await handleDelete(newProduct.gtin);
      
      setIsOpenFb(true);
    } catch (error) {
      handleError(error, "handleOpenFb");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour supprimer un produit
  const handleDelete = async (ean) => {
    try {
      await deleteProductFromLater(ean);
      const updatedProducts = await getAllLaterProducts();
      setProducts(updatedProducts);
    } catch (error) {
      handleError(error, "handleDelete");
    }
  };

  // Charger la liste initiale des produits
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const allProducts = await getAllLaterProducts();
        setProducts(allProducts);
      } catch (error) {
        handleError(error, "fetchProducts");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleModalClose = () => {
    setIsOpenFb(false);
    setSelectedProduct(null);
    setError(null);
  };

  // Composant pour afficher l'état de chargement
  const LoadingState = () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-8 w-8 bg-gray-200 rounded-full mb-2"></div>
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  // Composant pour afficher les erreurs
  const ErrorMessage = ({ message }) => (
    <div className="flex items-center justify-center h-full text-red-500 p-4 text-center">
      <p>{message}</p>
    </div>
  );

  return (
    <>
       <SimpleLyout
    Close={() => {
      history.goBack();
    }}
      image={VF}
    >
      <div className="p-4 details flex flex-col h-full">
        <div
          className="flex flex-col items-center justify-center min-h-[10vh] backgroundHistorique"
         
        >
          <h2 className="text-center text-custom-green-text text-[1.7rem] titre-bold z-10">
            Produits à&nbsp;consulter
          </h2>
        </div>

        <div className="mt-2 flex-grow overflow-y-auto">
          {isLoading && <LoadingState />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <LaterItem
                    product={product}
                    index={index}
                    length={products.length}
                    key={product.gtin || index}
                    OpenFb={handleOpenFb}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <EmptyLater 
                title="Aucun produit sauvegardé" 
                description="Hors ligne ? Scanner des produits pour les consulter plus tard"
                icon={bookmarkOutline} 

              />              
              )}
            </>
          )}
        </div>
      </div>
</SimpleLyout>
      <IonModal isOpen={isOpenFb}>
        <IonPage style={{paddingTop:"env(safe-area-inset-top)",backgroundColor:"#ffffff" }}>
        <ModalHeader image={"fb"} onClose={handleModalClose} />
        <IonContent className="ion-padding-bottom">
          {selectedProduct && (
            <GlobalProvider>
            <FicheProduit
              productData={selectedProduct}
              resetBarcode={handleModalClose}
            />
            </GlobalProvider>
          )}
        </IonContent>
        </IonPage>
      </IonModal>
    </>
  );
};

export default React.memo(LaterProducts);