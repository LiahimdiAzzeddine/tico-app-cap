export function createProduct(scannedResult, productData) {
  // Extracting and transforming the additifs data
  const additifs = productData.foodheaproduct?._additifs?.map(additif => ({
    code: additif._code,
    label: additif._label,
    label2: additif._label2,
    fonction1: additif._fonction1,
    fonction2: additif._fonction2,
    noteUFC: additif._noteufc,
    url: additif._url,
  })) ?? [];

  return {
    image: productData.OFFproduct?._photoUrl ?? "default_image_url.jpg",
    name: productData.foodheaproduct?._name ?? "Produit inconnu",
    generic_name: productData.foodheaproduct?._generic_name ?? "Produit inconnu",
    trademark: productData.OFFproduct?._trademark ?? "Marque inconnue",
    nutriscore: productData.foodheaproduct?._nutriscore ?? "inconnue",
    nova: productData.foodheaproduct?._nova ?? "inconnue",
    gtin: scannedResult,
    additifs, // Include the transformed additifs data
  };
}

  