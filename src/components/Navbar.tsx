import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { ShoppingBag, MessageCircle, Menu, X, PhoneCall } from 'lucide-react';
import { COMPANY_INFO } from '../data/waterData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenOrderModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(`Hello Aqua Uno! I'd like to make an inquiry / place an order for fresh water delivery.`);
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-3'
          : 'bg-white border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a href="#" className="flex items-center shrink-0 group">
            <Logo />
          </a>

          {/* Zone 2: 4-5 Concise Single-line Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
            <a
              href="#products"
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
            >
              Our Products
            </a>
            <a
              href="#facility-tour"
              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              Factory & Media Tour
            </a>
            <a
              href="#source"
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
            >
              Aqua Uno Source
            </a>
            <a
              href="#why-us"
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
            >
              Why Choose Us
            </a>
            <a
              href="#calculator"
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
            >
              Hydration Guide
            </a>
            <a
              href="#delivery"
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
            >
              Delivery Zones
            </a>
            <a
              href="#contact"
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
            >
              Contact Us
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Cart Drawer Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors flex items-center justify-center"
              aria-label="View shopping cart"
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-scaleIn">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Action Button: Order on WhatsApp */}
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order on WhatsApp</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-800">
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600"
            >
              Our Products
            </a>
            <a
              href="#facility-tour"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md bg-blue-50 text-blue-700 font-bold"
            >
              Factory Tour & TaurusArts Gallery
            </a>
            <a
              href="#source"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600"
            >
              Aqua Uno Spring Source
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600"
            >
              Why Choose Us
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600"
            >
              Hydration Calculator
            </a>
            <a
              href="#delivery"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600"
            >
              Delivery Coverage & Rates
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600"
            >
              Contact & Depot Locations
            </a>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 text-xs font-semibold hover:bg-slate-50"
            >
              <PhoneCall className="w-4 h-4 text-blue-600" />
              Call Dispatch: {COMPANY_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
