import React, { useState } from "react";
import tico_intro from "../assets/home/hands.svg";
import { useHistory } from "react-router-dom";
import WhiteModal from "../composants/modales/WhiteModal";
import History from "../composants/history/History";

function Home() {
  const [showModalHistory, setShowModalHistory] = useState(false);
  const history = useHistory();
  return (
    <>
      <div className="flex flex-col items-center justify-between h-full w-full">
        {/* Logo Section */}
        <div className="grow flex items-end justify-center w-full ">
          <img className="w-72" src={tico_intro} alt="TiCO Logo" />
        </div>

        {/* Buttons Section with Background */}
        <div className="grow flex items-center justify-start w-full max-w-sm px-2">
          <div className="w-full max-w-sm aspect-square flex items-center justify-center bg-no-repeat">
            <div className="flex flex-col items-center justify-center w-3/4 space-y-6">
            {/*
              <button
                className="bg-[#4b996c]  text-white font-bold text-lg py-3 px-6 rounded-xl w-full transform transition-transform duration-150 ease-in-out active:scale-90"
                onClick={() => history.push("/settings")}
              >
                Mon compte
              </button> */}
              <button
                className="bg-[#4b996c] text-white font-bold  text-lg py-3 px-6 rounded-xl w-full transform transition-transform duration-150 ease-in-out active:scale-90"
                onClick={() => setShowModalHistory(true)}
              >
                Historique de scan
              </button>
              <button
              mode="md"
                className="bg-[#4b996c] text-white font-bold  text-lg py-3 px-6 rounded-xl w-full transform transition-transform duration-150 ease-in-out active:scale-90"
                onClick={() => history.push("/laterProducts")}
              >
                Mon produits à Consulter
              </button>
            </div>
          </div>
        </div>
      </div>
      <WhiteModal
        isOpen={showModalHistory}
        onClose={() => setShowModalHistory(false)}
      >
        <History />
      </WhiteModal>
    </>
  );
}

export default Home;
