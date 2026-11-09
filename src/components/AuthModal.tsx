import React, { useState } from 'react';
import {
  X,
  User,
  Lock,
  Mail,
  Shield,
  Sparkles,
  LogOut,
  Package,
  Truck,
  ArrowRight,
  Download,
  LifeBuoy,
  Eye,
  EyeOff,
  KeyRound,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { UserProfile, UserOrder } from '../types';
import { OrderTracker } from './OrderTracker';
import { OrderSupportModal } from './OrderSupportModal';
import {
  loginWithGoogle,
  loginWithEmail,
  registerWithEmail,
  logoutUser,
  resetPassword,
  parseAuthError,
  loginOrRegisterAdmin,
  DEFAULT_ADMIN_PASSWORD,
} from '../lib/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onLogin: (name: string, email: string) => void;
  onLogout: () => void;
  onSimulateNextStep?: (orderId: string) => void;
  onOpenAdmin?: () => void;
  isPendingCheckout?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onLogin,
  onLogout,
  onSimulateNextStep,
  onOpenAdmin,
  isPendingCheckout = false,
}) => {
  const [tab, setTab] = useState<'signin' | 'register' | 'admin'>('signin');
  const [profileTab, setProfileTab] = useState<'tracker' | 'history'>('tracker');
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    user.orders?.[0]?.id || ''
  );
  const [supportOrder, setSupportOrder] = useState<UserOrder | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Admin dedicated credentials
  const [adminEmail, setAdminEmail] = useState('princeyadav391yadav@gmail.com');
  const [adminPassword, setAdminPassword] = useState('');

  // Password reset state
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccessMessage, setResetSuccessMessage] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const currentOrder =
    user.orders?.find((o) => o.id === selectedOrderId) || user.orders?.[0];

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const fbUser = await loginWithGoogle();
      onLogin(fbUser.displayName || 'Member', fbUser.email || '');
      onClose();
    } catch (err: unknown) {
      setError(parseAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (tab === 'register') {
      if (!name.trim()) {
        setError('Kripya apna pura naam dalein (Please enter full name).');
        return;
      }
      if (password !== confirmPassword) {
        setError('Dono password match nahi ho rahe (Passwords do not match).');
        return;
      }
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Kripya ek valid email address dalein (Enter valid email).');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password kam se kam 6 akshar (characters) ka hona chahiye.');
      return;
    }

    setLoading(true);
    try {
      if (tab === 'register') {
        const fbUser = await registerWithEmail(name.trim(), email.trim(), password);
        onLogin(name.trim(), fbUser.email || email.trim());
      } else {
        const fbUser = await loginWithEmail(email.trim(), password);
        onLogin(fbUser.displayName || email.split('@')[0], fbUser.email || email.trim());
      }
      onClose();
    } catch (err: unknown) {
      setError(parseAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!adminEmail.trim() || !adminEmail.includes('@')) {
      setError('Kripya valid admin email address dalein.');
      return;
    }

    if (!adminPassword) {
      setError('Admin password dalna jaruri hai (Admin password required).');
      return;
    }

    setLoading(true);
    try {
      const fbUser = await loginOrRegisterAdmin(adminEmail.trim(), adminPassword);
      const isAuthorizedAdmin =
        fbUser.email === 'princeyadav391yadav@gmail.com' ||
        fbUser.email?.toLowerCase().includes('admin');

      if (!isAuthorizedAdmin) {
        throw new Error('Aapka account admin nahi hai. Keval authorized admin hi login kar sakta hai.');
      }

      onLogin(fbUser.displayName || 'Prince Yadav (Admin)', fbUser.email || adminEmail);
      onClose();
      if (onOpenAdmin) {
        onOpenAdmin();
      }
    } catch (err: unknown) {
      setError(parseAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResetSuccessMessage('');

    if (!resetEmail.trim() || !resetEmail.includes('@')) {
      setError('Kripya registered email address dalein.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(resetEmail.trim());
      setResetSuccessMessage(`Password reset link aapke email (${resetEmail}) par bhej diya gaya hai!`);
    } catch (err: unknown) {
      setError(parseAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.warn('Logout error:', err);
    }
    onLogout();
  };

  const handleDownloadInvoice = (order: UserOrder) => {
    const invoiceContent = `============================================================
              AXOLYT ORGANIC ENERGY LLC
              Nature. Energy. Elevated.
            Cascade Range, Oregon, USA
           support@axolytenergy.com
============================================================
OFFICIAL INVOICE & ORDER RECEIPT
Invoice Number : INV-${order.id}
Order Number   : ${order.id}
Order Date     : ${order.date}
Shipping Status: ${order.status}
Carrier        : ${order.carrier}
Tracking Number: ${order.trackingNumber}
Estimated Deliv: ${order.estimatedDelivery}
------------------------------------------------------------
CUSTOMER INFORMATION:
Customer Name  : ${user.name}
Email Address  : ${user.email}
Member Tier    : ${user.memberTier}
------------------------------------------------------------
ORDER DETAILS:
Item(s) Ordered:
- ${order.items}
  Packaging    : Thermal Bio-Insulated Chilled Pack (4°C)
  Subtotal     : $${order.total.toFixed(2)}
  Shipping     : FREE (Cold-Pack Priority)
  Tax          : Included
------------------------------------------------------------
TOTAL AMOUNT PAID: $${order.total.toFixed(2)} USD
Payment Status : Fully Authorized & Paid via Encrypted Gateway
Transaction Ref: #TXN-${Math.floor(10000000 + Math.random() * 90000000)}
------------------------------------------------------------
CERTIFICATIONS & SUSTAINABILITY GUARANTEE:
* 100% USDA Certified Organic & Non-GMO Project Verified
* Certified B Corporation & 1% for the Planet Member
* 100% Infinitely Recyclable Aluminum
* 30-Day Freshness & Vitality Guarantee
============================================================
Need assistance with this delivery?
Contact our team: support@axolytenergy.com
============================================================`;

    const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AXOLYT-Invoice-${order.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-emerald-400/30 shadow-2xl text-left overflow-y-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-emerald-300 hover:text-white hover:bg-emerald-950/80 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {user.isLoggedIn ? (
          /* Logged In Screen: Profile & Personal Isolated Orders */
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pr-8">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">
                    Member Portal &amp; Tracker
                  </span>
                  {user.role === 'admin' && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 text-[9px] font-mono font-bold uppercase tracking-wider">
                      Verified Admin
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-display font-extrabold text-white">
                  Welcome, {user.name}
                </h3>
                <p className="text-xs text-emerald-300/80 font-mono">{user.email}</p>
              </div>

              {/* Membership Tier Pill & Admin Link */}
              <div className="flex items-center gap-2">
                <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-xs flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="text-[10px] text-emerald-300/70 block uppercase font-mono">Tier</span>
                    <span className="font-bold text-white text-xs">{user.memberTier}</span>
                  </div>
                </div>

                {(user.role === 'admin' || user.email === 'princeyadav391yadav@gmail.com') && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onOpenAdmin) onOpenAdmin();
                    }}
                    className="py-2.5 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/30 transition-all"
                    title="Open Admin Dashboard"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Admin Panel</span>
                  </button>
                )}
              </div>
            </div>

            {/* Profile Navigation Tabs: Order Tracker vs All Orders */}
            <div className="flex gap-2 p-1 bg-emerald-950/60 rounded-xl border border-emerald-500/20 text-xs font-semibold">
              <button
                onClick={() => setProfileTab('tracker')}
                className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
                  profileTab === 'tracker'
                    ? 'bg-emerald-500 text-emerald-950 font-bold shadow-md'
                    : 'text-emerald-200/70 hover:text-white'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>Live Order Tracker</span>
              </button>
              <button
                onClick={() => setProfileTab('history')}
                className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
                  profileTab === 'history'
                    ? 'bg-emerald-500 text-emerald-950 font-bold shadow-md'
                    : 'text-emerald-200/70 hover:text-white'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Personal Orders ({user.orders?.length || 0})</span>
              </button>
            </div>

            {/* Tab 1: Live Order Tracker with Progress Bar */}
            {profileTab === 'tracker' && (
              <div className="space-y-4">
                {user.orders && user.orders.length > 0 ? (
                  <>
                    {/* Order Selector (if more than 1 order) */}
                    {user.orders.length > 1 && (
                      <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        <span className="text-[11px] text-emerald-300/70 whitespace-nowrap">
                          Select Order:
                        </span>
                        {user.orders.map((ord) => (
                          <button
                            key={ord.id}
                            onClick={() => setSelectedOrderId(ord.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all ${
                              currentOrder?.id === ord.id
                                ? 'bg-emerald-400 text-emerald-950 shadow-md'
                                : 'bg-emerald-950/50 text-emerald-300/80 border border-emerald-500/20 hover:border-emerald-400/40'
                            }`}
                          >
                            {ord.id} ({ord.status})
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Progress Bar Visualization Component */}
                    {currentOrder && (
                      <OrderTracker
                        order={currentOrder}
                        onSimulateNextStep={onSimulateNextStep}
                        onDownloadInvoice={handleDownloadInvoice}
                        onOpenHelp={(ord) => setSupportOrder(ord)}
                      />
                    )}
                  </>
                ) : (
                  <div className="p-8 text-center glass-panel rounded-2xl space-y-2 border border-emerald-500/20">
                    <Truck className="w-8 h-8 text-emerald-400/60 mx-auto" />
                    <p className="text-emerald-200/80 text-sm font-semibold">No active shipments in your account.</p>
                    <p className="text-xs text-emerald-200/60">
                      Aapka personal order data yahan safe hai. Jab aap koi order place karenge, live shipping progress yahan dikhega.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Full Personal Order History */}
            {profileTab === 'history' && (
              <div className="space-y-3">
                {user.orders && user.orders.length > 0 ? (
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {user.orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/20 text-xs flex justify-between items-center hover:border-emerald-400/40 transition-colors"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white font-mono">{ord.id}</span>
                            <span className="text-[10px] text-emerald-300/70">· {ord.date}</span>
                          </div>
                          <div className="text-[11px] text-emerald-200/70">{ord.items}</div>
                        </div>

                        <div className="text-right flex items-center gap-3">
                          <div>
                            <div className="font-mono text-emerald-300 font-bold">
                              ${ord.total.toFixed(2)}
                            </div>
                            <span className="text-[10px] text-emerald-400 font-medium">{ord.status}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleDownloadInvoice(ord)}
                              title="Download Invoice"
                              className="p-1.5 rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 hover:text-white border border-emerald-500/20 transition-colors"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setSupportOrder(ord)}
                              title="Help with Order"
                              className="p-1.5 rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 hover:text-white border border-emerald-500/20 transition-colors"
                            >
                              <LifeBuoy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedOrderId(ord.id);
                                setProfileTab('tracker');
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[11px] font-semibold flex items-center gap-1 border border-emerald-500/30"
                            >
                              <span>Track</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center glass-panel rounded-2xl space-y-2 border border-emerald-500/20">
                    <Package className="w-8 h-8 text-emerald-400/60 mx-auto" />
                    <p className="text-emerald-200/80 text-sm">Abhi tak koi order place nahi hua hai.</p>
                  </div>
                )}
              </div>
            )}

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-emerald-500/20 flex gap-3">
              <button
                onClick={handleSignOut}
                className="py-2.5 px-4 rounded-xl glass-panel text-red-300 hover:text-white hover:bg-red-950/50 border border-red-500/30 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : isForgotPassword ? (
          /* Forgot Password Screen */
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">
                Account Recovery
              </span>
              <h3 className="text-2xl font-display font-extrabold text-white">
                Reset Your Password
              </h3>
              <p className="text-xs text-emerald-200/70">
                Apna registered email enter karein. Hum aapko password reset karne ka official link bhejenge.
              </p>
            </div>

            {resetSuccessMessage ? (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-200 space-y-3">
                <div className="flex items-center gap-2 text-emerald-300 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Email Sent Successfully!</span>
                </div>
                <p className="leading-relaxed">{resetSuccessMessage}</p>
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotPassword(false);
                    setResetSuccessMessage('');
                    setError('');
                  }}
                  className="w-full py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs transition-colors"
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handlePasswordReset} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400/60" />
                  <input
                    type="email"
                    placeholder="Enter your registered email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-white text-xs placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(false);
                      setError('');
                    }}
                    className="py-2.5 px-4 rounded-xl glass-panel text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Real-World Authentication Flow */
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-[10px] font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Secure Authentication Portal</span>
              </div>
              <h3 className="text-2xl font-display font-extrabold text-white">
                {tab === 'signin' && 'Member Sign In'}
                {tab === 'register' && 'Create Your Account'}
                {tab === 'admin' && 'Admin Command Center Access'}
              </h3>
              <p className="text-xs text-emerald-200/70">
                {tab === 'admin'
                  ? 'Keval authorized administrator jiske pas password hai vhi login kar sakta hai.'
                  : 'Har customer ka data bilkul alag aur safe rehta hai.'}
              </p>
            </div>

            {/* Pending Checkout Alert Banner */}
            {isPendingCheckout && (
              <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/35 text-amber-200 text-xs flex items-center gap-3 animate-in fade-in">
                <Package className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="space-y-0.5">
                  <span className="font-bold text-white block">Checkout In Progress</span>
                  <span>
                    Bina login kiye order nahi liya jata. Sign in ya register karte hi aapka checkout portal turant shuru ho jayega!
                  </span>
                </div>
              </div>
            )}

            {/* Tab switch: Sign In | Register | Admin */}
            <div className="flex gap-1 p-1 bg-emerald-950/80 rounded-xl border border-emerald-500/20">
              <button
                type="button"
                onClick={() => {
                  setTab('signin');
                  setError('');
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                  tab === 'signin'
                    ? 'bg-emerald-500 text-emerald-950 font-bold shadow-sm'
                    : 'text-emerald-200/70 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setTab('register');
                  setError('');
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                  tab === 'register'
                    ? 'bg-emerald-500 text-emerald-950 font-bold shadow-sm'
                    : 'text-emerald-200/70 hover:text-white'
                }`}
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => {
                  setTab('admin');
                  setError('');
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  tab === 'admin'
                    ? 'bg-amber-400 text-emerald-950 font-bold shadow-sm'
                    : 'text-amber-300/80 hover:text-amber-200'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-amber-500" />
                <span>Admin Login</span>
              </button>
            </div>

            {/* TAB 1 & 2: Customer Sign In & Registration */}
            {tab !== 'admin' && (
              <>
                {/* Google One-Click Sign-In */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-100 text-zinc-900 font-bold text-xs flex items-center justify-center gap-3 transition-colors shadow-lg disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <div className="relative flex items-center justify-center">
                  <div className="w-full border-t border-emerald-500/20" />
                  <span className="absolute px-3 bg-[#0a2313] text-[10px] uppercase font-bold tracking-wider text-emerald-300/60">
                    Or with Password
                  </span>
                </div>

                <form onSubmit={handleCustomerSubmit} className="space-y-3.5">
                  {tab === 'register' && (
                    <div>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400/60" />
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-white text-xs placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400/60" />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-white text-xs placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400/60" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password (minimum 6 characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-white text-xs placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400/60 hover:text-emerald-300 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {tab === 'register' && (
                    <div>
                      <div className="relative">
                        <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400/60" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-white text-xs placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-[11px] pt-1">
                    {tab === 'signin' && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsForgotPassword(true);
                          setResetEmail(email);
                          setError('');
                        }}
                        className="text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        Forgot Password?
                      </button>
                    )}
                    <span className="text-emerald-300/50 ml-auto">
                      {tab === 'signin' ? 'Encrypted session' : 'Real-time account setup'}
                    </span>
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/30 text-xs text-red-300 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-emerald-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : tab === 'signin' ? 'Sign In to Your Account' : 'Create Free Customer Account'}
                  </button>
                </form>
              </>
            )}

            {/* TAB 3: Dedicated Protected Admin Gate */}
            {tab === 'admin' && (
              <form onSubmit={handleAdminSubmit} className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                    <Shield className="w-4 h-4 text-amber-400" />
                    <span>Admin Security Verification</span>
                  </div>
                  <p className="text-[11px] text-amber-200/80 leading-relaxed">
                    Admin panel keval vahi access kar sakta hai jiske pas authorized password hai. Kripya apna administrator email aur password darj karein.
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-emerald-300/80 mb-1">
                    Admin Email Address:
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400/60" />
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-white text-xs placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400 font-mono"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-emerald-300/80 mb-1">
                    Admin Password:
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400/60" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter Admin Password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-white text-xs placeholder-emerald-300/40 focus:outline-none focus:border-amber-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400/60 hover:text-emerald-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-[11px] pt-1.5">
                    <span className="text-amber-200/50 text-[10px]">
                      Encrypted administrator verification
                    </span>
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/30 text-xs text-red-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-bold text-xs transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Shield className="w-4 h-4" />
                  <span>{loading ? 'Authenticating Admin...' : 'Authenticate & Open Admin Dashboard'}</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Help with Order Support Modal */}
      <OrderSupportModal
        isOpen={!!supportOrder}
        onClose={() => setSupportOrder(null)}
        order={supportOrder}
        userEmail={user.email}
        userName={user.name}
        onSubmitSupportTicket={() => {}}
      />
    </div>
  );
};
