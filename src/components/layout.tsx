import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, Home, Sparkles, History as HistoryIcon, CreditCard, User, Image } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/theme-toggle';
import { NavigationMenu } from '@/components/navigation-menu';
import { Footer } from '@/components/footer';

export function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetTitle>Menu</SheetTitle>
                <NavigationMenu />
              </SheetContent>
            </Sheet>
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-bold">WriteMyPost.pro</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 items-center justify-center space-x-4">
            <Button
              variant={isActive('/') ? 'default' : 'ghost'}
              onClick={() => navigate('/')}
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
            <Button
              variant={isActive('/create') ? 'default' : 'ghost'}
              onClick={() => navigate('/create')}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Create
            </Button>
            <Button
              variant={isActive('/tools/image-resizer') ? 'default' : 'ghost'}
              onClick={() => navigate('/tools/image-resizer')}
            >
              <Image className="mr-2 h-4 w-4" />
              Image Resizer
            </Button>
            <Button
              variant={isActive('/history') ? 'default' : 'ghost'}
              onClick={() => navigate('/history')}
            >
              <HistoryIcon className="mr-2 h-4 w-4" />
              History
            </Button>
            <Button
              variant={isActive('/pricing') ? 'default' : 'ghost'}
              onClick={() => navigate('/pricing')}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Pricing
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/profile')}
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}