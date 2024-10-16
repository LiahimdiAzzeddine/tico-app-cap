const DB_NAME = 'MyTiCoAppDB';
const DB_VERSION = 1;
const STORE_NAME = 'visits';

let db;

// Ouvre la base de données et crée un object store si elle n'existe pas
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
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    };
  });
};

// Ajoute ou met à jour une entrée
export const setFirstVisit = async (isFirstVisit) => {
  await openDatabase();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  store.put({ id: 'firstVisit', value: isFirstVisit });
};

// Récupère l'état de la première visite
export const getFirstVisit = async () => {
  await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get('firstVisit');
    
    request.onsuccess = () => {
      resolve(request.result ? request.result.value : null);
    };
    
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};
