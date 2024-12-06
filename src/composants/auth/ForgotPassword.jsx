import React, { useRef, useState } from "react";
import useForgotPassword from "../../hooks/auth/useForgotPassword";
import Spinner from "../Spinner";

const ForgotPassword = () => {
  const { handleForgotPassword, loading, error } = useForgotPassword();
  const [successMessage, setSuccessMessage] = useState(null);
  const errRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    const result = await handleForgotPassword({ email });
    if (result.success) {
      setSuccessMessage("Un email de réinitialisation a été envoyé.");
    } else {
      setSuccessMessage(null);
    }
  };

  return (
    <div className="flex gap-4 flex-col justify-start items-center h-full">
      <h2 className="h-1/6 text-center text-custom-blue text-3xl titre-bold flex items-center justify-center w-full">
        Réinitialiser<br /> le mot de passe
      </h2>

      {successMessage && (
        <div className="mb-4 text-green-500 text-sm">{successMessage}</div>
      )}

      <form onSubmit={onSubmit} className="space-y-4 w-11/12 max-w-xs h-5/6">
        <div className="flex flex-col items-center">
          <label className="text-orange-500 mb-1 text-base text-center font-bold">
            Mon adresse mail
          </label>
          <input
            type="email"
            name="email"
            required
            className={`w-full p-2 border-[1.5px] rounded-xl focus:outline-none ${
              error
                ? "border-red-500"
                : "border-orange-300 focus:border-orange-500"
            }`}
            placeholder="Entrez votre email"
            aria-invalid={!!error}
            aria-describedby="email-error"
          />
          {error && (
            <p id="email-error" className="text-red-500 text-sm mt-1">
              {error}
            </p>
          )}
        </div>

        <div className="pt-3 flex justify-center">
          <button
            type="submit"
            className="bg-orange-500 text-white font-bold text-lg py-2 px-6 rounded-xl transform transition-transform duration-150 ease-in-out active:scale-90"
            disabled={loading}
          >
            Réinitialiser
          </button>
        </div>
      </form>

      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
