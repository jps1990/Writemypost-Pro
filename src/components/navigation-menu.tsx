import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Home, Sparkles, CreditCard, Image } from 'lucide-react';

export function NavigationMenu() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <ScrollArea className="h-[calc(100vh-8rem)] pb-10">
      <div className="flex flex-col gap-2">
        <Link to="/">
          <Button 
            variant={isActive('/') ? 'default' : 'ghost'}
            className="w-full justify-start text-left"
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </Link>
        <Link to="/create">
          <Button 
            variant={isActive('/create') ? 'default' : 'ghost'}
            className="w-full justify-start text-left"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Content Creator
          </Button>
        </Link>
        <Link to="/tools/image-resizer">
          <Button 
            variant={isActive('/tools/image-resizer') ? 'default' : 'ghost'}
            className="w-full justify-start text-left"
          >
            <Image className="mr-2 h-4 w-4" />
            Image Resizer
          </Button>
        </Link>
        <Link to="/history">
          <Button 
            variant={isActive('/history') ? 'default' : 'ghost'}
            className="w-full justify-start"
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            History
          </Button>
        </Link>
        <Link to="/pricing">
          <Button 
            variant={isActive('/pricing') ? 'default' : 'ghost'}
            className="w-full justify-start"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Pricing
          </Button>
        </Link>
        <Link to="/profile">
          <Button 
            variant={isActive('/profile') ? 'default' : 'ghost'}
            className="w-full justify-start"
          >
            <Users className="mr-2 h-4 w-4" />
            Profile
          </Button>
        </Link>
      </div>
    </ScrollArea>
  );
}