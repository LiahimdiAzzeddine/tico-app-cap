import React from "react";
import pastilleNote1 from "../../../assets/fb/pastille-note-1.svg";
import pastilleNote2 from "../../../assets/fb/pastille-note-2.svg";
import pastilleNote3 from "../../../assets/fb/pastille-note-3.svg";
import pastilleNote4 from "../../../assets/fb/pastille-note-4.svg";

const Additifs = ({ additifs }) => {

  const getPastilleImage = (note) => {
    if (note == 1) {
      return pastilleNote1; // High severity
    } else if (note == 2) {
      return pastilleNote2; // Medium severity
    } else if (note == 3) {
      return pastilleNote3; // Low-medium severity
    } else {
      return pastilleNote4; // Low severity
    }
  };
  const noteUFC={
     1: "Acceptable",
     2: "Tolérable, vigilance pour certaines populations",
     3: " Peu recommandable",
     4: "À éviter",
  }
  const SelectedNoteUFC=(note)=>{
    return noteUFC[note]
  }
 
  return (
    <>
      <h1 className="text-xl text-custom-blue font-bold pt-3">
        <span className="marker-effect-cyan">Additifs</span> 
      </h1>
      <div className="mt-4">
        {additifs && additifs.length > 0 ? (
          additifs.map((item, index) => (
            <div key={index} className="flex items-start space-x-2 pb-1">
              {/* Pastille image */}
              <img
                src={getPastilleImage(item.noteUFC)}
                alt={`Pastille for note ${item.noteUFC}`}
                className="w-4 h-4"
              />
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="font-bold text-custom-blue">
                    {item.code}:
                  </span>
                  <span className="text-custom-blue ml-2">{item?.label}</span>
                </div>
                <div className="text-custom-blue text-sm">
                  {item?.fonction1 && item?.fonction2
                    ? `${item.fonction1},${item.fonction2} | ${SelectedNoteUFC(item.noteUFC)}`
                    : item?.fonction1 || SelectedNoteUFC(item.noteUFC)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500">Aucun additif disponible.</div>
        )}
      </div>
    </>
  );
};

export default Additifs;