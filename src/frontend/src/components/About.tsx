import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About P C COMPUTER AND COMMUNICATION
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your trusted technology partner since day one
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="/assets/generated/dqm-section-1.dim_1200x800.jpg"
              alt="P C COMPUTER AND COMMUNICATION store and services"
              className="rounded-lg shadow-xl w-full"
            />
          </div>

          <div>
            <h3 className="text-3xl font-bold text-foreground mb-6">
              Quality Technology Solutions
            </h3>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                P C COMPUTER AND COMMUNICATION is your one-stop destination for all computer hardware, 
                accessories, and technology services. We pride ourselves on offering 
                premium quality products at competitive prices.
              </p>
              <p>
                Our experienced team provides expert guidance to help you choose the 
                right technology solutions for your needs, whether for home, office, 
                or gaming.
              </p>
              <p>
                With a commitment to customer satisfaction and after-sales support, 
                we ensure that your technology investment delivers lasting value.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-3xl font-bold text-foreground mb-6">
              Expert Service & Support
            </h3>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Our certified technicians provide professional repair and maintenance 
                services for all types of computer hardware. From simple upgrades to 
                complex repairs, we handle it all.
              </p>
              <p>
                We use only genuine parts and follow industry best practices to ensure 
                your devices perform at their best. Fast turnaround times and transparent 
                pricing are our guarantee.
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <img
              src="/assets/generated/dqm-section-2.dim_1200x800.jpg"
              alt="P C COMPUTER AND COMMUNICATION repair and support services"
              className="rounded-lg shadow-xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
