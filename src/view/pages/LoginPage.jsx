import React, { useState } from 'react';
import tico_intro from '../../assets/intro/tico_intro.png';
import background from '../../assets/intro/background6.png';
import AccountCreationForm from '../auth/Register';
import Login from '../auth/login';
import CustomModal from '../composants/CustomModal';
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [showModalInscription, setShowModalInscription] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const navigate = useNavigate();

  const handleGuestClick = () => {
    try {
      navigate("/scanner"); // Navigate to the home page
    } catch (error) {
      console.error("Error setting first visit status:", error);
    }
  };


  return (
    <div className='wrapper'>
			<div className='details'>
    <div className="flex flex-col items-center justify-between bg-white min-h-screen w-full">
      {/* Logo Section */}
      <div className="grow flex items-end justify-center w-full pt-1">
        <img className="w-64" src={tico_intro} alt="TiCO Logo" />
      </div>

      {/* Buttons Section with Background */}
      <div className="grow flex items-center justify-start w-full max-w-sm px-2">
        <div
          className="w-full max-w-sm aspect-square flex items-center justify-center bg-no-repeat bg-contain bg-center"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="flex flex-col items-center justify-center w-3/5">
            <button
              className="bg-[#ff8300] hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-md w-full transition-colors duration-300 mb-4"
              onClick={() => setShowModalLogin(true)}
            >
              Je me connecte
            </button>
            <button
              className="bg-[#ff8300] hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-md mb-4 w-full transition-colors duration-300"
              onClick={() => setShowModalInscription(true)}
            >
              Je crée mon compte
            </button>
            <button onClick={handleGuestClick}  className="bg-[#ff8300] hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-md w-full transition-colors duration-300">
              J'utilise TiCO <br /> en tant qu'invité
            </button>
          </div>
        </div>
      </div>

      {/* Sign-Up Modal */}
      <CustomModal isOpen={showModalInscription} onClose={() => setShowModalInscription(false)} image="x">
        <AccountCreationForm />
      </CustomModal>

      {/* Login Modal */}
      <CustomModal isOpen={showModalLogin} onClose={() => setShowModalLogin(false)} image="x">
        <Login />
      </CustomModal>

      {/* Empty div for spacing */}
      <div className="grow min-h-[8vh]"></div>
    </div></div></div>
  );
}

export default LoginPage;
