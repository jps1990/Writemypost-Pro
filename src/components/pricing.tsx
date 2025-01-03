import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { SEO } from '@/components/seo';

export function Pricing() {
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

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Starter</CardTitle>
            <div className="text-3xl font-bold">$29/mo</div>
            <CardDescription>Perfect for individuals and small teams</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                50 AI-generated posts per month
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                Basic analytics
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                2 social accounts
              </li>
            </ul>
            <Button className="mt-6 w-full">Get Started</Button>
          </CardContent>
        </Card>

        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Professional</CardTitle>
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
                Advanced analytics
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                10 social accounts
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                Priority support
              </li>
            </ul>
            <Button className="mt-6 w-full">Get Started</Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 md:col-span-2 lg:col-start-3">
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
                Custom analytics
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                Unlimited social accounts
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                24/7 priority support
              </li>
            </ul>
            <Button className="mt-6 w-full">Contact Sales</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}