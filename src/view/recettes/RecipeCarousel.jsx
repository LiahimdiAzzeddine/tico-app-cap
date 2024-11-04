import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const RecipeCarousel = ({ recipes }) => {
  return (
    <Swiper
      slidesPerView={1.6}
    >
      {recipes.map((recipe, index) => (
        <SwiperSlide key={index} >
          <div className="w-full h-full rounded-xl overflow-hidden p-4">
            <div className="relative w-full pt-[85%] overflow-hidden rounded-3xl border-2 border-custom-green">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="absolute top-0 left-0 w-full h-full object-cover "
              />
            </div>
            <div className="mt-1 text-start">
              <h3 className="text-base font-semibold text-green-800">
                {recipe.title}
              </h3>
              <p className="text-sm italic text-green-600">
                {recipe.subtitle}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RecipeCarousel;
