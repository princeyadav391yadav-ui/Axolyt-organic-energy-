import React from 'react';
import { Sprout, Globe, BatteryCharging, Sparkles } from 'lucide-react';

export const BenefitsBar: React.FC = () => {
  const benefits = [
    {
      icon: Sprout,
      title: 'Plant-Based Formula',
      desc: 'Sourced from organic green tea, raw yerba mate & ceremonial grade matcha.',
    },
    {
      icon: Globe,
      title: 'Sustainably Sourced',
      desc: '100% wild-foraged and regenerative agricultural partnerships worldwide.',
    },
    {
      icon: BatteryCharging,
      title: 'Clean Energy',
      desc: 'Sustained 6-hour vitality powered by L-Theanine without jitters or sugar crashes.',
    },
    {
      icon: Sparkles,
      title: 'Great Taste',
      desc: 'Crisp, refreshing botanical fruit essences naturally sweetened with zero junk.',
    },
  ];

  return (
    <section id="benefits" className="relative z-20 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-panel-elevated rounded-2xl p-6 sm:p-8 border border-emerald-500/25 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-3 rounded-xl hover:bg-emerald-900/20 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-400/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <Icon className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="space-y-1 text-left">
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {b.title}
                  </h3>
                  <p className="text-xs text-emerald-100/70 leading-relaxed font-normal">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
