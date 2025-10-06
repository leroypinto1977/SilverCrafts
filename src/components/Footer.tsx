"use client";

import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="text-white py-16 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, hsl(210, 68%, 15%) 0%, hsl(210, 68%, 10%) 50%, hsl(210, 68%, 15%) 100%)",
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gold/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-3xl font-bold text-gold mb-4">
              SilverCrafts
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md font-sans">
              India&apos;s premier B2B silverware manufacturer, crafting
              excellence since 1985. We combine traditional craftsmanship with
              modern innovation to deliver silverware that exceeds expectations
              in both quality and design.
            </p>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 text-gold" />
                <span className="font-sans">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-gold" />
                <span className="font-sans">info@silvercrafts.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-5 h-5 text-gold" />
                <span className="font-sans">Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xl font-semibold mb-6 text-gold">
              Products
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/products"
                  className="text-gray-300 hover:text-gold transition-colors duration-300 font-sans"
                >
                  All Products
                </a>
              </li>
              <li>
                <a
                  href="/products?category=bowls"
                  className="text-gray-300 hover:text-gold transition-colors duration-300 font-sans"
                >
                  Silver Bowls
                </a>
              </li>
              <li>
                <a
                  href="/products?category=vessels"
                  className="text-gray-300 hover:text-gold transition-colors duration-300 font-sans"
                >
                  Vessels
                </a>
              </li>
              <li>
                <a
                  href="/products?category=glasses"
                  className="text-gray-300 hover:text-gold transition-colors duration-300 font-sans"
                >
                  Silver Glasses
                </a>
              </li>
              <li>
                <a
                  href="/products?category=trays"
                  className="text-gray-300 hover:text-gold transition-colors duration-300 font-sans"
                >
                  Serving Trays
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading text-xl font-semibold mb-6 text-gold">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-gold transition-colors duration-300 font-sans"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-gold transition-colors duration-300 font-sans"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#quality"
                  className="text-gray-300 hover:text-gold transition-colors duration-300 font-sans"
                >
                  Quality Promise
                </a>
              </li>
              <li>
                <a
                  href="#craftsmanship"
                  className="text-gray-300 hover:text-gold transition-colors duration-300 font-sans"
                >
                  Craftsmanship
                </a>
              </li>
              <li>
                <a
                  href="#certifications"
                  className="text-gray-300 hover:text-gold transition-colors duration-300 font-sans"
                >
                  Certifications
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-gold/20">
          <div className="text-center">
            <h4 className="font-heading text-2xl font-bold mb-4 text-gold">
              Stay Connected
            </h4>
            <p className="text-gray-300 mb-6 font-sans max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive updates on new
              collections, special offers, and behind-the-scenes glimpses of our
              craftsmanship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300 font-sans"
              />
              <Button className="bg-gold text-navy hover:bg-navy hover:text-gold font-sans font-semibold px-8 py-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-8">
          <div className="flex items-center space-x-3 text-gray-300">
            <Clock className="w-5 h-5 text-gold" />
            <div className="font-sans">
              <span className="font-semibold">Business Hours:</span> Mon-Fri
              9:00 AM - 6:00 PM IST
            </div>
          </div>
          <div className="text-gray-300 font-sans">
            <span className="font-semibold">Established:</span> Since 1985
          </div>
        </div>

        {/* Payment Icons and Copyright */}
        <div className="border-t border-gold/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <span className="text-sm text-gray-300 font-sans">
                Payment methods:
              </span>
              <div className="flex space-x-2 text-xs text-gray-400 font-sans">
                <span>Visa</span> • <span>MasterCard</span> • <span>UPI</span> •{" "}
                <span>Net Banking</span> • <span>Bank Transfer</span>
              </div>
            </div>
            <div className="text-sm text-gray-300 font-sans">
              © 2024 SilverCrafts. All Rights Reserved
            </div>
          </div>
          <div className="flex justify-center md:justify-start space-x-6 mt-4 text-sm">
            <a
              href="#privacy"
              className="text-gray-300 hover:text-gold transition-colors duration-300 font-sans"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="text-gray-300 hover:text-gold transition-colors duration-300 font-sans"
            >
              Terms of Service
            </a>
            <a
              href="#shipping"
              className="text-gray-300 hover:text-gold transition-colors duration-300 font-sans"
            >
              Shipping Info
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
