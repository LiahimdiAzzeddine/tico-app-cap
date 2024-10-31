import React from "react";
import recetteBadge from "../../assets/fb/recetteBadge.svg";
import horloge from "../../assets/fb/horloge.svg";
import flecheRed from "../../assets/fb/flecheRed.svg"
function Recettes() {
  const recettes = [
    {
      title: "Spaghetti à la Bolognaise",
      subTitle: "Un ti'plaisir",
      preparation: 30,
      cuisson: 30,
      image:
        "https://img.cuisineaz.com/660x660/2016/07/29/i84653-spaghettis-bolognaise-rapides.jpg", // Remplacez par le chemin de l'image
    },
    {
      title: "Spaghetti à la Bolognaise",
      subTitle: "Un ti'plaisir",
      preparation: 30,
      cuisson: 20,
      image:
        "https://img.cuisineaz.com/660x660/2016/07/29/i84653-spaghettis-bolognaise-rapides.jpg", // Remplacez par le chemin de l'image
    },
  ];

  return (
    <>
    <div className="flex flex-col w-full space-y-4 py-10 pb-5">
      {recettes.map((item, index) => (
        <div
          key={index}
          className="relative bg-custom-rose rounded-e-full px-6 py-6 flex items-center  "
          style={{ width: "95%" }}
        >
          {/* Badge "Recettes" */}
          {index === 0 && (
            <img
              src={recetteBadge}
              alt="Recettes Badge"
              className="absolute -top-12 -right-1 w-20 h-20"
            />
          )}
          <div className="space-x-4 flex items-center">
            {/* Image de la recette */}
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 rounded-2xl border-custom-blue border-2 object-cover"
            />

            {/* Informations de la recette */}
            <div className="flex flex-col ">
              <h2 className="text-md font-bold text-custom-red">
                {item.title}
              </h2>
              <p className="text-sm text-custom-red-clear italic ">
                {item.subTitle}
              </p>

              {/* Temps de préparation et de cuisson */}
              <div className="flex flex-row items-center text-sm text-custom-red-clear mt-2 space-x-4">
                <div>
                  {" "}
                  <img src={horloge} className="w-8" />
                </div>
                <div className="flex flex-col items-start justify-start">
                  <div>{item.preparation} min de préparation</div>
                  <div>{item.cuisson} min de cuisson</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
    </div>
    <div className="flex flex-row items-start justify-center space-x-3 ">
        <img src={flecheRed} className="w-12"/>
      <button className="text-gl text-white bg-custom-red rounded-md font-bold w-48 p-2">
    Proposer une recette
    pour ce produit
    </button>
    </div>
    
    </>
  );
}

export default Recettes;