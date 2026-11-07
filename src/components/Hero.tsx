import React, { useState } from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, Droplet, Sparkles, Truck, CheckCircle2, Eye } from 'lucide-react';
import { COMPANY_INFO, FACILITY_IMAGES } from '../data/waterData';

interface HeroProps {
  onOrderNowClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNowClick }) => {
  const [selectedView, setSelectedView] = useState<'factory' | 'warehouse'>('factory');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(`Hi Aqua Uno! I saw your website and would like to order fresh spring water for delivery.`);
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const getImageSrc = () => {
    switch (selectedView) {
      case 'factory':
        return FACILITY_IMAGES.signGardens;
      case 'warehouse':
        return FACILITY_IMAGES.warehousePallets;
      default:
        return FACILITY_IMAGES.signGardens;
    }
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

            {/* Sub-headline & Description */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed text-balance">
              Premium natural spring water bottled at our modern manufacturing plant by <strong className="text-slate-800 font-bold">{COMPANY_INFO.parentCompany}</strong>. Delivered pure and fresh in 500ml, 1L, 1.5L, 5L, 10L, and 20L sizes.
            </p>

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

          {/* Right Column: Hero Visual Asset Display (From User's Provided Screenshots & Real Plant) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-xl group">
              {/* Asset View Selector Switcher */}
              <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between">
                <div className="inline-flex bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-white/20 text-xs font-medium text-white shadow-lg overflow-x-auto max-w-full">
                  <button
                    onClick={() => setSelectedView('factory')}
                    className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                      selectedView === 'factory'
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Bottling Plant
                  </button>
                  <button
                    onClick={() => setSelectedView('warehouse')}
                    className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                      selectedView === 'warehouse'
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Warehouse Stock
                  </button>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-slate-900/90 backdrop-blur-md p-1.5 rounded-lg border border-white/20 text-white/90 hover:text-white hover:bg-slate-800 transition-colors shadow-lg ml-2 shrink-0"
                  title="Expand image preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Main Visual Display */}
              <div className="relative w-full aspect-4/3 sm:aspect-16/10 max-h-[460px] overflow-hidden bg-slate-950 flex items-center justify-center">
                <img
                  src={getImageSrc()}
                  alt="Aqua Uno Fresh Spring Water Bottles and Highland Source"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle Gradient Scrim at Bottom */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-4 sm:p-5 text-white flex flex-col justify-end">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-sky-400 font-bold">
                        Aqua Uno Pure Spring Water
                      </p>
                      <p className="text-sm sm:text-base font-semibold text-white">
                        20L • 10L • 5L • 1.5L • 1L • 500ml Pack
                      </p>
                    </div>
                    <span className="hidden sm:inline-block px-2.5 py-1 text-xs font-semibold bg-blue-500/20 text-sky-300 border border-blue-400/30 rounded-md">
                      KEBS Certified
                    </span>
                  </div>
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
                <p className="text-[11px] text-slate-500">Touchless hygiene • Pure Highland Source</p>
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
              <span>Aqua Uno Brand Visual Asset</span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-md text-xs font-bold"
              >
                Close (ESC)
              </button>
            </div>
            <div className="overflow-auto p-2 flex items-center justify-center">
              <img
                src={getImageSrc()}
                alt="Full Brand Asset"
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
