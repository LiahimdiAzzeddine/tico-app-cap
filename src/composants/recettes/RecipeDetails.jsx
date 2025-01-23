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
    steps,
    totalTime;

  if (custom) {
    // Assigner les valeurs lorsque 'custom' est true
    ({
      title = "Recette sans titre",
      timecook: preparation = "0 min",
      timebake: cuisson = "0 min",
      image =image?image:defaultImageRecette,
      difficulte,
      totalTime,
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
      totalTime,
      regimes,
      ingredients = [],
      recette: steps = [],
    } = recipe);
  }

  const defaultImage = defaultImageRecette;
  return (
    <>
      <div className="bg-white rounded-b-[2rem] pb-8">
        <div className="bg-custom-red-bg-clear px-6 pb-4 pt-6 rounded-b-[2rem]  space-y-6">
          <div className="w-full min-h-[32dvh] flex items-center justify-center bg-no-repeat bg-contain bg-center relative recetteBg">
            <div className="flex flex-col justify-center items-center space-y-4">
              <h2 className="text-center text-custom-red text-2xl titre-bold ">
                {title}
              </h2>
              <img
                src={image}
                alt={title}
                className="w-[43%] min-w-32 h-auto rounded-2xl border-custom-red border-2 object-cover"
              />
            </div>
          </div>
          <div className="flex flex-row justify-between space-x-2">
            <div className="flex flex-wrap justify-center items-center mt-4 space-x-1 gap-y-1 Archivo max-w-[50%]">
              {difficulte && (
                <span className="text-white bg-red-800 py-1 px-2 rounded-full ">
                  {difficulte}
                </span>
              )}

              {regimes &&
                regimes.map((filter, index) => (
                  <span
                    key={index}
                    className="text-white bg-red-800 py-1 px-2 rounded-full"
                  >
                    {filter.trim()}
                  </span>
                ))}
                
            </div>
            <div className="flex items-center justify-start text-sm text-custom-red mt-4">
              <img src={horloge} className="w-8 h-8 mr-2" alt="clock icon" />
              <div className="text-start Archivo">
                {totalTime && <div>Temps&nbsp;total&nbsp;: <span style={{ whiteSpace: 'nowrap' }}>{totalTime}</span></div>}
              </div>
            </div>
          </div>
        </div>
        {ingredients && (
          <div className="px-6 pt-6">
            <h2 className="text-custom-red text-2xl font-bold mb-3 ArchivoExtraBold">
              Ingrédients
            </h2>
            <ul className="list-inside list-none ArchivoLight">
              {ingredients.length > 0 ? (
                ingredients.map((ingredient, index) => (
                  <li key={index} className="text-custom-red ArchivoLight leading-archivo">
                    {ingredient.qt ? `${ingredient.qt} ` : ""}
                    {ingredient.unit ? `${ingredient.unit} ` : ""}
                    {ingredient.name}
                  </li>
                ))
              ) : (
                <div className="py-6 ArchivoLight">
                  Les ingrédients de cette recette, malheureusement, ne sont pas
                  disponibles. Revisitez cette page ultérieurement pour l'avoir.
                </div>
              )}
            </ul>
          </div>
        )}

        <div className="px-6 mt-6">
          <hr className="w-full border-t border-custom-red-bg-clear" />
        </div>

        {steps.length > 0 ? (
          <div className="px-6 pt-6">
            <h2 className="text-custom-red text-2xl font-bold mb-3 ArchivoExtraBold">
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
          <ul className="list-disc pl-6">
            {stepGroup.map((step, stepIndex) => (
              <li key={stepIndex} className="text-custom-red ArchivoLight leading-archivo mb-2">
                {step.description}
              </li>
            ))}
          </ul>
        </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="px-6 mt-6 ArchivoExtraBold">
            <h2 className="text-custom-red text-2xl font-bold mb-3 titre-bold ">
              Recette
            </h2>
            <div className="py-6 ArchivoLight">
              Les étapes de cette recette, malheureusement, ne sont pas
              disponibles. Revisitez cette page ultérieurement pour l'avoir.
            </div>
          </div>
        )}
        {/**
        <div className="w-20 h-auto absolute right-6  ">
          <img src={badgeimage} />
        </div> */}
      </div>
      <div className="h-[5vh] w-full flex flex-col justify-center items-center"></div>
    </>
  );
};

export default RecipeDetails;
