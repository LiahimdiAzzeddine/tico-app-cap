import React, { useState, useEffect } from 'react';
import { IonContent, IonRow, IonText, IonButton } from "@ionic/react";
import { CapacitorFlash } from '@capgo/capacitor-flash'; // Import du plugin CapacitorFlash
import frame from "../../assets/frame.svg";
import whiteLogo from "../../assets/logo-white.svg";

const Scanner = ({ hideBg, err }) => {
  const [flashAvailable, setFlashAvailable] = useState(false); // État pour la disponibilité du flash
  const [flashOn, setFlashOn] = useState(false); // État pour allumer/éteindre le flash

  // Vérifie si le flash est disponible
  useEffect(() => {
    consol.log("isAvailable",flashAvailable)
    const checkFlashAvailability = async () => {
      const isAvailable = await CapacitorFlash.isAvailable();
      setFlashAvailable(isAvailable);
    };
    checkFlashAvailability();
  }, []);

  // Basculer l'état du flash
  const toggleFlash = async () => {
    consol.log("isAvailable",flashAvailable)

    if (flashOn) {
      await CapacitorFlash.switchOff(); // Éteindre le flash
      setFlashOn(false);
    } else {
      await CapacitorFlash.switchOn({ intensity: 100 }); // Allumer le flash avec une intensité de 100%
      setFlashOn(true);
    }
  };

  return (
    <IonContent className={hideBg ? "hideBg" : "ion-padding"}>
      {err && (
        <IonRow>
          <IonText color="danger">{err}</IonText>
        </IonRow>
      )}
      {!err && hideBg && (
        <div className="scan-container">
          <div className="scan-box">
            <img src={frame} alt="Frame" className="frame-center" />
          </div>

          {/* Vérifie si le flash est disponible avant d'afficher le bouton */}
          {flashAvailable ? (
            <IonButton onClick={toggleFlash}>
              {flashOn ? 'Éteindre le flash' : 'Allumer le flash'}
            </IonButton>
          ) : (
            <IonText color="danger" className="z-[100] text-white">Le flash n'est pas disponible sur cet appareil</IonText>
          )}
        </div>
      )}
    </IonContent>
  );
};

export default Scanner;
