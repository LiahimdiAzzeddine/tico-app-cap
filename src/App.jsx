import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Scanner from "./pages/Scanner";
import Recipes from "./pages/Recipes";
import Tips from "./pages/Tips";
import Welcome from "./pages/Welcome";
import Settings from "./pages/settings";
import Login from "./composants/auth/login";
import AccountCreationForm from "./composants/auth/Register";
import HomeLayout from "./composants/layout/HomeLyout";
import AuthLayout from "./composants/layout/AuthLyout";
import LaterProducts from "./pages/LaterProducts";
import SimpleLyout from "./composants/layout/SimpleLyout";
import RequireNoAuth from "./guards/RequireNoAuth"

function App() {
  useEffect(() => {
    // Masquer la barre d'état sur iOS (désactivé pour démo, décommenter si nécessaire)
    /*
    StatusBar.setOverlays(true);
    StatusBar.setBackgroundColor({ color: '#ffffff' });
    StatusBar.setStyle({ style: 'DARK' });
    ScreenOrientation.lock({ orientation: 'portrait' });
    */
  }, []);
  
  
//animated={false}
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet  swipeGesture={true} animated={true} >
          <Route exact path="/welcome" component={Welcome} />
          <Route path="/home" exact={true}>
          <RequireNoAuth>
            <HomeLayout>
              <Home />
            </HomeLayout>
            </RequireNoAuth>
          </Route>
          <Route path="/recipes" exact={true}>
            <Recipes />
          </Route>
          <Route exact path="/tips" component={Tips} />
          <Route exact path="/favorite" component={Favorite} />
          <Route exact path="/scanner" component={Scanner} />
          <Route exact path="/settings" component={Settings} />
          <Route path="/laterProducts" exact={true}>
            <SimpleLyout>
              <LaterProducts />
            </SimpleLyout>
          </Route>
          <Route path="/login" exact={true}>
            <AuthLayout>
              <Login />
            </AuthLayout>
          </Route>
          <Route path="/signup" exact={true}>
            <AuthLayout>
              <AccountCreationForm />
            </AuthLayout>
          </Route>
          <Redirect exact from="/" to="/scanner" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
