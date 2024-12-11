import React, { useState } from "react";
import FICHETOP from "../../../assets/fb/FICHETOP.svg";

function OriginsInfo({ togglePanel, origin }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="bg-custom-green-clear rounded-e-[3rem] left-0 w-[95%] min-h-40 z-0 relative pb-4">
      <div className="px-2 py-6">
        <div className="text-sm w-full text-center text-[#2c6c67] underline underline-offset-2">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="focus:outline-none text-[#2c6c67] underline"
          >
            {showInfo
              ? "Masquer les explications"
              : "Comprendre les origines d'un produit"}
          </button>
        </div>

        {showInfo && (
          <div className="text-base text-start p-2 text-[#2c6c67]">
            <p className="text-sm text-custom-green-text">
              Bienvenue dans le merveilleux onglet des origines ! L’origine d’un
              produit est un sujet épineux, pour faire simple elle se joue sur 3
              éléments :
            </p>
            <ul className="list-disc list-inside text-sm text-custom-green-text">
              <li>Le lieu de production du produit</li>
              <li>Les lieux de production des ingrédients</li>
              <li>Les lieux de production des matières premières</li>
            </ul>
            <p className="text-sm text-custom-green-text">
              Pas trop mal à la tête ? Ok on continue !
            </p>
            <p className="text-sm text-custom-green-text">
              <strong>Le lieu de production du produit</strong> c’est l’endroit
              où le produit que vous achetez est fabriqué, on l’appelle dans le
              jargon le lieu de transformation, de conditionnement ou
              d’embouteillage en fonction du type de produit.
            </p>
            <p className="text-sm text-custom-green-text">
              <strong>Les lieux de productions des ingrédients</strong> sont les
              endroits où chaque ingrédient utilisé dans le produit que vous
              achetez a été produit.
            </p>
            <p className="text-sm text-custom-green-text">
              <strong>
                Les lieux de production des matières premières
              </strong>{" "}
              quant à eux sont les endroits où sont produits les matières
              premières qui servent à fabriquer les ingrédients.
            </p>
            <p className="text-sm text-custom-green-text">
            Voilà … vous savez tout ! (un doliprane ?)
            </p>
          </div>
        )}

        <div className="mt-4">
          <h3 className="text-lg font-bold text-[#2c6c67]">
            Lieu de transformation / conditionnement / embouteillage :
          </h3>
          {origin.map((item, index) => (
            <div key={index} className="mt-4">
              <h4 className="text-base font-bold text-custom-green-text">
                {item.ingredient} - {item.origin}
              </h4>
              <p className="text-sm text-custom-green-text">
                Contient : {item.ingredient} provenant de {item.origin}
              </p>
              <p className="text-sm text-custom-green-text">Champ de texte libre</p>
            </div>
          ))}
        </div>

        <img
          src={FICHETOP}
          className="w-12 absolute bottom-0 right-0"
          onClick={() => togglePanel(1)}
          alt="Toggle Panel"
        />
      </div>
    </div>
  );
}

export default OriginsInfo;
