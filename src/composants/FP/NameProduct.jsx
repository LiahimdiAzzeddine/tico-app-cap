import React,{useState} from "react";

function NameProduct(props) {
  const [isZoomed, setIsZoomed] = useState(false);
 
  const handleZoom = () => {
    setIsZoomed(true);
  };

  const closeZoom = () => {
    setIsZoomed(false);
  };

  return (
    <div>
    <div className="flex flex-row justify-center py-1 px-4 space-x-4">
      {/* Ajout de l'image */}
      <img
        src={props.ImageSrc}
        alt={`${props.Name} - ${props.Brand}`}
        className="w-28 h-auto object-cover cursor-pointer"
            onClick={handleZoom}
      />
     
      <div className="flex flex-col justify-around space-y-1">
      <h3 className="text-xl titre-roboto-bold text-[#0f548d] Archivo">
        {props.Name}
      </h3>
      <div className="text-sm text-[#42a29a]">{props.Brand}</div>
      <div className="text-sm text-[#42a29a] font-bold ArchivoBoldItalique">Produit {(Number(props.Transparent)+1)*10}% transparent !</div>
      </div>
      
    </div>
     {/* Modal Fullscreen View */}
     <div className="relative">
     {isZoomed && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
            {/* Close Button */}
            <button
              onClick={closeZoom}
              className="absolute top-4 right-4 text-white text-2xl font-bold focus:outline-none"
            >
              &times;
            </button>
            {/* Fullscreen Image */}
            <img
              src={props.ImageSrc}
              alt="Zoomed Tomato Concentrate Tube"
              className="w-full h-auto max-h-full object-contain"
            />
          </div>
        )}</div>
    </div>
  );
}

export default NameProduct;
