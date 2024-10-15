import React from "react";
import { IonFooter, IonToolbar } from "@ionic/react";
import accueil from "../../assets/navbar/accueil.png";
import favoris from "../../assets/navbar/favoris.png";
import astuces from "../../assets/navbar/astuces.png";
import scanner from "../../assets/navbar/scanner.png";
import profil from "../../assets/navbar/profil.png";

const BottomNavbar = () => {
  return (
    <IonFooter>
      <IonToolbar className="bg-white">
        <div className="flex justify-around items-center py-2">
          {/* Bouton Accueil */}
          <button className="flex flex-col items-center">
            <img src={accueil} alt="Accueil" className="w-12 h-12 mb-1" />
            {/** 
            <span className="text-xs text-gray-500 hover:text-orange-500">Accueil</span>*/}
          </button>

          {/* Bouton Favoris */}
          <button className="flex flex-col items-center">
            <img src={favoris} alt="Favoris" className="w-12 h-12 mb-1" />
            {/**
            <span className="text-xs text-gray-500 hover:text-orange-500">Favoris</span> */}
          </button>

          {/* Bouton Scanner */}
          <button className="flex flex-col items-center">
            <img src={scanner} alt="Scanner" className="w-auto h-12 mb-1" />
            {/** 
            <span className="text-xs text-gray-500 hover:text-orange-500">Scanner</span>*/}
          </button>

          {/* Bouton Profil */}
          <button className="flex flex-col items-center">
            <img src={profil} alt="Profil" className="w-12 h-12 mb-1" />
            {/**
            <span className="text-xs text-gray-500 hover:text-orange-500">Profil</span> */}
          </button>

          {/* Bouton Astuces */}
          <button className="flex flex-col items-center">
            <img src={astuces} alt="Astuces" className="w-12 h-12 mb-1" />
            {/* 
            <span className="text-xs text-gray-500 hover:text-orange-500">Astuces</span>*/}
          </button>
        </div>
      </IonToolbar>
    </IonFooter>
  );
};

export default BottomNavbar;
