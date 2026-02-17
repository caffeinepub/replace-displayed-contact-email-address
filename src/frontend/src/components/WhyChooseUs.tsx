import { Award, Shield, Clock, HeadphonesIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Award,
      title: 'Quality Products',
      description: 'Only genuine products from authorized brands with full warranty coverage'
    },
    {
      icon: Shield,
      title: 'Trusted Service',
      description: 'Years of experience serving satisfied customers with reliable solutions'
    },
    {
      icon: Clock,
      title: 'Fast Delivery',
      description: 'Quick turnaround on repairs and prompt delivery of products'
    },
    {
      icon: HeadphonesIcon,
      title: 'Expert Support',
      description: 'Dedicated customer support team ready to assist you anytime'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the P C COMPUTER AND COMMUNICATION difference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto p-4 bg-primary/10 rounded-full w-fit mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
