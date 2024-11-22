import React, { useEffect, useState } from "react";
import Background from "../../assets/history/background.svg";
import { getAllProducts } from "../../hooks/useIndexedDB";
import { IonContent, IonModal } from "@ionic/react";
import FicheProduit from "../fb/FicheProduit";
import Item from "./Item";
import { EmptyState } from "./ui/EmptyState";
import ModalHeader from "../modales/ModalHeader"
import { useToast } from "../../context/ToastContext";
import {deleteByGtin} from "../../hooks/useIndexedDB"

const History = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpenFb, setIsOpenFb] = useState(false);
  const [ean, setEan] = useState(null);
  const { triggerAlert,triggerToast } = useToast();

  const OpenFb = (product) => {
    if (product) {
      setIsOpenFb(true);
      setEan(product);
    }
  };
  const handleDelete = async (gtin) => {
    // Affichage de l'alerte de confirmation
    const result = await triggerAlert("Êtes-vous sûr de vouloir continuer?", "Confirmation", "Oui");

    // Si l'utilisateur confirme la suppression
    if (result) {
      // Appeler la fonction deleteByGtin pour supprimer l'élément
      await deleteByGtin(gtin);
      // Optionnel: Afficher un toast ou mettre à jour l'UI si nécessaire
      triggerToast("Produit supprimé avec succès", "success");
    } else {
      // Si l'utilisateur annule la suppression
      triggerToast("Suppression annulée", "error");
    }
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
      <div className="p-4 details">
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
            Mon&nbsp;
            <span className="marker-effect-orange z-10">
              historique
            </span>
            &nbsp;de scan
          </h2>
        </div>

        <div className="mt-8 flex-grow overflow-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>

          {loading ? (
            <LoadingState />
          ) : products.length > 0 ? (
            products.map((product, index) => (
              <Item
                product={product}
                index={index}
                length={products.length}
                key={index}
                OpenFb={OpenFb}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
      <IonModal isOpen={isOpenFb}>
      <ModalHeader image={"fb"} onClose={()=>{setIsOpenFb(false)}} />
        <IonContent className="ion-padding-bottom">
          <FicheProduit productData={ean} resetBarcode={setIsOpenFb} />
        </IonContent>
      </IonModal>
    </>
  );
};

export default History;
