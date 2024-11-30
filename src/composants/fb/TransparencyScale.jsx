import React from "react";
import indicateur from "../../assets/fb/indicateur.svg";
import indicateur100 from "../../assets/fb/indicateur100.svg";
import scaleImage from "../../assets/fb/scale-image.svg";
import { Link } from "react-router-dom";

const TransparencyScale = ({ currentPosition, setCurrentPosition }) => {
  const positions = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const handlePositionChange = (index) => {
    setCurrentPosition(index);
  };

  const getIndicatorStyle = (index) => {
    const baseSize = 50;
    const growthFactor = 5;
    const size = baseSize + (index * growthFactor);
    
    // Calculate vertical translation based on position
    const baseTranslate = 10; // Base translation percentage
    const translateYOffset = index * 6; // Increase offset by 5% for each position
    
    return {
      width: `${size}%`,
      maxWidth: `${30 + (index * 5)}px`,
      transform: `translate(-50%, -${baseTranslate + translateYOffset}%)`,
    };
  };

  const getIndicatorImage = (index) => {
    return index === 9 ? indicateur100 : indicateur;
  };

  return (
    <div className="px-4 pt-3">
      <div className="w-full flex items-center justify-center relative">
        <img src={scaleImage} alt="Transparency scale" className="w-full h-auto" />

        <div className="absolute inset-0 flex justify-between">
          {positions.slice(0, -1).map((_, index) => (
            <div
              key={index}
              className="flex-1 cursor-pointer relative"
              onClick={() => handlePositionChange(index)}
            >
              {currentPosition === index && (
                <img
                  src={getIndicatorImage(index)}
                  alt="Indicator"
                  className="absolute top-2/3 left-2/4 cursor-pointer transition-all duration-300 ease-in-out"
                  style={getIndicatorStyle(index)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-end mt-2">
        <Link 
          to="#" 
          className="text-[#6dc3bc] underline underline-offset-4 text-xs"
        >
          En savoir plus sur notre échelle de transparence
        </Link>
      </div>
    </div>
  );
};

export default TransparencyScale;