import React from "react";
import FAQBackground from "../../../assets/home/FAQ_background.png";
import FAQItem from "./FAQItem";

const FAQComponent = () => {
  const faqs = [
    {
      question: "Qu'est-ce que TiCO et comment fonctionne l'application ?",
      answer: "TiCO est une application qui... (explication détaillée)",
    },
    {
      question: "Comment scanner un produit avec TiCO ?",
      answer:
        "Pour scanner un produit avec TiCO, suivez ces étapes : 1... 2... 3...",
    },
    {
      question: "Quels types de produits puis-je scanner avec TiCO ?",
      answer: "TiCO peut scanner une large gamme de produits, incluant...",
    },
    {
      question: "Comment puis-je partager mes découvertes TiCO avec mes amis ?",
      answer:
        "Vous pouvez partager vos découvertes en utilisant la fonction de partage dans l'app...",
    },
    {
      question: "TiCO est-il disponible dans mon pays ?",
      answer: "TiCO est actuellement disponible dans les pays suivants : ...",
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
        <h2 className="text-center text-[#006aff] text-2xl titre-bold ">
          Foire aux
          <span className="underline underline-offset-4 decoration-orange-400"> questions</span>
        </h2>
      </div>

      <div className="mt-6">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQComponent;
