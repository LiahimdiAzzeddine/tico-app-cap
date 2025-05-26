import React, { useState, useEffect } from "react";
import useLogin from "../../hooks/auth/useLogin";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import FaceId from "../../assets/auth/face-id.svg";
import {
  IonIcon,
  useIonLoading,
  IonCheckbox,
  IonActionSheet,
} from "@ionic/react";
import CustomModal from "../modales/CustomModal";
import AccountCreationForm from "./Register";
import ForgotPassword from "./ForgotPassword";

import { useBiometricAuth } from "../../hooks/auth/useBiometricAuth"; // Import the new hook
import useSendValidationEmail from "../../hooks/auth/useSendValidationEmail";

const Login = ({ createCompte = false, redirection }) => {
  const { handleSubmit, loading, error, success, status,setStatus } = useLogin();
  const [values, setValues] = useState({ email: "", password: "" });
  const {  sendValidationEmail } = useSendValidationEmail({ to_email: values.email,setStatus });

  const {
    biometricAvailable,
    hasCredentials,
    biometricError,
    loadCredentialsWithBiometric,
    saveCredentialsWithBiometric,
  } = useBiometricAuth(); // Use the new hook

  
  const [showPassword, setShowPassword] = useState(false);
  const [showModalInscription, setShowModalInscription] = useState(false);
  const [showModalForgetPassword, setShowModalForgetPassword] = useState(false);
  const [present, dismiss] = useIonLoading();
  const [saveBiometric, setSaveBiometric] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    await present({
      mode: "ios",
      spinner: "bubbles",
      cssClass: "custom-loading-dialog",
    });

    await handleSubmit(values);
    await dismiss();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleCheckboxClick = (e) => {
    if (!saveBiometric) {
      setShowActionSheet(true);
      e.preventDefault();
    } else {
      setSaveBiometric(false);
    }
  };

  const acceptBiometric = () => {
    setSaveBiometric(true);
    setShowActionSheet(false);
  };

  const declineBiometric = () => {
    setSaveBiometric(false);
    setShowActionSheet(false);
  };

  useEffect(() => {
    if (success && saveBiometric) {
      saveCredentialsWithBiometric({
        username: values.email,
        password: values.password,
      });
    }
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

        {biometricError && (
          <div className="text-red-500 text-sm mt-1">{biometricError}</div>
        )}
        <form
          onSubmit={handleSubmitLogin}
          autocorrect="on"
          autoComplete="on"
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
                className={`w-full p-2 border-[1.5px] rounded-xl ${
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
                className="absolute right-3  text-gray-500"
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

          {/* Mot de passe oublié */}
          <div className="flex items-center justify-between">
            <div
              onClick={() => setShowModalForgetPassword(true)}
              className="font-medium text-custom-text-orange hover:text-custom-text-orange cursor-pointer Archivo"
            >
              Mot de passe oublié ?
            </div>
            {biometricAvailable && !hasCredentials && (
              <IonCheckbox
                checked={saveBiometric}
                onClick={handleCheckboxClick}
              >
                Activer Face ID
              </IonCheckbox>
            )}
          </div>

          {/* Bouton Se connecter */}
          <div className="pt-3 flex justify-center flex-row gap-3">
            <button
              className="bg-custom-text-orange text-white font-bold text-lg py-2 px-6 rounded-xl transform transition-transform duration-150 ease-in-out active:scale-90 Archivo"
              disabled={loading}
              type="submit"
            >
              Se&nbsp;connecter
            </button>
            {/* Bouton Face ID */}
            {biometricAvailable && hasCredentials && (
              <button
                onClick={() => loadCredentialsWithBiometric(handleSubmit)}
                className="bg-custom-blue text-white font-bold text-lg py-2 px-2 rounded-xl transform transition-transform duration-150 ease-in-out active:scale-90 Archivo"
              >
                <img src={FaceId} className="w-8 h-auto" />
              </button>
            )}
          </div>

          {/* Création de compte */}
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

          {/* Message d'erreur général */}
          {errors.account && (
            <p className="text-red-500 text-sm mt-1">
              {errors.account[0] ? errors.account[0] : errors.message}
            </p>
          )}

          {status ==404 && (
            <div
            onClick={sendValidationEmail}
              className="font-medium text-custom-text-orange hover:text-custom-text-orange cursor-pointer Archivo"
            >
            Demander un nouveau lien de validation
            </div>
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
      {/* IonActionSheet for Face ID confirmation */}
      <IonActionSheet
        mode={"ios"}
        isOpen={showActionSheet}
        onDidDismiss={() => setShowActionSheet(false)}
        header="Activer Face ID"
        subHeader=" En activant cette option, vos identifiants seront enregistrés et
            pourront être utilisés pour une connexion rapide avec Face ID."
        buttons={[
          {
            text: "Activer Face ID",
            role: "success",
            handler: () => {
              acceptBiometric();
            },
          },
          {
            text: "Annuler",
            role: "cancel",
            handler: () => {
              declineBiometric();
            },
          },
        ]}
      />
    </>
  );
};

export default Login;
