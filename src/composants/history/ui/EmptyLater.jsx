import { bookmarkOutline } from "ionicons/icons"; // Changement d'icône
import { IonIcon } from "@ionic/react";

export const EmptyLater = () => (
  <div className="flex flex-col items-center p-4 text-center space-y-3">
    <IonIcon
      icon={bookmarkOutline} // Nouvelle icône
      className="w-16 h-16 text-custom-green-background  mb-2" // Taille et animation modifiées
    />
    <h3 className="text-xl font-semibold text-custom-green-text mb-1 ArchivoBold">
      Aucun produit sauvegardé
    </h3>
    <p className="text-custom-green-text ArchivoItalic">
      Ajoutez des produits à votre liste pour les retrouver plus tard !
    </p>
  </div>
);
