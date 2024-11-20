import React, { useEffect, useState } from "react";
import Background from "../../assets/history/background.svg";
import { getAllProducts } from "../../hooks/useIndexedDB";
import { IonContent, IonModal } from "@ionic/react";
import FicheProduit from "../fb/FicheProduit";
import Item from "./Item";
import { EmptyState } from "./ui/EmptyState";
import ModalHeader from "../modales/ModalHeader"

const History = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpenFb, setIsOpenFb] = useState(false);
  const [ean, setEan] = useState(null);
  const OpenFb = (ean) => {
    if (ean) {
      setIsOpenFb(true);
      setEan(ean);
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
  }, []);

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
          <h2 className="text-center text-custom-green-text text-[1.7rem] titre-bold">
            Mon&nbsp;
            <span className="marker-effect-orange z-10">
              historique
            </span>
            &nbsp;de scan
          </h2>
        </div>

        <div className="mt-12 h-[65vh] overflow-y-auto">
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
