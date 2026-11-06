import React from 'react';
import { X, Heart, Shield, Sparkles, Sprout, Globe, Droplets } from 'lucide-react';

interface OurStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OurStoryModal: React.FC<OurStoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl glass-panel-elevated rounded-3xl p-6 sm:p-10 border border-emerald-400/30 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-emerald-300 hover:text-white hover:bg-emerald-950/80 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-3">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
            The AXOLYT Genesis
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            Born Beneath Cascading Waters.
          </h2>
          <p className="text-emerald-300 font-medium text-sm">
            Nature. Energy. Elevated.
          </p>
        </div>

        {/* Narrative */}
        <div className="mt-6 space-y-4 text-emerald-100/85 text-sm sm:text-base leading-relaxed font-light">
          <p>
            AXOLYT was founded with a single uncompromising realization: modern energy drinks were built on petrochemical stimulants, synthetic caffeine powder, and artificial sweeteners that rob your body of natural equilibrium.
          </p>
          <p>
            During an expedition across the misty rainforests of the Pacific Northwest, our team was mesmerized by the resilience of the ancient river ecosystems. Moss grew thick on basalt cliffs, fed by perpetual waterfall mist, while indigenous botanical shrubs thrived without artificial intervention.
          </p>
          <p>
            We asked ourselves: <em className="text-emerald-300 font-normal">What if an energy drink worked with your body instead of fighting it?</em>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/20 space-y-1">
              <Sprout className="w-5 h-5 text-emerald-400 mb-2" />
              <h4 className="text-sm font-bold text-white">100% Regenerative</h4>
              <p className="text-xs text-emerald-200/70">Ingredients harvested to enrich wild soil health.</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/20 space-y-1">
              <Droplets className="w-5 h-5 text-emerald-400 mb-2" />
              <h4 className="text-sm font-bold text-white">Aquifer Water</h4>
              <p className="text-xs text-emerald-200/70">Naturally mineralized crystalline mountain spring water.</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/20 space-y-1">
              <Globe className="w-5 h-5 text-emerald-400 mb-2" />
              <h4 className="text-sm font-bold text-white">1% For The Planet</h4>
              <p className="text-xs text-emerald-200/70">Every can funds wild freshwater river conservation.</p>
            </div>
          </div>

          <p>
            Today, every can of AXOLYT delivers pure ceremonial matcha from Uji, shade-grown yerba mate from Misiones, and clinical adaptogens like KSM-66 Ashwagandha. No jittery spikes, no afternoon crashes—just crystal-clear alertness and physical vitality that lasts.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center font-display font-bold text-emerald-300">
              A
            </div>
            <div>
              <div className="text-sm font-bold text-white">The AXOLYT Founders Collective</div>
              <div className="text-xs text-emerald-300/70">Cascade Range, Oregon</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-sm transition-colors"
          >
            Explore Drinks
          </button>
        </div>
      </div>
    </div>
  );
};
