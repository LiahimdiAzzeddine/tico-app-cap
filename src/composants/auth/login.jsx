import React, { useState, useEffect } from "react"; 
import useLogin from "../../hooks/auth/useLogin";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import CustomModal from "../modales/CustomModal";
import AccountCreationForm from "./Register";
import ForgotPassword from "./ForgotPassword";
import { Capacitor } from '@capacitor/core';
import { SavePassword } from 'capacitor-ios-autofill-save-password';
import { IonButton, IonInput, IonLabel, IonItem, IonIcon,useIonLoading } from '@ionic/react';

const Login = ({ createCompte = false, redirection }) => {
  const { handleSubmit, loading, error, success } = useLogin();
  const [values, setValues] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showModalInscription, setShowModalInscription] = useState(false);
  const [showModalForgetPassword, setShowModalForgetPassword] = useState(false);
  const [present, dismiss] = useIonLoading();

  const savePassword = async () => {
    if (Capacitor.getPlatform() === 'ios') {
      SavePassword.promptDialog({
        username: values.email,
        password: values.password,
      })
      .then(() => console.log('promptDialog success'))
      .catch((err) => console.error('promptDialog failure', err));
    }
  };

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

  useEffect(() => {
    if (success) {
      savePassword();
      redirection();
    }
  }, [success]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Inverse directement l'état
  };

  const errors = error || {};

  return (
    <>
      <div className="flex gap-4 flex-col justify-start items-center h-full">
        <h2 className="h-1/6 text-center text-custom-blue text-3xl titre-bold flex items-center justify-center w-full">
          Se&nbsp;connecter
        </h2>

        <form onSubmit={handleSubmitLogin} autoComplete="on">
  <IonItem>
    <IonLabel position="stacked">Mon adresse mail</IonLabel>
    <IonInput
      name="email"
      type="email"
      value={values.email}
      onIonChange={handleChange}
      required
      autocomplete="username"
    />
  </IonItem>

  <IonItem>
    <IonLabel position="stacked">Mon mot de passe</IonLabel>
    <IonInput
      name="password"
      type={showPassword ? "text" : "password"}
      value={values.password}
      onIonChange={handleChange}
      required
      autocomplete="current-password"
    />
    <IonButton onClick={togglePasswordVisibility}>
      <IonIcon icon={showPassword ? eyeOffOutline : eyeOutline} />
    </IonButton>
  </IonItem>

  <IonButton type="submit" expand="full" disabled={loading}>
    Se connecter
  </IonButton>
</form>
      </div>

      {/* Modals */}
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
