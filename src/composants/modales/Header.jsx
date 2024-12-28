import React from "react";
import PropTypes from "prop-types";
import Tico from "../../assets/auth/tico.png";


function Header({ image, onClose }) {


  return (
    <div
      className="flex justify-between items-center pt-4 pb-2 px-5 modal-background"
      style={{ zIndex: 10 }}
    >
      <button
        className="text-custom-blue transform transition-transform duration-150 ease-in-out active:scale-90"
        onClick={onClose}
      >
        <img src={image} alt="Close" className="w-auto h-10" />
      </button>
      <div className="flex flex-row items-end">
        <div className="text-orange-500 font-bold text-2xl titre-bold transform transition-transform duration-150 ease-in-out active:scale-90">
          <img src={Tico} alt="Tico" className="h-6" />
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
