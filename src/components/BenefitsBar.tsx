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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="group relative p-4 rounded-2xl border border-transparent hover:border-emerald-500/30 hover:bg-emerald-950/40 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-950/50 transition-all duration-300 flex items-start gap-4 cursor-default overflow-hidden"
              >
                {/* Subtle ambient light on hover */}
                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-emerald-500/10 group-hover:bg-emerald-400/20 blur-xl pointer-events-none transition-all duration-300 group-hover:scale-125" />

                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-400/30 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-emerald-500/30 group-hover:border-emerald-400/60 group-hover:shadow-md group-hover:shadow-emerald-500/20 transition-all duration-300">
                  <Icon className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                </div>
                <div className="space-y-1 text-left relative z-10">
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
