import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

interface NewsletterSectionProps {
  onSuccess: (email: string) => void;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    try {
      const sanitizedId = email.trim().toLowerCase().replace(/[^a-zA-Z0-9_\-]/g, '_');
      await setDoc(doc(db, 'newsletter_subscribers', sanitizedId), {
        email: email.trim().toLowerCase(),
        subscribedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn('Newsletter firestore sync:', err);
    }

    setStatus('success');
    onSuccess(email);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative glass-panel-elevated rounded-3xl p-8 sm:p-14 border border-emerald-400/30 shadow-2xl text-center overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/10 blur-[90px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Join the Inner Circle</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Get 15% Off Your First Pack.
            </h2>

            <p className="text-emerald-100/80 text-sm sm:text-base font-light leading-relaxed">
              Subscribe to the AXOLYT dispatch for seasonal flavor drops, regenerative farming updates, and private subscriber discounts.
            </p>

            {status === 'success' ? (
              <div className="mt-8 p-6 rounded-2xl bg-emerald-950/80 border border-emerald-400/40 text-emerald-200 space-y-2 animate-in fade-in">
                <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Welcome to the AXOLYT Collective!</span>
                </div>
                <p className="text-xs text-emerald-100/90">
                  Your 15% discount code is <strong className="text-white font-mono bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-400/40">NATURE15</strong>. Apply it in your cart!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/70" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl glass-panel text-white placeholder-emerald-300/40 text-sm border border-emerald-500/30 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                      disabled={status === 'loading'}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-emerald-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 shrink-0 disabled:opacity-60"
                  >
                    {status === 'loading' ? (
                      <span>Joining...</span>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
                {status === 'error' && (
                  <p className="text-xs text-amber-400 font-medium">{errorMessage}</p>
                )}
                <p className="text-[11px] text-emerald-200/50">
                  Zero spam. We strictly respect your privacy. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
