import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import {IonRouterOutlet } from "@ionic/react";
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

function App() { 
  const history = useHistory();
  const { triggerAlert } = useAlert();
  useEffect(() => {
    const appUrlListener = CapacitorApp.addListener("appUrlOpen", (data) => {
      console.log("App opened with URL:", data.url);
  
      if (data.url) {
        // Extraire la partie de l'URL après `tico://com.tico.app/`
        const path = data.url.split("tico://com.tico.app/")[1];
  
        if (path) {
          const [route, queryString] = path.split("?"); // Sépare la route et les paramètres de la requête
          console.log("Redirecting to route:", route);
  
          // Analyser les paramètres de la chaîne de requête
          const params = new URLSearchParams(queryString);
          const email = params.get("email");
          const token = params.get("token");
  
          console.log("Extracted email:", email);
          console.log("Extracted token:", token);
  
          // Gérer différentes routes
          if (route === "login") {
            triggerAlert(
              "Félicitations, vous avez validé votre inscription !",
              "Validation",
              () => {
                history.replace("/login"); // Redirection vers la route "login"
              },
              "ios",
              "Se connecter"
            );
          } else if (route === "password_resets/email") {
            // Traiter la réinitialisation du mot de passe avec email et token
            if (email && token) {
              console.log("Handling password reset with email and token");
              history.replace(`/change_password?email=${email}&token=${token}`);
            } else {
              console.error("Missing email or token in the URL.");
            }
          }
        }
      }
    });

    // Verrouiller l'orientation en mode portrait
    ScreenOrientation.lock({ orientation: "portrait" });

    // Nettoyage à la destruction du composant
    return () => {
      appUrlListener.remove(); // Supprimer le listener pour éviter les fuites de mémoire
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
      <Route exact path="/tips" component={Tips} />
      <Route exact path="/favorite" component={Favorite} />
      <Route exact path="/scanner" component={Scanner} />
      <Route exact path="/settings" component={Settings} />
      <Route path="/laterProducts" exact={true}>
        <SimpleLyout>
          <LaterProducts />
        </SimpleLyout>
      </Route>
      <Route path="/login" exact={true}>
        <AuthLayout>
          <Login createCompte={true} />
        </AuthLayout>
      </Route>
      <Route path="/change_password" exact={true}>
        <AuthLayout>
          <ChangePassword/>
        </AuthLayout>
      </Route>
      <Route path="/signup" exact={true}>
        <AuthLayout>
          <AccountCreationForm />
        </AuthLayout>
      </Route>
      <Redirect exact from="/" to="/scanner" />
    </IonRouterOutlet>
  );
}

export default App;
