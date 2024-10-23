import { IonContent, IonRow, IonText } from "@ionic/react";
import frame from "../../assets/frame.svg";
import whiteLogo from "../../assets/logo-white.svg";

const Scanner = ({ hideBg, err }) => {
  return (
    <IonContent className={hideBg ? "hideBg" : "ion-padding"}>
      {err && (
        <IonRow>
          <IonText color="danger">{err}</IonText>
        </IonRow>
      )}
      {!err && hideBg && (
        <div className="scan-container">
          <img src={whiteLogo} alt="Logo" className="logo-top" />
          <div className="scan-box">
            <img src={frame} alt="Frame" className="frame-center" />
          </div>
        </div>
      )}
    </IonContent>
  );
};

export default Scanner;