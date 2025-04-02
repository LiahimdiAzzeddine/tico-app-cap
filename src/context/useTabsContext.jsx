import { useIonRouter } from "@ionic/react";
import React, { createContext, useContext, useState } from "react";

const GlobalTabsContext = createContext();

export const GlobalTabsProvider = ({ children }) => {
  const [showInput, setShowInput] = useState(false);

  

  return (
    <GlobalTabsContext.Provider value={{ showInput, setShowInput}}>
      {children}
    </GlobalTabsContext.Provider>
  );
};

export const useGlobalTabsContext = () => useContext(GlobalTabsContext);
