import React from "react";
import SimpleLyout from "../composants/layout/SimpleLyout";
import VF from "../assets/history/vf.svg";
import { IonButton, useIonRouter, IonSpinner } from "@ionic/react";
import GreenLineWithPoint from "../composants/demandes/positionPointByValue";
import { useParams } from "react-router-dom";
import useDemandeDetails from "../hooks/auth/useDemandeDetails";
import { Share } from "@capacitor/share";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Demande = () => {
  const history = useIonRouter();
  const { id } = useParams();
  const { demande, loading, error } = useDemandeDetails(id);

  const demandesCount = demande?.same_gtin_count || 0;
  const handleShare = async () => {
    if (!demande) return;

    const message = `J’ai découvert une appli pour obliger les marques à dire toute la vérité sur les produits alimentaires !

J’ai sollicité la marque ${demande.marque ?? "XXXXX"}, c’est hyper simple, il suffit de scanner les codes-barres et d’un clic tu peux demander aux marques de dévoiler toutes les infos sur leurs produits. Plus on demande, plus elles sont obligées de répondre !

À toi de jouer 😉`;

    await Share.share({
      title: "Rejoins-moi sur l'app TiCO ✊🌱",
      text: message,
      url: `${backendUrl}/tico/fp/${demande.gtin}`,
      dialogTitle: "Partager cette demande",
    });
  };

  return (
    <SimpleLyout
      Close={() => {
        history.goBack();
      }}
      image={VF}
    >
      <div className="p-4 details flex flex-col h-full">
        {/* Titre avec fond */}
        <div className="relative flex justify-center items-center mb-4 backgroundHistorique min-h-[90px]">
          <div className="absolute rounded-full w-[230px] "></div>
          <h2 className="text-center text-custom-green-text text-[1.7rem] titre-bold z-10">
            Suivi&nbsp;de&nbsp;mes&nbsp;demandes
          </h2>
        </div>

        {/* Contenu principal */}
        <div className="flex-grow overflow-y-auto flex flex-col justify-center items-center gap-6 text-center">
          {loading ? (
            <IonSpinner name="dots" className="text-custom-green-text" />
          ) : error ? (
            <div className="text-red-500">Une erreur est survenue.</div>
          ) : !demande ? (
            <div className="text-red-500">Aucune demande trouvée.</div>
          ) : (
            <>
              {/* Nombre de demandes */}
              <div className="text-custom-green-text text-lg Archivo">
                {demandesCount} demande{demandesCount > 1 ? "s" : ""} sur ce produit
              </div>

              {/* Illustration avec images */}
              <div className="flex items-center space-x-2">
                <GreenLineWithPoint demandesCount={800} />
              </div>

              {/* Objectif 1000 demandes */}
              <div className="text-custom-green-text text-xl ArchivoExtraBold">
                Objectif 1000 demandes
              </div>
              <div className="text-custom-green-text text-base leading-relaxed Archivo px-4">
                À partir de <b>50 demandes</b>, nous entrons en contact avec les marques.<br />
                À partir de <b>1000 demandes</b>, elles n’ont plus le choix, elles doivent agir.
              </div>

              {/* Message d’invitation */}
              <div className="text-custom-blue text-lg italic Archivo">
                Pour plus d’impact, invitez votre entourage à solliciter cette marque.
              </div>

              {/* Bouton d'envoi */}
              <IonButton
                fill="clear"
                onClick={handleShare}
                className="bg-[#4E986D] ArchivoBold text-white text-lg py-2 px-8 rounded-xl !normal-case"
              >
                Envoyer
              </IonButton>
            </>
          )}
        </div>
      </div>
    </SimpleLyout>
  );
};

export default React.memo(Demande);
