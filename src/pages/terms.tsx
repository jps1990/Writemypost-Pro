import { Seo } from '@/components/seo';
import { Card } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <>
      <Seo
        title="Conditions d'utilisation - WriteMyPost.pro"
        description="Nos conditions d'utilisation détaillent vos droits et responsabilités en tant qu'utilisateur de WriteMyPost.pro."
      />
      
      <div className="container mx-auto py-8">
        <Card className="p-8">
          <h1 className="text-4xl font-bold mb-8">Conditions d'utilisation</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Utilisation du service</h2>
              <p>En utilisant WriteMyPost.pro, vous acceptez de:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Ne pas utiliser le service à des fins illégales</li>
                <li>Respecter les droits d'auteur et la propriété intellectuelle</li>
                <li>Ne pas surcharger ou perturber nos serveurs</li>
                <li>Maintenir la sécurité de votre compte</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contenu généré</h2>
              <p>Concernant le contenu généré:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Vous êtes responsable du contenu que vous générez</li>
                <li>Vous conservez vos droits sur vos images</li>
                <li>Le contenu généré vous appartient</li>
                <li>Nous ne revendiquons aucun droit sur votre contenu</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Abonnements et paiements</h2>
              <ul className="list-disc pl-6">
                <li>Les prix sont en dollars canadiens (CAD)</li>
                <li>La facturation est mensuelle ou annuelle</li>
                <li>Les remboursements sont possibles sous 14 jours</li>
                <li>Vous pouvez annuler à tout moment</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Limitations</h2>
              <p>WriteMyPost.pro se réserve le droit de:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Modifier les fonctionnalités</li>
                <li>Ajuster les prix</li>
                <li>Suspendre les comptes abusifs</li>
                <li>Mettre à jour ces conditions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contenu interdit</h2>
              <p>Il est interdit de générer du contenu:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Illégal ou frauduleux</li>
                <li>Haineux ou discriminatoire</li>
                <li>Violant les droits d'autrui</li>
                <li>Malveillant ou trompeur</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact</h2>
              <p>Pour toute question légale:</p>
              <p className="mt-2">Email: legal@writemypost.pro</p>
            </section>
          </div>
        </Card>
      </div>
    </>
  );
} 