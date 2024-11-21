import React, { useState } from "react";
import useRegister from "../../hooks/auth/useRegister";
import Spinner from "../Spinner";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { IonIcon, IonButton } from "@ionic/react";

const AccountCreationForm = ({ onClose }) => {
  const [values, setValues] = useState({
    email: "",
    userName: "",
    password: "",
    confirm_password: "",
    role_id: "",
  });

  const [errors, setErrors] = useState({}); // State for input field errors

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const { register, loading } = useRegister(); // Using the new useRegister hook

  const handleMouseDown = () => {
    setShowPassword(true);
  };

  const handleMouseUp = () => {
    setShowPassword(false);
  };

  const ConhandleMouseDown = () => {
    setShowCPassword(true);
  };

  const ConhandleMouseUp = () => {
    setShowCPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors before submission

    try {
      if (values.password !== values.confirm_password) {
        setErrors({
          confirm_password: ["Les mots de passe ne correspondent pas."],
        });
        throw new Error("Les mots de passe ne correspondent pas.");
      }

      await register({
        email: values.email,
        username: values.userName,
        password: values.password,
        password_confirmation: values.confirm_password,
        role_id: 1,
      });

      onClose();
    } catch (err) {
      if (err && err.errors) {
        setErrors(err.errors); // Set field-specific errors from the server response
      }
    }
  };

  return (
    <div className="flex gap-4 flex-col justify-start items-center h-full ">
      <h2 className="text-center titre-bold text-custom-blue text-2xl titre-bold grow">
        Je crée mon{" "}
        <span className="underline underline-offset-4 decoration-orange-400">
          compte
        </span>
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-11/12 max-w-xs grow-[3]"
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
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
          )}
        </div>

        <div className="flex flex-col items-center">
          <label className="text-orange-500 mb-1 text-sm text-center font-bold">
            Mon pseudo
          </label>
          <input
            type="text"
            value={values.userName}
            onChange={(e) => setValues({ ...values, userName: e.target.value })}
            className={`w-full p-2 border-[1.5px] rounded-lg focus:outline-none ${
              errors.username
                ? "border-red-500"
                : "border-orange-300 focus:border-orange-500"
            }`}
            required
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username[0]}</p>
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
            onMouseDown={handleMouseDown} // Affiche le mot de passe
            onMouseUp={handleMouseUp} // Masque le mot de passe
            onTouchStart={handleMouseDown} // Support pour les appareils tactiles
            onTouchEnd={handleMouseUp} // Support pour les appareils tactiles
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

        <div className="flex flex-col items-center relative">
          <label className="text-orange-500 mb-1 text-sm text-center font-bold">
            Confirmer mon mot de passe
          </label>
          <input
            type={showCPassword ? "text" : "password"}
            value={values.confirm_password}
            onChange={(e) =>
              setValues({ ...values, confirm_password: e.target.value })
            }
            className={`w-full p-2 border-[1.5px] rounded-lg focus:outline-none ${
              errors.confirm_password
                ? "border-red-500"
                : "border-orange-300 focus:border-orange-500"
            }`}
            required
            aria-invalid={!!errors.confirm_password} // Accessibilité
            aria-describedby="password-error" // Accessibilité
          />
          <button
            type="button"
            onMouseDown={ConhandleMouseDown} // Affiche le mot de passe
            onMouseUp={ConhandleMouseUp} // Masque le mot de passe
            onTouchStart={ConhandleMouseDown} // Support pour les appareils tactiles
            onTouchEnd={ConhandleMouseUp} // Support pour les appareils tactiles
            className="absolute right-3 top-9 text-gray-500 focus:outline-none"
          >
            <IonIcon icon={showCPassword ? eyeOffOutline : eyeOutline} />
          </button>
          {errors.confirm_password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirm_password[0]}
            </p>
          )}
        </div>
        <div className="pt-3 flex justify-center">
          <button
            className="bg-orange-500 text-white font-bold  text-lg py-2 px-6 rounded-xl  transform transition-transform duration-150 ease-in-out active:scale-90"
            disabled={loading}
            type="submit"
          >
              Valider
          </button>
        </div>
        
      </form>

      
      {/* Full-screen loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default AccountCreationForm;