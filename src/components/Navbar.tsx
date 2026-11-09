import React, { useState, useEffect } from 'react';
import { ShoppingBag, User, Search, Menu, X, Sparkles, Check, ShieldCheck, GraduationCap } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onOpenSearch: () => void;
  onOpenStory: () => void;
  onOpenAdmin: () => void;
  onOpenReport?: () => void;
  user: UserProfile;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenAuth,
  onOpenSearch,
  onOpenStory,
  onOpenAdmin,
  onOpenReport,
  user,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'benefits', 'ingredients', 'shop', 'clean-energy', 'blog', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'story') {
      onOpenStory();
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel border-b border-emerald-500/20 py-3 shadow-xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 md:gap-8">
            {/* Zone 1: Brand Wordmark & Organic Emblem */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
              className="group flex items-center gap-2.5 text-emerald-400 focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-400/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-emerald-950 fill-current group-hover:scale-105 transition-transform duration-300"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display font-extrabold tracking-wider text-xl sm:text-2xl text-white group-hover:text-emerald-300 transition-colors drop-shadow-sm">
                  AXOLYT
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-emerald-400/90 font-medium -mt-1 hidden sm:block group-hover:text-emerald-300/90 transition-colors">
                  Organic Energy
                </span>
              </div>
            </a>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
              {[
                { id: 'home', label: 'Home' },
                { id: 'story', label: 'Our Story', isStory: true },
                { id: 'ingredients', label: 'Ingredients' },
                { id: 'shop', label: 'Shop' },
                { id: 'blog', label: 'Journal' },
                { id: 'contact', label: 'Contact' },
              ].map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => (item.isStory ? onOpenStory() : scrollToSection(item.id))}
                    className={`group relative py-1.5 transition-all duration-200 whitespace-nowrap hover:-translate-y-0.5 ${
                      isActive
                        ? 'text-emerald-300 font-bold'
                        : 'text-emerald-100/75 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      {item.label}
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400 animate-pulse" />
                      )}
                    </span>
                    {/* Animated hover underline with gradient */}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-full shadow-sm shadow-emerald-400/50'
                          : 'w-0 group-hover:w-full opacity-0 group-hover:opacity-100'
                      }`}
                    />
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Actions (Search, Account, Cart, Mobile Toggle) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Button */}
              <button
                onClick={onOpenSearch}
                aria-label="Search drinks and ingredients"
                className="p-2 text-emerald-200/80 hover:text-white hover:bg-emerald-500/20 rounded-xl border border-transparent hover:border-emerald-400/30 hover:scale-105 active:scale-95 transition-all duration-200 group"
                title="Search flavors, facts & recipes"
              >
                <Search className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
              </button>

              {/* College Project Report Button */}
              {onOpenReport && (
                <button
                  onClick={onOpenReport}
                  aria-label="College Project Report"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-emerald-900/60 to-teal-900/60 hover:from-emerald-800/80 hover:to-teal-800/80 text-emerald-300 border border-emerald-500/40 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all duration-200 group"
                  title="College Project Report (29 Pages PDF & DOCX)"
                >
                  <GraduationCap className="w-4 h-4 text-emerald-400 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-200" />
                  <span className="hidden lg:inline">Report</span>
                  <span className="hidden sm:inline px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-400/20 text-emerald-300">29p</span>
                </button>
              )}

              {/* Admin Dashboard Button */}
              <button
                onClick={onOpenAdmin}
                aria-label="Admin Dashboard"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all duration-200 group"
                title="Admin Command Center (Sales, Orders, Settings)"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-200" />
                <span className="hidden sm:inline">Admin</span>
              </button>

              {/* Account Profile Button */}
              <button
                onClick={onOpenAuth}
                aria-label="Account profile"
                className="relative flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-emerald-200/90 hover:text-white hover:bg-emerald-900/50 rounded-xl border border-transparent hover:border-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-200 group"
              >
                <div className="relative">
                  <User className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform duration-200" />
                  {user.isLoggedIn && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-emerald-950 animate-pulse" />
                  )}
                </div>
                <span className="hidden xl:inline truncate max-w-[90px] group-hover:text-emerald-300 transition-colors">
                  {user.isLoggedIn ? user.name.split(' ')[0] : 'Sign In'}
                </span>
              </button>

              {/* Shopping Bag Button */}
              <button
                onClick={onOpenCart}
                aria-label="View shopping cart"
                className="relative flex items-center justify-center p-2.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/35 hover:to-teal-500/35 border border-emerald-400/30 hover:border-emerald-400/60 rounded-xl text-emerald-300 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-md hover:shadow-emerald-500/30 group"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-200" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-emerald-400 text-emerald-950 font-bold text-[11px] rounded-full min-w-5 h-5 px-1 flex items-center justify-center shadow-lg shadow-emerald-400/60 animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile navigation"
                className="md:hidden p-2 text-emerald-200 hover:text-white rounded-xl hover:bg-emerald-900/40 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 animate-in spin-in-90 duration-200" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel-elevated border-t border-emerald-500/20 px-6 py-6 mt-3 space-y-4 animate-in slide-in-from-top-4">
            <div className="flex flex-col gap-1.5">
              {[
                { id: 'home', label: 'Home' },
                { id: 'story', label: 'Our Story', isStory: true },
                { id: 'ingredients', label: 'Ingredients & Science' },
                { id: 'shop', label: 'Shop All Flavors' },
                { id: 'clean-energy', label: 'Clean Energy Promise' },
                { id: 'blog', label: 'Botanical Journal' },
                { id: 'contact', label: 'Contact & Support' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (item.isStory) onOpenStory();
                    else scrollToSection(item.id);
                  }}
                  className="group text-left py-2.5 px-3.5 rounded-xl text-emerald-100 hover:text-white hover:bg-emerald-800/40 font-medium transition-all duration-200 flex items-center justify-between"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">{item.label}</span>
                  <span className="text-emerald-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 text-xs">→</span>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-emerald-500/20 flex flex-col gap-2">
              {onOpenReport && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenReport();
                  }}
                  className="w-full flex items-center justify-between py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-900/60 to-teal-900/60 border border-emerald-500/40 text-emerald-200 text-sm font-semibold shadow-sm hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-emerald-400" />
                    <span>College Project Report</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                    29 Pages PDF / DOCX
                  </span>
                </button>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-sm font-semibold shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Admin Command Center</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-sm font-medium"
              >
                <User className="w-4 h-4 text-emerald-400" />
                {user.isLoggedIn ? `Logged in as ${user.name}` : 'Sign In to Your Account'}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-500 text-emerald-950 font-bold text-sm shadow-lg shadow-emerald-500/30"
              >
                <ShoppingBag className="w-4 h-4" />
                View Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
