import React, { useState, useEffect } from "react";
import useLogin from "../../hooks/auth/useLogin";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { IonIcon, useIonLoading } from "@ionic/react";
import CustomModal from "../modales/CustomModal";
import AccountCreationForm from "./Register";
import ForgotPassword from "./ForgotPassword";
import { Capacitor } from "@capacitor/core";
import { NativeBiometric } from "capacitor-native-biometric";

const Login = ({ createCompte = false, redirection }) => {
  const { handleSubmit, loading, error, success } = useLogin();
  const [values, setValues] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showModalInscription, setShowModalInscription] = useState(false);
  const [showModalForgetPassword, setShowModalForgetPassword] = useState(false);
  const [present, dismiss] = useIonLoading();
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometricError, setBiometricError] = useState("");
  const [isFaceIdActivated, setIsFaceIdActivated] = useState(false);
  const [hasCredentials, setHasCredentials] = useState(false);

  // Vérification de la disponibilité de Face ID
  const checkBiometricAvailability = async () => {
    try {
      const { isAvailable } = await NativeBiometric.isAvailable();
      setBiometricAvailable(isAvailable);
      if (isAvailable) {
        // Vérifie si des credentials existent déjà
        const hasExistingCredentials = await checkExistingCredentials();
        setIsFaceIdActivated(hasExistingCredentials);
      }
    } catch (error) {
      setBiometricError("Erreur lors de la vérification biométrique:" + error);
    }
  };

  // Activation de Face ID
  const activateFaceId = async () => {
    if (biometricAvailable) {
      try {
        // Vérifie d'abord si l'utilisateur peut utiliser Face ID
        await NativeBiometric.verifyIdentity({
          reason: "Pour activer Face ID",
          title: "Activation Face ID",
          subtitle: "Configurez Face ID pour les prochaines connexions",
          description: "Authentification requise",
        });

        // Si la vérification réussit, on sauvegarde les credentials actuels
        await saveCredentialsWithBiometric();
        setIsFaceIdActivated(true);
      } catch (error) {
        if (error.code === "BIOMETRIC_CANCELED") {
          setBiometricError("Activation annulée par l'utilisateur");
        } else {
          setBiometricError("Erreur lors de l'activation de Face ID");
        }
      }
    }
  };

  // Sauvegarde des identifiants avec biométrie
  const saveCredentialsWithBiometric = async () => {
    if (biometricAvailable && values.email && values.password) {
      try {
        await NativeBiometric.setCredentials({
          username: values.email,
          password: values.password,
          server: "com.votreapp.id",
        });
        console.log("Identifiants sauvegardés avec succès");
        return true;
      } catch (error) {
        console.error("Erreur lors de la sauvegarde:", error);
        setBiometricError("Erreur lors de la sauvegarde");
        return false;
      }
    }
    return false;
  };

  // Vérification de l'existence des credentials
  const checkExistingCredentials = async () => {
    if (biometricAvailable) {
      try {
        const credentials = await NativeBiometric.getCredentials({
          server: "com.votreapp.id",
        });
        const hasCredentials = Boolean(credentials?.username && credentials?.password);
        setHasCredentials(hasCredentials);
        return hasCredentials;
      } catch (error) {
        setHasCredentials(false);
        return false;
      }
    }
    return false;
  };

  // Login avec Face ID
  const loginWithFaceId = async () => {
    if (biometricAvailable && isFaceIdActivated) {
      try {
        await NativeBiometric.verifyIdentity({
          reason: "Pour vous connecter",
          title: "Face ID",
          subtitle: "Utilisez Face ID pour vous connecter",
          description: "Authentification requise",
        });

        const credentials = await NativeBiometric.getCredentials({
          server: "com.votreapp.id",
        });

        if (credentials && credentials.username && credentials.password) {
          await handleSubmit({
            email: credentials.username,
            password: credentials.password,
          });
        }
      } catch (error) {
        if (error.code === "BIOMETRIC_CANCELED") {
          setBiometricError("Authentification annulée par l'utilisateur");
        } else {
          setBiometricError("Échec de l'authentification");
        }
      }
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    await present({
      mode: "ios",
      spinner: "bubbles",
      cssClass: "custom-loading-dialog",
    });

    const success = await handleSubmit(values);
    if (success && biometricAvailable && !isFaceIdActivated) {
      // Propose d'activer Face ID après une connexion réussie
      const shouldActivate = window.confirm("Voulez-vous activer Face ID pour vos prochaines connexions ?");
      if (shouldActivate) {
        await activateFaceId();
      }
    }
    
    await dismiss();
  };

  // Reste du code inchangé...
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const initialize = async () => {
      await checkBiometricAvailability();
    };
    initialize();
  }, []);

  useEffect(() => {
    if (success) {
      redirection();
    }
  }, [success]);

  const errors = error || {};

  return (
    <>
      <div className="flex gap-4 flex-col justify-start items-center h-full">
        <h2 className="h-1/6 text-center text-custom-blue text-3xl titre-bold flex items-center justify-center w-full">
          Se&nbsp;connecter
        </h2>

        {/* Boutons Face ID */}
        {biometricAvailable && (
          <>
            {isFaceIdActivated ? (
              <button
                onClick={loginWithFaceId}
                className="mb-4 bg-custom-blue text-white font-bold py-2 px-4 rounded-xl Archivo"
              >
                Se connecter avec Face ID
              </button>
            ) : (
              <button
                onClick={activateFaceId}
                className="mb-4 bg-custom-blue text-white font-bold py-2 px-4 rounded-xl Archivo"
              >
                Activer Face ID
              </button>
            )}
          </>
        )}
        
        {biometricError && (
          <div className="text-red-500 text-sm mt-1">{biometricError}</div>
        )}

        {/* Reste du formulaire inchangé... */}
        <form
          onSubmit={handleSubmitLogin}
          autocorrect="on"
          autoComplete="on"
          className="space-y-4 w-11/12 max-w-xs h-5/6"
        >
          {/* Email Input */}
          <div className="flex flex-col items-center">
            <label
              htmlFor="email"
              className="text-custom-text-orange mb-1 text-base text-center font-bold Archivo"
            >
              Mon adresse mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autocorrect="on"
              value={values.email}
              onChange={handleChange}
              className={`w-full p-2 border-[1.5px] rounded-xl focus:outline-none ${
                errors.email
                  ? "border-red-500"
                  : "border-orange-300 focus:border-custom-text-orange"
              } Archivo`}
              required
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
              autoComplete="username"
            />
            {errors.email && (
              <p id="email-error" className="text-red-500 text-sm mt-1">
                {errors.email[0]}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="flex flex-col items-center relative w-full">
            <label
              htmlFor="password"
              className="text-custom-text-orange mb-1 text-base text-center font-bold Archivo"
            >
              Mon mot de passe
            </label>
            <div className="relative w-full">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autocorrect="on"
                value={values.password}
                onChange={handleChange}
                className={`w-full p-2 border-[1.5px] rounded-xl focus:outline-none ${
                  errors.password
                    ? "border-red-500"
                    : "border-orange-300 focus:border-custom-text-orange"
                } Archivo`}
                required
                aria-invalid={!!errors.password}
                aria-describedby="password-error"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-[35%] text-gray-500 focus:outline-none"
              >
                <IonIcon icon={showPassword ? eyeOffOutline : eyeOutline} />
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="text-red-500 text-sm mt-1">
                {errors.password[0]}
              </p>
            )}
          </div>

          {/* Autres éléments du formulaire inchangés... */}
          <div className="flex items-center justify-between">
            <div
              onClick={() => setShowModalForgetPassword(true)}
              className="font-medium text-custom-text-orange hover:text-custom-text-orange cursor-pointer Archivo"
            >
              Mot de passe oublié ?
            </div>
          </div>

          <div className="pt-3 flex justify-center">
            <button
              className="bg-custom-text-orange text-white font-bold text-lg py-2 px-6 rounded-xl transform transition-transform duration-150 ease-in-out active:scale-90 Archivo"
              disabled={loading}
              type="submit"
            >
              Se&nbsp;connecter
            </button>
          </div>

          {createCompte && (
            <div className="flex justify-center">
              <button
                type="button"
                className="font-medium text-custom-text-orange hover:text-custom-text-orange Archivo"
                onClick={() => setShowModalInscription(true)}
              >
                Je&nbsp;crée&nbsp;mon&nbsp;compte
              </button>
            </div>
          )}

          {errors.account && (
            <p className="text-red-500 text-sm mt-1">{errors.account[0]}</p>
          )}
        </form>
      </div>

      {/* Modales */}
      {createCompte && (
        <CustomModal
          isOpen={showModalInscription}
          onClose={() => setShowModalInscription(false)}
        >
          <AccountCreationForm />
        </CustomModal>
      )}
      <CustomModal
        isOpen={showModalForgetPassword}
        onClose={() => setShowModalForgetPassword(false)}
      >
        <ForgotPassword />
      </CustomModal>
    </>
  );
};

export default Login;