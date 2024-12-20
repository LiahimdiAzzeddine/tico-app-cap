import React from "react";
import useRecipeById from "../hooks/recipes/useRecipeById";
import { useParams } from "react-router-dom";
import Spinner from "../composants/Spinner";
import { ErrorMessage } from "../composants/scanner/UI/ErrorMessage";
import { alertCircle } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { IonContent } from "@ionic/react";
import { createRecipe } from "../utils/createRecipe";
import RecipeDetails from "../composants/recettes/RecipeDetails";
import FirstVisitGuard from "../guards/FirstVisitGuard";

const Recette = () => {
    const { id } = useParams();
    const history = useHistory();
    const { recipe, loading, error } = useRecipeById(id);
    const recipeForme=recipe?createRecipe(recipe):{};

    if (loading) {
      return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <Spinner />
      </div>
      );
    }
  
   // Gestion des erreurs de chargement
  if (error || !recipe) {
    return (
      <IonContent className="ion-padding-bottom">
        <ErrorMessage
          message={error || "No recipe found"}
          icon={alertCircle}
          onClose={() => history.recipe("/scanner")}
        />
      </IonContent>
    );
  }
  
    return (
      <FirstVisitGuard>
        <RecipeDetails  recipe={recipeForme} />
        </FirstVisitGuard>
    );
}

export default Recette