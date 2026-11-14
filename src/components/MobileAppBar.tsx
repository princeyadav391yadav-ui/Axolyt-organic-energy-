import React from 'react';
import { Home, ShoppingBag, Search, Store, User } from 'lucide-react';
import { UserProfile } from '../types';

interface MobileAppBarProps {
  cartCount: number;
  user: UserProfile;
  onNavigateHome: () => void;
  onNavigateShop: () => void;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenAuth: () => void;
}

export const MobileAppBar: React.FC<MobileAppBarProps> = ({
  cartCount,
  user,
  onNavigateHome,
  onNavigateShop,
  onOpenSearch,
  onOpenCart,
  onOpenAuth,
}) => {
  return (
    <nav
      aria-label="Mobile app navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel-elevated border-t border-emerald-500/25 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-5 items-center h-16 px-1">
        <button
          type="button"
          onClick={onNavigateHome}
          className="flex flex-col items-center justify-center gap-1 py-1 text-emerald-200/85 hover:text-emerald-300 active:scale-95 transition-all"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold tracking-wide">Home</span>
        </button>

        <button
          type="button"
          onClick={onNavigateShop}
          className="flex flex-col items-center justify-center gap-1 py-1 text-emerald-200/85 hover:text-emerald-300 active:scale-95 transition-all"
        >
          <Store className="w-5 h-5" />
          <span className="text-[10px] font-semibold tracking-wide">Shop</span>
        </button>

        <button
          type="button"
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center gap-1 py-1 text-emerald-200/85 hover:text-emerald-300 active:scale-95 transition-all"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-semibold tracking-wide">Search</span>
        </button>

        <button
          type="button"
          onClick={onOpenCart}
          className="relative flex flex-col items-center justify-center gap-1 py-1 text-emerald-200/85 hover:text-emerald-300 active:scale-95 transition-all"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-emerald-400 text-emerald-950 font-bold text-[10px] rounded-full min-w-4 h-4 px-1 flex items-center justify-center shadow-md shadow-emerald-400/50">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold tracking-wide">Bag</span>
        </button>

        <button
          type="button"
          onClick={onOpenAuth}
          className="relative flex flex-col items-center justify-center gap-1 py-1 text-emerald-200/85 hover:text-emerald-300 active:scale-95 transition-all"
        >
          <div className="relative">
            <User className="w-5 h-5" />
            {user.isLoggedIn && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-emerald-950" />
            )}
          </div>
          <span className="text-[10px] font-semibold tracking-wide truncate max-w-[56px]">
            {user.isLoggedIn ? 'Account' : 'Sign In'}
          </span>
        </button>
      </div>
    </nav>
  );
};
