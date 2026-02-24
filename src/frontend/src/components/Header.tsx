import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import LoginButton from './LoginButton';
import CartButton from './CartButton';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQuery } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { actor } = useActor();
  const isAuthenticated = !!identity;

  const { data: isAdmin } = useQuery({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && isAuthenticated,
  });

  const scrollToSection = (sectionId: string) => {
    const currentPath = window.location.pathname;
    
    if (currentPath !== '/') {
      navigate({ to: '/' });
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate({ to: path });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavigation('/')}>
            <img src="/assets/generated/pc-logo-transparent.dim_200x200.png" alt="PC Computer Logo" className="h-10 w-10" />
            <span className="text-xl font-bold text-primary">P C COMPUTER</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => scrollToSection('hero')} className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('products')} className="text-sm font-medium hover:text-primary transition-colors">
              Products
            </button>
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-primary transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection('services')} className="text-sm font-medium hover:text-primary transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </button>
            {isAuthenticated && (
              <button onClick={() => handleNavigation('/orders')} className="text-sm font-medium hover:text-primary transition-colors">
                My Orders
              </button>
            )}
            {isAdmin && (
              <button onClick={() => handleNavigation('/admin')} className="text-sm font-medium hover:text-primary transition-colors">
                Admin
              </button>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <CartButton />
            <LoginButton />
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('hero')} className="text-sm font-medium hover:text-primary transition-colors text-left">
                Home
              </button>
              <button onClick={() => scrollToSection('products')} className="text-sm font-medium hover:text-primary transition-colors text-left">
                Products
              </button>
              <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-primary transition-colors text-left">
                About
              </button>
              <button onClick={() => scrollToSection('services')} className="text-sm font-medium hover:text-primary transition-colors text-left">
                Services
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-sm font-medium hover:text-primary transition-colors text-left">
                Contact
              </button>
              {isAuthenticated && (
                <button onClick={() => handleNavigation('/orders')} className="text-sm font-medium hover:text-primary transition-colors text-left">
                  My Orders
                </button>
              )}
              {isAdmin && (
                <button onClick={() => handleNavigation('/admin')} className="text-sm font-medium hover:text-primary transition-colors text-left">
                  Admin
                </button>
              )}
              <div className="flex items-center space-x-4 pt-4">
                <CartButton />
                <LoginButton />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
