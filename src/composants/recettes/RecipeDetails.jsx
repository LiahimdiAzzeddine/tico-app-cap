import React from "react";
import horloge from "../../assets/fb/horloge.svg";
import recetteBg from "../../assets/recettes/recetteBg.svg";

import badgeimage from "../../assets/recettes/badge.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import defaultImageRecette from "../../assets/recettes/defaultImageRecette.png";

//import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";

// Fonction pour regrouper les étapes par lots de 3
const groupSteps = (steps, groupSize) => {
  if (!Array.isArray(steps)) return [];
  const grouped = [];
  for (let i = 0; i < steps.length; i += groupSize) {
    grouped.push(steps.slice(i, i + groupSize));
  }
  return grouped;
};

const RecipeDetails = ({ recipe = {}, custom = true }) => {
  let title,
    subtitle,
    preparation,
    cuisson,
    image,
    difficulte,
    regimes,
    ingredients,
    steps;

  if (custom) {
    // Assigner les valeurs lorsque 'custom' est true
    ({
      title = "Recette sans titre",
      timecook: preparation = "0 min",
      timebake: cuisson = "0 min",
      image = defaultImageRecette,
      difficulte,
      regimes = [],
      ingredients = [],
      recette: steps = [],
    } = recipe);
  } else {
    // Assigner les valeurs lorsque 'custom' est false
    ({
      title = "Recette sans titre",
      subtitle = "",
      timecook: preparation = "0 min",
      timebake: cuisson = "0 min",
      image = defaultImageRecette,
      difficulte,
      regimes,
      ingredients = [],
      recette: steps = [],
    } = recipe);
  }

  const defaultImage = defaultImageRecette;
  return (
    <>
      <div className="bg-white rounded-b-[2rem] pb-14">
        <div className="bg-custom-red-bg-clear px-6 pb-4  rounded-b-[2rem]  space-y-6">
          <div
            className="w-full min-h-[30dvh] flex items-center justify-center bg-no-repeat bg-contain bg-center relative recetteBg"
          >
            <div className="flex flex-col justify-center items-center space-y-4">
              <h2 className="text-center text-custom-red text-2xl titre-bold ">
                {title}
              </h2>
              <img
                src={defaultImage}
                alt={title}
                className="w-1/2 h-auto rounded-2xl border-custom-red border-2 object-cover"
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
                {preparation&&(
                  <div>{preparation} de préparation</div>
                )}
                {cuisson&&(
                 <div>{cuisson} de cuisson</div>
                )}
                
              </div>
            </div>
          </div>
        </div>
        {ingredients && (
          <div className="px-6 mt-6">
            <h2 className="text-custom-red text-2xl font-bold mb-3 ArchivoBold">
              Ingrédients
            </h2>
            <ul className="list-inside list-none Archivo">
              {ingredients.length > 0?
              (
                ingredients.map((ingredient, index) => (
                  <li key={index} className="text-custom-red">
                    {ingredient.qt ? `${ingredient.qt} ` : ""}
                    {ingredient.unit ? `${ingredient.unit} ` : ""}
                    {ingredient.name}
                  </li>
                ))):(
                  <div className="py-6 Archivo">
          Les ingrédients de cette recette, malheureusement, ne sont pas disponibles. Revisitez cette page ultérieurement pour l'avoir.
        </div>
                )
                
                }
            </ul>
          </div>
        )}
      
          <div className="px-6 mt-6">
            <hr className="w-full border-t border-[#fceae8]" />
          </div>
  
        {steps.length > 0 ? (
          <div className="px-6 mt-6">
            <h2 className="text-custom-red text-2xl font-bold mb-3 ArchivoBold">
              Recette
            </h2>
            <Swiper
              modules={[Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              aria-label="Étapes de la recette"
              pagination={{ clickable: true }}
              className="recipe-slider"
            >
              {groupSteps(steps, 3).map((stepGroup, index) => (
                <SwiperSlide key={index}>
                  <div className="h-full flex flex-col items-start justify-start mb-6">
                    {stepGroup.map((step, stepIndex) => (
                      <div key={stepIndex} className="mb-2">
                        <p className="text-custom-red Archivo">
                          {"• "}
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ):(
          <div className="px-6 mt-6">
            <h2 className="text-custom-red text-2xl font-bold mb-3 titre-bold">
              Recette
            </h2>
          <div className="py-6">
            Les étapes de cette recette, malheureusement, ne sont pas disponibles. Revisitez cette page ultérieurement pour l'avoir.
          </div>
          </div>
        )}
        <div className="w-20 h-auto absolute right-6  ">
          <img src={badgeimage} />
        </div>
      </div>
      <div className="h-[7vh] w-full flex flex-col justify-center items-center"></div>
    </>
  );
};

export default RecipeDetails;
