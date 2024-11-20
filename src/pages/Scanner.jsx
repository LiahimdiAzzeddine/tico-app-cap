import React,{ useState, useEffect } from 'react';
import Main from '../composants/scanner/Main';
import ScannerLyout from '../composants/layout/ScannerLyout';
import FirstVisitGuard from '../guards/FirstVisitGuard'
//import {useIonViewWillLeave } from '@ionic/react';
const ScanPage = () => {
  return (
    <FirstVisitGuard>
    <ScannerLyout>
    <Main/>
    </ScannerLyout>
    </FirstVisitGuard>
  );
};

export default ScanPage;
