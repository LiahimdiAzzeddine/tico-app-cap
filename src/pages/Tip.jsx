import React from "react";
import { useParams } from "react-router-dom";
import useTipById from "../hooks/tips/useTipById";
import Spinner from "../composants/Spinner";
import { ErrorMessage } from "../composants/scanner/UI/ErrorMessage";
import { IonContent } from "@ionic/react";
import { alertCircle } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import TipDetails from "../composants/tips/TipDetails";
import { createTip } from "../utils/createTip";

const Tip = () => {
  const { id } = useParams(); 
  const { tip, loading, error } = useTipById(id);
  const history = useHistory();
  const tipForme=tip?createTip(tip):{};
  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <Spinner />
    </div>
    );
  }


  if (error || !tip) {
    return (
      <IonContent className="ion-padding-bottom">
        <ErrorMessage
          message={error || "No recipe found"}
          icon={alertCircle}
          onClose={() => history.recipe("/scanner")}
        />
      </IonContent>
    );
  }

  return (
    <TipDetails tip={tipForme} />
  );
};

export default Tip;
