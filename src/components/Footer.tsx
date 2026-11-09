import React, { useState } from 'react';
import { ArrowUp, Heart, Shield, Sparkles, X, Volume2 } from 'lucide-react';
import { AudioAmbianceController } from './AudioAmbianceController';

interface FooterProps {
  onOpenStory: () => void;
  onOpenIngredients: () => void;
  onOpenShop: () => void;
  onOpenBlog: () => void;
  onOpenAdmin?: () => void;
  isAdmin?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenStory,
  onOpenIngredients,
  onOpenShop,
  onOpenBlog,
  onOpenAdmin,
  isAdmin,
}) => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | 'shipping' | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="relative border-t border-emerald-500/20 bg-[#030b06] text-emerald-100/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-emerald-500/15">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-emerald-950 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <span className="font-display font-extrabold tracking-wider text-2xl text-white">
                AXOLYT
              </span>
            </div>

            <p className="text-xs sm:text-sm text-emerald-200/70 max-w-sm leading-relaxed font-light">
              Nature. Energy. Elevated. Pure organic energy drinks crafted from ceremonial matcha, raw yerba mate, and adaptogens.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#contact"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-emerald-300 hover:text-white hover:bg-emerald-800/40 border border-emerald-500/30 transition-all hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#contact"
                aria-label="X (Twitter)"
                className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-emerald-300 hover:text-white hover:bg-emerald-800/40 border border-emerald-500/30 transition-all hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="#contact"
                aria-label="YouTube"
                className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-emerald-300 hover:text-white hover:bg-emerald-800/40 border border-emerald-500/30 transition-all hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={onOpenShop}
                  className="hover:text-white transition-colors"
                >
                  Shop All Flavors
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenIngredients}
                  className="hover:text-white transition-colors"
                >
                  Bioactive Ingredients
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenStory}
                  className="hover:text-white transition-colors"
                >
                  Our Genesis &amp; Story
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBlog}
                  className="hover:text-white transition-colors"
                >
                  The Botanical Journal
                </button>
              </li>
            </ul>
          </div>

          {/* Sourcing & Ecology */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              Commitment
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="text-emerald-200/70">100% USDA Organic</li>
              <li className="text-emerald-200/70">Non-GMO Project Verified</li>
              <li className="text-emerald-200/70">1% for the Planet Member</li>
              <li className="text-emerald-200/70">Certified B Corporation</li>
              <li className="text-emerald-200/70">BPA-Free Recycled Cans</li>
            </ul>
          </div>

          {/* Help & Policies */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              Support &amp; Trust
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => setLegalModal('shipping')}
                  className="hover:text-white transition-colors text-left"
                >
                  Shipping &amp; Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLegalModal('privacy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLegalModal('terms')}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li className="pt-1">
                <a
                  href="tel:8950255662"
                  className="text-emerald-300 font-mono text-xs hover:text-white transition-colors flex items-center gap-1 font-bold"
                >
                  <span>📞 +91 8950255662</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Hansi,+Haryana+125033"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-200/80 hover:text-white text-xs transition-colors block"
                >
                  📍 Hansi, Haryana (125033)
                </a>
              </li>
              <li className="text-emerald-300 font-mono text-xs">
                hello@axolytenergy.com
              </li>
              {onOpenAdmin && (
                <li className="pt-2">
                  <button
                    onClick={onOpenAdmin}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 hover:text-white hover:bg-emerald-900/40 text-[11px] font-mono transition-all"
                  >
                    <Shield className="w-3 h-3 text-emerald-400" />
                    <span>Admin Panel</span>
                    {isAdmin && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Sensory Nature Audio Ambiance Controller */}
        <div className="py-6 border-b border-emerald-500/15">
          <AudioAmbianceController />
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/60">
          <div>
            &copy; {new Date().getFullYear()} AXOLYT Organic Energy LLC. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>Formulated in Oregon, USA</span>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-emerald-300 hover:text-white transition-colors font-medium"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Legal Dialog Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div
            className="relative w-full max-w-xl glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-emerald-400/30 text-left max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-emerald-300 hover:text-white hover:bg-emerald-950/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {legalModal === 'shipping' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-display text-white">
                  Shipping &amp; Freshness Guarantee
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                  We ship all orders directly from our temperature-controlled facility in recyclable thermal packaging. Orders over $40 receive complimentary 2-day priority shipping anywhere in the contiguous United States.
                </p>
                <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-400">
                  30-Day Taste &amp; Vitality Guarantee
                </h4>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                  If you don&apos;t love the crisp flavor and clean feeling of AXOLYT, simply email hello@axolytenergy.com within 30 days for a full replacement or refund. Keep the remaining cans on us.
                </p>
              </div>
            )}

            {legalModal === 'privacy' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-display text-white">
                  Privacy Policy
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                  At AXOLYT, your personal privacy is treated with the same uncompromising integrity as our botanical ingredients. We do not sell, rent, or trade your personal information with third-party advertising networks.
                </p>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                  Customer order data and delivery addresses are encrypted via AES-256 and used solely to fulfill your orders and deliver account notifications.
                </p>
              </div>
            )}

            {legalModal === 'terms' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-display text-white">
                  Terms of Service
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                  By accessing the AXOLYT website and placing orders, you agree to these terms. All products are intended for healthy adults seeking natural functional vitality.
                </p>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                  Statements regarding adaptogens have not been evaluated by the FDA and are not intended to diagnose, treat, cure, or prevent any disease.
                </p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-emerald-500/20 flex justify-end">
              <button
                onClick={() => setLegalModal(null)}
                className="px-5 py-2 rounded-xl bg-emerald-500 text-emerald-950 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
