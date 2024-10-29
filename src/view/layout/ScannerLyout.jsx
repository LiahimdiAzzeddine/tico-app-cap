import React from "react";
import { IonPage } from "@ionic/react";
import TopNavbar from "../home/TopNavbar";
import Menu from "../home/Menu";
import BottomNavbar from "../home/BottomNavbar";
import { Outlet } from "react-router-dom";

function ScannerLyout() {
  return (
    <>
    
      <Menu />
      <IonPage id="main-content">
        <TopNavbar />
        <div className="cadre w-full h-full">
          <Outlet />
        </div>
        <BottomNavbar />
      </IonPage>
    </>
  )
}

export default ScannerLyout;
