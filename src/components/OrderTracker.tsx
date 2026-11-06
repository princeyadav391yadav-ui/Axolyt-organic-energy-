import React, { useState } from 'react';
import { Check, Package, Truck, MapPin, Home, Clock, ShieldCheck, ExternalLink, RefreshCw, ChevronDown, ChevronUp, Download, LifeBuoy } from 'lucide-react';
import { UserOrder } from '../types';

interface OrderTrackerProps {
  order: UserOrder;
  onSimulateNextStep?: (orderId: string) => void;
  onDownloadInvoice?: (order: UserOrder) => void;
  onOpenHelp?: (order: UserOrder) => void;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({
  order,
  onSimulateNextStep,
  onDownloadInvoice,
  onOpenHelp,
}) => {
  const [showTimeline, setShowTimeline] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const stepsConfig = [
    { label: 'Confirmed', icon: Check, description: 'Order verified & sent to clean kitchen' },
    { label: 'Cold-Packed', icon: Package, description: 'Insulated thermal pack sealed at 4°C' },
    { label: 'In Transit', icon: Truck, description: 'Departed Oregon regional dispatch' },
    { label: 'Out for Delivery', icon: MapPin, description: 'Courier route active in your zone' },
    { label: 'Delivered', icon: Home, description: 'Handed to recipient or front door' },
  ];

  // Calculate percentage: 0 -> 10%, 1 -> 32%, 2 -> 60%, 3 -> 85%, 4 -> 100%
  const progressPercent = Math.min(
    100,
    Math.max(10, Math.round(((order.currentStepIndex) / (stepsConfig.length - 1)) * 100))
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      if (onSimulateNextStep) {
        onSimulateNextStep(order.id);
      }
    }, 600);
  };

  return (
    <div className="glass-panel-elevated rounded-2xl p-4 sm:p-5 border border-emerald-500/25 space-y-5 text-left transition-all">
      {/* Top Header: ID, Status Badge, Carrier */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-emerald-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-white text-sm sm:text-base">
              {order.id}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
              {order.status}
            </span>
          </div>
          <p className="text-[11px] text-emerald-200/70 mt-0.5 truncate max-w-xs">
            {order.items}
          </p>
        </div>

        <div className="flex items-center gap-2 text-right">
          <button
            onClick={handleRefresh}
            title="Update tracking info"
            className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-900/50 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
          </button>
          <div>
            <span className="text-[10px] uppercase text-emerald-300/60 block font-mono">
              Est. Delivery
            </span>
            <span className="text-xs font-semibold text-emerald-200">
              {order.estimatedDelivery}
            </span>
          </div>
        </div>
      </div>

      {/* Visual Shipping Progress Bar Component */}
      <div className="space-y-3 pt-1">
        <div className="flex justify-between items-center text-xs">
          <span className="text-emerald-300/80 font-medium">Shipping Milestone</span>
          <span className="font-mono text-emerald-400 font-bold">{progressPercent}%</span>
        </div>

        {/* The Track Container */}
        <div className="relative">
          {/* Background Track Line */}
          <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1.5 bg-emerald-950 rounded-full border border-emerald-500/20" />

          {/* Active Glowing Progress Fill */}
          <div
            className="absolute top-1/2 left-4 -translate-y-1/2 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 rounded-full shadow-[0_0_12px_rgba(52,211,153,0.6)] transition-all duration-700"
            style={{ width: `calc(${progressPercent}% - 1.5rem)` }}
          />

          {/* 5 Milestone Checkpoint Circles */}
          <div className="relative flex justify-between items-center z-10">
            {stepsConfig.map((step, idx) => {
              const Icon = step.icon;
              const isPast = idx < order.currentStepIndex;
              const isCurrent = idx === order.currentStepIndex;
              const isFuture = idx > order.currentStepIndex;

              return (
                <div key={idx} className="flex flex-col items-center group relative">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isPast
                        ? 'bg-emerald-500 text-emerald-950 font-bold shadow-md shadow-emerald-500/30'
                        : isCurrent
                        ? 'bg-emerald-400 text-emerald-950 ring-4 ring-emerald-500/25 shadow-lg shadow-emerald-400/40 animate-pulse'
                        : 'bg-emerald-950 text-emerald-300/40 border border-emerald-500/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Label below milestone */}
                  <span
                    className={`text-[10px] mt-2 hidden sm:block whitespace-nowrap text-center font-medium ${
                      isCurrent
                        ? 'text-emerald-300 font-bold'
                        : isPast
                        ? 'text-emerald-100/90'
                        : 'text-emerald-300/40'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Status Highlight Card */}
        <div className="mt-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/20 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
            <Clock className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">
                {stepsConfig[order.currentStepIndex]?.label || order.status}
              </span>
              <span className="text-[10px] text-emerald-300/70 font-mono">
                {order.carrier}
              </span>
            </div>
            <p className="text-[11px] text-emerald-200/80 mt-0.5">
              {stepsConfig[order.currentStepIndex]?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Accordion Toggle for Detailed Checkpoint Log */}
      <div>
        <button
          onClick={() => setShowTimeline(!showTimeline)}
          className="w-full flex items-center justify-between py-2 text-xs text-emerald-300 hover:text-white transition-colors"
        >
          <span className="flex items-center gap-1.5 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Carrier Route &amp; Temperature Log
          </span>
          {showTimeline ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>

        {showTimeline && (
          <div className="mt-2.5 pt-2.5 border-t border-emerald-500/20 space-y-2 text-xs animate-in fade-in">
            <div className="text-[11px] text-emerald-200/60 flex justify-between font-mono pb-1">
              <span>Tracking Number:</span>
              <span className="text-emerald-300 font-bold">{order.trackingNumber}</span>
            </div>

            {order.steps && order.steps.length > 0 ? (
              order.steps.map((st, i) => (
                <div key={i} className="flex items-start gap-2.5 py-1 text-[11px]">
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${
                      st.isComplete ? 'bg-emerald-400' : 'bg-emerald-800'
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-bold text-white">{st.label}</span>
                      <span className="text-emerald-300/60 font-mono">{st.time}</span>
                    </div>
                    <span className="text-emerald-200/70 block">{st.detail}</span>
                    <span className="text-[10px] text-emerald-400/80">{st.location}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="space-y-1.5 text-[11px] text-emerald-200/70">
                <div className="flex justify-between">
                  <span>Cascade Cold Dispatch Facility, Oregon</span>
                  <span className="font-mono text-emerald-400">Insulated at 4°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Carbon-Neutral Electric Line-haul</span>
                  <span className="font-mono text-emerald-400">On Schedule</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Order Actions: Download Invoice & Help with Order */}
      <div className="pt-3 border-t border-emerald-500/20 flex flex-wrap items-center justify-between gap-2.5">
        <button
          onClick={() => onDownloadInvoice && onDownloadInvoice(order)}
          className="flex-1 min-w-[140px] py-2 px-3 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/30 text-emerald-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-emerald-400" />
          <span>Download Invoice</span>
        </button>

        <button
          onClick={() => onOpenHelp && onOpenHelp(order)}
          className="flex-1 min-w-[140px] py-2 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <LifeBuoy className="w-3.5 h-3.5 text-emerald-400" />
          <span>Help with Order</span>
        </button>
      </div>
    </div>
  );
};
