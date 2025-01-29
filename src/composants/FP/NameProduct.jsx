import React, { useState } from "react";
import { IonModal, IonContent, IonButton, IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import productDeffaultImg from "../../assets/history/64.png";

function NameProduct(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-row justify-center px-4 space-x-10">
        <div className="max-w-28 max-h-32 w-auto h-auto flex flex-col justify-center items-center">
          <img
            src={props.ImageSrc ? props.ImageSrc : productDeffaultImg}
            alt={`${props.Name} - ${props.Brand}`}
            className="max-w-28 max-h-32 w-auto h-auto object-cover cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        </div>

        <div className="flex flex-col justify-around space-y-1">
          <div>
            <span className="text-xl titre-roboto-bold text-[#0f548d] ArchivoBold leading-archivo">
              {props.Name}
            </span>
            <br />
            <span className="text-sm text-[#42a29a] leading-archivo ArchivoBold">
              {props.Brand}
            </span>
          </div>

          <div className="text-sm text-[#42a29a] font-bold">
            <span className="ArchivoBoldItalique">
              {(Number(props.Transparent)) * 10}% de transparence
            </span>
            <span className="pallybold leading-archivo">
              Ti<span className="tracking-tightest leading-archivo">CO</span>
            </span>{" "}
            {Number(props.Transparent) === 9 ? "!" : ""}
          </div>
        </div>
      </div>

      {/* Modal Fullscreen avec Ionic */}
      <IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
  <IonContent className="bg-black flex items-center justify-center h-screen">
    <div className="flex flex-col items-center justify-center h-full w-full">
      <IonButton
        fill="clear"
        className="absolute top-4 right-4 text-custom-blue text-2xl z-50"
        onClick={() => setIsOpen(false)}
      >
        <IonIcon icon={closeOutline} />
      </IonButton>
      <img
        src={props.ImageSrc ? props.ImageSrc : productDeffaultImg}
        alt="Zoomed Image"
        className="w-auto max-w-full max-h-[90vh] object-contain"
      />
    </div>
  </IonContent>
</IonModal>

    </div>
  );
}

export default NameProduct;
