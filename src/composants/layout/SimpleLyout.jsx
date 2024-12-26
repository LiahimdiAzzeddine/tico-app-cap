import React from 'react'
import { IonPage, IonContent, IonHeader, IonToolbar } from "@ionic/react";
import ModalHeader from "../../composants/modales/ModalHeader";

function SimpleLyout({ children,bgHeader="",bgcontent="",image="bf",Close }) {

  return (
    <IonPage id="main-content" style={{ backgroundColor:bgHeader,paddingTop:"env(safe-area-inset-top)" }}>
      <div style={{backgroundColor:bgHeader}}>
       <ModalHeader image={image}  onClose={() =>  Close()}/>
       </div>
      <IonContent className="flex flex-col ion-no-padding h-full"  style={{ overflow: 'hidden' , "--background":bgcontent }} scroll-y="true">
      { children }
      </IonContent>
    </IonPage>
  )
}

export default SimpleLyout
