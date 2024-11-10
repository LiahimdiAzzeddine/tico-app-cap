import { createContext, useState, useEffect, useContext } from "react";
import { Network } from "@capacitor/network";

const NetworkContext = createContext();

export const NetworkProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const checkNetworkStatus = async () => {
      const status = await Network.getStatus();
      setIsConnected(status.connected);
    };

    // Initial check
    checkNetworkStatus();

    // Listen for network changes
    const handler = Network.addListener("networkStatusChange", (status) => {
      console.log("networkStatusChange",status.connected)
      setIsConnected(status.connected);
    });

    // Cleanup listener on unmount
    return () => {
      handler.remove();
    };
  }, []);

  return (
    <NetworkContext.Provider value={{ isConnected }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);
