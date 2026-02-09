const Terms = () => {
  return (
    <section id="terms" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          Terms & Conditions
        </h2>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">Overview</h3>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to P C Computer and Communication. By accessing our website and using our services, 
              you agree to comply with and be bound by the following terms and conditions. Please review 
              these terms carefully. If you do not agree to these terms, you should not use this website 
              or our services.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">Products & Pricing</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              All products and services displayed on our website are subject to availability. We reserve 
              the right to modify product descriptions, specifications, and pricing at any time without 
              prior notice. Prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes 
              unless otherwise stated.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Product images are for illustrative purposes only. Actual products may vary slightly in 
              appearance. We strive to display accurate colors and details, but we cannot guarantee that 
              your device's display will accurately reflect the actual product colors.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">Orders & Payments</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              When you place an order with us, you are making an offer to purchase products or services. 
              We reserve the right to accept or decline your order for any reason. Payment must be made 
              in full before products are delivered or services are rendered.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We accept various payment methods including cash, bank transfer, and digital payment platforms. 
              All transactions are processed securely. You are responsible for ensuring that your payment 
              information is accurate and up to date.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">Returns & Refunds</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We want you to be completely satisfied with your purchase. If you are not satisfied with a 
              product, you may return it within 7 days of purchase, provided it is in its original condition 
              with all packaging, accessories, and documentation intact.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Refunds will be processed within 7-10 business days after we receive and inspect the returned 
              product. Certain products, such as opened software or customized items, may not be eligible 
              for return. Please contact us before returning any product to confirm eligibility.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">Warranty & Service</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              All products sold by P C Computer and Communication come with manufacturer warranties where 
              applicable. Warranty terms vary by product and manufacturer. We will assist you with warranty 
              claims and service requests to the best of our ability.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our repair and maintenance services are provided by qualified technicians. We use genuine or 
              compatible parts as appropriate. Service warranties are provided for the work performed and 
              parts replaced, typically ranging from 30 to 90 days depending on the service.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">Privacy</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We respect your privacy and are committed to protecting your personal information. Any 
              information you provide to us through our website or in-store will be used solely for the 
              purpose of fulfilling your orders and providing customer service.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell, trade, or share your personal information with third parties except as 
              necessary to complete transactions or comply with legal requirements. Your contact information 
              may be used to send you updates about your orders or promotional offers, which you can opt 
              out of at any time.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              P C Computer and Communication shall not be liable for any indirect, incidental, special, 
              or consequential damages arising out of or in connection with the use of our products or 
              services. Our total liability shall not exceed the amount paid by you for the specific 
              product or service in question.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We make every effort to ensure the accuracy of information on our website, but we do not 
              warrant that the information is complete, accurate, or up to date. We reserve the right to 
              correct any errors or omissions at any time.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              If you have any questions or concerns about these Terms & Conditions, please contact us:
            </p>
            <ul className="list-none space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">Address:</strong> 37, Dahriya, Mukhani, Haldwani, Nainital, Uttarakhand, 263139</li>
              <li><strong className="text-foreground">Phone:</strong> <a href="tel:9315906829" className="text-primary hover:underline">9315906829</a></li>
              <li><strong className="text-foreground">Email:</strong> <a href="mailto:panerudaya11@gmail.com" className="text-primary hover:underline">panerudaya11@gmail.com</a></li>
            </ul>
          </div>

          <div className="pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground italic">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terms;
