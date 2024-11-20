import React from "react";

const TipDetails = ({ tip }) => {
  const { id, title, image, details, createdAt } = tip;

  return (
    <div className="bg-white rounded-b-[2rem] pb-14">
      {/* Section d'en-tête avec titre et image */}
      <div className="bg-custom-blue-bg-clear px-6 pb-4 rounded-b-[2rem] space-y-6">
        <div
          className="w-full min-h-[30dvh] flex items-center justify-center bg-no-repeat bg-contain bg-center relative"
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <div className="flex flex-col justify-center items-center space-y-4">
            <h2 className="text-center text-custom-blue text-2xl titre-bold">
              {title}
            </h2>
            <img
              src={image}
              alt={title}
              className="w-1/2 h-auto rounded-2xl border-custom-blue border-2 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Section des détails */}
      <div className="px-6 mt-6">
        <h2 className="text-custom-blue text-2xl font-bold mb-3 titre-bold">
          Détails
        </h2>
        <p className="text-custom-blue text-base leading-relaxed">{details}</p>
      </div>

      {/* Section d'information complémentaire */}
      <div className="px-6 mt-6">
        <hr className="w-full border-t border-[#e0f4fc]" />
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600">ID : {id}</span>
          <span className="text-sm text-gray-600">Créé le : {createdAt}</span>
        </div>
      </div>
    </div>
  );
};

export default TipDetails;
