import React from "react";
import NutriscoreA from "../../../assets/fb/score/Nutri_score_A.png";
import PlanetScore from "../../../assets/fb/planet-scora-a.png";

function Scores() {
  return (
    <div className="bg-custom-green-clear rounded-e-3xl left-0 w-[95%] min-h-72 z-0">
      <h1 className="text-2xl text-custom-blue font-bold py-3 px-3">
        <span className="marker-effect"> Nutri-Score</span>
      </h1>
      <div className="px-8 py-1 flex flex-col gap-1">
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
      <h1 className="text-2xl text-custom-blue font-bold py-3 px-3">
        <span className="marker-effect"> Planet Score</span>
      </h1>
      <div className="px-8 py-1 flex flex-col gap-1">
        <img
          src={PlanetScore}
          alt="Planet Score"
          className="w-44 h-auto  m-auto p-2"
        />
        <div className="indent-8 text-sm text-custom-green-text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta totam labore inventore reprehenderit saepe asperiores fugit amet magnam maiores porro ex praesentium expedita dolores, placeat laboriosam modi eligendi doloribus iste.
        </div>
        <div className="indent-8 text-sm text-custom-green-text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta totam labore inventore reprehenderit saepe asperiores fugit amet magnam maiores porro ex praesentium expedita dolores, placeat laboriosam modi eligendi doloribus iste.
        </div>
        <div className="indent-8 text-sm text-custom-green-text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta totam labore inventore reprehenderit saepe asperiores fugit amet magnam maiores porro ex praesentium expedita dolores, placeat laboriosam modi eligendi doloribus iste.
        </div>
      </div>
    </div>
  );
}

export default Scores;