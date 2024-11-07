import React from "react";
import {
  IonModal,
  IonContent,
} from "@ionic/react";
import recetteBg from "../../assets/recettes/recetteBg.svg";
import ModalHeader from "./ModalHeader";
import horloge from "../../assets/fb/horloge.svg";

const RecipeModal = ({ isOpen, onClose, recipe }) => {
  const item = {
    id: "1",
    title: "Spaghetti à la Bolognaise",
    subTitle: "Un ti'plaisir",
    preparation: 30,
    cuisson: 20,
    image:
      "https://img.cuisineaz.com/660x660/2016/07/29/i84653-spaghettis-bolognaise-rapides.jpg",
    types: ["Entrée", "Plat", "Boisson"],
    difficulty: "Facile",
    filters: ["Végétarien"],
    ingredients: [
      {
        name: "pâtes",
        quantity: 500,
        unit: "g",
      },
      {
        name: "pulpe de tomate",
        quantity: 20,
        unit: "g",
      },
      {
        name: "huile d'olive",
        quantity: 1,
        unit: "cuillère",
      },
      {
        name: "bœuf haché",
        quantity: 300,
        unit: "g",
      },
      {
        name: "carotte",
        quantity: 1,
        unit: null,
      },
      {
        name: "sel",
        quantity: null,
        unit: null,
      },
    ],
    steps: [
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
      "Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
      "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.",
      "Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    ],
  };

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      style={{
        "--ion-background-color": "#fdf2f0",
        "--ion-padding": "0",
      }}
    >
      <IonContent className="ion-padding">
        <div className="bg-white rounded-b-3xl pb-4">
        <div className="bg-custom-red-bg-clear">
          <ModalHeader onClose={onClose} /></div>
          <div className="bg-custom-red-bg-clear px-4 pb-4">
            
            <div
              className="w-full aspect-square flex items-center justify-center bg-no-repeat bg-contain bg-center relative"
              style={{
                backgroundImage: `url(${recetteBg})`,
              }}
            >
              <div className="flex flex-col justify-center items-center space-y-6">
                <h2 className="text-center text-custom-red text-2xl titre-bold ">
                  {item.title}
                </h2>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-2/4 h-auto rounded-2xl border-custom-red border-2 object-cover"
                />
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-wrap justify-center items-center mt-4 space-x-2">
              <span className="bg-white text-red-800 py-1 px-2 rounded-full border-[1px] border-custom-red">
                {item.difficulty}
              </span>
              {item.filters.map((filter, index) => (
                <span
                  key={index}
                  className="bg-white text-red-800 py-1 px-2 rounded-full border-[1px] border-custom-red"
                >
                  {filter}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-start text-sm text-custom-red mt-4">
              <img src={horloge} className="w-6 h-6 mr-2" alt="clock icon" />
              <div className="text-start">
                <div>{item.preparation} min de préparation</div>
                <div>{item.cuisson} min de cuisson</div>
              </div>
            </div>
            </div>
            
          </div>
          <div className="px-4 mt-4">
            <h2 className="text-custom-red text-2xl font-bold mb-2">Ingrédients</h2>
            <ul className="list-disc list-inside">
              {item.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">
                  {ingredient.quantity ? `${ingredient.quantity} ` : ""}
                  {ingredient.unit ? `${ingredient.unit} ` : ""}
                  {ingredient.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="px-4 mt-4">
            <h2 className="text-custom-red text-2xl font-bold mb-2">Recette</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              {item.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default RecipeModal;
