import React from 'react';
import Nutri_score_A from "../../assets/fb/score/Nutri_score_A.png";
import Nutri_score_B from "../../assets/fb/score/Nutri-score-B.png";
import Nutri_score_C from "../../assets/fb/score/Nutri-score-C.png";
import Nutri_score_D from "../../assets/fb/score/Nutri-score-D.png";
import Nutri_score_E from "../../assets/fb/score/Nutri-score-E.png";
import Background from "../../assets/fb/titreBg.svg";

function NutritionContent({nutriscore}) {
    const nutriscoreImages = {
        A: Nutri_score_A,
        B: Nutri_score_B,
        C: Nutri_score_C,
        D: Nutri_score_D,
        E: Nutri_score_E,
    };

    // Example placeholder for nutriscore; you should replace this with actual product data

    const selectedNutriscoreImage = nutriscoreImages[nutriscore] || Nutri_score_B;

    return (
        <div className='p-4 flex flex-col justify-center items-center'>
            <div className='mb-4 flex justify-center'>
                <img className='w-2/3' src={selectedNutriscoreImage} alt='Nutri-Score' />
            </div>
            <div className='text-start'>
                <p className='text-lg mt-2 text-custom-green-text'>
                    Le Nutri-Score est une note qui vous permet d’avoir une information sur la qualité
                    nutritionnelle d’un coup d’œil. Il vous permet de comparer les produits d’une même catégorie.
                    Le Nutri-Score est à considérer dans le cadre d’une alimentation variée, tout est question
                    d’équilibre.
                </p>
                <p className='text-lg mt-4 text-custom-green-text'>
                    Les produits classés B sont de bons choix pour votre alimentation. Ils contiennent un bon mix de
                    nutriments, avec parfois un peu plus de graisses, sucres ou sel que les produits notés A et un
                    peu moins que les produits notés C.
                </p>
                <p className='text-lg mt-4 text-custom-green-text'>
                    Il est important de regarder également le degré de transformation du produit.
                </p>
            </div>
            <div className='absolute -z-10 bottom-1/4'>
                <img src={Background} className='w-full' alt='Background' />
            </div>
        </div>
    );
}

export default NutritionContent;
