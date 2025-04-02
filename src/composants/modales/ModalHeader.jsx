import React from "react";
import PropTypes from "prop-types";
import Tico from "../../assets/auth/tico.png";
import ReturnImage from "../../assets/fb/flech.svg";
import VX from "../../assets/home/X.svg";
import BX from "../../assets/home/bx.svg";
import flecheRecette from "../../assets/recettes/fleche.svg";
import OF from "../../assets/tips/OFleche.svg";
import VF from "../../assets/history/vf.svg";
import { IonButton } from "@ionic/react";

function ModalHeader({ image, onClose }) {
  // Mapping des images par type
  const imageMap = {
    x: BX,
    rf: flecheRecette,
    bf: ReturnImage,
    bx: BX,
    of: OF,
    vf: VF,
    vx: VX,
  };

  // Sélection de l'image ou valeur par défaut
  const SRC = imageMap[image] || ReturnImage;

  return (
    <div
      className="flex justify-between items-center pt-2 pb-1 px-0 modal-background"
      style={{ zIndex: 10 }}
    >
      <IonButton fill="clear" className="p-0 m-0" onClick={onClose}>
        <img src={SRC} alt="Close" className="w-auto h-10" />
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
ModalHeader.propTypes = {
  image: PropTypes.string, // Optionnel : string pour identifier l'image
  onClose: PropTypes.func.isRequired, // Obligatoire : fonction pour gérer la fermeture
};

export default ModalHeader;
