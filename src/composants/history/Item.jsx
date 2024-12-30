import { motion } from "framer-motion";
import {
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonItem,
  IonIcon,
} from "@ionic/react";
import { trashBinOutline, eyeOutline } from "ionicons/icons";
import produitFleche from "../../assets/history/productFlech.svg";
import image64 from "../../assets/history/64.png";

const defaultImage = image64;

const Item = ({ product, index, OpenFb, handleDelete }) => {
  if (!product) return null;

  return (
    <IonItemSliding key={index}>
      {/* Contenu principal de l'élément */}
      <IonItem
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          "--inner-padding-end": "0",
          "--padding-start": "0",
          "--inner-border-width": "0 0 1.5px 0",
          "--border-color": "#4b996c",
        }} // S'assure que l'élément occupe toute la largeur
      >
        <motion.div
          className="flex items-center py-3 w-full"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          drag="x" // Enable horizontal drag
          dragConstraints={{ left: 0, right: 0 }} // Constrain the drag movement horizontally
          whileTap={{ scale: 0.98 }} // Slightly scale down the item when tapped
          onClick={() => OpenFb(product)}
        >
          {/* Image du produit */}
          <div
            className="w-16 h-16 mr-4 rounded flex flex-col justify-center items-center bg-no-repeat bg-contain bg-center productBg"
          >
            <img
              src={product.image || defaultImage}
              alt={product.name}
              
              className="w-auto h-14 rounded object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultImage;
              }}
            />
          </div>

          {/* Détails du produit */}
          <div className="flex-1 flex flex-col">
            <div className="font-bold text-custom-green-text ArchivoExtraBold leading-archivo">
              {product.name}
            </div>
            <span className="text-custom-green-text text-sm ArchivoLight leading-archivo italic">{product.trademark}</span>
          </div>

          {/* Bouton flèche */}
          <button onClick={() => OpenFb(product)}>
            <img
              src={produitFleche}
              alt="flèche"
              className="w-10 h-10 "
            />
          </button>
        </motion.div>
      </IonItem>

      {/* Options de balayage */}
      <IonItemOptions side="start">
        <IonItemOption style={{ "--background": "#c42923" }} onClick={() => handleDelete(product.gtin)}>
          <IonIcon slot="icon-only" icon={trashBinOutline} />
        </IonItemOption>
      </IonItemOptions>

      <IonItemOptions side="end">
        <IonItemOption style={{ "--background": "#4b996c" }} onClick={() => OpenFb(product)}>
          <IonIcon slot="icon-only" icon={eyeOutline} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default Item;
