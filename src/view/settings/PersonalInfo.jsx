import React, { useState, useEffect } from "react";
import Spinner from "../composants/Spinner";
import useGetProfile from '../../hooks/users/useGetProfile';
import { Link } from 'react-router-dom';
import CustomModal from "../composants/CustomModal";
import ChangePassword from "./ChangePassword";

const PersonalInfo = () => {
  const { profile, loading: profileLoading, error: profileError } = useGetProfile();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [cachedProfile, setCachedProfile] = useState(null);
  const [showModalPass, setShowModalPass] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cache management
    if (profile && isOnline) {
      localStorage.setItem('cachedProfile', JSON.stringify(profile));
    }

    // Load cached data when offline
    if (!isOnline) {
      const cached = localStorage.getItem('cachedProfile');
      if (cached) {
        setCachedProfile(JSON.parse(cached));
      }
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [profile, isOnline]);

  // Offline banner
  const OfflineBanner = () => (
    <div className="bg-yellow-100 p-2 text-center text-yellow-800 mb-4">
      Vous êtes hors ligne. Les informations affichées proviennent du indexeddb.
    </div>
  );

  if (profileLoading && isOnline) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner />
      </div>
    );
  }

  if (profileError && !cachedProfile) {
    return (
      <div className="text-red-500 text-center">
        Une erreur est survenue lors du chargement du profil. {isOnline ? profileError : "Vérifiez votre connexion internet."}
      </div>
    );
  }

  const displayProfile = isOnline ? profile : cachedProfile;

  if (!displayProfile) {
    return (
      <div className="text-center">
        Aucune information disponible. Connectez-vous à Internet pour charger votre profil.
      </div>
    );
  }

  return (
    <>
    
    <div className="flex gap-4 flex-col justify-start items-center h-full">
      {!isOnline && <OfflineBanner />}
      
      <h2 className="text-center text-[#006aff] text-2xl titre-bold underline underline-offset-4 decoration-orange-400 grow">
        Mes informations
      </h2>

      <div className="space-y-4 w-11/12 max-w-xs grow-[3]">
        <div className="flex flex-col items-center">
          <label className="text-orange-500 mb-1 text-base text-center font-bold">
            Mon adresse email
          </label>
          <p className="w-full p-2 border-[1.5px] rounded-lg bg-gray-100">
            {displayProfile.email || "Pas d'email disponible"}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <label className="text-orange-500 mb-1 text-base text-center font-bold">
            Mon pseudo
          </label>
          <p className="w-full p-2 border-[1.5px] rounded-lg bg-gray-100">
            {displayProfile.username || "Pas de pseudo disponible"}
          </p>
        </div>

        <div className="flex justify-center mt-2">
          <Link 
            onClick={()=>{setShowModalPass(true)}}
            className={`hover:underline text-orange-400 ${!isOnline ? 'pointer-events-none opacity-50' : ''}`}
          >
            Changer mon mot de passe {!isOnline && "(Non disponible hors ligne)"}
          </Link>
        </div>
      </div>
    </div>
    <CustomModal isOpen={showModalPass} onClose={() => setShowModalPass(false)}>
        <ChangePassword />
      </CustomModal>
    </>
  );
};

export default PersonalInfo;