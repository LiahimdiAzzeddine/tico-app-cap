import React from "react";
import { IonModal, IonContent } from "@ionic/react";
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
      <div className="bg-custom-red-bg-clear">
        <ModalHeader onClose={onClose} />
      </div>
      <IonContent className="ion-padding" style={{ "--background": "#fdf2f0" }}>
        <RecipeDetails recipe={recipe} custom={false} />
      </IonContent>
    </IonModal>
  );
};

export default RecipeModal;
