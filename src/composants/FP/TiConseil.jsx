import React from "react";
import ticonseil from "../../assets/fb/ticonseil.svg";

function TiConseil() {
  const TiConseils = [
    {
      title: "Notre ti’conseil",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus hendrerit, est eu auctor vehicula, augue ligula scelerisque erat, vel accumsan erat ipsum vitae dui.",
    },
  ];

  return (
    <div className="w-full flex relative">
        {/* Content box */}
        <div className="bg-[#fff9e6] rounded-e-full w-[95%] px-4 py-10 left-0 relative">
          {/* Icon */}
          <img
            src={ticonseil}
            alt="Ti'Conseil icon"
            className="absolute left-3 top-[-2rem] w-20 h-20"
          />
          <div className="ml-11">
            {TiConseils.map((item, index) => (
              <div key={index} className="text-[#2b4b73] w-[95%]">
                <p className="text-sm">
                  <span className="font-bold text-md">{item.title} :</span>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}

export default TiConseil;
