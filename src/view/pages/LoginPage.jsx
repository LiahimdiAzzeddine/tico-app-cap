import React, { useState } from "react";
import tico_intro from "../../assets/intro/tico_intro.svg";
import background from "../../assets/intro/background6.png";
import AccountCreationForm from "../auth/Register";
import Login from "../auth/login";
import CustomModal from "../composants/CustomModal";
import { useNavigate } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

function LoginPage() {
  const [showModalInscription, setShowModalInscription] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const isAuthenticated = useIsAuthenticated();

  const navigate = useNavigate();

  const handleGuestClick = () => {
    try {
      navigate("/scanner"); // Navigate to the home page
    } catch (error) {
      console.error("Error setting first visit status:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-full w-full">
      {/* Logo Section */}
      <div className="grow flex items-end justify-center w-full ">
        <img className="w-64" src={tico_intro} alt="TiCO Logo" />
      </div>

      {/* Buttons Section with Background */}
      <div className="grow flex items-center justify-start w-full max-w-sm px-2">
        <div
          className="w-full max-w-sm aspect-square flex items-center justify-center bg-no-repeat"
        >
          <div className="flex flex-col items-center justify-center w-3/5 space-y-6">
            {isAuthenticated && (
              <button
                className="bg-custom-blue  text-white font-bold py-3 px-6 rounded-md w-full transform transition-transform duration-150 ease-in-out active:scale-90"
                onClick={() => setShowModalLogin(true)}
              >
                Mon compte
              </button>
            )}
            {!isAuthenticated && (
              <button
                className="bg-custom-blue text-white font-bold py-3 px-6 rounded-md w-full transform transition-transform duration-150 ease-in-out active:scale-90 "
                onClick={() => setShowModalLogin(true)}
              >
                Je me connecte
              </button>
            )}
            {!isAuthenticated && (
              <button
                className="bg-custom-blue text-white font-bold py-3 px-6 rounded-md  w-full transform transition-transform duration-150 ease-in-out active:scale-90"
                onClick={() => setShowModalInscription(true)}
              >
                Je crée mon compte
              </button>
            )}

            <button
              className="bg-custom-blue text-white font-bold py-3 px-6 rounded-md w-full transform transition-transform duration-150 ease-in-out active:scale-90"
              onClick={() => setShowModalInscription(true)}
            >
              Historique de scan
            </button>
          </div>
        </div>
      </div>

      {/* Sign-Up Modal */}
      <CustomModal
        isOpen={showModalInscription}
        onClose={() => setShowModalInscription(false)}
        image="x"
      >
        <AccountCreationForm />
      </CustomModal>

      {/* Login Modal */}
      <CustomModal
        isOpen={showModalLogin}
        onClose={() => setShowModalLogin(false)}
        image="x"
      >
        <Login />
      </CustomModal>

      {/* Empty div for spacing */}
      <div className="grow min-h-[8vh]"></div>
    </div>
  );
}

export default LoginPage;
