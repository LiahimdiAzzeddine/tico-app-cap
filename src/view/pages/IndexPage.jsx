import React, { useState } from "react";
import tico_intro from "../../assets/home/hands.svg";
import { useIonRouter } from "@ionic/react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import WhiteModal from "../composants/WhiteModal";
import History from "../history/History";

function IndexPage() {
  const isAuthenticated = useIsAuthenticated();
  const [showModalHistory, setShowModalHistory] = useState(false);

  const history = useIonRouter();
  const goToPage = (path) => {
    history.push(path, "root", "replace");
  };
  const goToSubPage = (path) => {
    history.push(path, "forward", "push");
  };


  const VavSettings = () => {
    try {
      goToPage("/settings");
    } catch (error) {
      console.error("Error setting first visit status:", error);
    }
  };

  return (
    <>
    <div className="flex flex-col items-center justify-between h-full w-full">
      {/* Logo Section */}
      <div className="grow-0 flex items-end justify-center w-full ">
        <img className="w-64" src={tico_intro} alt="TiCO Logo" />
      </div>

      {/* Buttons Section with Background */}
      <div className="grow flex items-center justify-start w-full max-w-sm px-2">
        <div className="w-full max-w-sm aspect-square flex items-center justify-center bg-no-repeat">
          <div className="flex flex-col items-center justify-center w-3/5 space-y-6">
            <button
              className="bg-custom-blue  text-white font-bold py-3 px-6 rounded-md w-full transform transition-transform duration-150 ease-in-out active:scale-90"
              onClick={() => goToSubPage('/settings')}
            >
              Mon compte
            </button>

            <button
              className="bg-custom-blue text-white font-bold py-3 px-6 rounded-md w-full transform transition-transform duration-150 ease-in-out active:scale-90"
              onClick={() => setShowModalHistory(true)}
            >
              Historique de scan
            </button>
          </div>
        </div>
      </div>
    </div>
    <WhiteModal
        isOpen={showModalHistory}
        onClose={() => setShowModalHistory(false)} 
      >
        <History/>
      </WhiteModal>
    </>
  );
}

export default IndexPage;
