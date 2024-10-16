import React, { useState } from 'react';
import { IonToast } from '@ionic/react';
import { register as performRegister } from "../../hooks/auth/register";
import Spinner from '../composants/Spinner';
import { useNavigate } from "react-router-dom";

const AccountCreationForm = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    userName: '',
    password: '',
    confirm_password: '',
    role_id: ''
  });

  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastColor, setToastColor] = useState('');
  const [errors, setErrors] = useState({}); // State for input field errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // Reset errors before submission

    try {
      if (values.password !== values.confirm_password) {
        setErrors({ confirm_password: ['Les mots de passe ne correspondent pas.'] });

        throw new Error("Les mots de passe ne correspondent pas.");
      }

      await performRegister({
        email: values.email,
        username: values.userName,
        password: values.password,
        password_confirmation: values.confirm_password,
        role_id: 1
      });

      setToastMessage("Enregistrement réussi");
      setToastColor("success");
      setShowToast(true);
      navigate("/", { replace: true });

    } catch (err) {

      if (err && err.errors) {
        setErrors(err.errors); // Set field-specific errors from the server response
        setToastMessage("Erreur de validation. Veuillez corriger les erreurs ci-dessous.");
      } else {
        setToastMessage(err.message || "Une erreur s'est produite lors de l'enregistrement.");
      }

      setToastColor("danger");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 flex-col justify-start items-center h-full pt-[5vh]">
      <h2 className="text-center titre-bold text-[#006aff] text-2xl font-bold">
        Je crée mon <span className='underline underline-offset-4 decoration-orange-400'>compte</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 w-11/12 max-w-xs py-[2vh]">
        <div className="flex flex-col items-center">
          <label className="text-orange-500 mb-1 text-base text-center font-bold">Mon adresse mail</label>
          <input
            type="email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            className={`w-full p-2 border-[1.5px] rounded-lg focus:outline-none ${
              errors.email ? 'border-red-500' : 'border-orange-300 focus:border-orange-500'
            }`}
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}
        </div>

        <div className="flex flex-col items-center">
          <label className="text-orange-500 mb-1 text-sm text-center font-bold">Mon pseudo</label>
          <input
            type="text"
            value={values.userName}
            onChange={(e) => setValues({ ...values, userName: e.target.value })}
            className={`w-full p-2 border-[1.5px] rounded-lg focus:outline-none ${
              errors.username ? 'border-red-500' : 'border-orange-300 focus:border-orange-500'
            }`}
            required
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username[0]}</p>}
        </div>

        <div className="flex flex-col items-center">
          <label className="text-orange-500 mb-1 text-sm text-center font-bold">Mon mot de passe</label>
          <input
            type="password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            className={`w-full p-2 border-[1.5px] rounded-lg focus:outline-none ${
              errors.password ? 'border-red-500' : 'border-orange-300 focus:border-orange-500'
            }`}
            required
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>}
        </div>

        <div className="flex flex-col items-center">
          <label className="text-orange-500 mb-1 text-sm text-center font-bold">Confirmer mon mot de passe</label>
          <input
            type="password"
            value={values.confirm_password}
            onChange={(e) => setValues({ ...values, confirm_password: e.target.value })}
            className="w-full p-2 border-[1.5px] border-orange-300 rounded-lg focus:outline-none focus:border-orange-500"
            required
          />
          {errors.confirm_password && <p className="text-red-500 text-sm mt-1">{errors.confirm_password[0]}</p>}
        </div>

        <div className="pt-3 flex justify-center">
          <button
            type="submit"
            className="w-1/3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200 font-bold"
            disabled={loading}
          >
            Valider
          </button>
        </div>
      </form>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={3000}
        color={toastColor}
        position="top"
      />
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
