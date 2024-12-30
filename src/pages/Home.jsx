import React, { useState, useRef,useEffect } from "react";
import hands from "../assets/home/hands.svg";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useIonRouter } from "@ionic/react";
import HomeLayout from "../composants/layout/HomeLyout";
import { useIonViewWillLeave, useIonViewWillEnter } from "@ionic/react";

function Home() {
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const name = authUser?.username;
  const history = useIonRouter();
  const goToPage = (path) => {
    history.push(path, "forward", "push");
  };
  const modal = useRef(null); // Supprimer le typage TS
  const input = useRef(null); // Supprimer le typage TS

  useIonViewWillEnter(() => {
    //console.log("useIonViewDidEnter called");
  });

  useIonViewWillLeave(() => {
    //console.log("useIonViewWillLeave called");
  });

  const [message, setMessage] = useState(
    "This modal example uses triggers to automatically open a modal when the button is clicked."
  );

  function confirm() {
    modal.current?.dismiss(input.current?.value, "confirm");
  }

  function onWillDismiss(ev) {
    if (ev.detail.role === "confirm") {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

  return (
    <HomeLayout>
      <div className="flex flex-col items-center justify-between w-full h-full">
        {/* Logo Section */}
        <div className="grow-0 flex items-center justify-center relative aspect-square bg-no-repeat bg-contain bg-center w-72 tico_intro">
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
                className="bg-[#4E986D] ArchivoBold text-white  text-lg py-2 px-6 rounded-xl w-full transform transition-transform duration-150 ease-in-out active:scale-90"
                onClick={() => goToPage("/history")}
              >
                Historique de scan
              </button>

              <button
                mode="md"
                className="bg-[#4E986D] ArchivoBold text-white text-lg py-2 px-6 rounded-xl w-full transform transition-transform duration-150 ease-in-out active:scale-90"
                onClick={() => goToPage("/laterProducts")}
              >
                Mes produits à consulter
              </button>
            </div>
          </div>
        </div>
      </div>
      </HomeLayout>
  );
}
export default React.memo(Home);

