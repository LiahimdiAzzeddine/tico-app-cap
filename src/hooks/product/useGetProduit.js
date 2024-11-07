import { useState, useCallback } from "react";
import axios from "../../api/axios";

const useGetProduct = (ean) => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/fiche-produit/product/ean/${ean}`);
      console.log("Réponse des données produit :", response);
      const data = response.data;
      if (response.data.success) {
        const product = {
          image: data.product.image_url || "default_image_url.jpg", // Image par défaut si non disponible
          title: data.product.product_name || "Produit inconnu",
          brand: data.product.brands || "Marque inconnue",
          barcode: ean,
        };
        setProductData(product);

        console.log("Produit ajouté avec succès");
        setLoading(false);
      } else {
        setError("Produit non trouvé.");
        setProductData(null);
      }
    } catch (err) {
      setError("Erreur lors de la récupération du produit.");
      setProductData(null);
    } finally {
      setLoading(false);
    }
  }, [ean]);

  return { productData, loading, error, fetchProduct };
};

export default useGetProduct;
