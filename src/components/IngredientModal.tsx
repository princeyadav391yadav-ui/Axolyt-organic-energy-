import React from 'react';
import { X, CheckCircle2, MapPin, Sparkles, BookOpen } from 'lucide-react';
import { IngredientDetail } from '../types';

interface IngredientModalProps {
  ingredient: IngredientDetail | null;
  onClose: () => void;
}

export const IngredientModal: React.FC<IngredientModalProps> = ({ ingredient, onClose }) => {
  if (!ingredient) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-emerald-400/30 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-emerald-300 hover:text-white hover:bg-emerald-900/50 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8 text-left">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            {ingredient.highlightTag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            {ingredient.title}
          </h2>
          <p className="text-sm text-emerald-300 font-medium">{ingredient.subtitle}</p>
        </div>

        {/* Description */}
        <p className="mt-4 text-emerald-100/80 text-sm leading-relaxed text-left">
          {ingredient.description}
        </p>

        {/* Detailed Points */}
        <div className="mt-6 space-y-3 text-left">
          <h4 className="text-xs uppercase tracking-wider text-emerald-400 font-bold">
            Botanical Composition & Benefits
          </h4>
          <div className="space-y-2.5">
            {ingredient.detailedPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/15">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-light">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scientific Backing */}
        <div className="mt-6 p-4 rounded-2xl bg-emerald-900/20 border border-emerald-500/25 text-left">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1.5">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Clinical & Scientific Backing</span>
          </div>
          <p className="text-xs text-emerald-100/80 leading-relaxed">
            {ingredient.scientificBacking}
          </p>
        </div>

        {/* Origin & Sourcing */}
        <div className="mt-4 flex items-center gap-2 text-xs text-emerald-300/80 text-left">
          <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Origin: {ingredient.origin}</span>
        </div>

        {/* Footer close action */}
        <div className="mt-6 pt-4 border-t border-emerald-500/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-sm transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
