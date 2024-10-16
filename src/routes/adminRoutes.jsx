import React from "react";
import { Route } from "react-router-dom";
import Dlayout from "../components/Dashboard/Dlayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Users from "../pages/Dashboard/Users";
import Profile from "../pages/Dashboard/Profile";
import RequirePermission from "../components/RequirePermission";

const PERMISSIONS = {
  ManageUsers: "manage-users",
};

const adminRoutes = [
  <Route key="admin-layout" path="/admin" element={<Dlayout />}>
    <Route path="dashboard" element={<Dashboard />} />
    <Route
      path="users"
      element={
        <RequirePermission allowedPermissions={[PERMISSIONS.ManageUsers]}>
          <Users />
        </RequirePermission>
      }
    />
    <Route path="profile" element={<Profile />} />
  </Route>
];

export default adminRoutes;
