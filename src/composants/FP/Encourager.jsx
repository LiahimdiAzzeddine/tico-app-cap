import React from "react";
import { useAlert } from "../../context/AlertProvider";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useIonRouter } from "@ionic/react";
import illustrationOrigines from "../../assets/fb/BubbleImg.svg";
import flecheLeft from "../../assets/fb/FICHEFleche.svg";
import { useGlobalContext } from "./GlobalProvider";
import { motion } from "framer-motion";

const Encourager = ({ product }) => {
  const { triggerAlert } = useAlert();
  const isAuthenticated = useIsAuthenticated();
  const history = useIonRouter();
  const { hasRequested, setIsCourager } = useGlobalContext();

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
      setIsCourager(true);
    }
    //setHasRequested(true);
  };

  return (
    <>
      <div className="flex flex-row justify-start items-center px-3 pb-3 ArchivoLight gap-2">
        <div onClick={() => OpenContactSolliciter()} className=" text-custom-blue underline-offset-2 underline text-customMd sm:text-xs md:text-sm ArchivoLight leading-tight sm:leading-normal flex flex-col justify-center min-h-14">
          <span className="block">
            <span className="font-bold">Encourager la marque</span> à fournir
          </span>
          <span className="block relative">
            toutes les informations{" "}
            <img
              src={flecheLeft}
              className="w-[2.25rem] absolute -right-9 top-2 -rotate-[30deg] transform"
              alt=""
            />
          </span>
        </div>

        <div className="flex-1 flex justify-center pl-6">
          <motion.img
            className="h-auto cursor-pointer w-14"
            src={illustrationOrigines}
            alt="Illustration des origines du produit"
            onClick={() => OpenContactSolliciter()}
            animate={hasRequested ? { scale: 1 } : { scale: [1, 1.2, 1] }} 
            transition={{ repeat: hasRequested ? 0 : Infinity, duration: 2.5, ease: "easeInOut" }} 
          />
        </div>
      </div>
    </>
  );
};

export default Encourager;
