import { SEO } from '@/components/seo';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { useState } from 'react';

export default function TermsPage() {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  
  return (
    <>
      <SEO
        title={language === 'en' ? "Terms of Service - WriteMyPost.pro" : "Conditions d'utilisation - WriteMyPost.pro"}
        description={language === 'en' 
          ? "Our terms of service detail your rights and responsibilities as a WriteMyPost.pro user."
          : "Nos conditions d'utilisation détaillent vos droits et responsabilités en tant qu'utilisateur de WriteMyPost.pro."
        }
      />
      
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            {language === 'en' ? 'Terms of Service' : 'Conditions d\'utilisation'}
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
                {language === 'en' ? 'Service Usage' : 'Utilisation du service'}
              </h2>
              <p>{language === 'en' ? 'By using WriteMyPost.pro, you agree to:' : 'En utilisant WriteMyPost.pro, vous acceptez de:'}</p>
              <ul className="list-disc pl-6 mt-2">
                {language === 'en' ? (
                  <>
                    <li>Not use the service for illegal purposes</li>
                    <li>Respect copyright and intellectual property</li>
                    <li>Not overload or disrupt our servers</li>
                    <li>Maintain your account security</li>
                  </>
                ) : (
                  <>
                    <li>Ne pas utiliser le service à des fins illégales</li>
                    <li>Respecter les droits d'auteur et la propriété intellectuelle</li>
                    <li>Ne pas surcharger ou perturber nos serveurs</li>
                    <li>Maintenir la sécurité de votre compte</li>
                  </>
                )}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {language === 'en' ? 'Generated Content' : 'Contenu généré'}
              </h2>
              <p>{language === 'en' ? 'Regarding generated content:' : 'Concernant le contenu généré:'}</p>
              <ul className="list-disc pl-6 mt-2">
                {language === 'en' ? (
                  <>
                    <li>You are responsible for the content you generate</li>
                    <li>You retain rights to your images</li>
                    <li>Generated content belongs to you</li>
                    <li>We claim no rights to your content</li>
                  </>
                ) : (
                  <>
                    <li>Vous êtes responsable du contenu que vous générez</li>
                    <li>Vous conservez vos droits sur vos images</li>
                    <li>Le contenu généré vous appartient</li>
                    <li>Nous ne revendiquons aucun droit sur votre contenu</li>
                  </>
                )}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {language === 'en' ? 'Subscriptions and Payments' : 'Abonnements et paiements'}
              </h2>
              <ul className="list-disc pl-6">
                {language === 'en' ? (
                  <>
                    <li>Prices are in Canadian dollars (CAD)</li>
                    <li>Billing is monthly or annual</li>
                    <li>Refunds available within 14 days</li>
                    <li>You can cancel anytime</li>
                  </>
                ) : (
                  <>
                    <li>Les prix sont en dollars canadiens (CAD)</li>
                    <li>La facturation est mensuelle ou annuelle</li>
                    <li>Les remboursements sont possibles sous 14 jours</li>
                    <li>Vous pouvez annuler à tout moment</li>
                  </>
                )}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {language === 'en' ? 'Limitations' : 'Limitations'}
              </h2>
              <p>{language === 'en' ? 'WriteMyPost.pro reserves the right to:' : 'WriteMyPost.pro se réserve le droit de:'}</p>
              <ul className="list-disc pl-6 mt-2">
                {language === 'en' ? (
                  <>
                    <li>Modify features</li>
                    <li>Adjust prices</li>
                    <li>Suspend abusive accounts</li>
                    <li>Update these terms</li>
                  </>
                ) : (
                  <>
                    <li>Modifier les fonctionnalités</li>
                    <li>Ajuster les prix</li>
                    <li>Suspendre les comptes abusifs</li>
                    <li>Mettre à jour ces conditions</li>
                  </>
                )}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {language === 'en' ? 'Prohibited Content' : 'Contenu interdit'}
              </h2>
              <p>{language === 'en' ? 'It is forbidden to generate content that is:' : 'Il est interdit de générer du contenu:'}</p>
              <ul className="list-disc pl-6 mt-2">
                {language === 'en' ? (
                  <>
                    <li>Illegal or fraudulent</li>
                    <li>Hateful or discriminatory</li>
                    <li>Violating others' rights</li>
                    <li>Malicious or deceptive</li>
                  </>
                ) : (
                  <>
                    <li>Illégal ou frauduleux</li>
                    <li>Haineux ou discriminatoire</li>
                    <li>Violant les droits d'autrui</li>
                    <li>Malveillant ou trompeur</li>
                  </>
                )}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {language === 'en' ? 'Contact' : 'Contact'}
              </h2>
              <p>{language === 'en' ? 'For any legal questions:' : 'Pour toute question légale:'}</p>
              <p className="mt-2">Email: legal@writemypost.pro</p>
            </section>
          </div>
        </Card>
      </div>
    </>
  );
} 