import { alertCircle } from "ionicons/icons"; // Icône d'erreur
import { IonIcon } from "@ionic/react";

export const ErrorState = ({ message = "Une erreur est survenue. Veuillez réessayer." }) => (
  <div className="flex flex-col items-center p-2 text-center">
    <IonIcon
      icon={alertCircle}
      className="w-16 h-16 text-custom-red" // Style personnalisé pour l'icône
    />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      Erreur
    </h3>
    <p className="text-gray-500 max-w-md">
      {message}
    </p>
  </div>
);
