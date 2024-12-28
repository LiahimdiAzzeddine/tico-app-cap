import React, { useState } from "react";
import { EmptyState } from "../composants/recettes/ui/EmptyState";
import { ErrorState } from "../composants/ui/ErrorState";
import Item from "../composants/recettes/ui/Item";
import LoadingState from "../composants/recettes/ui/LoadingState"; // Assuming you can move `LoadingState` to a separate file for reusability
import useLastRecipes from "../hooks/recipes/useRecipesLast"; // Adjust path as necessary
import { createRecipe } from "../utils/createRecipe";
import WhiteModal from "../composants/modales/WhiteModal";
import SuggestRecipe from "../composants/recettes/SuggestRecipe";
import TapLayout from "../composants/layout/TapLyout";
import ModalPage from "../composants/modales/ModalPage";
import RecipeDetails from "../composants/recettes/RecipeDetails";
import { useIonRouter } from "@ionic/react";

function Recipes() {
  const ids = [];
  const { recipes, loading, error } = useLastRecipes(ids);
  const [showModalAddRecipe, setShowModalAddRecipe] = useState(false);
  const [showModalRecipe, setShowModalRecipe] = useState(false);
  const [selectedRecette, setSelectedRecette] = useState(null);
  const history = useIonRouter();
    const goToPage = (path) => {
      history.push(path, "root", "replace");
    };
    const goToSubPage = (path) => {
      history.push(path, "forward", "push");
    };
  
  const handleRecetteClick = (recipe) => {
    setSelectedRecette(recipe); // Mettez à jour l'ID de la recette sélectionnée
    setShowModalRecipe(true); // Affichez le modal
  };

  // Make sure recipes is always an array, even if it's null or undefined
  const recipeList = Array.isArray(recipes)
    ? recipes.map((recipe) => createRecipe(recipe))
    : [];
  return (
    <TapLayout>
      <div className="details h-full w-full">
        <div className="h-[17%] pb-4">
          <div
            className="flex flex-col items-center justify-center h-5/6 max-h-28 backgroundRecette"
          >
            <h2 className="text-center text-custom-red text-3xl titre-bold">
              Tit'recettes
            </h2>
          </div>
        </div>

        <div className="flex flex-col h-[83%] justify-center items-center bg-[#fad4ce] ">
          <div className="flex flex-col h-[88%] w-full px-6 rounded-b-[2rem] bg-white overflow-auto">
            {loading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState message={error} />
            ) : recipeList.length > 0 ? (
              recipeList.map((recipe, index) => (
                <Item
                  key={recipe.id} // Using the ID as the key for each item
                  recipe={recipe}
                  index={index}
                  length={recipes.length}
                  OpenFb={() => handleRecetteClick(recipe)}
                />
              ))
            ) : (
              <EmptyState />
            )}
          </div>
          <div className="h-[12%] w-full flex flex-col items-center justify-center">
            <button
              type="button"
              onClick={() => setShowModalAddRecipe(true)}
              className="text-white bg-custom-red border-solid border-[1px] font-bold border-[#fad4ce] px-3 py-2 rounded-lg hover:bg-custom-red-clear "
            >
              Proposer une recette
            </button>
          </div>
        </div>

        <WhiteModal
          isOpen={showModalAddRecipe}
          onClose={() => setShowModalAddRecipe(false)}
          image="rf"
          scroll={true}
        >
          <SuggestRecipe onClose={() => setShowModalAddRecipe(false)} />
        </WhiteModal>

        {/* Afficher le modal avec les détails de la recette */}
        
          <ModalPage
            isOpen={showModalRecipe}
            onClose={() => setShowModalRecipe(false)}
            image="rf"
          >
            <RecipeDetails recipe={selectedRecette} />
          </ModalPage>

      </div>
    </TapLayout>
  );
}

export default Recipes;