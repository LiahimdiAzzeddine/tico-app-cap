import React, { createContext, useContext, useState } from "react";
import { IonAlert } from "@ionic/react";
import { Toast } from "@capacitor/toast";

const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    header: "",
    message: "",
    buttons: [],
    mode: "ios", // Par défaut : iOS style
  });

  // Fonction pour afficher une alerte avec IonAlert
  const triggerAlert = (message, title = "Confirmation", onConfirm = null, mode = "ios",confirmation="Oui") => {
    setAlertConfig({
      isOpen: true,
      header: title,
      message: message,
      mode: mode, // Ajout du mode
      buttons: [
        {
          text: "Non",
          role: "cancel",
          handler: () => {
            setAlertConfig((prev) => ({ ...prev, isOpen: false }));
          },
        },
        {
          text: confirmation,
          handler: () => {
            if (onConfirm) onConfirm();
            setAlertConfig((prev) => ({ ...prev, isOpen: false }));
          },
        },
      ],
    });
  };

  // Fonction pour afficher un toast
  const triggerToast = async (message, color = "success") => {
    await Toast.show({
      text: message,
      duration: "short",
      position: "top",
    });
  };

  return (
    <AlertContext.Provider value={{ triggerAlert, triggerToast }}>
      {children}
      {/* IonAlert avec mode dynamique */}
      <IonAlert
        isOpen={alertConfig.isOpen}
        header={alertConfig.header}
        message={alertConfig.message}
        buttons={alertConfig.buttons}
        mode={alertConfig.mode} // Mode passé dynamiquement
      />
    </AlertContext.Provider>
  );
};
