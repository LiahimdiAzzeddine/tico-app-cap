import { IonContent } from "@ionic/react";
import React from "react";
import { Navigate } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import background from "../../assets/home/background2.png";
import hands from "../../assets/home/hands.png";
import { IonChip } from "@ionic/react";

const HomePage = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="flex flex-col">
      <div className="grow-[3]">
        <div
          className="w-full h-[23vh] pb-4 flex flex-col justify-end items-center"
          style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        >
          
          <div className="flex flex-col justify-around items-end h-3/4">
          <h1 className="text-2xl titre-bold text-[#006aff] ">
            Bonjour Tico13 !
          </h1>
            <img className="w-48 " src={hands} />
          </div>
        </div>
      </div>
      {/* Center Section: Buttons */}
      <div className="grow-[1]  space-1 pt-4">
        <IonChip>Nos dernières recettes</IonChip>
        <IonChip> Nos ti'conseils</IonChip>
        <IonChip> Derniers produits décryptés</IonChip>
        <IonChip>Mon historique de scan</IonChip>
      </div>
      <div className="grow-[3] flex flex-row justify-center items-center h-[30vh] text-2xl">
      product slider
      </div>
    </div>
  );
};

export default HomePage;
