import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import refresh from "./hooks/useRefreshToken.js";
import { ToastProvider } from "./context/ToastContext.jsx";
import { NetworkProvider } from './context/NetworkContext.jsx';
const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
  refresh: refresh
});


createRoot(document.getElementById('root')).render(
 
        <NetworkProvider>

    <AuthProvider store={store}>
    <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App/>} />
          </Routes>
        </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
      </NetworkProvider>
  ,
)
