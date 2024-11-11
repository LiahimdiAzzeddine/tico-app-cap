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

    // Initial network status check
    checkNetworkStatus();

    let handler; // Declare the handler for the listener

    // Listen for network changes
    const setupNetworkListener = async () => {
      try {
        handler = await Network.addListener("networkStatusChange", (status) => {
          console.log("Network status changed", status.connected);
          setIsConnected(status.connected);
        });
      } catch (error) {
        console.error("Error setting up network listener:", error);
      }
    };

    setupNetworkListener();

    // Cleanup listener on component unmount
    return () => {
      if (handler && typeof handler.remove === 'function') {
        handler.remove().catch((error) => console.error("Failed to remove listener:", error));
      }
    };
  }, []);

  return (
    <NetworkContext.Provider value={{ isConnected }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);
