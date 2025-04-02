export const handlePermissionStatus = (status, updateAppState, BarcodeScanner, startScan) => {
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