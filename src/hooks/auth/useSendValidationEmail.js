import { useState } from "react";
import axios from "../../api/axios";
import { useToast } from "../../context/ToastContext"; 

const LOGIN_URL = "/api/send-registration-validation";

const useSendValidationEmail = ({ to_email,setStatus }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);  // State to track loading status
  const { triggerToast } = useToast();

  const sendValidationEmail = async () => {
    setLoading(true);  // Set loading to true when starting the request
    setError(null);    // Clear any previous errors
    setSuccess(false); // Reset success state before trying to send again

    try {
      const response = await axios.post(LOGIN_URL, { to_email });
      
      // Handle success response
      if (response.status === 200) {
        setSuccess(true);
        triggerToast("Email de validation envoyé avec succès", "success"); // Show success toast
        setStatus(null)
      }
    } catch (err) {
      // Handle error response
      setError(err.response?.data?.message || "Une erreur est survenue"); // Set error message
      triggerToast(err.response?.data?.message || "Une erreur est survenue", "error"); // Show error toast
    } finally {
      setLoading(false); // Reset loading state after the request is finished
    }
  };

  return {
    loading,
    error,
    success,
    sendValidationEmail, // Return the function to trigger email sending
  };
};

export default useSendValidationEmail;
