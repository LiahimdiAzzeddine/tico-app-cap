import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useIonToast } from "@ionic/react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import axios from "../../api/axios";

const LOGIN_URL = "/api/auth/login";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const errRef = useRef(null);
  const navigate = useNavigate();
  const signIn = useSignIn();
  const [presentToast] = useIonToast();

  const showToast = (message, color) => {
    presentToast({
      message,
      duration: 3000,
      color,
      position: "top",
    });
  };

  const handleSubmit = async (values) => {
    const { email, password } = values;
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(LOGIN_URL, { email, password });
      if (res.status === 200) {
        if (
          signIn({
            auth: {
              token: res.data.access_token,
              type: 'Bearer'
            },
            refresh: res.data.access_token,
            userState: res.data.user
        })
        ) {
          showToast("Connexion réussie. Vous êtes maintenant connecté.", "success");
          navigate("/home", { replace: true });
        } else {
          showToast("Erreur de connexion. Échec de la connexion.", "danger");
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Échec de la connexion";
      const errorDetails = err.response?.data?.errors || {};
      showToast(errorMsg, "danger");
      setError(errorDetails);
      errRef.current?.focus();
    } finally {
      setLoading(false);
    }

};

  return { handleSubmit, loading, error, errRef };
  
};

export default useLogin;
