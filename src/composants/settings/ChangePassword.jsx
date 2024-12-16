import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "../Spinner";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { useToast } from "../../context/ToastContext";
import useChangePassword from "../../hooks/auth/useChangePassword";

const ChangePassword = ({Close=null}) => {
  const location = useLocation();
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState("");

  const { triggerToast } = useToast();
  const { changePassword, loading, error,onClose } = useChangePassword(); // Use the hook
  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    // Extraire les paramètres de l'URL
    const params = new URLSearchParams(location.search);
    const emailParam = params.get("email");
    const tokenParam = params.get("token");
    if (emailParam && tokenParam) {
      setEmail(emailParam);
      setToken(tokenParam);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (values.newPassword !== values.confirmPassword) {
      triggerToast("Les mots de passe ne correspondent pas", "danger");
      return;
    }

    // Call changePassword from the hook
    await changePassword(
      values.oldPassword,
      values.newPassword,
      values.confirmPassword,
      email,
      token,
    );
    if(onClose){
      Close(false);
    }
  };

  const togglePasswordVisibility = (field, value) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="flex gap-4 flex-col justify-start items-center h-full">
      <h2 className="h-1/6 text-center text-custom-blue text-3xl titre-bold flex items-center justify-center w-full">
        Changer mon mot de passe
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 w-11/12 max-w-xs 5/6">
        {/* Ancien mot de passe */}
        {!email && (
          <div className="flex flex-col items-center relative w-full">
            <label className="text-orange-500 mb-1 text-base text-center font-bold">
              Ancien mot de passe
            </label>
            <div className="relative w-full">
              <input
                type={showPasswords.old ? "text" : "password"}
                value={values.oldPassword}
                onChange={(e) =>
                  setValues({ ...values, oldPassword: e.target.value })
                }
                className={`w-full p-2 border-[1.5px] rounded-xl focus:outline-none ${
                  error?.current_password
                    ? "border-red-500"
                    : "border-orange-300 focus:border-orange-500"
                }`}
                aria-invalid={!!error?.current_password}
                required
              />
              <button
                type="button"
                onMouseDown={() => togglePasswordVisibility("old", true)}
                onMouseUp={() => togglePasswordVisibility("old", false)}
                onTouchStart={() => togglePasswordVisibility("old", true)}
                onTouchEnd={() => togglePasswordVisibility("old", false)}
                className="absolute right-3 top-1/2  -translate-y-[35%] text-gray-500 focus:outline-none"
              >
                <IonIcon
                  icon={showPasswords.old ? eyeOffOutline : eyeOutline}
                />
              </button>
            </div>
            {error?.current_password && (
              <p id="password-error" className="text-red-500 text-sm mt-1">
                {error.current_password[0]}
              </p>
            )}
          </div>
        )}

        {/* Nouveau mot de passe */}
        <div className="flex flex-col items-center relative w-full">
          <label className="text-orange-500 mb-1 text-base text-center font-bold">
            Nouveau mot de passe
          </label>
          <div className="relative w-full">
            <input
              type={showPasswords.new ? "text" : "password"}
              value={values.newPassword}
              onChange={(e) =>
                setValues({ ...values, newPassword: e.target.value })
              }
              className={`w-full p-2 border-[1.5px] rounded-xl focus:outline-none ${
                error?.new_password
                  ? "border-red-500"
                  : "border-orange-300 focus:border-orange-500"
              }`}
              aria-invalid={!!error?.new_password}
              required
            />
            <button
              type="button"
              onMouseDown={() => togglePasswordVisibility("new", true)}
              onMouseUp={() => togglePasswordVisibility("new", false)}
              onTouchStart={() => togglePasswordVisibility("new", true)}
              onTouchEnd={() => togglePasswordVisibility("new", false)}
              className="absolute right-3 top-1/2  -translate-y-[35%] text-gray-500 focus:outline-none"
            >
              <IonIcon icon={showPasswords.new ? eyeOffOutline : eyeOutline} />
            </button>
          </div>
          {error?.new_password && (
            <p id="password-error" className="text-red-500 text-sm mt-1">
              {error.new_password[0]}
            </p>
          )}
        </div>

        {/* Confirmation mot de passe */}
        <div className="flex flex-col items-center relative w-full">
          <label className="text-orange-500 mb-1 text-base text-center font-bold">
            Confirmer
          </label>
          <input
            type={showPasswords.confirm ? "text" : "password"}
            value={values.confirmPassword}
            onChange={(e) =>
              setValues({ ...values, confirmPassword: e.target.value })
            }
            className="w-full p-2 border-[1.5px] rounded-xl focus:outline-none border-orange-300 focus:border-orange-500"
            required
          />
          <button
            type="button"
            onMouseDown={() => togglePasswordVisibility("confirm", true)}
            onMouseUp={() => togglePasswordVisibility("confirm", false)}
            onTouchStart={() => togglePasswordVisibility("confirm", true)}
            onTouchEnd={() => togglePasswordVisibility("confirm", false)}
            className="absolute right-3 top-1/2  translate-y-1/4 text-gray-500 focus:outline-none"
          >
            <IonIcon
              icon={showPasswords.confirm ? eyeOffOutline : eyeOutline}
            />
          </button>
        </div>

        <div className="pt-3 flex justify-center">
          <button
            type="submit"
            className="bg-orange-500 text-white font-bold  text-lg py-2  px-6 rounded-xl  transform transition-transform duration-150 ease-in-out active:scale-90"
            disabled={loading}
          >
            {loading ? "Chargement..." : "Modifier le mot de passe"}
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

export default ChangePassword;
