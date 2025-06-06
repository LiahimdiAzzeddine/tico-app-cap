import React from "react";
import pastilleNote1 from "../../../assets/fb/pastille-note-1.svg";
import pastilleNote2 from "../../../assets/fb/pastille-note-2.svg";
import pastilleNote3 from "../../../assets/fb/pastille-note-3.svg";
import pastilleNote4 from "../../../assets/fb/pastille-note-4.svg";
import { useGlobalContext } from "../GlobalProvider";
import { Link } from "react-router-dom";

const Additifs = ({ additifs, targetRefAdditifs }) => {
  const { setIsCourager } = useGlobalContext();

  const getPastilleImage = (note) => {
    if (note === 1) {
      return pastilleNote1; // High severity
    } else if (note === 2) {
      return pastilleNote2; // Medium severity
    } else if (note === 3) {
      return pastilleNote3; // Low-medium severity
    } else {
      return pastilleNote4; // Low severity
    }
  };

  const noteUFC = {
    1: "Acceptable",
    2: "Tolérable, vigilance pour certaines populations",
    3: "Peu recommandable",
    4: "À éviter",
  };

  const SelectedNoteUFC = (note) => {
    return noteUFC[note] ?? "Note inconnue"; // Valeur par défaut si la note est absente
  };

  return (
    <>
      <h1 className="text-xl text-custom-blue font-bold pt-3">
        <span className="marker-effect-cyan ArchivoExtraBold">Additifs</span>
      </h1>

      {additifs && additifs.length > 0 ? (
        additifs.map((item, index) => (
          <div className="pt-4 pb-8" id="additifs" key={index}>
            <div className="flex items-start space-x-2 pb-1">
              {/* Pastille image */}
              <img
                src={getPastilleImage(item?.noteUFC ?? 4)} // Valeur par défaut si noteUFC est absente
                alt={`Pastille for note ${item?.noteUFC ?? 4}`}
                className="w-4 h-4"
              />
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="font-bold text-custom-blue ArchivoBold text-sm">
                    {item?.code ?? "Code inconnu"}:
                  </span>
                  <span className="text-custom-blue ml-2 ArchivoLight text-sm">
                    {item?.label ?? "Label indisponible"}
                  </span>
                </div>
                <div className="text-custom-blue text-sm ArchivoItalic ">
                  {[
                    item?.fonction1,
                    item?.fonction2,
                    SelectedNoteUFC(item?.noteUFC),
                  ]
                    .filter(Boolean) // Supprime les valeurs nulles, indéfinies ou vides
                    .join(" | ")}{" "}
                  {/* Combine les valeurs disponibles avec " | " */}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="pt-4 pb-8" id="additifs">
          <div className="text-custom-blue ArchivoLight tracking-normal text-sm flex flex-col gap-1">
            <div className="">Ne contient pas d'Additifs</div>
            <Link
              to={"#"}
              className="underline font-bold"
              onClick={() => {
                setIsCourager(true);
              }}
            >
              À confirmer par la marque
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Additifs;
