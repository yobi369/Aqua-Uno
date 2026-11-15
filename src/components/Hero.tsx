import React from 'react';
import { COMPANY_INFO } from '../data/waterData';
import facade from '../assets/images/aqua_uno_factory_facade.jpg';
import lineup from '../assets/gallery/lineup.jpg';

interface HeroProps {
  onOrderNowClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNowClick }) => {
  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(`Hi Aqua Uno! I saw your website and would like to order premium purified water.`);
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section className="relative isolate overflow-hidden bg-lux-bg font-sans-lux font-light text-white">
      <img
        src={facade}
        alt="The Aqua Uno bottling facility of Ephron Industries Limited"
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[40%_40%] saturate-90"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-lux-bg/95 via-lux-bg/80 to-lux-bg/55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-lux-bg via-transparent to-transparent" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-28">
        <div className="text-center lg:text-left">
          <p className="text-xs uppercase tracking-[0.38em] text-lux-gold">Ephron Industries Limited &middot; Yatta, Machakos</p>
          <h1 className="mt-5 font-serif-lux text-6xl font-medium leading-[0.95] tracking-tight text-balance sm:text-7xl lg:text-8xl">
            Trust in <em className="text-lux-gold">Every</em> Drop
          </h1>
          <p className="mx-auto mt-7 max-w-md text-base leading-relaxed text-slate-300 sm:text-lg lg:mx-0">
            Premium purified drinking water, bottled at source and delivered from 500&nbsp;ml to 18.9&nbsp;litres.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <button
              onClick={onOrderNowClick}
              className="border border-lux-gold bg-lux-gold px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-lux-bg transition-colors hover:bg-[#efe4c8]"
            >
              View the collection
            </button>
            <button
              onClick={handleWhatsAppOrder}
              className="border border-lux-gold px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-lux-gold transition-colors hover:bg-[#efe4c8] hover:text-lux-bg"
            >
              Order on WhatsApp
            </button>
          </div>
        </div>

        <div>
          <div className="relative mx-auto w-full max-w-[400px]">
            <div className="pointer-events-none absolute -inset-4 rounded-[999px_999px_14px_14px] border border-lux-gold/30" />
            <div className="lux-arch relative aspect-[3/4] bg-lux-bg2">
              <img
                src={lineup}
                alt="The Aqua Uno range: 5 litre, 10 litre and two 18.9 litre bottles"
                className="h-full w-full object-cover contrast-105 saturate-105"
              />
            </div>
          </div>
          <p className="mt-8 text-center text-[11px] uppercase tracking-[0.3em] text-lux-mute">The range &middot; 5L &middot; 10L &middot; 18.9L</p>
        </div>
      </div>
    </section>
  );
};
