import React from "react";
import { Redirect } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

const RequireNoAuth = ({ redirectTo = "/home", children }) => {
  const isAuthenticated = useIsAuthenticated();

  // Si l'utilisateur est authentifié, rediriger vers le chemin spécifié
  if (isAuthenticated) {
    return <Redirect to={redirectTo} />;
  }

  // Si l'utilisateur n'est pas authentifié, rendre les enfants
  return children;
};

export default RequireNoAuth;
