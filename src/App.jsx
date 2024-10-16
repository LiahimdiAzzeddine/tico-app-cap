import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import publicRoutes from "./routes/publicRoutes";
import HomepublicRoutes from "./routes/homePublicRoutes";

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

import { IonApp, setupIonicReact } from "@ionic/react";
import "./theme/variables.css";
//import { StatusBar } from '@capacitor/status-bar';
//import { ScreenOrientation } from '@capacitor/screen-orientation';



setupIonicReact();

function App() {
  useEffect(() => {
    // Masquer la barre d'état sur iOS
    /* StatusBar.setOverlays(true);
    StatusBar.setBackgroundColor({ color: '#ffffff' }); // Couleur de fond pour la barre d'état
    StatusBar.setStyle({ style: 'DARK' }); // Style sombre pour le texte de la barre d'état
    ScreenOrientation.lock({ orientation: 'portrait' });*/
  }, []);
  const [myModal, setMyModal] = useState({ isOpen: false });
  return (
    <>
      <IonApp>
        <Routes>
          {publicRoutes}
          {HomepublicRoutes}
        </Routes>
      </IonApp>
    </>
  );
}

export default App;
