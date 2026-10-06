import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  PauseCircle, 
  FileText, 
  ArrowRight, 
  Lock, 
  Layers, 
  X,
  HelpCircle,
  Sparkles,
  PhoneCall,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RiskMeter } from '../common/RiskMeter';
import { TransactionNetworkGraph } from './TransactionNetworkGraph';

export const PayGuardView: React.FC = () => {
  const { 
    currentSimulation, 
    holdPayment, 
    verifyPayment, 
    reportPayment, 
    setActiveTab, 
    setSelectedCase,
    fraudCases,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'decision' | 'graph'>('decision');
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isCybercrimeModalOpen, setIsCybercrimeModalOpen] = useState(false);
  const [createdCaseNumber, setCreatedCaseNumber] = useState<string | null>(null);
  const [revealedReasonsCount, setRevealedReasonsCount] = useState<number>(0);
  const [isCopied, setIsCopied] = useState(false);

  const isHeld = currentSimulation.status === 'held';
  const isCompleted = currentSimulation.status === 'completed';

  // Layperson friendly detection reasons
  const friendlyReasons = [
    'NEW BENEFICIARY — You have never sent money to rahul@upi before',
    'UNUSUAL AMOUNT — ₹48,000 is 15 times larger than your normal payments',
    'NEW DEVICE — Initiated from an unverified OnePlus 12 phone in Pune',
    'LATE NIGHT TIME — Attempted at 10:42 PM, outside your active hours',
    'SUSPECTED FAKE ACCOUNTS — Recipient is linked to 3 fake bank accounts flagged by Police'
  ];

  useEffect(() => {
    setRevealedReasonsCount(0);
    const timers: any[] = [];
    friendlyReasons.forEach((_, idx) => {
      const timer = setTimeout(() => {
        setRevealedReasonsCount(prev => Math.max(prev, idx + 1));
      }, 450 + idx * 400);
      timers.push(timer);
    });

    return () => {
      timers.forEach(t => clearTimeout(t));
    };
  }, [currentSimulation.id]);

  const handleHold = () => {
    holdPayment(currentSimulation.id);
  };

  const handleVerifyContinue = () => {
    verifyPayment(currentSimulation.id, 'continue');
    setIsVerifyModalOpen(false);
  };

  const handleVerifyBlock = () => {
    verifyPayment(currentSimulation.id, 'block');
    setIsVerifyModalOpen(false);
  };

  const handleReportClick = () => {
    const caseNum = reportPayment(currentSimulation.id);
    setCreatedCaseNumber(caseNum);
    setIsCybercrimeModalOpen(true);
  };

  const handleCopyEvidence = () => {
    const text = `CYBER CRIME INCIDENT REPORT\nIncident ID: TXN-984210\nAmount: ₹48,000.00\nDestination VPA: rahul@upi\nHardware Signature: OnePlus 12 (CPH2581)\nSuspected IP Location: Pune, Maharashtra\nFlag: Linked to 3 syndicate mule bank accounts.\nReported via RUPAYRA Real-time Protection.`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleViewCase = () => {
    if (createdCaseNumber) {
      const c = fraudCases.find(fc => fc.caseNumber === createdCaseNumber);
      if (c) setSelectedCase(c);
      setActiveTab('fraud-cases');
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* PayGuard Hero Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#222222]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#E53935]/15 border border-[#E53935]/40 text-[#E53935] font-mono text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded bg-[#E53935] animate-ping" />
              LIVE SHIELD ACTIVE
            </span>
            <span className="text-[11px] font-mono text-[#A59E92]">SCAN SPEED: 8ms</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black font-mono tracking-tight text-[#F5F1E8] uppercase mt-1">
            PAYGUARD
          </h1>
          <p className="text-xs text-[#A59E92] font-sans">
            Real-time protection stopping suspicious UPI payments before your money leaves your bank.
          </p>
        </div>

        {/* View Switcher: Decision Engine vs Network Graph (NO PILL BOXES) */}
        <div className="flex items-center gap-1.5 bg-[#141414] border border-[#262626] p-1 rounded-lg">
          <button
            onClick={() => setActiveSubTab('decision')}
            className={`px-3.5 py-1.5 rounded text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-1.5 ${
              activeSubTab === 'decision'
                ? 'bg-[#FFD43B] text-[#090909]'
                : 'text-[#A59E92] hover:text-[#F5F1E8]'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            SAFETY SCANNER
          </button>
          <button
            onClick={() => setActiveSubTab('graph')}
            className={`px-3.5 py-1.5 rounded text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-1.5 ${
              activeSubTab === 'graph'
                ? 'bg-[#E53935] text-white'
                : 'text-[#A59E92] hover:text-[#E53935]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            FRAUD NETWORK GRAPH
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeSubTab === 'decision' ? (
        <div className="space-y-8">
          {/* Status Alert Banner if HELD (Plain friendly language) */}
          {isHeld && (
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-xl bg-[#24170d] border border-[#D9822B] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[#F5F1E8]"
            >
              <div className="flex items-center gap-3">
                <PauseCircle className="w-6 h-6 text-[#D9822B] shrink-0" />
                <div>
                  <h3 className="font-mono text-xs font-bold uppercase text-[#D9822B]">
                    PAYMENT SAFELY PAUSED • YOUR MONEY IS PROTECTED
                  </h3>
                  <p className="text-xs text-[#A59E92] font-sans">
                    ₹48,000 has NOT left your bank account. It is safely frozen until you confirm or cancel.
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded bg-[#090909] text-[#D9822B] font-mono text-xs font-bold border border-[#D9822B]/40 self-start sm:self-auto">
                PAUSED SAFE #PS-992
              </span>
            </motion.div>
          )}

          {isCompleted && (
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-xl bg-[#0e1d14] border border-[#10B981] flex items-center justify-between text-[#F5F1E8]"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#10B981] shrink-0" />
                <div>
                  <h3 className="font-mono text-xs font-bold uppercase text-[#10B981]">
                    TRANSACTION VERIFIED AND COMPLETED
                  </h3>
                  <p className="text-xs text-[#A59E92] font-sans">
                    You confirmed this payment. Transfer delivered securely to recipient.
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded bg-[#090909] text-[#10B981] font-mono text-xs font-bold border border-[#10B981]/40">
                VERIFIED SAFE
              </span>
            </motion.div>
          )}

          {/* Large Transaction Simulation Panel */}
          <div className="t-card-plinth p-6 md:p-8 relative overflow-hidden">
            {/* Japanese watercolor background aura */}
            <div 
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none transition-all duration-1000"
              style={{
                background: currentSimulation.riskScore > 75 
                  ? 'radial-gradient(circle, rgba(229,57,53,0.18) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
                filter: 'blur(30px)'
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Transaction Metadata & Transfer Visual */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#A59E92] uppercase">
                      FLAGGED PAYMENT • {currentSimulation.id}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#1c1c1c] text-[10px] font-mono text-[#FFD43B] font-bold">
                      UPI • Axis Core
                    </span>
                  </div>

                  <div className="mt-2 text-4xl sm:text-5xl font-black font-mono text-[#F5F1E8] tracking-tight">
                    ₹{currentSimulation.amount.toLocaleString('en-IN')}
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-sm font-mono">
                    <span className="text-[#F5F1E8] font-bold">Vaibhav (You)</span>
                    <ArrowRight className="w-4 h-4 text-[#FFD43B]" />
                    <span className="text-[#E53935] font-bold">{currentSimulation.recipient}</span>
                  </div>
                  <div className="text-xs font-mono text-[#A59E92] mt-0.5">
                    UPI ID: <span className="text-[#F5F1E8]">{currentSimulation.recipientUpi}</span>
                  </div>
                </div>

                {/* Animated Payment Pipeline */}
                <div className="p-4 rounded-xl bg-[#090909] border border-[#222222]">
                  <div className="flex items-center justify-between text-xs font-mono text-[#A59E92] mb-2">
                    <span>PAYMENT PROGRESS</span>
                    <span className={isHeld ? 'text-[#D9822B] font-bold' : isCompleted ? 'text-[#10B981] font-bold' : 'text-[#E53935] font-bold'}>
                      {isHeld ? 'STOPPED FOR SAFETY' : isCompleted ? 'SENT SUCCESSFULLY' : 'PAUSED: SUSPICIOUS ACTIVITY'}
                    </span>
                  </div>

                  <div className="relative h-2 rounded bg-[#1c1c1c] overflow-hidden">
                    <motion.div
                      className={`h-full rounded ${
                        isHeld ? 'bg-[#D9822B]' : isCompleted ? 'bg-[#10B981]' : 'bg-[#E53935]'
                      }`}
                      initial={{ width: '0%' }}
                      animate={{ width: isHeld ? '50%' : isCompleted ? '100%' : '75%' }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px] font-sans text-[#A59E92]">
                    <span>1. Your Bank Account</span>
                    <span className={isHeld ? 'text-[#D9822B] font-bold' : 'text-[#E53935] font-bold'}>
                      2. Rupayra Shield Check
                    </span>
                    <span>3. Recipient Account</span>
                  </div>
                </div>

                {/* Detection Reasons (Sequential & Friendly) */}
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#A59E92] uppercase font-bold tracking-wider">
                    WHY WAS THIS PAYMENT STOPPED? ({revealedReasonsCount} of {friendlyReasons.length} warnings found):
                  </span>

                  <div className="space-y-1.5">
                    {friendlyReasons.map((reason, idx) => {
                      const isRevealed = idx < revealedReasonsCount;
                      return (
                        <AnimatePresence key={idx}>
                          {isRevealed && (
                            <motion.div
                              initial={{ x: -12, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              className="p-3 rounded-lg bg-[#1f0d0d] border border-[#E53935]/40 flex items-start gap-2.5 text-xs text-[#F5F1E8]"
                            >
                              <div className="w-5 h-5 rounded bg-[#E53935] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                                {idx + 1}
                              </div>
                              <span className="font-sans leading-relaxed">
                                {reason}
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Radial Risk Meter & Plain English Risk Breakdown */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-xl bg-[#0d0d0d] border border-[#222222]">
                <RiskMeter score={currentSimulation.riskScore} size={190} />

                {/* Plain English Explainable Breakdown */}
                <div className="w-full mt-6 space-y-3 font-sans">
                  <div className="flex items-center justify-between pb-1 border-b border-[#222]">
                    <span className="text-xs font-bold uppercase text-[#F5F1E8]">
                      Detailed Risk Analysis
                    </span>
                    <HelpCircle className="w-3.5 h-3.5 text-[#A59E92]" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#A59E92]">New Recipient (First time paying)</span>
                      <span className="text-[#E53935] font-bold font-mono">92% Risk</span>
                    </div>
                    <div className="w-full h-1.5 rounded bg-[#1c1c1c] mt-1 overflow-hidden">
                      <div className="h-full bg-[#E53935] rounded w-[92%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#A59E92]">Unusual High Amount</span>
                      <span className="text-[#E53935] font-bold font-mono">95% Risk</span>
                    </div>
                    <div className="w-full h-1.5 rounded bg-[#1c1c1c] mt-1 overflow-hidden">
                      <div className="h-full bg-[#E53935] rounded w-[95%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#A59E92]">Unrecognized Phone (OnePlus 12)</span>
                      <span className="text-[#D9822B] font-bold font-mono">68% Risk</span>
                    </div>
                    <div className="w-full h-1.5 rounded bg-[#1c1c1c] mt-1 overflow-hidden">
                      <div className="h-full bg-[#D9822B] rounded w-[68%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#A59E92]">Late Night Payment Attempt</span>
                      <span className="text-[#D9822B] font-bold font-mono">54% Risk</span>
                    </div>
                    <div className="w-full h-1.5 rounded bg-[#1c1c1c] mt-1 overflow-hidden">
                      <div className="h-full bg-[#D9822B] rounded w-[54%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#A59E92]">Linked to 3 Fake / Fraud Accounts</span>
                      <span className="text-[#E53935] font-bold font-mono">98% Risk</span>
                    </div>
                    <div className="w-full h-1.5 rounded bg-[#1c1c1c] mt-1 overflow-hidden">
                      <div className="h-full bg-[#E53935] rounded w-[98%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Three Major Action Buttons (NO PILL SHAPES) */}
            <div className="mt-8 pt-6 border-t border-[#222222] grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => setIsVerifyModalOpen(true)}
                className="py-3 px-4 rounded-lg bg-[#1c1c1c] hover:bg-[#252525] border border-[#333333] text-[#F5F1E8] font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all hover:border-[#FFD43B] active:scale-[0.98]"
              >
                <CheckCircle2 className="w-4 h-4 text-[#FFD43B]" />
                VERIFY TRANSACTION
              </button>

              <button
                onClick={handleHold}
                className="py-3 px-4 rounded-lg bg-[#24150c] hover:bg-[#301c10] border border-[#D9822B] text-[#D9822B] font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
              >
                <PauseCircle className="w-4 h-4" />
                HOLD & PROTECT MONEY
              </button>

              <button
                onClick={handleReportClick}
                className="py-3 px-4 rounded-lg ks-button-danger text-white font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all sheen-active"
              >
                <AlertTriangle className="w-4 h-4" />
                REPORT TO CYBERCRIME
              </button>
            </div>
          </div>

          {/* Embedded Transaction Network Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-[#F5F1E8]">
                CONNECTED THREAT NETWORK PREVIEW
              </h3>
              <button
                onClick={() => setActiveSubTab('graph')}
                className="text-xs font-mono text-[#FFD43B] flex items-center gap-1 hover:underline"
              >
                FULL SCREEN FORENSIC VIEW &rarr;
              </button>
            </div>
            <TransactionNetworkGraph />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <TransactionNetworkGraph />
        </div>
      )}

      {/* VERIFY CONFIRMATION MODAL */}
      <AnimatePresence>
        {isVerifyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVerifyModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-[#141414] border border-[#2b2b2b] rounded-xl p-6 shadow-2xl z-10 text-center"
            >
              <div className="w-12 h-12 rounded-lg bg-[#FFD43B]/10 border border-[#FFD43B]/40 flex items-center justify-center mx-auto text-[#FFD43B]">
                <ShieldAlert className="w-6 h-6" />
              </div>

              <h3 className="text-base font-mono font-bold tracking-wider text-[#F5F1E8] uppercase mt-3">
                Do you recognize this transaction?
              </h3>

              <div className="mt-3 p-3 rounded bg-[#090909] border border-[#222] font-mono text-xs text-[#A59E92] space-y-1">
                <div>AMOUNT: <span className="text-[#F5F1E8] font-bold">₹48,000.00</span></div>
                <div>TO: <span className="text-[#FFD43B] font-bold">rahul@upi</span></div>
                <div>DEVICE: <span className="text-[#E53935]">OnePlus 12 (Pune)</span></div>
              </div>

              <p className="text-xs text-[#A59E92] mt-3 font-sans">
                If you did not initiate this payment, block it now to keep your ₹48,000 completely safe in your bank account.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={handleVerifyBlock}
                  className="py-2.5 px-4 rounded-lg bg-[#E53935] hover:bg-[#d32f2f] text-white font-mono text-xs font-bold tracking-wider transition-colors"
                >
                  NO, BLOCK IT
                </button>
                <button
                  onClick={handleVerifyContinue}
                  className="py-2.5 px-4 rounded-lg bg-[#FFD43B] hover:bg-[#f5c623] text-[#090909] font-mono text-xs font-bold tracking-wider transition-colors"
                >
                  YES, CONTINUE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EMERGENCY CYBERCRIME ACTION MODAL */}
      <AnimatePresence>
        {isCybercrimeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCybercrimeModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-[#141414] border-2 border-[#E53935] rounded-xl p-6 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#222]">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-[#E53935] text-white">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-mono font-black tracking-wider text-[#F5F1E8] uppercase">
                      CYBER CRIME EMERGENCY ACTION
                    </h3>
                    <p className="text-[11px] text-[#A59E92] font-sans">
                      Take immediate real-world action to freeze funds and file complaint
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsCybercrimeModalOpen(false)}
                  className="text-[#A59E92] hover:text-[#F5F1E8]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-4 font-sans">
                {/* Emergency Step 1: Call 1930 */}
                <div className="p-4 rounded-lg bg-[#201010] border border-[#E53935]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-[#E53935] font-bold uppercase block">
                      IMMEDIATE ACTION 1 • NATIONAL TOLL FREE
                    </span>
                    <h4 className="text-sm font-bold text-[#F5F1E8] mt-0.5">
                      Call National Cyber Crime Helpline (1930)
                    </h4>
                    <p className="text-xs text-[#A59E92] mt-0.5">
                      Available 24x7 to freeze UPI and banking accounts nationwide.
                    </p>
                  </div>

                  <a
                    href="tel:1930"
                    className="py-2 px-4 rounded-lg bg-[#E53935] hover:bg-[#d32f2f] text-white font-mono text-xs font-bold flex items-center justify-center gap-2 shrink-0 transition-colors shadow-md"
                  >
                    <PhoneCall className="w-4 h-4" />
                    CALL 1930 NOW
                  </a>
                </div>

                {/* Emergency Step 2: Open cybercrime.gov.in */}
                <div className="p-4 rounded-lg bg-[#141414] border border-[#333] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-[#FFD43B] font-bold uppercase block">
                      ACTION 2 • ONLINE POLICE COMPLAINT
                    </span>
                    <h4 className="text-sm font-bold text-[#F5F1E8] mt-0.5">
                      Official Portal: cybercrime.gov.in
                    </h4>
                    <p className="text-xs text-[#A59E92] mt-0.5">
                      Ministry of Home Affairs citizen portal for financial fraud.
                    </p>
                  </div>

                  <a
                    href="https://cybercrime.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3.5 rounded-lg bg-[#1f1f1f] hover:bg-[#282828] border border-[#444] text-[#F5F1E8] font-mono text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-[#FFD43B]" />
                    OPEN WEBSITE
                  </a>
                </div>

                {/* Step 3: Copy Auto-Generated Incident Evidence */}
                <div className="p-3.5 rounded-lg bg-[#0a0a0a] border border-[#222]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#F5F1E8]">
                      COPY TRANSACTION DETAILS FOR COMPLAINT:
                    </span>
                    <button
                      onClick={handleCopyEvidence}
                      className="px-2.5 py-1 rounded bg-[#1e1e1e] hover:bg-[#282828] text-xs font-mono text-[#FFD43B] flex items-center gap-1 transition-colors"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                      {isCopied ? 'COPIED!' : 'COPY TEXT'}
                    </button>
                  </div>

                  <div className="p-2.5 rounded bg-[#121212] font-mono text-[11px] text-[#A59E92] space-y-0.5">
                    <div>TXN ID: TXN-984210</div>
                    <div>AMOUNT: ₹48,000 | BENEFICIARY: rahul@upi</div>
                    <div>HARDWARE: OnePlus 12 (IMEI: 8642910••••912)</div>
                    <div>IP/GEO: Pune, Maharashtra | TIME: 10:42 PM IST</div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#222] flex items-center justify-between">
                <span className="text-xs font-mono text-[#10B981] font-bold">
                  ✓ Case docket #{createdCaseNumber} logged in RUPAYRA
                </span>
                <button
                  onClick={() => {
                    setIsCybercrimeModalOpen(false);
                    handleViewCase();
                  }}
                  className="px-4 py-2 rounded-lg bg-[#FFD43B] text-[#090909] font-mono text-xs font-bold hover:bg-[#f5c623] transition-colors"
                >
                  VIEW CASE DOSSIER &rarr;
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
