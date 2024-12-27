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
import Tabs from "./composants/Tabs";
import History from "./composants/history/History";
import FirstVisitGuard from "./guards/FirstVisitGuard";

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
        const slug = url.split("tico.foodhea.com/tico").pop() || "/tabs";
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
        return goToPage("/tabs");
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
      <Route exact path="/login">
        <AuthLayout
          image="bx"
          Close={() => {
            goToPage("/tabs");
          }}
        >
          <Login createCompte={true} redirection={() => goToPage("/tabs")} />
        </AuthLayout>
      </Route>
      <Route path="/change_password" exact={true}>
        <AuthLayout
          image="bx"
          Close={() => {
            goToPage("/tabs");
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
            image="bx"
            Close={() => {
              goToPage("/tabs");
            }}
          >
            <ValidationEmail />
          </SimpleLyout>
        </Route>
        <Route path="/tabs" component={Tabs} />
        <Route exact path="/recipe/:id" >
          <SimpleLyout
            bgHeader="#fad4ce"
            bgcontent="#fdf2f0"
            image={"rf"}
            Close={() => {
              goToPage("/tabs");
            }}
          >
            <Recette />
          </SimpleLyout>
        </Route>
        <Route path="/tip/:id" exact={true}>
          <SimpleLyout
            bgHeader="#ffeda3"
            bgcontent="#ffeda3"
            image="ox"
            Close={() => {
              goToPage("/tabs");
            }}
          >
            <Tip />
          </SimpleLyout>
        </Route>
        <Route exact path="/favorite" component={Favorite} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/laterProducts" >
          <SimpleLyout
            Close={() => {
              history.goBack();
            }}
            image="vf"
          >
            <LaterProducts />
          </SimpleLyout>
        </Route>
        <Route path="/history" exact={true}>
          <SimpleLyout
            Close={() => {
              history.goBack();
            }}
            image="vf"
          >
            <History />
          </SimpleLyout>
        </Route>
        <Route path="/fp/:gtin" exact={true}>
          <SimpleLyout
            Close={() => {
              goToPage("/tabs");
            }}
          >
            <Fp />
          </SimpleLyout>
        </Route>
        <Redirect exact from="/" to="/tabs" />
      
    </IonRouterOutlet>
  );
}

export default App;
