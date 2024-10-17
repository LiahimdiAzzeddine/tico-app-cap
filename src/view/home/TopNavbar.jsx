import React from "react";
import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonToolbar,
} from "@ionic/react";
import tico from "../../assets/navbar/tico.png";
import info from "../../assets/navbar/info.png";

const TopNavbar = () => {
  return (
    <IonHeader>
      <IonToolbar className="px-3">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <IonButtons slot="start">
              <IonMenuButton>
                <button className="flex flex-col items-start justify-start space-y-1">
                  {/* Trois points centrés */}
                  <span className="block w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span className="block w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span className="block w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                </button>
              </IonMenuButton>
            </IonButtons>
            <img src={tico} alt="Tico" className="h-7" />
          </div>
          <button className="flex items-center justify-center w-8 h-8 rounded-full">
            <img src={info} alt="Info" className="w-8 h-8" />
          </button>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default TopNavbar;
