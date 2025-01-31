import { useState, useEffect } from 'react';
import { NativeBiometric } from 'capacitor-native-biometric';

const SERVER_ID = 'com.votreappazz.id';

export const useBiometricAuth = () => {
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [hasCredentials, setHasCredentials] = useState(false);
  const [biometricError, setBiometricError] = useState('');

  const checkBiometricAvailability = async () => {
    try {
      const { isAvailable } = await NativeBiometric.isAvailable();
      setBiometricAvailable(isAvailable);
      if (isAvailable) {
        await checkExistingCredentials();
      }
    } catch (error) {
      console.log('Erreur lors de la vérification biométrique:', error);
      setBiometricError('Vérification biométrique impossible');
    }
  };

  const saveCredentialsWithBiometric = async (credentials) => {
    if (biometricAvailable) {
      try {
        if (!credentials.username || !credentials.password) {
          setBiometricError('Pas d\'identifiants à sauvegarder');
          return;
        }

        await NativeBiometric.setCredentials({
          username: credentials.username,
          password: credentials.password,
          server: SERVER_ID,
        });

        console.log('Identifiants sauvegardés avec succès');
      } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        setBiometricError('Erreur lors de la sauvegarde des identifiants');
      }
    }
  };

  const loadCredentialsWithBiometric = async (handleSubmit) => {
    if (biometricAvailable) {
      try {
        await NativeBiometric.verifyIdentity({
          reason: 'Connexion via Face ID',
          title: 'Authentification requise',
          subtitle: 'Utilisez Face ID pour vous connecter',
          description: 'Placez votre visage devant l\'appareil',
        });

        const credentials = await NativeBiometric.getCredentials({
          server: SERVER_ID,
        });

        if (credentials.username && credentials.password) {
          await handleSubmit({
            email: credentials.username,
            password: credentials.password,
          });
        }
      } catch (error) {
        setBiometricError('Erreur lors de l\'authentification: ' + error.message);
      }
    }
  };

  const checkExistingCredentials = async () => {
    try {
      const credentials = await NativeBiometric.getCredentials({
        server: SERVER_ID,
      });
      setHasCredentials(!!credentials.username && !!credentials.password);
    } catch {
      setHasCredentials(false);
    }
  };

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  return {
    biometricAvailable,
    hasCredentials,
    biometricError,
    checkBiometricAvailability,
    loadCredentialsWithBiometric,
    saveCredentialsWithBiometric,
    checkExistingCredentials,
  };
};