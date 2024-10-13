import React, { useState, useRef } from 'react';
import { register as performRegister } from "../../hooks/auth/register";

const AccountCreationForm = () => {
  const [values, setValues] = useState({
    email: '',
    userName: '',
    password: '',
    confirm_password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const errRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (values.password !== values.confirm_password) {
        throw new Error("Les mots de passe ne correspondent pas.");
      }
console.log(values)
      const response = await performRegister({
        email: values.email,
        username: values.userName,
        password: values.password
      });

      console.log("Enregistrement réussi", response);
      // Ici, vous pouvez ajouter la logique pour rediriger l'utilisateur ou afficher un message de succès
    } catch (err) {
      setError({ message: err.message || "Une erreur s'est produite lors de l'enregistrement." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-yellow-100 p-4">
      <div className="flex justify-between items-center mb-6">
        <button className="text-[#006aff]">
          X
        </button>
        <div className="text-orange-500 font-bold text-2xl titre-bold">TiCO</div>
      </div>
      
      <div className="flex-grow flex flex-col justify-center items-center">
        <h2 className="text-center titre-bold text-[#006aff] text-2xl font-bold mb-6">
          Je crée mon compte
        </h2>

        {error?.message && (
          <div ref={errRef} className="mb-4 text-red-600 text-center">
            {error.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 w-11/12 max-w-xs">
          <div className="flex flex-col items-center">
            <label className="text-orange-500 mb-1 text-base text-center">Mon adresse mail</label>
            <input
              type="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="w-full p-2 border border-orange-300 rounded-lg focus:outline-none focus:border-orange-500"
              required
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="text-orange-500 mb-1 text-sm text-center">Mon pseudo</label>
            <input
              type="text"
              value={values.userName}
              onChange={(e) => setValues({ ...values, userName: e.target.value })}
              className="w-full p-2 border border-orange-300 rounded-lg focus:outline-none focus:border-orange-500"
              required
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="text-orange-500 mb-1 text-sm text-center">Mon mot de passe</label>
            <input
              type="password"
              value={values.password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              className="w-full p-2 border border-orange-300 rounded-lg focus:outline-none focus:border-orange-500"
              required
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="text-orange-500 mb-1 text-sm text-center">Confirmer mon mot de passe</label>
            <input
              type="password"
              value={values.confirm_password}
              onChange={(e) => setValues({ ...values, confirm_password: e.target.value })}
              className="w-full p-2 border border-orange-300 rounded-lg focus:outline-none focus:border-orange-500"
              required
            />
          </div>
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="w-1/3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200"
              disabled={loading}
            >
              {loading ? "Chargement..." : "Valider"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountCreationForm;