import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Checkout from './components/Checkout';
import OrderHistory from './components/OrderHistory';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentFailure from './components/PaymentFailure';
import AdminPanel from './components/AdminPanel';
import ProfileSetupModal from './components/ProfileSetupModal';
import StripeSetup from './components/StripeSetup';
import { Toaster } from './components/ui/sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Products />
        <About />
        <Services />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Checkout />
      </main>
      <Footer />
    </div>
  );
}

function OrdersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <OrderHistory />
      </main>
      <Footer />
    </div>
  );
}

function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PaymentSuccess />
      </main>
      <Footer />
    </div>
  );
}

function PaymentFailurePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PaymentFailure />
      </main>
      <Footer />
    </div>
  );
}

function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AdminPanel />
      </main>
      <Footer />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <>
      <RouterProvider router={router} />
      <ProfileSetupModal />
      <StripeSetup />
      <Toaster />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: CheckoutPage,
});

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/orders',
  component: OrdersPage,
});

const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-success',
  component: PaymentSuccessPage,
});

const paymentFailureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-failure',
  component: PaymentFailurePage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  checkoutRoute,
  ordersRoute,
  paymentSuccessRoute,
  paymentFailureRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
