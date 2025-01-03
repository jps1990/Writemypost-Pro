import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, LayoutDashboard, Settings, Users, BarChart3, Sparkles } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggle } from './theme-toggle';
import { NavigationMenu } from './navigation-menu';
import { Footer } from './footer';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-7xl flex h-14 items-center px-4">
          <div className="flex items-center space-x-2 mr-8">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">WriteMyPost.pro</span>
            </Link>
          </div>
          <div className="hidden md:flex flex-1 justify-center space-x-6">
            <Button 
              variant={isActive('/') ? 'default' : 'ghost'}
              className={cn(
                "text-sm font-medium",
                isActive('/') ? "bg-violet-500 hover:bg-violet-600" : "hover:text-violet-500"
              )}
              onClick={() => navigate('/')}
            >
              Home
            </Button>
            <Button 
              variant={isActive('/create') ? 'default' : 'ghost'}
              className={cn(
                "text-sm font-medium",
                isActive('/create') ? "bg-violet-500 hover:bg-violet-600" : "hover:text-violet-500"
              )}
              onClick={() => navigate('/create')}
            >
              Content Creator
            </Button>
            <Button 
              variant={isActive('/tools/image-resizer') ? 'default' : 'ghost'}
              className={cn(
                "text-sm font-medium",
                isActive('/tools/image-resizer') ? "bg-violet-500 hover:bg-violet-600" : "hover:text-violet-500"
              )}
              onClick={() => navigate('/tools/image-resizer')}
            >
              Image Resizer
            </Button>
            <Button 
              variant={isActive('/history') ? 'default' : 'ghost'}
              className={cn(
                "text-sm font-medium",
                isActive('/history') ? "bg-violet-500 hover:bg-violet-600" : "hover:text-violet-500"
              )}
              onClick={() => navigate('/history')}
            >
              History
            </Button>
            <Button 
              variant={isActive('/pricing') ? 'default' : 'ghost'}
              className={cn(
                "text-sm font-medium",
                isActive('/pricing') ? "bg-violet-500 hover:bg-violet-600" : "hover:text-violet-500"
              )}
              onClick={() => navigate('/pricing')}
            >
              Pricing
            </Button>
          </div>
          <div className="flex md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <NavigationMenu />
              </SheetContent>
            </Sheet>
          </div>
          <div className="flex items-center space-x-4 ml-auto">
            <Link to="/signin">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="sm">Profile</Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6">{children}</main>
      <Footer />
    </div>
  );
}