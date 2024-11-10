import { useState, useEffect } from "react";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { IonContent, IonRow, IonText, IonButton } from "@ionic/react";
import "./Scanner.css";
import ScanArea from "./ScanArea";
import PermissionAlert from "./PermissionAlert";
import ScanResultModal from "./ScanResultModal";

const Main = () => {
  const [err, setErr] = useState(null);
  const [hideBg, setHideBg] = useState(false);
  const [scannedResult, setScannedResult] = useState("3266980784614");
  const [isScanning, setIsScanning] = useState(true);
  const [lastScannedCode, setLastScannedCode] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [showAlert, setShowAlert] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [modalisOpen, setModalisOpen] = useState(false);

  const openModal = (barreCode) => {
    setScannedResult(barreCode);
    if(barreCode) setModalisOpen(true);
  };
  const closeModal = () => {
    setScannedResult(Null);
    setModalisOpen(false);
  };

  // Handle errors by stopping the scan and displaying messages
  const handleError = (message) => {
    setErr(message);
    stopScan();
  };

  // Permission check with forced prompt
  const checkPermissionForced = async () => {
    setErr(null);
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      return handlePermissionStatus(status);
    } catch (error) {
      handleError(`Erreur lors de la vérification: ${error.message}`);
      return false;
    }
  };

  // Normal permission check without forcing
  const checkPermissionNormal = async () => {
    setErr(null);
    try {
      const status = await BarcodeScanner.checkPermission();
      return handlePermissionStatus(status);
    } catch (error) {
      handleError(`Erreur: ${error.message}`);
      return false;
    }
  };

  // Handle permission statuses
  const handlePermissionStatus = (status) => {
    if (status.granted) return true;

    if (status.denied) {
      setShowAlert({
        header: "Permission requise",
        message:
          "Veuillez activer la permission dans les paramètres de l'application.",
        buttons: [
          {
            text: "Annuler",
            role: "cancel",
            handler: () => setErr("Permission refusée."),
          },
          {
            text: "Ouvrir les paramètres",
            handler: async () => await BarcodeScanner.openAppSettings(),
          },
        ],
      });
    } else if (status.neverAsked) {
      setShowAlert({
        header: "Autorisation caméra",
        message: "Voulez-vous autoriser l'utilisation de la caméra?",
        buttons: [
          {
            text: "Non",
            role: "cancel",
            handler: () => setErr("Permission non accordée."),
          },
          { text: "Oui", handler: () => startScan(true) },
        ],
      });
    } else if (status.restricted || status.unknown) {
      setErr("L'accès à la caméra est restreint ou non disponible.");
    }

    return false;
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
          if (result.content !== lastScannedCode || !modalisOpen) {
            openModal(result.content);
            setLastScannedCode(result.content);
            setFlashOn(false);
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
  const toggleFlash = async () => {
    if (flashOn) {
      await BarcodeScanner.disableTorch(); // Désactiver le flash
      setFlashOn(false);
    } else {
      await BarcodeScanner.enableTorch(); // Activer le flash
      setFlashOn(true);
    }
  };
  useEffect(() => {
    startScan();
    setModalisOpen(true);
    return () => {
      stopScan();
    };
  }, []);

  return (
    <>
      <IonContent className={hideBg ? "hideBg" : "ion-padding"}>
        {err || !hasPermission ? (
          <IonRow class="w-full h-full flex flex-col justify-center items-center">
            <IonText color="danger">{err}</IonText>
            <IonButton onClick={() => startScan(true)}>Réinitialiser</IonButton>
          </IonRow>
        ) : (
          <>
            {/* Main Scan Area */}
            <ScanArea
              hideBg={hideBg}
              toggleFlash={toggleFlash}
              flashOn={flashOn}
            />
          </>
        )}

        {showAlert && (
          <>
            {/* Permission Alert */}
            <PermissionAlert
              showAlert={showAlert}
              setShowAlert={setShowAlert}
            />
          </>
        )}

        {showToast && (
          <>
            {/* Error Toast */}
            <ErrorToast
              showToast={showToast}
              err={err}
              setShowToast={setShowToast}
            />
          </>
        )}
      </IonContent>
      {/* Scanned Result Modal */}
      {scannedResult&&(
        <ScanResultModal scannedResult={scannedResult} modalisOpen={modalisOpen} closeModal={closeModal} setModalisOpen={setModalisOpen} />
      )}
    </>
  );
};

export default Main;
