import React, { useState } from "react";
import FICHETOP from "../../../assets/fb/FICHETOP.svg";

function LabelsInfo({ togglePanel }) {
  const labels = [
    {
      name: "Label Rouge",
      image:
        "https://www.brive-tourisme.com/uploads/2022/02/telechargement.png",
      description:
        "Label Rouge est un signe national officiel de qualité, permettant d'identifier les produits bénéficiant d’un niveau de qualité supérieure aux produits similaires de leur catégorie. Respect du cahier des charges et contrôles réguliers garantissent cette qualité.",
    },
    {
      name: "Bleu-Blanc-Cœur",
      image:
        "https://cdn.worldvectorlogo.com/logos/logo-bleu-blanc-coeur-1.svg",
      description:
        "Bleu-Blanc-Cœur est une marque aux caractéristiques d’un label. C’est une démarche agricole et alimentaire durable visant à améliorer la qualité nutritionnelle et environnementale, en intégrant une meilleure alimentation des animaux.",
    },
  ];
  const mentions = [
    {
      name: "Lorem, ipsum dolor ",
      image:
        "https://www.logoai.com/uploads/output/2021/11/08/4d51348a67e197aeefe296d4bc379d24.jpg?t=1636384250",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, asperiores adipisci. Suscipit voluptates ullam perferendis tenetur similique eveniet quo sint, numquam iusto possimus eius perspiciatis provident quia reprehenderit? Beatae, odit!",
    },
    {
      name: "Lorem, ipsum dolor ",
      image:
        "https://www.creativefabrica.com/wp-content/uploads/2021/03/10/Modern-Colorful-M-Letter-Logo-Design-Graphics-9428025-1-1-580x435.jpg",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, asperiores adipisci. Suscipit voluptates ullam perferendis tenetur similique eveniet quo sint, numquam iusto possimus eius perspiciatis provident quia reprehenderit? Beatae, odit!",
    },
  ];

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

  return (
    <div className="flex flex-row gap-4 items-center">
      <img src={label.image} alt={label.name} className="w-1/4 max-w-36" />
      <div className="text-sm text-[#2c6b66] Archivo">
        <strong>{label.name}</strong> –{" "}
        {isExpanded
          ? label.description
          : label.description.slice(0, maxLength) + "..."}{" "}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#2c6b66] underline"
        >
          {isExpanded ? "Voir moins" : "Lire plus"}
        </button>
      </div>
    </div>
  );
}

export default LabelsInfo;
