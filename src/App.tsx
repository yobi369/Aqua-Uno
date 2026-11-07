/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Product, CartItem } from './types';
import { PRODUCTS, COMPANY_INFO } from './data/waterData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { EphroneMediaGallerySection } from './components/EphroneMediaGallerySection';
import { ProductsSection } from './components/ProductsSection';
import { HydrationBanner } from './components/HydrationBanner';
import { AquaUnoSourceSection } from './components/AquaUnoSourceSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { DeliveryCoverageSection } from './components/DeliveryCoverageSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { TeamSection } from './components/TeamSection';
import { TaurusGalleryPhotosSection } from './components/TaurusGalleryPhotosSection';
import { Footer } from './components/Footer';
import { CartDrawerAndOrderModal } from './components/CartDrawerAndOrderModal';
import { MessageCircle, ShoppingBag, Truck, ChevronRight } from 'lucide-react';

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    const path = window.location.pathname;
    return ['/', '/products', '/about', '/delivery', '/contact'].includes(path) ? path : '/';
  });
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Pre-populate with 1x 20L bottle so the cart has an intuitive starting item
    {
      product: PRODUCTS[0],
      quantity: 2,
      isRefill: true,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartTotalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentPath(['/', '/products', '/about', '/delivery', '/contact'].includes(path) ? path : '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
      });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [currentPath]);

  const handleInternalNavigation = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (event.target as HTMLElement).closest('a');
    if (!anchor || anchor.target || anchor.origin !== window.location.origin) return;

    const destination = new URL(anchor.href);
    if (!['/', '/products', '/about', '/delivery', '/contact'].includes(destination.pathname)) return;
    if (destination.pathname === currentPath && destination.hash) return;

    event.preventDefault();
    window.history.pushState(null, '', `${destination.pathname}${destination.search}${destination.hash}`);
    setCurrentPath(destination.pathname);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity, isRefill: true }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderNowClick = () => {
    window.history.pushState(null, '', '/products');
    setCurrentPath('/products');
  };

  const handleFloatingWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Aqua Uno! I'd like to place an order for fresh water delivery.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800" onClick={handleInternalNavigation}>
      
      {/* Top Banner Notice */}
      <aside aria-label="Special Offers" className="bg-blue-950 text-white text-[11px] sm:text-xs py-2 px-4 text-center font-medium border-b border-blue-900 flex items-center justify-center gap-2">
        <span className="flex items-center gap-1.5 font-semibold text-sky-300">
          <Truck className="w-3.5 h-3.5" /> FREE DELIVERY:
        </span>
        <span>Order 2 or more 20L bottles today for same-day free delivery in Nairobi & Central Region!</span>
        <button
          onClick={handleFloatingWhatsApp}
          className="hidden sm:inline-flex items-center gap-1 text-sky-300 hover:text-white underline font-semibold ml-1"
        >
          Order on WhatsApp <ChevronRight className="w-3 h-3" />
        </button>
      </aside>

      {/* Top Navigation */}
      <Navbar
        cartCount={cartTotalItems}
        currentPath={currentPath}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrderModal={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        {(currentPath === '/' || currentPath === '/home') && (
          <>
            <Hero onOrderNowClick={handleOrderNowClick} />
            <TrustStrip />
            <TaurusGalleryPhotosSection compact />
            <section className="py-16 bg-slate-50 border-b border-slate-200/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                  <div>
                    <span className="text-xs font-bold text-blue-700 tracking-wider uppercase">Find your favourite</span>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight">
                      Aqua Uno for Every Day
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 mt-2">
                      From family-sized bottles to convenient packs for life on the go.
                    </p>
                  </div>
                  <a
                    href="/products"
                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-800"
                  >
                    See all products <ChevronRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {PRODUCTS.slice(0, 4).map((product) => (
                    <a
                      key={product.id}
                      href="/products"
                      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg transition-all"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-blue-50">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] sm:text-xs font-bold text-blue-800 shadow-sm">
                          {product.size}
                        </span>
                      </div>
                      <div className="p-3 sm:p-4">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-700">
                          {product.name}
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-600">
                          {COMPANY_INFO.currency} {product.price.toLocaleString()}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </section>
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-3">
                {[
                  { title: 'Explore our water', description: 'Find the right bottle size for your home, office, or event.', href: '/products', label: 'Browse products' },
                  { title: 'Meet Aqua Uno', description: 'Learn how we source, prepare, and deliver every bottle.', href: '/about', label: 'Our story & team' },
                  { title: 'Delivery to your door', description: 'Check service areas and delivery schedules near you.', href: '/delivery', label: 'View delivery areas' },
                ].map((item) => (
                  <a key={item.href} href={item.href} className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:border-blue-400 hover:bg-white hover:shadow-md transition-all">
                    <h2 className="text-xl font-bold text-slate-900">{item.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                    <span className="mt-5 inline-block text-sm font-bold text-blue-700 group-hover:text-blue-800">{item.label} →</span>
                  </a>
                ))}
              </div>
            </section>
          </>
        )}

        {currentPath === '/products' && (
          <>
            <ProductsSection onAddToCart={handleAddToCart} />
            <HydrationBanner onAddRecommended={handleAddToCart} />
          </>
        )}

        {currentPath === '/about' && (
          <>
            <EphroneMediaGallerySection />
            <AquaUnoSourceSection />
            <WhyChooseUsSection />
            <TeamSection />
            <TaurusGalleryPhotosSection />
          </>
        )}

        {currentPath === '/delivery' && (
          <>
            <DeliveryCoverageSection />
            <FaqSection />
          </>
        )}

        {currentPath === '/contact' && <ContactSection />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Cart & Order Drawer */}
      <CartDrawerAndOrderModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Floating Action Trigger: Bottom Left Cart Pill & Bottom Right WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        {/* Floating Cart Button (if items in cart) */}
        {cartTotalItems > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 bg-slate-900 text-white px-4 py-2.5 rounded-full shadow-xl hover:bg-slate-800 transition-all border border-slate-700 text-xs font-bold"
            title="View Order"
          >
            <ShoppingBag className="w-4 h-4 text-sky-400" />
            <span>Order Summary ({cartTotalItems})</span>
          </button>
        )}

        {/* Floating WhatsApp Action Button */}
        <button
          onClick={handleFloatingWhatsApp}
          className="group relative flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa51] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl transition-all hover:scale-105"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="hidden sm:inline font-bold text-xs tracking-wide">
            Chat with Dispatch
          </span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        </button>
      </div>

    </div>
  );
}
