import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IonContent, IonIcon, IonButton } from "@ionic/react";
import { alertCircle, searchCircle } from "ionicons/icons";
import FicheProduit from "../composants/FP/FicheProduit";
import useGetProduct from "../hooks/product/useGetProduit";
import { addProduct, addLaterProduct } from "../hooks/useIndexedDB";
import { useNetwork } from "../context/NetworkContext";
import { useToast } from "../context/ToastContext";
import { ErrorMessage } from "../composants/scanner/UI/ErrorMessage";
import LoadingFbState from "../composants/scanner/UI/LoadingFbState";
import { createProduct } from "../utils/product";
import { GlobalProvider } from "../composants/FP/GlobalProvider";

const Fp = () => {
  const { gtin } = useParams(); 
  const [product, setProduct] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { productData, loading, error, fetchProduct, setProductData, setError } =
    useGetProduct(gtin);
  const { isConnected } = useNetwork();
  const { triggerToast } = useToast();

  // Fetch product data on mount
  useEffect(() => {
    if (gtin && isConnected) {
      fetchProduct();
    } else {
      setProductData(null);
    }
  }, [gtin, isConnected]);

  useEffect(() => {
    if (productData && !loading && !error) {
      const product = createProduct(gtin, productData);
      setProduct(product);
      addToHistory(gtin, product);
    } else {
      const product = createProduct(gtin, {});
      setProduct(product);
    }
  }, [productData]);

  const addToHistory = async (gtin, product) => {
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

  const addToLaterProducts = async (gtin, product) => {
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


  function handleScrollEnd() {
    setScrolled(true);
  }
  return (
    <IonContent className="ion-padding-bottom"
    scrollEvents={true}
    onIonScrollEnd={handleScrollEnd}
    >
      {loading ? (
        <LoadingFbState />
      ) : error ? (
        error === "Produit non trouvé." ? (
          <ErrorMessage
            message={`Désolé, nous n'avons pas trouvé ce produit : ${gtin}`}
            icon={searchCircle}
          />
        ) : (
          <ErrorMessage
            message={`Une erreur est survenue lors de la recherche : ${error}`}
            icon={alertCircle}
          />
        )
      ) : productData ? (
        <GlobalProvider>
        <FicheProduit productData={product} scrolled={scrolled}/>
        </GlobalProvider>
      ) : (
        <>
          {isConnected ? (
            <ErrorMessage
              message="Désolé, nous n'avons pas reçu de réponse du serveur."
              icon={searchCircle}
            />
          ) : (
            <div className="flex flex-col items-center justify-center px-6 text-center">
              <IonIcon
                icon={alertCircle}
                className="w-16 h-16 text-yellow-500"
              />
              <h2 className="text-xl font-semibold mb-1">Hors ligne</h2>
              <p className="text-gray-600 mb-2">
                Vous êtes hors ligne. Souhaitez-vous garder ce produit pour
                plus tard ?
              </p>
              <IonButton
                onClick={() => addToLaterProducts(gtin, product)}
                style={{ "--background": "#0f548d" }}
              >
                Sauvegarder
              </IonButton>
            </div>
          )}
        </>
      )}
    </IonContent>
  );
};

export default Fp;
