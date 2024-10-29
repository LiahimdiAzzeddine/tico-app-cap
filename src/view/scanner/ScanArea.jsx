import { IonIcon } from "@ionic/react";
import { flash, flashOff } from "ionicons/icons"; // Importing icons for flash and flash-off
import frame from "../../assets/frame.svg";
import whiteLogo from "../../assets/logo-white.svg";
const ScanArea = ({ hideBg, toggleFlash, flashOn }) => {
  return (
      <div className="scan-container z-50"  >
        
        {/**<img src={whiteLogo} alt="Logo" className="absolute top-6 w-24 z-50" />
         */}
        <div
          className="z-50 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg cursor-pointer absolute left-3 top-3"
          onClick={toggleFlash}
        >
          <IonIcon
            icon={flashOn ? flash : flashOff}
            size="medium"
            className={`text-2xl ${flashOn ? "text-yellow-500" : "text-black"}`} // Flash on is yellow, off is blue
          />
        </div>

        <div className="scan-box">
          {/** 
          <img src={frame} alt="Frame" className="frame-center z-50" />*/}
        </div>
      </div>
    
  );
};

export default ScanArea;
