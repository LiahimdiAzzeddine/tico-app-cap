import React from 'react';
import titreBg from "../../assets/fb/titreBg.svg";
import pictoNutrition from "../../assets/fb/pictoNutrition.png";
import pastilleNoteA from "../../assets/fb/pastille-note-a.svg";
import pastilleNoteB from "../../assets/fb/pastille-note-b.svg";
import pastilleNoteC from "../../assets/fb/pastille-note-c.svg";
import pastilleNoteD from "../../assets/fb/pastille-note-d.svg";
import pastilleNoteE from "../../assets/fb/pastille-note-e.svg";
import { chevronForwardOutline} from "ionicons/icons";
import { IonIcon } from '@ionic/react';

const InfoSection = () => {
  return (
    <div className="w-full p-3 mx-auto">
      <div className="grid grid-cols-2 divide-p divide-custom-green-divider">
        {/* Nutrition Section */}
        <div className='pb-3 pr-3' >
          <div className="text-xl font-semibold text-custom-blue bg-no-repeat bg-contain h-8 flex flex-row items-end relative"
           style={{
             backgroundImage: `url(${titreBg})`,
           }}
          ><div className='w-4'></div>Nutrition</div>
          <div className="flex flex-row items-center justify-between  mt-2 px-1">
            <img src={pictoNutrition} className='w-12 h-auto'/>
            <div className=" text-white font-bold text-xl rounded-full min-w-12 min-h-12 flex items-center justify-center bg-contain bg-no-repeat"
            style={{
              backgroundImage: `url(${pastilleNoteB})`,
              backgroundPosition:"center"
            }}
            >
              B
            </div>
            <IonIcon className='text-2xl' icon={chevronForwardOutline} />
          </div>
        </div>

        {/* Additifs Section */}
        <div className="pl-3 pb-3 border-l border-custom-green-divider">
          <div className="text-xl font-semibold text-custom-blue bg-no-repeat bg-contain h-8 flex flex-row items-end relative"
           style={{
             backgroundImage: `url(${titreBg})`,
           }}
          ><div className='w-4'></div>Additifs</div>
          <div className="text-gray-700 mt-2 px-2">Contient 2 additifs</div>
        </div>

        {/* Transformation Section */}
        <div className="py-3 pr-3 col-span-2 border-t border-custom-green-divider">
        <div className="text-xl font-semibold text-custom-blue bg-no-repeat bg-contain h-8 flex flex-row items-end relative"
           style={{
             backgroundImage: `url(${titreBg})`,
           }}
          ><div className='w-4'></div>Transformation</div>
          <div className="text-gray-500 mt-2 px-2">
            Pas encore renseignée
            <br />
            sollicitez la marque pour plus de transparence
          </div>
        </div>

        {/* Origines Section */}
        <div className="py-3 pr-3 col-span-2 border-t border-custom-green-divider">
        <div className="text-xl font-semibold text-custom-blue bg-no-repeat bg-contain h-8 flex flex-row items-end relative"
           style={{
             backgroundImage: `url(${titreBg})`,
           }}
          ><div className='w-4'></div>Origines</div>
          <div className="text-gray-500 mt-2 px-2">
            Pas encore renseignée
            <br />
            sollicitez la marque pour plus de transparence
          </div>
        </div>

        {/* Environnement Section */}
        <div className="py-3 pr-3 col-span-2 border-t border-custom-green-divider">
        <div className="text-xl font-semibold text-custom-blue bg-no-repeat bg-contain h-8 flex flex-row items-end relative"
           style={{
             backgroundImage: `url(${titreBg})`,
           }}
          ><div className='w-4'></div>Environnement</div>
          <div className="text-gray-500 mt-2 px-2">
            Pas encore renseignée
            <br />
            sollicitez la marque pour plus de transparence
          </div>
        </div>

        {/* Juste rémunération Section */}
        <div className="py-3 pr-3 col-span-2 border-t border-custom-green-divider">
        <div className="text-xl font-semibold text-custom-blue bg-no-repeat bg-contain h-8 flex flex-row items-end relative"
           style={{
             backgroundImage: `url(${titreBg})`,
           }}
          ><div className='w-3'></div>Juste rémunération</div>
          <div className="text-gray-500 mt-2 px-2">
            Pas encore renseignée
            <br />
            sollicitez la marque pour plus de transparence
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
