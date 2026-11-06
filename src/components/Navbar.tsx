import React, { useState, useEffect } from 'react';
import { ShoppingBag, User, Search, Menu, X, Sparkles, Check } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onOpenSearch: () => void;
  onOpenStory: () => void;
  user: UserProfile;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenAuth,
  onOpenSearch,
  onOpenStory,
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
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform duration-200">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-emerald-950 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold tracking-wider text-xl sm:text-2xl text-white group-hover:text-emerald-300 transition-colors">
                  AXOLYT
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-emerald-400/90 font-medium -mt-1 hidden sm:block">
                  Organic Energy
                </span>
              </div>
            </a>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
              <button
                onClick={() => scrollToSection('home')}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  activeSection === 'home'
                    ? 'text-emerald-300 font-semibold'
                    : 'text-emerald-100/75 hover:text-white'
                }`}
              >
                Home
                {activeSection === 'home' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
                )}
              </button>

              <button
                onClick={() => onOpenStory()}
                className="text-emerald-100/75 hover:text-white transition-colors whitespace-nowrap py-1"
              >
                Our Story
              </button>

              <button
                onClick={() => scrollToSection('ingredients')}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  activeSection === 'ingredients'
                    ? 'text-emerald-300 font-semibold'
                    : 'text-emerald-100/75 hover:text-white'
                }`}
              >
                Ingredients
                {activeSection === 'ingredients' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
                )}
              </button>

              <button
                onClick={() => scrollToSection('shop')}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  activeSection === 'shop'
                    ? 'text-emerald-300 font-semibold'
                    : 'text-emerald-100/75 hover:text-white'
                }`}
              >
                Shop
                {activeSection === 'shop' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
                )}
              </button>

              <button
                onClick={() => scrollToSection('blog')}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  activeSection === 'blog'
                    ? 'text-emerald-300 font-semibold'
                    : 'text-emerald-100/75 hover:text-white'
                }`}
              >
                Journal
                {activeSection === 'blog' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
                )}
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  activeSection === 'contact'
                    ? 'text-emerald-300 font-semibold'
                    : 'text-emerald-100/75 hover:text-white'
                }`}
              >
                Contact
              </button>
            </nav>

            {/* Zone 3: Actions (Search, Account, Cart, Mobile Toggle) */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={onOpenSearch}
                aria-label="Search drinks and ingredients"
                className="p-2 text-emerald-200/80 hover:text-white hover:bg-emerald-900/40 rounded-lg transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenAuth}
                aria-label="Account profile"
                className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-emerald-200/90 hover:text-white hover:bg-emerald-900/40 rounded-lg transition-colors"
              >
                <User className="w-5 h-5 text-emerald-400" />
                <span className="hidden xl:inline truncate max-w-[90px]">
                  {user.isLoggedIn ? user.name.split(' ')[0] : 'Sign In'}
                </span>
              </button>

              {/* Shopping Bag Button */}
              <button
                onClick={onOpenCart}
                aria-label="View shopping cart"
                className="relative flex items-center justify-center p-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 rounded-xl text-emerald-300 hover:text-white transition-all duration-200 shadow-md group"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-emerald-400 text-emerald-950 font-bold text-[11px] rounded-full min-w-5 h-5 px-1 flex items-center justify-center shadow-lg shadow-emerald-400/50 animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile navigation"
                className="md:hidden p-2 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-900/40"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel-elevated border-t border-emerald-500/20 px-6 py-6 mt-3 space-y-4 animate-in slide-in-from-top-4">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => scrollToSection('home')}
                className="text-left py-2 px-3 rounded-lg text-emerald-100 hover:bg-emerald-800/30 font-medium"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStory();
                }}
                className="text-left py-2 px-3 rounded-lg text-emerald-100 hover:bg-emerald-800/30 font-medium"
              >
                Our Story
              </button>
              <button
                onClick={() => scrollToSection('ingredients')}
                className="text-left py-2 px-3 rounded-lg text-emerald-100 hover:bg-emerald-800/30 font-medium"
              >
                Ingredients & Science
              </button>
              <button
                onClick={() => scrollToSection('shop')}
                className="text-left py-2 px-3 rounded-lg text-emerald-100 hover:bg-emerald-800/30 font-medium"
              >
                Shop All Flavors
              </button>
              <button
                onClick={() => scrollToSection('clean-energy')}
                className="text-left py-2 px-3 rounded-lg text-emerald-100 hover:bg-emerald-800/30 font-medium"
              >
                Clean Energy Promise
              </button>
              <button
                onClick={() => scrollToSection('blog')}
                className="text-left py-2 px-3 rounded-lg text-emerald-100 hover:bg-emerald-800/30 font-medium"
              >
                Botanical Journal
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left py-2 px-3 rounded-lg text-emerald-100 hover:bg-emerald-800/30 font-medium"
              >
                Contact & Support
              </button>
            </div>

            <div className="pt-4 border-t border-emerald-500/20 flex flex-col gap-2">
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
