import React, { useMemo, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { COMPANY_INFO, FACILITY_IMAGES, PRODUCTS } from '../data/waterData';

interface AquaUnoHomeProps {
  onOrderNowClick: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

type ProductCategory = 'all' | Product['category'];

const categoryLabels: Record<ProductCategory, string> = {
  all: 'All formats',
  dispenser: 'Large format',
  bottles: 'Family bottles',
  packs: 'Multipacks',
};

const categoryOrder: ProductCategory[] = ['all', 'dispenser', 'bottles', 'packs'];

export const AquaUnoHome: React.FC<AquaUnoHomeProps> = ({ onOrderNowClick, onAddToCart }) => {
  const [category, setCategory] = useState<ProductCategory>('all');
  const [activeProductId, setActiveProductId] = useState(PRODUCTS[0]?.id ?? '');
  const [quantity, setQuantity] = useState(1);

  const visibleProducts = useMemo(
    () => category === 'all' ? PRODUCTS : PRODUCTS.filter((product) => product.category === category),
    [category],
  );
  const activeProduct = PRODUCTS.find((product) => product.id === activeProductId) ?? visibleProducts[0] ?? PRODUCTS[0];

  const selectCategory = (nextCategory: ProductCategory) => {
    setCategory(nextCategory);
    const firstProduct = nextCategory === 'all'
      ? PRODUCTS[0]
      : PRODUCTS.find((product) => product.category === nextCategory);
    if (firstProduct) setActiveProductId(firstProduct.id);
    setQuantity(1);
  };

  const selectProduct = (product: Product) => {
    setActiveProductId(product.id);
    setQuantity(1);
  };

  const orderOnWhatsApp = () => {
    const message = encodeURIComponent('Hello Aqua Uno, I would like to arrange a water order and delivery.');
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  if (!activeProduct) return null;

  const activeIndex = PRODUCTS.findIndex((product) => product.id === activeProduct.id) + 1;

  return (
    <div className="bg-[#f5f3ec] text-[#142c36]">
      <section className="relative overflow-hidden border-b border-[#142c36]/15">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -right-24 -top-28 h-[34rem] w-[34rem] rounded-full border border-[#164cbd]/10" />
          <div className="absolute -right-8 -top-12 h-[25rem] w-[25rem] rounded-full border border-[#164cbd]/10" />
          <div className="absolute right-[8%] top-0 h-full w-px bg-[#142c36]/[0.06]" />
        </div>
        <div className="relative mx-auto grid min-h-[620px] max-w-[1600px] lg:min-h-[720px] lg:grid-cols-[0.86fr_1.14fr]">
          <div className="flex flex-col justify-between px-6 pb-10 pt-9 sm:px-10 lg:px-[7.5vw] lg:pb-14 lg:pt-12">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#52666c]">Ephron Industries Limited</p>
              <p className="text-[10px] tabular-nums text-[#87918e]">EST. / AQUA UNO</p>
            </div>
            <div className="py-16 lg:py-20">
              <p className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#164cbd]">
                <span className="h-px w-8 bg-[#164cbd]" /> The water catalogue
              </p>
              <h1 className="max-w-[720px] font-[Outfit] text-[clamp(4.5rem,9vw,9rem)] font-medium leading-[0.78] tracking-[-0.09em]">
                Water,<br /><span className="pl-[0.52em] text-[#164cbd]">indexed.</span>
              </h1>
              <p className="mt-9 max-w-sm text-base leading-7 text-[#52666c] sm:text-lg">
                Six formats. Different ways to keep homes, teams and days supplied. Find the one that fits.
              </p>
              <a href="#bottle-index" className="mt-10 inline-flex items-center gap-3 border-b border-[#164cbd] pb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#164cbd]">
                Enter the index <ArrowDownRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-6 border-t border-[#142c36]/20 pt-5">
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#89928e]">The collection</p>
                <p className="mt-1 font-[Outfit] text-2xl font-medium">06 formats</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#89928e]">Ordering</p>
                <p className="mt-1 font-[Outfit] text-2xl font-medium">Direct to you</p>
              </div>
            </div>
          </div>
          <div className="relative flex min-h-[430px] items-center justify-center overflow-hidden bg-[#e4e9e4] px-5 py-12 sm:px-10 lg:min-h-full">
            <div className="absolute inset-x-8 top-8 flex justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-[#87918e]">
              <span>Product family / 01—06</span><span>Natural spring water</span>
            </div>
            <div className="absolute bottom-[17%] left-[9%] right-[9%] h-px bg-[#142c36]/20" />
            <div className="absolute bottom-[17%] left-[9%] h-3 w-px bg-[#142c36]/30" />
            <div className="absolute bottom-[17%] right-[9%] h-3 w-px bg-[#142c36]/30" />
            <img
              src={PRODUCTS[0].image}
              alt="Aqua Uno 20 litre dispenser bottle"
              fetchPriority="high"
              className="relative z-10 max-h-[440px] w-full object-contain mix-blend-multiply"
            />
            <div className="absolute bottom-7 left-8 right-8 flex items-end justify-between">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#164cbd]">Reference specimen</p>
                <p className="mt-1 font-[Outfit] text-2xl font-medium">20 L / Dispenser</p>
              </div>
              <span className="font-[Outfit] text-5xl font-medium leading-none tracking-[-0.08em] text-[#164cbd]/25">01</span>
            </div>
          </div>
        </div>
      </section>

      <section id="bottle-index" className="scroll-mt-20 bg-[#faf9f5] px-5 py-16 sm:px-10 lg:px-[7.5vw] lg:py-24">
        <div className="mx-auto max-w-[1450px]">
          <div className="flex flex-col justify-between gap-8 border-b border-[#142c36]/20 pb-8 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#164cbd]">01 / Choose your format</p>
              <h2 className="mt-4 font-[Outfit] text-5xl font-medium leading-[0.9] tracking-[-0.07em] sm:text-7xl">The bottle<br />index<span className="text-[#164cbd]">.</span></h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#66777a]">
              Browse by format, then select a product to inspect its details and add it to your order.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-2" aria-label="Filter products">
            {categoryOrder.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => selectCategory(item)}
                aria-pressed={category === item}
                className={`border px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors ${category === item ? 'border-[#164cbd] bg-[#164cbd] text-white' : 'border-[#142c36]/20 text-[#52666c] hover:border-[#164cbd] hover:text-[#164cbd]'}`}
              >
                {categoryLabels[item]}
              </button>
            ))}
            <span className="ml-auto text-[10px] tabular-nums text-[#8b9692]">{String(visibleProducts.length).padStart(2, '0')} / 06 products</span>
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[0.8fr_1.2fr]">
            <div className="border-t border-[#142c36]/20">
              {visibleProducts.map((product) => {
                const index = PRODUCTS.findIndex((item) => item.id === product.id) + 1;
                const selected = product.id === activeProduct.id;
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => selectProduct(product)}
                    aria-pressed={selected}
                    className={`group grid w-full grid-cols-[44px_1fr_auto] items-center gap-3 border-b border-[#142c36]/20 px-2 py-5 text-left transition-colors sm:grid-cols-[54px_1fr_auto] sm:gap-5 sm:py-6 ${selected ? 'bg-[#e9eee9]' : 'hover:bg-[#f1f2ed]'}`}
                  >
                    <span className={`font-[Outfit] text-xl tabular-nums tracking-tight ${selected ? 'text-[#164cbd]' : 'text-[#a3aaa4]'}`}>{String(index).padStart(2, '0')}</span>
                    <span>
                      <span className={`block font-[Outfit] text-xl font-medium tracking-tight sm:text-2xl ${selected ? 'text-[#164cbd]' : 'text-[#243b43]'}`}>{product.size}</span>
                      <span className="mt-1 block text-[11px] text-[#7c8987]">{product.name}</span>
                    </span>
                    <span className="text-right">
                      <span className="block text-xs font-semibold tabular-nums text-[#243b43]">{COMPANY_INFO.currency} {product.price.toLocaleString()}</span>
                      <span className={`mt-1 block text-[9px] uppercase tracking-[0.15em] ${selected ? 'text-[#164cbd]' : 'text-[#9ba39e]'}`}>{selected ? 'Selected' : 'Inspect'} ↗</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="grid min-h-[500px] bg-[#e7ece7] lg:grid-cols-[1fr_0.82fr]">
              <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden px-7 py-12 sm:min-h-[500px]">
                <div className="absolute left-6 top-6 text-[9px] font-bold uppercase tracking-[0.2em] text-[#87938d]">Specimen / {String(activeIndex).padStart(2, '0')}</div>
                <div className="absolute bottom-12 left-8 right-8 h-px bg-[#142c36]/20" />
                <img key={activeProduct.id} src={activeProduct.image} alt={activeProduct.name} className="relative z-10 max-h-[410px] w-full object-contain mix-blend-multiply transition-opacity duration-300" loading="lazy" />
                <span className="absolute bottom-5 right-6 font-[Outfit] text-7xl font-medium leading-none tracking-[-0.08em] text-[#164cbd]/20">{String(activeIndex).padStart(2, '0')}</span>
              </div>

              <div className="flex flex-col justify-between border-t border-[#142c36]/15 bg-[#f1f1e9] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-9">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#164cbd]">Product specification</p>
                    {activeProduct.tag && <span className="border border-[#164cbd]/30 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#164cbd]">{activeProduct.tag}</span>}
                  </div>
                  <h3 className="mt-6 font-[Outfit] text-4xl font-medium leading-[0.92] tracking-[-0.06em] text-[#142c36] sm:text-5xl">{activeProduct.name}</h3>
                  <p className="mt-5 text-sm leading-7 text-[#657579]">{activeProduct.description}</p>
                  <div className="mt-7 border-y border-[#142c36]/15 py-4">
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#89938f]">Designed for</p>
                    <p className="mt-2 text-xs leading-5 text-[#344c54]">{activeProduct.bestFor}</p>
                  </div>
                  {activeProduct.features?.length > 0 && (
                    <ul className="mt-5 space-y-2">
                      {activeProduct.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex gap-2 text-[11px] leading-5 text-[#68787a]">
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#164cbd]" />{feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="mt-8 border-t border-[#142c36]/20 pt-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#89938f]">Listed price</p>
                      <p className="mt-1 font-[Outfit] text-3xl font-semibold tracking-tight text-[#142c36]">{COMPANY_INFO.currency} {activeProduct.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center border border-[#142c36]/20">
                      <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity" className="p-2.5 text-[#52666c] hover:text-[#164cbd]"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="min-w-8 text-center text-xs font-semibold tabular-nums">{quantity}</span>
                      <button type="button" onClick={() => setQuantity((value) => Math.min(99, value + 1))} aria-label="Increase quantity" className="p-2.5 text-[#52666c] hover:text-[#164cbd]"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                  <p className="mt-2 text-right text-[10px] tabular-nums text-[#7d8986]">Subtotal: {COMPANY_INFO.currency} {(activeProduct.price * quantity).toLocaleString()}</p>
                  <button onClick={() => onAddToCart(activeProduct, quantity)} className="mt-4 flex w-full items-center justify-between bg-[#164cbd] px-5 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#103b9b]">
                    Add {quantity} to order <ShoppingBag className="h-4 w-4" />
                  </button>
                  <button onClick={onOrderNowClick} className="mt-3 w-full border border-[#142c36]/25 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#344c54] hover:border-[#164cbd] hover:text-[#164cbd]">
                    Full order & delivery details <ArrowUpRight className="ml-2 inline h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid border-y border-[#142c36]/15 bg-[#e7ebe5] lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative min-h-[350px] overflow-hidden lg:min-h-[520px]">
          <img src={FACILITY_IMAGES.factoryFacade} alt="Ephron Industries facility" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <span className="absolute bottom-5 left-6 bg-[#142c36] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white">Ephron Industries / Facility</span>
        </div>
        <div className="flex flex-col justify-center px-7 py-16 sm:px-12 lg:px-[7vw] lg:py-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#164cbd]">02 / Behind the product</p>
          <h2 className="mt-6 font-[Outfit] text-5xl font-medium leading-[0.9] tracking-[-0.07em] sm:text-7xl">The name<br />behind the<br /><span className="text-[#164cbd]">bottle.</span></h2>
          <p className="mt-7 max-w-md text-sm leading-7 text-[#617276]">
            Aqua Uno is bottled by Ephron Industries Limited. Explore the facility and learn more about the company behind the range.
          </p>
          <a href="/about" className="mt-9 inline-flex w-fit items-center gap-3 border-b border-[#164cbd] pb-2 text-xs font-bold uppercase tracking-[0.15em] text-[#164cbd]">Explore the company <ArrowUpRight className="h-4 w-4" /></a>
        </div>
      </section>

      <section className="bg-[#142c36] px-6 py-16 text-[#f5f3ec] sm:px-10 lg:px-[7.5vw] lg:py-20">
        <div className="mx-auto flex max-w-[1450px] flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a8c4dc]">03 / Place an order</p>
            <h2 className="mt-5 font-[Outfit] text-5xl font-medium leading-[0.9] tracking-[-0.07em] sm:text-7xl">Choose your<br />water. We’ll<br /><span className="text-[#a8c4dc]">take it from here.</span></h2>
            <p className="mt-6 text-sm text-white/65">Call {COMPANY_INFO.phoneDisplay} or contact dispatch directly on WhatsApp.</p>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <button onClick={orderOnWhatsApp} className="inline-flex items-center gap-4 bg-[#f5f3ec] px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-[#142c36] transition-colors hover:bg-[#dce6e1]">Order on WhatsApp <ArrowUpRight className="h-4 w-4" /></button>
            <button onClick={onOrderNowClick} className="text-xs font-semibold text-white/65 underline underline-offset-4 hover:text-white">Browse delivery and checkout information</button>
          </div>
        </div>
      </section>
    </div>
  );
};
