import { Award, Users, Clock, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const values = [
    {
      icon: Award,
      title: 'Quality Products',
      description: 'We source only the best electronics and computer equipment from trusted manufacturers'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Our experienced technicians provide professional service and support'
    },
    {
      icon: Clock,
      title: 'Reliable Service',
      description: 'Fast turnaround times and dependable solutions for all your technology needs'
    },
    {
      icon: Target,
      title: 'Customer Focus',
      description: 'Your satisfaction is our priority, with personalized attention to every client'
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your trusted partner in technology solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="/assets/generated/storefront-photo-phone-9315906829.dim_1200x800.jpg"
              alt="P C Computer and Communication storefront with services including sales, repairs, gaming, and cartridges"
              className="rounded-lg shadow-xl w-full"
            />
          </div>

          <div>
            <h3 className="text-3xl font-bold text-foreground mb-6">
              Leading Electronics & Communication Provider
            </h3>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                P C Computer and Communication is a professional electronics and
                communication company dedicated to providing high-quality products
                and services to businesses and individuals.
              </p>
              <p>
                With years of experience in the industry, we have built a
                reputation for excellence in computer sales, communication
                equipment, and technical support services. Our team of skilled
                technicians is committed to delivering reliable solutions that meet
                your specific needs.
              </p>
              <p>
                We pride ourselves on staying current with the latest technology
                trends and offering competitive prices without compromising on
                quality. Whether you need a new computer system, network setup, or
                repair services, we're here to help.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="pt-6">
                    <div className="mb-4 p-4 bg-primary/10 rounded-full w-fit mx-auto">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="text-xl font-semibold text-foreground mb-2">
                      {value.title}
                    </h4>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
