import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { NotificationDrawer } from './components/layout/NotificationDrawer';
import { CommandCenter } from './components/dashboard/CommandCenter';
import { SplitPayView } from './components/splitpay/SplitPayView';
import { PayGuardView } from './components/payguard/PayGuardView';
import { TransactionsView } from './components/transactions/TransactionsView';
import { FinVoiceView } from './components/finvoice/FinVoiceView';
import { FraudCasesView } from './components/fraud/FraudCasesView';
import { SettingsView } from './components/settings/SettingsView';
import { AdminDashboardView } from './components/admin/AdminDashboardView';
import { SecurityDemoController } from './components/demo/SecurityDemoController';
import { EntranceSplash } from './components/common/EntranceSplash';
import { AuthModal } from './components/auth/AuthModal';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'command-center':
        return <CommandCenter />;
      case 'splitpay':
        return <SplitPayView />;
      case 'payguard':
        return <PayGuardView />;
      case 'transactions':
        return <TransactionsView />;
      case 'finvoice':
        return <FinVoiceView />;
      case 'fraud-cases':
        return <FraudCasesView />;
      case 'settings':
        return <SettingsView />;
      case 'admin':
        return <AdminDashboardView />;
      default:
        return <CommandCenter />;
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-[#F5F1E8] flex">
      {/* Entrance Splash Screen with Japanese Mon & Gold Pulse */}
      <EntranceSplash />

      {/* User Login & Payment Methods Modal */}
      <AuthModal />

      {/* Desktop Sidebar */}
      <Sidebar onOpenNotifications={() => setIsNotificationDrawerOpen(true)} />

      {/* Main App Container */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Sticky Header */}
        <Header 
          onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
          onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 px-4 md:px-8 py-6 md:py-8 max-w-7xl mx-auto w-full">
          {renderActiveView()}
        </main>

        {/* Mobile Navigation Drawer & Bottom Bar */}
        <MobileNav 
          isOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
        />

        {/* Notifications Flyout Drawer */}
        <NotificationDrawer 
          isOpen={isNotificationDrawerOpen}
          onClose={() => setIsNotificationDrawerOpen(false)}
        />

        {/* Cinematic Demo Overlay */}
        <SecurityDemoController />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
