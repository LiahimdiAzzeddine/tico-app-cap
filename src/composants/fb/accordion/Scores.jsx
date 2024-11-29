import React from "react";
import NutriscoreA from "../../../assets/fb/score/Nutri_score_A.png";

function Scores() {
  return (
    <>
      <h1 className="text-xl text-custom-blue font-bold py-3 px-2">
      <span className="marker-effect-cyan"> Nutri-Score</span>
      </h1>
      <div className="px-2 py-1 flex flex-col gap-1">
        <img
          src={NutriscoreA}
          alt="Nutri-Score A"
          className="w-32 h-auto m-auto p-2"
        />
        <div className="indent-8 text-sm text-custom-green-text">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus esse deserunt eius. Sint dignissimos voluptatem perferendis cum totam! Maiores hic natus quaerat iure quibusdam atque tempora accusantium in non. Molestias!
        </div>
        <div className="indent-8 text-sm text-custom-green-text">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum dolores est eos distinctio, quo dicta fugit inventore nihil placeat non similique accusantium ipsam veniam laborum quis mollitia quisquam culpa. Vel!
        </div>
      </div>
    </>
  );
}

export default Scores;