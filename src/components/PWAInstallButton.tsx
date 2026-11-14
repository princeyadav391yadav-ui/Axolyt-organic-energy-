import React, { useState } from 'react';
import { Download, Smartphone, Share, PlusSquare, X, CheckCircle2, ExternalLink } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'navbar' | 'menu';
  onActionComplete?: () => void;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'navbar',
  onActionComplete,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState(false);

  // Never show install prompt button when already running inside installed standalone app
  if (isInstalled) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (accepted && onActionComplete) {
        onActionComplete();
      }
      return;
    }
    setShowGuideModal(true);
  };

  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '/';

  return (
    <>
      {variant === 'menu' ? (
        <button
          type="button"
          onClick={handleClick}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500/25 to-teal-500/25 border border-emerald-400/40 text-emerald-200 hover:text-white text-sm font-semibold shadow-sm transition-all"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Install AXOLYT App</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          aria-label="Install AXOLYT App"
          title="Install AXOLYT App on your phone or desktop"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/35 hover:to-teal-500/35 text-emerald-200 hover:text-white border border-emerald-400/40 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all duration-200 group"
        >
          <Download className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-y-0.5 transition-transform duration-200" />
          <span className="hidden lg:inline">Install App</span>
        </button>
      )}

      {showGuideModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowGuideModal(false)}
        >
          <div
            className="w-full max-w-md glass-panel-elevated rounded-3xl p-6 text-emerald-50 relative border border-emerald-500/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowGuideModal(false)}
              aria-label="Close install guide"
              className="absolute top-4 right-4 p-2 rounded-xl text-emerald-300/80 hover:text-white hover:bg-emerald-900/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#051109] border border-emerald-400/30 flex items-center justify-center shadow-lg shadow-emerald-500/20 overflow-hidden shrink-0">
                <img
                  src="/pwa-192x192.png"
                  alt="AXOLYT App Icon"
                  className="w-11 h-11 object-contain"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white">
                  Install AXOLYT App
                </h3>
                <p className="text-xs text-emerald-300/80">
                  Full-screen app experience with offline access
                </p>
              </div>
            </div>

            {isIOS ? (
              <div className="space-y-3 bg-emerald-950/60 border border-emerald-500/20 rounded-2xl p-4 text-sm">
                <p className="font-semibold text-emerald-200 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  iPhone / iPad (Safari):
                </p>
                <ol className="space-y-2.5 text-emerald-100/85 text-xs leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0">1</span>
                    <span className="flex items-center gap-1.5 flex-wrap">
                      Tap the <Share className="w-4 h-4 text-emerald-400 inline" /> <strong>Share</strong> button at the bottom of Safari.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0">2</span>
                    <span className="flex items-center gap-1.5 flex-wrap">
                      Scroll down and tap <PlusSquare className="w-4 h-4 text-emerald-400 inline" /> <strong>Add to Home Screen</strong>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0">3</span>
                    <span>
                      Tap <strong>Add</strong> in the top-right to install AXOLYT on your Home Screen.
                    </span>
                  </li>
                </ol>
              </div>
            ) : (
              <div className="space-y-3 bg-emerald-950/60 border border-emerald-500/20 rounded-2xl p-4 text-sm">
                <p className="font-semibold text-emerald-200 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  Android & Desktop (Chrome / Edge):
                </p>
                <ol className="space-y-2.5 text-emerald-100/85 text-xs leading-relaxed">
                  {isInIframe && (
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0">1</span>
                      <span>
                        Open the app in its own browser tab first (install prompt does not fire inside preview frames).
                      </span>
                    </li>
                  )}
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0">
                      {isInIframe ? '2' : '1'}
                    </span>
                    <span>
                      Tap browser menu <strong>⋮</strong> (Android) or click the <strong>Install icon</strong> in Chrome/Edge address bar.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0">
                      {isInIframe ? '3' : '2'}
                    </span>
                    <span>
                      Select <strong>Install App</strong> / <strong>Add to Home screen</strong> to launch AXOLYT like a native app.
                    </span>
                  </li>
                </ol>
              </div>
            )}

            <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-emerald-300/85">
              <div className="flex items-center gap-1.5 bg-emerald-950/40 px-3 py-2 rounded-xl border border-emerald-500/15">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Offline Catalog</span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-950/40 px-3 py-2 rounded-xl border border-emerald-500/15">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Home Screen Icon</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2.5">
              {isInIframe && (
                <a
                  href={currentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setShowGuideModal(false);
                    if (onActionComplete) onActionComplete();
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs shadow-lg shadow-emerald-500/30 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Standalone Tab</span>
                </a>
              )}
              <button
                type="button"
                onClick={() => {
                  setShowGuideModal(false);
                  if (onActionComplete) onActionComplete();
                }}
                className="px-4 py-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800/70 text-emerald-100 font-semibold text-xs border border-emerald-500/25 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
