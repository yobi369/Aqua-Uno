import React, { useState } from 'react';
import { Droplet, Sparkles, Calculator, ArrowRight, Check } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, COMPANY_INFO } from '../data/waterData';

interface HydrationBannerProps {
  onAddRecommended: (product: Product, quantity: number) => void;
}

export const HydrationBanner: React.FC<HydrationBannerProps> = ({ onAddRecommended }) => {
  const [householdSize, setHouseholdSize] = useState<number>(4);
  const [activityLevel, setActivityLevel] = useState<'moderate' | 'high'>('moderate');
  const [applied, setApplied] = useState(false);

  // Daily intake per person: ~2.5L moderate, ~3.5L high
  const dailyIntakePerPerson = activityLevel === 'moderate' ? 2.5 : 3.5;
  const totalDailyLiters = (householdSize * dailyIntakePerPerson).toFixed(1);
  const monthlyLiters = Math.round(Number(totalDailyLiters) * 30);
  // Number of 20L bottles needed per month
  const monthly20LBottles = Math.max(1, Math.ceil(monthlyLiters / 20));

  const handleApplyOrder = () => {
    const prod20L = PRODUCTS.find((p) => p.id === 'prod-20l') || PRODUCTS[0];
    const initialBottles = Math.min(monthly20LBottles, 4);
    onAddRecommended(prod20L, initialBottles);
    setApplied(true);
    setTimeout(() => setApplied(false), 2500);
  };

  return (
    <section id="calculator" className="py-16 bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background ripples */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-sky-400/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Inspiring Headline */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-md text-xs font-semibold text-sky-200 border border-white/15">
              <Droplet className="w-3.5 h-3.5 fill-sky-300 text-sky-300" />
              <span>Vitality & Wellness</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Stay Hydrated <br />
              <span className="text-sky-300 font-script text-4xl sm:text-5xl lg:text-6xl">Trust in Every Drop</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-lg">
              Choose Aqua Uno by <strong className="text-white">{COMPANY_INFO.parentCompany}</strong>. Pure natural hydration stimulates metabolism, sharpens mental focus, and supports whole-body wellness for you and your loved ones.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>Zero Contaminants • Naturally Alkaline</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>KEBS Certified Micro-Purified</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Hydration & Delivery Calculator */}
          <div className="lg:col-span-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-7 shadow-2xl text-white">
              <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-blue-500/30 rounded-xl">
                    <Calculator className="w-5 h-5 text-sky-300" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Hydration & Delivery Estimator</h3>
                    <p className="text-xs text-sky-200">Calculate how much water your home or office needs</p>
                  </div>
                </div>
              </div>

              {/* Input: People count */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-slate-200">Household or Team Size:</span>
                    <span className="font-bold text-white font-mono">{householdSize} {householdSize === 1 ? 'Person' : 'People'}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={householdSize}
                    onChange={(e) => setHouseholdSize(Number(e.target.value))}
                    className="w-full accent-sky-400 bg-white/20 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-white/60 mt-1">
                    <span>1 (Solo)</span>
                    <span>4 (Family)</span>
                    <span>10 (Office)</span>
                    <span>20 (Corporate)</span>
                  </div>
                </div>

                {/* Activity Level Toggle */}
                <div>
                  <label className="block text-xs font-medium text-slate-200 mb-1.5">
                    Activity & Climate:
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => setActivityLevel('moderate')}
                      className={`py-2 px-3 rounded-lg font-semibold transition-all border ${
                        activityLevel === 'moderate'
                          ? 'bg-white text-blue-900 border-white shadow-xs'
                          : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      Moderate (2.5L / person)
                    </button>
                    <button
                      onClick={() => setActivityLevel('high')}
                      className={`py-2 px-3 rounded-lg font-semibold transition-all border ${
                        activityLevel === 'high'
                          ? 'bg-white text-blue-900 border-white shadow-xs'
                          : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      High / Active (3.5L / person)
                    </button>
                  </div>
                </div>

                {/* Calculation Output Box */}
                <div className="p-4 rounded-xl bg-black/20 border border-white/15 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-sky-200 uppercase tracking-wider font-semibold block">
                      Recommended Plan:
                    </span>
                    <span className="text-lg font-extrabold text-white">
                      ~{monthly20LBottles} × 20L Bottles / Month
                    </span>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      ({totalDailyLiters} Litres daily total consumption)
                    </p>
                  </div>

                  <button
                    onClick={handleApplyOrder}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all ${
                      applied
                        ? 'bg-blue-400 text-slate-950'
                        : 'bg-blue-500 hover:bg-blue-400 text-white'
                    }`}
                  >
                    {applied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <span>Add Suggested</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
