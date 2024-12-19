import React from "react";
import { IonPage } from "@ionic/react";
import TopNavbar from "../../composants/navBars/TopNavbar";
import BottomNavbar from "../../composants/navBars/BottomNavbar";

function ScannerLyout({ children }) {
  return (
      <IonPage id="main-content" >
        <TopNavbar />
        <div className="cadre w-full h-full border-r-8 border-l-8 border-white p-0 -mb-[1px]">
        { children }
        </div>
        <BottomNavbar />
      </IonPage>
  )
}

export default ScannerLyout;

