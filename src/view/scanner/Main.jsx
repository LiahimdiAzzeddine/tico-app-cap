import { useState, useEffect } from "react";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonRow,
  IonText,
  IonButton,
  IonAlert,
  IonToast,
} from "@ionic/react";
import frame from "../../assets/frame.svg";
import whiteLogo from "../../assets/logo-white.svg";
import "./Scanner.css";
import  Result  from "./Result";

const Main = () => {
  const [err, setErr] = useState(null);
  const [hideBg, setHideBg] = useState(false);
  const [scannedResult, setScannedResult] = useState();
  const [isScanning, setIsScanning] = useState(true);
  const [lastScannedCode, setLastScannedCode] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [showAlert, setShowAlert] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // Méthode pour forcer la demande de permission avec alerte Ionic
  const checkPermissionForced = async () => {
    setErr(null);
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });

      if (status.granted) return true;

      if (status.denied) {
        setShowAlert({
          header: "Permission requise",
          message:
            "Pour utiliser la caméra, veuillez activer la permission dans les paramètres de l'application.",
          buttons: [
            {
              text: "Annuler",
              role: "cancel",
              handler: () => setErr("Permission d'accès à la caméra refusée."),
            },
            {
              text: "Ouvrir les paramètres",
              handler: async () => {
                await BarcodeScanner.openAppSettings();
              },
            },
          ],
        });
      } else if (status.neverAsked) {
        setShowAlert({
          header: "Autorisation caméra",
          message:
            "Nous avons besoin de votre permission pour utiliser la caméra. Voulez-vous l'autoriser ?",
          buttons: [
            {
              text: "Non",
              role: "cancel",
              handler: () => setErr("Permission non accordée."),
            },
            {
              text: "Oui",
              handler: () => startScan(true), // Re-lance le scan si l'utilisateur accepte
            },
          ],
        });
      } else if (status.restricted || status.unknown) {
        setErr("L'accès à la caméra est restreint ou non disponible.");
      }

      return false;
    } catch (error) {
      setErr(`Erreur lors de la vérification: ${error.message}`);
      return false;
    }
  };

  // Méthode pour vérifier la permission pour la premier fois
  const checkPermissionNormal = async () => {
    setErr(null);
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });

      if (status.granted) return true;
      return false;
    } catch (error) {
      setErr(`Erreur: ${error.message}`);
      return false;
    }
  };

  const startScan = async (initial = false) => {
    const hasPermission = initial
      ? await checkPermissionForced()
      : await checkPermissionNormal();

    setHasPermission(hasPermission);

    if (!hasPermission) return;

    try {
      BarcodeScanner.hideBackground();
      setHideBg(true);
      setIsScanning(true);

      const scan = async () => {
        const result = await BarcodeScanner.startScan({
          targetedFormats: ["CODE_128", "EAN_13", "EAN_8"],
        });

        if (result.hasContent) {
          if (result.content !== lastScannedCode) {
            setScannedResult(result.content);
            setLastScannedCode(result.content);
          }

          if (isScanning) scan();
        }
      };

      scan();
    } catch (error) {
      setErr(`Erreur de scan: ${error.message}`);
      stopScan();
    }
  };


  const stopScan = () => {
    BarcodeScanner.showBackground();
    setHideBg(false);
    setIsScanning(false);
    BarcodeScanner.stopScan();
  };


  useEffect(() => {
    startScan();
    return () => {
      stopScan();
    };
  }, []);

  return (
    <IonContent className={hideBg ? "hideBg" : "ion-padding"}>
      {err || !hasPermission ? (
        <IonRow>
          <IonText color="danger">{err}</IonText>
          <IonButton onClick={() => startScan(true)}>
            Réinitialiser
          </IonButton>
        </IonRow>
      ) : (
        <>
          {scannedResult && (
            <Result
						barcode={scannedResult}
						resetBarcode={setScannedResult}
					/>
          )}
          {hideBg && (
            <div className="scan-container">
              <img src={whiteLogo} alt="Logo" className="logo-top" />
              <div className="scan-box">
                <img src={frame} alt="Frame" className="frame-center" />
              </div>
            </div>
          )}
        </>
      )}

      {showAlert && (
        <IonAlert
          isOpen={!!showAlert}
          header={showAlert.header}
          message={showAlert.message}
          buttons={showAlert.buttons}
          onDidDismiss={() => setShowAlert(null)}
        />
      )}

      {showToast && (
        <IonToast
          isOpen={showToast}
          message={err}
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
        />
      )}
    </IonContent>
  );
};

export default Main;
