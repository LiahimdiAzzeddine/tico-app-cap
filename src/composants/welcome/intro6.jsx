import React, { useState } from "react";
import { useIonRouter } from "@ionic/react";
import tico_intro from "../../assets/intro/tico_intro.svg";
import background from "../../assets/intro/background6.png";
import AccountCreationForm from "../auth/Register";
import CustomModal from "../modales/CustomModal";
import { setFirstVisit } from "../../hooks/useCapacitorStorage";

const Intro6 = () => {
  const [showModalInscription, setShowModalInscription] = useState(false);
  const history = useIonRouter();
  const goToPage = (path) => {
    history.push(path, "root", "replace");
  };

  const handleGuestClick = async () => {
    try {
      await setFirstVisit(true); // Set first visit status in IndexedDB
      goToPage("/tab3");
    } catch (error) {
      console.error("Error setting first visit status:", error);
    }
  };

  const handleOpenModal = async () => {
    try {
      await setFirstVisit(true); // Set first visit status in IndexedDB when the modal is opened
    } catch (error) {
      console.error("Error setting first visit status:", error);
    }
    setShowModalInscription(true); // Open the modal
  };

  const handleModalClose = () => {
    setShowModalInscription(false); // Close the modal
  };

  return (
    <div className="flex flex-col items-center justify-between bg-white min-h-screen w-full" style={{paddingTop:"env(safe-area-inset-top)" }}>
      {/* Logo Section */}
      <div className="grow flex items-end justify-center w-full pt-1">
        <img className="w-60" src={tico_intro} alt="TiCO Logo" />
      </div>

      {/* Buttons Section with Background */}
      <div className="grow flex items-center justify-start w-full max-w-sm px-2">
        <div
          className="w-full max-w-sm aspect-square flex items-center justify-center bg-no-repeat bg-contain bg-center"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="flex flex-col items-center justify-center w-3/5">
            <button
              className="bg-[#FF8200] hover:bg-[#ff7100] text-white font-bold Archivo py-2 px-6 rounded-md mb-4 w-full transition-colors duration-300"
              onClick={handleOpenModal} // Open the modal and set first visit status
            >
              Je crée mon compte
            </button>
            <button
              className="bg-[#FF8200] hover:bg-[#ff7100] text-white font-bold py-2 px-6 rounded-md w-full transition-colors duration-300"
              onClick={handleGuestClick} // Handle guest access click
            >
              J'utilise <span className="pallybold">Ti<span className="tracking-[-0.07em]">CO</span></span> <br /> en tant qu'invité
            </button>
          </div>
        </div>
      </div>

      {/* Sign-Up Modal */}
      <CustomModal
        isOpen={showModalInscription}
        onClose={handleModalClose} // Handle modal close logic
      >
        <AccountCreationForm />
      </CustomModal>

      {/* Empty div for spacing */}
      <div className="grow min-h-[8vh]"></div>
    </div>
  );
};

export default Intro6;
