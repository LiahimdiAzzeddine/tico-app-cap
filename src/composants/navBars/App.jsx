import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Favorite from './pages/Favorite';
import Scanner from './pages/Scanner';
import Recipes from './pages/Recipes';
import Tips from './pages/Tips';

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home" component={Home} />
        <Route exact path="/favorite" component={Favorite} />
        <Route exact path="/scanner" component={Scanner} />
        <Route exact path="/recipes" component={Recipes} />
        <Route exact path="/tips" component={Tips} />
        <Redirect exact from="/" to="/home" />
      </IonRouterOutlet>
      {/* Insertion de la barre de navigation personnalisée */}
    </IonReactRouter>
  </IonApp>
);

export default App;
