import { Seo } from '@/components/seo';
import { Card } from '@/components/ui/card';

export default function CookiePage() {
  return (
    <>
      <Seo
        title="Politique des cookies - WriteMyPost.pro"
        description="Notre politique des cookies explique comment nous utilisons les cookies pour améliorer votre expérience sur WriteMyPost.pro."
      />
      
      <div className="container mx-auto py-8">
        <Card className="p-8">
          <h1 className="text-4xl font-bold mb-8">Politique des cookies</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Types de cookies utilisés</h2>
              <ul className="list-disc pl-6 mt-2">
                <li>Cookies essentiels:
                  <ul className="ml-4 mt-2">
                    <li>Authentification et sécurité</li>
                    <li>Préférences de session</li>
                    <li>Performance du site</li>
                  </ul>
                </li>
                <li>Cookies analytiques:
                  <ul className="ml-4 mt-2">
                    <li>Statistiques d'utilisation</li>
                    <li>Amélioration du service</li>
                    <li>Patterns de navigation</li>
                  </ul>
                </li>
                <li>Cookies de préférences:
                  <ul className="ml-4 mt-2">
                    <li>Langue</li>
                    <li>Thème (clair/sombre)</li>
                    <li>Paramètres personnalisés</li>
                  </ul>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Gestion des cookies</h2>
              <p>Vous pouvez gérer vos préférences de cookies de plusieurs façons:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Via notre panneau de préférences</li>
                <li>Dans les paramètres de votre navigateur</li>
                <li>En utilisant des outils tiers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Cookies tiers</h2>
              <p>Nous utilisons des services tiers qui peuvent placer des cookies:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Google Analytics: Analyse d'audience</li>
                <li>Stripe: Paiements sécurisés</li>
                <li>Cloudflare: Performance et sécurité</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Durée de conservation</h2>
              <ul className="list-disc pl-6">
                <li>Cookies de session: Supprimés à la fermeture du navigateur</li>
                <li>Cookies persistants: Maximum 13 mois</li>
                <li>Cookies analytiques: Maximum 25 mois</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Vos droits</h2>
              <ul className="list-disc pl-6">
                <li>Refuser les cookies non-essentiels</li>
                <li>Supprimer les cookies existants</li>
                <li>Être informé des changements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact</h2>
              <p>Questions sur nos cookies?</p>
              <p className="mt-2">Email: privacy@writemypost.pro</p>
            </section>
          </div>
        </Card>
      </div>
    </>
  );
} 