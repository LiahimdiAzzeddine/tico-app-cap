import React from "react";
import FAQBackground from "../../assets/home/FAQ_background.png";
import Item from "./item";

const History = () => {
  const products = [
    {
      image: "https://www.gourmet-versand.com/img_article_v3/103450-confiture-de-petit-dejeuner-anglais-confiture-dorange-charpentier-et-majordome.jpg",
      title: "Pâte à tartiner Biscoff",
      brand: "Lotus",
    },
    {
      image: "https://www.gourmet-versand.com/img_article_v3/103450-confiture-de-petit-dejeuner-anglais-confiture-dorange-charpentier-et-majordome.jpg",
      title: "Pâte à tartiner Biscoff",
      brand: "Lotus",
    },
    {
        image: "https://www.gourmet-versand.com/img_article_v3/103450-confiture-de-petit-dejeuner-anglais-confiture-dorange-charpentier-et-majordome.jpg",
        title: "Pâte à tartiner Biscoff",
        brand: "Lotus",
      },
      {
        image: "https://www.gourmet-versand.com/img_article_v3/103450-confiture-de-petit-dejeuner-anglais-confiture-dorange-charpentier-et-majordome.jpg",
        title: "Pâte à tartiner Biscoff",
        brand: "Lotus",
      },
  ];

  return (
    <div className="p-2 details">
      <div
        className="flex flex-col items-center justify-center min-h-[10vh]"
        style={{
          backgroundImage: `url(${FAQBackground})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      >
        <h2 className="text-center text-custom-blue text-2xl titre-bold ">
        Mon&nbsp; 
          <span className="underline underline-offset-4 decoration-orange-400"> historique</span>
          &nbsp;de scan
        </h2>
      </div>

    
      <div className="mt-12">
      {products.map((product, index) => (
          <Item product={product} index={index} length={products.length} key={index} />
        ))}
      </div>
    </div>
  );
};

export default History;
