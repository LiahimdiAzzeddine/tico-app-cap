// RecipeModal.js
import React from 'react';
import { IonModal, IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';

const RecipeModal = ({ isOpen, onClose, recipe }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{recipe.titre}</IonTitle>
          <IonButton slot="end" onClick={onClose}>
            Fermer
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h3>Difficulté: {recipe.difficulty}</h3>
        <h4>Types:</h4>
        <ul>
          {recipe.types.map((type, index) => (
            <li key={index}>{type}</li>
          ))}
        </ul>
        <h4>Filtres:</h4>
        <ul>
          {recipe.filters.map((filter, index) => (
            <li key={index}>{filter}</li>
          ))}
        </ul>
        <h4>Temps de préparation: {recipe.prep_time} min</h4>
        <h4>Temps de cuisson: {recipe.cook_time} min</h4>
        <h4>Temps de repos: {recipe.rest_time} min</h4>
        <h4>Ingrédients:</h4>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.quantity} {ingredient.unit} - {ingredient.name}
            </li>
          ))}
        </ul>
        <h4>Étapes:</h4>
        <ol>
          {recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </IonContent>
    </IonModal>
  );
};

export default RecipeModal;
