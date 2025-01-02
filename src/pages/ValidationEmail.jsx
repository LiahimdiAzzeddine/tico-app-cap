import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IonLoading, useIonLoading, useIonRouter } from "@ionic/react";
import { alertCircle, checkmarkCircle } from 'ionicons/icons';
import axios from "../api/axios";
import { IonIcon } from "@ionic/react";

const ValidationEmail = () => {
    const { token } = useParams();
    const history = useIonRouter();
    const [present, dismiss] = useIonLoading();
    
    const goToPage = (path) => {
        history.push(path, "root", "replace");
      };

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        
        const validateEmail = async () => {
            await present({
            mode: "ios",
            spinner: "bubbles",
          });
            try {
                // Tentative de validation de l'email avec le token
                const response = await axios.get(`/api/validate-email/${token}`);
                
                // Message de succès
                setSuccessMessage(response.data.message);
                setLoading(false);
                
                // Redirection vers la page de login après 2 secondes
                setTimeout(() => {
                    goToPage('/login');
                }, 2000);

            } catch (err) {
                // Log de l'erreur pour vérifier la structure de l'objet
                console.error("🚀 ~ validateEmail ~ err:", err.response);
                const errorMessage = err.response?.data?.message || 'Erreur de validation.';
                setError(errorMessage);  // Mise à jour de l'état error
                setLoading(false);
            }
            await dismiss();
        };

        // Lancer la fonction de validation à chaque changement du token
        validateEmail();
    }, [token, history]);

    return (
        <div className="flex justify-center items-center h-full">
            {/* Affichage du spinner pendant le chargement */}
            {loading && (
               <IonLoading trigger="open-loading" message="Dismissing after 3 seconds..." duration={3000} />
            )}

            {/* Affichage de l'erreur si une erreur survient */}
            {!loading && error && (
                <div className="bg-red-500 p-6 m-6 rounded-md flex items-center flex-col">
                    <IonIcon icon={alertCircle} className="w-16 h-16 text-white mb-4" />
                    <p className="text-white">{error}</p>
                </div>
            )}

            {/* Affichage du message de succès */}
            {!loading && successMessage && (
                <div className="bg-green-500 p-6 m-6 rounded-md flex items-center flex-col">
                    <IonIcon icon={checkmarkCircle} className="w-16 h-16 text-white mb-4" />
                    <p className="text-white">{successMessage}</p>
                </div>
            )}
        </div>
    );
};

export default ValidationEmail;
