import React from 'react'
import { IonContent, IonHeader, IonToolbar, IonTitle,IonMenu } from '@ionic/react';

function Menu() {
  return (
    <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">This is the menu content.</IonContent>
      </IonMenu>
  )
}

export default Menu