import React from "react";
import indicateur from "../../assets/fb/indicateur.svg";
import indicateur100 from "../../assets/fb/indicateur100.svg";
import scaleImage from "../../assets/fb/scale-image.svg";


const TransparencyInfo = () => {
  const positions = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const getIndicatorStyle = (index) => {
    const baseSize = 50;
    const growthFactor = 5;
    const size = baseSize + index * growthFactor;

    // Calculate vertical translation based on position
    const baseTranslate = 10; // Base translation percentage
    const translateYOffset = index * 6; // Increase offset by 5% for each position

    return {
      width: `${size}%`,
      maxWidth: `${30 + index * 5}px`,
      transform: `translate(-50%, -${baseTranslate + translateYOffset}%)`,
    };
  };

  const getIndicatorImage = (index) => {
    return index === 9 ? indicateur100 : indicateur;
  };

  return (
    <div className="details h-full w-full">
   
        <div className="w-full flex items-center justify-center relative px-4 ">
        <img
          src={scaleImage}
          alt="Transparency scale"
          className="w-full h-auto"
        />
        <div className="absolute inset-0 flex justify-between">
          {positions.slice(0, -1).map((_, index) => (
            <div key={index} className="flex-1 cursor-pointer relative">
              {4 === index && (
                <img
                  src={getIndicatorImage(index)}
                  alt="Indicator"
                  className="absolute top-2/3 left-2/4 cursor-pointer transition-all duration-300 ease-in-out"
                  style={getIndicatorStyle(index)}
                />
              )}
            </div>
          ))}
        </div>
      
      </div>
      <div className="p-4 flex flex-col items-center space-y-4">
        <h3 className="background_titre text-lg text-custom-blue ArchivoBold py-4 mt-4 px-6 ">
          L’échelle de transparence <span className="pallybold leading-archivo">Ti<span className="tracking-tightest leading-archivo">CO</span></span>
        </h3>
        <div className="Archivo text-custom-blue">
          La transparence <span className="pallybold leading-archivo">Ti<span className="tracking-tightest leading-archivo">CO</span></span> est le fruit de recherches en matière
          d’information. Nous avons étudié les thématiques essentielles et les
          référentiels existants avec des experts pour sélectionner les plus
          qualitatifs sur le plan scientifique.
        </div>
        <div className="Archivo text-custom-blue">
          Les évaluations et les informations demandent plus ou moins d’effort
          aux marques, c’est pourquoi notre notation de la transparence se fait
          fonction de notre grille d’évaluation qui récompense l’investissement
          et l’engagement fourni par les marques.
        </div>
        <h3 className="text-lg text-custom-blue ArchivoBold py-4 px-6 background_titre">
          Notre Grille d’évaluation
        </h3>
        <div className="Archivo text-custom-blue flex flex-col items-start justify-start w-full space-y-2">
          <h3 className="text-lg text-custom-blue ArchivoBold">
            Le produit et la Marque
          </h3>
          <div className="text-[#42a29a] pb-2 Archivo">
            Parce qu’on aime bien savoir à qui on a à faire&nbsp;!
          </div>
          <div className="flex flex-row w-full justify-around">
            <div className="max-w-[70%]">
              Complétude et validation des données
            </div>{" "}
            <div className="background_plus px-2 py-3">+1</div>
          </div>
        </div>
        <div className="Archivo text-custom-blue flex flex-col items-start justify-start w-full space-y-2">
          <h3 className="text-lg text-custom-blue ArchivoBold">
            L’impact santé
          </h3>
          <div className="text-[#42a29a] pb-2">
            Parce que nous voulons tous le meilleur pour nous et nos enfants
          </div>
          <div className="flex flex-row w-full justify-around">
            <div className="max-w-[70%]">
              Profil nutritionnel avec le Nutri-Score
            </div>{" "}
            <div className="background_plus px-2 py-3">+1</div>
          </div>
          <div className="flex flex-row w-full justify-around">
            <div className="max-w-[70%]">
              Décryptage Nutri-Score et Ti’conseil pour une utilisation optimale
            </div>{" "}
            <div className="background_plus px-2 py-3">+1</div>
          </div>
          <div className="flex flex-row w-full justify-around">
            <div className="max-w-[70%]">
              Naturalité des ingrédients avec le cahier des charges Goûm
            </div>{" "}
            <div className="background_plus px-2 py-3">+1</div>
          </div>
        </div>
        <div className="Archivo text-custom-blue flex flex-col items-start justify-start w-full space-y-2">
          <h3 className="text-lg text-custom-blue ArchivoBold">
            L’impact environnemental
          </h3>
          <div className="text-[#42a29a] pb-2 Archivo">
            Parce qu’on ne veut pas être les derniers êtres humains à fouler le
            sol de notre belle planète
          </div>
          <div className="flex flex-col w-full justify-around space-y-2">
            <div className="Archivo">Évaluation Planet score :</div>
            <div className="flex flex-row w-full justify-around items-center">
              <div>
                <ul className="list-inside">
                  <li>Biodiversité</li>
                  <li>Pesticide</li>
                  <li>Climat</li>
                  <li>Bien-être animal</li>
                </ul>
              </div>
              <div className="background_plus px-2 py-3">+2</div>
            </div>
          </div>
        </div>
        <div className="Archivo text-custom-blue flex flex-col items-start justify-start w-full space-y-2">
          <h3 className="text-lg text-custom-blue ArchivoBold">Les origines</h3>
          <div className="text-[#42a29a] pb-2 Archivo">
            Parce qu’on préfère soutenir nos producteurs et qu’on veut le
            meilleur
          </div>
          <div className="flex flex-row w-full justify-around">
            <div className="w-[70%]">
              Soit certifications par des cahiers des charges spécialisés
            </div>{" "}
            <div className="background_plus px-2 py-3">+2</div>
          </div>
          <div className="flex flex-col justify-end items-end w-full px-4">
            Ou
          </div>

          <div className="flex flex-row w-full justify-around">
            <div className="w-[70%]">Soit décryptage <span className="pallybold leading-archivo">Ti<span className="tracking-tightest leading-archivo">CO</span></span></div> <div className="background_plus px-2 py-3">+3</div>
          </div>
        </div>
        <div className="Archivo text-custom-blue flex flex-col items-start justify-start w-full space-y-2">
          <h3 className="text-lg text-custom-blue ArchivoBold">
            Labels et mentions
          </h3>
          <div className="text-[#42a29a] pb-2 Archivo">
            Parce qu’on se pose beaucoup de questions sur les labels et tout ce
            qui est dit sur le produit
          </div>
          <div className="flex flex-row w-full justify-around">
            <div className="w-[70%]">Décryptage <span className="pallybold leading-archivo">Ti<span className="tracking-tightest leading-archivo">CO</span></span></div> <div className="background_plus px-2 py-3">+1</div>
          </div>
        </div>
        <div className="ArchivoItalic py-16 text-custom-blue">
          Nous nous n’avons pas pu intégrer l’information sur la juste
          rémunération des producteurs car, malgré le fait que ce soit une
          information essentielle, il n’existe aucun référentiel satisfaisant
          capable de juger de cet élément à ce jour, mais nous travaillons avec
          nos partenaires pour&nbsp;en&nbsp;créer&nbsp;un&nbsp;!
        </div>
      </div>
    </div>
  );
};

export default TransparencyInfo;
