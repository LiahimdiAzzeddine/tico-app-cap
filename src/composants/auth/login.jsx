import React, { useState, useEffect } from "react";
import useLogin from "../../hooks/auth/useLogin";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { IonIcon, useIonLoading } from "@ionic/react";
import CustomModal from "../modales/CustomModal";
import AccountCreationForm from "./Register";
import ForgotPassword from "./ForgotPassword";
import { Capacitor } from '@capacitor/core';
import { NativeBiometric } from "capacitor-native-biometric";

const Login = ({ createCompte = false, redirection }) => {
  const { handleSubmit, loading, error, success } = useLogin();
  const [values, setValues] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showModalInscription, setShowModalInscription] = useState(false);
  const [showModalForgetPassword, setShowModalForgetPassword] = useState(false);
  const [present, dismiss] = useIonLoading();

  // 🔹 Fonction pour enregistrer les identifiants avec la biométrie
  const savePasswordToBiometric = async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        const isAvailable = await NativeBiometric.isAvailable();
        if (isAvailable) {
          await NativeBiometric.setCredentials({
            username: values.email,
            password: values.password,
            server: "tico-app",
          });
          console.log("Identifiants enregistrés avec la biométrie");
        } else {
          console.warn("La biométrie n'est pas disponible");
        }
      } catch (error) {
        console.error("Erreur lors de l'enregistrement des identifiants :", error);
      }
    }
  };

  // 🔹 Récupérer les identifiants stockés après authentification biométrique
  const authenticateAndLoadCredentials = async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        const isAvailable = await NativeBiometric.isAvailable();
        if (isAvailable) {
          const verified = await NativeBiometric.verifyIdentity({
            reason: "Authentifiez-vous pour remplir votre identifiant",
            title: "Connexion sécurisée",
            subtitle: "Utilisez votre empreinte ou Face ID",
          });

          if (verified) {
            const credentials = await NativeBiometric.getCredentials({ server: "tico-app" });
            if (credentials) {
              setValues((prev) => ({
                ...prev,
                email: credentials.username || "",
                password: credentials.password || "",
              }));
            }
          }
        }
      } catch (error) {
        console.warn("Aucun identifiant trouvé ou authentification échouée :", error);
      }
    }
  };

  // 🔹 Récupérer les identifiants à l’ouverture de l’application
  useEffect(() => {
    authenticateAndLoadCredentials();
  }, []);

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

  // 🔹 Sauvegarde les identifiants après une connexion réussie
  useEffect(() => {
    if (success) {
      savePasswordToBiometric();
      redirection();
    }
  }, [success]);

  return (
    <>
      <div className="flex gap-4 flex-col justify-start items-center h-full">
        <h2 className="h-1/6 text-center text-custom-blue text-3xl titre-bold flex items-center justify-center w-full">
          Se&nbsp;connecter
        </h2>

        <form
          onSubmit={handleSubmitLogin}
          autocorrect="on"
          autoComplete="on"
          className="space-y-4 w-11/12 max-w-xs h-5/6"
        >
          {/* Email Input */}
          <div className="flex flex-col items-center">
            <label htmlFor="email" className="text-custom-text-orange mb-1 text-base text-center font-bold Archivo">
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
                error?.email ? "border-red-500" : "border-orange-300 focus:border-custom-text-orange"
              } Archivo`}
              required
              autoComplete="username"
            />

            {error?.email && <p className="text-red-500 text-sm mt-1">{error.email[0]}</p>}
          </div>

          {/* Password Input */}
          <div className="flex flex-col items-center relative w-full">
            <label htmlFor="password" className="text-custom-text-orange mb-1 text-base text-center font-bold Archivo">
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
                  error?.password ? "border-red-500" : "border-orange-300 focus:border-custom-text-orange"
                } Archivo`}
                required
                autoComplete="current-password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-[35%] text-gray-500 focus:outline-none"
              >
                <IonIcon icon={showPassword ? eyeOffOutline : eyeOutline} />
              </button>
            </div>
            {error?.password && <p className="text-red-500 text-sm mt-1">{error.password[0]}</p>}
          </div>

          {/* Forgot Password */}
          <div className="flex items-center justify-between">
            <div onClick={() => setShowModalForgetPassword(true)} className="font-medium text-custom-text-orange hover:text-custom-text-orange cursor-pointer Archivo">
              Mot de passe oublié ?
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-3 flex justify-center">
            <button className="bg-custom-text-orange text-white font-bold text-lg py-2 px-6 rounded-xl transform transition-transform duration-150 ease-in-out active:scale-90 Archivo" disabled={loading} type="submit">
              Se&nbsp;connecter
            </button>
          </div>

          {/* Create Account */}
          {createCompte && (
            <div className="flex justify-center">
              <button type="button" className="font-medium text-custom-text-orange hover:text-custom-text-orange Archivo" onClick={() => setShowModalInscription(true)}>
                Je&nbsp;crée&nbsp;mon&nbsp;compte
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Login;
