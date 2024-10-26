import { useEffect, useState } from "react";
import Header from "../scanner/UI/Header";
import Fleche from "../../assets/fb/flech.svg";
import Tico from "../../assets/auth/tico.png";
import { Outlet, useNavigate } from "react-router-dom";
import TransparencyScale from "./TransparencyScale";
import NameProduct from "./NameProduct";
import ProductDetails from "./ProductDetails";

const FicheProduit = (props) => {
  const navigate = useNavigate();
  const [currentPosition, setCurrentPosition] = useState(3); 
  const resetAll = () => {
    props.resetBarcode();
  };

  return (
    <div className="flex flex-col h-full bg-[#ffffff]">
      <div className="flex justify-between items-center modal-background pb-1">
        <button
          className="text-[#006aff]"
          onClick={() => navigate("scanner", { replace: true })}
        >
          <img src={Fleche} alt="Close" className="w-10 h-10" />
        </button>
        <div className="text-orange-500 font-bold text-2xl titre-bold">
          <img src={Tico} alt="Tico" className="h-7" />
        </div>
      </div>

      {/* Scrollable Outlet Content */}
      <div className="flex-grow overflow-y-auto py-2">
        <TransparencyScale
          currentPosition={currentPosition}
          setCurrentPosition={setCurrentPosition}
        />
        <NameProduct Name="Huile de pépins de raisin 75 cl" Brand="Pure nature" ></NameProduct>
        <ProductDetails/>
        <Header>
          <h3 className="text-xl font-bold">Code-barres détecté</h3>
          <p>{props.barcode}</p>
        </Header>
      </div>
    </div>
  );
};

export default FicheProduit;
