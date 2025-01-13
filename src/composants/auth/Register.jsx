import React, { useState } from "react";
import useRegister from "../../hooks/auth/useRegister";
import Spinner from "../Spinner";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { IonIcon, IonButton } from "@ionic/react";
import WhiteModal from "../modales/WhiteModal";
import CGUConfidentialite from "../settings/CGUConfidentialite";

const AccountCreationForm = ({ onClose }) => {
  const [values, setValues] = useState({
    email: "",
    userName: "",
    password: "",
    confirm_password: "",
    role_id: "",
  });
  const [acceptedCGUs, setAcceptedCGUs] = useState(false);
  const [errors, setErrors] = useState({}); // State for input field errors
  const [showModalCGU, setShowModalCGU] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const { register, loading } = useRegister(); // Using the new useRegister hook

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Inverse directement l'état
  };
  const toggleConPasswordVisibility = () => {
    setShowCPassword(!showCPassword); // Inverse directement l'état
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
    <div className="flex gap-4 flex-col justify-start items-center h-full">
      <h2 className="h-1/6 text-center text-custom-blue text-3xl titre-bold flex items-center justify-center w-full">
        Je crée mon compte</h2>

        <form onSubmit={handleSubmit} className="space-y-4 w-11/12 max-w-xs h-5/6">
      
        <div className="flex flex-col items-center">
          <label className="text-orange-500 mb-1 text-base text-center font-bold Archivo">
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
            } Archivo`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
          )}
        </div>

        <div className="flex flex-col items-center">
          <label className="text-orange-500 mb-1 text-sm text-center font-bold Archivo">
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
            } Archivo`}
            required
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username[0]}</p>
          )}
        </div>

        <div className="flex flex-col items-center relative">
          <label className="text-orange-500 mb-1 text-sm text-center font-bold Archivo">
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
            } Archivo`}
            required
            aria-invalid={!!errors.password} // Accessibilité
            aria-describedby="password-error" // Accessibilité
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
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
          <label className="text-orange-500 mb-1 text-sm text-center font-bold Archivo">
            Confirmer mon mot de passe
          </label>
          <input
            type={showCPassword ? "text" : "password"}
            value={values.confirm_password}
            onChange={(e) =>
              setValues({ ...values, confirm_password: e.target.value })
            }
            className={`w-full p-2 border-[1.5px] rounded-lg focus:outline-none Archivo ${
              errors.confirm_password
                ? "border-red-500"
                : "border-orange-300 focus:border-orange-500"
            } Archivo`}
            required
            aria-invalid={!!errors.confirm_password} // Accessibilité
            aria-describedby="password-error" 
          />
          <button
            type="button"
            onClick={toggleConPasswordVisibility}
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
        <div className="flex flex-row space-x-2 items-center relative">
        <input
          required
            type="checkbox"
            className="accent-custom-text-orange"
            checked={acceptedCGUs}
            onChange={(e) => setAcceptedCGUs(e.target.checked)}
          />

          <p className="ArchivoLight text-custom-text-orange ">J'ai lu et j'accepte les <a className="underline"  onClick={() => {
                setShowModalCGU(true);
              }}>CGU</a></p>
        </div>
        <div className="pt-3 flex justify-center">
        <button
            className={`bg-custom-text-orange text-white font-bold text-lg py-2 px-6 rounded-xl transform transition-transform duration-150 ease-in-out ${
              acceptedCGUs ? "hover:scale-105 active:scale-95" : "opacity-50 cursor-not-allowed Archivo"
            }`}
            disabled={loading || !acceptedCGUs}
            type="submit"
          >
            Valider
          </button>
        </div>
      </form>

      <WhiteModal
        isOpen={showModalCGU}
        onClose={() => setShowModalCGU(false)} // Handle modal close logic
        ContentPadding = "ion-padding-horizontal"
      >
        <CGUConfidentialite />
      </WhiteModal>
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