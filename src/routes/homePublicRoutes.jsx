import React from "react";
import { Route } from "react-router-dom"; // React Router v5
import ScanPage from "../view/pages/ScanPage";
import HomeLyout from "../view/layout/HomeLyout";
import HomePage from "../view/pages/HomePage";
import ScannerLyout from "../view/layout/ScannerLyout";
import FavoritesPage from "../view/pages/FavoritesPage";
import TipsPage from "../view/pages/TipsPage";
import RecipesPage from "../view/pages/RecipesPage";
import Login from "../view/auth/login";
import AccountCreationForm from "../view/auth/Register";
import AuthLayout from "../view/layout/AuthLyout";
import FbPage from "../view/pages/FbPage";
import FbLyout from "../view/layout/FbLyout";
import LaterProductsPage from "../view/pages/LaterProductsPage";
import TapLayout from "../view/layout/TapLyout";

const HomepublicRoutes = [
  // ScannerLyout avec ScanPage
  <Route key="scanner-layout" path="/scanner" render={() => (
    <ScannerLyout>
      <ScanPage />
    </ScannerLyout>
  )} />,

  // HomeLyout avec plusieurs pages
  <Route key="home-layout" exact path="/" render={() => (
    <HomeLyout>
      <Route exact path="/home" component={HomePage} />
      <Route path="/favoris" component={FavoritesPage} />
      <Route path="/laterProducts" component={LaterProductsPage} />
    </HomeLyout>
  )} />,

  // TapLayout pour recipes et tips pages
  <Route key="tap-layout" exact path="/" render={() => (
    <TapLayout>
      <Route path="/recipes" component={RecipesPage} />
      <Route path="/tips" component={TipsPage} />
    </TapLayout>
  )} />,

  // AuthLayout pour login et signup
  <Route key="auth-layout" exact path="/" render={() => (
    <AuthLayout>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={AccountCreationForm} />
    </AuthLayout>
  )} />,

  // FbLyout pour FbPage
  <Route key="fb-layout" path="/fiche-produit/:barcode" render={(props) => (
    <FbLyout>
      <FbPage {...props} />
    </FbLyout>
  )} />
];

export default HomepublicRoutes;
