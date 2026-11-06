import React, { useState } from 'react';
import { ArrowRight, BookOpen, Clock, Calendar, User, X } from 'lucide-react';
import { ARTICLES } from '../data/products';
import { JournalArticle } from '../types';

export const BlogSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  return (
    <section id="blog" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left space-y-3">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              The AXOLYT Journal
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
              Botanical Wisdom &amp; Science.
            </h2>
            <p className="text-emerald-100/75 text-sm sm:text-base max-w-xl font-light">
              Deep dives into plant physiology, endocrine vitality, and regenerative living.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {ARTICLES.map((art) => (
            <article
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="group glass-panel-elevated rounded-3xl p-6 sm:p-7 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-emerald-300/80 mb-3">
                  <span className="font-semibold text-emerald-400">{art.category}</span>
                  <span>·</span>
                  <span>{art.readTime}</span>
                </div>

                <h3 className="text-xl font-display font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs sm:text-sm text-emerald-100/70 mt-3 leading-relaxed line-clamp-3 font-light">
                  {art.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-500/20 flex items-center justify-between">
                <span className="text-xs text-emerald-200/60 font-medium">
                  {art.author.split(',')[0]}
                </span>
                <span className="text-xs font-bold text-emerald-400 group-hover:text-emerald-300 flex items-center gap-1">
                  Read Article
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-3xl glass-panel-elevated rounded-3xl p-6 sm:p-10 border border-emerald-400/30 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-emerald-300 hover:text-white hover:bg-emerald-950/80 transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3 pr-8">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                <span>{selectedArticle.category}</span>
                <span>·</span>
                <span>{selectedArticle.readTime}</span>
                <span>·</span>
                <span>{selectedArticle.date}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-tight">
                {selectedArticle.title}
              </h2>
              <div className="text-xs text-emerald-300/80 font-medium">
                By {selectedArticle.author}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-emerald-500/20 space-y-4 text-emerald-100/90 text-sm sm:text-base leading-relaxed whitespace-pre-line font-light">
              {selectedArticle.content}
            </div>

            <div className="mt-8 pt-6 border-t border-emerald-500/20 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-sm transition-colors"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
