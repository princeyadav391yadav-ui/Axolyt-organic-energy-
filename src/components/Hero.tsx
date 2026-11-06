import React, { useState } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Leaf, Check, Heart } from 'lucide-react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';
import heroWaterfallImg from '../assets/images/hero_waterfall_forest.jpg';

interface HeroProps {
  products: Product[];
  onAddToCart: (product: Product, packType: 'single' | 'pack12') => void;
  onOpenDetails: (product: Product) => void;
}

export const Hero: React.FC<HeroProps> = ({ products, onAddToCart, onOpenDetails }) => {
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [bgSrc, setBgSrc] = useState(heroWaterfallImg || '/images/hero_waterfall_forest.jpg');
  const activeProduct = products[selectedProductIndex] || products[0];

  const handleBgError = () => {
    // If bundled asset fails or is not found, fallback to public paths
    if (bgSrc !== '/images/hero_waterfall_forest.jpg') {
      setBgSrc('/images/hero_waterfall_forest.jpg');
    } else {
      setBgSrc('./images/hero_waterfall_forest.jpg');
    }
  };

  const scrollToShop = () => {
    const el = document.getElementById('shop');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Image: Pristine Waterfall & Mystic Forest */}
      <div className="absolute inset-0 z-0 bg-[#040e07]">
        <img
          src={bgSrc}
          alt="Pristine mystical rainforest with waterfall"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-110"
          referrerPolicy="no-referrer"
          onError={handleBgError}
        />
        {/* Measured Scrim & Radial Vignette for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#040e07]/95 via-[#040e07]/80 to-[#040e07]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051109] via-transparent to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(16,185,129,0.15),transparent_55%)] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Copy & Feature Highlights */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Nature. Energy. Elevated.</span>
            </div>

            {/* Giant Display Headline */}
            <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08] text-balance">
              NATURE. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400">
                ENERGY.
              </span>{' '}
              <br className="hidden sm:inline" />
              ELEVATED.
            </h1>

            {/* Short Brand Description */}
            <p className="text-base sm:text-lg text-emerald-100/85 max-w-2xl leading-relaxed font-light">
              Crafted from wild botanicals, raw ceremonial grade matcha, organic adaptogens, and crisp mountain spring water. Pure botanical vitality with zero crash, zero artificial sweeteners, and zero junk.
            </p>

            {/* Three Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="glass-panel-subtle p-3.5 rounded-xl border border-emerald-500/20 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <Leaf className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">100% Organic</h4>
                  <p className="text-xs text-emerald-200/70">USDA Certified Pure</p>
                </div>
              </div>

              <div className="glass-panel-subtle p-3.5 rounded-xl border border-emerald-500/20 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Natural Energy</h4>
                  <p className="text-xs text-emerald-200/70">120mg Plant Caffeine</p>
                </div>
              </div>

              <div className="glass-panel-subtle p-3.5 rounded-xl border border-emerald-500/20 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">No Junk Ever</h4>
                  <p className="text-xs text-emerald-200/70">Zero Artificial Additives</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollToShop}
                className="group px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-emerald-950 font-bold text-base hover:from-emerald-400 hover:to-teal-300 transition-all duration-200 shadow-lg shadow-emerald-500/30 flex items-center gap-2 hover:gap-3"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={() => onOpenDetails(activeProduct)}
                className="px-6 py-3.5 rounded-xl glass-panel text-emerald-200 hover:text-white hover:bg-emerald-800/30 border border-emerald-500/30 font-semibold text-sm transition-colors"
              >
                View Flavor Profile
              </button>

              <div className="flex items-center gap-2 text-xs text-emerald-200/60 ml-2">
                <span>Free delivery over $40</span>
                <span>·</span>
                <span>30-day freshness guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Can Hero Display */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Ambient emerald back-glow */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none -z-10" />

            {/* Product Card Container */}
            <div className="relative group w-full max-w-sm sm:max-w-md">
              <div className="relative glass-panel-elevated p-6 rounded-3xl border border-emerald-400/25 overflow-hidden transition-all duration-300 hover:border-emerald-400/40">
                {/* Floating badge */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-400 text-emerald-950 shadow-md">
                    {activeProduct.badge}
                  </span>
                </div>

                {/* Hero Product Image */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 flex items-center justify-center p-2">
                  <ProductImage
                    src={activeProduct.image}
                    alt={`${activeProduct.name} Energy Drink Can`}
                    productName={activeProduct.name}
                    accentColor={activeProduct.accentColor}
                    className="w-full h-full rounded-xl transition-all duration-500 group-hover:scale-105"
                  />
                  {/* Subtle inner gloss reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-40" />
                </div>

                {/* Product Info below image */}
                <div className="mt-5 space-y-2 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold font-display text-white">{activeProduct.name}</h3>
                      <p className="text-xs text-emerald-300 font-medium">{activeProduct.tagline}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-300 font-mono">
                        ${activeProduct.priceSingle.toFixed(2)}
                      </div>
                      <span className="text-[11px] text-emerald-200/60">Single Can / 12 fl oz</span>
                    </div>
                  </div>

                  {/* Flavor Notes pills / dots */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeProduct.flavorNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2.5 py-0.5 rounded-md bg-emerald-900/40 text-emerald-200 border border-emerald-500/20"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  {/* Add To Cart Button for Hero Product */}
                  <div className="pt-3 flex gap-2">
                    <button
                      onClick={() => onAddToCart(activeProduct, 'single')}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-sm transition-all duration-200 shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </button>
                    <button
                      onClick={() => onOpenDetails(activeProduct)}
                      className="p-2.5 rounded-xl glass-panel text-emerald-200 hover:text-white border border-emerald-500/20"
                      title="View Details"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Flavor Switcher Controls */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 max-w-sm sm:max-w-md mx-auto">
                <span className="text-[11px] text-emerald-200/60 mr-1 w-full text-center sm:w-auto">Flavors:</span>
                {products.map((prod, idx) => {
                  const isSelected = selectedProductIndex === idx;
                  return (
                    <button
                      key={prod.id}
                      onClick={() => setSelectedProductIndex(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-emerald-500 text-emerald-950 font-bold shadow-md shadow-emerald-500/25'
                          : 'glass-panel text-emerald-200/70 hover:text-white hover:bg-emerald-900/50'
                      }`}
                    >
                      {prod.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
