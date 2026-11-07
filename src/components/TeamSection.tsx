import React from 'react';
import { BadgeCheck, Factory, HeartHandshake, Truck } from 'lucide-react';

const teams = [
  {
    icon: BadgeCheck,
    title: 'Quality & Safety',
    description: 'The people who help maintain careful hygiene and quality checks throughout our water handling process.',
  },
  {
    icon: Factory,
    title: 'Bottling Operations',
    description: 'Our plant team prepares, fills, and packs Aqua Uno water for homes, businesses, and events.',
  },
  {
    icon: Truck,
    title: 'Delivery & Customer Care',
    description: 'The dispatch and delivery crew coordinating orders and bringing fresh water to your door.',
  },
];

export const TeamSection: React.FC = () => (
  <section id="team" className="py-16 bg-slate-50 border-b border-slate-200/80">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
          <HeartHandshake className="w-3.5 h-3.5" />
          The People Behind Every Drop
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
          Meet Our Team
        </h2>
        <p className="text-base text-slate-600 mt-2 font-medium">
          From the bottling plant to your doorstep, our teams work together to bring you Aqua Uno.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teams.map(({ icon: Icon, title, description }) => (
          <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xs">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Icon className="w-7 h-7" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
