import React from "react";
import { Route } from "react-router-dom"; // Utiliser Route de React Router v5
import WelcomePage from "../view/pages/WelcomePage";
import IndexPage from "../view/pages/IndexPage";
import FirstVisitGuard from "../guards/FirstVisitGuard";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import RequireNoAuth from "../guards/RequireNoAuth"; // Importer le nouveau RequireNoAuth
import Settings from "../view/settings/settings";
import HomeLayout from "../view/layout/HomeLyout";
import ScannerLyout from "../view/layout/ScannerLyout";
import ScanPage from "../view/pages/ScanPage";
import TapLayout from "../view/layout/TapLyout";
import RecipesPage from "../view/pages/RecipesPage";
import TipsPage from "../view/pages/TipsPage";
import Login from "../view/auth/login";
import AccountCreationForm from "../view/auth/Register";
import AuthLayout from "../view/layout/AuthLyout";

const publicRoutes = [
  <Route key="layout" path="/" exact>
    <FirstVisitGuard>
      <HomeLayout>
        <Route path="/" exact component={IndexPage} />
      </HomeLayout>
    </FirstVisitGuard>
  </Route>,

  <Route
    key="require-no-auth"
    path="/require-no-auth"
    render={() => <RequireNoAuth redirectTo="/home" />}
  />,

  <Route key="welcome" path="/welcome" component={WelcomePage} />,
  <Route key="settings" path="/settings" component={Settings} />,

  <Route
    key="scanner-layout"
    path="/scanner"
    render={() => (
      <ScannerLyout>
        <ScanPage />
      </ScannerLyout>
    )}
  />,
  <Route key="recipes-layout">
    <TapLayout>
      <Route key="recipes" path="/recipes" component={RecipesPage} />
      <Route key="tips" path="/tips" component={TipsPage} />
    </TapLayout>
  </Route>,
  <Route key="auth-layout">
    <AuthLayout>
      <Route key="login" path="/login" component={Login} />
      <Route key="signup" path="/signup" component={AccountCreationForm} />
    </AuthLayout>
  </Route>,
];

export default publicRoutes;
