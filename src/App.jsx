import React, { useEffect,useState  } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import HelpTiCO from "./pages/HelpTiCO";
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
import { App as CapacitorApp } from "@capacitor/app"; // Import de Capacitor App
import { useToast } from "./context/ToastContext";
import { useHistory } from "react-router-dom"; // Import du hook useHistory
import { StatusBar } from '@capacitor/status-bar';
import { ScreenOrientation } from '@capacitor/screen-orientation';
function App() {
  const { showToast } = useToast();
  const [exitApp, setExitApp] = useState(false);
  const history = useHistory();
  useEffect(() => {
    // Masquer la barre d'état sur iOS
    StatusBar.setOverlays({ overlay: true });
    StatusBar.setOverlaysWebView({ overlay: true });
    StatusBar.setBackgroundColor({ color: '#ffffff' }); // Couleur de fond pour la barre d'état
    StatusBar.setStyle({ style: 'DARK' }); // Style sombre pour le texte de la barre d'état
    ScreenOrientation.lock({ orientation: 'portrait' });
  }, []);
  
  useEffect(() => {
    // Écouter le bouton retour physique sur mobile
    const backButtonListener = CapacitorApp.addListener("backButton", (event) => {
      if (history.location.pathname === "/scanner") {
        if (exitApp) {
          CapacitorApp.exitApp(); // Quitter l'application
        } else {
          setExitApp(true); // Activer l'état de sortie
          showToast("Appuyez à nouveau pour quitter l'application", "info");
          setTimeout(() => setExitApp(false), 2000); // Réinitialiser l'état après 2 secondes
        }
      } else {
        history.push("scanner"); // Naviguer vers la page précédente
      }
    });
    return () => {
      backButtonListener.remove(); // Supprimer l'écouteur à la destruction
    };
  }, [exitApp, history, showToast]);
  
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
          <Route path="/helptico" exact={true}>
            <HomeLayout>
              <HelpTiCO />
            </HomeLayout>
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
