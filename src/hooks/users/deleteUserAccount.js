import { useState } from "react";
import useAxiosPrivate from "../useAxiosPrivate";

const deleteUserAccount = () => {
  const privateClient = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const deleteAccount = async () => {
    try {
      setLoading(true);
      const response = await privateClient.post("/api/profile/delete-account");
      const successMessage = response.data.message;
      setSuccess(successMessage);
      setError(null);
      return { success: true, message: successMessage };
    } catch (err) {
      const errorMessage = err.response ? err.response.data.error : "Une erreur est survenue";
      setError(errorMessage);
      setSuccess(null);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { deleteAccount, loading, error, success };
};

export default deleteUserAccount;
