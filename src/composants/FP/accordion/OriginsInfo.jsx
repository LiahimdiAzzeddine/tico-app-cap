import React, { useState } from "react";
import FICHETOP from "../../../assets/fb/FICHETOP.svg";
import factory from "../../../assets/fb/factory.svg";
import { IonText, IonButton } from "@ionic/react";

function OriginsInfo({ togglePanel }) {
  const [showInfo, setShowInfo] = useState(false);

  // Données factices des origines des ingrédients
  const [origin] = useState([
    { ingredient: "Tomates", origin: "Maroc" },
    { ingredient: "Sucre de canne", origin: "Brésil" },
    { ingredient: "Vanille", origin: "Madagascar" },
  ]);
  const [matieres] = useState([
    { ingredient: "Cacao", origin: "Espagne" },
    { ingredient: "Blé", origin: "France" },
    { ingredient: "Café", origin: "Madagascar" },
  ]);

  return (
    <div
      className="bg-custom-green-clear rounded-e-[2rem] left-0 min-h-72 z-0 relative pb-6"
      style={{ width: "calc(100% - 16px)" }}
    >
      <div className="px-4 py-6">
        {!showInfo && (
          <div className="text-center">
            <a
              className="text-xs text-mockup-green Archivo normal-case underline underline-offset-1"
              onClick={() => setShowInfo(!showInfo)}
            >
              Comprendre les origines d’un produit
            </a>
          </div>
        )}

        {showInfo && (
          <div className="text-base text-start text-mockup-green Archivo">
            <p className="text-xs">
              Bienvenue dans le merveilleux onglet des origines ! L’origine d’un
              produit est un sujet complexe qui repose sur trois éléments :
            </p>
            <ul className="list-outside text-xs">
              <li>- &nbsp;Le lieu de production du produit</li>
              <li>- &nbsp;Les lieux de production des ingrédients</li>
              <li>- &nbsp;Les lieux de production des matières premières</li>
            </ul>
            <p className="text-xs pb-2">
              <strong>Le lieu de production du produit</strong> est l’endroit où
              le produit final est fabriqué, souvent appelé lieu de
              transformation, de conditionnement ou d’embouteillage selon le
              type de produit.
            </p>
            <p className="text-xs pb-2">
              <strong>Les lieux de production des ingrédients</strong> sont les
              endroits où chaque ingrédient est cultivé ou fabriqué.
            </p>
            <p className="text-xs pb-2">
              <strong>Les lieux de production des matières premières</strong>{" "}
              sont les sites où les matières premières servant à la fabrication
              des ingrédients sont extraites ou produites.
            </p>
            <p className="text-xs pb-2">
              Voilà… Vous savez tout ! (Besoin d’un Doliprane ? 😅)
            </p>
            <a
              className="text-xs text-mockup-green Archivo underline underline-offset-1 cursor-pointer"
              onClick={() => setShowInfo(!showInfo)}
            >
              Fermer
            </a>
          </div>
        )}

        <div className="mt-4 flex flex-col gap-4">
          <div className="flex flex-row justify-center items-center gap-3">
            <img src={factory} className="w-9" alt="Factory icon" />
            <div className="text-sm text-custom-blue Archivo">
              Lieu de transformation / conditionnement / embouteillage :
            </div>
            <div className="text-lg text-mockup-blue ArchivoBold">France</div>
          </div>
          <div className="mt-1">
            <h4 className="text-base text-custom-blue ArchivoBold">
            Ingrédients – <span className="text-mockup-blue">leurs origines</span>
            </h4>
            {origin.map((item, index) => (
              <div key={index} className="mt-2">
                <h4 className="text-base text-custom-blue ArchivoBold leading-tight">
                  {item.ingredient} -{" "}
                  <span className="text-mockup-blue">{item.origin}</span>
                </h4>
                <p className="text-sm text-mockup-green Archivo leading-tight">
                  Commentaire
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm text-mockup-green Archivo leading-tight">
            Commentaire général ingrédients
          </p>
          <div className="mt-1">
            <h4 className="text-base text-custom-blue ArchivoBold">
            3 matières premières principales – <span className="text-mockup-blue">leurs origines</span>
            </h4>
            {matieres.map((item, index) => (
              <div key={index} className="mt-2">
                <h4 className="text-base text-custom-blue ArchivoBold leading-tight">
                  {item.ingredient} -{" "}
                  <span className="text-mockup-blue">{item.origin}</span>
                </h4>
                <p className="text-sm text-mockup-green Archivo leading-tight">
                  Commentaire
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm text-mockup-green Archivo leading-tight">
            Commentaire général MP
          </p>
        </div>
        <img
          src={FICHETOP}
          className="w-12 absolute bottom-0 right-0 cursor-pointer"
          onClick={() => togglePanel(4)}
          alt="Toggle Panel"
        />
      </div>
    </div>
  );
}

export default OriginsInfo;
