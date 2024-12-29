import React,{useState} from 'react';
import Main from '../composants/scanner/Main';
import ScannerLyout from '../composants/layout/ScannerLyout';
import { useIonViewDidEnter, useIonViewDidLeave } from "@ionic/react";
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
    <ScannerLyout>
    <Main/>
    </ScannerLyout>
  );
};

export default React.memo(ScanPage);
