import React, { useState, useEffect } from "react";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {
  storePreferences,
  getPreferences,
} from "../../hooks/useCapacitorStorage";
import { useIonLoading } from "@ionic/react";


const DIET_OPTIONS = {
  ALL: "Aucun régime spécial",
  V: "Végétarien", 
  VG: "Végan",
  GF: "Sans gluten",
  LF: "Sans lactose",
  EF: "Sans oeufs"
};

const ALLERGEN_OPTIONS = {
  AR: "Arachides",
  CE: "Céleri", 
  CR: "Crustacés",
  FQ: "Fruits à coque",
  GL: "Gluten", 
  LA: "Lait",
  LU: "Lupin", 
  ML: "Mollusques",
  MT: "Moutarde", 
  OE: "Oeufs", 
  PO: "Poissons", 
  SE: "Sésame",
  SJ: "Soja", 
  SU: "Sulfites"
};

const RecipeSettings = ({ setShowModalRe, setRelod }) => {
  const authUser = useAuthUser();
  const userId = authUser?.id;
  const [present, dismiss] = useIonLoading();

  const [values, setValues] = useState({ regime: [], allergen: [] });
  const [error, setError] = useState({});

  const addFilter = (category, key) => {
    setValues((prev) => {
      const currentValues = prev[category];
      
      // Special handling for diet options
      if (category === 'regime') {
        if (key === 'ALL') {
          // If "Tous" is selected, deselect all other options
          return { ...prev, [category]: ['ALL'] };
        } else {
          // Prevent "ALL" from being selected with other options
          if (currentValues.includes('ALL')) {
            return { ...prev, [category]: [key] };
          }
  
          // Special handling for Végétarien and Végan
          if (key === 'V') {
            // If selecting Végétarien, remove Végan if present
            const updatedValues = currentValues.includes('VG') 
              ? currentValues.filter(item => item !== 'VG') 
              : currentValues;
            
            return { 
              ...prev, 
              [category]: updatedValues.includes('V')
                ? updatedValues.filter(val => val !== 'V')
                : [...updatedValues, 'V']
            };
          } else if (key === 'VG') {
            // If selecting Végan, remove Végétarien if present
            const updatedValues = currentValues.includes('V') 
              ? currentValues.filter(item => item !== 'V') 
              : currentValues;
            
            return { 
              ...prev, 
              [category]: updatedValues.includes('VG')
                ? updatedValues.filter(val => val !== 'VG')
                : [...updatedValues, 'VG']
            };
          }
          
          // Toggle the selected option
          const updatedValues = currentValues.includes(key)
            ? currentValues.filter((item) => item !== key)
            : [...currentValues, key];
          
          return { ...prev, [category]: updatedValues };
        }
      }
      
      // Default behavior for other categories
      const updatedValues = currentValues.includes(key)
        ? currentValues.filter((item) => item !== key)
        : [...currentValues, key];
      return { ...prev, [category]: updatedValues };
    });
  };
  const handleSubmit = async () => {
    try {
      if (!values.regime.length) {
        setError((prev) => ({
          ...prev,
          regime: ["Veuillez sélectionner au moins un régime."],
        }));
        return;
      } else {
        setError((prev) => ({ ...prev, regime: null }));
      }

      await present({
        mode: "ios",
        spinner: "bubbles",
        cssClass: "custom-loading",
      });

      await storePreferences(userId, values);
      setRelod(values);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des préférences :", error);
      alert(
        "Une erreur est survenue lors de la sauvegarde des préférences. Veuillez réessayer."
      );
    } finally {
      await dismiss();
      if (values.regime.length) {
        setShowModalRe(false);
      }
    }
  };

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
      <div className="bg-[#fdf2f0] px-4 py-6 flex flex-col items-center">
        <div className="flex flex-col items-center justify-center relative aspect-square bg-no-repeat bg-contain bg-center max-h-36 w-full recetteBgSettings">
          <span className="text-xl w-full text-center text-custom-red titre-bold leading-clash">
          Sélectionner vos<br />
          préférences
          </span>
        </div>
        <p className="text-custom-red pt-2 ArchivoLightItalic text-sm">
          Sélectionner au moins un régime
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 rounded-b-3xl bg-[#fdf2f0]">
        <div className="flex flex-col space-y-8 pb-8">
          <div className="flex flex-col gap-2">
            <label className="text-custom-red text-base ArchivoLight pb-2">
              Mon régime :
            </label>
            <div className="flex flex-wrap gap-4">
              {Object.entries(DIET_OPTIONS).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => addFilter("regime", key)}
                  className={`border-solid ArchivoLight border-[1px] border-red-700 px-3 py-1 rounded-full ${
                    values.regime.includes(key)
                      ? "bg-custom-red text-white border-custom-red"
                      : "bg-white border-gray-300 text-custom-red"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {error?.regime && (
              <div className="border-custom-red text-sm mt-1 ArchivoLight">
                {error.regime}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-custom-red text-base ArchivoLight pb-2">
              Allergènes à éviter :
            </label>
            <div className="flex flex-wrap gap-4">
              {Object.entries(ALLERGEN_OPTIONS).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => addFilter("allergen", key)}
                  className={`border-solid ArchivoLight border-[1px] border-red-700 px-3 py-1 rounded-full ${
                    values.allergen.includes(key)
                      ? "bg-custom-red text-white border-custom-red"
                      : "bg-white border-gray-300 text-custom-red"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 flex justify-center bg-white safe-area-bottom-tab" >
        <button
          onClick={handleSubmit}
          
          className="text-white bg-custom-red py-2 px-12  ArchivoBold rounded-lg hover:bg-custom-red-clear font-bold"
        >
          Valider
        </button>
      </div>
    </div>
  );
};

export default RecipeSettings;