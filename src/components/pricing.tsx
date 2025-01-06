import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles } from 'lucide-react';
import { SEO } from '@/components/seo';
import { useNavigate } from 'react-router-dom';

export function Pricing() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <SEO 
        title="Pricing Plans | WriteMyPost.pro"
        description="Choose the perfect plan for your content creation needs. Flexible pricing options for individuals, teams, and enterprises."
        keywords={['pricing', 'subscription plans', 'content creation pricing', 'social media tools']}
      />
      <div className="flex flex-col space-y-4 text-center">
        <h1 className="text-3xl font-bold">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan for your content creation needs. All plans include our core AI features.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Free Tier */}
        <Card>
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <div className="text-3xl font-bold">$0</div>
            <CardDescription>Perfect for getting started</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                5 AI-generated posts per month
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                Free image resizer tool
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                Basic features
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                Email support
              </li>
            </ul>
            <Button className="mt-6 w-full" onClick={() => navigate('/signup')}>
              Sign Up Free
            </Button>
          </CardContent>
        </Card>

        {/* Starter Tier */}
        <Card>
          <CardHeader>
            <CardTitle>Starter</CardTitle>
            <div className="text-3xl font-bold">$29/mo</div>
            <CardDescription>For content creators</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                50 AI-generated posts per month
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                All image tools included
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                Advanced hashtag suggestions
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                Email templates included
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                Priority email support
              </li>
            </ul>
            <Button className="mt-6 w-full">Get Started</Button>
          </CardContent>
        </Card>

        {/* Professional Tier */}
        <Card className="border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Professional</CardTitle>
              <Badge variant="secondary" className="bg-primary/10 text-primary">Popular</Badge>
            </div>
            <div className="text-3xl font-bold">$79/mo</div>
            <CardDescription>For growing businesses</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                200 AI-generated posts per month
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                All Starter features included
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                Advanced analytics
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                Custom templates
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                Priority support 24/7
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                Team collaboration
              </li>
            </ul>
            <Button className="mt-6 w-full">Get Started</Button>
          </CardContent>
        </Card>

        {/* Enterprise Tier */}
        <Card>
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <div className="text-3xl font-bold">Custom</div>
            <CardDescription>For large organizations</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                Unlimited AI-generated posts
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                All Professional features
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                Custom AI training
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                API access
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                Dedicated account manager
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                SLA guarantee
              </li>
            </ul>
            <Button className="mt-6 w-full">Contact Sales</Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What's included in the free plan?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The free plan includes 5 AI-generated posts per month, access to our image resizer tool, and basic features. Perfect for trying out the platform!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Can I upgrade or downgrade anytime?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect at the start of the next billing cycle.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Yes, we offer a 14-day money-back guarantee. If you're not satisfied, just let us know and we'll refund your payment.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}