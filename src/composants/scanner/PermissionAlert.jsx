import { IonAlert } from "@ionic/react";

const PermissionAlert = ({ showAlert, setShowAlert }) => {
  return (
    <IonAlert
      isOpen={!!showAlert}
      header={showAlert?.header}
      message={showAlert?.message}
       mode={"ios"}
      buttons={showAlert?.buttons}
      onDidDismiss={() => setShowAlert(null)}
    />
  );
};

export default PermissionAlert;
