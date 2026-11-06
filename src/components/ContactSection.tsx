import React, { useState } from 'react';
import { Phone, MapPin, Mail, Clock, Send, CheckCircle2, MessageCircle, ExternalLink, Navigation } from 'lucide-react';

interface ContactSectionProps {
  onNotify?: (type: 'success' | 'info', title: string, message?: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onNotify }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onNotify) {
        onNotify('success', 'Message Sent!', 'Our team in Hansi, Haryana will respond shortly.');
      }
    }, 600);
  };

  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Hansi,+Haryana+125033';
  const googleMapsEmbedUrl = 'https://maps.google.com/maps?q=Hansi%2C%20Haryana%20125033&t=&z=14&ie=UTF8&iwloc=&output=embed';

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-emerald-600/10 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wider uppercase">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Connect &amp; Distribution Hub</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Get in Touch With AXOLYT.
          </h2>
          <p className="text-emerald-100/75 text-sm sm:text-base max-w-2xl font-light">
            Have questions about our botanical energy formulas, bulk wholesale distribution, or retail availability? Reach our team directly.
          </p>
        </div>

        {/* 3 Main Contact Detail Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Phone & WhatsApp */}
          <div className="glass-panel-elevated p-6 rounded-3xl border border-emerald-500/25 space-y-3 text-left group hover:border-emerald-400/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold block">
                Direct Phone &amp; Support
              </span>
              <a
                href="tel:8950255662"
                className="text-xl font-bold font-mono text-white hover:text-emerald-300 transition-colors inline-block mt-0.5"
              >
                +91 8950255662
              </a>
              <p className="text-xs text-emerald-200/70 mt-1">
                Mon – Sat from 9:00 AM – 7:00 PM IST
              </p>
            </div>
            <div className="pt-2 flex gap-2">
              <a
                href="tel:8950255662"
                className="py-1.5 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
              <a
                href="https://wa.me/918950255662"
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Card 2: Address Location */}
          <div className="glass-panel-elevated p-6 rounded-3xl border border-emerald-500/25 space-y-3 text-left group hover:border-emerald-400/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold block">
                Official Location &amp; Hub
              </span>
              <h3 className="text-xl font-bold font-display text-white mt-0.5">
                Hansi, Haryana
              </h3>
              <p className="text-xs text-emerald-300 font-mono mt-0.5">
                PIN: 125033, India
              </p>
              <p className="text-xs text-emerald-200/70 mt-1 leading-relaxed">
                Central Northern Distribution &amp; Customer Coordination Office.
              </p>
            </div>
            <div className="pt-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                <span>Directions on Google Maps</span>
              </a>
            </div>
          </div>

          {/* Card 3: Email & Business Hours */}
          <div className="glass-panel-elevated p-6 rounded-3xl border border-emerald-500/25 space-y-3 text-left group hover:border-emerald-400/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold block">
                Electronic Inquiries
              </span>
              <a
                href="mailto:support@axolytenergy.com"
                className="text-lg font-bold font-mono text-white hover:text-emerald-300 transition-colors inline-block mt-0.5"
              >
                support@axolytenergy.com
              </a>
              <div className="flex items-center gap-1.5 text-xs text-emerald-200/70 mt-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>2-Hour priority email response guarantee</span>
              </div>
            </div>
            <div className="pt-2">
              <span className="text-[11px] text-emerald-300/80 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/20">
                Wholesale &amp; Retail Inquiries Welcome
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column Split: Google Maps Location Attach & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column (7 Cols): Google Maps Location Embed Container */}
          <div className="lg:col-span-7 glass-panel-elevated rounded-3xl p-4 sm:p-6 border border-emerald-500/30 shadow-2xl flex flex-col justify-between text-left">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <div>
                  <h4 className="font-display font-bold text-white text-base">
                    Google Maps Location
                  </h4>
                  <span className="text-xs text-emerald-300/70 font-mono">
                    Hansi, Haryana 125033, India
                  </span>
                </div>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Embedded Google Maps iFrame */}
            <div className="relative w-full h-[340px] sm:h-[400px] rounded-2xl overflow-hidden border border-emerald-500/25 shadow-inner bg-black/40">
              <iframe
                title="Google Maps Location of Hansi, Haryana 125033"
                src={googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter contrast-105"
              />

              {/* Floating Map Info Overlay */}
              <div className="absolute bottom-3 left-3 right-3 sm:right-auto glass-panel-elevated p-3 rounded-xl border border-emerald-400/30 text-xs text-left shadow-lg pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-bold text-white">AXOLYT Regional Office</span>
                </div>
                <div className="text-[11px] text-emerald-200/80 mt-0.5">
                  Hansi, Haryana (125033) · Phone: +91 8950255662
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-emerald-200/60 pt-2">
              <span>Geo Coordinates: 29.1004° N, 75.9620° E (Hansi)</span>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-white transition-colors underline font-medium"
              >
                View Larger Map on Google Maps →
              </a>
            </div>
          </div>

          {/* Right Column (5 Cols): Direct Message Form */}
          <div className="lg:col-span-5 glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl flex flex-col justify-between text-left">
            <div>
              <div className="space-y-1 mb-5">
                <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">
                  Send A Message
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                  Direct Inquiries
                </h3>
                <p className="text-xs text-emerald-200/70">
                  Fill in your details and we&apos;ll get back to you via phone or email.
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-10 text-center space-y-4 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Message Received!</h4>
                  <p className="text-xs text-emerald-200/80 leading-relaxed max-w-xs mx-auto">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Our Hansi team has received your message and will call or email you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        subject: 'General Inquiry',
                        message: '',
                      });
                    }}
                    className="px-5 py-2 rounded-xl bg-emerald-500 text-emerald-950 font-bold text-xs"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-emerald-300 font-bold mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/20 text-white text-xs placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-emerald-300 font-bold mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 8950255662"
                        className="w-full p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/20 text-white text-xs placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-emerald-300 font-bold mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/20 text-white text-xs placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-emerald-300 font-bold mb-1">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/20 text-white text-xs focus:outline-none focus:border-emerald-400"
                    >
                      <option value="General Inquiry" className="bg-[#051109]">General Inquiry</option>
                      <option value="Retail & Wholesale" className="bg-[#051109]">Wholesale &amp; Retail Supply</option>
                      <option value="Distribution in Haryana" className="bg-[#051109]">Distribution Partnership</option>
                      <option value="Corporate Orders" className="bg-[#051109]">Corporate / Event Orders</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-emerald-300 font-bold mb-1">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your message or inquiry here..."
                      className="w-full p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/20 text-white text-xs placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400 leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-emerald-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="pt-4 border-t border-emerald-500/15 text-[11px] text-emerald-200/50 mt-3">
              We respond promptly during business hours (IST).
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
