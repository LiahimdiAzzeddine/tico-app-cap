import { useState, useEffect } from "react";
import { NativeBiometric } from "capacitor-native-biometric";

const useBiometricAuth = (handleSubmit) => {
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometricError, setBiometricError] = useState("");
  const [hasCredentials, setHasCredentials] = useState(false);
  const [saveBiometric, setSaveBiometric] = useState(false);

  // Vérifier si la biométrie est disponible
  const checkBiometricAvailability = async () => {
    try {
      const { isAvailable } = await NativeBiometric.isAvailable();
      setBiometricAvailable(isAvailable);
      if (isAvailable) {
        await checkExistingCredentials();
      }
    } catch (error) {
      console.error("Erreur vérification biométrique:", error);
    }
  };

  // Vérifier si des credentials existent
  const checkExistingCredentials = async () => {
    try {
      const credentials = await NativeBiometric.getCredentials({
        server: "com.votreappazz.id",
      });
      setHasCredentials(!!credentials.username && !!credentials.password);
    } catch {
      setHasCredentials(false);
    }
  };

  // Authentification avec Face ID
  const loadCredentialsWithBiometric = async () => {
    if (!biometricAvailable) return;
    try {
      await NativeBiometric.verifyIdentity({
        reason: "Connexion via Face ID",
        title: "Authentification requise",
        subtitle: "Utilisez Face ID pour vous connecter",
        description: "Placez votre visage devant l'appareil",
      });

      const credentials = await NativeBiometric.getCredentials({
        server: "com.votreappazz.id",
      });

      if (credentials.username && credentials.password) {
        await handleSubmit({
          email: credentials.username,
          password: credentials.password,
        });
      }
    } catch (error) {
      setBiometricError("Erreur d'authentification: " + error.message);
    }
  };

  // Sauvegarde des credentials
  const saveCredentialsWithBiometric = async (values) => {
    if (!biometricAvailable || !saveBiometric || !values.email || !values.password) {
      setBiometricError("Pas d'identifiants à sauvegarder");
      return;
    }
    try {
      await NativeBiometric.setCredentials({
        username: values.email,
        password: values.password,
        server: "com.votreappazz.id",
      });
      console.log("Identifiants enregistrés avec succès");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      setBiometricError("Erreur lors de la sauvegarde");
    }
  };

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  return {
    biometricAvailable,
    biometricError,
    hasCredentials,
    saveBiometric,
    setSaveBiometric,
    loadCredentialsWithBiometric,
    saveCredentialsWithBiometric,
  };
};

export default useBiometricAuth;
