import { Seo } from '@/components/seo';
import { Card } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <>
      <Seo
        title="Politique de confidentialité - WriteMyPost.pro"
        description="Notre politique de confidentialité détaille comment nous protégeons vos données et respectons votre vie privée."
      />
      
      <div className="container mx-auto py-8">
        <Card className="p-8">
          <h1 className="text-4xl font-bold mb-8">Politique de confidentialité</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Collecte des données</h2>
              <p>Nous collectons uniquement les données nécessaires au bon fonctionnement de nos services:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Informations de compte (email, nom)</li>
                <li>Images téléchargées pour analyse</li>
                <li>Préférences de contenu</li>
                <li>Historique des générations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Utilisation des données</h2>
              <p>Vos données sont utilisées pour:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Générer du contenu personnalisé</li>
                <li>Améliorer nos services</li>
                <li>Assurer le support client</li>
                <li>Envoyer des notifications importantes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Protection des données</h2>
              <p>Nous prenons la sécurité de vos données au sérieux:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Chiffrement de bout en bout</li>
                <li>Stockage sécurisé sur des serveurs canadiens</li>
                <li>Accès restreint aux employés</li>
                <li>Suppression sur demande</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Vos droits</h2>
              <p>Vous avez le droit de:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Accéder à vos données</li>
                <li>Corriger vos informations</li>
                <li>Supprimer votre compte</li>
                <li>Exporter vos données</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact</h2>
              <p>Pour toute question concernant vos données:</p>
              <p className="mt-2">Email: privacy@writemypost.pro</p>
            </section>
          </div>
        </Card>
      </div>
    </>
  );
} 