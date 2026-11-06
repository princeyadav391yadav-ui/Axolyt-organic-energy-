import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Truck, ArrowLeft, PackageCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountRate: number;
  onOrderSuccess: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountRate,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [orderId, setOrderId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'applepay'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'OR',
    zipCode: '',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '884',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const discountAmount = subtotal * discountRate;
  const shippingCost = subtotal >= 40 ? 0 : 4.99;
  const estimatedTax = (subtotal - discountAmount) * 0.08;
  const total = Math.max(0, subtotal - discountAmount + shippingCost + estimatedTax);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email is required';
    if (!formData.address.trim()) errors.address = 'Street address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.zipCode.trim()) errors.zipCode = 'ZIP code is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `AXO-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsSubmitting(false);
      setStep('success');
      onOrderSuccess(generatedId);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl glass-panel-elevated rounded-3xl border border-emerald-400/30 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col overflow-y-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-emerald-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-xl text-white">AXOLYT</span>
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              · Express Checkout
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-950/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'success' ? (
          <div className="p-8 sm:p-12 text-center space-y-6 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                Order Confirmed!
              </h3>
              <p className="text-emerald-200/80 text-sm">
                Thank you, <strong className="text-white">{formData.firstName}</strong>. We&apos;ve sent your order receipt and tracking instructions to <span className="text-emerald-300 font-mono">{formData.email}</span>.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/20 text-left space-y-2 text-xs">
              <div className="flex justify-between font-mono">
                <span className="text-emerald-300/70">Order Number</span>
                <span className="font-bold text-white">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-300/70">Estimated Delivery</span>
                <span className="text-emerald-200 font-medium">Within 2–3 Business Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-300/70">Shipping Address</span>
                <span className="text-emerald-200 text-right truncate max-w-[200px]">
                  {formData.address}, {formData.city} {formData.zipCode}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-emerald-500/20 font-bold text-white text-sm">
                <span>Total Paid</span>
                <span className="font-mono text-emerald-400">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Simulated Live Tracking */}
            <div className="p-4 rounded-xl bg-emerald-900/20 border border-emerald-500/20 text-left space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                <PackageCheck className="w-4 h-4 text-emerald-400" />
                <span>Status: Preparing cold-packed botanical shipment</span>
              </div>
              <div className="w-full bg-emerald-950 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-1/3 rounded-full animate-pulse" />
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-sm transition-colors"
            >
              Back to Store
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Column */}
            <form onSubmit={handleSubmitOrder} className="lg:col-span-7 space-y-6">
              {/* Customer Contact */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-emerald-400 font-bold">
                  1. Contact Information
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-white text-xs placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400"
                    />
                    {formErrors.firstName && (
                      <span className="text-[10px] text-amber-400 mt-1 block">{formErrors.firstName}</span>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-white text-xs placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400"
                    />
                    {formErrors.lastName && (
                      <span className="text-[10px] text-amber-400 mt-1 block">{formErrors.lastName}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-white text-xs placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400"
                    />
                    {formErrors.email && (
                      <span className="text-[10px] text-amber-400 mt-1 block">{formErrors.email}</span>
                    )}
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone (for delivery updates)"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-white text-xs placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-emerald-400 font-bold">
                  2. Delivery Address
                </h4>
                <div>
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-white text-xs placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400"
                  />
                  {formErrors.address && (
                    <span className="text-[10px] text-amber-400 mt-1 block">{formErrors.address}</span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-white text-xs placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400"
                    />
                    {formErrors.city && (
                      <span className="text-[10px] text-amber-400 mt-1 block">{formErrors.city}</span>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-white text-xs placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-white text-xs placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400"
                    />
                    {formErrors.zipCode && (
                      <span className="text-[10px] text-amber-400 mt-1 block">{formErrors.zipCode}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-emerald-400 font-bold">
                  3. Payment Method
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-emerald-500/20 border-emerald-400 text-white'
                        : 'bg-emerald-950/40 border-emerald-500/20 text-emerald-200/60'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-emerald-400" />
                    <span>Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'applepay'
                        ? 'bg-emerald-500/20 border-emerald-400 text-white'
                        : 'bg-emerald-950/40 border-emerald-500/20 text-emerald-200/60'
                    }`}
                  >
                    <span className="font-bold"> Pay / G Pay</span>
                    <span className="text-[10px] opacity-75">1-Click</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'cod'
                        ? 'bg-emerald-500/20 border-emerald-400 text-white'
                        : 'bg-emerald-950/40 border-emerald-500/20 text-emerald-200/60'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-emerald-400" />
                    <span>Pay on Delivery</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 space-y-2.5">
                    <input
                      type="text"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/20 text-white text-xs font-mono"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        value={formData.cardExpiry}
                        onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/20 text-white text-xs font-mono"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        value={formData.cardCvc}
                        onChange={(e) => handleInputChange('cardCvc', e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/20 text-white text-xs font-mono"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-200/80">
                    Pay with cash or card directly to your courier upon receipt. Zero extra surcharge.
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-emerald-950 font-extrabold text-sm transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authorize Payment · ${total.toFixed(2)}</span>
                  </>
                )}
              </button>
            </form>

            {/* Order Items & Summary Column */}
            <div className="lg:col-span-5 bg-emerald-950/40 p-5 rounded-2xl border border-emerald-500/20 flex flex-col justify-between">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-3">
                  Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})
                </h4>

                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 text-xs">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover bg-black/40"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white truncate">{item.name}</div>
                        <div className="text-[11px] text-emerald-200/60">
                          Qty: {item.quantity} · {item.packType === 'pack12' ? '12-Pack' : 'Single'}
                        </div>
                      </div>
                      <div className="font-mono font-bold text-emerald-300">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-500/20 space-y-1.5 text-xs">
                <div className="flex justify-between text-emerald-200/70">
                  <span>Subtotal</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-emerald-200/70">
                  <span>Priority Shipping</span>
                  <span className="font-mono">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-emerald-200/70">
                  <span>Estimated Tax</span>
                  <span className="font-mono">${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-emerald-500/20 text-base font-bold text-white">
                  <span>Final Total</span>
                  <span className="font-mono text-emerald-300">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
