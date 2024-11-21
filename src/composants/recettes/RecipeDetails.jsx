import React from "react";
import horloge from "../../assets/fb/horloge.svg";
import bgImage from "../../assets/recettes/bgImage.svg";
import badgeimage from "../../assets/recettes/badge.svg";

const RecipeDetails = ({ recipe }) => {
  const {
    title = "Untitled",
    timecook: preparation = 0,
    timebake: cuisson = 0,
    image = "",
    difficulte,
    regimes,
    ingredients = [],
    recette: steps = [],
  } = recipe;

  const defaultImage =
    "https://dummyimage.com/300x300/cccccc/ffffff.png&text=Recette";

  return (
    <>
      <div className="bg-white rounded-b-[2rem] pb-14">
        <div className="bg-custom-red-bg-clear px-6 pb-4 rounded-b-[2rem] space-y-6">
          <div
            className="w-full min-h-[30dvh] flex items-center justify-center bg-no-repeat bg-contain bg-center relative"
            style={{
              backgroundImage: `url(${bgImage})`,
            }}
          >
            <div className="flex flex-col justify-center items-center space-y-4">
              <h2 className="text-center text-custom-red text-2xl titre-bold ">
                {title}
              </h2>
              <img
                src={defaultImage}
                alt={title}
                className="w-1/2 h-auto rounded-2xl border-custom-red border-2 object-cover "
              />
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-wrap justify-center items-center mt-4 space-x-2 space-y-1">
              {difficulte && (
                <span className="text-white bg-red-800 py-1 px-2 rounded-full border-[1px] border-custom-red">
                  {difficulte}
                </span>
              )}
              {regimes &&
                regimes.map((filter, index) => (
                  <span
                    key={index}
                    className="text-white bg-red-800 py-1 px-2 rounded-full border-[1px] border-custom-red"
                  >
                    {filter.trim()}
                  </span>
                ))}
            </div>
            <div className="flex items-center justify-start text-sm text-custom-red mt-4">
              <img src={horloge} className="w-8 h-8 mr-2" alt="clock icon" />
              <div className="text-start">
                <div>{preparation} min de préparation</div>
                <div>{cuisson} min de cuisson</div>
              </div>
            </div>
          </div>
        </div>
        {ingredients.length > 0 && (
          <div className="px-6 mt-6">
            <h2 className="text-custom-red text-2xl font-bold mb-3 titre-bold">
              Ingrédients
            </h2>
            <ul className="list-inside list-none ">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="text-custom-red">
                  {ingredient.qt ? `${ingredient.qt} ` : ""}
                  {ingredient.unit ? `${ingredient.unit} ` : ""}
                  {ingredient.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        {steps.length > 0 && (
          <div className="px-6 mt-6">
            <hr className="w-full border-t border-[#fceae8]" />
            <h2 className="text-custom-red text-2xl font-bold mb-3 titre-bold">
              Recette
            </h2>
            <ol className="list-decimal list-inside text-custom-red space-y-2">
              {steps.map((step, index) => (
                <li key={index}>{step.description}</li>
              ))}
            </ol>
          </div>
        )}
        <div className="w-20 h-auto absolute right-6 ">
          <img src={badgeimage} alt="badge" />
        </div>
      </div>
      <div className="h-[20vh] w-full flex flex-col justify-center items-center">
        <h1 className="text-custom-red font-bold text-3xl">
          Produits proposés
        </h1>
      </div>
    </>
  );
};

export default RecipeDetails;
