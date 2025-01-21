import { useState, useEffect, useRef } from "react";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { IonContent, IonRow, IonText, IonButton,IonIcon } from "@ionic/react";
import "./Scanner.css";
import ScanArea from "./ScanArea";
import PermissionAlert from "./PermissionAlert";
import ScanResultModal from "./ScanResultModal";
import { useIonViewWillLeave, useIonViewWillEnter } from "@ionic/react";

const Main = () => {
  const [appState, setAppState] = useState({
    error: null,
    hasPermission: null,
    showAlert: null,
    scannedResult:null,
    flashOn: false,
    modalIsOpen: false,
    hideBg: false,
  });

  const [breakpoint, setBreakpoint] = useState(0);
  const scannerActiveRef = useRef(false);
  const lastScannedCodeRef = useRef(null);
  const shouldDetectRef = useRef(true);

  const updateAppState = (newState) =>
    setAppState((prevState) => ({ ...prevState, ...newState }));

  const handlePermissionStatus = (status) => {
    if (status.granted) {
      updateAppState({ hasPermission: true });
      return true;
    }

    if (status.denied) {
      updateAppState({
        showAlert: {
          header: "Permission requise",
          message:
            "L'accès à la caméra est nécessaire pour scanner les codes-barres. Veuillez activer la permission dans les paramètres de l'application.",
          buttons: [
            {
              text: "Annuler",
              role: "cancel",
              handler: () => updateAppState({ error: "Permission refusée." }),
            },
            {
              text: "Paramètres",
              handler: async () => await BarcodeScanner.openAppSettings(),
            },
          ],
        },
      });
    } else if (status.neverAsked) {
      updateAppState({
        showAlert: {
          header: "Autorisation caméra",
          message: "Nous avons besoin de l’accès à la caméra pour scanner les codes-barres, veuillez l’autoriser.",
          buttons: [
            { text: "Continuer", handler: () => startScan(true) },
          ],
        },
      });
    } else {
      updateAppState({
        error: "L'accès à la caméra est restreint ou non disponible.",
        hasPermission: false,
      });
    }
    return false;
  };

  const checkPermission = async (force = false) => {
    updateAppState({ error: null });
    try {
      const status = await BarcodeScanner.checkPermission({ force });
      return handlePermissionStatus(status);
    } catch (error) {
      updateAppState({
        error: `Erreur lors de la vérification: ${error.message}`,
        hasPermission: false,
      });
      return false;
    }
  };

  const startScan = async (forcePermission = false) => {
    if (scannerActiveRef.current) {
      console.log("Le scanner est déjà actif.");
      return;
    }

    const permissionGranted = await checkPermission(forcePermission);
    if (!permissionGranted) return;

    try {
      BarcodeScanner.hideBackground();
      updateAppState({ hideBg: true, hasPermission: true });
      scannerActiveRef.current = true;
      scan();
    } catch (error) {
      updateAppState({ error: `Erreur de démarrage du scan: ${error.message}` });
    }
  };

  const stopScan = () => {
    BarcodeScanner.showBackground();
    updateAppState({ hideBg: false });
    BarcodeScanner.stopScan();
    scannerActiveRef.current = false;
    shouldDetectRef.current = true; // Réinitialiser la détection pour le prochain scan
  };

  const scan = async () => {
    if (!scannerActiveRef.current) return;

    try {
      const result = await BarcodeScanner.startScan({
        targetedFormats: ["CODE_128", "EAN_13", "EAN_8"],
      });

      if (result.hasContent && shouldDetectRef.current) {
        if (result.content !== lastScannedCodeRef.current) {
          lastScannedCodeRef.current = result.content;
          openModal(result.content);
        }
      }

      // Continuer le scan si le scanner est toujours actif
      if (scannerActiveRef.current) {
        scan();
      }
    } catch (error) {
      updateAppState({ error: `Erreur de scan: ${error.message}` });
    }
  };

  const toggleFlash = async () => {
    if (appState.flashOn) {
      await BarcodeScanner.disableTorch();
    } else {
      await BarcodeScanner.enableTorch();
    }
    updateAppState({ flashOn: !appState.flashOn });
  };

  const handleBreakpointChange = (value) => {
    setBreakpoint(value);
    
    if (value === 1) {
      // Arrêter complètement le scanner
      if (scannerActiveRef.current) {
        stopScan();
      }
    } else if (value === 0.35) {
      // Scanner actif mais pas de détection
      if (!scannerActiveRef.current) {
        startScan();
      }
      shouldDetectRef.current = false;
    } else if (value === 0) {
      // Scanner actif avec détection
      if (!scannerActiveRef.current) {
        startScan();
      }
      shouldDetectRef.current = true;
      lastScannedCodeRef.current = null;
    }
  };

  const openModal = (barCode) => {
    updateAppState({ scannedResult: barCode, modalIsOpen: true });
    handleBreakpointChange(0.35);
  };

  const closeModal = () => {
    updateAppState({ scannedResult: null, modalIsOpen: false });
    lastScannedCodeRef.current = null;
    handleBreakpointChange(0);
  };

  useEffect(() => {
    return () => {
      if (scannerActiveRef.current) stopScan();
    };
  }, []);

  useIonViewWillLeave(() => {
    stopScan();
    appState.scannedResult=null;
  });

  useIonViewWillEnter(() => {
    if (breakpoint !== 1) {
      startScan();
    }
  });

  return (
    <>
      <IonContent className={appState.hideBg ? "hideBg" : ""}>
        {!appState.hasPermission ? (
          <IonRow className="w-full h-full flex flex-col text-center justify-center items-center">
            <IonText color="danger" className="mb-1">{appState.error}</IonText>
            <IonButton style={{"--background":"#0f548d"}} onClick={() => startScan(true)}>Autoriser la caméra</IonButton>
          </IonRow>
        ) : (
          <ScanArea
            hideBg={appState.hideBg}
            toggleFlash={toggleFlash}
            flashOn={appState.flashOn}
          />
        )}

        {appState.showAlert && (
          <PermissionAlert
            showAlert={appState.showAlert}
            setShowAlert={(showAlert) => updateAppState({ showAlert })}
          />
        )}
      </IonContent>

      {appState.scannedResult && (
        <ScanResultModal
          scannedResult={appState.scannedResult}
          modalisOpen={appState.modalIsOpen}
          closeModal={closeModal}
          setBreakpoint={handleBreakpointChange}
        />
      )}
      
    </>
  );
};

export default Main;