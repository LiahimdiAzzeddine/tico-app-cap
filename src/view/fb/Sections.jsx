import React from "react";
import top from "../../assets/fb/top.svg";
import recettes from "../../assets/fb/recettes.svg";
import BubbleImg from "../../assets/fb/BubbleImg.svg";
import { Link } from "react-router-dom";

function Sections() {
  return (
    <div className="w-full flex flex-col items-end justify-center pb-4">
    <div className="bg-[#b6e1dd] rounded-s-full w-[95%] px-3 py-9  right-0">
      <div className="flex flex-row">
        <Link
          to={"#"}
          className="w-2/3 flex flex-row justify-center items-center"
        >
          <img src={top} className="h-16" />
        </Link>
        <Link
          to={"#"}
          className="w-2/3 flex flex-row justify-center items-center"
        >
          <img src={recettes} className="h-16" />
        </Link>
        <Link
          to={"#"}
          className="w-2/3 flex flex-row justify-center items-center"
        >
          <img src={BubbleImg} className="h-16" />
        </Link>
      </div>
    </div>
    </div>
  );
}

export default Sections;
