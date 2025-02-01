import React, { useState, useEffect } from "react";
import Spinner from "../Spinner";
import useGetProfile from "../../hooks/users/useGetProfile";
import { Link } from "react-router-dom";
import CustomModal from "../modales/CustomModal";
import ChangePassword from "./ChangePassword";
import deleteUserAccount from "../../hooks/users/deleteUserAccount";
import { useIonLoading, useIonRouter } from "@ionic/react";
import { useAlert } from "../../context/AlertProvider";
import useSignOut from 'react-auth-kit/hooks/useSignOut';

const PersonalInfo = () => {
  const signOut = useSignOut()
  const {
    profile,
    loading: profileLoading,
    error: profileError,
  } = useGetProfile();
  const {
    deleteAccount,
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = deleteUserAccount();
  const { triggerAlert } = useAlert();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [cachedProfile, setCachedProfile] = useState(null);
  const [showModalPass, setShowModalPass] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false); // For account deletion modal
  const [present, dismiss] = useIonLoading();
  const history = useIonRouter();
  const goToPage = (path) => {
    history.push(path, "root", "replace");
  };
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cache management
    if (profile && isOnline) {
      localStorage.setItem("cachedProfile", JSON.stringify(profile));
    }

    // Load cached data when offline
    if (!isOnline) {
      const cached = localStorage.getItem("cachedProfile");
      if (cached) {
        setCachedProfile(JSON.parse(cached));
      }
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [profile, isOnline]);

  // Offline banner
  const OfflineBanner = () => (
    <div className="bg-yellow-100 p-2 text-center text-yellow-800 mb-4">
      Vous êtes hors ligne. Les informations affichées proviennent du indexeddb.
    </div>
  );
  // Function to confirm account deletion
  const confirmAccountDeletion = () => {
    triggerAlert(
      "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.",
      "Attention",
      handleAccountDeletion, // Callback if user confirms
      "ios",
      "oui",
      "annuler"
    );
  };

  // Function to handle account deletion
  const handleAccountDeletion = async () => {
    // Display loading spinner
    present({
      mode: "ios",
      spinner: "bubbles",
      cssClass: "custom-loading-dialog",
      message: "Suppression de votre compte en cours...",
    });
  
    // Call the deleteAccount function
    const result = await deleteAccount();
    console.log("🚀 ~ handleAccountDeletion ~ result:", result);
  
    // Hide loading spinner
    dismiss();
  
    // Check the result and display appropriate feedback
    if (result.success) {
      signOut()
      triggerAlert(
        result.message,
        null,
        null,
        "ios",
        "",
        "Ok",
        true
      );
  
      // Redirect to the login page
      goToPage("/login");
    } else {
      console.error("Erreur lors de la suppression du compte :", result.message);
      triggerAlert(
        result.message, // Use the error message from the result
        null,
        null,
        "ios",
        "",
        "Ok",
        true
      );
    }
  };
  
  

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
        Une erreur est survenue lors du chargement du profil.{" "}
        {isOnline ? profileError : "Vérifiez votre connexion internet."}
      </div>
    );
  }

  const displayProfile = isOnline ? profile : cachedProfile;

  if (!displayProfile) {
    return (
      <div className="text-center">
        Aucune information disponible. Connectez-vous à Internet pour charger
        votre profil.
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-4 flex-col justify-start items-center h-full">
        {!isOnline && <OfflineBanner />}

        <h2 className="h-1/6 text-center text-custom-blue text-3xl titre-bold flex items-center justify-center w-full">
          Mes informations
        </h2>

        <div className="space-y-4 w-11/12 max-w-xs h-5/6">
          <div className="flex flex-col items-center">
            <label className="text-orange-500 mb-1 text-base text-center font-bold">
              Mon adresse email
            </label>
            <p className="w-full p-2 border-2 rounded-xl bg-gray-100 Archivo text-custom-blue border-custom-text-orange">
              {displayProfile.email || "Pas d'email disponible"}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <label className="text-orange-500 mb-1 text-base text-center font-bold">
              Mon pseudo
            </label>
            <p className="w-full p-2 border-2 rounded-xl bg-gray-100 Archivo text-custom-blue border-custom-text-orange">
              {displayProfile.username || "Pas de pseudo disponible"}
            </p>
          </div>

          <div className="flex justify-center mt-2">
            <Link
              onClick={() => {
                setShowModalPass(true);
              }}
              className={`underline underline-offset-2 text-orange-400 ${
                !isOnline ? "pointer-events-none opacity-50" : ""
              }`}
            >
              Changer mon mot de passe{" "}
              
              {!isOnline && "(Non disponible hors ligne)"}
            </Link>
          </div>

          {/* Button for account deletion */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowModalDelete(true)}
              className="underline underline-offset-2 text-orange-400 "
            >
              Supprimer mon compte
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Change Password */}
      <CustomModal
        isOpen={showModalPass}
        onClose={() => setShowModalPass(false)}
      >
        <ChangePassword Close={setShowModalPass} />
      </CustomModal>

      {/* Modal for Account Deletion */}
      <CustomModal
        isOpen={showModalDelete}
        onClose={() => setShowModalDelete(false)}
      >
        <div className="px-4 py-16">
          <h2 className=" text-center text-custom-blue text-2xl titre-bold flex items-center justify-center w-full pb-14">
            Êtes-vous sûr de vouloir supprimer votre compte ?
          </h2>
          <p className="text-center mb-4 ArchivoBold">
            Cette action est irréversible.
          </p>
          <div className="flex justify-around">
            <button
              onClick={() => setShowModalDelete(false)}
              className="bg-[#ffff] p-2 text-custom-blue Archivo font-bold  text-lg  rounded-xl  transform transition-transform duration-150 ease-in-out active:scale-9"
            >
              Annuler
            </button>
            <button
              onClick={confirmAccountDeletion}
              className="bg-custom-red Archivo text-white font-bold  text-lg  rounded-xl  transform transition-transform duration-150 ease-in-out active:scale-90 p-2"
            >
              Supprimer mon compte
            </button>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default PersonalInfo;