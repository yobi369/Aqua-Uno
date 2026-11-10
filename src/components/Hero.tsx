import React, { useEffect, useState } from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, Droplet, Sparkles, Truck, Eye } from 'lucide-react';
import { COMPANY_INFO } from '../data/waterData';
import heroImage from '../assets/images/hero_aqua_uno_lineup_1793557685051.jpg';
import factoryImage from '../assets/images/aqua_uno_factory_facade.jpg';
import gardensImage from '../assets/images/aqua_uno_sign_gardens.jpg';
import plantImage from '../assets/images/ephrone_plant_aerial.jpg';

const backgroundImages = [
  {
    src: heroImage,
    alt: 'Aqua Uno water bottles in a range of sizes against a fresh mountain spring backdrop',
  },
  {
    src: factoryImage,
    alt: 'Aqua Uno factory facade with the company logo',
  },
  {
    src: gardensImage,
    alt: 'Aqua Uno water bottle displayed in a green garden',
  },
  {
    src: plantImage,
    alt: 'Aerial view of the Aqua Uno plant and landscaped grounds',
  },
];

interface HeroProps {
  onOrderNowClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNowClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeBackground, setActiveBackground] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveBackground((current) => (current + 1) % backgroundImages.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, []);

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(`Hi Aqua Uno! I saw your website and would like to order fresh spring water for delivery.`);
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section className="relative isolate min-h-[620px] overflow-hidden border-b border-blue-950 bg-blue-950 sm:min-h-[680px]">
      {backgroundImages.map((image, index) => (
        <img
          key={image.src}
          src={image.src}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover object-[58%_center] transition-opacity duration-1000 motion-reduce:transition-none ${
            index === activeBackground ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-950/65 to-blue-950/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-transparent to-blue-950/15" />

      <button
        onClick={() => setIsModalOpen(true)}
        aria-label="Expand Aqua Uno product image"
        className="absolute right-4 top-4 z-20 rounded-lg border border-white/30 bg-slate-950/35 p-2 text-white backdrop-blur-md transition-colors hover:bg-slate-950/60 sm:right-6 sm:top-6"
      >
        <Eye className="w-4 h-4" />
      </button>

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
      </div>

      {/* Lightbox Modal for Full Screenshot Viewing */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs">
          <div className="relative max-w-4xl max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-3 bg-slate-800 text-white flex items-center justify-between text-sm font-semibold">
              <span>Aqua Uno Product Range</span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-md text-xs font-bold"
              >
                Close
              </button>
            </div>
            <div className="overflow-auto p-2 flex items-center justify-center">
              <img
                src={backgroundImages[activeBackground].src}
                alt={backgroundImages[activeBackground].alt}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
