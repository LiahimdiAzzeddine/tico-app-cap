import React from 'react';
import Arachides from '../../../assets/fb/Allergenes/Arachides.svg';
import Celeri from '../../../assets/fb/Allergenes/Céleri.svg';
import Crustace from '../../../assets/fb/Allergenes/Crustacé.svg';
import Crustaces from '../../../assets/fb/Allergenes/Crustacés.svg';
import FruitsCoque from '../../../assets/fb/Allergenes/Fruits à coque.svg';
import Gluten from '../../../assets/fb/Allergenes/Gluten.svg';
import Lait from '../../../assets/fb/Allergenes/Lait.svg';
import Lupins from '../../../assets/fb/Allergenes/Lupins.svg';
import Moutarde from '../../../assets/fb/Allergenes/Moutarde.svg';
import Oeufs from '../../../assets/fb/Allergenes/Oeufs.svg';
import Poisson from '../../../assets/fb/Allergenes/Poisson.svg';
import Sesame from '../../../assets/fb/Allergenes/Sésame.svg';
import Soja from '../../../assets/fb/Allergenes/Soja.svg';
import Sulfites from '../../../assets/fb/Allergenes/Sulfites.svg';

const Allergenes = ({ allergenes = [] }) => {
  console.log("🚀 ~ Allergenes ~ allergenes:", allergenes)
  // Mapping allergens to images
  const allergenesImg = {
    Arachides: Arachides,
    Celeri: Celeri,
    Crustace: Crustace,
    Crustaces: Crustaces,
    FruitsCoque: FruitsCoque,
    Gluten: Gluten,
    Lait: Lait,
    Lupins: Lupins,
    Moutarde: Moutarde,
    Oeufs: Oeufs,
    Poisson: Poisson,
    Sesame: Sesame,
    Soja: Soja,
    Sulfites: Sulfites
  };

  return (
    <>
      <h1 className="text-xl text-custom-blue font-bold pt-3">
        <span className="marker-effect-cyan">Allergènes</span>
      </h1>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {allergenes.map((allergene, index) => (
          <div key={index} className="flex flex-col items-center justify-end">
            {allergenesImg[allergene] && (
              <img
                src={allergenesImg[allergene]}
                alt={`Allergène ${allergene}`}
                className="w-8 h-8"
              />
            )}
            <span className="text-sm text-gray-600 mt-1">{allergene}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Allergenes;