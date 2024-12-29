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
import FirstVisitGuard from "../guards/FirstVisitGuard";

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
{/**
  
  const goToPage = (path) => {
    history.push(path, path == "/tabs/tab3" ? "root" : "forward", path == "/tabs/tab3" ?"replace":"push");
  };
  */}

  const goToPage = (path) => {
    history.push(path,"root", "replace");
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
     goToPage(href);
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
        key={tab}
        href={href}
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
    <FirstVisitGuard>

    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/tab1" component={Home}/>
        <Route exact path="/tabs/tab2" component={HelpTiCO}/>
        <Route  path="/tabs/tab3" component={Scanner} />
        
        <Redirect exact from="/tabs" to="/tabs/tab3" />
        
      </IonRouterOutlet>
      {/**
      <IonTabBar
        mode="md"
        slot="bottom"
        className="flex justify-around items-center py-3 px-1 ion-no-padding min-h-16"
        style={{ background: "#ffff" }}
      >
        {renderTabButton("tab1", "/tabs/tab1", "home", "#c8efd9", true)}
        {renderTabButton("tab2", "/tabs/tab2", "help", "#d9f2f2")}
        {renderTabButton("tab3", "/tabs/tab3", "scanner", "#4b7fa9")}
        {renderTabButton("tab4", "/tab4", "recipes", "#f9d4cf", true)}
        {renderTabButton("tab5", "/tab5", "tips", "#FFECA7", true)}
      </IonTabBar>
           */}
    </IonTabs>
    </FirstVisitGuard>
  );
};

export default Tabs;
