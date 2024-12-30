import { searchCircle } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
export const EmptyState = () => (
    <div className="flex flex-col items-center p-2 text-center">
        <IonIcon
          icon={searchCircle}
          className="w-16 h-16 text-custom-red"
        />

      <h3 className="text-xl font-semibold text-custom-red-clear mb-2 Archivo ArchivoLight">
        Aucun Recette pour le moment
      </h3>
      <p className="text-gray-500 max-w-md">
        
      </p>
    </div>
  );
