import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { CartItem } from '../types';
import { ProductImage } from './ProductImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  appliedPromo: string | null;
  discountRate: number;
  onApplyPromo: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedPromo,
  discountRate,
  onApplyPromo,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 40;
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * discountRate;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = items.length === 0 ? 0 : isFreeShipping ? 0 : 4.99;
  const estimatedTax = (subtotal - discountAmount) * 0.08;
  const total = Math.max(0, subtotal - discountAmount + shippingCost + estimatedTax);

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;

    const success = onApplyPromo(promoInput.trim());
    if (!success) {
      setPromoError('Invalid code. Try "NATURE15" for 15% off.');
    } else {
      setPromoInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md h-full glass-panel-elevated bg-[#05130a]/95 border-l border-emerald-500/25 flex flex-col justify-between shadow-2xl p-6 sm:p-7 overflow-y-auto animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-display font-bold text-white">Your Shopping Bag</h2>
              <span className="text-xs text-emerald-300 font-mono">
                ({items.reduce((s, i) => s + i.quantity, 0)})
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-900/50 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {items.length > 0 && (
            <div className="my-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-xs text-left space-y-1.5">
              <div className="flex items-center justify-between text-emerald-200">
                {isFreeShipping ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Unlocked FREE Priority Shipping!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-white font-mono">${amountNeededForFreeShipping.toFixed(2)}</strong> more for FREE shipping
                  </span>
                )}
                <span className="font-mono text-[11px] text-emerald-300/70">
                  ${subtotal.toFixed(0)} / ${FREE_SHIPPING_THRESHOLD}
                </span>
              </div>
              <div className="w-full bg-emerald-950 h-1.5 rounded-full overflow-hidden border border-emerald-500/20">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-300 shadow-sm shadow-emerald-400/50"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Item List */}
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <p className="text-emerald-200/80 text-sm">Your shopping bag is empty.</p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs transition-colors"
              >
                Browse Flavors
              </button>
            </div>
          ) : (
            <div className="space-y-3 my-4 max-h-[42vh] overflow-y-auto pr-1">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 flex gap-3 items-center text-left"
                >
                  <ProductImage
                    src={item.image}
                    alt={item.name}
                    productName={item.name}
                    className="w-14 h-14 rounded-xl shrink-0 bg-black/40"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                    <span className="text-[11px] text-emerald-300/80 block">
                      {item.packType === 'pack12' ? '12-Pack Case' : 'Single Can (355ml)'}
                    </span>
                    <div className="text-xs font-mono font-bold text-emerald-300 mt-1">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 bg-emerald-900/40 border border-emerald-500/20 rounded-lg p-1">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="p-1 text-emerald-300 hover:text-white rounded"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold text-white w-4 text-center font-mono">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="p-1 text-emerald-300 hover:text-white rounded"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-emerald-300/40 hover:text-red-400 p-1 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Section: Promo, Breakdown, Checkout CTA */}
        {items.length > 0 && (
          <div className="pt-4 border-t border-emerald-500/20 space-y-4 text-left">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCode} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-400/60" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code (e.g. NATURE15)"
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-xs text-white placeholder-emerald-300/40 uppercase font-mono focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-500/30 text-emerald-200 text-xs font-semibold"
                >
                  Apply
                </button>
              </div>
              {appliedPromo && (
                <div className="flex items-center justify-between text-[11px] text-emerald-400 font-medium">
                  <span>Code &apos;{appliedPromo}&apos; applied (-{(discountRate * 100).toFixed(0)}%)</span>
                </div>
              )}
              {promoError && (
                <span className="text-[11px] text-amber-400 block">{promoError}</span>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-emerald-100/70">
                <span>Subtotal</span>
                <span className="font-mono">${subtotal.toFixed(2)}</span>
              </div>
              {discountRate > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Promo Discount</span>
                  <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-emerald-100/70">
                <span>Shipping</span>
                <span className="font-mono">
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-emerald-100/70">
                <span>Estimated Sales Tax</span>
                <span className="font-mono">${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-emerald-500/20 text-base font-bold text-white">
                <span>Total</span>
                <span className="font-mono text-emerald-300">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-emerald-950 font-extrabold text-sm transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-emerald-200/50">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-Bit SSL Encrypted Secure Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
