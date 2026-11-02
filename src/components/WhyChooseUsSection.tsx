import React from 'react';
import { ShieldCheck, Truck, Droplets, RefreshCw, Sparkles, Clock, Check } from 'lucide-react';
import { TESTIMONIALS } from '../data/waterData';

export const WhyChooseUsSection: React.FC = () => {
  const advantages = [
    {
      icon: Droplets,
      title: 'Untouched Mountain Springs',
      desc: 'Originates at high elevation in protected Aqua Uno highland reserves, free from industrial runoff, pesticides, or urban pollutants.',
    },
    {
      icon: ShieldCheck,
      title: 'BPA-Free, Sanitized Bottles',
      desc: 'All 20L dispenser jugs undergo rigorous 7-stage automated thermal and ozone wash sterilization before every refill.',
    },
    {
      icon: Truck,
      title: 'Dedicated Fleet Delivery',
      desc: 'Our fleet of delivery vans runs predictable routes daily, ensuring your home or office never runs dry.',
    },
    {
      icon: RefreshCw,
      title: 'Effortless Refill Exchange',
      desc: 'Simply leave your empty containers at the door or reception; our drivers swap them directly with fresh sealed bottles.',
    },
    {
      icon: Clock,
      title: 'Rapid WhatsApp Response',
      desc: 'Place repeat orders with a single WhatsApp message. Instant confirmation and live dispatch estimates.',
    },
    {
      icon: Sparkles,
      title: 'Optimal Bio-Availability',
      desc: 'Natural minerals dissolved organically through volcanic rock, creating an exceptionally smooth, crisp mouthfeel.',
    },
  ];

  return (
    <section id="why-us" className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-700 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
            Our Quality Guarantee
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            Why Choose Aqua Uno
          </h2>
          <p className="text-base text-slate-600 mt-2 font-medium">
            Trust in Every Drop • Bottled at Source by Ephron Industries Limited
          </p>
        </div>

        {/* 6 Grid Advantages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-slate-200/90 hover:border-blue-400 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {adv.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {adv.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Real Customer Proof / Testimonials */}
        <div className="mt-16 pt-12 border-t border-slate-200/80">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Trusted by Homes & Enterprises
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">
              What Our Hydrated Customers Say
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  {/* 5 star rating */}
                  <div className="flex items-center gap-1 text-amber-500 mb-3 text-xs">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200/70 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{t.author}</h4>
                    <p className="text-[11px] text-slate-500">{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
