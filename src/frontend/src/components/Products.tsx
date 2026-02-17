import {
  Monitor,
  Laptop,
  Cable,
  Wifi,
  Radio,
  Wrench,
  Loader2,
  ImageOff,
  ShoppingCart
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useGetAllAvailableProducts } from '@/hooks/useQueries';
import { useCreateCheckoutSession } from '@/hooks/useCreateCheckoutSession';
import { ProductCategory, Product } from '../backend';
import { toast } from 'sonner';
import { useState } from 'react';

const Products = () => {
  const { data: products, isLoading } = useGetAllAvailableProducts();
  const createCheckoutSession = useCreateCheckoutSession();
  const [purchasingProductId, setPurchasingProductId] = useState<bigint | null>(null);

  const categoryIcons = {
    [ProductCategory.Computers]: Monitor,
    [ProductCategory.Accessories]: Cable,
    [ProductCategory.Networking]: Wifi,
    [ProductCategory.Communication]: Radio,
    [ProductCategory.Services]: Wrench
  };

  const categoryLabels = {
    [ProductCategory.Computers]: 'Computers',
    [ProductCategory.Accessories]: 'Accessories',
    [ProductCategory.Networking]: 'Networking',
    [ProductCategory.Communication]: 'Communication',
    [ProductCategory.Services]: 'Services'
  };

  const formatPrice = (price?: bigint) => {
    if (!price) return null;
    return `₹${Number(price).toLocaleString('en-IN')}`;
  };

  const getImageSource = (product: Product) => {
    if (product.imageUrl) {
      return product.imageUrl;
    }
    if (product.image) {
      return product.image.getDirectURL();
    }
    return null;
  };

  const handleBuyNow = async (product: Product) => {
    if (!product.price) {
      toast.error('Price not available. Please contact us for pricing.');
      return;
    }

    setPurchasingProductId(product.id);

    try {
      const shoppingItems = [{
        productName: product.name,
        productDescription: product.description || 'No description',
        priceInCents: product.price,
        quantity: BigInt(1),
        currency: 'INR'
      }];

      const session = await createCheckoutSession.mutateAsync(shoppingItems);
      
      if (!session?.url) {
        throw new Error('Stripe session missing url');
      }

      window.location.href = session.url;
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Failed to initiate checkout. Please try again.');
      setPurchasingProductId(null);
    }
  };

  const groupedProducts = products?.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<ProductCategory, typeof products>);

  return (
    <section id="products" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse our selection of quality computer hardware and accessories
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {groupedProducts && Object.entries(groupedProducts).map(([category, categoryProducts]) => {
              const Icon = categoryIcons[category as ProductCategory];
              const label = categoryLabels[category as ProductCategory];
              
              return (
                <div key={category} className="mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-3xl font-bold text-foreground">
                      {label}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categoryProducts.map((product) => {
                      const imageSource = getImageSource(product);
                      const isPurchasing = purchasingProductId === product.id;
                      
                      return (
                        <Card
                          key={Number(product.id)}
                          className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
                        >
                          <div className="aspect-[4/3] overflow-hidden bg-muted">
                            {imageSource ? (
                              <img
                                src={imageSource}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageOff className="h-16 w-16 text-muted-foreground/30" />
                              </div>
                            )}
                          </div>
                          <CardHeader className="flex-grow">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <CardTitle className="text-lg leading-tight">
                                {product.name}
                              </CardTitle>
                              {product.price ? (
                                <Badge variant="default" className="shrink-0">
                                  {formatPrice(product.price)}
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="shrink-0">
                                  Contact
                                </Badge>
                              )}
                            </div>
                            <CardDescription className="text-sm line-clamp-3">
                              {product.description || 'No description available'}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <Button
                              className="w-full"
                              onClick={() => handleBuyNow(product)}
                              disabled={!product.price || isPurchasing}
                            >
                              {isPurchasing ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <ShoppingCart className="mr-2 h-4 w-4" />
                                  Buy Now
                                </>
                              )}
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {(!products || products.length === 0) && !isLoading && (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">
                  No products available at the moment. Please check back later.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Products;
