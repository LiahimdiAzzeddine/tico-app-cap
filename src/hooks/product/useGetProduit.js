import { useState, useCallback } from "react";
import axios from "../../api/axios";

const useGetProduct = (ean) => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/fiche-produit/product/ean/${ean}`);
      const data = response.data;
      console.log("Produit ajouté avec succès :", data);
      if (response.status === 200 && (data.OFFproduct!=null || data.foodheaproduct!=null)) {
        setProductData(data);
        
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
