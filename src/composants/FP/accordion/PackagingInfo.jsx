import React from "react";
import FICHETOP from "../../../assets/fb/FICHETOP.svg";

const PackagingInfoItem = ({
  title,
  description,
  instruction,
  pictogram,
  isLast,
}) => {
  const sortingInstructions = {
    J: "Recyclage -> poubelle jaune",
    V: "Recyclage -> conteneur à verre",
    I: "Pas de recyclage -> Poubelle classique",
    C: "Compostable",
    default: "Incertain",
  };

  return (
    <div className="text-[#2c6b66] flex flex-col gap-4">
      <div>
        <h4 className="text-base text-custom-blue font-bold">{title}</h4>
        <p className="text-sm p-1">{description}</p>
      </div>
      <div>
        <h6 className="text-sm text-custom-blue font-bold">Consigne de tri</h6>
        <div className="flex items-center gap-2 mt-2 p-1">
          <img src={pictogram} alt="Pictogramme" className="w-1/12" />
          <ul className="list-none text-sm">
            <li>
              ➡{" "}
              {sortingInstructions[instruction] || sortingInstructions.default}
            </li>
          </ul>
        </div>
      </div>
      {/* Afficher <hr> sauf pour le dernier élément */}
      {!isLast && <hr className="my-4 mx-16 border-[#005587]" />}
    </div>
  );
};
function PackagingInfo({ togglePanel, pack }) {
  return (
    <div
      className="bg-custom-green-clear rounded-e-[2rem] relative min-h-72 pb-8"
      style={{ width: "calc(100% - 16px)" }}
    >
      <div className="px-4 py-6 flex flex-col gap-4">
        <h1 className="text-xl text-custom-blue font-bold">
          <span className="marker-effect-cyan font-bold">Composants</span> et
          consignes de tri
        </h1>
        {pack && (
          <div className="flex flex-col gap-2">
            {pack.map((element, index) => (
              <PackagingInfoItem
                key={index}
                title={`Partie de l’emballage ${index + 1}`}
                description={element._label}
                instruction={element._instruction}
                pictogram={
                  element._pictogram ||
                  "https://creopack.com/wp-content/uploads/2024/10/mains.png"
                }
                isLast={index === pack.length - 1}
              />
            ))}
          </div>
        )}

        <div className="text-sm text-[#2c6b66] text-center py-4">
          Vérifiez les consignes de tri de votre commune. Elles peuvent varier
          selon la localité.
        </div>

        <img
          src={FICHETOP}
          className="w-12 absolute bottom-1 right-0 cursor-pointer "
          onClick={(e) => {
            e.stopPropagation(); 
            togglePanel(9);
          }}
          alt="Toggle Panel"
        />
      </div>
    </div>
  );
}

export default PackagingInfo;
