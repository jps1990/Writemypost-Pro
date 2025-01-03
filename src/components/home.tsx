import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Sparkles, Zap, Target, BarChart2 } from 'lucide-react';
import { SEO } from '@/components/seo';

export function Home() {
  return (
    <div className="flex-1">
      <SEO />
      <section className="relative overflow-hidden bg-background py-12 sm:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)]" />
        <div className="mx-auto max-w-2xl text-center px-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-6xl">
            Create Engaging Social Media Content
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground">
            Streamline your social media content creation with AI-powered tools.
            Write better posts, analyze performance, and grow your audience.
          </p>
          <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
            <Button size="lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-6 py-8 md:py-12 lg:py-24 px-4">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center px-4">
          <h2 className="font-bold text-2xl sm:text-3xl md:text-6xl leading-[1.1]">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground text-base sm:text-lg">
            Everything you need to create and manage your social media content
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 grid-cols-1 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <Card>
            <CardHeader>
              <Sparkles className="h-14 w-14 text-primary" />
              <CardTitle>AI Content Generation</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Generate engaging posts with our AI-powered content creator
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Target className="h-14 w-14 text-primary" />
              <CardTitle>Audience Targeting</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Reach the right audience with smart targeting tools
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <BarChart2 className="h-14 w-14 text-primary" />
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Track performance and optimize your content strategy
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="space-y-6 py-8 md:py-12 lg:py-24 px-4">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center px-4">
          <h2 className="font-bold text-2xl sm:text-3xl md:text-6xl leading-[1.1]">
            Simple, Transparent Pricing
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground text-base sm:text-lg">
            Choose the perfect plan for your needs
          </p>
        </div>
        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <div className="text-3xl font-bold">$29/mo</div>
              <CardDescription className="text-sm sm:text-base">
                Perfect for individuals and small teams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Zap className="mr-2 h-4 w-4 text-primary" />
                  50 AI-generated posts per month
                </li>
                <li className="flex items-center">
                  <Zap className="mr-2 h-4 w-4 text-primary" />
                  Basic analytics
                </li>
                <li className="flex items-center">
                  <Zap className="mr-2 h-4 w-4 text-primary" />
                  2 social accounts
                </li>
              </ul>
              <Button className="mt-4 w-full">Get Started</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Professional</CardTitle>
              <div className="text-3xl font-bold">$79/mo</div>
              <CardDescription>For growing businesses</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Zap className="mr-2 h-4 w-4 text-primary" />
                  200 AI-generated posts per month
                </li>
                <li className="flex items-center">
                  <Zap className="mr-2 h-4 w-4 text-primary" />
                  Advanced analytics
                </li>
                <li className="flex items-center">
                  <Zap className="mr-2 h-4 w-4 text-primary" />
                  10 social accounts
                </li>
              </ul>
              <Button className="mt-4 w-full">Get Started</Button>
            </CardContent>
          </Card>
          <Card className="lg:col-span-1 md:col-span-2 lg:col-start-3">
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <div className="text-3xl font-bold">Custom</div>
              <CardDescription>For large organizations</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Zap className="mr-2 h-4 w-4 text-primary" />
                  Unlimited AI-generated posts
                </li>
                <li className="flex items-center">
                  <Zap className="mr-2 h-4 w-4 text-primary" />
                  Custom analytics
                </li>
                <li className="flex items-center">
                  <Zap className="mr-2 h-4 w-4 text-primary" />
                  Unlimited social accounts
                </li>
              </ul>
              <Button className="mt-4 w-full">Contact Sales</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}