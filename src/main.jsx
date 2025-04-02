import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import refresh from "./hooks/useRefreshToken.js";
import { ToastProvider } from "./context/ToastContext.jsx";
import { AlertProvider } from "./context/AlertProvider.jsx";
import { NetworkProvider } from "./context/NetworkContext.jsx";
import { setupIonicReact } from "@ionic/react";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { GlobalTabsProvider } from "./context/useTabsContext";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./theme/variables.css";

import "./index.css";
setupIonicReact({
  animation: true,
  mode: "md",
});

const store = createStore({
  authName: "_auth",
  authType: "localstorage",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
  refresh: refresh,
});

createRoot(document.getElementById("root")).render(
  <AuthProvider store={store}>
    <NetworkProvider>
      <ToastProvider>
        <AlertProvider>
          <IonApp>
            <IonReactRouter>
              <GlobalTabsProvider>
               <App /> 
              </GlobalTabsProvider>
            </IonReactRouter>
          </IonApp>
        </AlertProvider>
      </ToastProvider>
    </NetworkProvider>
  </AuthProvider>
);
