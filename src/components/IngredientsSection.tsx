import React, { useState } from 'react';
import { Leaf, Zap, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { INGREDIENT_DETAILS } from '../data/products';
import { IngredientDetail } from '../types';
import { IngredientModal } from './IngredientModal';

export const IngredientsSection: React.FC = () => {
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientDetail | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Leaf':
        return Leaf;
      case 'Zap':
        return Zap;
      case 'Sparkles':
      default:
        return Sparkles;
    }
  };

  return (
    <section id="ingredients" className="py-24 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-600/10 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wider uppercase">
            <span>Bioactive Botanical Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Purity You Can Trace. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">
              Power You Can Feel.
            </span>
          </h2>
          <p className="text-emerald-100/75 text-base sm:text-lg leading-relaxed font-light">
            We ditched lab-synthesized stimulants and petroleum-derived vitamins in favor of whole, living plants that nurture your endocrine and cellular vitality.
          </p>
        </div>

        {/* Artisanal Ingredients Showcase Banner */}
        <div className="mt-12 relative rounded-3xl overflow-hidden glass-panel-elevated border border-emerald-500/30 p-2 sm:p-3 shadow-2xl">
          <div className="relative aspect-[16/7] sm:aspect-[16/6] rounded-2xl overflow-hidden">
            <img
              src="/src/assets/images/ingredients_showcase_1793959513201.jpg"
              alt="Raw organic botanicals, matcha, ginseng, and wild berries"
              className="w-full h-full object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end p-6 sm:p-10">
              <div className="max-w-xl text-left space-y-2">
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                  Wild Harvested &amp; Cold Extracted
                </span>
                <h3 className="text-xl sm:text-3xl font-display font-bold text-white">
                  Japanese Ceremonial Matcha, Amazonian Yerba Mate &amp; Elderberry
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/80 hidden sm:block">
                  Every batch is steeped below 45°C to preserve bioactive polyphenols, antioxidants, and delicate aroma molecules.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Interactive Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {INGREDIENT_DETAILS.map((ing) => {
            const Icon = getIcon(ing.iconName);
            return (
              <div
                key={ing.id}
                className="group relative glass-panel-elevated p-6 sm:p-8 rounded-3xl border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300 flex flex-col justify-between text-left hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-950/60"
              >
                <div>
                  {/* Icon & highlight tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-300/80 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/20">
                      {ing.highlightTag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-white group-hover:text-emerald-300 transition-colors">
                    {ing.title}
                  </h3>
                  <p className="text-xs text-emerald-400/90 font-medium mt-1 mb-3">
                    {ing.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-emerald-100/75 leading-relaxed">
                    {ing.description}
                  </p>

                  {/* Highlights preview */}
                  <div className="mt-4 space-y-1.5 pt-4 border-t border-emerald-500/15">
                    {ing.detailedPoints.slice(0, 2).map((point, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-emerald-200/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4">
                  <button
                    onClick={() => setSelectedIngredient(ing)}
                    className="w-full py-2.5 px-4 rounded-xl glass-panel text-emerald-200 group-hover:text-emerald-950 group-hover:bg-emerald-400 font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-2 border border-emerald-400/30"
                  >
                    <span>Learn More &amp; Science</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ingredient Fact Modal */}
      <IngredientModal
        ingredient={selectedIngredient}
        onClose={() => setSelectedIngredient(null)}
      />
    </section>
  );
};
