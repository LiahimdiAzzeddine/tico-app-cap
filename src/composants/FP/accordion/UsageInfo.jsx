import React from "react";
import FICHETOP from "../../../assets/fb/FICHETOP.svg";
function UsageInfo({ togglePanel }) {
  return (
    <div
      className="bg-custom-green-clear rounded-e-[2rem] left-0 min-h-72 z-0 relative pb-8"
      style={{ width: "calc(100% - 16px)" }}
    >
      <div className="px-4 py-6 flex flex-col gap-4">
        <h1 className="text-xl text-custom-blue font-bold ArchivoExtraBold">
          <span className="marker-effect-cyan ArchivoExtraBold">La marque</span>
        </h1>
        <div className=" flex flex-col gap-2">
          <div className="indent-8 text-sm text-[#2c6b66]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Lire plus
          </div>
        </div>
        <h1 className="text-xl text-custom-blue font-bold ArchivoExtraBold">
          <span className="marker-effect-cyan ArchivoExtraBold">
            Conseil de conservation
          </span>
        </h1>
        <div className=" flex flex-col gap-2">
          <div className="indent-8 text-sm text-[#2c6b66]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Lire plus
          </div>
        </div>
        <img
          src={FICHETOP}
          className="w-12 absolute bottom-1 right-0"
          onClick={(e) => {
            e.stopPropagation(); // Stop propagation
            togglePanel(7);
          }}
          alt="Toggle Panel"
        />
      </div>
    </div>
  );
}

export default UsageInfo;
