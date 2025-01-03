import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Seo } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function GuidePage() {
  const shareUrl = window.location.href;
  const title = "Guide WriteMyPost.pro - Créez du contenu qui engage!";
  const description = "Découvrez comment utiliser WriteMyPost.pro pour créer du contenu optimisé pour tous vos réseaux sociaux. Guide complet pour débutants et experts.";

  const shareOnSocial = (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };
    window.open(urls[platform], '_blank');
  };

  return (
    <>
      <Seo
        title={title}
        description={description}
        keywords="guide, tutoriel, writemypost.pro, réseaux sociaux, marketing, IA, contenu, instagram, facebook, twitter"
        image="/og-guide.jpg"
      />
      
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Guide de démarrage</h1>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => shareOnSocial('twitter')}>
                Partager sur Twitter
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => shareOnSocial('facebook')}>
                Partager sur Facebook
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => shareOnSocial('linkedin')}>
                Partager sur LinkedIn
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basics">Les bases</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="social">Réseaux sociaux</TabsTrigger>
            <TabsTrigger value="creators">Créateurs</TabsTrigger>
            <TabsTrigger value="tips">Trucs & Astuces</TabsTrigger>
          </TabsList>

          <TabsContent value="basics">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Les bases de WriteMyPost.pro</h2>
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold mb-2">1. Créer votre premier post</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Cliquez sur "Content Creator" dans le menu</li>
                    <li>Glissez-déposez votre image ou cliquez pour la sélectionner</li>
                    <li>Choisissez vos plateformes et le ton désiré</li>
                    <li>Cliquez sur "Générer" et laissez l'IA faire sa magie!</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2">2. Comprendre l'interface</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Section Analyse: Détails sur votre image</li>
                    <li>Section Hashtags: Suggestions personnalisées</li>
                    <li>Section Contenu: Posts générés par plateforme</li>
                    <li>Section Marketplace: Descriptions pour la vente</li>
                  </ul>
                </section>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="images">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Optimiser vos images</h2>
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold mb-2">Types d'images supportés</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Photos de produits et services</li>
                    <li>Photos personnelles et portraits</li>
                    <li>Photos lifestyle et mode</li>
                    <li>Photos artistiques et créatives</li>
                    <li>Images de marque et visuels marketing</li>
                    <li>Bannières et logos</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2">Conseils pour de meilleurs résultats</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Utilisez des images de haute qualité</li>
                    <li>Assurez-vous que le sujet est bien visible</li>
                    <li>Évitez les textes superposés</li>
                    <li>Préférez les fonds neutres</li>
                    <li>Respectez les règles de chaque plateforme</li>
                  </ul>
                </section>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="creators">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Guide pour Créateurs de Contenu</h2>
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold mb-2">Types de contenu</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Influenceurs et créateurs lifestyle</li>
                    <li>Photographes et artistes</li>
                    <li>Modèles et mannequins</li>
                    <li>Créateurs de contenu adulte (18+)</li>
                    <li>Experts et professionnels</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2">Optimisation par type</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Mode & Lifestyle:
                      <ul className="ml-4 mt-2">
                        <li>Mettez en avant votre style unique</li>
                        <li>Utilisez des hashtags tendance</li>
                        <li>Créez des séries thématiques</li>
                      </ul>
                    </li>
                    <li>Photographie & Art:
                      <ul className="ml-4 mt-2">
                        <li>Décrivez votre technique</li>
                        <li>Partagez votre vision artistique</li>
                        <li>Utilisez des termes techniques appropriés</li>
                      </ul>
                    </li>
                    <li>Contenu personnel:
                      <ul className="ml-4 mt-2">
                        <li>Gardez une voix authentique</li>
                        <li>Racontez votre histoire</li>
                        <li>Engagez votre communauté</li>
                      </ul>
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2">Conseils spécifiques</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Adaptez le ton selon votre marque personnelle</li>
                    <li>Utilisez des mots-clés pertinents pour votre niche</li>
                    <li>Créez des séries de contenu cohérentes</li>
                    <li>Respectez les règles de chaque plateforme</li>
                    <li>Maintenez une image professionnelle</li>
                  </ul>
                </section>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="social">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Optimisation réseaux sociaux</h2>
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold mb-2">Plateformes supportées</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Instagram: Posts, Stories, Reels</li>
                    <li>Facebook: Posts, Stories, Marketplace</li>
                    <li>Twitter/X: Tweets optimisés</li>
                    <li>LinkedIn: Posts professionnels</li>
                    <li>TikTok: Descriptions virales</li>
                    <li>Pinterest: Pins et descriptions</li>
                    <li>YouTube: Titres et descriptions</li>
                    <li>Threads: Posts engageants</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2">Styles de ton disponibles</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Professionnel: Pour B2B et marques sérieuses</li>
                    <li>Décontracté: Pour les marques jeunes</li>
                    <li>Luxe: Pour les produits haut de gamme</li>
                    <li>Éducatif: Pour le contenu informatif</li>
                    <li>Personnel: Pour les créateurs de contenu</li>
                    <li>Artistique: Pour les photographes/artistes</li>
                    <li>Humoristique: Pour un style léger</li>
                  </ul>
                </section>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="tips">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Trucs & Astuces</h2>
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold mb-2">Astuces avancées</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Utilisez des descriptions détaillées pour de meilleurs résultats</li>
                    <li>Testez différents tons pour trouver le meilleur</li>
                    <li>Sauvegardez vos meilleurs posts comme templates</li>
                    <li>Planifiez vos posts à l'avance avec notre calendrier</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2">Meilleures pratiques</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Adaptez le contenu selon votre audience</li>
                    <li>Utilisez les hashtags suggérés stratégiquement</li>
                    <li>Variez les types de contenu</li>
                    <li>Analysez les performances avec nos outils</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2">Résolution des problèmes</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Si l'analyse est imprécise, essayez une autre image</li>
                    <li>Pour plus de hashtags, changez les paramètres</li>
                    <li>Besoin d'aide? Contactez notre support 24/7</li>
                  </ul>
                </section>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
} 