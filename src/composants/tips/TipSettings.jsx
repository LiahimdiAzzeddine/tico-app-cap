import React, { useState, useEffect } from "react";
import Antigaspi from "../../assets/tips/VISUELS_Anti-gaspi.png";
import AntigaspiActive from "../../assets/tips/VISUELS_Anti-gaspi_blanc.png";
import Astuces from "../../assets/tips/VISUELS_Astuces_pratiques.png";
import AstucesActive from "../../assets/tips/VISUELS_Astuces_pratiques_blanc.png";
import Cuisine from "../../assets/tips/VISUELS_Cuisine.png";
import CuisineActive from "../../assets/tips/VISUELS_Cuisine_blanc.png";
import Techniques from "../../assets/tips/VISUELS_Techniques_culinaires.png";
import TechniquesActive from "../../assets/tips/VISUELS_Techniques_culinaires_blanc.png";
import Etiquette from "../../assets/tips/VISUELS_Etiquettes.svg";
import EtiquetteActive from "../../assets/tips/tipsVISUELS_Etiquette_blanc.png";
import plaisirs from "../../assets/tips/VISUELS_Petits_plaisirs.svg";
import plaisirsActive from "../../assets/tips/VISUELS_Petits_plaisirs_blanc.png";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {
  storeTipPreferences,
  getTipPreferences,
} from "../../hooks/useCapacitorStorage";
import { IonCol, IonGrid, IonRow, useIonLoading } from "@ionic/react";

const TipSettings = ({ setShowModalTip, setRelod }) => {
  const [selectedTips, setSelectedTips] = useState(new Set());
  const authUser = useAuthUser();
  const userId = authUser?.id;
  const [present, dismiss] = useIonLoading();

  const tips = [
    {
      id: 1,
      label: "Astuces",
      image: Astuces,
      activeImage: AstucesActive,
    },
    {
      id: 2,
      label: "Antigaspi",
      image: Antigaspi,
      activeImage: AntigaspiActive,
    },
    {
      id: 4,
      label: "Cuisine durable",
      image: Cuisine,
      activeImage: CuisineActive,
    },
    {
      id: 3,
      label: "Techniques culinaires",
      image: Techniques,
      activeImage: TechniquesActive,
    },
    {
      id: 5,
      label: "Petits plaisirs",
      image: plaisirs,
      activeImage: plaisirsActive,
    },
    {
      id: 6,
      label: "Sous les étiquettes",
      image: Etiquette,
      activeImage: EtiquetteActive,
    },
  ];

  const toggleTip = (tipId) => {
    setSelectedTips((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tipId)) {
        newSet.delete(tipId);
      } else {
        newSet.add(tipId);
      }
      return newSet;
    });
  };

  const handleSubmit = async () => {
    try {
      await present({
        mode: "ios",
        spinner: "bubbles",
        cssClass: "custom-loading-dialog",
      });

      await storeTipPreferences(userId, selectedTips);
      setRelod(selectedTips);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des préférences :", error);
      alert(
        "Une erreur est survenue lors de la sauvegarde des préférences. Veuillez réessayer."
      );
    } finally {
      await dismiss();
      setShowModalTip(false);
    }
  };

  // Charger les préférences des astuces sélectionnées au montage du composant
  useEffect(() => {
    const loadPreferences = async () => {
      const storedPreferences = await getTipPreferences(userId);
      setSelectedTips(storedPreferences);
    };

    if (userId) {
      loadPreferences();
    }
  }, [userId]);

  return (
    <div className="flex flex-col h-full ">
      {/* Fixed header */}
      <div className="bg-custom-brown px-4 py-6 flex flex-col items-center">
        <div className="flex flex-col items-center justify-center relative aspect-square bg-no-repeat bg-contain bg-center max-h-36 w-full recetteBgSettings">
          <span className="text-xl w-full text-center text-custom-text-orange titre-bold leading-clash">
            Sélection d’affichage
            <br />
            personnalisée des <br />
            ti’conseils
          </span>
        </div>
        <p className="text-custom-text-orange pt-2 ArchivoLightItalic text-sm">
          Désélectionner les conseils qui ne vous intéressent pas
        </p>
      </div>

      {/* Scrollable content area */}

      <div className="flex-1 overflow-y-auto px-8 cadreHome bg-custom-brown">
      <IonGrid>
  <IonRow className="ion-justify-content-center">
    {tips.map((tip) => (
      <IonCol 
        size="6" 
        key={tip.id} 
        className="ion-text-center ion-margin-bottom"
      >
        <button
          onClick={() => toggleTip(tip.id)}
          className="w-full flex flex-col items-center justify-center"
        >
          <div
            className={`flex flex-col items-center 
              ${selectedTips.has(tip.id) ? "scale-105" : ""} 
              transition-transform duration-200`}
          >
            <img
              src={selectedTips.has(tip.id) ? tip.activeImage : tip.image}
              alt={tip.label}
              className="h-24 w-24 object-contain rounded-2xl"
            />
          </div>
          <span className="text-sm mt-2 text-custom-text-orange ArchivoBold">
            {tip.label}
          </span>
        </button>
      </IonCol>
    ))}
  </IonRow>
</IonGrid>
      </div>

      {/* Fixed footer with button */}
      <div className="p-5 flex justify-center bg-white safe-area-bottom-tab">
        <button
          onClick={handleSubmit}
          className="bg-orange-500 text-white py-2 px-12 rounded-lg font-bold hover:bg-orange-600 transition-colors ArchivoBold"
        >
          Valider
        </button>
      </div>
    </div>
  );
};

export default TipSettings;
