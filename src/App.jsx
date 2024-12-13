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
import { StatusBar } from "@capacitor/status-bar";


function App() {
  const history = useHistory();
  const { triggerAlert } = useAlert();
  useEffect(() => {
    const appUrlListener = CapacitorApp.addListener("appUrlOpen", (data) => {
      if (data?.url) {
        console.log("URL reçue :", data.url);
  
        // Extraire le slug depuis l'URL (partie après ".app")
        const slug = data.url.split(".tico").pop();
        console.log("Slug détecté :", slug);
  
        if (slug) {
          // Gestion des différentes routes à partir du slug
          if (slug === "/login") {
            triggerAlert(
              "Félicitations, vous avez validé votre inscription !",
              "Validation",
              () => {
                history.replace("/login"); // Rediriger vers la route "login"
              },
              "ios",
              "Se connecter"
            );
          } else {
            // Rediriger vers d'autres routes
            history.replace(slug);
          }
        } else {
          console.error("Erreur : slug manquant.");
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
        <SimpleLyout Close={() => {history.goBack()}}>
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
          <Fp/>
        </SimpleLyout>
      </Route>

      <Redirect exact from="/" to="/scanner" />
    </IonRouterOutlet>
  );
}

export default App;
