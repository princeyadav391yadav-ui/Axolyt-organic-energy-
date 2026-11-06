import React, { useState } from 'react';
import { X, Star, Zap, Shield, Check, ShoppingBag, Droplets, Heart } from 'lucide-react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, packType: 'single' | 'pack12') => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [packType, setPackType] = useState<'single' | 'pack12'>('pack12');
  const [activeTab, setActiveTab] = useState<'overview' | 'nutrition' | 'botanicals'>('overview');

  if (!product) return null;

  const currentPrice = packType === 'single' ? product.priceSingle : product.pricePack12;
  const savings = packType === 'pack12' ? 'Save 12%' : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl glass-panel-elevated rounded-3xl border border-emerald-400/30 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl text-emerald-300 hover:text-white hover:bg-emerald-950/80 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Product Gallery & Showcase */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 bg-black/40 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-emerald-500/20">
          <div className="absolute top-6 left-6 z-10">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-400 text-emerald-950">
              {product.badge}
            </span>
          </div>

          <div className="relative w-full max-w-[320px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <ProductImage
              src={product.image}
              alt={product.name}
              productName={product.name}
              accentColor={product.accentColor}
              className="w-full h-full"
            />
          </div>

          {/* Key Quick Stats */}
          <div className="grid grid-cols-3 gap-2 w-full mt-6 max-w-[320px]">
            <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-center">
              <span className="text-[10px] uppercase text-emerald-300/70 block">Caffeine</span>
              <span className="text-sm font-bold text-white font-mono">{product.caffeineMg}mg</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-center">
              <span className="text-[10px] uppercase text-emerald-300/70 block">Calories</span>
              <span className="text-sm font-bold text-white font-mono">{product.calories} kcal</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-center">
              <span className="text-[10px] uppercase text-emerald-300/70 block">Added Sugar</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">0g</span>
            </div>
          </div>
        </div>

        {/* Right Side: Purchasing, Tabs, Nutrition */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto max-h-[500px] md:max-h-[92vh] flex flex-col justify-between text-left space-y-6">
          <div>
            {/* Header info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-emerald-200/80 font-medium">
                  {product.rating} ({product.reviewsCount.toLocaleString()} reviews)
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-300 font-medium">
                {product.tagline}
              </p>
            </div>

            {/* Segmented Tabs */}
            <div className="flex gap-2 p-1 bg-emerald-950/60 rounded-xl border border-emerald-500/20 mt-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'overview'
                    ? 'bg-emerald-500 text-emerald-950 shadow-md'
                    : 'text-emerald-200/75 hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('nutrition')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'nutrition'
                    ? 'bg-emerald-500 text-emerald-950 shadow-md'
                    : 'text-emerald-200/75 hover:text-white'
                }`}
              >
                Nutrition Facts
              </button>
              <button
                onClick={() => setActiveTab('botanicals')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'botanicals'
                    ? 'bg-emerald-500 text-emerald-950 shadow-md'
                    : 'text-emerald-200/75 hover:text-white'
                }`}
              >
                Botanicals
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="mt-4 space-y-4">
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-light">
                  {product.longDescription}
                </p>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-2">
                    Tasting Notes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.flavorNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-lg bg-emerald-900/30 text-emerald-200 border border-emerald-500/20"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Nutrition Facts */}
            {activeTab === 'nutrition' && (
              <div className="mt-4 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/20 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-emerald-500/20 font-bold text-white">
                  <span>Serving Size</span>
                  <span className="font-mono">{product.nutritionFacts.servingSize}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-500/20 text-emerald-200">
                  <span>Calories</span>
                  <span className="font-mono">{product.nutritionFacts.calories}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-500/20 text-emerald-200">
                  <span>Total Carbohydrates</span>
                  <span className="font-mono">{product.nutritionFacts.totalCarbs}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-500/20 text-emerald-200">
                  <span>Total Sugars (Natural Fruit)</span>
                  <span className="font-mono">{product.nutritionFacts.totalSugars}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-500/20 text-emerald-200">
                  <span>Vitamin B6 (Pyridoxal-5-Phosphate)</span>
                  <span className="font-mono">{product.nutritionFacts.vitaminB6}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-500/20 text-emerald-200">
                  <span>Vitamin B12 (Methylcobalamin)</span>
                  <span className="font-mono">{product.nutritionFacts.vitaminB12}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-500/20 text-emerald-200">
                  <span>Vitamin C (Organic Acerola)</span>
                  <span className="font-mono">{product.nutritionFacts.vitaminC}</span>
                </div>
                <div className="flex justify-between py-1 text-emerald-300 font-semibold">
                  <span>Suntheanine® L-Theanine</span>
                  <span className="font-mono">{product.nutritionFacts.lTheanine}</span>
                </div>
              </div>
            )}

            {/* Tab 3: Botanicals */}
            {activeTab === 'botanicals' && (
              <div className="mt-4 space-y-2">
                {product.keyBotanicals.map((botanical, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-100"
                  >
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{botanical}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Pack Size Selector */}
            <div className="mt-6 pt-4 border-t border-emerald-500/20 space-y-2">
              <span className="text-xs uppercase tracking-wider text-emerald-300 font-bold block">
                Select Format:
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPackType('pack12')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    packType === 'pack12'
                      ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-md'
                      : 'bg-emerald-950/30 border-emerald-500/20 text-emerald-200/70 hover:border-emerald-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">12-Pack Case</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-400 text-emerald-950 font-bold">
                      Popular
                    </span>
                  </div>
                  <div className="text-base font-extrabold font-mono text-emerald-300 mt-1">
                    ${product.pricePack12.toFixed(2)}
                  </div>
                  <span className="text-[10px] text-emerald-200/60 block">($3.08 / can)</span>
                </button>

                <button
                  onClick={() => setPackType('single')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    packType === 'single'
                      ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-md'
                      : 'bg-emerald-950/30 border-emerald-500/20 text-emerald-200/70 hover:border-emerald-500/40'
                  }`}
                >
                  <span className="text-xs font-bold block">Single Can</span>
                  <div className="text-base font-extrabold font-mono text-emerald-300 mt-1">
                    ${product.priceSingle.toFixed(2)}
                  </div>
                  <span className="text-[10px] text-emerald-200/60 block">12 fl oz (355ml)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Add To Cart CTA */}
          <div className="pt-4 border-t border-emerald-500/20 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs text-emerald-200/60">Total Amount</div>
              <div className="text-2xl font-bold font-mono text-white">
                ${currentPrice.toFixed(2)}
              </div>
            </div>

            <button
              onClick={() => {
                onAddToCart(product, packType);
                onClose();
              }}
              className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-emerald-950 font-extrabold text-sm transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Bag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
