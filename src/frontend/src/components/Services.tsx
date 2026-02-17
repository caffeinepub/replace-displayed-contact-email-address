import { Monitor, Wrench, Wifi, HardDrive, Laptop, Printer } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Services = () => {
  const services = [
    {
      icon: Monitor,
      title: 'Computer Sales',
      description: 'Latest desktops, laptops, and workstations from top brands with warranty and support.'
    },
    {
      icon: Wrench,
      title: 'Repair & Maintenance',
      description: 'Expert hardware and software repair services with quick turnaround times.'
    },
    {
      icon: Wifi,
      title: 'Networking Solutions',
      description: 'Complete network setup, configuration, and troubleshooting for homes and offices.'
    },
    {
      icon: HardDrive,
      title: 'Data Recovery',
      description: 'Professional data recovery services for hard drives, SSDs, and storage devices.'
    },
    {
      icon: Laptop,
      title: 'Laptop Services',
      description: 'Screen replacement, keyboard repair, battery replacement, and upgrades.'
    },
    {
      icon: Printer,
      title: 'Printer Solutions',
      description: 'Printer sales, repair, and maintenance with genuine parts and supplies.'
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive technology solutions tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
