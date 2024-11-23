import { useState } from "react";
import axios from "../../api/axios";

const useGetProductLater = () => {
  const [productLoading, setProductLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProduct = async (ean) => {
    setProductLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/fiche-produit/product/ean/${ean}`);
      const data = response.data;

      if (response.status === 200) {
        return data;
      } else {
        setError("Erreur inattendue lors de la récupération du produit.");
        return false;
      }
    } catch (err) {
      if (err.status === 404) {
        setError("Produit non trouvé.");
      } else {
        setError("Erreur lors de la récupération du produit.");
      }
      return false;
    } finally {
        setProductLoading(false);
    }
  };

  return {
    productLoading,
    error,
    fetchProduct,
    setError,
  };
};

export default useGetProductLater;
