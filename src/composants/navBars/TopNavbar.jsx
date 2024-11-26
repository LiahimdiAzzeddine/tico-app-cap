import React, { useState } from "react";
import { IonHeader, IonToolbar } from "@ionic/react";
import tico from "../../assets/navbar/tico.png";
import info from "../../assets/navbar/info.png";
import FAQComponent from "../settings/FAQ/FAQComponent";
import WhiteModal from "../modales/WhiteModal";
import { useHistory } from "react-router-dom";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

const TopNavbar = () => {
  const [showModalFAQ, setShowModalFAQ] = useState(false);
  const history = useHistory();

  const handleLogoClick = () => {
    triggerHapticFeedback();
    history.push("/settings");
  };

  const handleInfoClick = () => {
    triggerHapticFeedback();
    setShowModalFAQ(true);
  };

  const triggerHapticFeedback = async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        await Haptics.impact({ style: ImpactStyle.Light });
        console.log("Haptic feedback triggered successfully.");
      } catch (error) {
        console.error("Haptics not supported on this device", error);
      }
    } else {
      console.log("Haptics is only supported on native platforms.");
    }
  };

  return (
    <>
      <IonHeader className="ion-no-border">
        <IonToolbar
          className="px-2"
          style={{ "--ion-toolbar-background": "#ffff" }}
        >
          <div className="flex justify-between items-center py-2">
            <button
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onClick={handleLogoClick}
              role="button"
              aria-label="Go to home"
            >
              <div className="flex flex-col items-start justify-center space-y-1 p-1">
                <span className="block w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="block w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="block w-2 h-2 bg-blue-500 rounded-full"></span>
              </div>
              <img src={tico} alt="Tico" className="h-8 ml-2" />
            </button>

            {/* Bouton d'information avec icône */}
            <button
              className="flex items-center justify-center rounded-full px-1 hover:opacity-80 transition-opacity duration-200"
              onClick={handleInfoClick}
              aria-label="Open FAQ"
            >
              <img src={info} alt="Info" className="w-9 h-9" />
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
