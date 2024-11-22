import { useState } from "react";
import axios from "../../api/axios";

const useTest = () => {
  const [loading, setLoading] = useState(false);

  const TestLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/authenticate", {
        username: "admin",
        password: "admin",
        rememberMe: "true"
    });

      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Une erreur s'est produite lors de l'enregistrement.";
      throw error.response?.data || error;
    } finally {
      setLoading(false);
    }
  };

  return { TestLogin, loading };
};

export default useTest;
