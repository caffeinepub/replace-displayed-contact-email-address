import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '../hooks/useCart';
import { useEffect } from 'react';

const PaymentSuccess = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart on successful payment
    clearCart();
  }, [clearCart]);

  const handleContinueShopping = () => {
    window.location.href = '/';
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 bg-green-100 dark:bg-green-900/20 rounded-full w-fit">
            <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-3xl">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-lg text-muted-foreground">
            Thank you for your purchase. Your order has been confirmed and will be processed shortly.
          </p>
          <p className="text-muted-foreground">
            You will receive an email confirmation with your order details. You can also view your order in the Order History section.
          </p>
          <div className="pt-4">
            <Button size="lg" onClick={handleContinueShopping} className="group">
              Continue Shopping
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PaymentSuccess;
