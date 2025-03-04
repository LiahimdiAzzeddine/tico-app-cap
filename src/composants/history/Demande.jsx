import React, { useState } from "react";
import {
  closeOutline,
  syncOutline,
  hourglassOutline,
  addOutline,
} from "ionicons/icons";
import { IonIcon, IonSpinner } from "@ionic/react";
import image64 from "../../assets/history/64.png";
import formatDate from "../../utils/formatDate";

const defaultImage = image64; // Image par défaut

const Demande = ({ demande, index, length, incrementInsistCount }) => {
  const [demandeState, setDemandeState] = useState(demande);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!demande) {
    return null;
  }

  // Vérifier si l'utilisateur peut insister
  const peutInsister =
    (demandeState.last_insist_at &&
      (new Date() - new Date(demandeState.last_insist_at)) /
        (1000 * 60 * 60 * 24) >
        30) ||
    demandeState.insist_count === 0 ||
    demandeState.insist_count === null;

  const handleIncrement = async () => {
    if (loading) return; // Empêcher plusieurs appels en même temps
    setLoading(true);
    setError(null);

    try {
      await incrementInsistCount(demandeState.id, setDemandeState); // Appel de la méthode passée en prop
    } catch (err) {
      setError("Erreur lors de l'incrémentation du compteur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div key={index}>
      <div className="flex items-center py-2">
        {/* Image du produit */}
        <div
          className="w-16 h-16 mr-4 rounded flex flex-col justify-center items-center bg-no-repeat bg-contain bg-center m-auto productBg"
        >
          <img
            src={"https://images.openfoodfacts.org/images/products/"+demandeState.image || defaultImage}
            alt={demandeState.gtin}
            className="w-auto h-14 rounded object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultImage;
            }}
            style={{ margin: "auto" }}
          />
        </div>

        {/* Détails du produit */}
        <div className="flex-1 leading-archivo">
          <div className="text-custom-green-text text-sm ArchivoLight leading-archivo italic">
            {formatDate(demandeState.created_at)}
          </div>
          <div className="text-custom-green-text leading-archivo ArchivoExtraBold">
            {demandeState.titre}
          </div>
          <div className="text-custom-green-text text-sm ArchivoLight leading-archivo italic">
            {demandeState.marque}
          </div>
        </div>

        {/* Bouton Insister si applicable */}
        {peutInsister && demandeState.status !== "processing" && (
          <button
            onClick={handleIncrement}
            disabled={loading}
            className="p-2 text-blue-500 hover:text-blue-700 m-auto flex justify-center items-center shadow-md rounded-md "
          >
            {loading ? (
              <IonSpinner className="w-10 h-10" name="lines-small"></IonSpinner>
            ) : (
              <IonIcon icon={addOutline} className="w-10 h-10" />
            )}
          </button>
        )}

        {/* Boutons de statut */}
        <button
          className={`p-2 m-auto flex justify-center items-center 
  ${demandeState.status === "processing" ? "text-green-500" : ""}
  ${demandeState.status === "pending" ? "text-yellow-500" : ""}
  ${demandeState.status === "rejected" ? "text-red-500" : ""}
`}
        >
          {demandeState.status === "processing" && (
            <IonIcon icon={syncOutline} className="w-10 h-10" />
          )}
          {demandeState.status === "pending" && (
            <IonIcon icon={hourglassOutline} className="w-10 h-10" />
          )}
          {demandeState.status === "rejected" && (
            <IonIcon icon={closeOutline} className="w-10 h-10" />
          )}
        </button>
        {/* Affichage de l'erreur */}
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {/* Ligne de séparation */}
      {index < length - 1 && (
        <hr className="w-full border-t border-[#c7f0d8] my-1" />
      )}
    </div>
  );
};

export default Demande;
