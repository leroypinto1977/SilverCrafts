'use client';

import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-navy text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-2xl font-bold text-gold mb-4">
              SilverCrafts
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              SilverCrafts is a family-run company and a leading exporter of high-quality 
              sterling silver and silverware. We bring you the finest European craftsmanship 
              with centuries of expertise.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><a href="#cutlery" className="text-gray-300 hover:text-gold transition-colors">Cutlery</a></li>
              <li><a href="#serving" className="text-gray-300 hover:text-gold transition-colors">Serving Sets</a></li>
              <li><a href="#flatware" className="text-gray-300 hover:text-gold transition-colors">Flatware</a></li>
              <li><a href="#accessories" className="text-gray-300 hover:text-gold transition-colors">Accessories</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#faq" className="text-gray-300 hover:text-gold transition-colors">FAQ</a></li>
              <li><a href="#testimonial" className="text-gray-300 hover:text-gold transition-colors">Testimonial</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-gold transition-colors">Contact</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-gold transition-colors">About</a></li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Buyer Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Customer Care</h4>
            <ul className="space-y-2">
              <li><a href="#payment" className="text-gray-300 hover:text-gold transition-colors">Payment</a></li>
              <li><a href="#shipping" className="text-gray-300 hover:text-gold transition-colors">Shipping</a></li>
              <li><a href="#returns" className="text-gray-300 hover:text-gold transition-colors">Returns</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-4">Stay updated with our latest collections and exclusive offers.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-gold"
              />
              <Button variant="default" size="default" className="bg-gold text-white hover:bg-gold/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Payment Icons and Copyright */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-4 text-sm text-gray-300">
              <span>Payment methods:</span>
              <span>Visa • MasterCard • PayPal • Stripe • American Express</span>
            </div>
            <div className="text-sm text-gray-300">
              © SilverCrafts 2023. All Rights Reserved
            </div>
          </div>
          <div className="flex justify-center md:justify-start space-x-6 mt-4 text-sm">
            <a href="#privacy" className="text-gray-300 hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#shipping" className="text-gray-300 hover:text-gold transition-colors">Shipping Info</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;