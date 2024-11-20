import { helpCircleOutline } from "ionicons/icons"; // Utilisation d'une icône pertinente pour les FAQs
import { IonIcon } from "@ionic/react";

export const EmptyStateFaq = () => (
  <div className="flex flex-col items-center p-6 text-center">
    <IonIcon
      icon={helpCircleOutline}
      className="w-16 h-16 text-blue-500" // Ajustez la couleur selon votre thème
    />

    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      Aucune question disponible
    </h3>
    <p className="text-gray-500 max-w-md">
      Il n'y a pas encore de questions à afficher. Revenez plus tard.
    </p>
  </div>
);
