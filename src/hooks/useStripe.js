import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../api/axios";
const pk_key = import.meta.env.VITE_BACKEND_PKKEY; 

const stripePromise = loadStripe(pk_key);

const useStripe = () => {
  const [loading, setLoading] = useState(false);
  let timeoutId;
  const handleDonate = async (amount) => {
    try {
      setLoading(true);
      timeoutId = setTimeout(() => {
        setLoading(false);
        console.error("Temps limite dépassé lors de la donation.");
      }, 10000); // 10 secondes
      const stripe = await stripePromise;
      const response = await axios.post("api/create-checkout-session", { amount });
      const sessionId = response.data.id;
      await stripe.redirectToCheckout({ sessionId });
      clearTimeout(timeoutId);
    } catch (error) {
      console.error("Erreur lors de la donation :", error);
    } finally {
      setLoading(false);
    }
  };

  return { handleDonate, loading };
};

export default useStripe;
