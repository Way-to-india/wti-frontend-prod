import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
      <footer className="bg-[#1a1d29] text-white">
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center lg:text-left">
              Subscribe to our newsletter
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto max-w-2xl">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-96 px-6 py-3 rounded-full bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-brand-gold hover:bg-orange-600 text-white font-medium transition-colors duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          <div className="space-y-6">
            <div className="w-48">
              <Image
                src="/logo.png"
                alt="Wayto India"
                width={200}
                height={60}
                className="w-full h-auto"
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Way to India has created a niche for itself in the travel industry in India by providing customized tour options to discerning tourists.
            </p>
            <p className="text-gray-400 text-xs">
              © 2014 - 2024 WaytoIndia. All Rights Reserved.
            </p>
          </div>

          
          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/hotels" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="/tours" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">
                  Tours and Packages
                </Link>
              </li>
              <li>
                <Link href="/air-charter" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">
                  Air Charter Facility
                </Link>
              </li>
              <li>
                <Link href="/transportation" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">
                  Transportation
                </Link>
              </li>
              <li>
                <Link href="/plan-tour" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">
                  Plan My Tour
                </Link>
              </li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-lg font-semibold mb-6">About</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/services" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/awards" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">
                  Recognition and Awards
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">
                  Our Partners
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">
                  Help & FAQ
                </Link>
              </li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-lg font-semibold mb-6">Get Involved</h3>
            <ul className="space-y-4 mb-8">
              <li>
                <Link href="/newsletter" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">
                  Subscribe our Newsletter
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">
                  Feedback
                </Link>
              </li>
            </ul>

            
            <div className="flex items-center gap-4">
              <Link href="https://twitter.com" target="_blank" className="text-gray-300 hover:text-orange-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
              <Link href="https://instagram.com" target="_blank" className="text-gray-300 hover:text-orange-500 transition-colors">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="mailto:contact@waytoindia.com" className="text-gray-300 hover:text-orange-500 transition-colors">
                <Mail className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;