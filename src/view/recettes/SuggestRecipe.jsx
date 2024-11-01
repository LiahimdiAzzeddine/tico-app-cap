import React, { useState } from "react";
import Background from "../../assets/recettes/background.svg";
import { IonChip } from "@ionic/react";
import useSuggestRecipe from "../../hooks/recipes/useSuggestRecipe";

const SuggestRecipe = () => {
  const { handleSubmit, loading, error } = useSuggestRecipe();
  const [values, setValues] = useState({
    email: "",
    titre: "",
    message: "",
    type: "",
    difficulty: "",
    filters: [],
    prepTime: "",
    cookTime: "",
    restTime: "",
    ingredients: [],
    steps: [],
  });

  const [ingredientInput, setIngredientInput] = useState("");
  const [filterInput, setFilterInput] = useState("");
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
    if (!values.filters.includes(filter)) {
      setValues((prevValues) => ({
        ...prevValues,
        filters: [...prevValues.filters, filter],
      }));
    }
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
        <h2 className="text-center text-[#006aff] text-2xl titre-bold ">
          Proposer une recette
        </h2>
      </div>
      <div className="mt-6">
        <form onSubmit={handleFormSubmit} className="space-y-8 w-11/12 ">
          {/* Type de plats */}
          <div className="flex flex-col gap-2">
            <label className="text-custom-red text-base">Type de plats:</label>
            <div className="space-x-2 space-y-2">
              {["Entrée", "Plat", "Dessert", "Apéritif", "Boisson"].map((type) => (
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
              ))}
            </div>
          </div>

          {/* Temps de préparation */}
          <div className="flex flex-col gap-2">
            <label className="text-custom-red text-base pb-2">Temps de préparation :</label>
            <input
              type="range"
              name="prepTime"
              min="0"
              max="120"
              step="1"
              value={values.prepTime}
              onChange={handleInputChange}
              className="appearance-none w-full h-[0.15rem] bg-gray-300 rounded-full outline-none"
              style={{
                backgroundColor: "rgba(220, 38, 38, 1)",
              }}
            />
            <div className="text-center text-custom-red mt-2">{values.prepTime} min</div>
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
          </div>

          {/* Filtres */}
          <div className="flex flex-col gap-2">
            <label className="text-custom-red text-base">Filtres:</label>
            <div className="space-x-2 space-y-2">
              {["Végétarien", "Végan", "Sans lactose", "Sans gluten", "Sans oeufs"].map((filter) => (
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
          </div>

          {/* Temps de cuisson */}
          <div className="flex flex-col gap-3">
            <label className="text-custom-red text-base">Temps de cuisson:</label>
            <input
              type="text"
              name="cookTime"
              value={values.cookTime}
              onChange={handleInputChange}
              placeholder="Temps de cuisson"
              className="input border-2 border-red-600 p-2 rounded-xl"
            />
          </div>

          {/* Temps de repos */}
          <div className="flex flex-col gap-3">
            <label className="text-custom-red text-base">Temps de repos:</label>
            <input
              type="text"
              name="restTime"
              value={values.restTime}
              onChange={handleInputChange}
              placeholder="Temps de repos"
              className="input border-2 border-red-600 p-2 rounded-xl"
            />
          </div>

          {/* Ingrédients */}
          <div className="flex flex-col gap-3 justify-center items-center">
            <label className="text-custom-red text-base">Ingrédients:</label>
            <input
              type="text"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              placeholder="Ingrédient"
              className="input border-2 border-red-600 p-2 rounded-xl mb-1 w-full"
            />
            <button
              type="button"
              onClick={addIngredient}
              className="bg-custom-red text-white border-solid border-[1px] border-red-700 px-3 py-1 rounded-full"
            >
              + ajouter un ingrédient
            </button>
            <div className="mt-3 flex flex-wrap gap-1 w-full">
  {values.ingredients.map((ingredient, index) => (
    <span key={index} className="bg-red-200 text-red-800 p-1 rounded-full m-1">
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
              className="input border-2 border-red-600 p-2 rounded-xl mb-1 w-full"
            />
            <button
              type="button"
              onClick={addStep}
              className="bg-custom-red text-white border-solid border-[1px] border-red-700 px-3 py-1 rounded-full"
            >
              + ajouter une étape
            </button>
            <div className="mt-3 flex flex-wrap gap-1 w-full">
              {values.steps.map((step, index) => (
                <span key={index} className="bg-red-200 text-red-800 p-1 rounded-full m-1">
                  Étape {index + 1}: {step}
                </span>
              ))}
            </div>
          </div>

          
          <div className="flex flex-col gap-4 justify-center items-center">
          <button type="button" className="bg-custom-red text-white border-solid border-[1px] font-bold border-red-700 py-2 px-3 rounded-lg">
            Je visualise ma recette
          </button>
          <button type="submit" className="btn-submit bg-red-400 text-white border-solid border-[1px] font-bold border-red-400 px-3 py-2 rounded-lg" disabled={loading}>
            
            {loading ? "Envoi..." : "Envoyer ma recette"}

          </button>
          </div>

          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SuggestRecipe;
