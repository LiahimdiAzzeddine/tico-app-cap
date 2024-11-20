import React, { useRef } from "react";
import { Link } from "react-router-dom";
import useForgotPassword from "../../hooks/auth/useForgotPassword"; // Hook pour gérer le mot de passe oublié
import Spinner from "../Spinner"; // Assurez-vous d'avoir un composant Spinner

const ForgotPassword = () => {
  const { handleForgotPassword, loading, error } = useForgotPassword();
  const errRef = useRef(null); // Pour référence à l'erreur

  return (
    <div className="flex gap-4 flex-col justify-start items-center h-full pt-[5vh]">
      <h2 className="text-center text-custom-blue text-2xl font-bold">
        Réinitialiser{" "}
        <span className="underline underline-offset-4 decoration-orange-400">
          le mot de passe
        </span>
      </h2>

      {error && (
        <div ref={errRef} className="mb-4">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const email = e.target.email.value;
          handleForgotPassword(email);
        }}
        className="space-y-4 w-11/12 max-w-xs py-[2vh]"
      >
        <div className="flex flex-col items-center">
          <label className="text-orange-500 mb-1 text-base text-center font-bold">
            Mon adresse mail
          </label>
          <input
            type="email"
            name="email"
            required
            className={`w-full p-2 border-[1.5px] rounded-lg focus:outline-none border-orange-300 focus:border-orange-500`}
            placeholder="Entrez votre email"
            aria-invalid={!!error} // Accessibilité
            aria-describedby="email-error" // Accessibilité
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
            className="w-2/3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200 font-bold"
            disabled={loading}
          >
          Réinitialiser
          </button>
        </div>
      </form>

      <div className="mt-4 w-11/12 max-w-xs">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Ou</span>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <Link to="/register" className="w-2/3">
            <button
              type="button"
              className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200 font-bold"
            >
              S'inscrire
            </button>
          </Link>
        </div>
      </div>

      {/* Full-screen loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
