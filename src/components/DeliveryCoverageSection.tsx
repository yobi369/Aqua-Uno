import React, { useState } from 'react';
import { DELIVERY_ZONES, COMPANY_INFO } from '../data/waterData';
import { Truck, MapPin, Search, CheckCircle, Clock, ShieldCheck, MessageCircle } from 'lucide-react';

export const DeliveryCoverageSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredZones = DELIVERY_ZONES.filter((z) =>
    z.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCorporateInquiry = () => {
    const text = encodeURIComponent(
      `Hello Aqua Uno! I'd like to inquire about corporate / office scheduled water deliveries and dispenser leasing.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="delivery" className="py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Truck className="w-3.5 h-3.5" />
            <span>Fast & Reliable Delivery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Delivery Coverage & Schedules
          </h2>
          <p className="text-base text-slate-600 mt-2 font-medium">
            We deliver straight to your doorstep across Nairobi, Kiambu, and surrounding regional corridors.
          </p>

          {/* Quick Estate / City Search Bar */}
          <div className="relative max-w-md mx-auto mt-6">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search your estate, town, or area (e.g. Westlands, Karen, Nyeri)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs"
            />
          </div>
        </div>

        {/* Delivery Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredZones.length > 0 ? (
            filteredZones.map((zone, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-blue-400 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {zone.area}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Operational Days: <span className="font-semibold text-slate-700">{zone.days}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block">Lead Time:</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      {zone.leadTime}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Free Delivery Policy:</span>
                    <span className="font-bold text-blue-700 flex items-center gap-1 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                      {zone.minOrderFree}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-8 bg-white rounded-2xl border border-slate-200 p-6">
              <p className="text-sm font-semibold text-slate-800">No exact zone listed for "{searchQuery}"?</p>
              <p className="text-xs text-slate-500 mt-1">We often accommodate custom routes! Message us on WhatsApp to verify your exact pin location.</p>
              <button
                onClick={handleCorporateInquiry}
                className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Check Location via WhatsApp</span>
              </button>
            </div>
          )}
        </div>

        {/* Corporate & Event Banner */}
        <div className="mt-10 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-500/30 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Corporate & Institution Accounts • Ephrone Industries
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Looking for regular bulk office or school deliveries?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Enjoy tailored volume pricing, water dispenser sanitization maintenance, and 30-day corporate payment terms directly with Ephrone Industries Limited.
            </p>
          </div>

          <button
            onClick={handleCorporateInquiry}
            className="shrink-0 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Request Corporate Quote</span>
          </button>
        </div>

      </div>
    </section>
  );
};
