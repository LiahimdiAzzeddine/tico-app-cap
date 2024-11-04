import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for type checking
import Tico from "../../assets/auth/tico.png";
import ReturnImage from "../../assets/home/return.png";
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
    <div className="flex justify-between items-center py-4 px-3  modal-background ">
      <button
        className="text-custom-blue transform transition-transform duration-150 ease-in-out active:scale-90"
        onClick={onClose}
      >
        <img src={SRC} alt="Close" className="w-10 h-10" />
      </button>
      <div className="text-orange-500 font-bold text-2xl titre-bold transform transition-transform duration-150 ease-in-out active:scale-90">
        <img src={Tico} alt="Tico" className="h-7" />
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
