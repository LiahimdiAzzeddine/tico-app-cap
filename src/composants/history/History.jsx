import React, { useEffect, useState } from "react";
import Background from "../../assets/history/background.svg";
import { getAllProducts } from "../../hooks/useIndexedDB";
import { IonContent, IonModal, IonPage } from "@ionic/react";
import FicheProduit from "../FP/FicheProduit";
import Item from "./Item";
import { EmptyState } from "./ui/EmptyState";
import ModalHeader from "../modales/ModalHeader";
import { useToast } from "../../context/ToastContext";
import { useAlert } from "../../context/AlertProvider";

import { deleteByGtin } from "../../hooks/useIndexedDB";

const History = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpenFb, setIsOpenFb] = useState(false);
  const [ean, setEan] = useState(null);
  const { triggerToast } = useToast();
  const { triggerAlert } = useAlert();

  const OpenFb = (product) => {
    if (product) {
      setIsOpenFb(true);
      setEan(product);
    }
  };
  const handleDelete = async (gtin) => {
    
    triggerAlert(
      "Êtes-vous sûr de vouloir continuer ?", // Message
      "Confirmation", // Titre
      async () => {
        // Action à exécuter si l'utilisateur confirme
        await deleteByGtin(gtin);
        triggerToast("Produit supprimé avec succès", "success");
      }
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [handleDelete]);

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
      <div className="p-4 details flex flex-col h-full">
        {/* En-tête fixe */}
        <div
          className="flex flex-col items-center justify-center min-h-[10vh]"
          style={{
            backgroundImage: `url(${Background})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        >
          <h2 className="text-center text-custom-green-text text-[1.7rem] titre-bold">
            Mon&nbsp;historique&nbsp;de scan
          </h2>
        </div>

        {/* Message explicatif fixe */}
        <div className="mt-4 text-center text-gray-700 text-sm italic">
        Glissez un produit pour afficher les options de suppression et de visualisation.
        </div>

        {/* Contenu scrollable */}
        <div className="mt-2 flex-grow overflow-y-auto">
          {loading ? (
            <LoadingState />
          ) : products.length > 0 ? (
            products.map((product,index) =>
                <Item
                  product={product}
                  index={index}
                  key={index}
                  OpenFb={OpenFb}
                  handleDelete={handleDelete}
                />
              
            )
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      <IonModal isOpen={isOpenFb}>
        <IonPage style={{paddingTop:"env(safe-area-inset-top)",backgroundColor:"#ffffff" }}>
        <ModalHeader
          image={"fb"}
          onClose={() => {
            setIsOpenFb(false);
          }}
        />
        <IonContent className="ion-padding-bottom">
          <FicheProduit productData={ean} resetBarcode={setIsOpenFb} />
        </IonContent>
        </IonPage>
      </IonModal>
    </>
  );
};

export default History;
