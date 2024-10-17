import React from "react";
import { Route } from "react-router-dom";
import ScanPage from "../view/pages/ScanPage";
import HomeLyout from "../view/layout/homeLyout";
import HomePage from "../view/pages/HomePage";
import ScannerLyout from "../view/layout/ScannerLyout"
const HomepublicRoutes = [
  <Route key="auth-outlet" >
    <Route key="scannerlyout" path="/scanner" element={<ScannerLyout />}>
      <Route index element={<ScanPage />} />
    </Route>
    <Route key="homeLyout" path="/" element={<HomeLyout />}>
    <Route path="home" element={<HomePage />} />
    </Route>
  </Route>,
];

export default HomepublicRoutes;
