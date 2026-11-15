import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { ShoppingBag, MessageCircle, Menu, X, PhoneCall } from 'lucide-react';
import { COMPANY_INFO } from '../data/waterData';

interface NavbarProps {
  cartCount: number;
  currentPath: string;
  onOpenCart: () => void;
  onOpenOrderModal: () => void;
}

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'The range' },
  { href: '/about', label: 'Our story' },
  { href: '/delivery', label: 'Delivery' },
  { href: '/contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ cartCount, currentPath, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent('Hello Aqua Uno! I would like to make an inquiry or place an order for water delivery.');
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <header className={`sticky top-0 z-40 w-full border-b border-[#132b35]/15 bg-[#f3f1e9]/95 transition-shadow duration-300 ${isScrolled ? 'shadow-[0_8px_24px_rgba(19,43,53,0.06)] backdrop-blur-sm' : ''}`}>
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-[5.5vw]">
        <a href="/" className="shrink-0" aria-label="Aqua Uno home">
          <Logo variant="compact" showTagline={false} showCorporate={false} />
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {links.map((item, index) => (
            <a key={item.href} href={item.href} aria-current={currentPath === item.href ? 'page' : undefined}
              className={`relative py-2 text-[9px] font-bold uppercase tracking-[0.2em] transition-colors ${currentPath === item.href ? 'text-[#164cbd]' : 'text-[#52666c] hover:text-[#164cbd]'}`}>
              {item.label}
              {currentPath === item.href && <span className="absolute bottom-0 left-0 h-px w-full bg-[#164cbd]" />}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          <button onClick={handleWhatsAppClick} className="hidden items-center gap-2 border-b border-[#164cbd]/60 pb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#164cbd] transition-colors hover:border-[#132b35] hover:text-[#132b35] sm:inline-flex">
            <MessageCircle className="h-3.5 w-3.5" /> Order direct
          </button>
          <button onClick={onOpenCart} className="relative inline-flex h-9 w-9 items-center justify-center text-[#132b35] transition-colors hover:text-[#164cbd]" aria-label="View order">
            <ShoppingBag className="h-[18px] w-[18px]" />
            {cartCount > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#164cbd] px-1 text-[9px] font-bold text-white">{cartCount}</span>}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="inline-flex h-9 w-9 items-center justify-center text-[#132b35] lg:hidden" aria-label="Toggle navigation menu" aria-expanded={mobileMenuOpen}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-[#132b35]/15 bg-[#f3f1e9] px-6 pb-6 pt-3 lg:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {links.map((item, index) => (
              <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} aria-current={currentPath === item.href ? 'page' : undefined}
                className={`flex items-center justify-between border-b border-[#132b35]/10 py-3 font-[Outfit] text-xl ${currentPath === item.href ? 'text-[#164cbd]' : 'text-[#132b35]'}`}>
                <span>{item.label}</span><span className="text-[9px] tracking-[0.2em] text-[#849092]">0{index + 1}</span>
              </a>
            ))}
          </nav>
          <div className="mt-5 flex flex-col gap-3">
            <button onClick={handleWhatsAppClick} className="flex items-center justify-center gap-2 bg-[#164cbd] px-4 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white">
              <MessageCircle className="h-4 w-4" /> Order on WhatsApp
            </button>
            <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center justify-center gap-2 py-2 text-xs font-semibold text-[#52666c]">
              <PhoneCall className="h-4 w-4" /> {COMPANY_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
