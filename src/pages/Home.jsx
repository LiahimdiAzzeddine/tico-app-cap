import React, { useState } from "react";
import tico_intro from "../assets/home/tico_intro.svg";
import hands from "../assets/home/hands.svg";
import { useHistory } from "react-router-dom";
import History from "../composants/history/History";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import ModalPage from "../composants/modales/ModalPage";

function Home() {
  const [showModalHistory, setShowModalHistory] = useState(false);
  const history = useHistory();
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const name = authUser?.username;

  return (
    <>
      <div className="flex flex-col items-center justify-between w-full h-full">
        {/* Logo Section */}
        <div
          className="grow-0 flex items-center justify-center relative aspect-square bg-no-repeat bg-contain bg-center w-72"
          style={{ backgroundImage: `url(${tico_intro})` }}
        >
          {isAuthenticated && (
            <span className="absolute text-2xl top-[26%] text-center text-custom-green-text titre-bold">
              Bonjour {name} !
            </span>
          )}
          <img
            className="absolute w-64 sm:w-72 bottom-[22%] left-1/2 transform -translate-x-1/2"
            src={hands}
            alt="TiCO hands"
          />
        </div>

        {/* Buttons Section with Background */}
        <div className="grow flex items-center justify-start w-full max-w-sm px-2  h-auto pb-4">
          <div className="w-full max-w-sm  flex items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center w-3/4 space-y-6 h-full">
              <button
                className="bg-[#4E986D] Archivo text-white font-bold  text-lg py-2 px-6 rounded-xl w-full transform transition-transform duration-150 ease-in-out active:scale-90"
                onClick={() => setShowModalHistory(true)}
              >
                Historique de scan
              </button>
              
              <button
                mode="md"
                className="bg-[#4E986D] Archivo text-white font-bold  text-lg py-2 px-6 rounded-xl w-full transform transition-transform duration-150 ease-in-out active:scale-90"
                onClick={() => history.push("/laterProducts")}
              >
                Mes produits à consulter
              </button>
            </div>
          </div>
        </div>
      </div>
      <ModalPage
        isOpen={showModalHistory}
        onClose={() => setShowModalHistory(false)}
        ContentPadding={"ion-padding-top"}
        scroll={false}
        bgHeader="#fff"
        bgcontent="#fff"
        image='vf'
      >
        <History />
      </ModalPage>
    </>
  );
}

export default Home;
