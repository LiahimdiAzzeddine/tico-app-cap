import  React,{ useState,useRef } from "react";
import TransparencyScale from "./TransparencyScale";
import NameProduct from "./NameProduct";
import ProductDetailsAccordion from "./ProductDetailsAccordion";
import Recettes from "./Recettes";
import InfoSection from "./InfoSection";

const FicheProduit = (props) => {
  const [currentPosition, setCurrentPosition] = useState(props.productData?.transparency_scale);
  const [openPanel, setOpenPanel] = useState(null);
  const targetRefNutriInfo = useRef(null);
  const targetRefRecettes = useRef(null);
  const targetRefAdditifs = useRef(null);
  const containerRef = useRef(null);

  const scrollToTargetById  =  (containerRef, id) => {
    if (containerRef?.current) {
      const targetElement = containerRef.current.querySelector(`#${id}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        console.error(`Element with ID "${id}" not found inside the container!`);
      }
    } else {
      console.error("Container reference is null or undefined.");
    }
  };


  const scrollToTarget = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

 const togglePanel = (panel) => {
    setOpenPanel(openPanel === panel ? null : panel);
  };
  return (
    <div className="max-w-screen-sm m-auto">
      <div className="flex flex-col h-full bg-white" >
        {/* Scrollable Outlet Content */}
        <div className="flex-grow overflow-y-auto">
          <div className="flex flex-col space-y-6">
            <TransparencyScale
              currentPosition={currentPosition}
              setCurrentPosition={setCurrentPosition}
            />
             
            <NameProduct
              Name={props.productData?.name}
              Brand={props.productData?.trademark}
              Transparent={props.productData?.transparency_scale}
              ImageSrc={props.productData?.image}
            />
            <InfoSection
            product={props.productData}
            togglePanel={togglePanel}
            scrollToTarget={scrollToTarget}
            scrollToTargetById={scrollToTargetById}
            targetRefNutriInfo={targetRefNutriInfo}
            targetRefRecettes={targetRefRecettes}
            targetRefAdditifs={targetRefAdditifs}
            />
            <ProductDetailsAccordion product={props.productData} togglePanel={togglePanel} openPanel={openPanel} targetRefNutriInfo={targetRefNutriInfo}  targetRefAdditifs={targetRefAdditifs} scrollToTarget={scrollToTarget}/>
            <Recettes recettes={props.productData.recipes} targetRefRecettes={targetRefRecettes} />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default FicheProduit;
