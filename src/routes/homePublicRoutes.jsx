import React from "react";
import { Route } from "react-router-dom";
import ScanPage from "../view/pages/ScanPage";
import HomeLyout from "../view/layout/homeLyout";
import HomePage from "../view/pages/HomePage";

const HomepublicRoutes = [
  <Route key="auth-outlet" >
    <Route key="homeLyout" path="/" element={<HomeLyout />}>
      <Route path="home" element={<HomePage />} />
    </Route>
    <Route path="scanner" element={<ScanPage />} />
  </Route>,
];

export default HomepublicRoutes;
