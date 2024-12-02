import React from "react";
import FAQBackground from "../../../assets/home/FAQ_background.png";
import FAQItem from "./FAQItem";
import useFAQ from "../../../hooks/useFAQ"; // Import du hook personnalisé
import LoadingStateFag from "./LoadingStateFag"; // Import du composant de chargement
import {EmptyStateFaq} from "./EmptyStateFaq";
import {ErrorState} from "../../ui/ErrorState"
const FAQComponent = () => {
  const { faqs, loading, error } = useFAQ(); // Utilisation du hook

  return (
    <div className="details h-full w-full">
      {/* Header Section */}
      <div className="h-[15%]">
        <div
          className="flex flex-col items-center justify-center h-5/6 max-h-28"
          style={{
            backgroundImage: `url(${FAQBackground})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        >
          <h2 className="h-1/6 text-center text-custom-blue text-3xl titre-bold flex items-center justify-center w-full z-10">
            Foire aux&nbsp;questions
          </h2>
        </div>
      </div>
  
      {/* FAQ List Section */}
      <div className="flex flex-col h-[85%]">
        <div className="flex flex-col h-full w-full bg-white overflow-auto">
        {loading && <LoadingStateFag />}
        {error && !loading && <ErrorState message={error} />}
        {!loading && !error && faqs.length === 0 && <EmptyStateFaq />}
        {!loading &&
          !error &&
          faqs.length > 0 &&
          faqs.map((faq, index) => (
            <FAQItem
              key={faq.id || index} // Utiliser `faq.id` si disponible
              question={faq.question}
              answer={faq.answer}
              index={index}
              length={faqs.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default FAQComponent;
