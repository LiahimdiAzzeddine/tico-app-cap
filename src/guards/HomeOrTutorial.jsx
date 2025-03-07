import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { getFirstVisit } from "../hooks/useCapacitorStorage";
import { useIonLoading } from "@ionic/react";

const HomeOrTutorial = () => {
  const [hasSeenTutorial, setHasSeenTutorial] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    const checkFirstVisit = async () => {
      await present({
        mode: "ios",
        spinner: "bubbles",
      });

      try {
        const firstVisitStatus = await getFirstVisit();
        setHasSeenTutorial(firstVisitStatus !== null);
      } catch (error) {
        console.error("Error checking first visit status:", error);
      } finally {
        await dismiss();
        setIsLoading(false);
      }
    };

    checkFirstVisit();
  }, []);

  if (isLoading) {
    return null; // Évite un rendu avant que le chargement ne soit terminé
  }

  return hasSeenTutorial ? <Redirect to="/tab3" /> : <Redirect to="/welcome" />;
};

export default HomeOrTutorial;
