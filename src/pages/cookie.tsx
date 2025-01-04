import { SEO } from '@/components/seo';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { useState } from 'react';

export default function CookiePage() {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  
  return (
    <>
      <SEO
        title={language === 'en' ? "Cookie Policy - WriteMyPost.pro" : "Politique des cookies - WriteMyPost.pro"}
        description={language === 'en' 
          ? "Our cookie policy explains how we use cookies to improve your experience on WriteMyPost.pro."
          : "Notre politique des cookies explique comment nous utilisons les cookies pour améliorer votre expérience sur WriteMyPost.pro."
        }
      />
      
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            {language === 'en' ? 'Cookie Policy' : 'Politique des cookies'}
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
                {language === 'en' ? 'Types of Cookies Used' : 'Types de cookies utilisés'}
              </h2>
              <ul className="list-disc pl-6 mt-2">
                {language === 'en' ? (
                  <>
                    <li>Essential cookies:
                      <ul className="ml-4 mt-2">
                        <li>Authentication and security</li>
                        <li>Session preferences</li>
                        <li>Site performance</li>
                      </ul>
                    </li>
                    <li>Analytics cookies:
                      <ul className="ml-4 mt-2">
                        <li>Usage statistics</li>
                        <li>Service improvement</li>
                        <li>Navigation patterns</li>
                      </ul>
                    </li>
                    <li>Preference cookies:
                      <ul className="ml-4 mt-2">
                        <li>Language</li>
                        <li>Theme (light/dark)</li>
                        <li>Custom settings</li>
                      </ul>
                    </li>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {language === 'en' ? 'Cookie Management' : 'Gestion des cookies'}
              </h2>
              <p>
                {language === 'en'
                  ? 'You can manage your cookie preferences in several ways:'
                  : 'Vous pouvez gérer vos préférences de cookies de plusieurs façons:'
                }
              </p>
              <ul className="list-disc pl-6 mt-2">
                {language === 'en' ? (
                  <>
                    <li>Through our preferences panel</li>
                    <li>In your browser settings</li>
                    <li>Using third-party tools</li>
                  </>
                ) : (
                  <>
                    <li>Via notre panneau de préférences</li>
                    <li>Dans les paramètres de votre navigateur</li>
                    <li>En utilisant des outils tiers</li>
                  </>
                )}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {language === 'en' ? 'Third-Party Cookies' : 'Cookies tiers'}
              </h2>
              <p>
                {language === 'en'
                  ? 'We use third-party services that may place cookies:'
                  : 'Nous utilisons des services tiers qui peuvent placer des cookies:'
                }
              </p>
              <ul className="list-disc pl-6 mt-2">
                {language === 'en' ? (
                  <>
                    <li>Google Analytics: Audience analysis</li>
                    <li>Stripe: Secure payments</li>
                    <li>Cloudflare: Performance and security</li>
                  </>
                ) : (
                  <>
                    <li>Google Analytics: Analyse d'audience</li>
                    <li>Stripe: Paiements sécurisés</li>
                    <li>Cloudflare: Performance et sécurité</li>
                  </>
                )}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {language === 'en' ? 'Retention Period' : 'Durée de conservation'}
              </h2>
              <ul className="list-disc pl-6">
                {language === 'en' ? (
                  <>
                    <li>Session cookies: Deleted when browser closes</li>
                    <li>Persistent cookies: Maximum 13 months</li>
                    <li>Analytics cookies: Maximum 25 months</li>
                  </>
                ) : (
                  <>
                    <li>Cookies de session: Supprimés à la fermeture du navigateur</li>
                    <li>Cookies persistants: Maximum 13 mois</li>
                    <li>Cookies analytiques: Maximum 25 mois</li>
                  </>
                )}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {language === 'en' ? 'Your Rights' : 'Vos droits'}
              </h2>
              <ul className="list-disc pl-6">
                {language === 'en' ? (
                  <>
                    <li>Refuse non-essential cookies</li>
                    <li>Delete existing cookies</li>
                    <li>Be informed of changes</li>
                  </>
                ) : (
                  <>
                    <li>Refuser les cookies non-essentiels</li>
                    <li>Supprimer les cookies existants</li>
                    <li>Être informé des changements</li>
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
                  ? 'Questions about our cookies?'
                  : 'Questions sur nos cookies?'
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