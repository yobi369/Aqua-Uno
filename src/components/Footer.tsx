import React from 'react';
import { Logo } from './Logo';
import { COMPANY_INFO } from '../data/waterData';
import { Phone, Mail, MapPin, Droplet, ShieldCheck, Camera, ExternalLink, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" showTagline showCorporate />
            <p className="text-slate-400 max-w-sm leading-relaxed pr-4">
              Aqua Uno is manufactured and bottled at source under strict cleanroom hygiene standards by <strong className="text-slate-300">{COMPANY_INFO.parentCompany}</strong>. Delivering pure natural mountain spring hydration across Kenya.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3 text-sky-400 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400" /> KEBS Certified
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Droplet className="w-4 h-4 text-sky-400" /> Natural pH 7.09
              </span>
              <span>·</span>
              <span>100% BPA-Free</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-tight">Our Products</h4>
            <ul className="space-y-2">
              <li>
                <a href="#products" className="hover:text-sky-400 transition-colors">20L Dispenser Bottle</a>
              </li>
              <li>
                <a href="#products" className="hover:text-sky-400 transition-colors">10L Family Container</a>
              </li>
              <li>
                <a href="#products" className="hover:text-sky-400 transition-colors">5L Family Container</a>
              </li>
              <li>
                <a href="#products" className="hover:text-sky-400 transition-colors">1.5L Hydration Pack (12-Pack)</a>
              </li>
              <li>
                <a href="#products" className="hover:text-sky-400 transition-colors">1 Litre Bottle (12-Pack)</a>
              </li>
              <li>
                <a href="#products" className="hover:text-sky-400 transition-colors">500ml Pack of 24</a>
              </li>
              <li>
                <a href="#products" className="hover:text-sky-400 transition-colors">Rechargeable Auto Pump</a>
              </li>
            </ul>
          </div>

          {/* Media & Sourcing */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-tight">Plant & Media</h4>
            <ul className="space-y-2">
              <li>
                <a href="#facility-tour" className="text-sky-400 hover:text-white transition-colors flex items-center gap-1.5 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Ephrone Factory Video Tour
                </a>
              </li>
              <li>
                <a
                  href={COMPANY_INFO.pixiesetGalleryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-300 transition-colors flex items-center gap-1 text-slate-300"
                >
                  <Camera className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>TaurusArts Pixieset Gallery</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="#source" className="hover:text-sky-400 transition-colors">Highland Aquifers</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-sky-400 transition-colors">Why Choose Us</a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-sky-400 transition-colors">Hydration Calculator</a>
              </li>
              <li>
                <a href="#delivery" className="hover:text-sky-400 transition-colors">Delivery Routes</a>
              </li>
              <li>
                <a href="#delivery" className="hover:text-sky-400 transition-colors">Corporate Supply Plans</a>
              </li>
            </ul>
          </div>

          {/* Contact Summary */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-tight">Order Hotline</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white font-medium">
                  {COMPANY_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white truncate">
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <a href={COMPANY_INFO.website} target="_blank" rel="noopener noreferrer" className="hover:text-white truncate text-sky-300">
                  {COMPANY_INFO.webDomain}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span className="leading-tight">
                  {COMPANY_INFO.address}
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.name} • {COMPANY_INFO.parentCompany}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Fast & Reliable Delivery</span>
            <span>·</span>
            <span className="font-script text-sm text-sky-400 font-bold">Trust in Every Drop</span>
            <span>·</span>
            <span>KEBS Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
