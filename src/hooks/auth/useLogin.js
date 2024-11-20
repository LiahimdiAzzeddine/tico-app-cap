import { useState, useRef } from "react";
import { useHistory } from "react-router-dom"; 
import useSignIn from "react-auth-kit/hooks/useSignIn";
import axios from "../../api/axios";
import { useToast } from "../../context/ToastContext"; 

const LOGIN_URL = "/api/auth/login";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const errRef = useRef(null);
  const history = useHistory();
  const signIn = useSignIn();
  const { triggerToast } = useToast(); // Use the ToastContext for notifications

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
          triggerToast("Connexion réussie. Vous êtes maintenant connecté.", "success");
          history.replace("/scanner")
        } else {
          triggerToast("Erreur de connexion. Échec de la connexion.", "danger");
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Échec de la connexion";
      const errorDetails = err.response?.data?.errors || {};
      triggerToast(errorMsg, "danger");
      setError(errorDetails);
      errRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, error, errRef };
};

export default useLogin;
