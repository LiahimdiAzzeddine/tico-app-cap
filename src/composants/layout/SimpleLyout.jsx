import React from 'react'
import { IonPage, IonContent, IonHeader, IonToolbar } from "@ionic/react";
import Header from '../modales/Header';

function SimpleLyout({ children,bgHeader="#fff",bgcontent="#fff",image,Close }) {

  return (
    <IonPage id="main-content" style={{ backgroundColor:bgHeader,paddingTop:"env(safe-area-inset-top)" }}>
      <div style={{backgroundColor:bgHeader}}>
       <Header image={image}  onClose={() => Close()}/>
       </div>
      <IonContent className="flex flex-col ion-no-padding h-full"  style={{ overflow: 'hidden' , "--background":bgcontent }} scroll-y="true">
      { children }
      </IonContent>
    </IonPage>
  )
}

export default SimpleLyout
