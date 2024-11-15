import React, { useState, useEffect } from "react";
import Background from "../../assets/recettes/background.svg";
import useSuggestRecipe from "../../hooks/recipes/useSuggestRecipe";
import Spinner from "../composants/Spinner";
import RecipeModal from "../composants/RecipeModal";
import AlertComponent from "../composants/AlertComponent";

const SuggestRecipe = ({ onClose }) => {
  const { handleSubmit, loading, error, success } = useSuggestRecipe();
  const [stepInput, setStepInput] = useState(""); // État pour l'input des étapes
  const [modalOpen, setModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (success) {
      onClose();
    }
  }, [success, onClose]);
  const [values, setValues] = useState({
    titre: "",
    types: [],
    difficulty: "",
    filters: [],
    prep_time: "",
    cook_time: "",
    rest_time: "",
    ingredients: [],
    steps: [],
  });
  const [ingredientInput, setIngredientInput] = useState({
    name: "",
    quantity: "",
    unit: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(values);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleIngredientChange = (e) => {
    const { name, value } = e.target;
    setIngredientInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addIngredient = () => {
    if (ingredientInput.name && ingredientInput.quantity) {
      setValues((prevValues) => ({
        ...prevValues,
        ingredients: [...prevValues.ingredients, ingredientInput],
      }));
      setIngredientInput({ name: "", quantity: "", unit: "" }); // Réinitialiser les champs d'entrée
    } else {
      //alert("Veuillez remplir tous les champs de l'ingrédient.");
      setShowAlert(true);
    }
  };

  const removeIngredient = (indexToRemove) => {
    setValues((prevValues) => ({
      ...prevValues,
      ingredients: prevValues.ingredients.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
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
  const removeStep = (indexToRemove) => {
    setValues((prevValues) => ({
      ...prevValues,
      steps: prevValues.steps.filter((_, index) => index !== indexToRemove),
    }));
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
  const handleTypeToggle = (type) => {
    setValues((prevValues) => {
      const types = [...prevValues.types];
      if (types.includes(type)) {
        // Retirer le type s'il est déjà sélectionné
        return { ...prevValues, types: types.filter((t) => t !== type) };
      } else {
        // Ajouter le type s'il n'est pas déjà dans le tableau
        return { ...prevValues, types: [...types, type] };
      }
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
        <form onSubmit={handleFormSubmit} className="space-y-8 w-full">
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
          {/* Type de plats */}
          <div className="flex flex-col gap-2">
            <label className="text-custom-red text-base">Type de plats:</label>
            <div className="space-x-2 space-y-2">
              {["Entrée", "Plat", "Dessert", "Apéritif", "Boisson"].map(
                (type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleTypeToggle(type)}
                    className={`border-solid border-[1px] border-red-700 px-3 py-1 rounded-full ${
                      values.types.includes(type)
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
            <label className="text-custom-red text-base">Régimes:</label>
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
          {/* Temps de préparation */}
          <div className="flex flex-col gap-3">
            <label className="text-custom-red text-base">
              Temps de préparation (en min) :
            </label>
            <input
              type="number"
              name="prep_time"
              min="0"
              max="120"
              step="1"
              value={values.prep_time}
              onChange={handleInputChange}
              className={`input border-2 p-2 rounded-xl focus:outline-none ${
                error?.prep_time
                  ? "border-orange-300"
                  : "border-red-500 focus:border-orange-500"
              }`}
              required
            />
            {error?.prep_time && (
              <p className="text-red-500 text-sm mt-1">{error.prep_time[0]}</p>
            )}
          </div>

          {/* Temps de cuisson */}
          <div className="flex flex-col gap-3">
            <label className="text-custom-red text-base">
              Temps de cuisson (en min) :
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
            <label className="text-custom-red text-base">
              Temps de repos (en min) :
            </label>
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
          <div className="flex flex-col gap-3">
            <label className="text-custom-red text-base ">
              Temps total (en min) :{" "}
              {Number(values.cook_time) +
                Number(values.prep_time) +
                Number(values.rest_time) >
              0 ? (
                <span className="font-bold">
                  {" "}
                  {Number(values.cook_time) +
                    Number(values.prep_time) +
                    Number(values.rest_time)}
                </span>
              ) : (
                ""
              )}
            </label>
          </div>

          {/* Ingrédients */}
          <div className="flex flex-col gap-3 justify-center items-start">
            <label className="text-custom-red text-base">Ingrédients:</label>
            <div className="flex flex-row gap-2 w-full">
              <input
                type="number"
                name="quantity"
                value={ingredientInput.quantity}
                onChange={handleIngredientChange}
                placeholder="Quantité"
                className={`input border-2 p-2 rounded-xl focus:outline-none w-1/4 ${
                  error?.ingredients
                    ? "border-orange-300"
                    : "border-red-500 focus:border-orange-500"
                }`}
              />
              <input
                type="text"
                name="unit"
                value={ingredientInput.unit}
                onChange={handleIngredientChange}
                placeholder="Unité"
                className={`input border-2 p-2 rounded-xl focus:outline-none w-1/4 ${
                  error?.ingredients
                    ? "border-orange-300"
                    : "border-red-500 focus:border-orange-500"
                }`}
              />
              <input
                type="text"
                name="name"
                value={ingredientInput.name}
                onChange={handleIngredientChange}
                placeholder="Nom de l'ingrédient"
                className={`input border-2 p-2 rounded-xl focus:outline-none w-2/4 ${
                  error?.ingredients
                    ? "border-orange-300"
                    : "border-red-500 focus:border-orange-500"
                }`}
              />
            </div>
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
                  className="bg-white text-red-800 py-1 px-2 rounded-full m-1 border-[1px] border-custom-red cursor-pointer"
                  onClick={() => removeIngredient(index)} // Permet la suppression au clic
                >
                  {ingredient.quantity}
                  {ingredient.unit} - {ingredient.name}
                </span>
              ))}
            </div>
          </div>
          {/* Étapes */}
          <div className="flex flex-col gap-3 justify-center items-start">
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
            <div className="mt-3 flex flex-wrap gap-1 w-full">
              {values.steps.map((step, index) => (
                <span
                  key={index}
                  className="bg-white text-red-800 py-1 px-2 rounded-full m-1 border-[1px] border-custom-red"
                  onClick={() => removeStep(index)}
                >
                  Étape {index + 1}: {step}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 justify-center items-center">
            <button
              type="button"
              onClick={() => setModalOpen(true)} // Ouvrir le modal
              className="btn bg-custom-red text-white border-solid border-[1px] font-bold border-red-400 px-3 py-2 rounded-lg"
            >
              Je visualise ma recette
            </button>
            <button
              type="submit"
              className="btn-submit bg-[#fad4ce] text-red-700 border-solid border-[1px] font-bold border-[#fad4ce] px-3 py-2 rounded-lg"
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
      {/* Afficher le modal avec les détails de la recette */}
      <RecipeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        recipe={values}
      />

      {/* Utilisation de AlertComponent */}
      <AlertComponent
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        header="Erreur"
        message="Veuillez remplir tous les champs de l'ingrédient."
      />
    </div>
  );
};

export default SuggestRecipe;
