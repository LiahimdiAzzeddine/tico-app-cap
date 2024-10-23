import React from "react";
import { Route } from "react-router-dom";
import ScanPage from "../view/pages/ScanPage";
import HomeLyout from "../view/layout/HomeLyout";
import HomePage from "../view/pages/HomePage";
import ScannerLyout from "../view/layout/ScannerLyout"
import FavoritesPage from "../view/pages/FavoritesPage";
import TipsPage from "../view/pages/TipsPage";
import ProfilePage from "../view/pages/ProfilePage";
import Login from "../view/auth/login";
import AccountCreationForm from "../view/auth/Register";
import AuthLayout from "../view/layout/AuthLyout";
import FbPage from "../view/pages/FbPage";
const HomepublicRoutes = [
  <Route key="auth-outlet" >
    <Route key="scannerlyout" path="/scanner" element={<ScannerLyout />}>
      <Route index element={<ScanPage />} />
    </Route>
    <Route key="homeLyout" path="/" element={<HomeLyout />}>
    <Route path="home" element={<HomePage />} />
    <Route path="favoris" element={<FavoritesPage />} />
    <Route path="tips" element={<TipsPage />} />
    <Route path="profile" element={<ProfilePage />} />
    
    </Route>
    <Route key="authlyout" path="/" element={<AuthLayout />}>
    <Route path="login" element={<Login />} />
    <Route path="/fiche-produit/:barcode" element={<FbPage />} /> {/* Route pour la fiche produit */}

    </Route>
  </Route>,
];

export default HomepublicRoutes;
