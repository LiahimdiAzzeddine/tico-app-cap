import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import TransparencyScale from '../fb/TransparencyScale';

const FbPage = () => {
  const { barcode } = useParams();
  const [currentPosition, setCurrentPosition] = useState(3); // État de la position

  return (
    <div>
      <TransparencyScale 
        currentPosition={currentPosition} 
        setCurrentPosition={setCurrentPosition} 
      />
      <br/>
      <br/>
      <br/>
      <br/>
      <h1>Fiche produit</h1>
      <p>Voici les détails du produit avec le code-barres : {barcode}</p>
    </div>
  );
};

export default FbPage;
