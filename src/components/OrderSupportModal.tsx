import React, { useState } from 'react';
import { X, Send, CheckCircle2, LifeBuoy, AlertCircle, MessageSquare } from 'lucide-react';
import { UserOrder } from '../types';

interface OrderSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: UserOrder | null;
  userEmail: string;
  userName: string;
  onSubmitSupportTicket: (ticketId: string, orderId: string, subject: string) => void;
}

export const OrderSupportModal: React.FC<OrderSupportModalProps> = ({
  isOpen,
  onClose,
  order,
  userEmail,
  userName,
  onSubmitSupportTicket,
}) => {
  const [topic, setTopic] = useState('shipping-status');
  const [message, setMessage] = useState('');
  const [contactEmail, setContactEmail] = useState(userEmail);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle');
  const [ticketId, setTicketId] = useState('');

  if (!isOpen || !order) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus('submitting');
    setTimeout(() => {
      const generatedTicketId = `AXO-TCK-${Math.floor(10000 + Math.random() * 90000)}`;
      setTicketId(generatedTicketId);
      setStatus('submitted');
      onSubmitSupportTicket(generatedTicketId, order.id, topic);
    }, 700);
  };

  const handleReset = () => {
    setStatus('idle');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-emerald-400/30 shadow-2xl text-left max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-xl text-emerald-300 hover:text-white hover:bg-emerald-950/80 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'submitted' ? (
          <div className="py-8 text-center space-y-5 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-display font-extrabold text-white">
                Ticket Submitted!
              </h3>
              <p className="text-emerald-200/80 text-xs sm:text-sm">
                Reference ID: <span className="font-mono text-emerald-300 font-bold">{ticketId}</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/20 text-xs text-emerald-100/90 leading-relaxed text-left space-y-1.5">
              <p>
                Our Botanical Care Concierge has received your request regarding order <strong className="text-white font-mono">{order.id}</strong>.
              </p>
              <p className="text-[11px] text-emerald-200/70">
                A priority response will be sent to <span className="text-emerald-300 font-mono">{contactEmail}</span> within 2 hours.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs transition-colors"
            >
              Done &amp; Return
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                <LifeBuoy className="w-3.5 h-3.5" />
                Botanical Care Concierge
              </span>
              <h3 className="text-2xl font-display font-extrabold text-white">
                Help with Order
              </h3>
              <p className="text-xs text-emerald-300/80 font-mono">
                Order #{order.id} · {order.items}
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-emerald-300 font-bold mb-1">
                  Topic / Issue Type
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/20 text-white text-xs focus:outline-none focus:border-emerald-400 cursor-pointer"
                >
                  <option value="shipping-status" className="bg-[#051109]">
                    Shipping Status / Expedite Courier
                  </option>
                  <option value="delivery-address" className="bg-[#051109]">
                    Update Delivery Instructions / Gate Code
                  </option>
                  <option value="cold-pack" className="bg-[#051109]">
                    Temperature / Cold-Pack Packaging Issue
                  </option>
                  <option value="flavor-exchange" className="bg-[#051109]">
                    30-Day Freshness Guarantee &amp; Flavor Exchange
                  </option>
                  <option value="invoice-billing" className="bg-[#051109]">
                    Invoice &amp; Billing Question
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-emerald-300 font-bold mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/20 text-white text-xs font-mono focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-emerald-300 font-bold mb-1">
                  How can we help with this shipment?
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your request or delivery notes..."
                  required
                  className="w-full p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/20 text-white text-xs placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400 leading-relaxed"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl glass-panel text-emerald-200 hover:text-white text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === 'submitting' || !message.trim()}
                className="flex-1 py-2.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-emerald-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'submitting' ? (
                  <span>Sending Ticket...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
