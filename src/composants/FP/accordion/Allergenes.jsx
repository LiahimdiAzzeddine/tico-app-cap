import React from "react";
import Arachides from "../../../assets/fb/Allergenes/Arachides.svg";
import Celeri from "../../../assets/fb/Allergenes/Céleri.svg";
import Mollusques from "../../../assets/fb/Allergenes/Mollusques.svg";
import Crustaces from "../../../assets/fb/Allergenes/Crustacés.svg";
import FruitsCoque from "../../../assets/fb/Allergenes/Fruits à coque.svg";
import Gluten from "../../../assets/fb/Allergenes/Gluten.svg";
import Lait from "../../../assets/fb/Allergenes/Lait.svg";
import Lupin from "../../../assets/fb/Allergenes/Lupin.svg";
import Moutarde from "../../../assets/fb/Allergenes/Moutarde.svg";
import Oeuf from "../../../assets/fb/Allergenes/Oeuf.svg";
import Poisson from "../../../assets/fb/Allergenes/Poisson.svg";
import Sesame from "../../../assets/fb/Allergenes/Sésame.svg";
import Soja from "../../../assets/fb/Allergenes/Soja.svg";
import Sulfites from "../../../assets/fb/Allergenes/Sulfites.svg";
import { useGlobalContext } from "../GlobalProvider";

const Allergenes = ({ allergenes = [] }) => {
    const { setIsCourager } = useGlobalContext();
  
  // Mapping allergens to images
  const allergenesImg = {
    peanuts: Arachides,
    celery: Celeri,
    molluscs: Mollusques,
    crustaceans: Crustaces,
    nuts: FruitsCoque,
    gluten: Gluten,
    milk: Lait,
    lupin: Lupin,
    mustard: Moutarde,
    eggs: Oeuf,
    fish: Poisson,
    'sesame-seeds': Sesame,
    soybeans: Soja,
    'sulphur-dioxide-and-sulphites': Sulfites,
  };
  const allergenesEngToFr = {
    peanuts: "Arachides",
    celery: "Céleri",
    molluscs: "Mollusques",
    crustaceans: "Crustacés",
    nuts: "Noix",
    gluten: "Gluten",
    milk: "Lait",
    lupin: "Lupin",
    mustard: "Moutarde",
    eggs: "Œufs",
    fish: "Poisson",
    'sesame-seeds': "Graines de sésame",
    soybeans: "Soja",
    'sulphur-dioxide-and-sulphites': "Dioxyde de soufre et sulfites",
  };
  

  return (
    <>
      <h1 className="text-xl text-custom-blue font-bold pt-3">
        <span className="marker-effect-cyan ArchivoExtraBold">Allergènes</span>
      </h1>
      <div className="mt-4 grid grid-cols-3 gap-x-4 gap-y-6 items-start">
        {allergenes.length > 0 ? (
          allergenes.map((allergene, index) => (
          
            <div key={index} className="flex flex-col items-center w-full">
              {allergenesImg[allergene] ? (
                <img
                  src={allergenesImg[allergene]}
                  alt={`Allergène ${allergene}`}
                  className="max-w-12 max-h-12 m-auto"
                />
              ) : (
                <div className="w-14 h-14  flex items-center justify-center bg-gray-200 rounded-full" onClick={()=>{setIsCourager(true)}}>
                  <span className=" text-custom-blue text-2xl">?</span>
                </div>
              )}
              <span className="text-sm text-custom-blue mt-1 ArchivoBold m-auto">
                {allergene
                  ? allergenesEngToFr[allergene]
                  : <>Incertain</>}
              </span>
            </div>
          ))
          
        ) : (
          <div className="text-gray-500 ArchivoBold text-sm">
            Aucun allergène disponible.
          </div>
        )}
      </div>
    </>
  );
};

export default Allergenes;
