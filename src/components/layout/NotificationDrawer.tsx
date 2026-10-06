import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCheck, AlertTriangle, Users, FolderLock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsRead, 
    setActiveTab, 
    setSelectedTransaction,
    transactions,
    setSelectedCase,
    fraudCases
  } = useApp();

  const handleNotificationClick = (notif: typeof notifications[0]) => {
    markNotificationAsRead(notif.id);
    if (notif.targetTab) {
      setActiveTab(notif.targetTab);
    }
    if (notif.targetTab === 'transactions' && notif.targetId) {
      const tx = transactions.find(t => t.id === notif.targetId);
      if (tx) setSelectedTransaction(tx);
    } else if (notif.targetTab === 'fraud-cases' && notif.targetId) {
      const fc = fraudCases.find(c => c.id === notif.targetId || c.caseNumber === notif.targetId);
      if (fc) setSelectedCase(fc);
    }
    onClose();
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'ALERT':
        return <AlertTriangle className="w-4 h-4 text-[#E53935]" />;
      case 'EXPENSE':
        return <Users className="w-4 h-4 text-[#FFD43B]" />;
      case 'CASE':
        return <FolderLock className="w-4 h-4 text-[#D9822B]" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-[#FFD43B]" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative w-full max-w-md bg-[#111111] border-l border-[#242424] h-full flex flex-col justify-between shadow-2xl z-10"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#222222] flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold font-mono tracking-wider text-[#F5F1E8] uppercase flex items-center gap-2">
                  <span>SECURITY & SYSTEM ALERTS</span>
                </h2>
                <p className="text-[11px] text-[#A59E92] font-mono">
                  {notifications.filter(n => !n.read).length} UNREAD NOTIFICATIONS
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={markAllNotificationsRead}
                  className="p-1.5 rounded hover:bg-[#1f1f1f] text-[#A59E92] hover:text-[#FFD43B] transition-colors"
                  title="Mark all as read"
                >
                  <CheckCheck className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded hover:bg-[#1f1f1f] text-[#A59E92] hover:text-[#F5F1E8] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
              {notifications.length === 0 ? (
                <div className="text-center py-12 text-[#A59E92] font-mono text-xs">
                  NO ALERTS IN SYSTEM
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => handleNotificationClick(notif)}
                    className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                      notif.read
                        ? 'bg-[#151515]/60 border-[#222222] opacity-70 hover:opacity-100 hover:border-[#333]'
                        : notif.type === 'ALERT'
                        ? 'bg-[#201010]/90 border-[#E53935]/40 hover:border-[#E53935]'
                        : 'bg-[#181818] border-[#2b2b2b] hover:border-[#FFD43B]/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-1.5 rounded bg-[#090909] border border-[#262626]">
                        {getIcon(notif.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className={`text-xs font-semibold truncate ${notif.type === 'ALERT' && !notif.read ? 'text-[#E53935]' : 'text-[#F5F1E8]'}`}>
                            {notif.title}
                          </h3>
                          <span className="text-[10px] font-mono text-[#A59E92] shrink-0">
                            {notif.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#A59E92] mt-1 line-clamp-2">
                          {notif.description}
                        </p>

                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-[9px] font-mono uppercase tracking-wider text-[#FFD43B] flex items-center gap-1">
                            Inspect details <ArrowRight className="w-2.5 h-2.5" />
                          </span>
                          {!notif.read && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD43B]" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#222222] bg-[#0d0d0d]">
              <div className="text-[10px] font-mono text-[#A59E92] text-center">
                RUPAYRA THREAT INTELLIGENCE ENGINE • REAL-TIME FEED
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
