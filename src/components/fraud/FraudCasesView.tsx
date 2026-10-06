import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderLock, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  PhoneCall, 
  ArrowUpRight, 
  X, 
  Sparkles, 
  User, 
  Smartphone, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  History,
  FileCheck,
  FileText,
  Copy,
  ExternalLink,
  Shield
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FraudCase } from '../../types';
import { RiskMeter } from '../common/RiskMeter';

export const FraudCasesView: React.FC = () => {
  const { 
    fraudCases, 
    selectedCase, 
    setSelectedCase, 
    resolveFraudCase, 
    escalateFraudCase, 
    contactUserForCase,
    holdPayment 
  } = useApp();

  const [activeCase, setActiveCase] = useState<FraudCase | null>(selectedCase || fraudCases[0]);
  const [justResolvedId, setJustResolvedId] = useState<string | null>(null);
  const [isCybercrimeModalOpen, setIsCybercrimeModalOpen] = useState(false);
  const [copiedEvidence, setCopiedEvidence] = useState(false);

  const openCases = fraudCases.filter(c => c.status === 'OPEN').length;
  const highRiskCases = fraudCases.filter(c => c.riskLevel === 'HIGH' || c.riskLevel === 'CRITICAL').length;
  const investigatingCases = fraudCases.filter(c => c.status === 'INVESTIGATING').length;
  const resolvedCases = 18; // historical resolved metric

  const handleSelectCase = (c: FraudCase) => {
    setActiveCase(c);
    setSelectedCase(c);
  };

  const handleResolve = (caseId: string) => {
    setJustResolvedId(caseId);
    resolveFraudCase(caseId);
    if (activeCase && activeCase.id === caseId) {
      setActiveCase({ ...activeCase, status: 'RESOLVED' });
    }
    setTimeout(() => {
      setJustResolvedId(null);
    }, 2500);
  };

  const handleEscalate = (caseId: string) => {
    escalateFraudCase(caseId);
    if (activeCase && activeCase.id === caseId) {
      setActiveCase({ ...activeCase, status: 'INVESTIGATING' });
    }
  };

  const handleContactUser = (caseId: string) => {
    contactUserForCase(caseId);
  };

  const handleCopyEvidence = () => {
    if (!activeCase) return;
    const text = `RUPAYRA FORENSIC DOSSIER
Case: ${activeCase.caseNumber}
Transaction ID: ${activeCase.transactionId}
Intercepted Amount: ₹${activeCase.amount}
Sender: ${activeCase.sender}
Mule Recipient VPA: ${activeCase.recipientUpi}
Device: ${activeCase.device}
IMEI Hash: ${activeCase.deviceImei}
IP Address: ${activeCase.ipAddress}
Risk Score: ${activeCase.riskScore}/100
Status: ${activeCase.status}
Reason: ${activeCase.aiExplanation}`;

    navigator.clipboard.writeText(text);
    setCopiedEvidence(true);
    setTimeout(() => setCopiedEvidence(false), 2500);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#222222]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#E53935]/15 border border-[#E53935]/40 text-[#E53935] font-mono text-xs font-bold flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              FRAUD CASE MANAGEMENT
            </span>
            <span className="text-[11px] font-mono text-[#A59E92]">NPCI / I4C INTEGRATED DESK</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black font-mono tracking-tight text-[#F5F1E8] uppercase mt-1">
            FRAUD INVESTIGATION DESK
          </h1>
          <p className="text-xs text-[#A59E92] font-mono">
            Review intercepted payments, inspect device fingerprints, and report directly to National Cybercrime portal.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCybercrimeModalOpen(true)}
            className="px-3.5 py-2 rounded-lg bg-[#201010] hover:bg-[#2c1313] border border-[#E53935]/50 text-[#E53935] font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(229,57,53,0.2)]"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>REPORT TO CYBERCRIME (1930)</span>
          </button>
        </div>
      </div>

      {/* Top 4 Metrics (Zero Pills) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: OPEN CASES */}
        <div className="p-4 rounded-xl bg-[#141414] border border-[#262626]">
          <span className="text-[10px] font-mono text-[#A59E92] uppercase">OPEN CASES</span>
          <div className="mt-2 text-2xl md:text-3xl font-black font-mono text-[#F5F1E8]">
            0{openCases}
          </div>
          <span className="text-[10px] font-mono text-[#10B981] mt-1 block">Protected in Safe Vault</span>
        </div>

        {/* Metric 2: HIGH RISK */}
        <div className="p-4 rounded-xl bg-[#1c0f0f] border border-[#E53935]/40">
          <span className="text-[10px] font-mono text-[#E53935] uppercase font-bold">HIGH RISK</span>
          <div className="mt-2 text-2xl md:text-3xl font-black font-mono text-[#E53935]">
            0{highRiskCases}
          </div>
          <span className="text-[10px] font-mono text-[#E53935] mt-1 block">Immediate Priority</span>
        </div>

        {/* Metric 3: INVESTIGATING */}
        <div className="p-4 rounded-xl bg-[#18130e] border border-[#D9822B]/40">
          <span className="text-[10px] font-mono text-[#D9822B] uppercase font-bold">INVESTIGATING</span>
          <div className="mt-2 text-2xl md:text-3xl font-black font-mono text-[#D9822B]">
            0{investigatingCases}
          </div>
          <span className="text-[10px] font-mono text-[#D9822B] mt-1 block">Under Desk Review</span>
        </div>

        {/* Metric 4: RESOLVED */}
        <div className="p-4 rounded-xl bg-[#141414] border border-[#262626]">
          <span className="text-[10px] font-mono text-[#A59E92] uppercase">RESOLVED</span>
          <div className="mt-2 text-2xl md:text-3xl font-black font-mono text-[#10B981]">
            {resolvedCases}
          </div>
          <span className="text-[10px] font-mono text-[#10B981] mt-1 block">Assets Safeguarded</span>
        </div>
      </div>

      {/* Main Layout: Case List & Deep Dive Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Case Cards List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-[#222]">
            <span className="text-xs font-mono font-bold uppercase text-[#F5F1E8]">
              ACTIVE CASE QUEUE ({fraudCases.length})
            </span>
          </div>

          <div className="space-y-2.5">
            {fraudCases.map((c) => {
              const isSelected = activeCase?.id === c.id;
              const isResolved = c.status === 'RESOLVED';
              const isHigh = c.riskLevel === 'HIGH' || c.riskLevel === 'CRITICAL';

              return (
                <motion.div
                  key={c.id}
                  whileHover={{ x: 2 }}
                  onClick={() => handleSelectCase(c)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? isResolved 
                        ? 'bg-[#181818] border-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                        : 'bg-[#201010] border-[#E53935] shadow-[0_0_20px_rgba(229,57,53,0.25)]'
                      : 'bg-[#141414] border-[#222] hover:border-[#383838]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black text-[#F5F1E8]">
                      {c.caseNumber}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase ${
                      isResolved
                        ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30'
                        : isHigh
                        ? 'bg-[#E53935] text-white'
                        : 'bg-[#D9822B] text-black'
                    }`}>
                      {c.status}
                    </span>
                  </div>

                  <div className="mt-2 text-lg font-black font-mono text-[#F5F1E8]">
                    ₹{c.amount.toLocaleString('en-IN')}
                  </div>

                  <div className="mt-1 text-[11px] font-mono text-[#A59E92] truncate">
                    {c.recipientUpi}
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#222] flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#A59E92]">{c.timestamp.split(',')[0]}</span>
                    <span className={`font-bold ${isHigh ? 'text-[#E53935]' : 'text-[#10B981]'}`}>
                      RISK {c.riskScore}/100
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Case Deep Dive Dossier */}
        <div className="lg:col-span-8">
          {activeCase ? (
            <div 
              className={`p-6 md:p-8 rounded-2xl border transition-all duration-700 relative overflow-hidden ${
                activeCase.status === 'RESOLVED' || justResolvedId === activeCase.id
                  ? 'bg-[#131313] border-[#10B981]/40'
                  : 'bg-[#140b0b] border-[#E53935]/40'
              }`}
            >
              {/* Sumi ink wash dissolving effect */}
              <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
                style={{
                  background: activeCase.status === 'RESOLVED'
                    ? 'radial-gradient(circle at 80% 20%, rgba(16,185,129,0.08) 0%, transparent 70%)'
                    : 'radial-gradient(circle at 80% 20%, rgba(229,57,53,0.18) 0%, transparent 70%)'
                }}
              />

              <div className="relative z-10 space-y-6">
                {/* Dossier Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#222]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#A59E92] uppercase">
                        INCIDENT DOSSIER
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase ${
                        activeCase.status === 'RESOLVED'
                          ? 'bg-[#10B981] text-[#090909]'
                          : 'bg-[#E53935] text-white'
                      }`}>
                        {activeCase.status}
                      </span>
                    </div>

                    <h2 className="text-2xl font-black font-mono text-[#F5F1E8] tracking-tight mt-1">
                      CASE #{activeCase.caseNumber}
                    </h2>
                    <span className="text-xs font-mono text-[#A59E92]">
                      TRANSACTION ID: {activeCase.transactionId} • {activeCase.timestamp}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <RiskMeter score={activeCase.riskScore} size={105} strokeWidth={8} />
                  </div>
                </div>

                {/* Amount & Parties Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#090909] border border-[#222] space-y-1">
                    <span className="text-[10px] font-mono text-[#A59E92] uppercase">INTERCEPTED AMOUNT</span>
                    <div className="text-2xl font-black font-mono text-[#F5F1E8]">
                      ₹{activeCase.amount.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] font-mono text-[#10B981] block">
                      Protected in Rupayra Safe Vault
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#090909] border border-[#222] space-y-1 font-mono text-xs">
                    <span className="text-[10px] text-[#A59E92] uppercase block">ENTITIES INVOLVED</span>
                    <div>SENDER: <span className="text-[#F5F1E8]">{activeCase.sender}</span></div>
                    <div>DESTINATION: <span className="text-[#E53935] font-bold">{activeCase.recipientUpi}</span></div>
                  </div>
                </div>

                {/* Device & Recipient History */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-4 rounded-xl bg-[#111] border border-[#222] space-y-2">
                    <div className="flex items-center gap-1.5 text-[#FFD43B] font-bold">
                      <Smartphone className="w-4 h-4" />
                      <span>DEVICE HARDWARE SIGNATURE</span>
                    </div>
                    <div className="text-[#A59E92]">HARDWARE: <span className="text-[#F5F1E8]">{activeCase.device}</span></div>
                    <div className="text-[#A59E92]">IMEI DIGEST: <span className="text-[#F5F1E8]">{activeCase.deviceImei}</span></div>
                    <div className="text-[#A59E92]">IP GEOLOCATION: <span className="text-[#F5F1E8]">{activeCase.ipAddress}</span></div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#111] border border-[#222] space-y-2">
                    <div className="flex items-center gap-1.5 text-[#E53935] font-bold">
                      <Layers className="w-4 h-4" />
                      <span>RECIPIENT MULE NEXUS</span>
                    </div>
                    <div className="text-[#A59E92]">HISTORICAL DISPUTES: <span className="text-[#E53935] font-bold">{activeCase.pastDisputesCount} PRIOR FLAGS</span></div>
                    <div className="text-[#A59E92]">MULE CLUSTER: <span className="text-[#E53935] font-bold">ACTIVE LEA WATCHLIST</span></div>
                    <div className="text-[#A59E92]">TRUST SCORE: <span className="text-[#E53935] font-bold">04 / 100 (CRITICAL)</span></div>
                  </div>
                </div>

                {/* Explanation */}
                <div className="p-4 rounded-xl bg-[#181818] border border-[#2c2c2c] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FFD43B] uppercase">
                    <Sparkles className="w-4 h-4" />
                    <span>PLAIN-LANGUAGE REASONING</span>
                  </div>
                  <p className="text-xs text-[#F5F1E8] font-sans leading-relaxed">
                    {activeCase.aiExplanation}
                  </p>
                </div>

                {/* Audit Trail Log */}
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase text-[#A59E92]">
                    CASE AUDIT TRAIL ({activeCase.history.length} ACTIONS)
                  </span>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto">
                    {activeCase.history.map((h, i) => (
                      <div key={i} className="p-2.5 rounded-md bg-[#090909] border border-[#222] flex items-center justify-between text-xs font-mono">
                        <span className="text-[#F5F1E8]">{h.action}</span>
                        <span className="text-[#A59E92] text-[10px]">{h.actor} • {h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-[#222] grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    onClick={handleCopyEvidence}
                    className="py-2.5 px-3 rounded-lg bg-[#1a1a1a] hover:bg-[#222] border border-[#333] text-[#F5F1E8] font-mono text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#FFD43B]" />
                    {copiedEvidence ? 'COPIED!' : 'COPY EVIDENCE'}
                  </button>

                  <button
                    onClick={() => handleContactUser(activeCase.id)}
                    className="py-2.5 px-3 rounded-lg bg-[#1a1a1a] hover:bg-[#222] border border-[#333] text-[#F5F1E8] font-mono text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#FFD43B]" />
                    CONTACT SENDER
                  </button>

                  <button
                    onClick={() => handleEscalate(activeCase.id)}
                    className="py-2.5 px-3 rounded-lg bg-[#1a1a1a] hover:bg-[#222] border border-[#333] text-[#F5F1E8] font-mono text-xs font-bold transition-colors"
                  >
                    ESCALATE
                  </button>

                  <button
                    onClick={() => handleResolve(activeCase.id)}
                    disabled={activeCase.status === 'RESOLVED'}
                    className={`py-2.5 px-3 rounded-lg font-mono text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                      activeCase.status === 'RESOLVED'
                        ? 'bg-[#1f1f1f] text-[#A59E92] border border-[#333] cursor-not-allowed'
                        : 'bg-[#10B981] hover:bg-[#0ea371] text-[#090909] shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {activeCase.status === 'RESOLVED' ? 'RESOLVED' : 'MARK RESOLVED'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-[#141414] border border-[#222] font-mono text-xs text-[#A59E92]">
              SELECT A CASE FROM THE QUEUE TO VIEW DOSSIER
            </div>
          )}
        </div>
      </div>

      {/* EMERGENCY CYBERCRIME REPORT MODAL */}
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
              className="relative w-full max-w-lg bg-[#121010] border-2 border-[#E53935] rounded-xl p-6 shadow-2xl z-10 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#2a1717]">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-md bg-[#E53935]/20 border border-[#E53935] text-[#E53935]">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-mono font-bold tracking-wider text-[#F5F1E8] uppercase">
                      REPORT TO NATIONAL CYBERCRIME
                    </h3>
                    <p className="text-[11px] text-[#A59E92] font-sans">
                      Ministry of Home Affairs (MHA) & NPCI Financial Fraud Helpline
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsCybercrimeModalOpen(false)} className="text-[#A59E92] hover:text-[#F5F1E8]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 rounded-lg bg-[#1e0e0e] border border-[#E53935]/40 space-y-2">
                <span className="text-[10px] font-mono text-[#E53935] font-bold uppercase tracking-wider block">
                  NATIONAL CYBER FINANCIAL FRAUD HELPLINE:
                </span>
                <div className="text-2xl font-mono font-black text-[#F5F1E8] flex items-center gap-2">
                  <PhoneCall className="w-6 h-6 text-[#E53935]" />
                  <span>DIAL 1930</span>
                </div>
                <p className="text-xs text-[#A59E92] font-sans">
                  The Indian Cyber Crime Coordination Centre (I4C) operates 1930 to freeze stolen funds within the golden hour before fraudsters withdraw.
                </p>
              </div>

              <div className="space-y-2.5">
                <a
                  href="tel:1930"
                  className="w-full py-2.5 px-4 rounded-lg bg-[#E53935] hover:bg-[#c92f2c] text-white font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-colors shadow-[0_0_15px_rgba(229,57,53,0.4)]"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>CALL 1930 NOW (TOLL FREE)</span>
                </a>

                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] text-[#F5F1E8] font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-[#FFD43B]" />
                  <span>OPEN OFFICIAL PORTAL (CYBERCRIME.GOV.IN)</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEvidence}
                  className="w-full py-2 px-3 rounded-lg bg-[#141414] hover:bg-[#1a1a1a] border border-[#2b2b2b] text-[#A59E92] hover:text-[#F5F1E8] font-mono text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Copy className="w-3.5 h-3.5 text-[#FFD43B]" />
                  <span>{copiedEvidence ? 'CASE EVIDENCE COPIED TO CLIPBOARD' : 'COPY DOSSIER FOR POLICE COMPLAINT'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
