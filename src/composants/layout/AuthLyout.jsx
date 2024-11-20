import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import Menu from "../../composants/navBars/Menu";
import BottomNavbar from "../../composants/navBars/BottomNavbar";
import {useHistory } from "react-router-dom";
import X from "../../assets/auth/XV6-33.png";
import Tico from "../../assets/auth/tico.png";

const AuthLayout = ({ children }) => {
  const history = useHistory();

  return (
    
    <IonPage id="main-content">
      <Menu />

      <IonContent className="flex flex-col h-full">
        <div className="flex flex-col h-full bg-[#ffeda3]">
          <div className="flex justify-between items-center mb-5 mt-1 p-4 modal-background">
            <button className="text-custom-blue" onClick={() =>  history.replace('scanner')}>
              <img src={X} alt="Close" className="w-10 h-10" />
            </button>
            <div className="text-orange-500 font-bold text-2xl titre-bold">
              <img src={Tico} alt="Tico" className="h-7" />
            </div>
          </div>
          
          {/* Scrollable Outlet Content */}
          <div className="flex-grow overflow-y-auto p-4">
          { children }
          </div>
        </div>
      </IonContent>

    </IonPage>
  );
};

export default AuthLayout;
