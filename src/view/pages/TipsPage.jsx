import React, { useState } from "react";
import Background from "../../assets/tips/bachground.svg";
import { EmptyState } from "../recettes/ui/EmptyState";
import Item from "../tips/ui/Item";
import LoadingState from "../recettes/ui/LoadingState"; // Assuming you can move `LoadingState` to a separate file for reusability
import useLastTips from "../../hooks/tips/useLastTips"; // Adjust path as necessary
import {createTip} from "../../utils/createTip"
import { ErrorState } from "../recettes/ui/ErrorState";

function TipsPage() {
  const ids = []; // Adjust this if necessary to retrieve specific tips based on some condition
  const { tips, loading, error } = useLastTips(ids); // Fetching the list of tips
  const [showModalAddRecipe, setShowModalAddRecipe] = useState(false); // State for showing the modal to add a recipe
  const [showModalRecipe, setShowModalRecipe] = useState(false); // State for showing the recipe details modal
  const [selectedTipId, setSelectedTipId] = useState(null); // Storing the selected tip ID for modal
  const tipsList = Array.isArray(tips)
  ? tips.map((tip) => createTip(tip))
  : [];
  const handleTipClick = (id) => {
    setSelectedTipId(id); // Set the selected tip ID
    setShowModalRecipe(true); // Show the modal with the selected tip
  };

  return (
    <div className="details h-full w-full">
      <div className="h-[15%]">
        <div
          className="flex flex-col items-center justify-center h-5/6 max-h-28"
          style={{
            backgroundImage: `url(${Background})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        >
          <h2 className="text-center text-custom-text-orange text-2xl titre-bold">
            Tit'conseils
          </h2>
        </div>
      </div>

      <div className="flex flex-col h-[85%] justify-center items-center bg-custom-orange">
        <div className="flex flex-col h-5/6 w-full px-6 rounded-b-[2rem] bg-white overflow-auto">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error}/>
          ) : tipsList.length > 0 ? (
            tipsList.map((tip, index) => (
              <Item
                key={tip.id} // Using the ID as the key for each item
                tip={tip}
                index={index}
                length={tips.length} // Corrected from recipe.length to tips.length
                OpenFb={() => handleTipClick(tip.id)} // Pass the tip ID to the modal function
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
        <div className="h-1/6 w-full flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={() => setShowModalAddRecipe(true)} // Opening modal to add a new recipe/tip
            className="btn bg-custom-text-orange text-white border-solid border-[1px] font-bold border-[#fad4ce] px-3 py-2 rounded-lg"
          >
            Proposer un conseil
          </button>
        </div>
      </div>
    </div>
  );
}

export default TipsPage;
