import { useState } from "react";
import TransparencyScale from "./TransparencyScale";
import NameProduct from "./NameProduct";
import ProductDetails from "./ProductDetails";
import Sections from "./Sections";
import TiConseil from "./TiConseil";
import ProductDetailsAccordion from "./ProductDetailsAccordion";
import Recettes from "./Recettes";
import InfoSection from "./InfoSection";

const FicheProduit = (props) => {
  const [currentPosition, setCurrentPosition] = useState(3);
console.log("props.productData",props.productData)
  const resetAll = () => {
    props.resetBarcode(false);
  };

  return (
    <div className="max-w-screen-sm m-auto">
      <div className="flex flex-col h-full bg-white">

        {/* Scrollable Outlet Content */}
        <div className="flex-grow overflow-y-auto">
          <div className="flex flex-col space-y-6">
            <TransparencyScale
              currentPosition={currentPosition}
              setCurrentPosition={setCurrentPosition}
            />
            <NameProduct
              Name={props.productData?.name}
              Brand={props.productData?.trademark}
              Transparent={props.productData?.transparent}
              ImageSrc={props.productData?.image}
            />
            <InfoSection
            product={props.productData}
            />
            <ProductDetailsAccordion />
            <Recettes recettes={props.productData.recipes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FicheProduit;
