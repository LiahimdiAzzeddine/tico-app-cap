import React from "react";
import { Route } from "react-router-dom";
import WelcomePage from "../view/pages/WelcomePage";
import LoginPage from "../view/pages/LoginPage";
import FirstVisitGuard from "../guards/FirstVisitGuard";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import RequireNoAuth from "../guards/RequireNoAuth"; // Import the new RequireNoAuth component
import Settings from "../view/settings/settings";

const publicRoutes = [
  <Route key="layout" path="/">
    <Route key="require-no-auth" element={<RequireNoAuth redirectTo="/home" />}>
    <Route key="layout" element={<FirstVisitGuard />} >
        <Route index element={<LoginPage />} />
        </Route>
    </Route>
    <Route path="welcome" element={<WelcomePage />} />
    <Route path="settings" element={<Settings/>} />
  </Route>,
];

export default publicRoutes;
