import React from 'react'
import { IonPage, IonContent, IonHeader, IonToolbar } from "@ionic/react";
import { useHistory  } from "react-router-dom";
import ModalHeader from "../../composants/modales/ModalHeader";

function SimpleLyout({ children }) {
    const history = useHistory();

  return (
    <IonPage id="main-content" >
       <ModalHeader image="bf"  onClose={() =>  history.goBack()}/>
      <IonContent className="flex flex-col ion-no-padding h-full"  style={{ overflow: 'hidden' }} scroll-y="true">
      { children }
      </IonContent>
    </IonPage>
  )
}

export default SimpleLyout