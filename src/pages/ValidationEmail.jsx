import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Spinner from '../composants/Spinner';
import { alertCircle, checkmarkCircle } from 'ionicons/icons';
import axios from "../api/axios";
import { IonIcon } from "@ionic/react";

const ValidationEmail = () => {
    const { token } = useParams();
    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        const validateEmail = async () => {
            try {
                // Tentative de validation de l'email avec le token
                const response = await axios.get(`/api/validate-email/${token}`);
                
                // Message de succès
                setSuccessMessage(response.data.message);
                setLoading(false);
                
                // Redirection vers la page de login après 2 secondes
                setTimeout(() => {
                    history.replace('/login');
                }, 2000);

            } catch (err) {
                // Log de l'erreur pour vérifier la structure de l'objet
                console.error("🚀 ~ validateEmail ~ err:", err.response);
                const errorMessage = err.response?.data?.message || 'Erreur de validation.';
                setError(errorMessage);  // Mise à jour de l'état error
                setLoading(false);
            }
        };

        // Lancer la fonction de validation à chaque changement du token
        validateEmail();
    }, [token, history]);

    return (
        <div className="flex justify-center items-center h-full">
            {/* Affichage du spinner pendant le chargement */}
            {loading && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <Spinner />
                </div>
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
