/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
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
import { AdminDashboard } from './components/AdminDashboard';
import { OfflineIndicator } from './components/OfflineIndicator';
import { MobileAppBar } from './components/MobileAppBar';
import { ToastContainer, ToastMessage } from './components/Toast';
import { PRODUCTS } from './data/products';
import { Product, CartItem, UserProfile, UserOrder, AppConfig } from './types';
import { auth, db, testFirestoreConnection, handleFirestoreError, OperationType } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc, collection, onSnapshot, updateDoc, deleteDoc } from 'firebase/firestore';

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

  // 1b. Products Catalog State (Persistent via localStorage & Firestore)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('axolyt_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // storage unavailable
    }
    return PRODUCTS;
  });

  // 2. User Profile State (Persistent via localStorage)
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('axolyt_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          orders: parsed.isLoggedIn ? (parsed.orders || []) : [],
        };
      }
    } catch {
      // storage unavailable
    }
    return {
      name: 'Guest Explorer',
      email: 'guest@axolytenergy.com',
      isLoggedIn: false,
      memberTier: 'Botanical Society - Silver Tier',
      role: 'member',
      orders: [],
    };
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

  // 2b. Firebase Boot Connection Test & Realtime Auth/Order Sync
  useEffect(() => {
    testFirestoreConnection();

    const unsubscribeAuth = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const uid = fbUser.uid;
        const userDocRef = doc(db, 'users', uid);

        const isAdminEmail =
          fbUser.email === 'princeyadav391yadav@gmail.com' ||
          fbUser.email?.toLowerCase().includes('admin');

        try {
          const userSnap = await getDoc(userDocRef);
          if (!userSnap.exists()) {
            await setDoc(userDocRef, {
              name: fbUser.displayName || 'AXOLYT Member',
              email: fbUser.email || '',
              memberTier: 'Botanical Society - Gold Member',
              role: isAdminEmail ? 'admin' : 'member',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
            setUser({
              uid,
              name: fbUser.displayName || 'AXOLYT Member',
              email: fbUser.email || '',
              role: isAdminEmail ? 'admin' : 'member',
              memberTier: 'Botanical Society - Gold Member',
              isLoggedIn: true,
              orders: [],
            });
          } else {
            const data = userSnap.data();
            setUser((prev) => ({
              ...prev,
              uid,
              name: data.name || prev.name,
              email: data.email || prev.email,
              memberTier: data.memberTier || prev.memberTier,
              role: isAdminEmail ? 'admin' : (data.role || 'member'),
              isLoggedIn: true,
              orders: [],
            }));
          }
        } catch (err) {
          console.warn(`User profile fetch notice for ${uid}:`, err);
        }

        // If checkout was initiated before login, auto-open checkout now
        if (pendingCheckoutRef.current) {
          pendingCheckoutRef.current = false;
          setIsPendingCheckout(false);
          setIsAuthOpen(false);
          setIsCheckoutOpen(true);
        }

        // Attach Realtime Listener for THIS user's personal orders
        const ordersCol = collection(db, 'users', uid, 'orders');
        const unsubscribeOrders = onSnapshot(
          ordersCol,
          (snapshot) => {
            const cloudOrders: UserOrder[] = [];
            snapshot.forEach((d) => {
              cloudOrders.push(d.data() as UserOrder);
            });
            setUser((prev) => ({
              ...prev,
              orders: cloudOrders,
            }));
          },
          (err) => {
            console.warn(`Orders snapshot notice for ${uid}:`, err.message);
          }
        );

        return () => {
          unsubscribeOrders();
        };
      } else {
        setUser({
          name: 'Guest Explorer',
          email: 'guest@axolytenergy.com',
          isLoggedIn: false,
          role: 'member',
          memberTier: 'Botanical Society - Silver Tier',
          orders: [],
        });
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  // 3. Discount & Promo State
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountRate, setDiscountRate] = useState<number>(0);

  // 3b. App Configuration & Settings (Managed by Admin)
  const [appConfig, setAppConfig] = useState<AppConfig>({
    storeStatus: 'open',
    announcementBanner: '🌿 Free 2-Day Priority Cold-Pack Shipping on orders over $40 · Code: PUREENERGY for 15% OFF',
    promoCode: 'PUREENERGY',
    discountPercent: 15,
  });

  useEffect(() => {
    const unsubConfig = onSnapshot(
      doc(db, 'settings', 'app_config'),
      (snap) => {
        if (snap.exists()) {
          setAppConfig(snap.data() as AppConfig);
        }
      },
      (err) => {
        console.warn('App settings snapshot notice:', err.message);
      }
    );
    return () => unsubConfig();
  }, []);

  // 3c. Sync Products Catalog with Firestore
  useEffect(() => {
    const unsubProducts = onSnapshot(
      collection(db, 'products'),
      (snapshot) => {
        if (!snapshot.empty) {
          const list: Product[] = [];
          snapshot.forEach((d) => list.push(d.data() as Product));
          if (list.length > 0) {
            setProducts(list);
            try {
              localStorage.setItem('axolyt_products', JSON.stringify(list));
            } catch {
              // storage unavailable
            }
          }
        }
      },
      (err) => {
        console.warn('Products collection snapshot notice:', err.message);
      }
    );
    return () => unsubProducts();
  }, []);

  // Admin Power: Add New Product to Store Catalog
  const handleAddProduct = async (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    try {
      const updated = [newProd, ...products];
      localStorage.setItem('axolyt_products', JSON.stringify(updated));
      await setDoc(doc(db, 'products', newProd.id), newProd);
    } catch (err) {
      console.warn('Firestore product creation notice:', err);
    }
    addToast('success', 'Product Added to Store!', `${newProd.name} is now live in the store catalog.`);
  };

  // Admin Power: Remove Product from Store Catalog
  const handleRemoveProduct = async (productId: string) => {
    const prodToRemove = products.find((p) => p.id === productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    try {
      const updated = products.filter((p) => p.id !== productId);
      localStorage.setItem('axolyt_products', JSON.stringify(updated));
      await deleteDoc(doc(db, 'products', productId));
    } catch (err) {
      console.warn('Firestore product removal notice:', err);
    }
    addToast('info', 'Product Removed', `${prodToRemove ? prodToRemove.name : 'Product'} was removed from the store catalog.`);
  };

  // 4. Modal Visibility Controls
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);

  // Pending checkout gate: when guest clicks checkout, hold state until authentication completes
  const pendingCheckoutRef = useRef(false);
  const [isPendingCheckout, setIsPendingCheckout] = useState(false);

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
    if (appConfig.promoCode && normalized === appConfig.promoCode.toUpperCase()) {
      const rate = (appConfig.discountPercent || 15) / 100;
      setAppliedPromo(normalized);
      setDiscountRate(rate);
      addToast('success', 'Promo Code Applied!', `${appConfig.discountPercent}% discount applied to your order.`);
      return true;
    }
    if (normalized === 'NATURE15' || normalized === 'ORGANIC15') {
      setAppliedPromo(normalized);
      setDiscountRate(0.15);
      addToast('success', 'Promo Code Applied!', '15% discount has been applied to your order.');
      return true;
    }
    return false;
  };

  const handleProceedToCheckout = () => {
    if (!user.isLoggedIn) {
      setIsCartOpen(false);
      pendingCheckoutRef.current = true;
      setIsPendingCheckout(true);
      setIsAuthOpen(true);
      addToast(
        'info',
        'Login Required to Order',
        'Bina login kiye order nahi liya jata. Kripya pehle account sign in ya register karein. Login karte hi checkout portal khul jayega!'
      );
    } else {
      setIsCheckoutOpen(true);
    }
  };

  const handleOrderSuccess = (orderId: string, customerData?: { name: string; email: string }) => {
    const orderItemsSummary = cart.map((c) => `${c.quantity}x ${c.name} (${c.packType === 'pack12' ? '12-Pack' : 'Single'})`).join(', ');
    const orderTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const customerName = customerData?.name || user.name || 'AXOLYT Member';
    const customerEmail = customerData?.email || user.email || 'customer@axolytenergy.com';

    const newOrder: UserOrder = {
      id: orderId,
      userId: auth.currentUser?.uid,
      customerName,
      customerEmail,
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

    // Append to user orders in local state
    setUser((prev) => ({
      ...prev,
      orders: [newOrder, ...prev.orders],
    }));

    // If authenticated in Firebase, persist order to Firestore
    if (auth.currentUser) {
      const orderRef = doc(db, 'users', auth.currentUser.uid, 'orders', orderId);
      setDoc(orderRef, {
        userId: auth.currentUser.uid,
        customerName,
        customerEmail,
        id: newOrder.id,
        date: newOrder.date,
        items: newOrder.items,
        total: newOrder.total,
        status: newOrder.status,
        carrier: newOrder.carrier,
        trackingNumber: newOrder.trackingNumber,
        estimatedDelivery: newOrder.estimatedDelivery,
        currentStepIndex: newOrder.currentStepIndex,
        steps: newOrder.steps,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }).catch((err) => {
        handleFirestoreError(err, OperationType.CREATE, `users/${auth.currentUser?.uid}/orders/${orderId}`);
      });
    }

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

    let nextIndex = 0;
    let nextStatus: UserOrder['status'] = 'Confirmed';
    let updatedSteps: UserOrder['steps'] = [];

    setUser((prev) => ({
      ...prev,
      orders: prev.orders.map((ord) => {
        if (ord.id === orderId) {
          nextIndex = (ord.currentStepIndex + 1) % 5;
          nextStatus = statusMap[nextIndex];
          updatedSteps = ord.steps.map((st, i) => ({
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

    // Sync updated shipping step to Firestore if authenticated
    if (auth.currentUser) {
      const orderRef = doc(db, 'users', auth.currentUser.uid, 'orders', orderId);
      updateDoc(orderRef, {
        currentStepIndex: nextIndex,
        status: nextStatus,
        steps: updatedSteps,
        updatedAt: new Date().toISOString(),
      }).catch((err) => {
        handleFirestoreError(err, OperationType.UPDATE, `users/${auth.currentUser?.uid}/orders/${orderId}`);
      });
    }
  };

  const handleLogin = (name: string, email: string) => {
    const isAdminEmail =
      email === 'princeyadav391yadav@gmail.com' ||
      email.toLowerCase().includes('admin');

    setUser((prev) => ({
      ...prev,
      name,
      email,
      role: isAdminEmail ? 'admin' : (prev.role || 'member'),
      isLoggedIn: true,
    }));
    addToast('success', `Welcome, ${name}!`, 'You are now signed in to your AXOLYT account.');

    if (pendingCheckoutRef.current) {
      pendingCheckoutRef.current = false;
      setIsPendingCheckout(false);
      setIsCheckoutOpen(true);
      addToast('info', 'Proceeding to Checkout', 'Aap login ho gaye hain! Ab apna order complete karein.');
    }
  };

  const handleLogout = () => {
    setUser({
      name: 'Guest Explorer',
      email: 'guest@axolytenergy.com',
      role: 'member',
      isLoggedIn: false,
      memberTier: 'Botanical Society - Silver Tier',
      orders: [],
    });
    try {
      localStorage.removeItem('axolyt_user');
    } catch {
      // storage unavailable
    }
    setIsAuthOpen(false);
    setIsAdminOpen(false);
    addToast('info', 'Signed Out', 'Aap apne account se safaltapoorvak sign out ho gaye hain.');
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#051109] text-emerald-50 relative selection:bg-emerald-500 selection:text-black pb-20 md:pb-0">
      {/* Real-time Global Announcement Bar (Managed by Admin) */}
      {appConfig.announcementBanner && (
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border-b border-emerald-500/20 py-1.5 px-4 text-center text-xs font-semibold text-emerald-200 flex items-center justify-center gap-2 relative z-40">
          {appConfig.storeStatus === 'sale' && (
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-emerald-950 text-[10px] font-bold uppercase tracking-wider animate-pulse">
              Flash Sale
            </span>
          )}
          {appConfig.storeStatus === 'maintenance' && (
            <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider">
              Maintenance Notice
            </span>
          )}
          <span className="truncate">{appConfig.announcementBanner}</span>
        </div>
      )}

      {/* Sticky Top Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenStory={() => setIsStoryOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        user={user}
      />

      {/* Main Content Sections */}
      <main>
        {/* A. Hero Section */}
        <Hero
          products={products}
          onAddToCart={handleAddToCart}
          onOpenDetails={(p) => setSelectedProductDetail(p)}
        />

        {/* B. Brand Benefits Bar */}
        <BenefitsBar />

        {/* C. Ingredients & Botanical Science Section */}
        <IngredientsSection />

        {/* D. Product Showcase (Carousel & Grid with Pack Selectors) */}
        <ProductCarousel
          products={products}
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
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdmin={user.role === 'admin' || user.email === 'princeyadav391yadav@gmail.com'}
      />

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        appliedPromo={appliedPromo}
        discountRate={discountRate}
        onApplyPromo={handleApplyPromo}
        isLoggedIn={user.isLoggedIn}
      />

      {/* Express Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        discountRate={discountRate}
        onOrderSuccess={handleOrderSuccess}
        user={user}
        onRequireLogin={() => {
          setIsCheckoutOpen(false);
          pendingCheckoutRef.current = true;
          setIsPendingCheckout(true);
          setIsAuthOpen(true);
        }}
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
        onClose={() => {
          setIsAuthOpen(false);
          setIsPendingCheckout(false);
          pendingCheckoutRef.current = false;
        }}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onSimulateNextStep={handleSimulateNextStep}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isPendingCheckout={isPendingCheckout}
      />

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProductDetail(p)}
        onOpenIngredients={() => scrollToSection('ingredients')}
        onOpenBlog={() => scrollToSection('blog')}
        products={products}
      />

      {/* Admin Dashboard Command Center */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        user={user}
        orders={user.orders}
        products={products}
        onAddProduct={handleAddProduct}
        onRemoveProduct={handleRemoveProduct}
        onNotify={addToast}
        onAdminAuthenticated={(adminProfile) => {
          setUser((prev) => ({
            ...prev,
            name: adminProfile.name,
            email: adminProfile.email,
            role: 'admin',
            isLoggedIn: true,
          }));
        }}
      />

      {/* Mobile Native Bottom App Navigation Bar */}
      <MobileAppBar
        cartCount={totalCartCount}
        user={user}
        onNavigateHome={() => scrollToSection('home')}
        onNavigateShop={() => scrollToSection('shop')}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Offline Network Status Banner */}
      <OfflineIndicator />

      {/* App Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
