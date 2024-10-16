import React, { useState } from "react";
import useLogin from "../../hooks/auth/useLogin";
import { Link } from "react-router-dom";
import Spinner from "../composants/Spinner";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

const Login = () => {
  const { handleSubmit, loading, error } = useLogin();
  const [values, setValues] = useState({ email: "", password: "" });
  const errors = error || {}; // Utilisation de l'opérateur de chaînage optionnel
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex gap-4 flex-col justify-start items-center h-full pt-[5vh]">
      <h2 className="text-center text-[#006aff] text-2xl font-bold">
        Se{" "}
        <span className="underline underline-offset-4 decoration-orange-400">
          connecter
        </span>
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(values);
        }}
        className="space-y-4 w-11/12 max-w-xs py-[2vh]"
      >
        <div className="flex flex-col items-center">
          <label className="text-orange-500 mb-1 text-base text-center font-bold">
            Mon adresse mail
          </label>
          <input
            type="email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            className={`w-full p-2 border-[1.5px] rounded-lg focus:outline-none ${
              errors.email
                ? "border-red-500"
                : "border-orange-300 focus:border-orange-500"
            }`}
            required
            aria-invalid={!!errors.email} // Accessibilité
            aria-describedby="email-error" // Accessibilité
          />
          {errors.email && (
            <p id="email-error" className="text-red-500 text-sm mt-1">
              {errors.email[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col items-center relative">
          <label className="text-orange-500 mb-1 text-sm text-center font-bold">
            Mon mot de passe
          </label>
          <input
            type={showPassword ? "text" : "password"} // Toggle input type based on state
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            className={`w-full p-2 border-[1.5px] rounded-lg focus:outline-none ${
              errors.password
                ? "border-red-500"
                : "border-orange-300 focus:border-orange-500"
            }`}
            required
            aria-invalid={!!errors.password} // Accessibilité
            aria-describedby="password-error" // Accessibilité
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500 focus:outline-none"
          >
            <IonIcon icon={showPassword ? eyeOffOutline : eyeOutline} />
          </button>
          {errors.password && (
            <p id="password-error" className="text-red-500 text-sm mt-1">
              {errors.password[0]}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link
              to="/forget-password"
              className="font-medium text-orange-600 hover:text-orange-500"
            >
              Mot de passe oublié ?
            </Link>
          </div>
        </div>
        <div className="pt-3 flex justify-center">
          <button
            type="submit"
            className="w-2/3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200 font-bold"
            disabled={loading}
          >
            Connexion
          </button>
        </div>
      </form>

      {/** 
      <div className="mt-4  w-11/12 max-w-xs">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Ou</span>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
      
          <button
            type="submit"
            className="w-2/3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200 font-bold"
            disabled={loading}
          >
           S'inscrire
          </button>
        </div>
      </div>*/}

      {/* Full-screen loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 ">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Login;
