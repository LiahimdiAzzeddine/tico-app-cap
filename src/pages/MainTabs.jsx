import React from 'react';
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { calendar, location, informationCircle, people } from 'ionicons/icons';
import Home from './Home';
import HelpTiCO from './HelpTiCO';
import Scanner from './Scanner';
import Recipes from './Recipes';
import Tips from './Tips';

const MainTabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/tab3" />
        <Route
          path="/tabs/tab1"
          render={() => <Home />}
          exact={true}
        />
        <Route
          path="/tabs/tab2"
          render={() => <HelpTiCO />}
          exact={true}
        />
        <Route
          path="/tabs/tab3"
          component={Scanner}
          exact={true}
        />
        <Route
          path="/tabs/tab4"
          render={() => <Recipes />}
          exact={true}
        />
        <Route
          path="/tabs/tab5"
          component={Tips}
          exact={true}
        />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tabs/tab1">
          <IonIcon icon={calendar} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tabs/tab2">
          <IonIcon icon={people} />
          <IonLabel>Help</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tabs/tab3">
          <IonIcon icon={location} />
          <IonLabel>Scanner</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab4" href="/tabs/tab4">
          <IonIcon icon={informationCircle} />
          <IonLabel>Recipes</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab5" href="/tabs/tab5">
          <IonIcon icon={informationCircle} />
          <IonLabel>Tips</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
