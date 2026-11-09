import React from 'react';
import { Leaf, Users, Star, Recycle } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      value: '100%',
      label: 'Certified Organic',
      subtext: 'USDA & Non-GMO Project Verified',
      icon: Leaf,
    },
    {
      value: '50K+',
      label: 'Happy Customers',
      subtext: 'Athletes & creators energized',
      icon: Users,
    },
    {
      value: '4.9/5',
      label: 'Average Rating',
      subtext: 'Over 8,400+ verified drink reviews',
      icon: Star,
    },
    {
      value: 'Eco First',
      label: 'Circular Aluminum',
      subtext: '100% infinitely recyclable cans',
      icon: Recycle,
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-emerald-500/25 text-left relative overflow-hidden group hover:border-emerald-400/60 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/15 transition-all duration-300 cursor-default"
              >
                {/* Background glow on hover */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-400/25 transition-all duration-500 pointer-events-none group-hover:scale-125" />

                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-400/25 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-emerald-500/30 group-hover:border-emerald-400/50 transition-all duration-300">
                  <Icon className="w-5 h-5 group-hover:text-emerald-300 transition-colors" />
                </div>

                <div className="font-display text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight glow-text-emerald group-hover:scale-105 origin-left transition-transform duration-300">
                  {stat.value}
                </div>

                <h3 className="text-base font-bold text-emerald-200 mt-2 mb-1">
                  {stat.label}
                </h3>

                <p className="text-xs text-emerald-200/60 leading-relaxed">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
