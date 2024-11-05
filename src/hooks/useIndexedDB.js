const DB_NAME = 'MyTiCoAppDB'; 
const DB_VERSION = 1;
const VISITS_NAME = 'visits';
const PRODUCTS_NAME = 'products';

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

      // Création de la table visits
      if (!db.objectStoreNames.contains(VISITS_NAME)) {
        db.createObjectStore(VISITS_NAME, { keyPath: 'id' });
      }

      // Création de la table products
      if (!db.objectStoreNames.contains(PRODUCTS_NAME)) {
        db.createObjectStore(PRODUCTS_NAME, { keyPath: 'Barrcode' });
      }
    };
  });
};

// Ajoute ou met à jour une entrée dans la table visits
export const setFirstVisit = async (isFirstVisit) => {
  await openDatabase();
  const transaction = db.transaction(VISITS_NAME, 'readwrite');
  const store = transaction.objectStore(VISITS_NAME);
  store.put({ id: 'firstVisit', value: isFirstVisit });
};

// Récupère l'état de la première visite
export const getFirstVisit = async () => {
  await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(VISITS_NAME, 'readonly');
    const store = transaction.objectStore(VISITS_NAME);
    const request = store.get('firstVisit');
    
    request.onsuccess = () => {
      resolve(request.result ? request.result.value : null);
    };
    
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

// Ajoute un produit dans la table products
export const addProduct = async (product) => {
  await openDatabase();
  const transaction = db.transaction(PRODUCTS_NAME, 'readwrite');
  const store = transaction.objectStore(PRODUCTS_NAME);
  store.put(product);
};

// Récupère un produit par son Barrcode
export const getProductByBarrcode = async (Barrcode) => {
  await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(PRODUCTS_NAME, 'readonly');
    const store = transaction.objectStore(PRODUCTS_NAME);
    const request = store.get(Barrcode);
    
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

