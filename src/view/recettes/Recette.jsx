import React from "react";
import recetteBg from "../../assets/recettes/recetteBg.svg";

function Recette({ recette }) {
  const item = {
    id: "1",
    title: "Spaghetti à la Bolognaise",
    subTitle: "Un ti'plaisir",
    preparation: 30,
    cuisson: 30,
    image:
      "https://img.cuisineaz.com/660x660/2016/07/29/i84653-spaghettis-bolognaise-rapides.jpg",
      "types": [
        "Entrée",
        "Plat",
        "Boisson"
    ],
    difficulty: "Moyen",
    filters: [
        "Végan",
        "Sans gluten",
        "Végétarien"
    ],
    prep_time: "60",
    cook_time: "30",
    rest_time: "10",
    ingredients: [
      {
        name: "pâtes",
        quantity: 500,
        unit: "g"
      },
      {
        name: "pulpe de tomate",
        quantity: 20,
        unit: "g"
      },
      {
        name: "huile d'olive",
        quantity: 1,
        unit: "cuillère"
      },
      {
        name: "bœuf haché",
        quantity: 300,
        unit: "g"
      },
      {
        name: "carotte",
        quantity: 1,
        unit: null
      },
      {
        name: "sel",
        quantity: null,
        unit: null
      }
    ],
    steps: [
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
      "Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
      "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.",
      "Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat."
    ]
  };

  return (
    <div className="bg-custom-red-bg-clear">
      <div
        className="w-full aspect-square flex items-center justify-center bg-no-repeat bg-contain bg-center relative"
        style={{
          backgroundImage: `url(${recetteBg})`,
        }}
      >
        <div className="flex flex-col justify-center items-center space-y-6">
          <h2 className="text-center text-custom-red text-2xl titre-bold ">
          {item.title}
          </h2>
          {/* Image de la recette */}
          <img
            src={item.image}
            alt={item.title}
            className="w-2/4 h-auto rounded-2xl border-custom-red border-2 object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Recette;
