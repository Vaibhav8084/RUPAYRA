import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  ShieldAlert, 
  ArrowLeftRight, 
  Mic, 
  FolderLock,
  Shield,
  CreditCard,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TabType } from '../../types';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab, fraudCases, runSecurityDemo, isSecurityDemoRunning, setIsAuthModalOpen, currentUserAccount } = useApp();

  const openCasesCount = fraudCases.filter(c => c.status === 'OPEN').length;

  const navItems: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
    { id: 'command-center', label: 'COMMAND CENTER', icon: LayoutDashboard },
    { id: 'splitpay', label: 'SPLITPAY', icon: Users, badge: '3' },
    { id: 'payguard', label: 'PAYGUARD', icon: ShieldAlert, badge: 'ALERT' },
    { id: 'transactions', label: 'TRANSACTIONS', icon: ArrowLeftRight },
    { id: 'finvoice', label: 'FINVOICE', icon: Mic },
    { id: 'fraud-cases', label: 'FRAUD CASES', icon: FolderLock, badge: openCasesCount ? `${openCasesCount}` : undefined },
    { id: 'admin', label: 'ADMIN PANEL', icon: Shield, badge: 'ADM' },
  ];

  return (
    <>
      {/* Mobile Drawer (Left Slide-in) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
          <div className="relative w-72 max-w-[80vw] bg-[#0d0d0d] border-r border-[#222] p-5 flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#222]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md bg-[#151515] border border-[#FFD43B] flex items-center justify-center text-[#FFD43B] font-bold">
                    ₹
                  </div>
                  <div>
                    <span className="font-black text-base tracking-wider text-[#F5F1E8]">RUPAYRA</span>
                    <p className="text-[9px] font-mono text-[#A59E92]">PAYMENT INTELLIGENCE</p>
                  </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-md text-[#A59E92] hover:text-[#F5F1E8]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Demo button */}
              <button
                onClick={() => {
                  runSecurityDemo();
                  onClose();
                }}
                disabled={isSecurityDemoRunning}
                className="mt-4 w-full py-2 px-3 rounded-md bg-[#FFD43B] text-[#090909] font-mono text-xs font-bold tracking-wider"
              >
                {isSecurityDemoRunning ? 'RUNNING DEMO...' : 'RUN SECURITY DEMO'}
              </button>

              <nav className="mt-5 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-mono tracking-wider ${
                        isActive 
                          ? 'bg-[#1a1a1a] text-[#FFD43B] font-bold' 
                          : 'text-[#A59E92] hover:text-[#F5F1E8]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-[#222] text-[#A59E92]">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="text-[10px] font-mono text-[#A59E92] pt-4 border-t border-[#222] space-y-2">
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  onClose();
                }}
                className="w-full py-2 px-3 rounded-md bg-[#161616] border border-[#2b2b2b] text-[#F5F1E8] font-mono text-xs flex items-center justify-center gap-1.5"
              >
                <CreditCard className="w-3.5 h-3.5 text-[#FFD43B]" />
                <span>{currentUserAccount ? 'MY ACCOUNT & UPI' : 'LOGIN / LINK UPI'}</span>
              </button>
              <div className="text-center">RUPAYRA 2.0 • EVERY PAYMENT TELLS A STORY</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
