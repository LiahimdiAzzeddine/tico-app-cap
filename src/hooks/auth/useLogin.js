import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import axios from "../../api/axios";

const LOGIN_URL = "/api/auth/login";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const errRef = useRef(null);
  const navigate = useNavigate();
  const signIn = useSignIn();

  const handleSubmit = async (values) => {
    const { email, password } = values;
    setLoading(true);
    setError(null); // Reset error on new submission

    try {
      const res = await axios.post(LOGIN_URL, { email, password });
      
      if (res.status === 200) {
        if (signIn({
            auth: {
              token: res.data.access_token,
              type: 'Bearer'
            },
            refresh: res.data.access_token,
            userState: res.data.user
        })) {
          notification.success({
            message: "Connexion réussie",
            description: "Vous êtes maintenant connecté.",
          });
          navigate("/", { replace: true });
        } else {
          notification.error({
            message: "Erreur de connexion",
            description: "Échec de la connexion.",
          });
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Échec de la connexion";
      const errorDetails = err.response?.data?.errors || {};

      const formattedErrors = errorDetails && Object.keys(errorDetails).length > 0 
        ? Object.keys(errorDetails).map((key) => errorDetails[key].join(", ")) 
        : [];

      notification.error({
        message: "Erreur de connexion",
        description: errorMsg,
      });

      setError({ message: errorMsg, details: formattedErrors });
      errRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, error, errRef };
};

export default useLogin;
