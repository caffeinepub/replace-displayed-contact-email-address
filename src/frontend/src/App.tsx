import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import Documents from './components/Documents';
import Terms from './components/Terms';
import CancellationRefundPolicy from './components/CancellationRefundPolicy';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Products />
          <About />
          <Contact />
          <Documents />
          <Terms />
          <CancellationRefundPolicy />
        </main>
        <Footer />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
