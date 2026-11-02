/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
import { Footer } from './components/Footer';
import { CartDrawerAndOrderModal } from './components/CartDrawerAndOrderModal';
import { MessageCircle, ShoppingBag, Truck, ChevronRight } from 'lucide-react';

export default function App() {
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
    const productsEl = document.getElementById('products');
    if (productsEl) {
      productsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFloatingWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Aqua Uno! I'd like to place an order for fresh water delivery.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      
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
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrderModal={() => setIsCartOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOrderNowClick={handleOrderNowClick} />

        {/* 4 Trust Pillars Strip (100% Pure, Safe & Hygienic, On-Time Delivery, Customer Focused) */}
        <TrustStrip />

        {/* Ephrone Industries Bottling Plant Cinema Tour & TaurusArts Pixieset Gallery */}
        <EphroneMediaGallerySection />

        {/* Products Catalog with interactive quantities & instant WhatsApp action */}
        <ProductsSection onAddToCart={handleAddToCart} />

        {/* Hydration Banner & Interactive Calculator */}
        <HydrationBanner onAddRecommended={handleAddToCart} />

        {/* Aqua Uno Origin, Purification & Mineral Spec Table */}
        <AquaUnoSourceSection />

        {/* Why Choose Us & Customer Testimonials */}
        <WhyChooseUsSection />

        {/* Delivery Coverage Map & Corporate Solutions */}
        <DeliveryCoverageSection />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Contact Us, Hotline & Depot Address */}
        <ContactSection />
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
