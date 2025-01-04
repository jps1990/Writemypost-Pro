import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SEO } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { Share2, Languages } from 'lucide-react';
import { useState } from 'react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function GuidePage() {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const shareUrl = window.location.href;
  const title = language === 'en' 
    ? "WriteMyPost.pro Guide - Create Engaging Content!"
    : "Guide WriteMyPost.pro - Créez du contenu qui engage!";
  const description = language === 'en'
    ? "Learn how to use WriteMyPost.pro to create optimized content for all your social networks. Complete guide for beginners and experts."
    : "Découvrez comment utiliser WriteMyPost.pro pour créer du contenu optimisé pour tous vos réseaux sociaux. Guide complet pour débutants et experts.";

  const shareOnSocial = (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };
    window.open(urls[platform], '_blank');
  };

  const tabs = {
    en: {
      basics: "Basics",
      images: "Images",
      social: "Social Media",
      creators: "Creators",
      tips: "Tips & Tricks"
    },
    fr: {
      basics: "Les bases",
      images: "Images",
      social: "Réseaux sociaux",
      creators: "Créateurs",
      tips: "Trucs & Astuces"
    }
  };

  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={language === 'en' 
          ? "guide, tutorial, writemypost.pro, social media, marketing, AI, content, instagram, facebook, twitter"
          : "guide, tutoriel, writemypost.pro, réseaux sociaux, marketing, IA, contenu, instagram, facebook, twitter"
        }
        image="/og-guide.jpg"
      />
      
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            {language === 'en' ? 'Getting Started Guide' : 'Guide de démarrage'}
          </h1>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(l => l === 'en' ? 'fr' : 'en')}
              className="text-foreground"
            >
              {language === 'en' ? 'FR' : 'EN'}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => shareOnSocial('twitter')}>
                  {language === 'en' ? 'Share on Twitter' : 'Partager sur Twitter'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => shareOnSocial('facebook')}>
                  {language === 'en' ? 'Share on Facebook' : 'Partager sur Facebook'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => shareOnSocial('linkedin')}>
                  {language === 'en' ? 'Share on LinkedIn' : 'Partager sur LinkedIn'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basics">{tabs[language].basics}</TabsTrigger>
            <TabsTrigger value="images">{tabs[language].images}</TabsTrigger>
            <TabsTrigger value="social">{tabs[language].social}</TabsTrigger>
            <TabsTrigger value="creators">{tabs[language].creators}</TabsTrigger>
            <TabsTrigger value="tips">{tabs[language].tips}</TabsTrigger>
          </TabsList>

          <TabsContent value="basics">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {language === 'en' ? 'WriteMyPost.pro Basics' : 'Les bases de WriteMyPost.pro'}
              </h2>
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'en' ? '1. Create Your First Post' : '1. Créer votre premier post'}
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {language === 'en' ? (
                      <>
                        <li>Click "Content Creator" in the menu</li>
                        <li><strong>Select your language (English/French) before uploading</strong></li>
                        <li>Drag & drop your image or click to select</li>
                        <li>Choose analysis mode (Product Focus or General Content)</li>
                        <li>Select your platforms and desired tone</li>
                        <li>Click "Generate" and let AI do its magic!</li>
                      </>
                    ) : (
                      <>
                        <li>Cliquez sur "Content Creator" dans le menu</li>
                        <li><strong>Sélectionnez votre langue (Anglais/Français) avant de téléverser</strong></li>
                        <li>Glissez-déposez votre image ou cliquez pour la sélectionner</li>
                        <li>Choisissez le mode d'analyse (Product Focus ou General Content)</li>
                        <li>Choisissez vos plateformes et le ton désiré</li>
                        <li>Cliquez sur "Generate" et laissez l'IA faire sa magie!</li>
                      </>
                    )}
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'en' ? '2. Understanding the Interface' : '2. Comprendre l\'interface'}
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {language === 'en' ? (
                      <>
                        <li>Analysis Modes:
                          <ul className="ml-4 mt-2">
                            <li>Product Focus: Detailed product analysis</li>
                            <li>General Content: Overall context analysis</li>
                          </ul>
                        </li>
                        <li>Analysis Section: Image details</li>
                        <li>Hashtags Section: Custom suggestions</li>
                        <li>Content Section: Generated posts by platform</li>
                        <li>Marketplace Section: Listing descriptions</li>
                      </>
                    ) : (
                      <>
                        <li>Modes d'analyse:
                          <ul className="ml-4 mt-2">
                            <li>Product Focus: Analyse détaillée des produits</li>
                            <li>General Content: Analyse du contexte général</li>
                          </ul>
                        </li>
                        <li>Section Analyse: Détails sur votre image</li>
                        <li>Section Hashtags: Suggestions personnalisées</li>
                        <li>Section Content: Posts générés par plateforme</li>
                        <li>Section Marketplace: Descriptions pour la vente</li>
                      </>
                    )}
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'en' ? '3. Analysis Modes' : '3. Modes d\'analyse'}
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {language === 'en' ? (
                      <>
                        <li>Product Focus:
                          <ul className="ml-4 mt-2">
                            <li>Perfect for products to sell</li>
                            <li>Detailed materials and specs analysis</li>
                            <li>Focus on technical aspects</li>
                            <li>Price and positioning suggestions</li>
                          </ul>
                        </li>
                        <li>General Content:
                          <ul className="ml-4 mt-2">
                            <li>Ideal for lifestyle and branding</li>
                            <li>Mood and context analysis</li>
                            <li>Focus on storytelling</li>
                            <li>Theme and angle suggestions</li>
                          </ul>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>Product Focus:
                          <ul className="ml-4 mt-2">
                            <li>Idéal pour les produits à vendre</li>
                            <li>Analyse détaillée des matériaux et specs</li>
                            <li>Focus sur les aspects techniques</li>
                            <li>Suggestions de prix et positionnement</li>
                          </ul>
                        </li>
                        <li>General Content:
                          <ul className="ml-4 mt-2">
                            <li>Parfait pour le lifestyle et branding</li>
                            <li>Analyse de l'ambiance et du contexte</li>
                            <li>Focus sur le storytelling</li>
                            <li>Suggestions de thèmes et d'angles</li>
                          </ul>
                        </li>
                      </>
                    )}
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'en' ? 'Bonus Features' : 'Fonctionnalités bonus'}
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {language === 'en' ? (
                      <>
                        <li>Email Marketing Sequence:
                          <ul className="ml-4 mt-2">
                            <li>Welcome email template</li>
                            <li>Promotional email template</li>
                            <li>Follow-up email template</li>
                            <li>Reactivation email template</li>
                          </ul>
                        </li>
                        <li>Additional Platforms:
                          <ul className="ml-4 mt-2">
                            <li>Medium articles</li>
                            <li>Snapchat stories</li>
                          </ul>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>Séquence Email Marketing:
                          <ul className="ml-4 mt-2">
                            <li>Template d'email de bienvenue</li>
                            <li>Template d'email promotionnel</li>
                            <li>Template d'email de suivi</li>
                            <li>Template d'email de réactivation</li>
                          </ul>
                        </li>
                        <li>Plateformes additionnelles:
                          <ul className="ml-4 mt-2">
                            <li>Articles Medium</li>
                            <li>Stories Snapchat</li>
                          </ul>
                        </li>
                      </>
                    )}
                  </ul>
                </section>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="images">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {language === 'en' ? 'Optimize Your Images' : 'Optimiser vos images'}
              </h2>
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'en' ? 'Supported Image Types' : 'Types d\'images supportés'}
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {language === 'en' ? (
                      <>
                        <li>Product and service photos</li>
                        <li>Personal photos and portraits</li>
                        <li>Lifestyle and fashion photos</li>
                        <li>Artistic and creative photos</li>
                        <li>Brand images and marketing visuals</li>
                        <li>Banners and logos</li>
                      </>
                    ) : (
                      <>
                        <li>Photos de produits et services</li>
                        <li>Photos personnelles et portraits</li>
                        <li>Photos lifestyle et mode</li>
                        <li>Photos artistiques et créatives</li>
                        <li>Images de marque et visuels marketing</li>
                        <li>Bannières et logos</li>
                      </>
                    )}
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'en' ? 'Tips for Better Results' : 'Conseils pour de meilleurs résultats'}
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {language === 'en' ? (
                      <>
                        <li>Use high-quality images</li>
                        <li><strong>Always select your language before analysis</strong></li>
                        <li>Ensure the subject is clearly visible</li>
                        <li>Avoid overlaid text</li>
                        <li>Prefer neutral backgrounds</li>
                        <li>Follow platform-specific guidelines</li>
                      </>
                    ) : (
                      <>
                        <li>Utilisez des images de haute qualité</li>
                        <li><strong>Sélectionnez toujours votre langue avant l'analyse</strong></li>
                        <li>Assurez-vous que le sujet est bien visible</li>
                        <li>Évitez les textes superposés</li>
                        <li>Préférez les fonds neutres</li>
                        <li>Respectez les règles de chaque plateforme</li>
                      </>
                    )}
                  </ul>
                </section>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="social">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {language === 'en' ? 'Social Media Guide' : 'Guide des réseaux sociaux'}
              </h2>
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'en' ? 'Supported Platforms' : 'Plateformes supportées'}
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {language === 'en' ? (
                      <>
                        <li>Instagram: Posts, Stories, Reels</li>
                        <li>Facebook: Posts, Stories, Marketplace</li>
                        <li>Twitter/X: Optimized tweets</li>
                        <li>LinkedIn: Professional posts</li>
                        <li>TikTok: Viral descriptions</li>
                        <li>Pinterest: Pins and descriptions</li>
                        <li>YouTube: Titles and descriptions</li>
                        <li>Threads: Engaging posts</li>
                      </>
                    ) : (
                      <>
                        <li>Instagram: Posts, Stories, Reels</li>
                        <li>Facebook: Posts, Stories, Marketplace</li>
                        <li>Twitter/X: Tweets optimisés</li>
                        <li>LinkedIn: Posts professionnels</li>
                        <li>TikTok: Descriptions virales</li>
                        <li>Pinterest: Pins et descriptions</li>
                        <li>YouTube: Titres et descriptions</li>
                        <li>Threads: Posts engageants</li>
                      </>
                    )}
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'en' ? 'Available Tone Styles' : 'Styles de ton disponibles'}
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {language === 'en' ? (
                      <>
                        <li>Professional: For B2B and serious brands</li>
                        <li>Casual: For young brands</li>
                        <li>Luxury: For high-end products</li>
                        <li>Educational: For informative content</li>
                        <li>Personal: For content creators</li>
                        <li>Artistic: For photographers/artists</li>
                        <li>Humorous: For light-hearted style</li>
                      </>
                    ) : (
                      <>
                        <li>Professionnel: Pour B2B et marques sérieuses</li>
                        <li>Décontracté: Pour les marques jeunes</li>
                        <li>Luxe: Pour les produits haut de gamme</li>
                        <li>Éducatif: Pour le contenu informatif</li>
                        <li>Personnel: Pour les créateurs de contenu</li>
                        <li>Artistique: Pour les photographes/artistes</li>
                        <li>Humoristique: Pour un style léger</li>
                      </>
                    )}
                  </ul>
                </section>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="creators">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {language === 'en' ? 'Content Creator Guide' : 'Guide pour Créateurs de Contenu'}
              </h2>
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'en' ? 'Content Types' : 'Types de contenu'}
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {language === 'en' ? (
                      <>
                        <li>Influencers and lifestyle creators</li>
                        <li>Photographers and artists</li>
                        <li>Models</li>
                        <li>Adult content creators (18+)</li>
                        <li>Experts and professionals</li>
                      </>
                    ) : (
                      <>
                        <li>Influenceurs et créateurs lifestyle</li>
                        <li>Photographes et artistes</li>
                        <li>Modèles et mannequins</li>
                        <li>Créateurs de contenu adulte (18+)</li>
                        <li>Experts et professionnels</li>
                      </>
                    )}
                  </ul>
                </section>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="tips">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {language === 'en' ? 'Tips & Tricks' : 'Trucs & Astuces'}
              </h2>
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'en' ? 'Optimize Analysis' : 'Optimiser l\'analyse'}
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {language === 'en' ? (
                      <>
                        <li>Choose the right mode:
                          <ul className="ml-4 mt-2">
                            <li>Product Focus for products and sales</li>
                            <li>General Content for branding and lifestyle</li>
                          </ul>
                        </li>
                        <li>Switch modes if needed:
                          <ul className="ml-4 mt-2">
                            <li>Analysis is saved for each mode</li>
                            <li>Compare results from both modes</li>
                            <li>Use the most relevant for your case</li>
                          </ul>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>Choisir le bon mode:
                          <ul className="ml-4 mt-2">
                            <li>Product Focus pour les produits et ventes</li>
                            <li>General Content pour le branding et lifestyle</li>
                          </ul>
                        </li>
                        <li>Changer de mode si nécessaire:
                          <ul className="ml-4 mt-2">
                            <li>L'analyse est sauvegardée pour chaque mode</li>
                            <li>Comparez les résultats des deux modes</li>
                            <li>Utilisez le plus pertinent pour votre cas</li>
                          </ul>
                        </li>
                      </>
                    )}
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'en' ? 'Advanced Tips' : 'Astuces avancées'}
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {language === 'en' ? (
                      <>
                        <li>Use detailed descriptions for better results</li>
                        <li>Test different tones to find the best fit</li>
                        <li>Save your best posts as templates</li>
                        <li>Plan your posts ahead with our calendar</li>
                      </>
                    ) : (
                      <>
                        <li>Utilisez des descriptions détaillées pour de meilleurs résultats</li>
                        <li>Testez différents tons pour trouver le meilleur</li>
                        <li>Sauvegardez vos meilleurs posts comme templates</li>
                        <li>Planifiez vos posts à l'avance avec notre calendrier</li>
                      </>
                    )}
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'en' ? 'Troubleshooting' : 'Résolution des problèmes'}
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {language === 'en' ? (
                      <>
                        <li>If analysis is inaccurate:
                          <ul className="ml-4 mt-2">
                            <li>Try switching analysis mode</li>
                            <li>Verify the correct mode is selected</li>
                            <li>Try another image if needed</li>
                          </ul>
                        </li>
                        <li>For more hashtags, change the settings</li>
                        <li>Need help? Contact our 24/7 support</li>
                      </>
                    ) : (
                      <>
                        <li>Si l'analyse est imprécise:
                          <ul className="ml-4 mt-2">
                            <li>Essayez de changer de mode d'analyse</li>
                            <li>Vérifiez que le bon mode est sélectionné</li>
                            <li>Essayez une autre image si nécessaire</li>
                          </ul>
                        </li>
                        <li>Pour plus de hashtags, changez les paramètres</li>
                        <li>Besoin d'aide? Contactez notre support 24/7</li>
                      </>
                    )}
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