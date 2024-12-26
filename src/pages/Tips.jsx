import React from "react";
import { EmptyState } from "../composants/recettes/ui/EmptyState";
import Item from "../composants/tips/ui/Item";
import LoadingState from "../composants/recettes/ui/LoadingState";
import useLastTips from "../hooks/tips/useLastTips";
import { createTip } from "../utils/createTip";
import { ErrorState } from "../composants/ui/ErrorState";
import TapLayout from "../composants/layout/TapLyout";
import { useIonRouter } from "@ionic/react";

function Tips() {
  const ids = [];
  const { tips, loading, error } = useLastTips(ids);
  const history = useIonRouter();

  const goToTip = (selectedTip) => {
    history.push(`/tabs/tab5/tip/${selectedTip.id}`, "forward", "push");
  };

  const tipsList = Array.isArray(tips) ? tips.map((tip) => createTip(tip)) : [];

  const handleTipClick = (selectedTip) => {
    goToTip(selectedTip);
  };

  return (
    <TapLayout>
      <div className="details h-full w-full">
        <div className="h-[17%] pb-4">
          <div className="flex flex-col items-center justify-center h-5/6 max-h-28 backgroundTips">
            <h2 className="text-center text-custom-text-orange text-3xl titre-bold">
              Ti'conseils
            </h2>
          </div>
        </div>

        <div className="flex flex-col h-[83%] justify-center items-center bg-white">
          <div className="flex flex-col h-full w-full px-6  overflow-auto">
            {loading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState message={error} />
            ) : tipsList.length > 0 ? (
              tipsList.map((tip, index) => (
                <Item
                  key={tip.id}
                  tip={tip}
                  index={index}
                  length={tipsList.length}
                  OpenTip={() => handleTipClick(tip)} // Passe l'objet tip complet
                />
              ))
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </TapLayout>
  );
}

export default Tips;
