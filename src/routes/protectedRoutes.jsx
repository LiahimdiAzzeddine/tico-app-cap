import React from "react";
import { Route } from "react-router-dom";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import Favorie from "../pages/Favorie";
import Conseil from "../pages/Conseil";
import Recette from "../pages/Recette";
import UserInfo from "../pages/user/UserInfo";
import EditUserDetails from "../pages/user/EditUserDetails";
import Layout from "../components/Layout";

const protectedRoutes = [
  <Route key="auth-outlet" element={<AuthOutlet fallbackPath="/login" />}>
    <Route key="layout" path="/" element={<Layout />}>
      <Route path="favorie" element={<Favorie />} />
      <Route path="conseil" element={<Conseil />} />
      <Route path="recette" element={<Recette />} />
      <Route path="user-info" element={<UserInfo />} />
      <Route path="edit-user" element={<EditUserDetails />} />
    </Route>
  </Route>,
];

export default protectedRoutes;
