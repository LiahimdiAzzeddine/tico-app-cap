import React from "react";
import useRecipeById from "../hooks/recipes/useRecipeById";
import { useParams } from "react-router-dom";
import Spinner from "../composants/Spinner";
import { ErrorMessage } from "../composants/scanner/UI/ErrorMessage";
import { alertCircle } from "ionicons/icons";
import { useIonRouter } from "@ionic/react";
import { IonContent } from "@ionic/react";
import { createRecipe } from "../utils/createRecipe";
import RecipeDetails from "../composants/recettes/RecipeDetails";
import FirstVisitGuard from "../guards/FirstVisitGuard";

const Recette = () => {
    const { id } = useParams();
    const history = useIonRouter();
    const { recipe, loading, error } = useRecipeById(id);
    const recipeForme=recipe?createRecipe(recipe):{};
    const goToPage = (path) => {
      history.push(path, "root", "replace");
    };
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
          onClose={() => goToPage("/tab3")}
        />
      </IonContent>
    );
  }
  
    return (
   
        <RecipeDetails  recipe={recipeForme} />
       
    );
}

export default Recette