import {
  Monitor,
  Laptop,
  Cable,
  Wifi,
  Radio,
  Wrench,
  Loader2,
  ImageOff
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGetAllAvailableProducts } from '@/hooks/useQueries';
import { ProductCategory, Product } from '../backend';

const Products = () => {
  const { data: products, isLoading } = useGetAllAvailableProducts();

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
    // Prefer static imageUrl if available
    if (product.imageUrl) {
      return product.imageUrl;
    }
    // Fallback to ExternalBlob if available
    if (product.image) {
      return product.image.getDirectURL();
    }
    return null;
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
    <section id="products" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Products & Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive technology solutions for all your computer and communication needs
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
                          className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
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
                          <CardHeader>
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
                                  Contact for price
                                </Badge>
                              )}
                            </div>
                            <CardDescription className="text-sm line-clamp-3">
                              {product.description || 'No description available'}
                            </CardDescription>
                          </CardHeader>
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
