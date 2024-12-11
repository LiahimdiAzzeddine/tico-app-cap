import React, { useState } from "react";
import useLogin from "../../hooks/auth/useLogin";
import Spinner from "../Spinner";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import CustomModal from "../modales/CustomModal";
import AccountCreationForm from "./Register";
import ForgotPassword from "./ForgotPassword";

const Login = ({createCompte=false}) => {
  const { handleSubmit, loading, error } = useLogin();
  const [values, setValues] = useState({ email: "", password: "" });
  const errors = error || {}; // Using optional chaining
  const [showPassword, setShowPassword] = useState(false);
  const [showModalInscription, setShowModalInscription] = useState(false);
  const [showModalForgetPassword, setShowModalForgetPassword] = useState(false);
  const handleMouseDown = () => {
    setShowPassword(true);
  };

  const handleMouseUp = () => {
    setShowPassword(false);
  };

  return (
    <>
      <div className="flex gap-4 flex-col justify-start items-center h-full">
        <h2 className="h-1/6 text-center text-custom-blue text-3xl titre-bold flex items-center justify-center w-full ">
          Se connecter
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(values);
          }}
          className="space-y-4 w-11/12 max-w-xs h-5/6"
        >
          <div className="flex flex-col items-center">
            <label className="text-orange-500 mb-1 text-base text-center font-bold">
              Mon adresse mail
            </label>
            <input
              type="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className={`w-full p-2 border-[1.5px] rounded-xl focus:outline-none ${
                errors.email
                  ? "border-red-500"
                  : "border-orange-300 focus:border-orange-500"
              }`}
              required
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />
            {errors.email && (
              <p id="email-error" className="text-red-500 text-sm mt-1">
                {errors.email[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center relative w-full">
            <label className="text-orange-500 mb-1 text-base text-center font-bold">
              Mon mot de passe
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                className={`w-full p-2 border-[1.5px] rounded-xl focus:outline-none ${
                  errors.password
                    ? "border-red-500"
                    : "border-orange-300 focus:border-orange-500"
                }`}
                required
                aria-invalid={!!errors.password}
                aria-describedby="password-error"
              />
              <button
                type="button"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
                className="absolute right-3 top-1/2  -translate-y-[35%] text-gray-500 focus:outline-none"
              >
                <IonIcon icon={showPassword ? eyeOffOutline : eyeOutline} />
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="text-red-500 text-sm mt-1">
                {errors.password[0]}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm flex flex-col">
              <div
                onClick={() => {
                  setShowModalForgetPassword(true);
                }}
                className="font-medium text-orange-600 hover:text-orange-500"
              >
                Mot de passe oublié ?
              </div>
            </div>
          </div>

          <div className="pt-3 flex justify-center">
            <button
              className="bg-orange-500 text-white font-bold  text-lg py-2  px-6 rounded-xl  transform transition-transform duration-150 ease-in-out active:scale-90"
              disabled={loading}
              type="submit"
            >
              Se connecter
            </button>
          </div>
          {createCompte&&(
          <div className="flex justify-center">
            <button
              className="font-medium text-orange-600 hover:text-orange-500"
              onClick={() => {
                setShowModalInscription(true);
              }}
            >
              Je crée mon compte
            </button>
          </div>)}
          {errors.account && (
            <p id="password-error" className="text-red-500 text-sm mt-1">
              {errors.account[0]}
            </p>
          )}
        </form>
       
        {/* Full-screen loading overlay */}

        {loading && (
          <div className="h-screen  fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 ">
            <Spinner />
          </div>
        )}
      </div>
      {createCompte&&(
      <CustomModal
        isOpen={showModalInscription}
        onClose={() => setShowModalInscription(false)}
      >
        <AccountCreationForm />
      </CustomModal>
    )}
     <CustomModal
        isOpen={showModalForgetPassword}
        onClose={() => setShowModalForgetPassword(false)}
      >
        <ForgotPassword />
      </CustomModal>
    </>
  );
};

export default Login;
