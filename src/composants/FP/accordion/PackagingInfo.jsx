import React from 'react'
import FICHETOP from "../../../assets/fb/FICHETOP.svg";

function PackagingInfo({togglePanel}) {
  return (
    <div
      className="bg-custom-green-clear rounded-e-[2rem] left-0 min-h-72 z-0 relative pb-8"
      style={{ width: "calc(100% - 16px)" }}
    >
      <div className="px-4 py-6 flex flex-col gap-4">
        <h1 className="text-xl text-custom-blue font-bold ArchivoExtraBold">
          <span className="marker-effect-cyan ArchivoExtraBold">Composants 
          </span> et consignes de tri
        </h1>
        <div className=" flex flex-col gap-2">
        <h4 className="text-base text-custom-blue ArchivoBold">
        Partie de l’emballage 1
          </h4>
          <div className="text-sm text-[#2c6b66]">
          Description du composant
          </div>
          <h6 className="text-sm text-custom-blue ArchivoBold">Consigne de tri
          </h6>
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
            togglePanel(9);
          }}
          alt="Toggle Panel"
        />
      </div>
    </div>
  );
}

export default PackagingInfo