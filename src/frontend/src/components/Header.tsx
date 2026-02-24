import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import LoginButton from './LoginButton';
import CartButton from './CartButton';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useUserProfile';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Handle deep-link hash navigation on initial load
    const hash = window.location.hash.slice(1);
    if (hash && window.location.pathname === '/') {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, []);

  const scrollToSection = (id: string) => {
    // If on payment page, navigate to home first
    if (window.location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
      
      if (window.history.pushState) {
        window.history.pushState(null, '', `#${id}`);
      } else {
        window.location.hash = id;
      }
    }
  };

  const navigateToOrders = () => {
    setIsOpen(false);
    window.history.pushState({}, '', '/orders');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'Products', id: 'products' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 group"
          >
            <img
              src="/assets/generated/dqm-logo.dim_256x256.png"
              alt="P C COMPUTER AND COMMUNICATION"
              className="h-12 w-12 object-contain transition-transform group-hover:scale-110"
            />
            <div className="text-left">
              <h1 className="text-xl font-bold text-foreground leading-tight">
                P C COMPUTER AND COMMUNICATION
              </h1>
              <p className="text-sm text-muted-foreground">Technology Solutions</p>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => scrollToSection(item.id)}
                className="text-foreground hover:text-primary hover:bg-accent"
              >
                {item.label}
              </Button>
            ))}
            {isAuthenticated && (
              <Button
                variant="ghost"
                onClick={navigateToOrders}
                className="text-foreground hover:text-primary hover:bg-accent"
              >
                My Orders
              </Button>
            )}
            <div className="flex items-center gap-2 ml-2">
              <CartButton />
              <LoginButton />
            </div>
            {isAuthenticated && userProfile && (
              <div className="ml-2 text-sm text-muted-foreground">
                {userProfile.name}
              </div>
            )}
          </nav>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => scrollToSection(item.id)}
                    className="justify-start text-lg"
                  >
                    {item.label}
                  </Button>
                ))}
                {isAuthenticated && (
                  <Button
                    variant="ghost"
                    onClick={navigateToOrders}
                    className="justify-start text-lg"
                  >
                    My Orders
                  </Button>
                )}
                <div className="pt-4 space-y-2">
                  <CartButton />
                  <LoginButton />
                  {isAuthenticated && userProfile && (
                    <p className="text-sm text-muted-foreground px-2">
                      Welcome, {userProfile.name}
                    </p>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
