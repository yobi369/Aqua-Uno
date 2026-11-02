import React from 'react';
import { Droplet, ShieldCheck, Truck, HeartHandshake } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const pillars = [
    {
      icon: Droplet,
      title: '100% Pure Spring Water',
      description: 'Drawn directly from subterranean aquifers in protected highland reserves with natural mineral balance.',
      accent: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      icon: ShieldCheck,
      title: 'Safe & Hygienic Bottling',
      description: 'Packaged at Ephrone Industries facility with multi-stage micro-filtration and touchless bottling.',
      accent: 'text-sky-600 bg-sky-50 border-sky-200',
    },
    {
      icon: Truck,
      title: 'On-Time Doorstep Delivery',
      description: 'Prompt daily route deliveries right to your doorstep for residential homes, corporate offices, and venues.',
      accent: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    },
    {
      icon: HeartHandshake,
      title: 'Customer Focused',
      description: 'Simple refill exchanges, flexible corporate plans, and instant WhatsApp dispatch support.',
      accent: 'text-blue-700 bg-blue-50 border-blue-200',
    },
  ];

  return (
    <section className="bg-white py-8 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl border border-slate-200/70 hover:border-blue-400 hover:shadow-xs transition-all bg-slate-50/50"
              >
                <div className={`p-3 rounded-lg border shrink-0 ${pillar.accent}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
