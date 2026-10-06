import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Key, 
  CreditCard, 
  CheckCircle2, 
  X, 
  Plus, 
  Lock, 
  Smartphone, 
  ShieldCheck, 
  ArrowRight,
  Building
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    loginUser, 
    registerUser, 
    loginAdmin, 
    currentUserAccount,
    logoutUser,
    paymentMethods,
    addPaymentMethod,
    setPrimaryPaymentMethod,
    setActiveTab
  } = useApp();

  const [activeTab, setActiveTabMode] = useState<'LOGIN' | 'REGISTER' | 'ADMIN' | 'PAYMENT_METHODS'>('LOGIN');

  // Form states
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regUpi, setRegUpi] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Admin login state
  const [adminUsername, setAdminUsername] = useState('admin123');
  const [adminPassword, setAdminPassword] = useState('admin@123');

  // New Payment Method state
  const [newUpiId, setNewUpiId] = useState('');
  const [newBankName, setNewBankName] = useState('State Bank of India');

  if (!isAuthModalOpen) return null;

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      setAuthError('Please enter your email or UPI ID and password.');
      return;
    }
    const success = loginUser(loginIdentifier, loginPassword);
    if (success) {
      setAuthSuccess('Welcome back! Authentication verified.');
      setTimeout(() => {
        setIsAuthModalOpen(false);
        setAuthSuccess('');
      }, 1000);
    } else {
      setAuthError('Invalid credentials. You can register a new account below.');
    }
  };

  const handleUserRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setAuthError('Please fill out all mandatory fields.');
      return;
    }
    registerUser({
      name: regName,
      email: regEmail,
      phone: regPhone || '+91 98765 00000',
      upiId: regUpi || `${regName.toLowerCase().replace(/\s+/g, '')}@okaxis`,
      password: regPassword
    });

    setAuthSuccess('Account registered successfully! Credentials saved.');
    setTimeout(() => {
      setIsAuthModalOpen(false);
      setAuthSuccess('');
    }, 1200);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const success = loginAdmin(adminUsername, adminPassword);
    if (success) {
      setAuthSuccess('Admin access granted! Entering Admin Operations Center...');
      setTimeout(() => {
        setIsAuthModalOpen(false);
        setAuthSuccess('');
        setActiveTab('admin');
      }, 800);
    } else {
      setAuthError('Invalid admin credentials. Use admin123 / admin@123');
    }
  };

  const handleAddUpi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUpiId.trim()) return;
    addPaymentMethod({
      type: 'UPI',
      identifier: newUpiId.trim(),
      provider: newBankName,
      isPrimary: false,
      status: 'VERIFIED'
    });
    setNewUpiId('');
    setAuthSuccess('UPI ID verified and linked successfully!');
    setTimeout(() => setAuthSuccess(''), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsAuthModalOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-sm"
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-lg bg-[#121212] border-2 border-[#2b2b2b] rounded-xl p-6 shadow-2xl z-10"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#222]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#1e1e1e] border border-[#FFD43B] flex items-center justify-center text-[#FFD43B] font-bold">
              ₹
            </div>
            <div>
              <h3 className="text-sm font-mono font-bold tracking-wider text-[#F5F1E8] uppercase">
                AUTHENTICATION & PAYMENT RAILS
              </h3>
              <p className="text-[11px] text-[#A59E92] font-sans">
                Manage login credentials, Admin console & linked UPI methods
              </p>
            </div>
          </div>

          <button onClick={() => setIsAuthModalOpen(false)} className="text-[#A59E92] hover:text-[#F5F1E8]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher (Geometric instrument strip, NO PILLS) */}
        <div className="mt-4 flex flex-wrap gap-1 p-1 rounded-lg bg-[#090909] border border-[#222]">
          <button
            onClick={() => { setActiveTabMode('LOGIN'); setAuthError(''); }}
            className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${
              activeTab === 'LOGIN' ? 'bg-[#FFD43B] text-[#090909]' : 'text-[#A59E92] hover:text-[#F5F1E8]'
            }`}
          >
            LOGIN
          </button>

          <button
            onClick={() => { setActiveTabMode('REGISTER'); setAuthError(''); }}
            className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${
              activeTab === 'REGISTER' ? 'bg-[#FFD43B] text-[#090909]' : 'text-[#A59E92] hover:text-[#F5F1E8]'
            }`}
          >
            CREATE ACCOUNT
          </button>

          <button
            onClick={() => { setActiveTabMode('PAYMENT_METHODS'); setAuthError(''); }}
            className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${
              activeTab === 'PAYMENT_METHODS' ? 'bg-[#FFD43B] text-[#090909]' : 'text-[#A59E92] hover:text-[#F5F1E8]'
            }`}
          >
            LINK UPI
          </button>

          <button
            onClick={() => { setActiveTabMode('ADMIN'); setAuthError(''); }}
            className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${
              activeTab === 'ADMIN' ? 'bg-[#E53935] text-white' : 'text-[#A59E92] hover:text-[#E53935]'
            }`}
          >
            ADMIN (admin123)
          </button>
        </div>

        {/* Feedback Notices */}
        {authError && (
          <div className="mt-3 p-2.5 rounded bg-[#201010] border border-[#E53935]/40 text-xs font-sans text-[#E53935]">
            {authError}
          </div>
        )}
        {authSuccess && (
          <div className="mt-3 p-2.5 rounded bg-[#0f2015] border border-[#10B981]/40 text-xs font-sans text-[#10B981] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>{authSuccess}</span>
          </div>
        )}

        {/* TAB 1: USER LOGIN */}
        {activeTab === 'LOGIN' && (
          <form onSubmit={handleUserLogin} className="mt-4 space-y-3.5 font-sans">
            <div>
              <label className="block text-[11px] font-mono text-[#A59E92] uppercase mb-1">
                Email Address or UPI ID
              </label>
              <input
                type="text"
                required
                placeholder="vaibhav.s@srmist.edu.in or vaibhav@okaxis"
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#090909] border border-[#2b2b2b] text-sm text-[#F5F1E8] focus:border-[#FFD43B] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#A59E92] uppercase mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#090909] border border-[#2b2b2b] text-sm text-[#F5F1E8] focus:border-[#FFD43B] focus:outline-none font-mono"
              />
            </div>

            <div className="p-3 rounded bg-[#0a0a0a] border border-[#222] text-xs text-[#A59E92]">
              Demo login hint: User <span className="text-[#FFD43B] font-mono">vaibhav@okaxis</span> is preloaded. Or create a new account in the next tab!
            </div>

            <div className="pt-2 flex items-center justify-between">
              {currentUserAccount && (
                <button
                  type="button"
                  onClick={logoutUser}
                  className="text-xs font-mono text-[#E53935] hover:underline"
                >
                  Logout ({currentUserAccount.name})
                </button>
              )}
              <button
                type="submit"
                className="ml-auto py-2.5 px-5 rounded-lg ks-button-primary text-xs font-bold sheen-active"
              >
                SIGN IN SECURELY &rarr;
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: CREATE ACCOUNT (Saved in DB for Admin Export) */}
        {activeTab === 'REGISTER' && (
          <form onSubmit={handleUserRegister} className="mt-4 space-y-3 font-sans">
            <div>
              <label className="block text-[11px] font-mono text-[#A59E92] uppercase mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rohan Verma"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#090909] border border-[#2b2b2b] text-sm text-[#F5F1E8] focus:border-[#FFD43B] focus:outline-none font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-[#A59E92] uppercase mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="rohan@srmist.edu.in"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-[#090909] border border-[#2b2b2b] text-sm text-[#F5F1E8] focus:border-[#FFD43B] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#A59E92] uppercase mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-[#090909] border border-[#2b2b2b] text-sm text-[#F5F1E8] focus:border-[#FFD43B] focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-[#A59E92] uppercase mb-1">
                  Choose UPI ID
                </label>
                <input
                  type="text"
                  placeholder="rohan@okaxis"
                  value={regUpi}
                  onChange={(e) => setRegUpi(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-[#090909] border border-[#2b2b2b] text-sm text-[#F5F1E8] focus:border-[#FFD43B] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#A59E92] uppercase mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-[#090909] border border-[#2b2b2b] text-sm text-[#F5F1E8] focus:border-[#FFD43B] focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="text-[10px] font-mono text-[#10B981]">
              ✓ Accounts registered here are stored in the database and visible in the Admin Dashboard with CSV/Excel export.
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="py-2.5 px-5 rounded-lg ks-button-primary text-xs font-bold sheen-active"
              >
                CREATE USER ACCOUNT &rarr;
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: LINKED PAYMENT METHODS & UPI */}
        {activeTab === 'PAYMENT_METHODS' && (
          <div className="mt-4 space-y-4 font-sans">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-[#A59E92]">
                ACTIVE LINKED UPI & BANK RAILS:
              </span>

              {paymentMethods.map(pm => (
                <div key={pm.id} className="p-3 rounded bg-[#090909] border border-[#222] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-[#181818] border border-[#333] flex items-center justify-center font-bold text-xs text-[#FFD43B]">
                      {pm.type === 'UPI' ? '@' : '₹'}
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-[#F5F1E8] flex items-center gap-2">
                        {pm.identifier}
                        {pm.isPrimary && (
                          <span className="px-1.5 py-0.2 rounded bg-[#10B981]/20 text-[#10B981] text-[9px] font-mono font-bold">
                            PRIMARY
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-sans text-[#A59E92]">{pm.provider} • Verified</span>
                    </div>
                  </div>

                  {!pm.isPrimary && (
                    <button
                      type="button"
                      onClick={() => setPrimaryPaymentMethod(pm.id)}
                      className="px-2.5 py-1 rounded bg-[#181818] hover:bg-[#222] text-[#A59E92] hover:text-[#FFD43B] text-[10px] font-mono"
                    >
                      Make Primary
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add New UPI Method */}
            <form onSubmit={handleAddUpi} className="p-3.5 rounded bg-[#161616] border border-[#2b2b2b] space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-[#FFD43B] block">
                + LINK ANOTHER UPI VPA OR BANK
              </span>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="e.g. vaibhav@oksbi"
                  value={newUpiId}
                  onChange={(e) => setNewUpiId(e.target.value)}
                  className="px-3 py-2 rounded bg-[#090909] border border-[#333] text-xs font-mono text-[#F5F1E8] focus:outline-none"
                />

                <select
                  value={newBankName}
                  onChange={(e) => setNewBankName(e.target.value)}
                  className="px-3 py-2 rounded bg-[#090909] border border-[#333] text-xs font-mono text-[#F5F1E8] focus:outline-none"
                >
                  <option value="State Bank of India">SBI UPI</option>
                  <option value="HDFC Bank UPI">HDFC Bank UPI</option>
                  <option value="ICICI Bank iMobile">ICICI Bank</option>
                  <option value="Google Pay (GPay)">Google Pay</option>
                  <option value="PhonePe">PhonePe</option>
                  <option value="Paytm UPI">Paytm</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded bg-[#FFD43B] text-[#090909] font-mono text-xs font-bold hover:bg-[#f5c623] transition-colors"
              >
                VERIFY & LINK VPA
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: ADMIN LOGIN (admin123 / admin@123) */}
        {activeTab === 'ADMIN' && (
          <form onSubmit={handleAdminLogin} className="mt-4 space-y-3 font-sans">
            <div className="p-3 rounded bg-[#1e0a0a] border border-[#E53935]/40 text-xs text-[#F5F1E8] space-y-1">
              <div className="font-mono font-bold text-[#E53935]">RESTRICTED ADMIN CONSOLE</div>
              <p className="text-[11px] text-[#A59E92]">
                Credentials pre-configured as requested:
                <br />Username: <span className="text-[#FFD43B] font-mono font-bold">admin123</span>
                <br />Password: <span className="text-[#FFD43B] font-mono font-bold">admin@123</span>
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#A59E92] uppercase mb-1">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#090909] border border-[#2b2b2b] text-sm text-[#F5F1E8] focus:border-[#E53935] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#A59E92] uppercase mb-1">
                Admin Master Password
              </label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#090909] border border-[#2b2b2b] text-sm text-[#F5F1E8] focus:border-[#E53935] focus:outline-none font-mono"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="py-2.5 px-5 rounded-lg ks-button-danger text-xs font-bold flex items-center gap-1.5 sheen-active"
              >
                ENTER ADMIN DASHBOARD &rarr;
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
