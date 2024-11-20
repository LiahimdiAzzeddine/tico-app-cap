import React, { useEffect, useState } from "react";
import Background from "../assets/history/laterBackground.svg";
import {
  getAllLaterProducts,
  deleteProductFromLater,
  addLaterProduct,
} from "../hooks/useIndexedDB";
import { IonContent, IonModal, IonPage } from "@ionic/react";
import LaterItem from "../composants/history/LaterItem";
import { EmptyLater } from "../composants/history/ui/EmptyLater";
import ModalHeader from "../composants/modales/ModalHeader";
import FicheProduit from "../composants/fb/FicheProduit";
import useGetProduct from "../hooks/product/useGetProduit";
import { useNetwork } from "../context/NetworkContext";
import { createProduct } from "../utils/product";

const LaterProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpenFb, setIsOpenFb] = useState(false);
  const [selectedEan, setSelectedEan] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isConnected } = useNetwork();

  const {
    productData,
    loading: productLoading,
    error,
    fetchProduct,
    setProductData,
  } = useGetProduct(selectedEan);

  // Fonction pour ouvrir le modal et charger les détails du produit
  const handleOpenFb = async (ean) => {
    if (!ean || !isConnected) return;

    setSelectedEan(ean);
    setLoading(true);

    try {
      await fetchProduct(ean);
    } catch (error) {
      console.error("Erreur lors du chargement du produit:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour le produit sélectionné quand les données sont chargées
  useEffect(() => {
    if (productData) {
      const newProduct = createProduct(selectedEan, productData);
      setSelectedProduct(newProduct);
      console.log("newProduct", newProduct);
      addLaterProduct(newProduct); // .update the product in IndexedDB
      setIsOpenFb(true);
    }
  }, [productData]);

  // Fonction pour supprimer un produit
  const handleDelete = async (ean) => {
    try {
      await deleteProductFromLater(ean);
      const updatedProducts = await getAllLaterProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
    }
  };

  // Charger la liste initiale des produits
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllLaterProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productData]);

  const handleModalClose = () => {
    setIsOpenFb(false);
    setSelectedEan(null);
    setSelectedProduct(null);
    setProductData(null);
  };

  const LoadingState = () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-8 w-8 bg-gray-200 rounded-full mb-2"></div>
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  return (
    <>
      <div className="p-2 details">
        <div
          className="flex flex-col items-center justify-center min-h-[10vh]"
          style={{
            backgroundImage: `url(${Background})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        >
          <h2 className="text-center text-custom-gray text-[1.7rem] titre-bold z-10">
              Produits à
            &nbsp;<span className="marker-effect-orange">Consulter</span>
          </h2>
        </div>

        <div className="mt-12 h-[65vh] overflow-y-auto">
          {loading ? (
            <LoadingState />
          ) : products.length > 0 ? (
            products.map((product, index) => (
              <LaterItem
                product={product}
                index={index}
                length={products.length}
                key={index}
                OpenFb={handleOpenFb}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <EmptyLater />
          )}
        </div>
      </div>

      <IonModal isOpen={isOpenFb}>
        <ModalHeader image={"fb"} onClose={handleModalClose} />
        <IonContent className="ion-padding-bottom">
          {selectedProduct && (
            <FicheProduit
              productData={selectedProduct}
              resetBarcode={() => handleModalClose()}
            />
          )}
        </IonContent>
      </IonModal>
    </>
  );
};

export default LaterProducts;
