import { useEffect, useState } from "react";
import Header from "../scanner/UI/Header";
import Fleche from "../../assets/fb/flech.svg";
import Tico from "../../assets/auth/tico.png";
import { useHistory  } from "react-router-dom";
import TransparencyScale from "../fb/TransparencyScale";
import NameProduct from "../fb/NameProduct";
import ProductDetails from "../fb/ProductDetails";
import Sections from "../fb/Sections";
import TiConseil from "../fb/TiConseil";

const FbPage = () => {
  const history = useHistory();
  const [currentPosition, setCurrentPosition] = useState(3);

  return (
    <div className="px-0">
      <div className="flex flex-col h-full bg-[#ffffff] ">
        <div className="flex justify-between items-center modal-background pb-1 px-4">
          <button
            className="text-custom-blue"
            onClick={() =>  history.replace("scanner")}
          >
            <img src={Fleche} alt="Close" className="w-10 h-10" />
          </button>
          <div className="text-orange-500 font-bold text-2xl titre-bold">
            <img src={Tico} alt="Tico" className="h-7" />
          </div>
        </div>


        {/* Scrollable Outlet Content */}
        <div className="flex-grow overflow-y-auto">
          <div className="flex flex-col space-y-8">
            <TransparencyScale
              currentPosition={currentPosition}
              setCurrentPosition={setCurrentPosition}
            />
            <NameProduct
              Name="Huile de pépins de raisin 75 cl"
              Brand="Pure nature"
            />
      
            <ProductDetails />
            <Sections />
            <TiConseil />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default FbPage;
