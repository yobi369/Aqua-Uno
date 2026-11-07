import React, { useState } from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, Droplet, Sparkles, Truck, CheckCircle2, Eye } from 'lucide-react';
import { COMPANY_INFO } from '../data/waterData';
import heroImage from '../assets/images/hero_aqua_uno_lineup_1793557685051.jpg';

interface HeroProps {
  onOrderNowClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNowClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(`Hi Aqua Uno! I saw your website and would like to order fresh spring water for delivery.`);
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-slate-50 border-b border-slate-200/60 pt-6 pb-12 lg:pt-10 lg:pb-16">
      {/* Background ambient water glow elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Core Value Proposition & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Editorial Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-blue-900 uppercase bg-blue-50 px-3.5 py-1.5 rounded-md border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>BY EPHRON INDUSTRIES LIMITED</span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] text-balance">
                Aqua Uno <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500">
                  Fresh Water
                </span>
              </h1>
              <p className="font-script text-2xl sm:text-3xl text-sky-700 mt-1 font-bold">
                Trust in Every Drop
              </p>
            </div>

            {/* Key Quality Pillars (Inline metadata) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-4 text-xs font-semibold text-slate-600 pt-1">
              <div className="flex items-center gap-1.5 text-blue-900">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Natural pH 7.09</span>
              </div>
              <span className="text-slate-300">·</span>
              <div className="flex items-center gap-1.5 text-blue-900">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Multi-Stage UV Purification</span>
              </div>
              <span className="text-slate-300">·</span>
              <div className="flex items-center gap-1.5 text-blue-900">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Same-Day Doorstep Dispatch</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onOrderNowClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-all shadow-md shadow-blue-600/25 whitespace-nowrap"
              >
                <span>Order Aqua Uno Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="/about#facility-tour"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-blue-800 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-all whitespace-nowrap"
              >
                <span>Watch Factory Drone Reel</span>
              </a>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:border-blue-400 hover:text-blue-700 transition-all whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Order</span>
              </button>
            </div>

            {/* Quick Slogan Bar */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-blue-600" /> Fast & Reliable Delivery
              </span>
              <span>|</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Your Health, Our Priority
              </span>
              <span>|</span>
              <span className="flex items-center gap-1.5 font-script text-sm font-bold text-sky-800">
                <Droplet className="w-3.5 h-3.5 text-sky-500" /> Trust in Every Drop
              </span>
            </div>
          </div>

          {/* Right Column: Aqua Uno product lineup */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-white/70 shadow-2xl shadow-blue-900/20 group">
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <img
                  src={heroImage}
                  alt="Aqua Uno water bottles in a range of sizes against a fresh mountain spring backdrop"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/10" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-slate-950/35 px-3 py-1.5 text-xs font-bold tracking-wide text-white backdrop-blur-md">
                  <Droplet className="h-4 w-4 fill-sky-400 text-sky-300" />
                  PURE REFRESHMENT
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  aria-label="Expand Aqua Uno product image"
                  className="absolute top-4 right-4 rounded-lg border border-white/30 bg-slate-950/35 p-2 text-white backdrop-blur-md transition-colors hover:bg-slate-950/60"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white">
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-sky-200">Aqua Uno</p>
                  <p className="mt-1 text-lg sm:text-2xl font-extrabold tracking-tight">A refreshing fit for every day</p>
                  <p className="mt-1 text-xs sm:text-sm font-medium text-white/85">500ml · 1L · 1.5L · 5L · 10L · 20L</p>
                </div>
              </div>
            </div>

            {/* Quick Floating Badge */}
            <div className="hidden sm:flex absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg rounded-xl p-3 items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                <Droplet className="w-5 h-5 fill-blue-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Ephron Industries Bottling</p>
                <p className="text-[11px] text-slate-500">Pure refreshment • Delivered to you</p>
              </div>
            </div>
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
                src={heroImage}
                alt="Aqua Uno water bottles in a range of sizes against a fresh mountain spring backdrop"
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
