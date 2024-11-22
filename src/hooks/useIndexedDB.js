const DB_NAME = 'MyTiCoAppDB'; 
const DB_VERSION = 1;
const PRODUCTS_NAME = 'products';
const LATER_PRODUCTS_NAME = 'laterProducts';

let db;

// Ouvre la base de données et crée les object stores si elles n'existent pas
export const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = (event) => {
      reject(event.target.error);
    };
    
    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };
    
    request.onupgradeneeded = (event) => {
      db = event.target.result;

      // Création de la table products
      if (!db.objectStoreNames.contains(PRODUCTS_NAME)) {
        db.createObjectStore(PRODUCTS_NAME,{ keyPath: 'gtin' });
      }
      // Création de la table pour les produits à voir ultérieurement
      if (!db.objectStoreNames.contains(LATER_PRODUCTS_NAME)) {
        db.createObjectStore(LATER_PRODUCTS_NAME,  { keyPath: 'gtin' });
      }
      
    };
  });
};


// Ajoute un produit dans la table products
export const addProduct = async (product) => {
  await openDatabase();
  const transaction = db.transaction(PRODUCTS_NAME, 'readwrite');
  const store = transaction.objectStore(PRODUCTS_NAME);

  // Compter le nombre de produits stockés
  const countRequest = store.count();

  countRequest.onsuccess = () => {
    const count = countRequest.result;

    // Si le nombre de produits dépasse 100, supprimer le plus ancien
    if (count >= 100) {
      const firstRequest = store.openCursor();
      firstRequest.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          store.delete(cursor.primaryKey); // Supprime le premier produit
        }
      };
    }

    // Ajouter le nouveau produit
    store.put(product);
  };

  countRequest.onerror = () => {
    console.error('Erreur lors de la vérification du nombre de produits');
  };
};

// Supprime un produit par son GTIN
export const deleteByGtin = async (gtin) => {
  console.log("gtin:",gtin)
  await openDatabase();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(PRODUCTS_NAME, 'readwrite'); // Table "products"
    const store = transaction.objectStore(PRODUCTS_NAME);
    const request = store.delete(gtin); // Supprime l'élément correspondant au GTIN

    request.onsuccess = () => {
      resolve(`Produit avec le GTIN ${gtin} supprimé avec succès.`);
    };

    request.onerror = (event) => {
      reject(`Erreur lors de la suppression du produit avec le GTIN ${gtin} : ${event.target.error}`);
    };
  });
};



// Récupère un produit par son Barrcode
export const getProductByBarrcode = async (gtin) => {
  await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(PRODUCTS_NAME, 'readonly');
    const store = transaction.objectStore(PRODUCTS_NAME);
    const request = store.get(gtin);
    
    request.onsuccess = () => {
      resolve(request.result ? request.result : null);
    };
    
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

// Récupère tous les produits
export const getAllProducts = async () => {
  await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(PRODUCTS_NAME, 'readonly');
    const store = transaction.objectStore(PRODUCTS_NAME);
    const request = store.getAll(); // Récupère tous les produits

    request.onsuccess = () => {
      const products = request.result; // Récupère tous les produits
      // Trie les produits par ordre inverse (dernier entré, premier sorti)
      const sortedProducts = products.reverse();
      resolve(sortedProducts); // Renvoie les produits triés
    };

    request.onerror = (event) => {
      reject(event.target.error); // Gestion des erreurs
    };
  });
};

export const getAllLaterProducts = async () => {
  await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(LATER_PRODUCTS_NAME, 'readonly');
    const store = transaction.objectStore(LATER_PRODUCTS_NAME);
    const products = [];

    const request = store.openCursor();
    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        products.push(cursor.value); // Ajouter le produit actuel à la liste
        cursor.continue(); // Passer au produit suivant
      } else {
        resolve(products); // Tous les produits ont été récupérés
      }
    };
    request.onerror = (event) => {
      reject(`Erreur lors de la récupération des produits de "laterProducts": ${event.target.error}`);
    };
  });
};

export const addLaterProduct = async (product) => {
  await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(LATER_PRODUCTS_NAME, 'readwrite');
    const store = transaction.objectStore(LATER_PRODUCTS_NAME);
    const request = store.put(product);

    request.onsuccess = () => {
      resolve(`Produit ajouté avec succès à la table "laterProducts" avec la clé ${request.result}`);
    };
    request.onerror = (event) => {
      reject(`Erreur lors de l'ajout du produit dans "laterProducts": ${event.target.error}`);
    };
  });
};

export const getLaterProduct = async (gtin) => {
  await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(LATER_PRODUCTS_NAME, 'readonly');
    const store = transaction.objectStore(LATER_PRODUCTS_NAME);
    const request = store.get(gtin); // Utilise l'id comme clé pour récupérer le produit

    request.onsuccess = (event) => {
      if (request.result) {
        resolve(request.result); // Produit trouvé
      } else {
        reject(`Aucun produit trouvé avec l'ID ${id}`);
      }
    };
    request.onerror = (event) => {
      reject(`Erreur lors de la récupération du produit : ${event.target.error}`);
    };
  });
};

export const deleteProductFromLater = async (gtin) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(LATER_PRODUCTS_NAME, 'readwrite');
    const store = transaction.objectStore(LATER_PRODUCTS_NAME);
    store.delete(gtin);

    // Gérer les résultats ou erreurs, si nécessaire
    transaction.oncomplete = () => {
      console.log(`Produit avec GTIN ${gtin} supprimé avec succès.`);
    };
    transaction.onerror = () => {
      console.error(`Erreur lors de la suppression du produit avec GTIN ${gtin}.`);
    };
  } catch (error) {
    console.error('Erreur lors de l\'accès à la base de données IndexedDB:', error);
  }
};