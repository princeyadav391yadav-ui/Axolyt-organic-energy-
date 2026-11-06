import React, { useState } from 'react';
import { X, Search, Sparkles, ArrowRight, Zap, Leaf, BookOpen } from 'lucide-react';
import { PRODUCTS, INGREDIENT_DETAILS, ARTICLES } from '../data/products';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onOpenIngredients: () => void;
  onOpenBlog: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onOpenIngredients,
  onOpenBlog,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const matchedProducts = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    p.flavorNotes.some((n) => n.toLowerCase().includes(query.toLowerCase())) ||
    p.keyBotanicals.some((b) => b.toLowerCase().includes(query.toLowerCase()))
  );

  const matchedIngredients = INGREDIENT_DETAILS.filter((ing) =>
    ing.title.toLowerCase().includes(query.toLowerCase()) ||
    ing.description.toLowerCase().includes(query.toLowerCase())
  );

  const matchedArticles = ARTICLES.filter((art) =>
    art.title.toLowerCase().includes(query.toLowerCase()) ||
    art.summary.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-20 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-emerald-400/30 shadow-2xl text-left overflow-hidden max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20">
          <div className="relative flex-1 mr-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search flavors, matcha, adaptogens, or articles..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-emerald-950/70 border border-emerald-500/30 text-white placeholder-emerald-300/40 text-sm focus:outline-none focus:border-emerald-400 font-medium"
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-emerald-300 hover:text-white hover:bg-emerald-950/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="mt-4 overflow-y-auto space-y-6 pr-1">
          {/* Products */}
          {matchedProducts.length > 0 && (
            <div className="space-y-2.5">
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Drinks ({matchedProducts.length})
              </span>
              <div className="space-y-2">
                {matchedProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/20 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 rounded-lg object-cover bg-black/40"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="text-sm font-bold text-white">{p.name}</div>
                        <div className="text-xs text-emerald-300/70">{p.tagline}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs font-bold text-emerald-400">
                        ${p.priceSingle.toFixed(2)}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-300 ml-2 inline" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ingredients */}
          {matchedIngredients.length > 0 && (
            <div className="space-y-2.5">
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5" />
                Botanical Knowledge
              </span>
              <div className="space-y-2">
                {matchedIngredients.map((ing) => (
                  <div
                    key={ing.id}
                    onClick={() => {
                      onClose();
                      onOpenIngredients();
                    }}
                    className="p-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/20 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="text-sm font-bold text-white">{ing.title}</div>
                      <div className="text-xs text-emerald-200/70">{ing.subtitle}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Articles */}
          {matchedArticles.length > 0 && (
            <div className="space-y-2.5">
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Journal Articles
              </span>
              <div className="space-y-2">
                {matchedArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      onClose();
                      onOpenBlog();
                    }}
                    className="p-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/20 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="text-sm font-bold text-white">{art.title}</div>
                      <div className="text-[11px] text-emerald-300/70">
                        {art.category} · {art.readTime}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedProducts.length === 0 && matchedIngredients.length === 0 && matchedArticles.length === 0 && (
            <div className="py-8 text-center text-xs text-emerald-200/60">
              No results found for &ldquo;{query}&rdquo;. Try &ldquo;Matcha&rdquo;, &ldquo;Berry&rdquo;, or &ldquo;Apple&rdquo;.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
