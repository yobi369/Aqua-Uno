import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS, COMPANY_INFO } from '../data/waterData';
import { Plus, Minus, ShoppingBag, MessageCircle, Check } from 'lucide-react';

const NUMERALS: Record<string, string> = {
  'prod-20l': '18.9',
  'prod-18l-disposable': '18.9',
  'prod-10l': '10',
  'prod-5l': '5',
  'prod-1l-pack': '1',
  'prod-500ml-pack': '500',
};

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
    { id: 'dispenser', label: '18.9L & 10L Containers' },
    { id: 'packs', label: 'Packs (500ml, 1L)' },
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
    <section id="products" className="bg-lux-bg py-20 font-sans-lux font-light text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.38em] text-lux-gold">The Collection</p>
          <h2 className="mt-4 font-serif-lux text-4xl font-medium leading-tight text-balance sm:text-6xl">
            Six ways to take Aqua Uno home
          </h2>
          <p className="mt-5 text-lux-mute">
            Every bottle is filled and sealed at our plant in Yatta. Choose the size that fits the occasion.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors ${
                  activeCategory === cat.id
                    ? 'border-lux-gold bg-lux-gold text-lux-bg'
                    : 'border-lux-gold/30 text-lux-mute hover:border-lux-gold hover:text-lux-gold'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial product rows */}
        <div className="divide-y divide-lux-gold/15">
          {filteredProducts.map((product, index) => {
            const currentQty = quantities[product.id] || 1;
            const isAdded = addedNotice === product.id;
            const numeral = NUMERALS[product.id] ?? product.size.split(' ')[0];
            const reversed = index % 2 === 1;

            return (
              <article
                key={product.id}
                className="grid items-center gap-8 py-16 text-center md:grid-cols-2 md:gap-16 md:text-left"
              >
                <div className={`relative mx-auto w-full max-w-[420px] ${reversed ? 'md:order-2' : ''}`}>
                  <span
                    aria-hidden="true"
                    className="lux-numeral pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[52%] whitespace-nowrap font-serif-lux text-[10rem] font-semibold leading-none tracking-tighter sm:text-[15rem]"
                  >
                    {numeral}
                  </span>
                  <div className="lux-arch relative z-10 mx-auto aspect-[3/4] w-[78%] bg-lux-bg2">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover contrast-105 saturate-105"
                    />
                  </div>
                </div>

                <div className="mx-auto max-w-md md:mx-0">
                  {product.tag && (
                    <p className="text-xs uppercase tracking-[0.34em] text-lux-gold">{product.tag}</p>
                  )}
                  <h3 className="mt-3 font-serif-lux text-4xl font-medium leading-[1.08] sm:text-5xl">{product.name}</h3>
                  <p className="mt-5 leading-relaxed text-slate-300">{product.description}</p>
                  <p className="mt-6 border-t border-lux-gold/25 pt-5 text-xs uppercase tracking-[0.22em] text-lux-mute">
                    {product.bestFor}
                  </p>

                  <div className="mt-7 flex flex-wrap items-center justify-center gap-5 md:justify-start">
                    <span className="font-serif-lux text-4xl text-white">
                      {COMPANY_INFO.currency} {product.price.toLocaleString()}
                    </span>
                    <div className="flex items-center border border-lux-gold/30">
                      <button
                        onClick={() => handleQuantityChange(product.id, -1)}
                        className="p-2 text-lux-gold hover:bg-white/10"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-medium">{currentQty}</span>
                      <button
                        onClick={() => handleQuantityChange(product.id, 1)}
                        className="p-2 text-lux-gold hover:bg-white/10"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
                    <button
                      onClick={() => handleAdd(product)}
                      className="inline-flex items-center justify-center gap-2 border border-lux-gold bg-lux-gold px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-lux-bg transition-colors hover:bg-[#efe4c8]"
                    >
                      {isAdded ? <Check className="h-3.5 w-3.5" /> : <ShoppingBag className="h-3.5 w-3.5" />}
                      {isAdded ? 'Added' : 'Add to order'}
                    </button>
                    <button
                      onClick={() => handleInstantWhatsApp(product)}
                      className="inline-flex items-center justify-center gap-2 border border-lux-gold/50 px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-lux-gold transition-colors hover:border-lux-gold hover:bg-white/10"
                      title="Order this product directly on WhatsApp"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      WhatsApp
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
