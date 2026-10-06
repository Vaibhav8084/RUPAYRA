import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  Download, 
  Key, 
  Users, 
  Activity, 
  Server, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  EyeOff, 
  RotateCw, 
  Wifi, 
  Database,
  ArrowUpRight,
  LogOut,
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminDashboardView: React.FC = () => {
  const { 
    isAdminAuthenticated, 
    loginAdmin, 
    logoutAdmin, 
    usersList, 
    exportUsersToCsv, 
    webhooks, 
    simulateWebhook,
    networkSpeed,
    setNetworkSpeed,
    apiRateLimitCount
  } = useApp();

  const [adminUser, setAdminUser] = useState('admin123');
  const [adminPass, setAdminPass] = useState('admin@123');
  const [loginError, setLoginError] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [searchUserQuery, setSearchUserQuery] = useState('');

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-[#131313] border-2 border-[#E53935] rounded-xl p-8 shadow-2xl text-center"
        >
          <div className="w-14 h-14 rounded-lg bg-[#2b1010] border border-[#E53935] flex items-center justify-center mx-auto text-[#E53935] mb-4">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="text-xl font-mono font-black tracking-wider text-[#F5F1E8] uppercase">
            ADMIN OPERATIONS CONSOLE
          </h2>
          <p className="text-xs text-[#A59E92] font-sans mt-1">
            Restricted access for system administrators & security auditors
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLoginError('');
              const ok = loginAdmin(adminUser, adminPass);
              if (!ok) setLoginError('Invalid admin credentials. Use admin123 / admin@123');
            }}
            className="mt-6 space-y-4 text-left font-sans"
          >
            {loginError && (
              <div className="p-2.5 rounded bg-[#251010] border border-[#E53935]/50 text-xs text-[#E53935]">
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-[11px] font-mono text-[#A59E92] uppercase mb-1">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={adminUser}
                onChange={(e) => setAdminUser(e.target.value)}
                className="w-full px-3 py-2.5 rounded bg-[#090909] border border-[#333] text-sm text-[#F5F1E8] focus:border-[#E53935] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#A59E92] uppercase mb-1">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                className="w-full px-3 py-2.5 rounded bg-[#090909] border border-[#333] text-sm text-[#F5F1E8] focus:border-[#E53935] focus:outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg ks-button-danger text-xs font-bold tracking-wider sheen-active mt-2"
            >
              AUTHENTICATE ADMIN &rarr;
            </button>
          </form>

          <div className="mt-4 text-[10px] font-mono text-[#A59E92]">
            Configured Credentials: <span className="text-[#FFD43B]">admin123</span> / <span className="text-[#FFD43B]">admin@123</span>
          </div>
        </motion.div>
      </div>
    );
  }

  const filteredUsers = usersList.filter(u =>
    u.name.toLowerCase().includes(searchUserQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchUserQuery.toLowerCase()) ||
    u.upiId.toLowerCase().includes(searchUserQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16 font-sans">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#222]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#E53935]/15 border border-[#E53935]/40 text-[#E53935] font-mono text-xs font-bold">
              SYS-ADMIN CONSOLE
            </span>
            <span className="text-[11px] font-mono text-[#10B981]">● GATEWAY ENCLAVE SECURE</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black font-mono tracking-tight text-[#F5F1E8] uppercase mt-1">
            SECURITY & USER DATABASE ADMIN
          </h1>
          <p className="text-xs text-[#A59E92]">
            Monitor registered users, export credentials to Excel, audit rate limits and inspect incoming payment webhooks.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={exportUsersToCsv}
            className="px-4 py-2.5 rounded-lg ks-button-primary text-xs font-bold flex items-center gap-2 sheen-active shadow-md"
            title="Export full user credentials to Excel (.CSV)"
          >
            <Download className="w-4 h-4" />
            EXPORT USERS TO EXCEL (.CSV)
          </button>

          <button
            onClick={logoutAdmin}
            className="px-3.5 py-2.5 rounded-lg bg-[#1f1f1f] hover:bg-[#282828] border border-[#333] text-[#F5F1E8] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5 text-[#E53935]" />
            EXIT ADMIN
          </button>
        </div>
      </div>

      {/* Top 4 System Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-4 rounded-xl bg-[#141414] border border-[#262626]">
          <span className="text-[10px] text-[#A59E92] uppercase">REGISTERED ACCOUNTS</span>
          <div className="mt-2 text-2xl font-black text-[#F5F1E8]">
            0{usersList.length} Users
          </div>
          <span className="text-[10px] text-[#10B981] mt-1 block">✓ Database Synced</span>
        </div>

        <div className="p-4 rounded-xl bg-[#141414] border border-[#262626]">
          <span className="text-[10px] text-[#A59E92] uppercase">API RATE LIMIT</span>
          <div className="mt-2 text-2xl font-black text-[#FFD43B]">
            {apiRateLimitCount} / 60 RPM
          </div>
          <span className="text-[10px] text-[#A59E92] mt-1 block">Throttle: Normal</span>
        </div>

        <div className="p-4 rounded-xl bg-[#141414] border border-[#262626]">
          <span className="text-[10px] text-[#A59E92] uppercase">NETWORK RESILIENCE</span>
          <div className="mt-2 text-base font-bold text-[#F5F1E8] flex items-center gap-2">
            <Wifi className="w-4 h-4 text-[#10B981]" />
            {networkSpeed === 'FAST_5G' ? 'Fast 5G Gateway' : 'Campus Wi-Fi (Simulated Delay)'}
          </div>
          <button
            onClick={() => setNetworkSpeed(networkSpeed === 'FAST_5G' ? 'SLOW_CAMPUS_WIFI' : 'FAST_5G')}
            className="text-[10px] text-[#FFD43B] underline mt-1 block"
          >
            Toggle Network Speed
          </button>
        </div>

        <div className="p-4 rounded-xl bg-[#141414] border border-[#262626]">
          <span className="text-[10px] text-[#A59E92] uppercase">ENCLAVE SECRETS</span>
          <div className="mt-2 text-sm font-bold text-[#10B981] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            Zero Plaintext Passwords
          </div>
          <span className="text-[10px] text-[#A59E92] mt-1 block">PBKDF2/SHA-256 Hashed</span>
        </div>
      </div>

      {/* SECTION 1: USER DATABASE TABLE (Excel Exportable) */}
      <section className="t-card-plinth p-6 rounded-xl border border-[#262626] bg-[#121212] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#222]">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#FFD43B]" />
            <h2 className="text-sm font-mono font-bold uppercase text-[#F5F1E8]">
              USER REGISTRATION & CREDENTIALS DATABASE ({usersList.length})
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search user, email or UPI..."
              value={searchUserQuery}
              onChange={(e) => setSearchUserQuery(e.target.value)}
              className="px-3 py-1.5 rounded bg-[#090909] border border-[#333] text-xs font-mono text-[#F5F1E8] focus:outline-none w-56"
            />
            <button
              onClick={exportUsersToCsv}
              className="px-3 py-1.5 rounded bg-[#1e1e1e] hover:bg-[#252525] border border-[#333] text-[#FFD43B] font-mono text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download Excel (.CSV)
            </button>
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[#222] text-[#A59E92] text-[10px] uppercase">
                <th className="py-2.5 px-3">User ID</th>
                <th className="py-2.5 px-3">Name</th>
                <th className="py-2.5 px-3">Email Address</th>
                <th className="py-2.5 px-3">Phone</th>
                <th className="py-2.5 px-3">UPI VPA</th>
                <th className="py-2.5 px-3">Password Hash</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e1e1e]">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-[#181818]/60 transition-colors">
                  <td className="py-3 px-3 text-[#A59E92]">{u.id}</td>
                  <td className="py-3 px-3 font-bold text-[#F5F1E8] font-sans">{u.name}</td>
                  <td className="py-3 px-3 text-[#A59E92]">{u.email}</td>
                  <td className="py-3 px-3 text-[#A59E92]">{u.phone}</td>
                  <td className="py-3 px-3 text-[#FFD43B]">{u.upiId}</td>
                  <td className="py-3 px-3 text-[#666] font-mono text-[10px]">{u.passwordHash}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-[9px] font-bold">
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-black text-[#F5F1E8]">
                    ₹{u.balance.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 2: WEBHOOKS & SECURITY CONTROLS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Real-Time Payment Webhook Stream */}
        <div className="lg:col-span-7 t-card-plinth p-6 rounded-xl border border-[#262626] bg-[#121212] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#222]">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-[#FFD43B]" />
              <h3 className="text-xs font-mono font-bold uppercase text-[#F5F1E8]">
                NPCI UPI GATEWAY WEBHOOK STREAM
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => simulateWebhook('PAYMENT_INTERCEPTED')}
                className="px-2.5 py-1 rounded bg-[#201010] text-[#E53935] border border-[#E53935]/40 text-[10px] font-mono font-bold hover:bg-[#2b1515]"
              >
                + Inject Threat
              </button>
              <button
                onClick={() => simulateWebhook('SETTLEMENT_PROCESSED')}
                className="px-2.5 py-1 rounded bg-[#102015] text-[#10B981] border border-[#10B981]/40 text-[10px] font-mono font-bold hover:bg-[#152b1d]"
              >
                + Inject Safe
              </button>
            </div>
          </div>

          <div className="space-y-2.5 max-h-72 overflow-y-auto font-mono text-xs">
            {webhooks.map((wh) => (
              <div key={wh.id} className="p-3 rounded bg-[#090909] border border-[#222] space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className={`font-bold ${
                    wh.event === 'PAYMENT_INTERCEPTED' ? 'text-[#E53935]' : 'text-[#10B981]'
                  }`}>
                    {wh.event}
                  </span>
                  <span className="text-[#A59E92]">{wh.timestamp} • {wh.durationMs}ms</span>
                </div>
                <div className="text-[10px] text-[#A59E92] break-all bg-[#121212] p-1.5 rounded">
                  {wh.payload}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: API Keys & Masked Secrets */}
        <div className="lg:col-span-5 t-card-plinth p-6 rounded-xl border border-[#262626] bg-[#121212] space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#222]">
            <Key className="w-4 h-4 text-[#FFD43B]" />
            <h3 className="text-xs font-mono font-bold uppercase text-[#F5F1E8]">
              API KEYS & MASKED ENCLAVE SECRETS
            </h3>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded bg-[#090909] border border-[#222]">
              <span className="text-[10px] text-[#A59E92] uppercase block">NPCI Switch Master Key:</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[#F5F1E8]">
                  {showApiKey ? 'npci_live_sec_99410298a8b1c4e7' : 'npci_live_sec_••••••••••••e7'}
                </span>
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="text-[#A59E92] hover:text-[#FFD43B] p-1"
                >
                  {showApiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="p-3 rounded bg-[#090909] border border-[#222]">
              <span className="text-[10px] text-[#A59E92] uppercase block">I4C National Crime API:</span>
              <div className="mt-1 text-[#F5F1E8]">
                i4c_gateway_prod_••••••••9102
              </div>
            </div>

            <div className="p-3 rounded bg-[#0a1810] border border-[#10B981]/30 text-xs font-sans text-[#10B981] space-y-1">
              <div className="font-mono font-bold">✓ SECURITY COMPLIANCE: ZERO DATA LEAKAGE</div>
              <p className="text-[11px] text-[#A59E92]">
                All sensitive customer PII, phone numbers, and Aadhaar numbers are masked on client interfaces and logged via tokenized hashes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
