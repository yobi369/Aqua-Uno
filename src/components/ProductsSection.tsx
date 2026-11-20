import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS, COMPANY_INFO } from '../data/waterData';
import { Plus, Minus, ShoppingBag, MessageCircle, Check } from 'lucide-react';
import { cutouts } from './Hero';
import './home.css';

const CUTOUT: Record<string, keyof typeof cutouts> = {
  'prod-20l': 'refill',
  'prod-18l-disposable': 'oneway',
  'prod-10l': 'l10',
  'prod-5l': 'l5pack',
  'prod-1l-pack': 'pack1l',
  'prod-1-5l-pack': 'l15',
  'prod-500ml-pack': 'pack500',
};

const NUMERALS: Record<string, string> = {
  'prod-20l': '18.9',
  'prod-18l-disposable': '18.9',
  'prod-10l': '10',
  'prod-5l': '4×5',
  'prod-1l-pack': '1',
  'prod-1-5l-pack': '1.5',
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
    <div className="aq-home">
      <section id="products" className="pg">
        <div className="wrap">
          <div className="head">
            <p className="eyebrow">The collection</p>
            <h2>Six ways to take Aqua Uno home</h2>
            <p>Every bottle is filled and sealed at our plant in Yatta. Choose the size that fits the occasion.</p>
            <div className="cats">
              {categories.map((cat) => (
                <button key={cat.id} type="button" onClick={() => setActiveCategory(cat.id)} className={activeCategory === cat.id ? 'on' : ''}>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="plist">
            {filteredProducts.map((product, index) => {
              const currentQty = quantities[product.id] || 1;
              const isAdded = addedNotice === product.id;
              const numeral = NUMERALS[product.id] ?? product.size.split(' ')[0];
              const cut = CUTOUT[product.id];
              return (
                <article key={product.id} className={`prow${index % 2 === 1 ? ' rev' : ''}`}>
                  <div className="pimg">
                    <span className="pnum" aria-hidden="true">{numeral}</span>
                    <img src={cut ? cutouts[cut] : product.image} alt={product.name} loading="lazy" />
                    <div className="floor" />
                  </div>
                  <div className="pinfo">
                    {product.tag && <span className="chip">{product.tag}</span>}
                    <h3>{product.name}</h3>
                    <p className="pdesc">{product.description}</p>
                    <p className="pbest">{product.bestFor}</p>
                    <div className="pbuy">
                      <span className="pprice">{COMPANY_INFO.currency} {product.price.toLocaleString()}</span>
                      <div className="qty">
                        <button type="button" onClick={() => handleQuantityChange(product.id, -1)} aria-label="Decrease quantity"><Minus className="h-3.5 w-3.5" /></button>
                        <span>{currentQty}</span>
                        <button type="button" onClick={() => handleQuantityChange(product.id, 1)} aria-label="Increase quantity"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                    </div>
                    <div className="cta">
                      <button type="button" className="btn fill" onClick={() => handleAdd(product)}>
                        {isAdded ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
                        {isAdded ? 'Added' : 'Add to order'}
                      </button>
                      <button type="button" className="btn" onClick={() => handleInstantWhatsApp(product)} title="Order this product directly on WhatsApp">
                        <MessageCircle className="h-4 w-4" />
                        Order on WhatsApp
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
