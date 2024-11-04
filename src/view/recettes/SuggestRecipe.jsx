import React, { useState,useEffect } from "react";
import Background from "../../assets/recettes/background.svg";
import useSuggestRecipe from "../../hooks/recipes/useSuggestRecipe";
import Spinner from "../composants/Spinner";

const SuggestRecipe = ({onClose}) => {
  const { handleSubmit, loading, error,success } = useSuggestRecipe();
  useEffect(() => {
    if (success) {
      onClose();
    }
  }, [success, onClose]);
  const [values, setValues] = useState({
    titre: "",
    type: "",
    difficulty: "",
    filters: [],
    prep_time: "",
    cook_time: "",
    rest_time: "",
    ingredients: [],
    steps: [],
  });

  const [ingredientInput, setIngredientInput] = useState("");
  const [stepInput, setStepInput] = useState(""); // État pour l'input des étapes

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(values);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const addIngredient = () => {
    if (ingredientInput.trim()) {
      setValues((prevValues) => ({
        ...prevValues,
        ingredients: [...prevValues.ingredients, ingredientInput.trim()],
      }));
      setIngredientInput(""); // Réinitialiser l'input après l'ajout
    }
  };

  const addStep = () => {
    if (stepInput.trim()) {
      setValues((prevValues) => ({
        ...prevValues,
        steps: [...prevValues.steps, stepInput.trim()],
      }));
      setStepInput(""); // Réinitialiser l'input après l'ajout
    }
  };

  const addFilter = (filter) => {
    setValues((prevValues) => {
      // Si le filtre est déjà présent, on le retire; sinon, on l'ajoute
      const filters = prevValues.filters.includes(filter)
        ? prevValues.filters.filter((f) => f !== filter) // Retirer le filtre
        : [...prevValues.filters, filter]; // Ajouter le filtre
      return { ...prevValues, filters };
    });
  };

  return (
    <div className="px-2 details">
      <div
        className="flex flex-col items-center justify-center min-h-[10vh]"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      >
        <h2 className="text-center text-custom-blue text-2xl titre-bold ">
          Proposer une recette
        </h2>
      </div>
      <div className="mt-6">
        <form onSubmit={handleFormSubmit} className="space-y-8 w-11/12 ">
          {/* Type de plats */}
          <div className="flex flex-col gap-2">
            <label className="text-custom-red text-base">Type de plats:</label>
            <div className="space-x-2 space-y-2">
              {["Entrée", "Plat", "Dessert", "Apéritif", "Boisson"].map(
                (type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setValues({ ...values, type })}
                    className={`border-solid border-[1px] border-red-700 px-3 py-1 rounded-full ${
                      values.type === type
                        ? "bg-custom-red text-white border-custom-red"
                        : "bg-white border-gray-300 text-custom-red"
                    }`}
                  >
                    {type}
                  </button>
                )
              )}
            </div>
            {error?.type && (
              <p className="text-red-500 text-sm mt-1">{error.type[0]}</p>
            )}
          </div>

          {/* Temps de préparation */}
          <div className="flex flex-col gap-2">
            <label className="text-custom-red text-base pb-2">
              Temps de préparation :
            </label>
            <input
              type="range"
              name="prep_time"
              min="0"
              max="120"
              step="1"
              value={values.prep_time}
              onChange={handleInputChange}
              className="appearance-none w-full h-[0.15rem] bg-gray-300 rounded-full outline-none"
              style={{ backgroundColor: "rgba(220, 38, 38, 1)" }}
            />
            <div className="text-center text-custom-red mt-2">
              {values.prep_time} min
            </div>
            {error?.prep_time && (
              <p className="text-red-500 text-sm mt-1">{error.prep_time[0]}</p>
            )}
          </div>

          {/* Difficulté */}
          <div className="flex flex-col gap-2">
            <label className="text-custom-red text-base">Difficulté:</label>
            <div className="space-x-2 space-y-2 ">
              {["Facile", "Moyen", "Difficile"].map((difficulty) => (
                <button
                  key={difficulty}
                  type="button"
                  onClick={() => setValues({ ...values, difficulty })}
                  className={`border-solid border-[1px] border-red-700 px-3 py-1 rounded-full ${
                    values.difficulty === difficulty
                      ? "bg-custom-red text-white border-custom-red"
                      : "bg-white border-gray-300 text-custom-red"
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
            {error?.difficulty && (
              <p className="text-red-500 text-sm mt-1">{error.difficulty[0]}</p>
            )}
          </div>

          {/* Filtres */}
          <div className="flex flex-col gap-2">
            <label className="text-custom-red text-base">Filtres:</label>
            <div className="space-x-2 space-y-2">
              {[
                "Végétarien",
                "Végan",
                "Sans lactose",
                "Sans gluten",
                "Sans oeufs",
              ].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => addFilter(filter)}
                  className={`border-solid border-[1px] border-red-700 px-3 py-1 rounded-full ${
                    values.filters.includes(filter)
                      ? "bg-custom-red text-white border-custom-red"
                      : "bg-white border-gray-300 text-custom-red"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            {error?.filters && (
              <p className="text-red-500 text-sm mt-1">{error.filters[0]}</p>
            )}
          </div>

          {/* Titre de la recette */}
          <div className="flex flex-col gap-3">
            <label className="text-custom-red text-base">
              Titre de la recette:
            </label>
            <input
              type="text"
              name="titre"
              value={values.titre}
              onChange={handleInputChange}
              placeholder="Titre de la recette"
              className={`input border-2 p-2 rounded-xl focus:outline-none ${
                error?.titre
                  ? "border-orange-300"
                  : "border-red-500 focus:border-orange-500"
              }`}
              required
            />
            {error?.titre && (
              <p className="text-red-500 text-sm mt-1">{error.titre[0]}</p>
            )}
          </div>

          {/* Temps de cuisson */}
          <div className="flex flex-col gap-3">
            <label className="text-custom-red text-base">
              Temps de cuisson:
            </label>
            <input
              type="number"
              name="cook_time"
              value={values.cook_time}
              onChange={handleInputChange}
              placeholder="Temps de cuisson"
              className={`input border-2 p-2 rounded-xl focus:outline-none ${
                error?.cook_time
                  ? "border-orange-300"
                  : "border-red-500 focus:border-orange-500"
              }`}
              required
            />
            {error?.cook_time && (
              <p className="text-red-500 text-sm mt-1">{error.cook_time[0]}</p>
            )}
          </div>

          {/* Temps de repos */}
          <div className="flex flex-col gap-3">
            <label className="text-custom-red text-base">Temps de repos:</label>
            <input
              type="number"
              name="rest_time"
              value={values.rest_time}
              onChange={handleInputChange}
              placeholder="Temps de repos"
              className={`input border-2 p-2 rounded-xl focus:outline-none ${
                error?.rest_time
                  ? "border-orange-300"
                  : "border-red-500 focus:border-orange-500"
              }`}
            />
            {error?.rest_time && (
              <p className="text-red-500 text-sm mt-1">{error.rest_time[0]}</p>
            )}
          </div>

          {/* Ingrédients */}
          <div className="flex flex-col gap-3 justify-center items-center">
            <label className="text-custom-red text-base">Ingrédients:</label>
            <input
              type="text"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              placeholder="Ingrédient"
              className={`input border-2 p-2 rounded-xl focus:outline-none w-full ${
                error?.ingredients
                  ? "border-orange-300"
                  : "border-red-500 focus:border-orange-500"
              }`}
            />
            {error?.ingredients && (
              <p className="text-red-500 text-sm mt-1">
                {error.ingredients[0]}
              </p>
            )}
            <button
              type="button"
              onClick={addIngredient}
              className="bg-custom-red text-white border-solid border-[1px] border-red-700 px-3 py-1 rounded-full"
            >
              + ajouter un ingrédient
            </button>
            <div className="mt-3 flex flex-wrap gap-1 w-full">
              {values.ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="bg-red-200 text-red-800 py-1 px-2 rounded-full m-1"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          {/* Étapes */}
          <div className="flex flex-col gap-3 justify-center items-center">
            <label className="text-custom-red text-base">Étapes:</label>
            <textarea
              type="text"
              value={stepInput}
              onChange={(e) => setStepInput(e.target.value)}
              placeholder="Étape"
              className={`input border-2 p-2 rounded-xl focus:outline-none w-full ${
                error?.steps
                  ? "border-orange-300"
                  : "border-red-500 focus:border-orange-500"
              }`}
            />
            {error?.steps && (
              <p className="text-red-500 text-sm mt-1">{error.steps[0]}</p>
            )}
            <button
              type="button"
              onClick={addStep}
              className="bg-custom-red text-white border-solid border-[1px] border-red-700 px-3 py-1 rounded-full"
            >
              + ajouter une étape
            </button>
            <div className="mt-3 flex flex-col w-full">
              {values.steps.map((step, index) => (
                <span
                  key={index}
                  className="bg-red-200 text-red-800  py-1 px-2 rounded-full m-1"
                >
                  Étape {index + 1}: {step}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 justify-center items-center">
            <button
              type="submit"
              className="btn-submit bg-red-400 text-white border-solid border-[1px] font-bold border-red-400 px-3 py-2 rounded-lg"
              disabled={loading}
            >
              {loading ? "Envoi..." : "Envoyer ma recette"}
            </button>
          </div>
          {/* Full-screen loading overlay */}
          {loading && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
              <Spinner />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SuggestRecipe;
