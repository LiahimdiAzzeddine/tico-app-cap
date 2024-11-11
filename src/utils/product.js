export function createProduct(scannedResult, productData) {
    return {
      image: productData.OFFproduct?._photoUrl ?? "default_image_url.jpg",
      name: productData.foodheaproduct?._name ?? "Produit inconnu",
      generic_name: productData.foodheaproduct?._generic_name ?? "Produit inconnu",
      trademark: productData.OFFproduct?._trademark ?? "Marque inconnue",
      gtin: scannedResult,
    };
  }
  