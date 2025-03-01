import { IonIcon } from "@ionic/react";
import { bookmarkOutline } from "ionicons/icons";

const EmptyLater = ({
  icon = bookmarkOutline,
  title,
  description,
  iconColor = "text-custom-green-background", 
  iconSize = "h-16",
  textColor = "text-custom-green-text",
  descriptionColor = "text-custom-blue"
}) => (
  <div className="flex flex-col items-center py-4 text-center space-y-3 w-full">
    <IonIcon
      icon={icon}
      className={`w-full ${iconSize} ${iconColor} mb-2`}
    />
    <h3 className={`text-xl font-semibold ${textColor} mb-1 ArchivoBold w-full`}>
      {title}
    </h3>
    <p className={`${descriptionColor} ArchivoItalic leading-archivo`}>
      {description}
    </p>
  </div>
);

export default EmptyLater;
