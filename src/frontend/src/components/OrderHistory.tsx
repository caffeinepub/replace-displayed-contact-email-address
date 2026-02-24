import { useGetOrders } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Package, ArrowLeft, ShoppingBag } from 'lucide-react';
import { OrderStatus } from '../backend';

export default function OrderHistory() {
  const { data: orders, isLoading } = useGetOrders();
  const { identity } = useInternetIdentity();

  const isAuthenticated = !!identity;

  const handleBack = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000); // Convert nanoseconds to milliseconds
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (priceInCents?: bigint) => {
    if (!priceInCents) return 'N/A';
    return `₹${(Number(priceInCents) / 100).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getStatusBadge = (status: OrderStatus) => {
    if ('pending' in status) {
      return <Badge variant="outline">Pending</Badge>;
    }
    if ('completed' in status) {
      return <Badge className="bg-green-600 hover:bg-green-700">Completed</Badge>;
    }
    if ('failed' in status) {
      return <Badge variant="destructive">Failed</Badge>;
    }
    return <Badge variant="outline">Unknown</Badge>;
  };

  if (!isAuthenticated) {
    return (
      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle>Login Required</CardTitle>
            <CardDescription>Please log in to view your order history</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Order History</h1>
          <p className="text-muted-foreground">View and track all your orders</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : orders && orders.length > 0 ? (
          <div className="space-y-4">
            {orders
              .sort((a, b) => Number(b.createdAt - a.createdAt))
              .map((order) => (
                <Card key={Number(order.id)}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Package className="h-5 w-5" />
                          Order #{Number(order.id)}
                        </CardTitle>
                        <CardDescription>{formatDate(order.createdAt)}</CardDescription>
                      </div>
                      {getStatusBadge(order.paymentStatus)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Items</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <div>
                              <p className="font-medium">{item.productName}</p>
                              <p className="text-muted-foreground">
                                Qty: {Number(item.quantity)}
                              </p>
                            </div>
                            <p className="font-medium">
                              {formatPrice(item.priceInCents)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>{formatPrice(order.amountCents)}</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        <span className="font-medium">Email:</span> {order.email}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span> {order.phone}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-6">
                Start shopping to see your orders here
              </p>
              <Button onClick={handleBack}>Browse Products</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
