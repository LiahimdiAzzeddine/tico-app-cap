import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [hasRequested, setHasRequested] = useState(false);
  const [isCourager, setIsCourager] = useState(false);
  

  return (
    <GlobalContext.Provider value={{ hasRequested, setHasRequested,isCourager, setIsCourager }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
