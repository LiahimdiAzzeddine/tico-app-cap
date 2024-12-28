import React from "react";
import { IonModal, IonContent, IonHeader, IonToolbar } from "@ionic/react";
import ModalHeader from "./ModalHeader";
import "swiper/css";
import "swiper/css/navigation";

import RecipeDetails from "../recettes/RecipeDetails";

const RecipeModal = ({ isOpen, onClose, recipe }) => {
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      style={{
        "--background": "#fdf2f0",
        "--ion-padding": "0",
      }}
    >
      <IonHeader
        className="ion-no-border z-0"
        style={{ "--ion-background-color": "#fad4ce" }}
      >
        <IonToolbar style={{ "--ion-toolbar-background": "#fad4ce" }}>
          <ModalHeader onClose={onClose} image="rf" />
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" style={{ "--background": "#fdf2f0" }}>
        <RecipeDetails recipe={recipe} custom={false} />
      </IonContent>
    </IonModal>
  );
};

export default RecipeModal;
