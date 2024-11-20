import React from "react";
import indicateur from "../../assets/fb/indicateur.svg";
import scaleImage from "../../assets/fb/scale-image.svg";
import { Link } from "react-router-dom";

const TransparencyScale = ({ currentPosition, setCurrentPosition }) => {
  const positions = [0, 25, 50, 75, 100]; // Les cinq positions possibles en pourcentage

  const handlePositionChange = (index) => {
    setCurrentPosition(index); // Change l'état selon la position cliquée
  };

  return (
    <div className="px-4">
      <div className="w-full flex items-center justify-center relative">
        {/* Image de l'échelle de transparence */}
        <img src={scaleImage} alt="Transparency scale" className="w-full h-auto" />

        {/* Diviser l'échelle en cinq parties cliquables */}
        <div className="absolute inset-0 flex justify-between">
          {positions.map((_, index) => (
            <div
              key={index}
              className="flex-1 cursor-pointer relative"
              onClick={() => handlePositionChange(index)} // Gère le clic pour changer de position
            >
              {/* Indicateur positionné dans chaque zone */}
              {currentPosition === index && (
                <img
                  src={indicateur}
                  alt="Indicator"
                  className="absolute top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-100"
                  style={{ width: '45%', maxWidth: '100px' }} // Ajuster la taille de l'indicateur
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-end mt-2">
        <Link to="#" className="text-[#6dc3bc] underline underline-offset-4 text-xs">En savoir plus sur notre échelle de transparence*</Link>
      </div>
    </div>
  );
};

export default TransparencyScale;
