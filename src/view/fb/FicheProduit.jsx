import { useState } from "react";
import Fleche from "../../assets/fb/flech.svg";
import Tico from "../../assets/auth/tico.png";
import TransparencyScale from "./TransparencyScale";
import NameProduct from "./NameProduct";
import ProductDetails from "./ProductDetails";
import Sections from "./Sections";
import TiConseil from "./TiConseil";
import ProductDetailsAccordion from "./ProductDetailsAccordion";
import Recettes from "./Recettes";

const FicheProduit = (props) => {
  const [currentPosition, setCurrentPosition] = useState(3);

  const resetAll = () => {
    props.resetBarcode(false);
  };

  return (
    <div className="max-w-screen-sm m-auto">
      <div className="flex flex-col h-full bg-white">
        <div className="flex justify-between items-center modal-background pb-1 px-4">
          <button className="text-blue-600" onClick={resetAll}>
            <img
              src={Fleche}
              alt="Close"
              className="w-10 h-10 transform transition-transform duration-150 ease-in-out active:scale-95"
            />
          </button>
          <div className="text-orange-500 font-bold text-2xl titre-bold">
            <img
              src={Tico}
              alt="Tico"
              className="h-7 transform transition-transform duration-150 ease-in-out active:scale-95"
            />
          </div>
        </div>

        {/* Scrollable Outlet Content */}
        <div className="flex-grow overflow-y-auto">
          <div className="flex flex-col space-y-10">
            <TransparencyScale
              currentPosition={currentPosition}
              setCurrentPosition={setCurrentPosition}
            />
            <NameProduct
              name="Huile de pépins de raisin 75 cl"
              brand="Pure nature"
            />
            <ProductDetails />
            <Sections />
            <TiConseil />
            <ProductDetailsAccordion />
            <Recettes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FicheProduit;
