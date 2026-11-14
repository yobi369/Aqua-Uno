import React, { useEffect, useState } from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, Droplet, Sparkles, Truck } from 'lucide-react';
import { COMPANY_INFO } from '../data/waterData';

interface HeroProps {
  onOrderNowClick: () => void;
}

const heroSlides = [
  {
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=85',
    alt: 'A pristine natural landscape with fresh mountain air',
    label: 'Naturally refreshing',
  },
  {
    src: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=2200&q=85',
    alt: 'Clear drinking water in a bottle',
    label: 'Pure hydration',
  },
  {
    src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=2200&q=85',
    alt: 'Clean blue ocean water moving in gentle waves',
    label: 'Freshness in every drop',
  },
  {
    src: 'https://images.unsplash.com/photo-1437482078695-7b7a?auto=format&fit=crop&w=2200&q=85',
    alt: 'Fresh water inspired natural scenery',
    label: 'Refresh your everyday',
  },
];

export const Hero: React.FC<HeroProps> = ({ onOrderNowClick }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(`Hi Aqua Uno! I saw your website and would like to order fresh spring water for delivery.`);
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section className="relative isolate min-h-[620px] overflow-hidden border-b border-blue-950 bg-blue-950 sm:min-h-[680px]">
      <div className="absolute inset-0" aria-hidden="true">
        {heroSlides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt=""
            aria-hidden="true"
            fetchPriority={index === 0 ? 'high' : 'auto'}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-in-out ${activeSlide === index ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-950/65 to-blue-950/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-transparent to-blue-950/15" />

      <div className="relative mx-auto flex min-h-[620px] max-w-7xl flex-col items-center justify-center gap-8 px-4 py-10 sm:min-h-[680px] sm:px-6 sm:py-16 lg:block lg:px-8">
        <div className="max-w-2xl text-center text-white lg:absolute lg:left-8 lg:top-1/2 lg:max-w-xl lg:-translate-y-1/2 lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[11px] font-bold tracking-[0.18em] text-sky-100 backdrop-blur-sm sm:text-xs">
            <Sparkles className="h-4 w-4 text-sky-300" />
            EPHRON INDUSTRIES LIMITED
          </div>

          <h1 className="text-5xl font-black leading-[0.98] tracking-tight text-balance sm:text-6xl md:text-7xl">
            Aqua Uno
            <span className="mt-2 block bg-gradient-to-r from-sky-200 via-cyan-100 to-white bg-clip-text text-transparent">
              Fresh Water
            </span>
          </h1>
          <p className="mt-5 font-script text-3xl font-bold text-sky-200 sm:text-4xl">
            Trust in Every Drop
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm font-medium leading-relaxed text-white/85 sm:text-base lg:mx-0">
            Pure refreshment for home, work, and everywhere in between.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <button
              onClick={onOrderNowClick}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-950/30 transition-all hover:bg-blue-500"
            >
              Order Aqua Uno
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={handleWhatsAppOrder}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <MessageCircle className="h-4 w-4 text-emerald-300" />
              Order on WhatsApp
            </button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-white/85 lg:justify-start">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-sky-300" />
              Quality you can trust
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Truck className="h-4 w-4 text-sky-300" />
              Fast, reliable delivery
            </span>
          </div>
        </div>

        <div className="relative w-full rounded-2xl border border-white/60 bg-white/95 p-4 shadow-2xl shadow-blue-950/25 backdrop-blur-md sm:max-w-sm sm:p-5 lg:absolute lg:bottom-7 lg:right-8 lg:mt-0">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-blue-700">
              <Droplet className="h-5 w-5 fill-blue-600" />
            </span>
            <div>
              <p className="text-sm font-extrabold text-slate-900">Find your perfect size</p>
              <p className="text-xs text-slate-500">Everyday hydration, made easy</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {['500ml', '1L', '1.5L', '5L', '10L', '20L'].map((size) => (
              <span key={size} className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-800">
                {size}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-slate-950/35 px-3 py-2 backdrop-blur-md lg:bottom-8">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Show hero image ${index + 1}: ${slide.label}`}
              aria-current={activeSlide === index ? 'true' : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${activeSlide === index ? 'w-7 bg-white' : 'w-2 bg-white/55 hover:bg-white/85'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
