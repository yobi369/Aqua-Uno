import React, { useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, Droplets, MoveUpRight } from 'lucide-react';
import { Product } from '../types';
import { COMPANY_INFO, FACILITY_IMAGES, PRODUCTS } from '../data/waterData';
import heroLineup from '../assets/images/hero_aqua_uno_lineup_1793557685051.jpg';

interface AquaUnoHomeProps {
  onOrderNowClick: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const AquaUnoHome: React.FC<AquaUnoHomeProps> = ({ onOrderNowClick, onAddToCart }) => {
  const [activeProductId, setActiveProductId] = useState(PRODUCTS[0]?.id ?? '');
  const activeProduct = PRODUCTS.find((product) => product.id === activeProductId) ?? PRODUCTS[0];

  const orderOnWhatsApp = () => {
    const message = encodeURIComponent('Hello Aqua Uno, I would like to arrange a water order and delivery.');
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  if (!activeProduct) return null;

  return (
    <div className="aqua-editorial text-[#132b35]">
      <section className="relative isolate overflow-hidden bg-[#f3f1e9]">
        <div className="pointer-events-none absolute inset-y-0 left-[5.5%] hidden w-px bg-[#132b35]/15 lg:block" />
        <div className="mx-auto grid min-h-[690px] max-w-[1600px] grid-cols-1 lg:min-h-[760px] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative z-10 flex flex-col justify-between px-6 pb-12 pt-10 sm:px-10 lg:px-[9vw] lg:pb-16 lg:pt-14">
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#31515b]">
              <span className="h-2 w-2 rounded-full bg-[#164cbd]" />
              Ephron Industries Limited
            </div>

            <div className="py-16 lg:py-20">
              <p className="mb-7 text-[11px] font-bold uppercase tracking-[0.28em] text-[#164cbd]">
                Water for the way life moves
              </p>
              <h1 className="max-w-[760px] font-[Outfit] text-[clamp(4.4rem,10vw,9.8rem)] font-semibold leading-[0.78] tracking-[-0.085em] text-[#132b35]">
                Aqua
                <span className="block pl-[0.72em] text-[#164cbd]">Uno.</span>
              </h1>
              <div className="mt-10 flex max-w-lg items-start gap-5">
                <span className="mt-2 h-px w-12 shrink-0 bg-[#164cbd]" />
                <p className="max-w-sm text-base leading-7 text-[#45606a] sm:text-lg">
                  {COMPANY_INFO.slogan}. Natural spring water, thoughtfully bottled for everyday life.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <button onClick={onOrderNowClick} className="group inline-flex items-center gap-3 border-b border-[#164cbd] pb-2 text-sm font-bold text-[#164cbd] transition-colors hover:text-[#102f78]">
                  Explore the range <MoveUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
                <button onClick={orderOnWhatsApp} className="inline-flex items-center gap-2 text-sm font-semibold text-[#45606a] transition-colors hover:text-[#164cbd]">
                  Order directly <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-end justify-between border-t border-[#132b35]/20 pt-5">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#6b7c7e]">Aqua Uno / 001</p>
                <p className="mt-1 text-xs text-[#45606a]">Bottled by Ephron Industries</p>
              </div>
              <a href="#the-range" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#164cbd]">
                Scroll to discover <ArrowDown className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="relative min-h-[430px] overflow-hidden bg-[#dfe7e4] lg:min-h-full">
            <img src={heroLineup} alt="The Aqua Uno bottled water range" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-[#132b35]/[0.06]" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white sm:bottom-9 sm:left-9 sm:right-9">
              <div className="max-w-xs">
                <p className="text-[9px] font-bold uppercase tracking-[0.28em]">The collection</p>
                <p className="mt-2 font-[Outfit] text-3xl font-medium leading-none tracking-tight sm:text-4xl">One name.<br />Everyday refreshment.</p>
              </div>
              <span className="border border-white/70 px-3 py-2 text-[10px] font-bold tracking-[0.18em]">01 / 03</span>
            </div>
          </div>
        </div>
      </section>

      <section id="the-range" className="scroll-mt-20 bg-[#faf9f5] px-6 py-20 sm:px-10 lg:px-[9vw] lg:py-28">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-14 flex flex-col justify-between gap-6 border-b border-[#132b35]/20 pb-7 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#164cbd]">02 / Find your format</p>
              <h2 className="mt-4 max-w-2xl font-[Outfit] text-5xl font-medium leading-[0.94] tracking-[-0.06em] text-[#132b35] sm:text-7xl">
                Made to fit<br /><span className="text-[#164cbd]">your day.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-[#62747a]">
              From a quick refresh to keeping the whole room supplied. Choose a bottle to see its details.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.3fr_0.78fr] lg:gap-8">
            <div className="flex flex-col">
              <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.24em] text-[#849092]">Select a size</p>
              <div className="border-t border-[#132b35]/20">
                {PRODUCTS.map((product, index) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => setActiveProductId(product.id)}
                    aria-pressed={activeProduct.id === product.id}
                    className={`group flex w-full items-center justify-between border-b border-[#132b35]/20 py-4 text-left transition-colors ${activeProduct.id === product.id ? 'text-[#164cbd]' : 'text-[#52666c] hover:text-[#132b35]'}`}
                  >
                    <span className="flex items-center gap-4">
                      <span className="w-6 text-[10px] tabular-nums text-[#9aa5a3]">0{index + 1}</span>
                      <span className={`font-[Outfit] text-2xl font-medium tracking-tight sm:text-3xl ${activeProduct.id === product.id ? 'translate-x-1' : ''} transition-transform`}>{product.size}</span>
                    </span>
                    {activeProduct.id === product.id ? <span className="h-2 w-2 rounded-full bg-[#164cbd]" /> : <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />}
                  </button>
                ))}
              </div>
              <p className="mt-5 text-[10px] uppercase tracking-[0.18em] text-[#8b9898]">{String(PRODUCTS.length).padStart(2, '0')} formats in the range</p>
            </div>

            <div className="relative flex min-h-[390px] items-center justify-center overflow-hidden bg-[#e9eeeb] px-6 py-10 sm:min-h-[520px]">
              <span className="pointer-events-none absolute left-5 top-5 text-[9px] font-bold uppercase tracking-[0.24em] text-[#83918e]">Aqua Uno / Product study</span>
              <span className="pointer-events-none absolute bottom-5 right-5 font-[Outfit] text-[clamp(5rem,13vw,11rem)] font-semibold leading-none tracking-[-0.09em] text-[#164cbd]/[0.07]">{String(PRODUCTS.indexOf(activeProduct) + 1).padStart(2, '0')}</span>
              <img key={activeProduct.id} src={activeProduct.image} alt={activeProduct.name} className="relative z-10 max-h-[390px] w-full object-contain mix-blend-multiply transition-all duration-500 sm:max-h-[460px]" loading="lazy" />
            </div>

            <div className="flex flex-col justify-between border-t border-[#132b35]/20 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#164cbd]">Selected / {activeProduct.size}</p>
                <h3 className="mt-5 font-[Outfit] text-4xl font-medium leading-[0.95] tracking-[-0.055em] text-[#132b35]">{activeProduct.name}</h3>
                <p className="mt-5 text-sm leading-7 text-[#62747a]">{activeProduct.description}</p>
                {activeProduct.bestFor && <p className="mt-5 border-l-2 border-[#164cbd] pl-4 text-xs leading-5 text-[#52666c]"><span className="mb-1 block text-[9px] font-bold uppercase tracking-[0.2em] text-[#164cbd]">Works well for</span>{activeProduct.bestFor}</p>}
              </div>
              <div className="mt-10 border-t border-[#132b35]/20 pt-5">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#849092]">Listed price</p>
                    <p className="mt-1 font-[Outfit] text-3xl font-semibold tracking-tight text-[#132b35]">{COMPANY_INFO.currency} {activeProduct.price.toLocaleString()}</p>
                  </div>
                  <button onClick={() => onAddToCart(activeProduct, 1)} className="group inline-flex items-center gap-2 border-b border-[#164cbd] pb-2 text-xs font-bold text-[#164cbd] hover:text-[#102f78]">
                    Add to order <MoveUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </div>
                <button onClick={onOrderNowClick} className="mt-5 w-full border border-[#132b35]/25 px-4 py-3 text-xs font-bold uppercase tracking-[0.17em] text-[#132b35] transition-colors hover:border-[#164cbd] hover:bg-[#164cbd] hover:text-white">
                  View ordering details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid bg-[#132b35] text-[#f3f1e9] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[360px] overflow-hidden lg:min-h-[590px]">
          <img src={FACILITY_IMAGES.factoryFacade} alt="Ephron Industries facility" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#10232a]/15" />
          <span className="absolute bottom-6 left-6 text-[9px] font-bold uppercase tracking-[0.25em] text-white">Ephron Industries / Facility</span>
        </div>
        <div className="flex flex-col justify-center px-7 py-16 sm:px-12 lg:px-[7vw] lg:py-24">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#a8c4dc]">03 / Behind the bottle</p>
          <h2 className="mt-7 font-[Outfit] text-5xl font-medium leading-[0.91] tracking-[-0.065em] sm:text-7xl">
            Trust is<br />built <span className="text-[#a8c4dc]">at source.</span>
          </h2>
          <p className="mt-8 max-w-md text-sm leading-7 text-white/70">
            Aqua Uno is bottled by Ephron Industries Limited. Get to know the people, place and work behind the water you bring home.
          </p>
          <a href="/about" className="group mt-10 inline-flex w-fit items-center gap-3 border-b border-[#a8c4dc]/70 pb-2 text-sm font-semibold text-[#dbe9f1]">
            Explore our story <MoveUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </section>

      <section className="bg-[#e3e9e5] px-6 py-16 sm:px-10 lg:px-[9vw] lg:py-20">
        <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#164cbd]">04 / Make it a regular</p>
            <h2 className="mt-4 max-w-3xl font-[Outfit] text-5xl font-medium leading-[0.92] tracking-[-0.06em] text-[#132b35] sm:text-7xl">
              Your next bottle<br />is closer than you think.
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <button onClick={orderOnWhatsApp} className="inline-flex items-center gap-3 bg-[#164cbd] px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#103b9b]">
              Arrange delivery <ArrowUpRight className="h-4 w-4" />
            </button>
            <a href={`tel:${COMPANY_INFO.phone}`} className="text-xs font-semibold text-[#52666c] hover:text-[#164cbd]">{COMPANY_INFO.phoneDisplay}</a>
          </div>
        </div>
      </section>
    </div>
  );
};
