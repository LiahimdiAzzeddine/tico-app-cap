import React, { useState, useEffect } from "react";
import Antigaspi from "../../assets/tips/VISUELS_Anti-gaspi.png";
import AntigaspiActive from "../../assets/tips/VISUELS_Anti-gaspi_blanc.png";
import Astuces from "../../assets/tips/VISUELS_Astuces_pratiques.png";
import AstucesActive from "../../assets/tips/VISUELS_Astuces_pratiques_blanc.png";
import Cuisine from "../../assets/tips/VISUELS_Cuisine.png";
import CuisineActive from "../../assets/tips/VISUELS_Cuisine_blanc.png";
import Techniques from "../../assets/tips/VISUELS_Techniques_culinaires.png";
import TechniquesActive from "../../assets/tips/VISUELS_Techniques_culinaires_blanc.png";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { storeTipPreferences, getTipPreferences } from "../../hooks/useCapacitorStorage"; // Importer les fonctions

const TipSettings = ({ setShowModalTip }) => {
  const [selectedTips, setSelectedTips] = useState(new Set());
  const authUser = useAuthUser();
  const userId = authUser?.id;

  const tips = [
    { id: "tips", label: "Astuces", image: Astuces, activeImage: AstucesActive },
    { id: "antiWaste", label: "Antigaspi", image: Antigaspi, activeImage: AntigaspiActive },
    { id: "sustainableCooking", label: "Cuisine durable", image: Cuisine, activeImage: CuisineActive },
    { id: "cookingTechniques", label: "Techniques culinaires", image: Techniques, activeImage: TechniquesActive },
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
    await storeTipPreferences(userId, selectedTips); // Sauvegarder les préférences des astuces sélectionnées
    console.log("Astuces sélectionnées :", Array.from(selectedTips));
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
    <div className="flex flex-col h-full bg-white">
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
      <div className="flex-1 overflow-y-auto px-8 rounded-b-3xl bg-custom-brown">
        <div className="grid grid-cols-2 gap-2 w-full mb-4 justify-items-center">
          {tips.map((tip) => (
            <button
              key={tip.id}
              onClick={() => toggleTip(tip.id)}
              className={`
                aspect-square p-2 rounded-lg flex flex-col items-center justify-center
                transition-transform duration-200
                ${selectedTips.has(tip.id) ? "scale-105" : ""}
              `}
            >
              <img
                src={selectedTips.has(tip.id) ? tip.activeImage : tip.image}
                alt={tip.label}
                className="h-24 w-24 object-contain rounded-2xl"
              />
              <span className="text-center text-sm mt-2 whitespace-pre-line text-custom-text-orange ArchivoBold">
                {tip.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Fixed footer with button */}
      <div className="p-4 flex justify-center bg-white">
        <button
          onClick={handleSubmit}
          className="bg-orange-500 text-white py-2 px-12 rounded-lg font-bold hover:bg-orange-600 transition-colors duration-200"
        >
          Valider
        </button>
      </div>
    </div>
  );
};

export default TipSettings;
