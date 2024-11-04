import React, { useState } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import background from "../../assets/home/background2.png";
import hands from "../../assets/home/hands.png";
import RecipeCarousel from "../recettes/RecipeCarousel";

const HomePage = () => {
  const isAuthenticated = useIsAuthenticated();
  const [selectedFilter, setSelectedFilter] = useState("Nos dernières recettes");
  const sampleRecipes = [
    {
      title: "Spaghetti à la Bolognaise",
      subtitle: "Un ti plaisir",
      image: "https://homeisakitchen.com/wp-content/uploads/2021/03/4fcdf-man-fuel-food-blog-macarona-bechamel-recipe-pastitso-pasta-cooling.jpg",
    },
    {
      title: "Lasagnes Maison",
      subtitle: "Recette traditionnelle",
      image: "https://falasteenifoodie.com/wp-content/uploads/2023/01/Macarona-Bil-Bechamel.jpeg",
    },
    {
      title: "Spaghetti à la Bolognaise",
      subtitle: "Un ti plaisir",
      image: "https://homeisakitchen.com/wp-content/uploads/2021/03/4fcdf-man-fuel-food-blog-macarona-bechamel-recipe-pastitso-pasta-cooling.jpg",
    },
    {
      title: "Lasagnes Maison",
      subtitle: "Recette traditionnelle",
      image: "https://falasteenifoodie.com/wp-content/uploads/2023/01/Macarona-Bil-Bechamel.jpeg",
    },
  ];
  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };
  return (
    <div className="flex flex-col h-full space-y-2">
      <div className="grow-[3]">
        <div
          className="w-full h-[23vh] flex flex-col justify-end items-center"
          style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        >
          <div className="flex flex-col justify-around items-end h-3/4">
            <h1 className="text-2xl titre-bold text-[#4b996c] ">
              Bonjour Tico13 !
            </h1>
            <img className="w-48 " src={hands} />
          </div>
        </div>
      </div>
      {/* Center Section: Buttons */}
      <div className="flex justify-start flex-wrap gap-2 px-4">

        {[
          "Nos dernières recettes",
          "Nos ti'conseils",
          "Derniers produits décryptés",
          "Mon historique de scan",
        ].map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => handleFilterClick(filter)}
            className={`border-solid border-[1px] border-custom-green px-3 py-1 rounded-full ${
              selectedFilter === filter
                ? "bg-custom-green text-white "
                : "border-custom-green text-custom-green"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grow-[3]">
        <RecipeCarousel recipes={sampleRecipes} />
      </div>
    
    </div>
  );
};

export default HomePage;
