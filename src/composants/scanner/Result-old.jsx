import { useEffect, useState } from 'react';
import Card from './UI/Card';
import Header from './UI/Header';
import Button from './UI/Button';
import { useIonRouter } from "@ionic/react";

const Result = (props) => {
  const history = useIonRouter();
  const goToPage = (path) => {
    history.push(path, "root", "replace");
  };
  const resetAll = () => {
    props.resetBarcode();
  };

  // Fonction pour rediriger vers la page de fiche produit
  const FicheProduit = (barcode) => {
    // Rediriger vers la page 'fiche-produit' en passant le code-barres comme paramètre
    goToPage(`/fiche-produit/${barcode}`);
  };

  let output = null;

  // Vérifier s'il y a un code-barres à afficher
  if (props.barcode) {
    output = (
      <>
        <button
          className="result__close"
          onClick={resetAll}
          title="Fermer le produit"
        >
          <span className="result__close__cross--right"></span>
          <span className="result__close__cross--left"></span>
        </button>
        <Card className="result__card">
          <Header>
            <h3 className="text-xl font-bold">Code-barres détecté</h3>
            <p>{props.barcode}</p>
          </Header>
          <div className="result__info flex flex-row space-x-3">
            <Button
              className="result__info__btn font-bold"
              onClick={() => FicheProduit(props.barcode)} // Appeler la fonction pour aller à la page de fiche produit
            >
              <p>Détails</p>
            </Button>
            <Button className="result__info__btn Reinitialiser font-bold" onClick={resetAll}>
              <p>Réinitialiser</p>
            </Button>
          </div>
        </Card>
      </>
    );
  }

  return <div className="result">{output}</div>;
};

export default Result;
