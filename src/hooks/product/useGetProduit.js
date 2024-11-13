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

      if (response.status === 200) {
        setProductData(data);
        console.log("Produit ajouté avec succès :", data);
      } else {
        setError("Erreur inattendue lors de la récupération du produit.");
        setProductData(null);
      }
    } catch (err) {
      if (err.status === 404) {
        setError("Produit non trouvé.");
        setProductData(null);
      }else{
        setError("Erreur lors de la récupération du produit.");
      setProductData(null);
      }
      
    } finally {
      setLoading(false);
    }
  }, [ean]);

  return { productData, loading, error, fetchProduct,setProductData,setError };
};

export default useGetProduct;
