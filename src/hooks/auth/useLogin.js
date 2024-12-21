import { useState, useRef } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import axios from "../../api/axios";
import { useToast } from "../../context/ToastContext"; 

const LOGIN_URL = "/api/auth/login";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const errRef = useRef(null);
  
  const signIn = useSignIn();
  const { triggerToast } = useToast();

  const handleSubmit = async ({ email, password }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(LOGIN_URL, { email, password });
      
      // Successful login
      if (response.status === 200) {
        const { access_token, user } = response.data;

        const isAuthenticated = signIn({
          auth: { token: access_token, type: "Bearer" },
          refresh: access_token,
          userState: user,
        });

        if (isAuthenticated) {
          setSuccess(true)
          triggerToast("Connexion réussie. Vous êtes maintenant connecté.", "success");
        } else {
          triggerToast("Erreur de connexion. Échec de la connexion.", "danger");
          setSuccess(false)
        }
      }
    } catch (error) {
      // Handle API errors
      const errorMessage = error.response?.data?.message || "Échec de la connexion.";
      const errorDetails = error.response?.data?.errors || null;

      setError(errorDetails);
      triggerToast(errorMessage, "danger");

      errRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    loading,
    error,
    errRef,
    success,
  };
};

export default useLogin;
