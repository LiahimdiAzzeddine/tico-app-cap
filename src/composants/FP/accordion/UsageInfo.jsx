import React from "react";
import FICHETOP from "../../../assets/fb/FICHETOP.svg";
function UsageInfo({ togglePanel, conservation, utilisation }) {
  return (
    <div
      className="bg-custom-green-clear rounded-e-[2rem] left-0 min-h-72 z-0 relative pb-8"
      style={{ width: "calc(100% - 16px)" }}
    >
      <div className="px-4 py-6 flex flex-col gap-4">
        {utilisation && (
          <>
            <h1 className="text-xl text-custom-blue font-bold ArchivoExtraBold">
              <span className="marker-effect-cyan ArchivoExtraBold">
                Conseil
              </span>{" "}
              d’utilisation
            </h1>
            <div className=" flex flex-col gap-2">
              <div className="indent-8 text-sm text-[#2c6b66]">
                {utilisation}
              </div>
            </div>
          </>
        )}
        {conservation && (
          <>
            <h1 className="text-xl text-custom-blue font-bold ArchivoExtraBold">
              <span className="marker-effect-cyan ArchivoExtraBold">
                Conseil
              </span>{" "}
              de conservation
            </h1>
            <div className=" flex flex-col gap-2">
              <div className="indent-8 text-sm text-[#2c6b66]">
                {conservation}
              </div>
            </div>
          </>
        )}

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
