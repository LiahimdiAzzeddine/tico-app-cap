import { bookmarkOutline } from "ionicons/icons"; // Changement d'icône
import { IonIcon } from "@ionic/react";

export const EmptyLater = () => (
  <div className="flex flex-col items-center py-4 text-center space-y-3 w-full">
    <IonIcon
      icon={bookmarkOutline} // Nouvelle icône
      className="w-full h-16 text-custom-green-background  mb-2" // Taille et animation modifiées
    />
    <h3 className="text-xl font-semibold text-custom-green-text mb-1 ArchivoBold w-full">
      Aucun produit sauvegardé
    </h3>
    <p className="text-custom-blue ArchivoItalic leading-archivo">
    Hors ligne ? <br></br>
Scanner des produits pour les consulter plus&nbsp;tard
    </p>
  </div>
);
