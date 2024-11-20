import { IonToast } from "@ionic/react";

const ErrorToast = ({ showToast, err, setShowToast }) => {
  return (
    <IonToast
      isOpen={showToast}
      message={err}
      duration={2000}
      onDidDismiss={() => setShowToast(false)}
    />
  );
};

export default ErrorToast;
