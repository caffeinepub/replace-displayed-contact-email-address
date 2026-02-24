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
import { useCart } from '@/hooks/useCart';
import { ProductCategory, Product } from '../backend';
import { toast } from 'sonner';

const Products = () => {
  const { data: products, isLoading } = useGetAllAvailableProducts();
  const { addToCart } = useCart();

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
    return `₹${(Number(price) / 100).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
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

  const handleAddToCart = (product: Product) => {
    if (!product.price) {
      toast.error('Price not available. Please contact us for pricing.');
      return;
    }

    const imageSource = getImageSource(product);

    addToCart({
      productId: product.id.toString(),
      productName: product.name,
      productDescription: product.description || 'No description',
      priceInCents: product.price,
      currency: 'INR',
      imageUrl: imageSource || undefined,
    });

    toast.success(`${product.name} added to cart!`);
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
                              onClick={() => handleAddToCart(product)}
                              disabled={!product.price}
                            >
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Add to Cart
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
