import React, { useState } from "react";
import { useAlert } from "../../context/AlertProvider";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { Solliciter } from "./Modal";
import { useIonRouter } from "@ionic/react";
import illustrationOrigines from "../../assets/fb/BubbleImg.svg";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import flecheLeft from "../../assets/fb/FICHEFleche.svg";

const Encourager = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { triggerAlert } = useAlert();
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const history = useIonRouter();
  const goToPage = (path) => {
    history.push(path, "root", "replace");
  };

  const OpenContactSolliciter = () => {
    if (!isAuthenticated) {
      triggerAlert(
        "Se connecter pour encourager la marque",
        "Attention",
        () => {
          goToPage("/login");
        },
        "ios",
        "Se connecter"
      );
    } else {
      setIsOpen(true);
    }
  };
  return (
    <>
      <div className="flex flex-row justify-around items-center space-x-6 ArchivoLight px-4 pt-1 pb-3">
      {!product.isFoodheaProduct ? (
        <div className="text-[#42a29a] text-xs">
          Informations non garanties,{" "}
          <span className="font-bold">encourager la marque</span>
          <br />à jouer la carte de la transparence{" "}
          <span className="pallybold leading-normal">
            Ti
            <span className="tracking-tightest leading-normal  items-center inline-flex static">
              CO
              <img
                src={flecheLeft}
                className="w-6 1 absolute translate-x-6 translate-y-3 -rotate-12

"
              />
            </span>
          </span>
        </div>):(
            <div className="text-[#42a29a] text-xs">
          Encourager la marque à atteindre 100% de transparence
        </div>
        )}
        <div className="pr-3">
          <img
            className="min-w-16"
            src={illustrationOrigines}
            alt="Illustration des origines du produit"
            onClick={() => OpenContactSolliciter()}
          />
        </div>
        
      </div>
      <Solliciter
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        gtin={product?.gtin}
        productName={product?.name}
        authUser={authUser}
      />
    </>
  );
};

export default Encourager;
