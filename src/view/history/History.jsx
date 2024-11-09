import React, { useEffect, useState } from "react";
import Background from "../../assets/history/background.svg";
import { getAllProducts } from "../../hooks/useIndexedDB";

import Item from "./Item";
import { EmptyState } from "./ui/EmptyState";

const History = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <h2 className="text-center text-custom-green-text text-2xl titre-bold">
          Mon&nbsp;
          <span className="underline underline-offset-4 decoration-orange-400">
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
              key={product.id || index}
            />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default History;