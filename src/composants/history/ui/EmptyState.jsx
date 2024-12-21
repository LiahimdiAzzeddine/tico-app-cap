import { searchCircle } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
export const EmptyState = () => (
    <div className="flex flex-col items-center p-2 text-center">
        <IonIcon
          icon={searchCircle}
          className="w-16 h-16 text-custom-green-background"
        />

      <h3 className="text-xl font-semibold text-custom-green-text ArchivoBold mb-2">
        Aucun scan pour le moment
      </h3>
      <p className="text-custom-green-text ArchivoItalic max-w-md">
        Commencez à scanner des produits pour les voir apparaître dans votre historique.
      </p>
    </div>
  );
