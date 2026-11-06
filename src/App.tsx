/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BenefitsBar } from './components/BenefitsBar';
import { IngredientsSection } from './components/IngredientsSection';
import { ProductCarousel } from './components/ProductCarousel';
import { CleanEnergySection } from './components/CleanEnergySection';
import { StatsSection } from './components/StatsSection';
import { BlogSection } from './components/BlogSection';
import { NewsletterSection } from './components/NewsletterSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { OurStoryModal } from './components/OurStoryModal';
import { AuthModal } from './components/AuthModal';
import { SearchModal } from './components/SearchModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { PRODUCTS } from './data/products';
import { Product, CartItem, UserProfile, UserOrder } from './types';

export default function App() {
  // 1. Cart State (Persistent via localStorage)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('axolyt_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 2. User Profile State (Persistent via localStorage)
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('axolyt_user');
      return saved
        ? JSON.parse(saved)
        : {
            name: 'Guest Explorer',
            email: 'guest@axolytenergy.com',
            isLoggedIn: false,
            memberTier: 'Botanical Society - Silver Tier',
            orders: [
              {
                id: 'AXO-948120',
                date: 'Nov 05, 2026',
                items: '6-Flavor Sampler 12-Pack Case',
                total: 36.99,
                status: 'In Transit',
                carrier: 'EcoCold Priority Express',
                trackingNumber: 'EC-94812048US',
                estimatedDelivery: 'Tomorrow by 2:00 PM',
                currentStepIndex: 2,
                steps: [
                  {
                    label: 'Order Confirmed',
                    detail: 'Payment authorized & recipes batched',
                    time: 'Nov 05, 08:30 AM',
                    location: 'Portland, OR',
                    isComplete: true,
                    isCurrent: false,
                  },
                  {
                    label: 'Cold-Packed & Sealed',
                    detail: 'Packed in biodegradable insulated mycelium chilled at 4°C',
                    time: 'Nov 05, 11:15 AM',
                    location: 'Cascade Range Facility, OR',
                    isComplete: true,
                    isCurrent: false,
                  },
                  {
                    label: 'In Transit via Clean Carrier',
                    detail: 'Departed regional logistics sorting terminal',
                    time: 'Nov 05, 04:45 PM',
                    location: 'Pacific Northwest Hub, OR',
                    isComplete: true,
                    isCurrent: true,
                  },
                  {
                    label: 'Out for Delivery',
                    detail: 'Dispatched with local electric courier',
                    time: 'Pending',
                    location: 'Your Local Hub',
                    isComplete: false,
                    isCurrent: false,
                  },
                  {
                    label: 'Delivered',
                    detail: 'Left at doorstep with verified photo',
                    time: 'Pending',
                    location: 'Delivery Destination',
                    isComplete: false,
                    isCurrent: false,
                  },
                ],
              },
              {
                id: 'AXO-784210',
                date: 'Oct 24, 2026',
                items: 'Green Spring 12-Pack Case',
                total: 36.99,
                status: 'Delivered',
                carrier: 'EcoCold Express',
                trackingNumber: 'EC-78421019US',
                estimatedDelivery: 'Delivered Oct 26',
                currentStepIndex: 4,
                steps: [
                  {
                    label: 'Order Confirmed',
                    detail: 'Recipe batch allocated',
                    time: 'Oct 24, 09:12 AM',
                    location: 'Portland, OR',
                    isComplete: true,
                    isCurrent: false,
                  },
                  {
                    label: 'Cold-Packed',
                    detail: 'Sealed with dry cold packs',
                    time: 'Oct 24, 01:30 PM',
                    location: 'Cascade Range Facility, OR',
                    isComplete: true,
                    isCurrent: false,
                  },
                  {
                    label: 'In Transit',
                    detail: 'Passed through regional sorting',
                    time: 'Oct 25, 08:00 AM',
                    location: 'Transit Center',
                    isComplete: true,
                    isCurrent: false,
                  },
                  {
                    label: 'Out for Delivery',
                    detail: 'Loaded on courier van',
                    time: 'Oct 26, 09:20 AM',
                    location: 'Local Destination Hub',
                    isComplete: true,
                    isCurrent: false,
                  },
                  {
                    label: 'Delivered & Enjoyed',
                    detail: 'Handed directly to resident',
                    time: 'Oct 26, 01:14 PM',
                    location: 'Front Door',
                    isComplete: true,
                    isCurrent: true,
                  },
                ],
              },
            ],
          };
    } catch {
      return {
        name: 'Guest Explorer',
        email: 'guest@axolytenergy.com',
        isLoggedIn: false,
        memberTier: 'Botanical Society - Silver Tier',
        orders: [],
      };
    }
  });

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('axolyt_cart', JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
  }, [cart]);

  // Save user to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('axolyt_user', JSON.stringify(user));
    } catch {
      // storage unavailable
    }
  }, [user]);

  // 3. Discount & Promo State
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountRate, setDiscountRate] = useState<number>(0);

  // 4. Modal Visibility Controls
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);

  // 5. Global Search State
  const [searchQuery, setSearchQuery] = useState('');

  // 6. Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'info' | 'warning', title: string, message?: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastMessage = { id, type, title, message };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, packType: 'single' | 'pack12') => {
    const itemId = `${product.id}-${packType}`;
    const price = packType === 'single' ? product.priceSingle : product.pricePack12;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          name: product.name,
          packType,
          price,
          quantity: 1,
          image: product.image,
          flavorName: product.name,
        },
      ];
    });

    addToast(
      'success',
      `Added to Bag`,
      `${product.name} (${packType === 'pack12' ? '12-Pack Case' : 'Single Can'})`
    );
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    addToast('info', 'Item Removed', 'The item was removed from your bag.');
  };

  const handleApplyPromo = (code: string): boolean => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'NATURE15' || normalized === 'ORGANIC15') {
      setAppliedPromo(normalized);
      setDiscountRate(0.15);
      addToast('success', 'Promo Code Applied!', '15% discount has been applied to your order.');
      return true;
    }
    return false;
  };

  const handleOrderSuccess = (orderId: string) => {
    const orderItemsSummary = cart.map((c) => `${c.quantity}x ${c.name} (${c.packType === 'pack12' ? '12-Pack' : 'Single'})`).join(', ');
    const orderTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

    const newOrder: UserOrder = {
      id: orderId,
      date: 'Just now',
      items: orderItemsSummary || 'AXOLYT Organic Energy Cans',
      total: orderTotal,
      status: 'Processing',
      carrier: 'EcoCold Priority Express',
      trackingNumber: `EC-${Math.floor(10000000 + Math.random() * 90000000)}US`,
      estimatedDelivery: 'Within 2–3 Business Days',
      currentStepIndex: 1, // Cold-packing in progress
      steps: [
        {
          label: 'Order Confirmed',
          detail: 'Payment authorized & recipe dispatched to kitchen',
          time: 'Just now',
          location: 'Portland Kitchen, OR',
          isComplete: true,
          isCurrent: false,
        },
        {
          label: 'Cold-Packed & Sealed',
          detail: 'Thermal bio-pack sealed with dry cold insulation at 4°C',
          time: 'In Progress',
          location: 'Cascade Packing Facility, OR',
          isComplete: true,
          isCurrent: true,
        },
        {
          label: 'In Transit via Clean Carrier',
          detail: 'Scheduled for clean electric line-haul departure',
          time: 'Pending',
          location: 'Regional Sorting Terminal',
          isComplete: false,
          isCurrent: false,
        },
        {
          label: 'Out for Delivery',
          detail: 'Dispatched on local route',
          time: 'Pending',
          location: 'Local Delivery Hub',
          isComplete: false,
          isCurrent: false,
        },
        {
          label: 'Delivered',
          detail: 'Contactless doorstep drop with verification',
          time: 'Pending',
          location: 'Destination Doorstep',
          isComplete: false,
          isCurrent: false,
        },
      ],
    };

    // Append to user orders
    setUser((prev) => ({
      ...prev,
      orders: [newOrder, ...prev.orders],
    }));

    // Clear cart
    setCart([]);
    addToast('success', 'Order Placed!', `Order #${orderId} is now live in your Order Tracker!`);
  };

  const handleSimulateNextStep = (orderId: string) => {
    const statusMap: Array<UserOrder['status']> = [
      'Confirmed',
      'Processing',
      'In Transit',
      'Out for Delivery',
      'Delivered',
    ];

    setUser((prev) => ({
      ...prev,
      orders: prev.orders.map((ord) => {
        if (ord.id === orderId) {
          const nextIndex = (ord.currentStepIndex + 1) % 5;
          const nextStatus = statusMap[nextIndex];
          const updatedSteps = ord.steps.map((st, i) => ({
            ...st,
            isComplete: i <= nextIndex,
            isCurrent: i === nextIndex,
          }));

          addToast(
            'info',
            'Shipping Progress Updated',
            `Order #${orderId} is now: ${nextStatus}`
          );

          return {
            ...ord,
            currentStepIndex: nextIndex,
            status: nextStatus,
            steps: updatedSteps,
          };
        }
        return ord;
      }),
    }));
  };

  const handleLogin = (name: string, email: string) => {
    setUser((prev) => ({
      ...prev,
      name,
      email,
      isLoggedIn: true,
    }));
    addToast('success', `Welcome, ${name}!`, 'You are now signed in to your AXOLYT account.');
  };

  const handleLogout = () => {
    setUser((prev) => ({
      ...prev,
      name: 'Guest Explorer',
      email: 'guest@axolytenergy.com',
      isLoggedIn: false,
    }));
    setIsAuthOpen(false);
    addToast('info', 'Signed Out', 'You have been logged out of your account.');
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#051109] text-emerald-50 relative selection:bg-emerald-500 selection:text-black">
      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Sticky Top Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenStory={() => setIsStoryOpen(true)}
        user={user}
      />

      {/* Main Content Sections */}
      <main>
        {/* A. Hero Section */}
        <Hero
          products={PRODUCTS}
          onAddToCart={handleAddToCart}
          onOpenDetails={(p) => setSelectedProductDetail(p)}
        />

        {/* B. Brand Benefits Bar */}
        <BenefitsBar />

        {/* C. Ingredients & Botanical Science Section */}
        <IngredientsSection />

        {/* D. Product Showcase (Carousel & Grid with Pack Selectors) */}
        <ProductCarousel
          products={PRODUCTS}
          onAddToCart={handleAddToCart}
          onOpenDetails={(p) => setSelectedProductDetail(p)}
          searchQuery={searchQuery}
        />

        {/* E. Clean Energy Section & Matrix */}
        <CleanEnergySection onOpenStory={() => setIsStoryOpen(true)} />

        {/* F. Statistics Section */}
        <StatsSection />

        {/* G. Botanical Journal (Blog) Section */}
        <BlogSection />

        {/* H. Newsletter Subscription Section */}
        <NewsletterSection
          onSuccess={(email) => {
            setAppliedPromo('NATURE15');
            setDiscountRate(0.15);
            addToast('success', 'Promo Unlocked!', '15% discount code NATURE15 automatically applied!');
          }}
        />

        {/* I. Contact & Google Maps Location Section */}
        <ContactSection
          onNotify={(type, title, msg) => addToast(type, title, msg)}
        />
      </main>

      {/* J. Footer */}
      <Footer
        onOpenStory={() => setIsStoryOpen(true)}
        onOpenIngredients={() => scrollToSection('ingredients')}
        onOpenShop={() => scrollToSection('shop')}
        onOpenBlog={() => scrollToSection('blog')}
      />

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        appliedPromo={appliedPromo}
        discountRate={discountRate}
        onApplyPromo={handleApplyPromo}
      />

      {/* Express Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        discountRate={discountRate}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductDetail}
        onClose={() => setSelectedProductDetail(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Our Story Modal */}
      <OurStoryModal
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
      />

      {/* User Account / Auth Modal & Order Tracker */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onSimulateNextStep={handleSimulateNextStep}
      />

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProductDetail(p)}
        onOpenIngredients={() => scrollToSection('ingredients')}
        onOpenBlog={() => scrollToSection('blog')}
      />
    </div>
  );
}
