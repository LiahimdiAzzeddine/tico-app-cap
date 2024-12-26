import React, { useState } from "react";
import { IonHeader, IonToolbar } from "@ionic/react";
import tico from "../../assets/navbar/tico.png";
import info from "../../assets/navbar/info.svg";
import FAQComponent from "../settings/FAQ/FAQComponent";
import WhiteModal from "../modales/WhiteModal";
import { useIonRouter } from "@ionic/react";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

const TopNavbar = () => {
  const [showModalFAQ, setShowModalFAQ] = useState(false);
  const history = useIonRouter();
  const goToSubPage = (path) => {
    history.push(path, "forward", "push");
  };


  const handleLogoClick = () => {
    triggerHapticFeedback();
    goToSubPage("/settings");
  };

  const handleInfoClick = () => {
    triggerHapticFeedback();
    setShowModalFAQ(true);
  };

  const triggerHapticFeedback = async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        await Haptics.impact({ style: ImpactStyle.Light });
      } catch (error) {
        console.error("Haptics not supported on this device", error);
      }
    } else {
      console.log("Haptics is only supported on native platforms.");
    }
  };

  return (
    <>
      <IonHeader  className="ion-no-border z-0">
        <IonToolbar
          className="px-5"
          style={{ "--ion-toolbar-background": "#ffff" }}
        >
          <div className="flex justify-between items-center pb-3 pt-4">
            <button
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onClick={handleLogoClick}
              role="button"
              aria-label="Go to home"
            >
              <div className="flex flex-col items-start justify-center space-y-1 p-1">
                <span className="block w-[0.35rem] h-[0.35rem] bg-custom-blue rounded-full"></span>
                <span className="block w-[0.35rem] h-[0.35rem] bg-custom-blue rounded-full"></span>
                <span className="block w-[0.35rem] h-[0.35rem] bg-custom-blue rounded-full"></span>
              </div>
              <img src={tico} alt="Tico" className="h-6 ml-2" />
            </button>

            {/* Bouton d'information avec icône */}
            <button
              className="flex items-center justify-center rounded-full hover:opacity-80 transition-opacity duration-200"
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
