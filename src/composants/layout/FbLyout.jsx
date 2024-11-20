import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import Menu from "../home/Menu";
import { useHistory  } from "react-router-dom";
import X from "../../assets/auth/XV6-33.png";
import Tico from "../../assets/auth/tico.png";

const FbLyout = ({ children }) => {
  const history = useHistory();

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
