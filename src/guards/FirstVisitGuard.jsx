import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom"; // Importer Redirect de v5
import { getFirstVisit } from "../hooks/useCapacitorStorage"; // Assurez-vous que le chemin est correct
import Spinner from "../composants/Spinner"; // Spinner pour le chargement

const FirstVisitGuard = ({ children }) => {
  const [isFirstVisit, setIsFirstVisit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkFirstVisit = async () => {
      try {
        const firstVisitStatus = await getFirstVisit();
        setIsFirstVisit(firstVisitStatus === null); // Détecter si c'est la première visite
      } catch (error) {
        console.error("Error checking first visit status:", error);
      } finally {
        setIsLoading(false); // Fin du chargement
      }
    };
    checkFirstVisit();
  }, []);

  // Affichage du composant de chargement pendant la vérification
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <Spinner />
      </div>
    );
  }

  // Si c'est la première visite, rediriger vers la page de bienvenue
  if (isFirstVisit) {
    return <Redirect exact to="/welcome" />;
  }

  // Si ce n'est pas la première visite, rendre les enfants (composants imbriqués)
  return children;
};

export default FirstVisitGuard;
