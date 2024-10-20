import React, { createContext, useContext, useState } from "react";
import { IonToast } from "@ionic/react";

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("success");

  const triggerToast = (message, color = "success") => {
    setToastMessage(message);
    setToastColor(color);
    setShowToast(true);
  };

  return (
    <ToastContext.Provider value={{ triggerToast }}>
      {children}
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={3000}
        color={toastColor}
        position="top"
      />
    </ToastContext.Provider>
  );
};
