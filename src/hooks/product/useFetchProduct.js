import { useState, useCallback } from 'react';
import { addProduct } from '../useIndexedDB'; // Chemin vers votre fonction addProduct

const useFetchProduct = () => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async (barcode) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      const data = await response.json();

      if (data.status === 1) {
        const product = {
          image: data.product.image_url || 'default_image_url.jpg', // Image par défaut si non disponible
          title: data.product.product_name || 'Produit inconnu',
          brand: data.product.brands || 'Marque inconnue',
          gtin: barcode,
        };
        setProductData(product);
        
        // Ajout du produit à la base de données
        await addProduct(product);
        console.log("Produit ajouté avec succès");
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
  }, []);

  return { productData, loading, error, fetchProduct };
};

export default useFetchProduct;