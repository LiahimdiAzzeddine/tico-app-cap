import React from "react";
import { IonModal, IonContent } from "@ionic/react";
import recetteBg from "../../assets/recettes/recetteBg.svg";
import ModalHeader from "./ModalHeader";
import horloge from "../../assets/fb/horloge.svg";
import image64 from "../../assets/history/64.png";



const RecipeModal = ({ isOpen, onClose, recipe }) => {
const defaultImage = image64;
  // Use the provided recipe object instead of a hardcoded item
  const {
    title = "Untitled",
    subtitle = "",
    timecook: preparation = 0,
    timebake: cuisson = 0,
    image = "",
    difficultes: difficulty = "Unknown",
    regimes: filters = "",
    ingredients = [],
    recette: steps = [],
  } = recipe;


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
            <ModalHeader onClose={onClose} />
          </div>
          <div className="bg-custom-red-bg-clear px-4 pb-4">
            <div
              className="w-full aspect-square flex items-center justify-center bg-no-repeat bg-contain bg-center relative"
              style={{
                backgroundImage: `url(${recetteBg})`,
              }}
            >
              <div className="flex flex-col justify-center items-center space-y-6">
                <h2 className="text-center text-custom-red text-2xl titre-bold ">
                  {title}
                </h2>
                <img
                  src={defaultImage}
                  alt={title}
                  className="w-2/4 h-auto rounded-2xl border-custom-red border-2 object-cover"
                />
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-wrap justify-center items-center mt-4 space-x-2">
                <span className="bg-white text-red-800 py-1 px-2 rounded-full border-[1px] border-custom-red">
                  {difficulty}
                </span>
                {filters &&
                  filters.split(",").map((filter, index) => (
                    <span
                      key={index}
                      className="bg-white text-red-800 py-1 px-2 rounded-full border-[1px] border-custom-red"
                    >
                      {filter.trim()}
                    </span>
                  ))}
              </div>
              <div className="flex items-center justify-start text-sm text-custom-red mt-4">
                <img src={horloge} className="w-6 h-6 mr-2" alt="clock icon" />
                <div className="text-start">
                  <div>{preparation} min de préparation</div>
                  <div>{cuisson} min de cuisson</div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 mt-4">
            <h2 className="text-custom-red text-2xl font-bold mb-2">Ingrédients</h2>
            <ul className="list-disc list-inside">
              {ingredients &&
                ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-700">
                    {ingredient.qt ? `${ingredient.qt} ` : ""}
                    {ingredient.unit ? `${ingredient.unit} ` : ""}
                    {ingredient.name}
                  </li>
                ))}
            </ul>
          </div>
          <div className="px-4 mt-4">
            <h2 className="text-custom-red text-2xl font-bold mb-2">Recette</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              {steps &&
                steps.map((step, index) => (
                  <li key={index}>{step.description}</li>
                ))}
            </ol>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default RecipeModal;
