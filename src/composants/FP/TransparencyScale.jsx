import React,{useState} from "react";
import indicateur from "../../assets/fb/indicateur.svg";
import indicateur100 from "../../assets/fb/indicateur100.svg";
import scaleImage from "../../assets/fb/scale-image.svg";
import { Link } from "react-router-dom";
import WhiteModal from "../modales/WhiteModal";
import TransparencyInfo from "../transparency/TransparencyInfo";

const TransparencyScale = ({ currentPosition, setCurrentPosition }) => {
  const positions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const [showModalTransparency, setShowModalTransparency] = useState(false);

  const handlePositionChange = (index) => {
    setCurrentPosition(index);
  };

  const getIndicatorStyle = (index) => {
    const baseSize = index!=11?45:4;
    const growthFactor = 5;
    const size = baseSize + (index * growthFactor);
    
    // Calculate vertical translation based on position
    const baseTranslate = 10; // Base translation percentage
    const translateYOffset = index * 6; // Increase offset by 5% for each position
    
    return {
      width: `${index!=11?size:baseSize}%`,
      maxWidth: `${30 + (index * 5)}px`,
      transform:index!=11?`translate(-50%, -${baseTranslate + translateYOffset}%)`:'translate(-65%, 10%)',
    };
  };

  const getIndicatorImage = (index) => {
    return index === 9 ? indicateur100 : indicateur;
  };

  return (
    <>
    
    <div className="px-4 pb-4">
      <div className="w-full flex items-center justify-center relative">
        <img src={scaleImage} alt="Transparency scale" className="w-full h-auto" />

        <div className="absolute inset-0 flex justify-between">
          {positions.map((_, index) => (
            <div
              key={index}
              className="flex-1 cursor-pointer relative"
            >
              {currentPosition === (index+1) && (
                <img
                  src={getIndicatorImage(index)}
                  alt="Indicator"
                  className="absolute top-2/3 left-2/4 cursor-pointer transition-all duration-300 ease-in-out"
                  style={getIndicatorStyle(index)}
                />
              )}
            </div>
          ))}
          
            {/* Gestion spécifique pour la position 0 */}
            {currentPosition === 0 && (
              <img
                src={indicateur}
                alt="Indicator"
                className="absolute top-2/3 left-0 cursor-pointer transition-all duration-300 ease-in-out "
                style={getIndicatorStyle(11)}
              />
            )}
        </div>
      </div>
      <div className="flex flex-col items-end mt-1">
        <Link 
        onClick={() => {
          setShowModalTransparency(true);
        }}
          className="text-[#6dc3bc] underline underline-offset-1 text-[0.6rem] ArchivoItalic"
        >
          En savoir plus sur notre échelle de transparence
        </Link>
      </div>
    </div>
    <WhiteModal isOpen={showModalTransparency} ContentPadding={"ion-padding-top"} scroll={true} onClose={() => setShowModalTransparency(false)}>
        <TransparencyInfo />
      </WhiteModal>
    </>
  );
};

export default TransparencyScale;