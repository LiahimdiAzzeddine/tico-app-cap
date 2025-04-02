import { useState, useEffect, useRef } from "react";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { IonContent, IonRow, IonText, IonButton } from "@ionic/react";
import "./Scanner.css";
import ScanArea from "./ScanArea";
import PermissionAlert from "./PermissionAlert";
import ScanResultModal from "./ScanResultModal";
import { useIonViewWillLeave, useIonViewWillEnter } from "@ionic/react";
import { handlePermissionStatus } from "./HandlePermission";

const Main = () => {
  const [state, setState] = useState({
    error: null,
    hasPermission: null,
    showAlert: null,
    scannedResult: null,
    flashOn: false,
    modalIsOpen: false,
    hideBg: false,
    breakpoint: 0,
  });

  const scannerActiveRef = useRef(false);
  const lastScannedCodeRef = useRef(null);
  const shouldDetectRef = useRef(true);
  const formats = useRef(["CODE_128", "EAN_13", "EAN_8"]);

  const updateState = (newState) =>
    setState((prevState) => ({ ...prevState, ...newState }));

  const checkPermission = async (force = false) => {
    updateState({ error: null });
    try {
      const status = await BarcodeScanner.checkPermission({ force });
      return handlePermissionStatus(status, updateState, BarcodeScanner, startScan);
    } catch (error) {
      updateState({ error: `Erreur de vérification : ${error.message}`, hasPermission: false });
      return false;
    }
  };

  const startScan = async (forcePermission = false) => {
    if (scannerActiveRef.current) return;

    const permissionGranted = await checkPermission(forcePermission);
    if (!permissionGranted) return;

    try {
      BarcodeScanner.hideBackground();
      updateState({ hideBg: true, hasPermission: true });
      scannerActiveRef.current = true;
      scan();
    } catch (error) {
      updateState({ error: `Erreur de démarrage : ${error.message}` });
    }
  };

  const stopScan = () => {
    if (!scannerActiveRef.current) return;

    BarcodeScanner.showBackground();
    updateState({ hideBg: false });
    BarcodeScanner.stopScan();
    scannerActiveRef.current = false;
    shouldDetectRef.current = true;
  };

  const scan = async () => {
    if (!scannerActiveRef.current) return;

    try {
      const result = await BarcodeScanner.startScan({ targetedFormats: formats.current });

      if (result.hasContent && shouldDetectRef.current && result.content !== lastScannedCodeRef.current) {
        lastScannedCodeRef.current = result.content;
        openModal(result.content);
      }

      if (scannerActiveRef.current) scan();
    } catch (error) {
      updateState({ error: `Erreur de scan : ${error.message}` });
    }
  };

  const toggleFlash = async () => {
    await (state.flashOn ? BarcodeScanner.disableTorch() : BarcodeScanner.enableTorch());
    updateState({ flashOn: !state.flashOn });
  };

  const handleBreakpointChange = (value) => {
    updateState({ breakpoint: value });

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
  };

  const openModal = (barcode) => {
    updateState({ scannedResult: barcode, modalIsOpen: true });
    handleBreakpointChange(0.35);
  };

  const closeModal = () => {
    updateState({ scannedResult: null, modalIsOpen: false });
    lastScannedCodeRef.current = null;
    handleBreakpointChange(0);
  };

  useEffect(() => {
    return stopScan;
  }, []);

  useIonViewWillLeave(() => {
    stopScan();
    updateState({ scannedResult: null });
  });

  useIonViewWillEnter(() => {
    if (state.breakpoint !== 1) {
      BarcodeScanner.prepare();
      startScan();
    }
  });

  return (
    <>
      <IonContent className={state.hideBg ? "hideBg" : ""}>
        {!state.hasPermission ? (
          <IonRow className="w-full h-full flex flex-col text-center justify-center items-center">
            <IonText color="danger" className="mb-1">{state.error}</IonText>
            <IonButton style={{ "--background": "#0f548d" }} onClick={() => startScan(true)}>
              Autoriser la caméra
            </IonButton>
          </IonRow>
        ) : (
          <ScanArea hideBg={state.hideBg} toggleFlash={toggleFlash} flashOn={state.flashOn} />
        )}

        {state.showAlert && <PermissionAlert showAlert={state.showAlert} setShowAlert={(show) => updateState({ showAlert: show })} />}
      </IonContent>

      {state.scannedResult && (
        <ScanResultModal
          scannedResult={state.scannedResult}
          modalisOpen={state.modalIsOpen}
          closeModal={closeModal}
          setBreakpoint={handleBreakpointChange}
        />
      )}
    </>
  );
};

export default Main;
