import {
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import Home from "../pages/Home";
import HelpTiCO from "../pages/HelpTiCO";
import Scanner from "../pages/Scanner";
import Recipes from "../pages/Recipes";
import Tips from "../pages/Tips";
import HomeLayout from "./layout/HomeLyout";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useAlert } from "../context/AlertProvider";
import { useIonRouter } from "@ionic/react";

import accueil from "../assets/navbar/accueil.png";
import astuces from "../assets/navbar/astuces.png";
import scanner from "../assets/navbar/scanner.svg";
import recipes from "../assets/navbar/profil.png";
import accueil_active from "../assets/navbar/accueil_active.svg";
import favoris_active from "../assets/navbar/favoris_active.svg";
import astuces_active from "../assets/navbar/astuces_active.svg";
import recipes_active from "../assets/navbar/profil_active.svg";
import SimpleLyout from "./layout/SimpleLyout";
import Tip from "../pages/Tip";
import Recette from "../pages/recette";

const Tabs = () => {
  const isAuthenticated = useIsAuthenticated();
  const { triggerAlert } = useAlert();
  const history = useIonRouter();

  const icons = {
    home: { active: accueil_active, inactive: accueil },
    help: { active: favoris_active, inactive: favoris_active },
    scanner: { active: scanner, inactive: scanner },
    recipes: { active: recipes_active, inactive: recipes },
    tips: { active: astuces_active, inactive: astuces },
  };

  const goToPage = (path) => {
    history.push(path, "root", "push");
  };
  const goToSubPage = (path) => {
    history.push(path, "forward", "push");
  };

  const handleTabClick = (href, isAuthRequired) => {
    if (isAuthRequired && !isAuthenticated) {
      triggerAlert(
        "Vous devez être connecté pour accéder à cette fonctionnalité. Veuillez vous connecter ou créer un compte.",
        "Connexion requise",
        () => goToSubPage("/settings") // Redirection vers la page de paramètres
      );
      return false; // Empêche la navigation
    }
    return true; // Autorise la navigation
  };

  const renderTabButton = (
    tab,
    href,
    iconKey,
    color,
    isAuthRequired = false
  ) => {
    const handleClick = (e) => {
      if (!handleTabClick(href, isAuthRequired)) {
        e.preventDefault(); // Empêche la navigation si les conditions ne sont pas remplies
      }
    };
    return (
      <IonTabButton
        mode="md"
        style={{
          background: "#ffff",
          "--padding-end": "1px",
          "--padding-start": "1px",
          "--color-selected": color,
        }}
        tab={tab}
        href={!isAuthRequired ? href : isAuthenticated ? href : undefined}
        onClick={isAuthRequired && !isAuthenticated ? handleClick : undefined}
        className={
          "flex flex-col items-center " + (tab === "tab3" ? " min-w-28" : "")
        }
      >
        <img
          src={
            isAuthenticated ? icons[iconKey].active : icons[iconKey].inactive
          }
          alt={tab}
          className={"w-auto h-14"}
        />
      </IonTabButton>
    );
  };

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route  path="/tabs/tab1">
          <HomeLayout>
            <Home />
          </HomeLayout>
        </Route>
        <Route exact path="/tabs/tab2">
          <HomeLayout>
            <HelpTiCO />
          </HomeLayout>
        </Route>
        <Route  path="/tabs/tab3" component={Scanner} />
        <Route  exact path="/tabs/tab4" component={Recipes} />
        <Route exact path="/tabs/tab4/recipe/:id" >
          <SimpleLyout
            bgHeader="#fad4ce"
            bgcontent="#fdf2f0"
            image={"rf"}
            Close={() => {
              history.goBack()
            }}
          >
            <Recette />
          </SimpleLyout>
        </Route>
        <Route exact  path="/tabs/tab5" component={Tips} />
        <Route exact path="/tabs/tab5/tip/:id">
          <SimpleLyout
            bgHeader="#ffeda3"
            bgcontent="#ffeda3"
            image="of"
            Close={() => {
              history.goBack();
            }}
          >
            <Tip />
          </SimpleLyout>
        </Route>
        <Redirect exact  from="/tabs" to="/tabs/tab3" />
        
      </IonRouterOutlet>
      <IonTabBar
        mode="md"
        slot="bottom"
        className="flex justify-around items-center py-3 px-1 ion-no-padding min-h-16"
        style={{ background: "#ffff" }}
      >
        {renderTabButton("tab1", "/tabs/tab1", "home", "#c8efd9", true)}
        {renderTabButton("tab2", "/tabs/tab2", "help", "#d9f2f2")}
        {renderTabButton("tab3", "/tabs/tab3", "scanner", "#4b7fa9")}
        {renderTabButton("tab4", "/tabs/tab4", "recipes", "#f9d4cf", true)}
        {renderTabButton("tab5", "/tabs/tab5", "tips", "#FFECA7", true)}
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
