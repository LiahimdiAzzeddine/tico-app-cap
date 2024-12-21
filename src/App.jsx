import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import HelpTiCO from "./pages/HelpTiCO";
import Scanner from "./pages/Scanner";
import Recipes from "./pages/Recipes";
import Tips from "./pages/Tips";
import Welcome from "./pages/Welcome";
import Settings from "./pages/settings";
import Login from "./composants/auth/login";
import AccountCreationForm from "./composants/auth/Register";
import HomeLayout from "./composants/layout/HomeLyout";
import AuthLayout from "./composants/layout/AuthLyout";
import LaterProducts from "./pages/LaterProducts";
import SimpleLyout from "./composants/layout/SimpleLyout";
import RequireNoAuth from "./guards/RequireNoAuth";
import { App as CapacitorApp } from "@capacitor/app";
import { useHistory } from "react-router-dom";
import { ScreenOrientation } from "@capacitor/screen-orientation";
import { useAlert } from "./context/AlertProvider";
import ChangePassword from "./composants/settings/ChangePassword";
import Recette from "./pages/recette";
import Tip from "./pages/Tip";
import Fp from "./pages/fp";
import ValidationEmail from "./pages/ValidationEmail";

function App() {
  const history = useHistory();
  const { triggerAlert } = useAlert();
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
        const slug = url.split("tico.foodhea.com/tico").pop() || "/scanner";
        if (slug === "/login") {
          return triggerAlert(
            "Félicitations, vous avez validé votre inscription !",
            "Validation",
            () => history.replace("/login"),
            "ios",
            "Se connecter"
          );
        }

        return history.replace(slug);
      }

      // URL non reconnues sous "tico.foodhea.com"
      if (url.includes("tico.foodhea.com")) {
        return history.replace("/scanner");
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
    <IonRouterOutlet swipeGesture={true} animated={true}>
      <Route exact path="/welcome" component={Welcome} />
      <Route path="/home" exact={true}>
        <RequireNoAuth>
          <HomeLayout>
            <Home />
          </HomeLayout>
        </RequireNoAuth>
      </Route>
      <Route path="/helptico" exact={true}>
        <HomeLayout>
          <HelpTiCO />
        </HomeLayout>
      </Route>
      <Route path="/recipes" exact={true}>
        <Recipes />
      </Route>
      <Route path="/recipe/:id" exact={true}>
        <SimpleLyout
          bgHeader="#fad4ce"
          bgcontent="#fdf2f0"
          image={"rf"}
          Close={() => {
            history.replace("/scanner");
          }}
        >
          <Recette />
        </SimpleLyout>
      </Route>
      <Route path="/validation/:token" exact={true}>
        <SimpleLyout
          image="bx"
          Close={() => {
            history.replace("/scanner");
          }}
        >
          <ValidationEmail />
        </SimpleLyout>
      </Route>
      <Route exact path="/tips" component={Tips} />
      <Route path="/tip/:id" exact={true}>
        <SimpleLyout
          bgHeader="#ffeda3"
          bgcontent="#ffeda3"
          image="of"
          Close={() => {
            history.replace("/scanner");
          }}
        >
          <Tip />
        </SimpleLyout>
      </Route>
      <Route exact path="/favorite" component={Favorite} />
      <Route exact path="/scanner" component={Scanner} />
      <Route exact path="/settings" component={Settings} />
      <Route path="/laterProducts" exact={true}>
        <SimpleLyout
          Close={() => {
            history.goBack();
          }}
          image="vf"
        >
          <LaterProducts />
        </SimpleLyout>
      </Route>
      <Route path="/login" exact={true}>
        <AuthLayout>
          <Login createCompte={true} redirection={() => history.replace("/scanner")} />
        </AuthLayout>
      </Route>
      <Route path="/change_password" exact={true}>
        <AuthLayout>
          <ChangePassword />
        </AuthLayout>
      </Route>
      <Route path="/signup" exact={true}>
        <AuthLayout>
          <AccountCreationForm />
        </AuthLayout>
      </Route>
      <Route path="/fp/:gtin" exact={true}>
        <SimpleLyout
          Close={() => {
            history.replace("/scanner");
          }}
        >
          <Fp />
        </SimpleLyout>
      </Route>

      <Redirect exact from="/" to="/scanner" />
    </IonRouterOutlet>
  );
}

export default App;
