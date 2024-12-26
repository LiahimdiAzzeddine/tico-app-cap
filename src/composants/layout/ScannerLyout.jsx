import React from "react";
import { IonPage } from "@ionic/react";
import TopNavbar from "../../composants/navBars/TopNavbar";
import BottomNavbar from "../../composants/navBars/BottomNavbar";
/* -mb-[1px] */
function ScannerLyout({ children }) {
  return (
      <IonPage id="main-content" >
        <TopNavbar />
        <div className="cadre w-full h-full border-r-8 border-l-8 border-white p-0 ">
        { children }
        </div>
      </IonPage>
  )
}

export default ScannerLyout;

