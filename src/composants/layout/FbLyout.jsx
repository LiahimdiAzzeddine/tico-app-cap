import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import Menu from "../home/Menu";


const FbLyout = ({ children }) => {

  return (
    <IonPage id="main-content">
      <Menu />

      <IonContent className="flex flex-col h-full">
        <div className="flex flex-col h-full bg-[#ffffff]">
        { children }
        </div>
      </IonContent>

    </IonPage>
  );
};

export default FbLyout;
