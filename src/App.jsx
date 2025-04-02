import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import Favorite from "./pages/Favorite";
import Welcome from "./pages/Welcome";
import Settings from "./pages/settings";
import Login from "./composants/auth/login";
import AccountCreationForm from "./composants/auth/Register";
import AuthLayout from "./composants/layout/AuthLyout";
import LaterProducts from "./pages/LaterProducts";
import SimpleLyout from "./composants/layout/SimpleLyout";
import { App as CapacitorApp } from "@capacitor/app";
import { ScreenOrientation } from "@capacitor/screen-orientation";
import { useAlert } from "./context/AlertProvider";
import ChangePassword from "./composants/settings/ChangePassword";
import Recette from "./pages/recette";
import Tip from "./pages/Tip";
import Fp from "./pages/fp";
import ValidationEmail from "./pages/ValidationEmail";
import { useIonRouter } from "@ionic/react";
import History from "./composants/history/History";
import FirstVisitGuard from "./guards/FirstVisitGuard";
import Recipes from "./pages/Recipes";
import Tips from "./pages/Tips";
import flecheRecette from "./assets/recettes/fleche.svg";
import OF from "./assets/tips/OFleche.svg";
import ReturnImage from "./assets/fb/flech.svg";
import Home from "./pages/Home";
import HelpTiCO from "./pages/HelpTiCO";
import Scanner from "./pages/Scanner";
import MesDemandes from "./pages/MesDemandes";
import HomeOrTutorial from "./guards/HomeOrTutorial";
import Mission from "./pages/Mission";
import Demande from "./pages/Demande";

function App() {
  const { triggerAlert } = useAlert();
  const history = useIonRouter();
  const goToPage = (path) => {
    history.push(path, "root", "replace");
  };
  const goToSubPage = (path) => {
    history.push(path, "forward", "push");
  };

  useEffect(() => {
    const handleAppUrlOpen = (data) => {
      if (!data?.url) return;
      const { url } = data;
      // Gestion des URL Stripe
      if (url.includes("tico.foodhea.com/stripe/success")) {
        return triggerAlert(
          "Paiement réussi ! Merci pour votre donation.",
          "Confirmation",
          null,
          "ios",
          "",
          "De rien",
          true
        );
      }
      if (url.includes("tico.foodhea.com/stripe/cancel")) {
        return triggerAlert(
          "Paiement annulé. Merci d'avoir essayé, vous pouvez réessayer à tout moment.",
          "Annulation",
          null,
          "ios",
          "",
          "D'accord",
          true
        );
      }

      // Gestion des routes sous "tico.foodhea.com/tico"
      if (url.includes("tico.foodhea.com/tico")) {
        const slug = url.split("tico.foodhea.com/tico").pop() || "/tab3";
        if (slug === "/login") {
          return triggerAlert(
            "Félicitations, vous avez validé votre inscription !",
            "Validation",
            () => goToPage("/login"),
            "ios",
            "Se connecter"
          );
        }

        return goToPage(slug);
      }

      // URL non reconnues sous "tico.foodhea.com"
      if (url.includes("tico.foodhea.com")) {
        return goToPage("/tab3");
      }

      console.error("Erreur : URL non valide.");
    };

    const appUrlListener = CapacitorApp.addListener(
      "appUrlOpen",
      handleAppUrlOpen
    );

    // Verrouiller l'orientation en mode portrait
    ScreenOrientation.lock({ orientation: "portrait" });

    // Nettoyage à la destruction du composant
    return () => {
      appUrlListener.remove();
    };
  }, []);

  return (
    <IonRouterOutlet swipeGesture={true} animated={true} id="main">
      <Route exact path="/welcome" component={Welcome} />
      <Route exact path="/login">
        <AuthLayout
          image="bx"
          Close={() => {
            goToPage("/tab3");
          }}
        >
          <Login createCompte={true} redirection={() => goToPage("/tab3")} />
        </AuthLayout>
      </Route>
      <Route path="/change_password" exact={true}>
        <AuthLayout
          image="bx"
          Close={() => {
            goToPage("/tab3");
          }}
        >
          <ChangePassword />
        </AuthLayout>
      </Route>
      <Route path="/signup" exact={true}>
        <AuthLayout
          Close={() => {
            history.goBack();
          }}
          image="bf"
        >
          <AccountCreationForm />
        </AuthLayout>
      </Route>
      <Route path="/validation/:token" exact={true}>
        <SimpleLyout
          image={ReturnImage}
          Close={() => {
            goToPage("/tab3");
          }}
        >
          <ValidationEmail />
        </SimpleLyout>
      </Route>
      <Route exact path="/tab1" component={Home} />
      <Route exact path="/tab2" component={HelpTiCO} />
      <Route exact path="/tab3" component={Scanner} />
      <Route exact path="/tab4" component={Recipes} />
      <Route exact path="/tab5" component={Tips} />
      <Route exact path="/laterProducts" component={LaterProducts} />
      <Route exact path="/mesDemandes" component={MesDemandes} />
      <Route exact path="/mesDemandes/:id" component={Demande} />
      <Route exact path="/history" component={History} />
      <Route exact path="/mission" component={Mission} />
      <Route exact path="/recipe/:id">
        <SimpleLyout
          bgHeader="#fad4ce"
          bgcontent="#fdf2f0"
          image={flecheRecette}
          Close={() => {
            goToPage("/tab3");
          }}
        >
          <Recette />
        </SimpleLyout>
      </Route>
      <Route path="/tip/:id" exact={true}>
        <SimpleLyout
          bgHeader="#ffeda3"
          bgcontent="#ffeda3"
          image={OF}
          Close={() => {
            goToPage("/tab3");
          }}
        >
          <Tip />
        </SimpleLyout>
      </Route>
      <Route exact path="/favorite" component={Favorite} />
      <Route exact path="/settings" component={Settings} />

      <Route path="/fp/:gtin" exact={true}>
        <SimpleLyout
          image={ReturnImage}
          Close={() => {
            goToPage("/tab3");
          }}
        >
          <Fp />
        </SimpleLyout>
      </Route>
      <Route path="/" component={HomeOrTutorial} exact />
    </IonRouterOutlet>
  );
}

export default App;
