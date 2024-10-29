import React from "react";
import indicateur from "../../assets/fb/indicateur.svg";
import scaleImage from "../../assets/fb/scale-image.png";
import { Link } from "react-router-dom";

const TransparencyScale = ({ currentPosition, setCurrentPosition }) => {
  const positions = [0, 25, 50, 75, 100]; // Les cinq positions possibles en pourcentage

  const handlePositionChange = (index) => {
    setCurrentPosition(index); // Change l'état selon la position cliquée
  };

  return (
    <div className="px-4">
    <div className="relative w-full h-[8vh] sm:h-[10vh] md:h-[15vh] lg:h-[20vh]  flex items-center justify-center">
      {/* Image de l'échelle de transparence */}
      <img src={scaleImage} alt="Transparency scale" className="w-full h-auto" />

      {/* Diviser l'échelle en cinq parties cliquables */}
      <div className="absolute top-0 w-full h-full flex justify-between">
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
                className="absolute bottom-1/3 top-1/3 left-1/2 transform -translate-x-1/2 cursor-pointer transition-left duration-100"
                style={{ width: '50%', maxWidth: '100px' }} // Ajuster la taille de l'indicateur
              />
            )}
          </div>
        ))}
      </div>
    </div>
    <div className="flex flex-col items-end mt-0 lg:mt-2">
        <Link to="#" className="text-[#6dc3bc] underline underline-offset-4 text-xs">En savoir plus sur notre échelle de transparence*</Link>
      </div>
    </div>
  );
};

export default TransparencyScale;
