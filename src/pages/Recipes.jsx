import React, { useState, useEffect } from "react";
import { IonButton, IonInput, IonIcon, IonContent } from "@ionic/react";
import {
  chevronBackOutline,
  chevronForwardOutline,
  closeCircleOutline,
  searchOutline,
} from "ionicons/icons";
import { EmptyState } from "../composants/recettes/ui/EmptyState";
import { ErrorState } from "../composants/ui/ErrorState";
import Item from "../composants/recettes/ui/Item";
import LoadingState from "../composants/recettes/ui/LoadingState";
import useLastRecipes from "../hooks/recipes/useRecipesLast";
import { createRecipe } from "../utils/createRecipe";
import TapLayout from "../composants/layout/TapLyout";
import flecheRecette from "../assets/recettes/fleche.svg";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { getPreferences } from "../hooks/useCapacitorStorage";
import { useGlobalTabsContext } from "../context/useTabsContext";
import WhiteModal from "../composants/modales/WhiteModal";
import SuggestRecipe from "../composants/recettes/SuggestRecipe";
import ModalPage from "../composants/modales/ModalPage";
import RecipeDetails from "../composants/recettes/RecipeDetails";

function Recipes() {
  const [regimePreferences, setRegimePreferences] = useState(null);
  const [allergenPreferences, setAllergenPreferences] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showModalAddRecipe, setShowModalAddRecipe] = useState(false);
  const [showModalRecipe, setShowModalRecipe] = useState(false);
  const [selectedRecette, setSelectedRecette] = useState(null);

  const { recipes, loading, error } = useLastRecipes(
    regimePreferences,
    allergenPreferences,
    searchTerm,
    search
  );
  const handleRecetteClick = (recipe) => {
    setSelectedRecette(recipe);
    setShowModalRecipe(true);
  };

  const authUser = useAuthUser();
  const userId = authUser?.id;
  const { showInput, setShowInput } = useGlobalTabsContext();

  const recipeList = Array.isArray(recipes)
    ? recipes.map((recipe) => createRecipe(recipe))
    : [];

  const paginatedRecipes = (() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return recipeList.slice(startIndex, startIndex + itemsPerPage);
  })();

  const totalPages = Math.ceil(recipeList.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [recipes]);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const storedPreferences = await getPreferences(userId);
        setRegimePreferences([...storedPreferences.regime]);
        setAllergenPreferences([...storedPreferences.allergen]);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des préférences :",
          error
        );
      }
    };

    fetchPreferences();
  }, [userId]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };
  const handleClose = (vale) => {
    setSearchTerm("");
  };

  return (
    <TapLayout icon={flecheRecette} filter={1}>
      <div className="details flex flex-col h-full bg-[#fdf2f0]">
        {/* Header */}
        <div className="h-24 pb-4 pt-1  bg-white">
          <div className="flex flex-col items-center justify-center h-5/6 max-h-28 min-h-20 backgroundRecette">
            <h2 className="text-center text-custom-red text-2xl font-bold"></h2>
          </div>
        </div>

        {/* Barre de recherche */}
        {showInput && (
          <div className="px-4 py-2 bg-white flex items-center gap-2">
            <IonInput
              type="text"
              placeholder="Rechercher une recette..."
              aria-label="Rechercher une recette"
              className="flex-1 px-2 text-sm"
              color="danger"
              value={searchTerm}
              onIonChange={(e) => handleSearch(e.detail.value)}
              debounce={500}
            />

            <IonButton
              fill="clear"
              className="p-0 m-0"
              onClick={() => {
                setSearch(!search);
              }}
            >
              <IonIcon
                icon={searchOutline}
                className="h-6 w-6 text-custom-red"
              />
            </IonButton>
          </div>
        )}

        {/* Liste des recettes */}
        <IonContent className="flex-1 bg-white rounded-b-[2rem] overflow-hidden">
          <div className="flex flex-col w-full px-4 pb-4 overflow-auto rounded-b-[2rem]">
            {loading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState message={error} />
            ) : paginatedRecipes.length > 0 ? (
              paginatedRecipes.map((recipe, index) => (
                <Item
                  key={recipe.id}
                  recipe={recipe}
                  index={index}
                  length={paginatedRecipes.length}
                  OpenFb={() => handleRecetteClick(recipe)}
                />
              ))
            ) : (
              <EmptyState />
            )}
          </div>
        </IonContent>

        {/* Pagination & Bouton Ajouter */}
        <div className="py-4 flex flex-col items-center ">
          {totalPages > 1 && (
            <div className="flex items-center space-x-4">
              <IonButton
                fill="clear"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <IonIcon icon={chevronBackOutline} />
              </IonButton>
              <span className="text-custom-red font-medium">
                Page {currentPage} sur {totalPages}
              </span>
              <IonButton
                fill="clear"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <IonIcon icon={chevronForwardOutline} />
              </IonButton>
            </div>
          )}

          <button
            type="button"
            className="mt-4 text-white bg-custom-red font-bold px-4 py-2 rounded-lg hover:bg-red-500 text-lg"
            onClick={() => setShowModalAddRecipe(true)}
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

      <ModalPage
        isOpen={showModalRecipe}
        onClose={() => setShowModalRecipe(false)}
        image="rf"
      >
        <RecipeDetails recipe={selectedRecette} />
      </ModalPage>
    </TapLayout>
  );
}

export default React.memo(Recipes);
