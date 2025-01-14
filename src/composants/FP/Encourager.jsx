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
      <div className="flex flex-row justify-start items-start space-x-4 px-3 pb-3 ArchivoLight">
        {!product.isFoodheaProduct ? (
          <div className="flex-1 text-[#42a29a] text-xs sm:text-sm md:text-base leading-tight sm:leading-normal flex flex-col justify-center min-h-14 ">
            <span className="block">
              Informations non garanties,{" "}
              <span className="font-bold">encourager la marque </span>
            </span>
            <span className="block">
              à jouer la carte de la transparence{" "}
              <span className="pallybold whitespace-nowrap relative">
                Ti
                <span className="tracking-tightest inline-flex items-center">
                  CO
                  <img
                    src={flecheLeft}
                    className="w-6 absolute -right-[3.25rem] top-2 -rotate-[21deg] transform"
                    alt=""
                  />
                </span>
              </span>
            </span>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-center min-h-14 text-[#42a29a] text-xs sm:text-sm md:text-base leading-tight sm:leading-normal">
            Encourager la marque à atteindre 100% de transparence
          </div>
        )}
        <div className="flex-shrink-0 w-16 md:w-20 flex flex-row justify-start items-start p-0 m-auto">
          <img
            className="w-full h-auto m-auto pr-2"
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