import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  ShieldAlert, 
  ArrowLeftRight, 
  Mic, 
  FolderLock, 
  Bell, 
  Settings as SettingsIcon, 
  Play, 
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Shield,
  CreditCard
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TabType } from '../../types';

interface SidebarProps {
  onOpenNotifications: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenNotifications }) => {
  const { 
    activeTab, 
    setActiveTab, 
    notifications, 
    user, 
    demoMode, 
    setDemoMode, 
    runSecurityDemo, 
    isSecurityDemoRunning,
    fraudCases,
    isAdminAuthenticated,
    setIsAuthModalOpen
  } = useApp();

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;
  const openCasesCount = fraudCases.filter(c => c.status === 'OPEN' || c.status === 'INVESTIGATING').length;

  const navItems: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string | number; badgeColor?: string }[] = [
    { id: 'command-center', label: 'COMMAND CENTER', icon: LayoutDashboard },
    { id: 'splitpay', label: 'SPLITPAY', icon: Users, badge: '3 ACTIVE' },
    { id: 'payguard', label: 'PAYGUARD', icon: ShieldAlert, badge: 'ALERT', badgeColor: 'bg-[#E53935] text-white' },
    { id: 'transactions', label: 'TRANSACTIONS', icon: ArrowLeftRight },
    { id: 'finvoice', label: 'FINVOICE', icon: Mic, badge: 'VOICE' },
    { id: 'fraud-cases', label: 'FRAUD CASES', icon: FolderLock, badge: openCasesCount > 0 ? `${openCasesCount} OPEN` : undefined, badgeColor: 'bg-[#E53935] text-white' },
    { id: 'admin', label: 'ADMIN PANEL', icon: Shield, badge: isAdminAuthenticated ? 'ONLINE' : 'PORTAL', badgeColor: isAdminAuthenticated ? 'bg-[#10B981] text-black' : 'bg-[#FFD43B] text-black' },
  ];

  return (
    <aside className="w-64 bg-[#0d0d0d] border-r border-[#222222] flex flex-col justify-between h-screen fixed left-0 top-0 z-30 select-none hidden md:flex">
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-[#1c1c1c]">
          <div className="flex items-center gap-3">
            {/* Japanese Mon / Sumi Logo Icon */}
            <div className="w-10 h-10 rounded-lg bg-[#151515] border border-[#FFD43B]/40 flex items-center justify-center relative overflow-hidden shadow-[0_0_15px_-3px_rgba(255,212,59,0.2)]">
              <span className="text-[#FFD43B] font-extrabold text-xl tracking-tighter">₹</span>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#FFD43B] rotate-45 transform" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-wider text-[#F5F1E8]">RUPAYRA</span>
                <span className="text-[9px] px-1 py-0.2 bg-[#FFD43B]/10 text-[#FFD43B] border border-[#FFD43B]/30 rounded-md font-mono font-bold">2.0</span>
              </div>
              <p className="text-[10px] text-[#A59E92] font-mono tracking-tight uppercase">
                Every payment tells a story.
              </p>
            </div>
          </div>

          {/* Hackathon Judge / Demo Mode Toggle */}
          <div className="mt-5 p-2.5 rounded-lg bg-[#151515] border border-[#262626]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FFD43B]" />
                <span className="text-[11px] font-mono font-bold uppercase text-[#F5F1E8]">
                  DEMO MODE
                </span>
              </div>
              <button
                onClick={() => setDemoMode(!demoMode)}
                className={`w-9 h-5 rounded-md p-0.5 transition-colors ${
                  demoMode ? 'bg-[#FFD43B]' : 'bg-[#2a2a2a]'
                }`}
              >
                <div 
                  className={`w-4 h-4 rounded-sm bg-[#090909] transform transition-transform ${
                    demoMode ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <button
              onClick={runSecurityDemo}
              disabled={isSecurityDemoRunning}
              className={`w-full py-2 px-2.5 rounded-lg text-[11px] font-mono font-bold tracking-wider flex items-center justify-center gap-1.5 transition-all sheen-active ${
                isSecurityDemoRunning 
                  ? 'ks-button-danger animate-pulse'
                  : 'ks-button-primary shadow-[0_0_15px_rgba(255,212,59,0.3)]'
              }`}
            >
              <Play className="w-3 h-3 fill-current" />
              {isSecurityDemoRunning ? 'RUNNING DEMO...' : 'RUN SECURITY DEMO'}
            </button>
          </div>
        </div>

        {/* Primary Navigation List */}
        <nav className="p-3 space-y-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono tracking-wider transition-all relative group ${
                  isActive
                    ? 'text-[#FFD43B] font-bold bg-[#181818]'
                    : 'text-[#A59E92] hover:text-[#F5F1E8] hover:bg-[#141414]'
                }`}
              >
                {/* Active Indicator on Left */}
                {isActive && (
                  <motion.div
                    layoutId="activeSidebarIndicator"
                    className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#FFD43B] rounded-r shadow-[0_0_8px_#FFD43B]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#FFD43B]' : 'text-[#A59E92] group-hover:text-[#F5F1E8]'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold font-mono tracking-normal ${
                    item.badgeColor || 'bg-[#222222] text-[#A59E92]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile and Secondary Links */}
      <div className="p-4 border-t border-[#1c1c1c] space-y-3">
        <div className="flex items-center justify-between">
          <button
            onClick={onOpenNotifications}
            className="flex items-center gap-2 p-2 rounded-lg text-xs font-mono text-[#A59E92] hover:text-[#F5F1E8] hover:bg-[#151515] transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span>Alerts</span>
            {unreadNotificationsCount > 0 && (
              <span className="w-4 h-4 rounded-md bg-[#E53935] text-white text-[9px] flex items-center justify-center font-bold font-mono">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-1.5 p-2 rounded-lg text-xs font-mono transition-colors ${
              activeTab === 'settings' 
                ? 'text-[#FFD43B] bg-[#181818]' 
                : 'text-[#A59E92] hover:text-[#F5F1E8] hover:bg-[#151515]'
            }`}
            title="Settings"
          >
            <SettingsIcon className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>

        {/* User Badge - Clicking opens Auth / Linked Methods Modal */}
        <div 
          onClick={() => setIsAuthModalOpen(true)}
          className="flex items-center gap-3 p-2 rounded-lg bg-[#141414] border border-[#222222] hover:border-[#FFD43B]/60 transition-colors cursor-pointer group"
          title="Click to view profile, link UPI VPAs or log in"
        >
          <div className="w-8 h-8 rounded-md bg-[#1e1e1e] border border-[#FFD43B]/40 flex items-center justify-center font-bold text-xs text-[#FFD43B] group-hover:bg-[#FFD43B] group-hover:text-[#090909] transition-colors">
            VS
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium text-[#F5F1E8] truncate">{user.name}</span>
              <CheckCircle2 className="w-3 h-3 text-[#10B981] shrink-0" />
            </div>
            <p className="text-[10px] font-mono text-[#A59E92] truncate flex items-center gap-1">
              <CreditCard className="w-2.5 h-2.5 text-[#FFD43B]" />
              {user.upiId}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
