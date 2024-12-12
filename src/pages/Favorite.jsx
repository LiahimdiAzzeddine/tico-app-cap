import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Favorite = () => (
  <IonPage style={{paddingTop:"env(safe-area-inset-top)" }}>
    <IonHeader className="ion-no-border z-0">
      <IonToolbar>
        <IonTitle>Favorite</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <h1>Welcome to the Favorite Page!</h1>
    </IonContent>
  </IonPage>
);

export default Favorite;
