import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Eye, Star, Sparkles, Filter, Grid, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';

interface ProductCarouselProps {
  products: Product[];
  onAddToCart: (product: Product, packType: 'single' | 'pack12') => void;
  onOpenDetails: (product: Product) => void;
  searchQuery: string;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  onAddToCart,
  onOpenDetails,
  searchQuery,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [packTypes, setPackTypes] = useState<Record<string, 'single' | 'pack12'>>({
    'green-spring': 'pack12',
    'wild-berry': 'pack12',
    'tropic-rush': 'pack12',
    'glacier-frost': 'pack12',
    'crimson-zen': 'pack12',
    'golden-dawn': 'pack12',
  });
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('grid');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'zero-sugar' | 'recovery' | 'max-focus'>('all');

  // Filter products based on search and optional tag filter
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.flavorNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.keyBotanicals.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedFilter === 'zero-sugar') {
      return p.sugarG === 0;
    }
    if (selectedFilter === 'recovery') {
      return p.id === 'crimson-zen' || p.id === 'wild-berry';
    }
    if (selectedFilter === 'max-focus') {
      return p.caffeineMg >= 125;
    }
    return true;
  });

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? filteredProducts.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === filteredProducts.length - 1 ? 0 : prev + 1));
  };

  const togglePackType = (productId: string, type: 'single' | 'pack12') => {
    setPackTypes((prev) => ({ ...prev, [productId]: type }));
  };

  return (
    <section id="shop" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left space-y-3">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              The AXOLYT Lineup
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
              Signature Flavors.
            </h2>
            <p className="text-emerald-100/75 text-sm sm:text-base max-w-xl font-light">
              Crafted in small batches with cold-pressed fruits, organic ceremonial matcha, and wild forest adaptogens.
            </p>
          </div>

          {/* Filtering & View Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter buttons */}
            <div className="flex items-center gap-1 p-1 bg-emerald-950/60 rounded-xl border border-emerald-500/20 text-xs font-medium">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  selectedFilter === 'all'
                    ? 'bg-emerald-500 text-emerald-950 font-bold'
                    : 'text-emerald-200/70 hover:text-white'
                }`}
              >
                All (6)
              </button>
              <button
                onClick={() => setSelectedFilter('zero-sugar')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  selectedFilter === 'zero-sugar'
                    ? 'bg-emerald-500 text-emerald-950 font-bold'
                    : 'text-emerald-200/70 hover:text-white'
                }`}
              >
                Zero Sugar
              </button>
              <button
                onClick={() => setSelectedFilter('recovery')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  selectedFilter === 'recovery'
                    ? 'bg-emerald-500 text-emerald-950 font-bold'
                    : 'text-emerald-200/70 hover:text-white'
                }`}
              >
                Calm &amp; Recovery
              </button>
              <button
                onClick={() => setSelectedFilter('max-focus')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  selectedFilter === 'max-focus'
                    ? 'bg-emerald-500 text-emerald-950 font-bold'
                    : 'text-emerald-200/70 hover:text-white'
                }`}
              >
                Max Focus
              </button>
            </div>

            {/* Layout Toggle */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-emerald-950/60 rounded-xl border border-emerald-500/20">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-emerald-500 text-emerald-950'
                    : 'text-emerald-300/70 hover:text-white'
                }`}
                title="Grid View"
                aria-label="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('carousel')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'carousel'
                    ? 'bg-emerald-500 text-emerald-950'
                    : 'text-emerald-300/70 hover:text-white'
                }`}
                title="Carousel View"
                aria-label="Carousel View"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Empty state for search */}
        {filteredProducts.length === 0 && (
          <div className="glass-panel p-12 rounded-3xl text-center space-y-4 max-w-md mx-auto">
            <p className="text-emerald-100/80">No products match &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => setSelectedFilter('all')}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-emerald-950 text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* View Mode: Carousel */}
        {viewMode === 'carousel' && filteredProducts.length > 0 && (
          <div className="relative">
            {/* Carousel Navigation Arrows */}
            <button
              onClick={handlePrev}
              aria-label="Previous product"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-5 z-20 w-12 h-12 rounded-full glass-panel-elevated text-emerald-300 hover:text-white hover:bg-emerald-800/60 border border-emerald-400/30 flex items-center justify-center transition-all shadow-xl"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next product"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-5 z-20 w-12 h-12 rounded-full glass-panel-elevated text-emerald-300 hover:text-white hover:bg-emerald-800/60 border border-emerald-400/30 flex items-center justify-center transition-all shadow-xl"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Single Spotlight Product for Carousel */}
            {filteredProducts[activeIndex] && (
              <div className="max-w-2xl mx-auto">
                <ProductCard
                  product={filteredProducts[activeIndex]}
                  packType={packTypes[filteredProducts[activeIndex].id] || 'pack12'}
                  onTogglePack={(type) =>
                    togglePackType(filteredProducts[activeIndex].id, type)
                  }
                  onAddToCart={onAddToCart}
                  onOpenDetails={onOpenDetails}
                />
              </div>
            )}

            {/* Carousel Dot Indicators */}
            <div className="flex justify-center items-center gap-2 mt-8">
              {filteredProducts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? 'w-8 bg-emerald-400' : 'w-2.5 bg-emerald-800/60'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* View Mode: Grid (3 Columns) */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                packType={packTypes[product.id] || 'pack12'}
                onTogglePack={(type) => togglePackType(product.id, type)}
                onAddToCart={onAddToCart}
                onOpenDetails={onOpenDetails}
              />
            ))}
          </div>
        )}

        {/* Sampler Variety Pack Banner */}
        <div className="mt-16 glass-panel-elevated rounded-3xl p-6 sm:p-10 border border-emerald-400/30 flex flex-col lg:flex-row items-center justify-between gap-8 text-left shadow-2xl">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              Can&apos;t Decide? Taste The Full Lineup
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              AXOLYT Complete 6-Flavor 12-Pack Sampler
            </h3>
            <p className="text-emerald-100/80 text-sm leading-relaxed">
              Includes 2 Cans of each of our 6 signature flavors: Green Spring, Wild Berry, Tropic Rush, Glacier Frost, Crimson Zen, and Golden Dawn. Find your personal daily vitality balance.
            </p>
            <div className="flex items-center gap-3 text-xs text-emerald-300 font-medium pt-1">
              <span>Includes 12 x 355ml Cans</span>
              <span>·</span>
              <span>Free Priority Shipping</span>
              <span>·</span>
              <span className="text-emerald-400 font-bold">Save 15%</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="text-center sm:text-right">
              <span className="text-xs text-emerald-200/60 line-through mr-2">$41.88</span>
              <span className="text-3xl font-extrabold font-mono text-white">$36.99</span>
            </div>
            <button
              onClick={() => onAddToCart(products[0], 'pack12')}
              className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-emerald-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add Sampler Pack</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: Product;
  packType: 'single' | 'pack12';
  onTogglePack: (type: 'single' | 'pack12') => void;
  onAddToCart: (product: Product, packType: 'single' | 'pack12') => void;
  onOpenDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  packType,
  onTogglePack,
  onAddToCart,
  onOpenDetails,
}) => {
  const price = packType === 'single' ? product.priceSingle : product.pricePack12;

  return (
    <div className="group glass-panel-elevated rounded-3xl p-6 border border-emerald-500/25 hover:border-emerald-400/40 transition-all duration-300 flex flex-col justify-between text-left hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-emerald-950/70">
      <div>
        {/* Top Header: Badge & Rating */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            {product.badge}
          </span>
          <div className="flex items-center gap-1 text-xs text-amber-400">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-emerald-100 font-semibold">{product.rating}</span>
            <span className="text-emerald-200/50">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Product Image on Clean Dark Backdrop */}
        <div
          onClick={() => onOpenDetails(product)}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 cursor-pointer mb-5 group/img"
        >
          <ProductImage
            src={product.image}
            alt={product.name}
            productName={product.name}
            accentColor={product.accentColor}
            className="w-full h-full transition-transform duration-500 group-hover/img:scale-105"
          />
          {/* Quick View Overlay on hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
            <span className="py-2 px-4 rounded-xl glass-panel text-white text-xs font-semibold flex items-center gap-2 border border-emerald-400/30">
              <Eye className="w-4 h-4" />
              Quick View
            </span>
          </div>
        </div>

        {/* Product Title & Tagline */}
        <h3
          onClick={() => onOpenDetails(product)}
          className="text-2xl font-display font-extrabold text-white cursor-pointer hover:text-emerald-300 transition-colors"
        >
          {product.name}
        </h3>
        <p className="text-xs text-emerald-300 font-medium mt-1 mb-3">
          {product.tagline}
        </p>

        {/* Short Description */}
        <p className="text-xs text-emerald-100/70 leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {/* Flavor Notes Pills */}
        <div className="flex flex-wrap gap-1.5 my-4">
          {product.flavorNotes.slice(0, 3).map((note, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2.5 py-0.5 rounded-md bg-emerald-950/70 text-emerald-200/80 border border-emerald-500/20"
            >
              {note}
            </span>
          ))}
        </div>
      </div>

      {/* Pricing & Purchase Controls */}
      <div className="mt-4 pt-4 border-t border-emerald-500/20 space-y-3">
        {/* Pack Selector Toggle */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-emerald-950/60 rounded-xl border border-emerald-500/20">
          <button
            onClick={() => onTogglePack('pack12')}
            className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all flex flex-col items-center ${
              packType === 'pack12'
                ? 'bg-emerald-500 text-emerald-950 font-bold shadow-sm'
                : 'text-emerald-200/70 hover:text-white'
            }`}
          >
            <span>12-Pack Case</span>
            <span className="text-[10px] opacity-80">$36.99</span>
          </button>
          <button
            onClick={() => onTogglePack('single')}
            className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all flex flex-col items-center ${
              packType === 'single'
                ? 'bg-emerald-500 text-emerald-950 font-bold shadow-sm'
                : 'text-emerald-200/70 hover:text-white'
            }`}
          >
            <span>Single Can</span>
            <span className="text-[10px] opacity-80">$3.49</span>
          </button>
        </div>

        {/* Price & Add to Cart button */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div>
            <div className="text-xl font-bold font-mono text-white">
              ${price.toFixed(2)}
            </div>
            <span className="text-[10px] text-emerald-200/60">
              {packType === 'pack12' ? '12 Cans (Save 12%)' : '1 Can (355ml)'}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onOpenDetails(product)}
              className="p-2.5 rounded-xl glass-panel text-emerald-300 hover:text-white border border-emerald-500/25 transition-colors"
              title="Full Details & Facts"
              aria-label="View product details"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onAddToCart(product, packType)}
              className="py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
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
