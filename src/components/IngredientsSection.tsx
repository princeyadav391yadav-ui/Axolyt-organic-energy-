import React, { useState } from 'react';
import { INGREDIENT_DETAILS } from '../data/products';
import { IngredientDetail } from '../types';
import { IngredientModal } from './IngredientModal';
import { IngredientTiltCard } from './IngredientTiltCard';
import ingredientsShowcaseImg from '../assets/images/ingredients_showcase.jpg';

export const IngredientsSection: React.FC = () => {
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientDetail | null>(null);
  const [imgSrc, setImgSrc] = useState(ingredientsShowcaseImg || '/images/ingredients_showcase.jpg');

  const handleImgError = () => {
    if (imgSrc !== '/images/ingredients_showcase.jpg') {
      setImgSrc('/images/ingredients_showcase.jpg');
    } else {
      setImgSrc('./images/ingredients_showcase.jpg');
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
          <div className="relative aspect-[16/7] sm:aspect-[16/6] rounded-2xl overflow-hidden bg-emerald-950/40">
            <img
              src={imgSrc}
              alt="Raw organic botanicals, matcha, ginseng, and wild berries"
              className="w-full h-full object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
              onError={handleImgError}
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

        {/* 3 Interactive Cards with Framer Motion Parallax & Tilt-Shift */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {INGREDIENT_DETAILS.map((ing, index) => (
            <IngredientTiltCard
              key={ing.id}
              ingredient={ing}
              index={index}
              onSelect={setSelectedIngredient}
            />
          ))}
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
