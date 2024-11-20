import React from 'react';
import { IonContent } from '@ionic/react';

const CGUConfidentialite = () => {
  return (

      <IonContent>
        <div className="max-w-3xl mx-auto px-2">
          <h1 className="text-2xl font-bold text-center text-custom-blue mb-6">
            Conditions Générales d'Utilisation & Politique de Confidentialité
          </h1>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-custom-blue mb-4">Conditions Générales d'Utilisation</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Ces Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation des services fournis par notre application. En utilisant ce service, vous acceptez les conditions suivantes :
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Le contenu fourni par notre application est destiné à un usage personnel uniquement.</li>
              <li>Il est interdit de reproduire, distribuer ou exploiter les contenus sans autorisation préalable.</li>
              <li>Nous nous réservons le droit de modifier les CGU à tout moment.</li>
            </ul>
          
          </section>

          <section>
            <h2 className="text-xl font-semibold text-custom-blue mb-4">Politique de Confidentialité</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              La protection de vos données personnelles est importante pour nous. Cette Politique de Confidentialité décrit comment nous collectons, utilisons et protégeons vos informations personnelles :
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Nous collectons uniquement les données nécessaires à la bonne gestion de notre service.</li>
              <li>Nous utilisons des mesures de sécurité pour protéger vos données personnelles contre tout accès non autorisé.</li>
              <li>Nous ne partageons pas vos données avec des tiers sans votre consentement, sauf lorsque la loi l'exige.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              En utilisant notre service, vous acceptez notre politique de confidentialité et le traitement de vos données conformément à celle-ci.
            </p>
          </section>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </IonContent>
  );
};

export default CGUConfidentialite;
