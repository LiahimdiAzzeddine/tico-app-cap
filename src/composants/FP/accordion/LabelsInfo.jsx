import React, { useState } from "react";
import FICHETOP from "../../../assets/fb/FICHETOP.svg";
const VITE_LABEL_IMAGES = import.meta.env.VITE_LABEL_IMAGES;

function LabelsInfo({ togglePanel,engagements }) {
  const labels = [];
  const mentions = [];
  
  Object.values(engagements || {}).forEach(e => {
    const generic = e._generic;
    if (!generic) return;
  
    const item = {
      _label: generic._label,
      _image: `${VITE_LABEL_IMAGES}${generic._image}`,
      _details: generic._details
    };
  
    if (generic._labeltype === 'L') {
      labels.push(item);
    } else if (generic._labeltype === 'M') {
      mentions.push(item);
    }
  });
  
  return (
    <div
      className="bg-custom-green-clear rounded-e-[2rem] left-0 min-h-72 z-0 relative pb-8"
      style={{ width: "calc(100% - 16px)" }}
    >
      <div className="px-4 py-6 flex flex-col gap-4">
        <h1 className="text-xl text-custom-blue font-bold ArchivoExtraBold">
          <span className="marker-effect-cyan ArchivoExtraBold">Labels</span>
        </h1>
        <p className="text-xs text-custom-blue ArchivoItalic">
          Les labels sont des certifications qui engagent les marques à
          respecter des cahiers des charges et les soumettent à des contrôles.
        </p>
        <div className="flex flex-col gap-2">
          {labels.map((label, index) => (
            <LabelCard key={index} label={label} />
          ))}
        </div>
        <h1 className="text-xl text-custom-blue font-bold ArchivoExtraBold pt-4">
          <span className="marker-effect-cyan ArchivoExtraBold">Mentions</span>
        </h1>
        <p className="text-xs text-custom-blue ArchivoItalic">
          Les mentions sont des allégations faites par les marques selon des
          critères légaux ou propre à la marque.
        </p>
        <div className="flex flex-col gap-2">
          {mentions.map((label, index) => (
            <LabelCard key={index} label={label} />
          ))}
        </div>

        <img
          src={FICHETOP}
          className="w-12 absolute bottom-1 right-0"
          onClick={() => togglePanel(5)}
          alt="Toggle Panel"
        />
      </div>
    </div>
  );
}

function LabelCard({ label }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100; // Nombre de caractères max avant coupure

  const details = label._details || ""; // Éviter les erreurs si _details est undefined
  const isLongText = details.length > maxLength;

  return (
    <div className="flex flex-row gap-4 items-center">
      {label._image && (
        <img src={label._image} alt={label._label} className="w-1/4 max-w-36" />
      )}
      <div className="text-sm text-[#2c6b66] Archivo">
        <strong>{label._label}</strong> –{" "}
        {isExpanded || !isLongText ? details : details.slice(0, maxLength) + "..."}  
        {isLongText && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#2c6b66] underline cursor-pointer ml-1"
          >
            {isExpanded ? "Voir moins" : "Lire plus"}
          </button>
        )}
      </div>
    </div>
  );
}

export default LabelsInfo;
