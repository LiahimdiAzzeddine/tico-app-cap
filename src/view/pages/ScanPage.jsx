import React from 'react';
import { IonPage} from '@ionic/react';
import TopNavbar from '../home/TopNavbar';
import Menu from '../home/Menu';
import BottomNavbar from '../home/BottomNavbar';
import Scanner from '../scanner/Scanner';
const ScanPage = () => {
  return (
    <>
     <Menu/>
    <IonPage id="main-content">
    <TopNavbar/>
    <Scanner/>
    <BottomNavbar/>
    </IonPage>
    </>
  );
};

export default ScanPage;
