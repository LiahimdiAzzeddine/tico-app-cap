import React from "react";
import PropTypes from "prop-types";
import Tico from "../../assets/auth/tico.png";
import { IonButton } from "@ionic/react";

function Header({ image, onClose }) {
  return (
    <div
      className="flex justify-between items-center pt-2 pb-2  modal-background"
      style={{ zIndex: -10 }}
    >
      <IonButton fill="clear" className="p-0 m-0" onClick={onClose}>
        <img src={image} alt="Close" className="w-auto h-10" />
      </IonButton>
      <div className="flex flex-row items-end">
        <div className="text-orange-500 font-bold text-2xl titre-bold transform transition-transform duration-150 ease-in-out active:scale-90">
          <IonButton fill="clear" className="p-0 m-0 ionTicobutton">
            <img src={Tico} alt="Tico" className="h-6" />
          </IonButton>
        </div>
      </div>
    </div>
  );
}

// Définition des PropTypes pour vérifier les types des props
Header.propTypes = {
  image: PropTypes.any, // Optionnel : string pour identifier l'image
  onClose: PropTypes.func.isRequired, // Obligatoire : fonction pour gérer la fermeture
};

export default Header;
