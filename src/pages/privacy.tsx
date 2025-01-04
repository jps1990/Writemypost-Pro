import { SEO } from '@/components/seo';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { useState } from 'react';

export default function PrivacyPage() {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  
  return (
    <>
      <SEO
        title={language === 'en' ? "Privacy Policy - WriteMyPost.pro" : "Politique de confidentialité - WriteMyPost.pro"}
        description={language === 'en' 
          ? "Our privacy policy details how we protect your data and respect your privacy."
          : "Notre politique de confidentialité détaille comment nous protégeons vos données et respectons votre vie privée."
        }
      />
      
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            {language === 'en' ? 'Privacy Policy' : 'Politique de confidentialité'}
          </h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(l => l === 'en' ? 'fr' : 'en')}
            className="text-foreground"
          >
            {language === 'en' ? 'FR' : 'EN'}
          </Button>
        </div>

        <Card className="p-8">
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {language === 'en' ? 'Data Collection' : 'Collecte des données'}
              </h2>
              <p>
                {language === 'en' 
                  ? 'We only collect data necessary for our services to function:'
                  : 'Nous collectons uniquement les données nécessaires au bon fonctionnement de nos services:'
                }
              </p>
              <ul className="list-disc pl-6 mt-2">
                {language === 'en' ? (
                  <>
                    <li>Account information (email, name)</li>
                    <li>Uploaded images for analysis</li>
                    <li>Content preferences</li>
                    <li>Generation history</li>
                  </>
                ) : (
                  <>
                    <li>Informations de compte (email, nom)</li>
                    <li>Images téléchargées pour analyse</li>
                    <li>Préférences de contenu</li>
                    <li>Historique des générations</li>
                  </>
                )}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {language === 'en' ? 'Data Usage' : 'Utilisation des données'}
              </h2>
              <p>{language === 'en' ? 'Your data is used for:' : 'Vos données sont utilisées pour:'}</p>
              <ul className="list-disc pl-6 mt-2">
                {language === 'en' ? (
                  <>
                    <li>Generating personalized content</li>
                    <li>Improving our services</li>
                    <li>Providing customer support</li>
                    <li>Sending important notifications</li>
                  </>
                ) : (
                  <>
                    <li>Générer du contenu personnalisé</li>
                    <li>Améliorer nos services</li>
                    <li>Assurer le support client</li>
                    <li>Envoyer des notifications importantes</li>
                  </>
                )}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {language === 'en' ? 'Data Protection' : 'Protection des données'}
              </h2>
              <p>
                {language === 'en'
                  ? 'We take your data security seriously:'
                  : 'Nous prenons la sécurité de vos données au sérieux:'
                }
              </p>
              <ul className="list-disc pl-6 mt-2">
                {language === 'en' ? (
                  <>
                    <li>End-to-end encryption</li>
                    <li>Secure storage on Canadian servers</li>
                    <li>Limited employee access</li>
                    <li>Deletion upon request</li>
                  </>
                ) : (
                  <>
                    <li>Chiffrement de bout en bout</li>
                    <li>Stockage sécurisé sur des serveurs canadiens</li>
                    <li>Accès restreint aux employés</li>
                    <li>Suppression sur demande</li>
                  </>
                )}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {language === 'en' ? 'Your Rights' : 'Vos droits'}
              </h2>
              <p>{language === 'en' ? 'You have the right to:' : 'Vous avez le droit de:'}</p>
              <ul className="list-disc pl-6 mt-2">
                {language === 'en' ? (
                  <>
                    <li>Access your data</li>
                    <li>Correct your information</li>
                    <li>Delete your account</li>
                    <li>Export your data</li>
                  </>
                ) : (
                  <>
                    <li>Accéder à vos données</li>
                    <li>Corriger vos informations</li>
                    <li>Supprimer votre compte</li>
                    <li>Exporter vos données</li>
                  </>
                )}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {language === 'en' ? 'Contact' : 'Contact'}
              </h2>
              <p>
                {language === 'en'
                  ? 'For any questions about your data:'
                  : 'Pour toute question concernant vos données:'
                }
              </p>
              <p className="mt-2">Email: privacy@writemypost.pro</p>
            </section>
          </div>
        </Card>
      </div>
    </>
  );
} 