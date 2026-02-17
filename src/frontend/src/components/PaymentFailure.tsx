import { XCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PaymentFailure = () => {
  const handleReturnToShop = () => {
    window.location.href = '/';
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 bg-red-100 dark:bg-red-900/20 rounded-full w-fit">
            <XCircle className="h-16 w-16 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-3xl">Payment Cancelled</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-lg text-muted-foreground">
            Your payment was cancelled or failed to process. No charges have been made to your account.
          </p>
          <p className="text-muted-foreground">
            If you experienced any issues during checkout, please contact our support team for assistance.
          </p>
          <div className="pt-4">
            <Button size="lg" onClick={handleReturnToShop} className="group">
              <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
              Return to Shop
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PaymentFailure;
