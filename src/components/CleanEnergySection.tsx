import React from 'react';
import { Check, X, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface CleanEnergySectionProps {
  onOpenStory: () => void;
}

export const CleanEnergySection: React.FC<CleanEnergySectionProps> = ({ onOpenStory }) => {
  const cleanFeatures = [
    {
      title: 'No Artificial Colors or Flavors',
      detail: 'Our vibrant colors originate purely from spirulina, elderberries, and passionfruit juices.',
    },
    {
      title: 'No Preservatives',
      detail: 'Protected naturally through aseptic cold canning and fresh citric acid from organic lemons.',
    },
    {
      title: 'No Refined Sugars',
      detail: '0g added refined sugar. Naturally sweetened with organic monk fruit extract.',
    },
    {
      title: 'Gluten Free & Allergen Safe',
      detail: 'Formulated in a dedicated allergen-free certified facility. 100% celiac safe.',
    },
    {
      title: 'Vegan Friendly & Cruelty Free',
      detail: '100% plant-based bioactive compounds with zero animal testing or gelatin.',
    },
  ];

  return (
    <section id="clean-energy" className="py-24 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and Clean Promises */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Clean Fuel Standard</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              CLEAN ENERGY <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400">
                YOU CAN FEEL.
              </span>
            </h2>

            <p className="text-emerald-100/80 text-base sm:text-lg leading-relaxed font-light">
              Most energy drinks blast your nervous system with synthesized chemical spikes followed by a crushing mental slump. AXOLYT harmonizes with your biochemistry.
            </p>

            {/* Clean Feature List */}
            <div className="space-y-3.5 pt-2">
              {cleanFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="group glass-panel p-4 rounded-2xl border border-emerald-500/20 hover:border-emerald-400/50 hover:bg-emerald-950/40 hover:-translate-x-1 hover:shadow-lg hover:shadow-emerald-950/50 transition-all duration-300 flex items-start gap-4 cursor-default"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 group-hover:bg-emerald-500/40 group-hover:scale-110 flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300">
                    <Check className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-emerald-200/70 mt-0.5 leading-relaxed">
                      {feat.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Discover Our Story CTA */}
            <div className="pt-4">
              <button
                onClick={onOpenStory}
                className="group px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/30 flex items-center gap-2"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: Comparison Matrix Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-emerald-400/30 shadow-2xl space-y-6 text-left">
              <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20">
                <h3 className="font-display font-extrabold text-xl text-white">
                  The Biological Difference
                </h3>
                <span className="text-xs font-semibold text-emerald-400">Pure vs Synthetic</span>
              </div>

              {/* Rows */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/20 space-y-1">
                  <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold">
                    Caffeine Source
                  </span>
                  <div className="flex justify-between items-center text-white">
                    <span className="font-semibold text-emerald-300">AXOLYT: Organic Green Tea &amp; Yerba Mate</span>
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>
                  <div className="flex justify-between items-center text-emerald-200/50 line-through">
                    <span>Synthetics: Petroleum Urea Anhydrous</span>
                    <X className="w-4 h-4 text-red-400 shrink-0" />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/20 space-y-1">
                  <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold">
                    Added Sugar &amp; Sweeteners
                  </span>
                  <div className="flex justify-between items-center text-white">
                    <span className="font-semibold text-emerald-300">AXOLYT: 0g Added Sugar (Organic Monk Fruit)</span>
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>
                  <div className="flex justify-between items-center text-emerald-200/50 line-through">
                    <span>Synthetics: 27g High-Fructose Corn Syrup or Sucralose</span>
                    <X className="w-4 h-4 text-red-400 shrink-0" />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/20 space-y-1">
                  <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold">
                    Afternoon Crash Risk
                  </span>
                  <div className="flex justify-between items-center text-white">
                    <span className="font-semibold text-emerald-300">AXOLYT: Zero Crash (L-Theanine Smooth Curve)</span>
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>
                  <div className="flex justify-between items-center text-emerald-200/50 line-through">
                    <span>Synthetics: Severe 2-hour adrenaline cliff</span>
                    <X className="w-4 h-4 text-red-400 shrink-0" />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/20 space-y-1">
                  <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold">
                    Adaptogenic Stress Buffer
                  </span>
                  <div className="flex justify-between items-center text-white">
                    <span className="font-semibold text-emerald-300">AXOLYT: KSM-66 Ashwagandha &amp; Ginseng</span>
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>
                  <div className="flex justify-between items-center text-emerald-200/50 line-through">
                    <span>Synthetics: Zero adaptogens, elevated cortisol</span>
                    <X className="w-4 h-4 text-red-400 shrink-0" />
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center text-xs text-emerald-200/60">
                100% Non-GMO Project Verified &amp; USDA Organic Certified
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
