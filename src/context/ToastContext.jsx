import React, { createContext, useContext } from "react";
import { Toast } from "@capacitor/toast";

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {


  const triggerToast = (message, color = "success") => {


    // Display the toast using Capacitor's Toast API
    Toast.show({
      text: message,
      duration: "short",  // Duration can be 'short' or 'long'
      position: "top",    // You can customize the position ('top', 'bottom', 'center')
      style: {
        backgroundColor: color === "success" ? "#28a745" : "#dc3545",  // Customize color based on the type
        color: "white",
        borderRadius: "8px",
        padding: "10px"
      }
    });
  };

  return (
    <ToastContext.Provider value={{ triggerToast }}>
      {children}
    </ToastContext.Provider>
  );
};
