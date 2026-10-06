import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeftRight, 
  Search, 
  Filter, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  PauseCircle, 
  X, 
  Smartphone, 
  MapPin, 
  CreditCard, 
  ShieldAlert,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Transaction, TransactionStatus } from '../../types';
import { RiskMeter } from '../common/RiskMeter';

export const TransactionsView: React.FC = () => {
  const { 
    transactions, 
    selectedTransaction, 
    setSelectedTransaction,
    setActiveTab
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTransactions = transactions.filter(tx => {
    const matchesFilter = 
      filterStatus === 'ALL' ? true :
      filterStatus === 'SAFE' ? (tx.status === 'safe' || tx.status === 'completed') :
      filterStatus === 'FLAGGED' ? tx.status === 'flagged' :
      filterStatus === 'HELD' ? tx.status === 'held' :
      filterStatus === 'COMPLETED' ? tx.status === 'completed' : true;

    const matchesSearch = 
      tx.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.recipientUpi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.amount.toString().includes(searchQuery);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#222222]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#FFD43B]/10 border border-[#FFD43B]/30 text-[#FFD43B] font-mono text-xs font-bold">
              TRANSACTION AUDIT LEDGER
            </span>
            <span className="text-[11px] font-mono text-[#A59E92]">IMMUTABLE LOG</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black font-mono tracking-tight text-[#F5F1E8] uppercase mt-1">
            TRANSACTIONS
          </h1>
          <p className="text-xs text-[#A59E92] font-mono">
            Real-time UPI transaction stream with hardware telemetry and biometric threat scores.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#A59E92]" />
            <input
              type="text"
              placeholder="Search recipient, VPA, ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg bg-[#141414] border border-[#262626] text-xs font-mono text-[#F5F1E8] focus:border-[#FFD43B] focus:outline-none w-56"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#141414] border border-[#262626]">
            {['ALL', 'SAFE', 'FLAGGED', 'HELD', 'COMPLETED'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold tracking-wider transition-all ${
                  filterStatus === status
                    ? 'bg-[#FFD43B] text-[#090909]'
                    : 'text-[#A59E92] hover:text-[#F5F1E8]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction Timeline Cards */}
      <div className="space-y-3">
        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center rounded-xl bg-[#141414] border border-[#222] font-mono text-xs text-[#A59E92]">
            NO TRANSACTIONS MATCHED THE FILTER
          </div>
        ) : (
          filteredTransactions.map((tx) => {
            const isHigh = tx.riskScore > 70;
            const isHeld = tx.status === 'held';
            const isSafe = tx.riskScore < 30;

            return (
              <motion.div
                key={tx.id}
                whileHover={{ x: 2 }}
                onClick={() => setSelectedTransaction(tx)}
                className={`p-4 md:p-5 rounded-xl border transition-all cursor-pointer ${
                  isHigh
                    ? 'bg-[#1a0c0c] border-[#E53935]/50 hover:border-[#E53935]'
                    : isHeld
                    ? 'bg-[#1c140d] border-[#D9822B]/50 hover:border-[#D9822B]'
                    : 'bg-[#141414] border-[#242424] hover:border-[#383838]'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Icon & Info */}
                  <div className="flex items-center gap-3.5">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-mono font-bold text-base ${
                      isHigh
                        ? 'bg-[#2b1111] text-[#E53935] border border-[#E53935]/40'
                        : isHeld
                        ? 'bg-[#28180e] text-[#D9822B] border border-[#D9822B]/40'
                        : 'bg-[#1a1a1a] text-[#FFD43B] border border-[#2a2a2a]'
                    }`}>
                      {isHigh ? '!' : '₹'}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#F5F1E8]">
                          {tx.recipient}
                        </span>
                        <span className="text-[10px] font-mono text-[#A59E92]">
                          {tx.time} • {tx.date}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#A59E92] mt-0.5">
                        <span className="text-[#FFD43B]">{tx.recipientUpi}</span>
                        <span>•</span>
                        <span>{tx.category}</span>
                        <span>•</span>
                        <span>{tx.device}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Amount & Status Badge */}
                  <div className="flex items-center justify-between md:justify-end gap-5">
                    <div className="text-left md:text-right">
                      <div className="text-lg md:text-xl font-black font-mono text-[#F5F1E8]">
                        ₹{tx.amount.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] font-mono text-[#A59E92]">
                        {tx.paymentMethod}
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold tracking-wider uppercase ${
                        isHigh
                          ? 'bg-[#E53935] text-white'
                          : isHeld
                          ? 'bg-[#D9822B] text-black'
                          : isSafe
                          ? 'bg-[#FFD43B]/10 text-[#FFD43B] border border-[#FFD43B]/30'
                          : 'bg-[#222] text-[#A59E92]'
                      }`}>
                        {isHeld ? 'HELD' : tx.riskLevel === 'HIGH' ? 'FLAGGED' : 'SAFE'}
                      </span>
                      <span className="text-[9px] font-mono text-[#A59E92] mt-1">
                        RISK: {tx.riskScore}/100
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Transaction Detail Drawer */}
      <AnimatePresence>
        {selectedTransaction && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTransaction(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="relative w-full max-w-lg bg-[#111111] border-l border-[#242424] h-full flex flex-col justify-between shadow-2xl z-10 overflow-y-auto"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#222] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#A59E92] uppercase">
                    TRANSACTION TELEMETRY DOSSIER
                  </span>
                  <h3 className="text-lg font-mono font-bold text-[#F5F1E8]">
                    {selectedTransaction.id}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="p-1.5 rounded text-[#A59E92] hover:text-[#F5F1E8]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6 flex-1">
                {/* Amount & Status Hero */}
                <div className="p-5 rounded-xl bg-[#090909] border border-[#222] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-[#A59E92] uppercase">AMOUNT</span>
                    <div className="text-3xl font-black font-mono text-[#F5F1E8]">
                      ₹{selectedTransaction.amount.toLocaleString('en-IN')}
                    </div>
                    <span className="text-xs font-mono text-[#A59E92] mt-1 block">
                      {selectedTransaction.time} • {selectedTransaction.date}
                    </span>
                  </div>

                  <RiskMeter score={selectedTransaction.riskScore} size={110} strokeWidth={9} />
                </div>

                {/* Details Grid */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-[#161616] border border-[#262626] flex justify-between">
                    <span className="text-[#A59E92]">RECIPIENT:</span>
                    <span className="text-[#F5F1E8] font-bold">{selectedTransaction.recipient}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#161616] border border-[#262626] flex justify-between">
                    <span className="text-[#A59E92]">RECIPIENT VPA:</span>
                    <span className="text-[#FFD43B] font-bold">{selectedTransaction.recipientUpi}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#161616] border border-[#262626] flex justify-between">
                    <span className="text-[#A59E92]">HARDWARE DEVICE:</span>
                    <span className="text-[#F5F1E8]">{selectedTransaction.device}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#161616] border border-[#262626] flex justify-between">
                    <span className="text-[#A59E92]">IP GEOLOCATION:</span>
                    <span className="text-[#F5F1E8]">{selectedTransaction.ipLocation}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#161616] border border-[#262626] flex justify-between">
                    <span className="text-[#A59E92]">PAYMENT METHOD:</span>
                    <span className="text-[#F5F1E8]">{selectedTransaction.paymentMethod}</span>
                  </div>
                </div>

                {/* Risk Factors Breakdown */}
                {selectedTransaction.riskFactors && selectedTransaction.riskFactors.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold uppercase text-[#F5F1E8]">
                      DETECTED RISK SIGNALS ({selectedTransaction.riskFactors.length})
                    </span>

                    <div className="space-y-2">
                      {selectedTransaction.riskFactors.map(rf => (
                        <div key={rf.id} className="p-3 rounded-lg bg-[#181212] border border-[#E53935]/30">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-[#E53935] font-bold">{rf.name}</span>
                            <span className="text-xs text-[#E53935] font-bold">{rf.percentage}%</span>
                          </div>
                          <p className="text-[11px] text-[#A59E92] mt-1 font-sans">
                            {rf.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-6 border-t border-[#222] bg-[#0c0c0c] flex gap-3">
                {selectedTransaction.riskScore > 70 && (
                  <button
                    onClick={() => {
                      setSelectedTransaction(null);
                      setActiveTab('payguard');
                    }}
                    className="flex-1 py-2.5 px-4 rounded-lg bg-[#E53935] hover:bg-[#d32f2f] text-white font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-colors"
                  >
                    INVESTIGATE IN PAYGUARD <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="py-2.5 px-4 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] text-[#A59E92] hover:text-[#F5F1E8] font-mono text-xs font-bold"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
