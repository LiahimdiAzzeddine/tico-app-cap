import React from "react";
import { IonPage } from "@ionic/react";
import Menu from "../home/Menu";
import BottomNavbar from "../home/BottomNavbar";
import { Outlet } from "react-router-dom";

const HomeLyout = () => {
  return (
    <>
      <Menu/>
      <IonPage id="main-content">
        {/** 
      <div className="rounded-[10vw] overflow-hidden  border-gray-300 px-1 h-full">*/}
        <Outlet />
        <BottomNavbar />
      </IonPage>
    </>
  );
};
export default HomeLyout;
