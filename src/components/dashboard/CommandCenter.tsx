import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Users, 
  ArrowUpRight, 
  ExternalLink, 
  Sparkles,
  Zap,
  ArrowRight,
  TrendingUp,
  Activity,
  CreditCard
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FinancialParticleGlobe } from '../common/FinancialParticleGlobe';
import { RiskMeter } from '../common/RiskMeter';
import { ImpeccableProofStage } from '../common/ImpeccableProofStage';

export const CommandCenter: React.FC = () => {
  const { 
    balance, 
    paymentSafetyScore, 
    transactions, 
    setSelectedTransaction, 
    setActiveTab,
    particleMode,
    runSecurityDemo,
    isSecurityDemoRunning
  } = useApp();

  const handleTransactionClick = (tx: typeof transactions[0]) => {
    setSelectedTransaction(tx);
    if (tx.riskScore > 70) {
      setActiveTab('payguard');
    } else {
      setActiveTab('transactions');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl border border-[#222222] bg-[#0f0f0f] p-6 md:p-8">
        {/* Sumi-e Japanese ink brush aesthetic backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_70%_20%,rgba(255,212,59,0.06)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181818] border border-[#2c2c2c] text-xs font-mono text-[#FFD43B]">
              <span className="w-2 h-2 rounded-full bg-[#FFD43B] animate-pulse" />
              <span>UNIFIED PAYMENT INTELLIGENCE V2.0</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#F5F1E8] uppercase leading-[1.08]">
              Your money.<br />
              <span className="text-[#FFD43B] drop-shadow-[0_0_25px_rgba(255,212,59,0.2)]">
                Under control.
              </span>
            </h1>

            <p className="text-sm md:text-base text-[#A59E92] font-normal max-w-xl">
              Real-time payment intelligence for everyday transactions. Instant group settlement, explainable fraud interception, and deep transaction network forensics.
            </p>

            {/* Quick Actions Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('payguard')}
                className="px-4 py-2.5 rounded-lg bg-[#FFD43B] hover:bg-[#f5c623] text-[#090909] font-mono text-xs font-bold tracking-wider flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(255,212,59,0.25)]"
              >
                <Zap className="w-4 h-4 fill-current" />
                OPEN PAYGUARD
              </button>

              <button
                onClick={() => setActiveTab('splitpay')}
                className="px-4 py-2.5 rounded-lg bg-[#181818] hover:bg-[#202020] border border-[#2e2e2e] text-[#F5F1E8] font-mono text-xs font-semibold tracking-wider flex items-center gap-2 transition-colors"
              >
                <Users className="w-4 h-4 text-[#FFD43B]" />
                SPLITPAY (3 PENDING)
              </button>

              <button
                onClick={runSecurityDemo}
                disabled={isSecurityDemoRunning}
                className="px-4 py-2.5 rounded-lg bg-[#201010] hover:bg-[#2e1515] border border-[#E53935]/40 text-[#E53935] font-mono text-xs font-bold tracking-wider flex items-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                {isSecurityDemoRunning ? 'RUNNING DEMO...' : 'SECURITY DEMO'}
              </button>
            </div>
          </div>

          {/* Hero Particle Network Component */}
          <div className="lg:col-span-5">
            <FinancialParticleGlobe 
              mode={particleMode} 
              height="300px" 
              className="shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* 4 Primary Metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. AVAILABLE BALANCE */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="rupayra-card p-5 rounded-xl border border-[#222222] relative overflow-hidden group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#A59E92]">
              AVAILABLE BALANCE
            </span>
            <div className="p-2 rounded-lg bg-[#181818] text-[#FFD43B]">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-2xl md:text-3xl font-black font-mono tracking-tight text-[#F5F1E8]">
              ₹{balance.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono text-[#A59E92]">
            <span className="text-[#FFD43B] font-bold">● Axis Core UPI</span>
            <span>• Kattankulathur</span>
          </div>
        </motion.div>

        {/* 2. PAYMENT SAFETY */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="rupayra-card p-5 rounded-xl border border-[#222222] relative overflow-hidden group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#A59E92]">
              PAYMENT SAFETY
            </span>
            <div className="p-2 rounded-lg bg-[#181818] text-[#FFD43B]">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-2xl md:text-3xl font-black font-mono tracking-tight text-[#FFD43B]">
              {paymentSafetyScore}
            </span>
            <span className="text-sm font-mono text-[#A59E92]">/ 100</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono text-[#A59E92]">
            <span className="text-[#FFD43B] font-bold">EXCELLENT</span>
            <span>• NPCI Guard Active</span>
          </div>
        </motion.div>

        {/* 3. GROUP PAYMENTS */}
        <motion.div 
          whileHover={{ y: -2 }}
          onClick={() => setActiveTab('splitpay')}
          className="rupayra-card p-5 rounded-xl border border-[#222222] relative overflow-hidden cursor-pointer hover:border-[#FFD43B]/60 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#A59E92]">
              GROUP PAYMENTS
            </span>
            <div className="p-2 rounded-lg bg-[#181818] text-[#FFD43B]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-2xl md:text-3xl font-black font-mono tracking-tight text-[#F5F1E8]">
              3
            </span>
            <span className="text-sm font-mono text-[#FFD43B] font-bold">PENDING</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-[#A59E92]">
            <span>SRM HOSTEL DINNER</span>
            <span className="text-[#FFD43B] font-bold flex items-center gap-0.5">
              Settle ₹800 <ArrowRight className="w-2.5 h-2.5" />
            </span>
          </div>
        </motion.div>

        {/* 4. RISK ALERTS */}
        <motion.div 
          whileHover={{ y: -2 }}
          onClick={() => setActiveTab('payguard')}
          className="rupayra-card p-5 rounded-xl border border-[#E53935]/40 bg-[#160d0d] relative overflow-hidden cursor-pointer hover:border-[#E53935] transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#E53935] font-bold">
              RISK ALERTS
            </span>
            <div className="p-2 rounded-lg bg-[#2b1111] text-[#E53935]">
              <AlertTriangle className="w-4 h-4 animate-bounce" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-2xl md:text-3xl font-black font-mono tracking-tight text-[#E53935]">
              1
            </span>
            <span className="text-xs font-mono text-[#E53935] font-bold">REQUIRES ATTENTION</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-[#A59E92]">
            <span className="text-[#E53935] font-mono truncate">₹48,000 to rahul@upi</span>
            <span className="text-[#E53935] font-bold">VERIFY &rarr;</span>
          </div>
        </motion.div>
      </section>

      {/* Main Two-Column Layout: Live Payment Feed & Threat Visualizer */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live Payment Feed */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-[#1f1f1f]">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#FFD43B]" />
              <h2 className="text-sm font-bold font-mono tracking-wider text-[#F5F1E8] uppercase">
                LIVE PAYMENT FEED
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('transactions')}
              className="text-[11px] font-mono text-[#A59E92] hover:text-[#FFD43B] flex items-center gap-1 transition-colors"
            >
              VIEW ALL <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {transactions.slice(0, 5).map((tx) => {
              const isHigh = tx.riskScore > 70;
              const isSafe = tx.riskScore < 30;

              return (
                <motion.div
                  key={tx.id}
                  whileHover={{ x: 3 }}
                  onClick={() => handleTransactionClick(tx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isHigh
                      ? 'bg-[#1c0f0f] border-[#E53935]/50 hover:border-[#E53935] shadow-[0_0_15px_-4px_rgba(229,57,53,0.3)]'
                      : 'bg-[#141414] border-[#222222] hover:border-[#383838]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm ${
                        isHigh 
                          ? 'bg-[#2a1111] text-[#E53935] border border-[#E53935]/40' 
                          : 'bg-[#1c1c1c] text-[#FFD43B] border border-[#2a2a2a]'
                      }`}>
                        {isHigh ? '!' : '₹'}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-[#F5F1E8]">
                            {tx.recipient}
                          </span>
                          <span className="text-[10px] font-mono text-[#A59E92]">
                            {tx.time}
                          </span>
                        </div>
                        <p className="text-[11px] font-mono text-[#A59E92]">
                          {tx.recipientUpi} • {tx.paymentMethod}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-mono font-black text-base text-[#F5F1E8]">
                        ₹{tx.amount.toLocaleString('en-IN')}
                      </div>
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase ${
                        isHigh 
                          ? 'bg-[#E53935] text-white' 
                          : isSafe 
                          ? 'bg-[#FFD43B]/10 text-[#FFD43B] border border-[#FFD43B]/30'
                          : 'bg-[#D9822B]/10 text-[#D9822B] border border-[#D9822B]/30'
                      }`}>
                        {tx.riskLevel === 'HIGH' ? 'HIGH RISK' : tx.status === 'held' ? 'HELD' : 'SAFE'}
                      </span>
                    </div>
                  </div>

                  {isHigh && tx.flaggedReasons && (
                    <div className="mt-3 pt-3 border-t border-[#E53935]/20 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#E53935] flex items-center gap-1.5 font-bold">
                        <AlertTriangle className="w-3 h-3" />
                        {tx.flaggedReasons[0]}
                      </span>
                      <span className="text-[10px] font-mono text-[#FFD43B] underline font-bold">
                        Inspect in PayGuard &rarr;
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Threat Interception Radar / Mini PayGuard */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-[#1f1f1f]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E53935]" />
              <h2 className="text-sm font-bold font-mono tracking-wider text-[#F5F1E8] uppercase">
                ACTIVE THREAT INTERCEPTION
              </h2>
            </div>
            <span className="text-[10px] font-mono text-[#E53935] animate-pulse font-bold">
              LIVE ESCROW LOCK
            </span>
          </div>

          <div className="p-6 rounded-xl border border-[#E53935]/40 bg-[#140b0b] relative overflow-hidden">
            {/* Japanese ink wash accent */}
            <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-[radial-gradient(circle,rgba(229,57,53,0.18)_0%,transparent_70%)] pointer-events-none" />

            <div className="flex flex-col items-center text-center">
              <RiskMeter score={91} size={150} />

              <div className="mt-3">
                <span className="text-xs font-mono text-[#A59E92] uppercase">
                  INTERCEPTED TRANSACTION
                </span>
                <div className="text-2xl font-black font-mono text-[#F5F1E8]">
                  ₹48,000
                </div>
                <p className="text-xs font-mono text-[#E53935] font-semibold mt-1">
                  VAIBHAV &rarr; rahul@upi (NEW RECIPIENT)
                </p>
              </div>

              <div className="mt-4 p-3 rounded-lg bg-[#0d0707] border border-[#E53935]/30 w-full text-left space-y-1.5">
                <div className="text-[10px] font-mono text-[#A59E92] uppercase font-bold">
                  PRIMARY RISK SIGNALS:
                </div>
                <div className="text-[11px] font-mono text-[#F5F1E8] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E53935]" />
                  Recipient linked to 3 mule bank accounts
                </div>
                <div className="text-[11px] font-mono text-[#F5F1E8] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E53935]" />
                  Initiated via unknown OnePlus 12 in Pune
                </div>
              </div>

              <div className="mt-5 w-full grid grid-cols-2 gap-3">
                <button
                  onClick={() => setActiveTab('payguard')}
                  className="py-2.5 px-3 rounded-lg bg-[#E53935] hover:bg-[#d32f2f] text-white font-mono text-xs font-bold tracking-wider transition-colors shadow-[0_0_15px_rgba(229,57,53,0.3)]"
                >
                  INVESTIGATE
                </button>
                <button
                  onClick={() => setActiveTab('finvoice')}
                  className="py-2.5 px-3 rounded-lg bg-[#181818] hover:bg-[#222222] border border-[#2b2b2b] text-[#F5F1E8] font-mono text-xs font-semibold tracking-wider transition-colors"
                >
                  VOICE EXPLAIN
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impeccable Style Anti-Slop Proof Showcase */}
      <section className="pt-2">
        <ImpeccableProofStage />
      </section>
    </div>
  );
};
