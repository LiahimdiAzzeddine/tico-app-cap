import { IonContent } from "@ionic/react";
import React from "react";
import { Navigate } from "react-router-dom"; 
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

const HomePage = () => {
  const isAuthenticated = useIsAuthenticated(); 

    // Vérifiez si l'utilisateur est authentifié

      return (
          <div>HomePage</div>
      
      );
  
  
};

export default HomePage;
