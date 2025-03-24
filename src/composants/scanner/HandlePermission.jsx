import { useState, useEffect, useRef, useCallback } from "react";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { IonContent, IonRow, IonText, IonButton } from "@ionic/react";
import "./Scanner.css";
import ScanArea from "./ScanArea";
import PermissionAlert from "./PermissionAlert";
import ScanResultModal from "./ScanResultModal";
import { useIonViewWillLeave, useIonViewWillEnter } from "@ionic/react";
import { handlePermissionStatus } from "./HandlePermission";

const Main = () => {
  // Use individual state variables for better performance and readability
  const [error, setError] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [showAlert, setShowAlert] = useState(null);
  const [scannedResult, setScannedResult] = useState(null);
  const [flashOn, setFlashOn] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [hideBg, setHideBg] = useState(false);
  const [breakpoint, setBreakpoint] = useState(0);

  // Refs for maintaining scanner state
  const scannerActiveRef = useRef(false);
  const lastScannedCodeRef = useRef(null);
  const shouldDetectRef = useRef(true);
  const formats = useRef(["CODE_128", "EAN_13", "EAN_8"]);

  // Convert functions to useCallback to prevent unnecessary re-renders
  const checkPermission = useCallback(async (force = false) => {
    setError(null);
    try {
      const status = await BarcodeScanner.checkPermission({ force });
      // Adapter pour la fonction handlePermissionStatus qui attend l'ancienne structure
      const updateAppState = (newState) => {
        if (newState.hasPermission !== undefined) setHasPermission(newState.hasPermission);
        if (newState.showAlert !== undefined) setShowAlert(newState.showAlert);
      };
      
      return handlePermissionStatus(
        status, 
        updateAppState, 
        BarcodeScanner, 
        startScan
      );
    } catch (error) {
      setError(`Erreur de vérification : ${error.message}`);
      setHasPermission(false);
      return false;
    }
  }, []);

  const scan = useCallback(async () => {
    if (!scannerActiveRef.current) return;

    try {
      const result = await BarcodeScanner.startScan({ targetedFormats: formats.current });

      if (result.hasContent && shouldDetectRef.current && result.content !== lastScannedCodeRef.current) {
        lastScannedCodeRef.current = result.content;
        setScannedResult(result.content);
        setModalIsOpen(true);
        handleBreakpointChange(0.35);
      }

      if (scannerActiveRef.current) scan();
    } catch (error) {
      setError(`Erreur de scan : ${error.message}`);
    }
  }, []);

  const stopScan = useCallback(() => {
    if (!scannerActiveRef.current) return;

    BarcodeScanner.showBackground();
    setHideBg(false);
    BarcodeScanner.stopScan();
    scannerActiveRef.current = false;
    shouldDetectRef.current = true;
  }, []);

  const startScan = useCallback(async (forcePermission = false) => {
    if (scannerActiveRef.current) return;

    const permissionGranted = await checkPermission(forcePermission);
    if (!permissionGranted) return;

    try {
      BarcodeScanner.hideBackground();
      setHideBg(true);
      setHasPermission(true);
      scannerActiveRef.current = true;
      scan();
    } catch (error) {
      setError(`Erreur de démarrage : ${error.message}`);
    }
  }, [checkPermission, scan]);

  const toggleFlash = useCallback(async () => {
    await (flashOn ? BarcodeScanner.disableTorch() : BarcodeScanner.enableTorch());
    setFlashOn(!flashOn);
  }, [flashOn]);

  const handleBreakpointChange = useCallback((value) => {
    setBreakpoint(value);

    switch (value) {
      case 1:
        stopScan();
        break;
      case 0.35:
        formats.current = ["AZTEC"];
        shouldDetectRef.current = false;
        if (!scannerActiveRef.current) startScan();
        break;
      case 0:
        formats.current = ["CODE_128", "EAN_13", "EAN_8"];
        stopScan();
        startScan();
        shouldDetectRef.current = true;
        lastScannedCodeRef.current = null;
        break;
      default:
        break;
    }
  }, [startScan, stopScan]);

  const closeModal = useCallback(() => {
    setScannedResult(null);
    setModalIsOpen(false);
    lastScannedCodeRef.current = null;
    handleBreakpointChange(0);
  }, [handleBreakpointChange]);

  // Clean up scanner when component unmounts
  useEffect(() => {
    return stopScan;
  }, [stopScan]);

  // Handle Ionic lifecycle events
  useIonViewWillLeave(() => {
    stopScan();
    setScannedResult(null);
  });

  useIonViewWillEnter(() => {
    if (breakpoint !== 1) {
      BarcodeScanner.prepare();
      startScan();
    }
  });

  return (
    <>
      <IonContent className={hideBg ? "hideBg" : ""}>
        {!hasPermission ? (
          <IonRow className="w-full h-full flex flex-col text-center justify-center items-center">
            <IonText color="danger" className="mb-1">{error}</IonText>
            <IonButton style={{ "--background": "#0f548d" }} onClick={() => startScan(true)}>
              Autoriser la caméra
            </IonButton>
          </IonRow>
        ) : (
          <ScanArea hideBg={hideBg} toggleFlash={toggleFlash} flashOn={flashOn} />
        )}

        {showAlert && (
          <PermissionAlert 
            showAlert={showAlert} 
            setShowAlert={setShowAlert} 
          />
        )}
      </IonContent>

      {scannedResult && (
        <ScanResultModal
          scannedResult={scannedResult}
          modalisOpen={modalIsOpen}
          closeModal={closeModal}
          setBreakpoint={handleBreakpointChange}
        />
      )}
    </>
  );
};

export default Main;