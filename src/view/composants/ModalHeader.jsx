import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for type checking
import Tico from "../../assets/auth/tico.png";
import ReturnImage from "../../assets/fb/flech.svg";
import VX from "../../assets/home/X.svg";
import BX from "../../assets/home/bx.svg"
import flecheRecette from "../../assets/recettes/fleche.svg";

function ModalHeader({ image, onClose }) {
  let SRC = ReturnImage; // Valeur par défaut pour SRC

  if (image === "x") {
    SRC = BX;
  } else if (image === "rf") {
    SRC = flecheRecette;
  } else if (image === "bf") {
    SRC = ReturnImage;
  }else if (image === "bx") {
    SRC = BX;
  }
   else if (image === "vx") {
    SRC = VX;
  }

  return (
    <div className="flex justify-between items-center pt-3 pb-2 px-2  modal-background ">
      <button
        className="text-custom-blue transform transition-transform duration-150 ease-in-out active:scale-90"
        onClick={onClose}
      >
        <img src={SRC} alt="Close" className="w-auto h-11" />
      </button>
      <div className="text-orange-500 font-bold text-2xl titre-bold transform transition-transform duration-150 ease-in-out active:scale-90">
        <img src={Tico} alt="Tico" className="h-8" />
      </div>
    </div>
  );
}

// Define PropTypes for the component
ModalHeader.propTypes = {
  image: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default ModalHeader;
