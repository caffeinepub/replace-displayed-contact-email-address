import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentFailure from './components/PaymentFailure';
import Checkout from './components/Checkout';
import OrderHistory from './components/OrderHistory';
import Footer from './components/Footer';
import ProfileSetupModal from './components/ProfileSetupModal';
import StripeSetup from './components/StripeSetup';

const queryClient = new QueryClient();

function AppContent() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Render payment success page
  if (currentPath === '/payment-success') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <PaymentSuccess />
        <Footer />
      </div>
    );
  }

  // Render payment failure page
  if (currentPath === '/payment-failure') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <PaymentFailure />
        <Footer />
      </div>
    );
  }

  // Render checkout page
  if (currentPath === '/checkout') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Checkout />
        <Footer />
      </div>
    );
  }

  // Render order history page
  if (currentPath === '/orders') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <OrderHistory />
        <Footer />
      </div>
    );
  }

  // Render main site
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProfileSetupModal />
      <StripeSetup />
      <main>
        <Hero />
        <Services />
        <Products />
        <About />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <AppContent />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
