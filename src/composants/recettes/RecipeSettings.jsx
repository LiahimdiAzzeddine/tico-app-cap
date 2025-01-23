import React, { useState, useEffect } from "react";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { storePreferences, getPreferences } from "../../hooks/useCapacitorStorage"; // Importer les fonctions

const RecipeSettings = ({ setShowModalRe }) => {
  const authUser = useAuthUser();
  const userId =  authUser?.id; 

  const [values, setValues] = useState({ regime: [], allergen: [] });
  const [error, setError] = useState({});

  // Ajouter ou retirer un filtre
  const addFilter = (category, value) => {
    setValues((prev) => {
      const currentValues = prev[category];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value) // Retirer si déjà sélectionné
        : [...currentValues, value]; // Ajouter si non sélectionné
      return { ...prev, [category]: updatedValues };
    });
  };

  // Soumettre les préférences
  const handleSubmit = async () => {
    if (!values.regime.length) {
      setError((prev) => ({ ...prev, regime: ["Veuillez sélectionner au moins un régime."] }));
    } else {
      setError((prev) => ({ ...prev, regime: null }));
    }

    if (values.regime.length) {
      await storePreferences(userId, values); // Sauvegarder les préférences après validation
      console.log("Préférences validées et sauvegardées :", values);
    }
  };

  // Charger les préférences au montage du composant
  useEffect(() => {
    const loadPreferences = async () => {
      const storedPreferences = await getPreferences(userId);
      if (storedPreferences) {
        setValues(storedPreferences);
      }
    };

    loadPreferences();
  }, [userId]);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* En-tête fixe */}
      <div className="bg-[#fdf2f0] px-4 py-6 flex flex-col items-center">
        <div className="flex flex-col items-center justify-center relative aspect-square bg-no-repeat bg-contain bg-center max-h-36 w-full recetteBgSettings">
          <span className="text-xl w-full text-center text-custom-red titre-bold leading-clash">
            Sélection d’affichage
            <br />
            personnalisée des <br />
            ti’recettes
          </span>
        </div>
        <p className="text-custom-red pt-2 ArchivoLightItalic text-sm">
          Sélectionner au moins un régime
        </p>
      </div>

      {/* Contenu défilant */}
      <div className="flex-1 overflow-y-auto px-4 rounded-b-3xl bg-[#fdf2f0]">
        <div className="flex flex-col space-y-8 pb-8">
          {/* Section Mon régime */}
          <div className="flex flex-col gap-2">
            <label className="text-custom-red text-base ArchivoLight pb-2">Mon régime :</label>
            <div className="flex flex-wrap gap-4">
              {["Tous", "Végétarien", "Végan", "Sans gluten", "Sans lactose", "Sans oeufs"].map((diet) => (
                <button
                  key={diet}
                  type="button"
                  onClick={() => addFilter("regime", diet)}
                  className={`border-solid ArchivoLight border-[1px] border-red-700 px-3 py-1 rounded-full ${
                    values.regime.includes(diet)
                      ? "bg-custom-red text-white border-custom-red"
                      : "bg-white border-gray-300 text-custom-red"
                  }`}
                >
                  {diet}
                </button>
              ))}
            </div>
            {error?.regime && (
              <div className="border-custom-red text-sm mt-1 ArchivoLight">{error.regime}</div>
            )}
          </div>

          {/* Section Allergènes à éviter */}
          <div className="flex flex-col gap-2">
            <label className="text-custom-red text-base ArchivoLight pb-2">Allergènes à éviter :</label>
            <div className="flex flex-wrap gap-4">
              {[
                "Arachides",
                "Céleri",
                "Crustacés",
                "Fruits à coque",
                "Gluten",
                "Lait",
                "Lupin",
                "Mollusques",
                "Moutarde",
                "Oeufs",
                "Poissons",
                "Sésame",
                "Soja",
                "Sulfites",
              ].map((allergen) => (
                <button
                  key={allergen}
                  type="button"
                  onClick={() => addFilter("allergen", allergen)}
                  className={`border-solid ArchivoLight border-[1px] border-red-700 px-3 py-1 rounded-full ${
                    values.allergen.includes(allergen)
                      ? "bg-custom-red text-white border-custom-red"
                      : "bg-white border-gray-300 text-custom-red"
                  }`}
                >
                  {allergen}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pied de page fixe */}
      <div className="p-4 flex justify-center bg-white">
        <button
          onClick={handleSubmit}
          className="text-white bg-custom-red py-2 px-12 border-solid border-[1px] ArchivoBold border-[#fad4ce] rounded-lg hover:bg-custom-red-clear text-lg"
        >
          Valider
        </button>
      </div>
    </div>
  );
};

export default RecipeSettings;