import React,{useState} from 'react';
import Main from '../composants/scanner/Main';
import ScannerLyout from '../composants/layout/ScannerLyout';
import { useIonViewDidEnter, useIonViewDidLeave } from "@ionic/react";
import FirstVisitGuard from '../guards/FirstVisitGuard';
const ScanPage = () => {
  const [isVisible, setIsVisible] = useState(true);

  useIonViewDidEnter(() => {
      console.log("useIonViewDidEnter called");
      setIsVisible(true);
    });
  
    useIonViewDidLeave(() => {
      console.log("useIonViewWillLeave called");
      setIsVisible(false);
    });
  //if (!isVisible) return null;
  return (
    <FirstVisitGuard>
    <ScannerLyout>
    <Main/>
    </ScannerLyout>
    </FirstVisitGuard>
  );
};

export default React.memo(ScanPage);
