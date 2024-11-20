import {IonIcon } from "@ionic/react";
// Composant d'erreur
export const ErrorMessage = ({ message, icon, onClose }) => (
    <div className="flex flex-col items-center justify-center px-6 text-center">
        <IonIcon icon={icon} className="w-16 h-16 text-red-500" />
      <h2 className="text-xl font-semibold mb-1">Erreur</h2>
      <p className="text-gray-600 mb-3">{message}</p>
      <button
        onClick={onClose}
        className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Fermer
      </button>
    </div>
  );