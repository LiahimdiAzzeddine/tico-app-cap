import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";


const RequireNoAuth = ({ redirectTo = "/home" }) => {
  const isAuthenticated = useIsAuthenticated();

  console.log("🚀 ~ RequireNoAuth ~ isAuthenticated:", isAuthenticated)

  return isAuthenticated ? <Navigate to={redirectTo} replace /> : <Outlet />;
};

export default RequireNoAuth;
