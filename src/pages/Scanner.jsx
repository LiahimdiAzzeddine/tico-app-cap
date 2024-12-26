import React from 'react';
import Main from '../composants/scanner/Main';
import ScannerLyout from '../composants/layout/ScannerLyout';
//import {useIonViewWillLeave } from '@ionic/react';
const ScanPage = () => {
  return (
    <ScannerLyout>
    <Main/>
    </ScannerLyout>
  );
};

export default ScanPage;
