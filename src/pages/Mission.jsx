import React, { useEffect, useState } from "react";
import { getAllProducts } from "./../hooks/useIndexedDB";
import { useIonRouter } from "@ionic/react";
import { useToast } from "./../context/ToastContext";
import { useAlert } from "./../context/AlertProvider";

import { deleteByGtin } from "./../hooks/useIndexedDB";
import VF from "./../assets/history/vf.svg";
import SimpleLyout from "../composants/layout/SimpleLyout";

const Mission = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpenFb, setIsOpenFb] = useState(false);
  const [ean, setEan] = useState(null);
  const { triggerToast } = useToast();
  const { triggerAlert } = useAlert();
  const history = useIonRouter();

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
      <SimpleLyout
        Close={() => {
          history.goBack();
        }}
        image={VF}
      >
        <div className="p-4 details flex flex-col h-full">
          {/* En-tête fixe */}
          <div className="flex flex-col items-center justify-center min-h-[10vh] backgroundHistorique mb-10">
            <h2 className="text-center text-custom-green-text text-[1.7rem] titre-bold">
              La&nbsp;mission&nbsp;de&nbsp;
              <span className="pallybold leading-archivo">
                Ti<span className="tracking-tightest leading-archivo">CO</span>
              </span>
            </h2>
          </div>
          <div className="mt-2 flex-grow  flex flex-col text-custom-green-text ArchivoLight space-y-5 justify-start text-lg px-3">
            <div>
              Chez TiCO, nous avons une mission:<br></br>
              faire de la transparence alimentaire une réalité. Pour que nous puissions choisir en toute
              confiance ce qu’on met dans nos assiettes.
            </div>
            <div>
              Vous avez un rôle clé&nbsp;! En scannant vos produits du quotidien,
              vous envoyez un message clair aux marques&nbsp;:<br></br> nous voulons des
              informations fiables et accessibles.
            </div>
            <div>
              Un geste simple, anonyme et sécurisé. Plus nous serons nombreux,
              plus les marques devront agir.
            </div>
            <div>Ensemble, faisons de la transparence la norme&nbsp;!</div>
          </div>
        </div>
      </SimpleLyout>
    </>
  );
};

export default React.memo(Mission);
