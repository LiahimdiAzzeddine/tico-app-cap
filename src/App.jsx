import './App.css'
import WelcomeSlider from './view/welcome/WelcomeSlider';
import React, { useEffect, useState } from "react";

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

import { IonApp, IonButton, IonContent, IonModal, setupIonicReact } from "@ionic/react";
import "./theme/variables.css";
//import { StatusBar } from '@capacitor/status-bar';
//import { ScreenOrientation } from '@capacitor/screen-orientation';
import Register from './view/auth/Register';

setupIonicReact();

function App() {
  
  useEffect(() => {
    // Masquer la barre d'état sur iOS
   /* StatusBar.setOverlays(true);
    StatusBar.setBackgroundColor({ color: '#ffffff' }); // Couleur de fond pour la barre d'état
    StatusBar.setStyle({ style: 'DARK' }); // Style sombre pour le texte de la barre d'état
    ScreenOrientation.lock({ orientation: 'portrait' });*/
  }, []);
const [myModal,setMyModal]=useState({isOpen:false})
  return (
    <>
    <IonApp>
<WelcomeSlider/>
    </IonApp>
    </>
  )
}

export default App
