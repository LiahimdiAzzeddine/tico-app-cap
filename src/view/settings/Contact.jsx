import React, { useState } from "react";
import Spinner from "../composants/Spinner";
import useContact from "../../hooks/useContact";

const Contact = () => {
  const { handleSubmit, loading, error } = useContact();
  const [values, setValues] = useState({ email: "", titre: "", message: "" });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(values);
  };

  return (
    <div className="flex gap-4 flex-col justify-start items-center h-full">
      <h2 className="text-center text-custom-blue text-2xl titre-bold underline underline-offset-4 decoration-orange-400 grow">
        Nous contacter
      </h2>

      <form onSubmit={handleFormSubmit} className="space-y-4 w-11/12 max-w-xs grow-[3]">
        {/* Email Field */}
        <div className="flex flex-col items-center">
          <label className="text-orange-500 mb-1 text-base text-center font-bold">Mon adresse mail</label>
          <input
            type="email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            className={`w-full p-2 border-[1.5px] rounded-lg focus:outline-none ${
              error?.email ? "border-red-500" : "border-orange-300 focus:border-orange-500"
            }`}
            required
            aria-invalid={!!error?.email}
            aria-describedby="email-error"
          />
          {error?.email && <p id="email-error" className="text-red-500 text-sm mt-1">{error.email[0]}</p>}
        </div>

        {/* Titre Field */}
        <div className="flex flex-col items-center">
          <label className="text-orange-500 mb-1 text-base text-center font-bold">Titre</label>
          <input
            type="text"
            value={values.titre}
            onChange={(e) => setValues({ ...values, titre: e.target.value })}
            className={`w-full p-2 border-[1.5px] rounded-lg focus:outline-none ${
              error?.titre ? "border-red-500" : "border-orange-300 focus:border-orange-500"
            }`}
            required
            aria-invalid={!!error?.titre}
            aria-describedby="titre-error"
          />
          {error?.titre && <p id="titre-error" className="text-red-500 text-sm mt-1">{error.titre[0]}</p>}
        </div>

        {/* Message Field */}
        <div className="flex flex-col items-center">
          <label className="text-orange-500 mb-1 text-base text-center font-bold">Message</label>
          <textarea
            value={values.message}
            onChange={(e) => setValues({ ...values, message: e.target.value })}
            className={`w-full p-2 border-[1.5px] rounded-lg focus:outline-none ${
              error?.message ? "border-red-500" : "border-orange-300 focus:border-orange-500"
            }`}
            required
            rows="4"
            aria-invalid={!!error?.message}
            aria-describedby="message-error"
          ></textarea>
          {error?.message && <p id="message-error" className="text-red-500 text-sm mt-1">{error.message[0]}</p>}
        </div>

        {/* Submit Button */}
        <div className="pt-3 flex justify-center">
          <button
            type="submit"
            className="w-2/3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200 font-bold"
            disabled={loading}
          >
            Contacter
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

export default Contact;
