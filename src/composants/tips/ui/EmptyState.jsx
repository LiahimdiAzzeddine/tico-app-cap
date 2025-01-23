import { searchCircle } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
export const EmptyState = () => (
    <div className="flex flex-col items-center p-2 text-center">
        <IonIcon
          icon={searchCircle}
          className="w-16 h-16 text-custom-text-orange"
        />

      <h3 className="text-xl font-semibold text-custom-text-orange mb-2 Archivo ArchivoLight">
      Aucun conseil pour le moment
      </h3>
      <p className="text-gray-500 max-w-md">
        
      </p>
    </div>
  );
