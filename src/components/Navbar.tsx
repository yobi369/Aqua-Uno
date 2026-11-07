import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { ShoppingBag, MessageCircle, Menu, X, PhoneCall } from 'lucide-react';
import { COMPANY_INFO } from '../data/waterData';

interface NavbarProps {
  cartCount: number;
  currentPath: string;
  onOpenCart: () => void;
  onOpenOrderModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, currentPath, onOpenCart }) => {
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
        <div className="flex items-center justify-between gap-3 xl:gap-6">
          {/* Zone 1: Brand Wordmark */}
          <a href="/" className="flex items-center shrink-0 group" aria-label="Aqua Uno home">
            <span className="sm:hidden">
              <Logo variant="compact" showTagline={false} showCorporate={false} />
            </span>
            <span className="hidden sm:block">
              <Logo />
            </span>
          </a>

          {/* Primary page navigation */}
          <nav className="hidden xl:flex items-center gap-3 text-xs font-medium text-slate-700">
            {[
              { href: '/', label: 'Home' },
              { href: '/products', label: 'Products' },
              { href: '/about', label: 'About Us' },
              { href: '/delivery', label: 'Delivery' },
              { href: '/contact', label: 'Contact' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={currentPath === item.href ? 'page' : undefined}
                className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 ${
                  currentPath === item.href ? 'text-blue-600 font-bold' : ''
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action + Cart Drawer Trigger */}
          <div className="flex items-center gap-2 xl:gap-3 shrink-0">
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
              className="hidden sm:inline-flex items-center gap-2 px-3 xl:px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors whitespace-nowrap shrink-0 shadow-xs"
              aria-label="Order on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order on WhatsApp</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-800">
            {[
              { href: '/', label: 'Home' },
              { href: '/products', label: 'Products' },
              { href: '/about', label: 'About & Our Team' },
              { href: '/delivery', label: 'Delivery Areas' },
              { href: '/contact', label: 'Contact Us' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={currentPath === item.href ? 'page' : undefined}
                className={`px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600 ${
                  currentPath === item.href ? 'bg-blue-50 text-blue-700 font-bold' : ''
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
            >
              <MessageCircle className="w-4 h-4" />
              Order on WhatsApp
            </button>
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
