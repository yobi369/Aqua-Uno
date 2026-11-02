import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS, COMPANY_INFO } from '../data/waterData';
import { Plus, Minus, ShoppingBag, MessageCircle, Check, Sparkles } from 'lucide-react';

interface ProductsSectionProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [quantities, setQuantities] = useState<Record<string, number>>(
    PRODUCTS.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {})
  );
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'dispenser', label: '20L & 10L Containers' },
    { id: 'packs', label: 'Packs (500ml, 1L, 1.5L)' },
    { id: 'bottles', label: 'Family 5L' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleQuantityChange = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleAdd = (product: Product) => {
    const qty = quantities[product.id] || 1;
    onAddToCart(product, qty);
    setAddedNotice(product.id);
    setTimeout(() => {
      setAddedNotice((current) => (current === product.id ? null : current));
    }, 2000);
  };

  const handleInstantWhatsApp = (product: Product) => {
    const qty = quantities[product.id] || 1;
    const total = qty * product.price;
    const message = encodeURIComponent(
      `Hello Aqua Uno! I'd like to order:\n` +
      `- ${qty}x ${product.name} (${product.size})\n` +
      `Total: ${COMPANY_INFO.currency} ${total.toLocaleString()}\n\n` +
      `Please let me know how soon you can deliver to my location!`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="products" className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-blue-700 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
            Bottled at Source • Ephrone Industries
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            Our Products
          </h2>
          <p className="text-base text-slate-600 mt-2 font-medium">
            Certified natural spring water for homes, offices, schools, and major hospitality events.
          </p>

          {/* Interactive Category Filter Pills (Functional Buttons) */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 mt-6 bg-slate-100 rounded-xl max-w-xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const currentQty = quantities[product.id] || 1;
            const isAdded = addedNotice === product.id;

            return (
              <div
                key={product.id}
                className="group flex flex-col bg-slate-50/70 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all overflow-hidden"
              >
                {/* Product Image Area */}
                <div className="relative w-full h-56 bg-slate-900 overflow-hidden flex items-center justify-center">
                  {/* High-res realistic product image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gentle gradient scrim to keep tags super legible */}
                  <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

                  {/* Size & Tag Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start z-10">
                    {product.tag && (
                      <span className="bg-blue-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-md">
                        {product.tag}
                      </span>
                    )}
                    <span className="bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-md shadow-xs">
                      {product.size}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {product.name}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="mt-3 py-1.5 px-2 bg-blue-50/80 border border-blue-100 rounded-md">
                      <p className="text-[11px] font-semibold text-blue-900">
                        <span className="font-bold">Best For:</span> {product.bestFor}
                      </p>
                    </div>

                    {/* Features list */}
                    <ul className="mt-3 space-y-1">
                      {product.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing & Order Section */}
                  <div className="pt-4 mt-4 border-t border-slate-200/80">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-xs text-slate-500 font-medium">Price per unit:</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-extrabold text-slate-900">
                            {COMPANY_INFO.currency} {product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-slate-400 line-through">
                              {COMPANY_INFO.currency} {product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden shadow-2xs">
                        <button
                          onClick={() => handleQuantityChange(product.id, -1)}
                          className="p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-slate-800 font-mono">
                          {currentQty}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(product.id, 1)}
                          className="p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleAdd(product)}
                        className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all shadow-xs ${
                          isAdded
                            ? 'bg-blue-800 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Order</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleInstantWhatsApp(product)}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#20ba59] text-white transition-colors shadow-xs"
                        title="Order this product directly on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
