import React, { useEffect, useState } from "react";
import Background from "../../assets/history/background.svg";
import { getAllProducts } from "../../hooks/useIndexedDB";
import Item from "./Item";
const History = () => {
  const [products, setProducts] = useState([]); // État pour stocker les produits récupérés
  const [loading, setLoading] = useState(true); // État pour gérer le chargement
  // Hook useEffect pour récupérer les produits lors du chargement du composant
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts(); // Appel à la fonction pour récupérer les produits
        setProducts(allProducts); // Met à jour l'état avec les produits récupérés
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      } finally {
        setLoading(false); // Indique que le chargement est terminé
      }
    };

    fetchProducts(); // Exécution de la fonction de récupération
  }, []); // Le tableau vide signifie que l'effet s'exécute une seule fois au montage

  return (
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
        <h2 className="text-center text-custom-green-text text-2xl titre-bold ">
          Mon&nbsp;
          <span className="underline underline-offset-4 decoration-orange-400">
            {" "}
            historique
          </span>
          &nbsp;de scan
        </h2>
      </div>

      <div className="mt-12 h-[65vh] overflow-y-auto">
        {loading ? (
          <p>Chargement des produits...</p>
        ) : products.length > 0 ? (
          products.map((product, index) => (
            <Item
              product={product}
              index={index}
              length={products.length}
              key={index}
            />
          ))
        ) : (
          <p>Aucun produit trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default History;
