import React, { useState } from "react";
import { IonButtons, IonHeader, IonMenuToggle, IonToolbar } from "@ionic/react";
import tico from "../../assets/navbar/tico.png";
import info from "../../assets/navbar/info.png";
import FAQComponent from "../settings/FAQ/FAQComponent";
import WhiteModal from "../composants/WhiteModal";

const TopNavbar = () => {
  const [showModalFAQ, setShowModalFAQ] = useState(false);

  return (
    <>
      <IonHeader className="ion-no-border">
        <IonToolbar className="px-2" style={{"--ion-toolbar-background":"#ffff"}}>
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center">
              {/* IonMenuButton pour le menu avec trois points centrés */}
              <IonMenuToggle >
                <div className="flex flex-col items-start justify-center space-y-1 p-1">
                  <span className="block w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span className="block w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span className="block w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                </div>
              </IonMenuToggle>

              {/* Logo */}
              <IonMenuToggle >
              <img src={tico} alt="Tico" className="h-7 ml-2" /></IonMenuToggle>
            </div>

            {/* Bouton d'information avec icône */}
            <button
              className="flex items-center justify-center rounded-full px-1"
              onClick={() => setShowModalFAQ(true)}
            >
              <img src={info} alt="Info" className="w-8 h-8 " />
            </button>
          </div>
        </IonToolbar>
      </IonHeader>
      <WhiteModal isOpen={showModalFAQ} onClose={() => setShowModalFAQ(false)}>
        <FAQComponent />
      </WhiteModal>
    </>
  );
};

export default TopNavbar;
