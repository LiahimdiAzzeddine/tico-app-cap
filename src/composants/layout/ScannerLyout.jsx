import React from "react";
import { IonPage } from "@ionic/react";
import TopNavbar from "../../composants/navBars/TopNavbar";
import BottomNavbar from "../../composants/navBars/BottomNavbar";

function ScannerLyout({ children }) {
  return (
      <IonPage id="main-content">
        <TopNavbar />
        <div className="cadre w-screen h-screen">
        { children }
        </div>
        <BottomNavbar />
      </IonPage>
  )
}

export default ScannerLyout;

