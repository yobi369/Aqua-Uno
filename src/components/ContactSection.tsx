import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, Globe, Camera, ExternalLink } from 'lucide-react';
import { COMPANY_INFO } from '../data/waterData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'general',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: '', phone: '', email: '', subject: 'general', message: '' });
    }, 4000);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(`Hello Aqua Uno! I'd like to get in touch with your team at Ephron Industries.`);
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-700 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            Contact Aqua Uno
          </h2>
          <p className="text-base text-slate-600 mt-2 font-medium">
            Bottled and distributed by <strong className="text-slate-800">{COMPANY_INFO.parentCompany}</strong>. Connect for doorstep delivery, corporate water tenders, or distributorships.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details & Direct Hotlines */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                Direct Channels
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block">Order Hotline</span>
                    <a href={`tel:${COMPANY_INFO.phone}`} className="font-bold text-slate-900 hover:text-blue-700">
                      {COMPANY_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block">WhatsApp Quick Dispatch</span>
                    <button
                      onClick={handleWhatsAppDirect}
                      className="font-bold text-blue-700 hover:underline text-left"
                    >
                      Chat on {COMPANY_INFO.phoneDisplay}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block">Orders & Corporate Email</span>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="font-semibold text-slate-900 hover:text-blue-700 block">
                      {COMPANY_INFO.email}
                    </a>
                    <a href={`mailto:${COMPANY_INFO.corporateEmail}`} className="text-slate-500 text-xs hover:text-blue-700">
                      {COMPANY_INFO.corporateEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block">Official Web Portal</span>
                    <a href={COMPANY_INFO.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 hover:underline">
                      {COMPANY_INFO.webDomain}
                    </a>
                  </div>
                </div>

                {/* TaurusArts Pixieset Portfolio Link */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="p-2 rounded-lg bg-blue-600 text-white shrink-0">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block font-semibold uppercase">
                      Official Press & Media Gallery
                    </span>
                    <a
                      href={COMPANY_INFO.pixiesetGalleryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 mt-0.5 text-xs"
                    >
                      <span>TaurusArts Client Gallery</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="text-[11px] text-slate-500 block">High-res factory & product stills</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block">Operating & Delivery Hours</span>
                    <p className="font-medium text-slate-700 text-xs leading-relaxed">
                      {COMPANY_INFO.serviceHours}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block">Manufacturing Plant & Hubs</span>
                    <p className="font-medium text-slate-700 text-xs leading-relaxed">
                      {COMPANY_INFO.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="pt-2">
                <button
                  onClick={handleWhatsAppDirect}
                  className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Start Live WhatsApp Chat</span>
                </button>
              </div>
            </div>

          </div>

          {/* Quick Message / Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Send Us a Message
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Fill in the details below and our customer support supervisor will respond within 30 minutes.
              </p>

              {sent ? (
                <div className="py-10 text-center space-y-3 bg-blue-50 rounded-xl border border-blue-200 p-6">
                  <CheckCircle2 className="w-10 h-10 text-blue-600 mx-auto" />
                  <h4 className="text-lg font-bold text-blue-950">Message Received!</h4>
                  <p className="text-xs text-blue-800 max-w-sm mx-auto">
                    Thank you, {formData.name}. Our dispatch coordinator at Ephron Industries is reviewing your request and will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Kamau"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0712 345 678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Enquiry Type
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-lg bg-white"
                      >
                        <option value="general">Home Water Delivery (20L / 10L / 5L)</option>
                        <option value="corporate">Corporate / Office Account</option>
                        <option value="event">Event Bulk Water Order (500ml / 1L Packs)</option>
                        <option value="distributor">Distributor / Wholesale Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Message / Delivery Instructions
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your requirements, estate location, or bottle quantity..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-600/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Enquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
