import React from 'react';
import { 
  Bell, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight, 
  AlertCircle,
  Menu,
  Shield,
  User,
  CreditCard
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  onToggleMobileNav: () => void;
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileNav, onOpenNotifications }) => {
  const { 
    activeTab, 
    balance, 
    notifications, 
    triggerSafePayment, 
    triggerSuspiciousPayment,
    demoMode,
    isSecurityDemoRunning,
    demoStepText,
    currentUserAccount,
    isAdminAuthenticated,
    setIsAuthModalOpen,
    setActiveTab
  } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;

  const tabLabels: Record<string, { title: string; subtitle: string }> = {
    'command-center': { title: 'COMMAND CENTER', subtitle: 'Real-time payment intelligence overview' },
    'splitpay': { title: 'SPLITPAY', subtitle: 'Group bill splitting, who-pays roulette & minimum settlements' },
    'payguard': { title: 'PAYGUARD', subtitle: 'High-velocity transaction fraud interception & explainability' },
    'transactions': { title: 'TRANSACTIONS', subtitle: 'Live UPI ledger, device signatures & risk breakdown' },
    'finvoice': { title: 'FINVOICE', subtitle: 'Multilingual voice-first financial intelligence assistant' },
    'fraud-cases': { title: 'FRAUD CASES', subtitle: 'Case management dossier & cyber evidence desk' },
    'settings': { title: 'SETTINGS', subtitle: 'Security thresholds, biometrics & language preferences' },
    'admin': { title: 'ADMIN DASHBOARD', subtitle: 'Registered users database, NPCI webhook stream & telemetry' },
  };

  const currentLabel = tabLabels[activeTab] || { title: 'RUPAYRA', subtitle: 'Payment intelligence' };

  return (
    <header className="sticky top-0 z-20 bg-[#090909]/95 backdrop-blur-md border-b border-[#1c1c1c] px-4 md:px-8 py-3.5 transition-all">
      {/* Demo Running Cinematic Banner */}
      {isSecurityDemoRunning && (
        <div className="mb-3 -mt-2 -mx-4 md:-mx-8 px-4 py-2 bg-[#E53935]/15 border-b border-[#E53935]/40 flex items-center justify-between text-xs font-mono text-[#F5F1E8]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-sm bg-[#E53935] animate-ping" />
            <span className="font-bold text-[#E53935]">SECURITY DEMO IN PROGRESS:</span>
            <span className="text-[#F5F1E8]">{demoStepText}</span>
          </div>
          <span className="text-[10px] text-[#A59E92]">STEP INJECTION MODE</span>
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger + Title */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleMobileNav}
            className="md:hidden p-2 rounded-lg bg-[#151515] border border-[#262626] text-[#A59E92]"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-base md:text-lg font-black tracking-wider uppercase text-[#F5F1E8] flex items-center gap-2">
              {currentLabel.title}
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-[#181818] border border-[#2a2a2a] text-[#10B981]">
                <ShieldCheck className="w-3 h-3 text-[#10B981]" />
                ENCLAVE ACTIVE
              </span>
            </h1>
            <p className="text-[11px] text-[#A59E92] font-mono hidden sm:block">
              {currentLabel.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Quick actions, Balance, Auth, Admin & Notifications */}
        <div className="flex items-center gap-2.5">
          {/* Demo Mode Triggers */}
          {demoMode && (
            <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-lg bg-[#141414] border border-[#242424]">
              <span className="text-[9px] font-mono uppercase px-2 text-[#A59E92] font-semibold">
                QUICK INJECT:
              </span>
              <button
                onClick={triggerSafePayment}
                className="px-2 py-1 text-[10px] font-mono font-semibold rounded-md bg-[#10B981]/15 hover:bg-[#10B981]/25 text-[#10B981] border border-[#10B981]/30 flex items-center gap-1 transition-colors"
                title="Simulate safe payment of ₹650"
              >
                <ArrowUpRight className="w-2.5 h-2.5" />
                SAFE (₹650)
              </button>
              <button
                onClick={triggerSuspiciousPayment}
                className="px-2 py-1 text-[10px] font-mono font-semibold rounded-md bg-[#201010] hover:bg-[#2e1515] text-[#E53935] border border-[#E53935]/30 flex items-center gap-1 transition-colors"
                title="Simulate suspicious payment of ₹48,000"
              >
                <AlertCircle className="w-2.5 h-2.5" />
                SUSPICIOUS (₹48K)
              </button>
            </div>
          )}

          {/* Balance Plinth (Zero Pills) */}
          <div className="px-3 py-1.5 rounded-lg bg-[#141414] border border-[#242424] flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#A59E92] uppercase hidden sm:inline">BALANCE:</span>
            <span className="text-xs font-mono font-bold text-[#FFD43B]">
              ₹{balance.toLocaleString('en-IN')}
            </span>
          </div>

          {/* User Account / Linked UPI Button */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="px-2.5 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1c1c1c] border border-[#262626] hover:border-[#FFD43B]/50 text-xs font-mono text-[#F5F1E8] flex items-center gap-1.5 transition-colors"
            title="User Account & Linked UPI Methods"
          >
            <CreditCard className="w-3.5 h-3.5 text-[#FFD43B]" />
            <span className="hidden sm:inline">
              {currentUserAccount ? currentUserAccount.name.split(' ')[0] : 'LOGIN / UPI'}
            </span>
          </button>

          {/* Admin Portal Fast Access Button */}
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'admin'
                ? 'bg-[#FFD43B] text-[#090909] border-[#FFD43B]'
                : isAdminAuthenticated
                ? 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/40 hover:bg-[#10B981]/25'
                : 'bg-[#1a1208] text-[#FFD43B] border-[#FFD43B]/40 hover:bg-[#261b0c]'
            }`}
            title="Admin Portal (admin123 / admin@123)"
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ADMIN</span>
          </button>

          {/* Notifications Bell */}
          <button
            onClick={onOpenNotifications}
            className="p-2 rounded-lg bg-[#141414] border border-[#242424] hover:border-[#383838] text-[#A59E92] hover:text-[#F5F1E8] relative transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-md bg-[#E53935] text-white text-[9px] font-mono font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
