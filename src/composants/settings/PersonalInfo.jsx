import React, { useState, useEffect } from "react";
import Spinner from "../Spinner";
import useGetProfile from "../../hooks/users/useGetProfile";
import CustomModal from "../modales/CustomModal";
import ChangePassword from "./ChangePassword";
import deleteUserAccount from "../../hooks/users/deleteUserAccount";
import FaceId from "../../assets/auth/face-id-icon.png";

import {
  useIonLoading,
  useIonRouter,
  IonActionSheet, // Import IonActionSheet
} from "@ionic/react";
import { IonList, IonItem, IonLabel, IonIcon } from "@ionic/react";
import { lockClosed, trashBin, personRemove } from "ionicons/icons";
import { useAlert } from "../../context/AlertProvider";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useBiometricAuth } from "../../hooks/auth/useBiometricAuth";

const PersonalInfo = () => {
  const signOut = useSignOut();
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
  const [showActionSheet, setShowActionSheet] = useState(false);
  const history = useIonRouter();
  // Use the new useBiometricAuth hook
  const {
    biometricAvailable,
    hasCredentials,
    biometricError,
    deleteCredentialsWithBiometric,
  } = useBiometricAuth();

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
  // Function to confirm and delete biometric credentials
  const confirmDeleteCredentials = async () => {
    try {
      await deleteCredentialsWithBiometric();
      triggerAlert(
        "Vos credentials biométriques ont été supprimés avec succès",
        "Succès",
        null,
        "ios",
        "",
        "Ok",
        true
      );
      setShowActionSheet(false); // Close the action sheet after successful deletion
    } catch (error) {
      triggerAlert(
        "Erreur lors de la suppression des credentials",
        "Erreur",
        null,
        "ios",
        "",
        "Ok",
        true
      );
    }
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
      signOut();
      triggerAlert(result.message, null, null, "ios", "", "Ok", true);

      // Redirect to the login page
      goToPage("/login");
    } else {
      console.error(
        "Erreur lors de la suppression du compte :",
        result.message
      );
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

          <IonList>
            {/* Change Password Item */}
            <IonItem
              button
              onClick={() => setShowModalPass(true)}
              disabled={!isOnline}
            >
              <IonIcon slot="start" icon={lockClosed} />
              <IonLabel>
                Changer mon mot de passe
                {!isOnline && (
                  <p className="text-sm text-gray-500">
                    (Non disponible hors ligne)
                  </p>
                )}
              </IonLabel>
            </IonItem>

            {/* Account Deletion Item */}
            <IonItem
              button
              onClick={() => setShowModalDelete(true)}
              disabled={!isOnline}
            >
              <IonIcon slot="start" icon={trashBin} />
              <IonLabel>Supprimer mon compte</IonLabel>
            </IonItem>
            {hasCredentials && (
              <IonItem
                button
                onClick={() => setShowActionSheet(true)}
                disabled={!isOnline}
              >
                <img
                  src={FaceId}
                  className="w-6 h-auto mr-[32px]"
                  alt="Face ID Icon"
                />
                <IonLabel>Supprimer les credentials biométriques</IonLabel>
              </IonItem>
            )}

            {/* Action Sheet for additional options */}
            <IonActionSheet
              isOpen={showActionSheet}
              buttons={[
                {
                  text: "Option 1",
                  handler: () => console.log("Option 1 selected"),
                },
                {
                  text: "Option 2",
                  handler: () => console.log("Option 2 selected"),
                },
              ]}
              onDidDismiss={() => setShowActionSheet(false)}
            />
          </IonList>
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
      {/* IonActionSheet for Biometric Credentials Deletion */}
      <IonActionSheet
        isOpen={showActionSheet}
        mode={"ios"}
        onDidDismiss={() => setShowActionSheet(false)}
        header="Supprimer les credentials biométriques"
        subHeader="Cette action supprimera vos credentials biométriques de manière irréversible."
        buttons={[
          {
            text: "Supprimer",
            role: "destructive",
            handler: confirmDeleteCredentials,
          },
          {
            text: "Annuler",
            role: "cancel",
          },
        ]}
      />
    </>
  );
};

export default PersonalInfo;