import React from 'react';
import { MINERAL_SPECS } from '../data/waterData';
import { Mountain, Droplet, ShieldCheck, Award, CheckCircle } from 'lucide-react';

export const AquaUnoSourceSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Pristine Cloud Forest Rainfall',
      desc: 'Rainfall in the protected pristine highland forest ecosystem percolates through virgin bamboo and cedar groves.',
    },
    {
      step: '02',
      title: 'Centuries of Volcanic Rock Filtration',
      desc: 'Deep subterranean volcanic strata naturally filter the water, enriching it with bioavailable minerals like calcium and magnesium.',
    },
    {
      step: '03',
      title: 'Gentle UV & Micro-Filtration',
      desc: 'Physical 0.2-micron filtration and germicidal UV light eliminate any bacteria while preserving natural spring vitality and crisp taste.',
    },
    {
      step: '04',
      title: 'Touchless Cleanroom Bottling',
      desc: 'Bottled directly at source into sterilized, food-grade, BPA-free containers with security tamper seals.',
    },
  ];

  return (
    <section id="source" className="py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100/70 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Mountain className="w-3.5 h-3.5" />
            <span>Highland Aquifer Origin</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Pure From the Heart of Aqua Uno Springs
          </h2>
          <p className="text-base text-slate-600 mt-2 font-medium">
            Discover why Aqua Uno natural spring water tastes extraordinarily clean, smooth, and revitalizing.
          </p>
        </div>

        {/* 2-Column Split: Process Steps & Mineral Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Natural Journey Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              
              {/* Natural River & Mountain Source Visual */}
              <div className="relative w-full h-48 sm:h-56 bg-slate-900 overflow-hidden">
                <img
                  src="/src/assets/images/ephrone_plant_aerial.jpg"
                  alt="Aqua Uno Highland Spring Source & Ephrone Industries Estate"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-4 sm:p-5">
                  <div className="text-white">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 bg-slate-950/80 px-2.5 py-0.5 rounded-md border border-sky-500/30">
                      Highland Aquifers & Modern Bottling
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-white mt-1">
                      Ephrone Industries Bottling Estate
                    </h4>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-blue-600" />
                  <span>The 4-Stage Natural Spring Journey</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {steps.map((item, idx) => (
                  <div key={idx} className="relative pl-4 border-l-2 border-blue-500/40">
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      Step {item.step}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Quality Guarantee Callout */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-blue-50/70 p-4 rounded-xl border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-600 text-white rounded-xl">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">KEBS Standard Certified</h4>
                    <p className="text-[11px] text-slate-600">Bottled by Ephrone Industries Limited meeting national drinking standards</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-800">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>100% Tested Daily</span>
                </div>
              </div>
            </div>
          </div>
        </div>

          {/* Right Column: Certified Mineral Composition Table */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Mineral & Chemical Analysis</h3>
                  <p className="text-xs text-slate-500">Laboratory profile • concentrations in mg/L</p>
                </div>
                <span className="px-2.5 py-1 text-[11px] font-bold text-blue-800 bg-blue-50 border border-blue-200 rounded-md">
                  pH 7.09
                </span>
              </div>

              {/* Table of Minerals */}
              <div className="divide-y divide-slate-100 text-xs">
                {MINERAL_SPECS.map((spec, i) => (
                  <div key={i} className="py-2.5 flex items-start justify-between gap-3">
                    <div>
                      <span className="font-semibold text-slate-800 block">{spec.name}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-900 shrink-0 text-right bg-slate-50 px-2 py-1 rounded border border-slate-100">
                      {spec.amount}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 p-3 rounded-xl bg-sky-50 border border-sky-100 text-sky-900 text-[11px] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Mineral concentrations are shown in mg/L; pH is unitless.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
