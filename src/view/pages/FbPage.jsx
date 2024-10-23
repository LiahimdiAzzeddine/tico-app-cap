import React from 'react';
import { useParams } from 'react-router-dom';

const FbPage = () => {
  // Récupérer le code-barres à partir des paramètres d'URL
  const { barcode } = useParams();

  return (
    <div>
      <h1>Fiche produit</h1>
      <p>Voici les détails du produit avec le code-barres : {barcode}</p>
    </div>
  );
};

export default FbPage;
