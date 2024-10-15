import {
    IonButton,
    IonContent,
    IonIcon,
    IonPage,
    IonRow,
    IonText,
    useIonAlert,
  } from "@ionic/react";
  import { useEffect, useState } from "react";
  import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
  import { scanOutline } from "ionicons/icons";
  import "./Scanner.css";
  import frame from "../../assets/frame.svg";
  import whiteLogo from "../../assets/logo-white.svg";
  
  function Scanner() {
    const [err, setErr] = useState();
    const [hideBg, setHideBg] = useState(false);
    const [present] = useIonAlert();
  
    const checkPermission = async () => {
      setErr(undefined);
      try {
        // Vérifiez d'abord sans forcer la demande
        const status = await BarcodeScanner.checkPermission({ force: false });
  
        if (status.granted) {
          return true;
        }
  
        if (status.denied) {
          const c = confirm('If you want to grant permission for using your camera, enable it in the app settings.');
          if (c) {
            await BarcodeScanner.openAppSettings();
          }
          setErr("Permission d'accès à la caméra refusée. Veuillez l'activer dans les paramètres de l'application.");
          return false;
        }
  
        if (status.neverAsked || status.restricted || status.unknown) {
          // Demander la permission
          const statusRequest = await BarcodeScanner.checkPermission({ force: true });
  
          if (statusRequest.granted) {
            return true;
          } else {
            setErr("Permission d'accès à la caméra non accordée.");
            return false;
          }
        }
  
        // Si on arrive ici, on n'a pas encore la permission
        setErr("Permission d'accès à la caméra non accordée.");
        const c = confirm('If you want to grant permission for using your camera, enable it in the app settings.');
        if (c) {
          await BarcodeScanner.openAppSettings();
        }
        return false;
  
      } catch (error) {
        setErr(`Erreur lors de la vérification des permissions : ${error.message}`);
        return false;
      }
    };
  
    const startScan = async () => {
      const hasPermission = await checkPermission(); // Vérifiez la permission avant de démarrer la numérisation
      if (!hasPermission) {
        return;
      }
  
      BarcodeScanner.hideBackground();
      setHideBg(true);
      // make background of WebView transparent
  //{ targetedFormats: [SupportedFormat.CODE_128, SupportedFormat.EAN_13, SupportedFormat.EAN_8] }
      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
  
      // if the result has content
      if (result.hasContent) {
        stopScan();
        present({
          message: result.content,
          buttons: [
            "Cancel",
            { text: "Ok", handler: (d) => console.log("ok pressed") },
          ],
          onDidDismiss: (e) => console.log("did dismiss"),
        });
        console.log(result.content); // log the raw scanned content
      }
    };
  
    const stopScan = () => {
      BarcodeScanner.showBackground();
      setHideBg(false);
      BarcodeScanner.stopScan();
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
                <img src={whiteLogo} alt="Logo" className="logo-top" />
                <div className="scan-box">
                  <img src={frame} alt="Frame" className="frame-center" />
                </div>
              </div>
            )}
            {!hideBg && (
              <IonButton className="center-button" onClick={startScan}>
                <IonIcon icon={scanOutline} slot="start" />
                Start Scan
              </IonButton>
            )}
          </IonContent>
       
    );
  }
  
  export default Scanner;
  