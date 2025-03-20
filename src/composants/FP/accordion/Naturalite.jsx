import React from "react";
import FICHETOP from "../../../assets/fb/FICHETOP.svg";
import LogoOriginalC from "../../../assets/naturalite/Logo-originalC.png";
import LogoOriginalNo from "../../../assets/naturalite/Logo-originalNo.png";
import LogoOriginalV from "../../../assets/naturalite/Logo-originalV.png";
function Naturalite({ togglePanel, scoreNat }) {
  return (
    <div
      className="bg-custom-green-clear rounded-e-[2rem] left-0 min-h-72 z-0 relative pb-8"
      style={{ width: "calc(100% - 16px)" }}
    >
      <div className="px-4 py-6 flex flex-col gap-4">
        <h1 className="text-xl text-custom-blue font-bold ArchivoExtraBold">
          <span className="marker-effect-cyan ArchivoExtraBold">
            Naturalité des{" "}
          </span>{" "}
          ingrédients
        </h1>
        {scoreNat?._goum && ["C", "N", "V"].includes(scoreNat._goum) && (
          <div className="px-4 py-4 flex flex-col gap-1 w-11/12 justify-center justify-items-center m-auto bg-no-repeat bg-contain bg-center recetteBg">
            <div className="w-full py-3">
              <img
                src={
                  scoreNat._goum === "C"
                    ? LogoOriginalC
                    : scoreNat._goum === "N"
                    ? LogoOriginalNo
                    : LogoOriginalV // Ajout pour gérer "V"
                }
                className="w-6/12 m-auto max-w-60 max-h-60"
                alt={`Planet score ${scoreNat._goum}`}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 pb-4">
          <div className="text-sm text-[#2c6b66]">
            La naturalité des ingrédients s'oppose à l'ultra-transformation. Il
            est important de choisir des aliments peu ou pas transformés pour
            prendre soin de votre santé.
          </div>
          <div className="text-sm text-[#2c6b66]">
            Texte général pour « ingrédients à vérifier »
          </div>
          <div className="text-sm text-[#2c6b66]">
            {[scoreNat?._short, scoreNat?._medium, scoreNat?._long]
              .filter(Boolean) // Supprime les valeurs null/undefined
              .map((text, index) => (
                <div key={index}>- {text}</div>
              ))}
          </div>
        </div>

        <img
          src={FICHETOP}
          className="w-12 absolute bottom-1 right-0"
          onClick={(e) => {
            e.stopPropagation(); 
            togglePanel(8);
          }}
          alt="Toggle Panel"
        />
      </div>
    </div>
  );
}

export default Naturalite;
