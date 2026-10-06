import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertTriangle, ArrowRight, Sparkles, Sliders, Check, Play, Pause, RefreshCw } from 'lucide-react';

export const ImpeccableProofStage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'polish' | 'distill' | 'clarify'>('polish');
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage
  const [isAutoScanning, setIsAutoScanning] = useState<boolean>(true);

  // Auto-scan oscillation animation when enabled
  useEffect(() => {
    if (!isAutoScanning) return;
    let forward = true;
    const interval = setInterval(() => {
      setSliderPosition(prev => {
        if (prev >= 78) forward = false;
        if (prev <= 22) forward = true;
        return forward ? prev + 1 : prev - 1;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [isAutoScanning]);

  const proofData = {
    polish: {
      command: '/polish',
      tagline: 'Remove AI tells & generic templates • Bespoke Fintech Precision',
      before: {
        title: 'Payment Alert #3910',
        subtitle: 'Status: Possible Suspicious Activity Detected',
        amount: '₹48,000',
        chips: ['Urgent Alert', 'Check Now', 'AI Generated Flag'],
        note: 'The system has noticed something unusual about this transaction.',
        critique: 'Generic alert soup, vague AI warnings, and floating low-contrast buttons.'
      },
      after: {
        title: 'UPI Intercept • TXN-984210',
        subtitle: 'RECIPIENT TIED TO 3 POLICE-REPORTED MULE ACCOUNTS',
        amount: '₹48,000.00',
        hardware: 'OnePlus 12 (CPH2581) • Pune Tunnel (1,180km anomaly)',
        action: 'Safely Paused in Rupayra Vault • ₹0 Money Lost',
        badge: 'VAULT PROTECTED #VP-992'
      }
    },
    distill: {
      command: '/distill',
      tagline: 'Eliminate visual clutter • Single focal threat metric first',
      before: {
        title: 'Financial Overview & Complex Stats',
        subtitle: 'Multiple equal cards fighting for attention',
        amount: '₹48,000 / ₹3,240 / 91% / 14 txns',
        chips: ['Balance OK', 'Device OK', 'Time OK'],
        note: 'Cards inside cards with no clear single focal point.',
        critique: 'Flat visual hierarchy, excessive cognitive load during urgent fraud.'
      },
      after: {
        title: 'Risk Delta • High Velocity Deviation',
        subtitle: '+1,380% sudden spike vs your 90-day typical spending',
        amount: '₹48,000.00',
        hardware: 'Baseline: ₹3,240 • Spike Ratio: 14.8x • Velocity: 7 txns/20m',
        action: 'Direct Threat Surface Interception',
        badge: 'RISK SCORE: 91 / 100'
      }
    },
    clarify: {
      command: '/clarify',
      tagline: 'Action is immediate and unambiguous • 1-Click protection',
      before: {
        title: 'Action Required',
        subtitle: 'Click below to choose an option',
        amount: '₹48,000',
        chips: ['Ignore', 'Dismiss', 'Maybe Later', 'Submit'],
        note: 'Ambiguous consequences with passive CTAs.',
        critique: 'Passive choices without immediate emergency protection or legal cyber proof.'
      },
      after: {
        title: 'Automatic Vault Intervention',
        subtitle: 'Protect student money before it leaves your bank',
        amount: '₹48,000.00',
        hardware: '1. Vault Lock   2. Docket RP-20481   3. Call 1930 Helpline',
        action: 'Immediate 1-Click Vault Lock with Zero Asset Loss',
        badge: 'ZERO MONEY LEAKAGE'
      }
    }
  };

  const current = proofData[activeTab];

  return (
    <div className="t-card-plinth p-6 md:p-8 relative overflow-hidden">
      {/* Top Header & Instrument Key Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#FFD43B]/10 border border-[#FFD43B]/30 text-[#FFD43B] font-mono text-[10px] font-bold">
              IMPECCABLE DESIGN PROOF STAGE
            </span>
            <span className="text-[10px] font-mono text-[#A59E92]">ANTI-SLOP CRAFTSMANSHIP</span>
          </div>
          <h2 className="text-xl font-black font-mono tracking-tight text-[#F5F1E8] uppercase mt-1 flex items-center gap-2">
            BEFORE vs AFTER • FINTECH SECURITY PRECISION
            <Sparkles className="w-4 h-4 text-[#FFD43B] animate-pulse" />
          </h2>
          <p className="text-xs text-[#A59E92] font-mono">
            {current.tagline}
          </p>
        </div>

        {/* Controls: Auto-Scan Toggle & Physical Instrument Keys */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsAutoScanning(!isAutoScanning)}
            className={`px-2.5 py-1.5 rounded-md text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all border ${
              isAutoScanning
                ? 'bg-[#FFD43B]/15 border-[#FFD43B] text-[#FFD43B]'
                : 'bg-[#141414] border-[#333] text-[#A59E92]'
            }`}
            title="Toggle automatic comparison scan"
          >
            {isAutoScanning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>AUTO-SCAN: {isAutoScanning ? 'ON' : 'PAUSED'}</span>
          </button>

          <div className="ks-instrument-strip">
            <button
              onClick={() => setActiveTab('polish')}
              className={`ks-instrument-key ${activeTab === 'polish' ? 'is-active' : ''}`}
            >
              /polish
            </button>
            <button
              onClick={() => setActiveTab('distill')}
              className={`ks-instrument-key ${activeTab === 'distill' ? 'is-active' : ''}`}
            >
              /distill
            </button>
            <button
              onClick={() => setActiveTab('clarify')}
              className={`ks-instrument-key ${activeTab === 'clarify' ? 'is-active' : ''}`}
            >
              /clarify
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Split Stage with Interactive Drag Seam & Smooth Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="mt-6 relative h-[310px] sm:h-[270px] rounded-xl overflow-hidden border border-[#262626] bg-[#0c0c0c] select-none"
        >
          {/* Layer 1: BEFORE (Left Side) */}
          <div 
            className="absolute inset-0 bg-[#161210] p-6 flex flex-col justify-between overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md bg-[#2a1c17] text-[#D9822B] font-mono text-[10px] font-bold border border-[#D9822B]/30 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-[#D9822B]" />
                  BEFORE (GENERIC AI TEMPLATE)
                </span>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-[#c8bfb0]">{current.before.title}</h3>
                <p className="text-xs text-[#8c8273]">{current.before.subtitle}</p>
              </div>

              <div className="mt-2 text-2xl font-mono text-[#a89f92] font-bold">
                {current.before.amount}
              </div>

              <div className="flex flex-wrap gap-1.5 mt-2">
                {current.before.chips.map((c, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-[#201815] text-[#998b7e] font-mono text-[9px] border border-[#382b24]">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-2.5 rounded-md bg-[#1c1411] border border-[#30221b] text-[10px] font-mono text-[#D9822B]">
              CRITIQUE: {current.before.critique}
            </div>
          </div>

          {/* Layer 2: AFTER (Right Side) */}
          <div 
            className="absolute inset-0 bg-[#0c0e0c] p-6 flex flex-col justify-between overflow-hidden"
            style={{ 
              clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` 
            }}
          >
            <div className="pl-6">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md bg-[#FFD43B] text-[#090909] font-mono text-[10px] font-black flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AFTER (RUPAYRA BESPOKE CRAFT)
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-[#10B981] text-[#090909] font-mono text-[9px] font-black">
                  {current.after.badge}
                </span>
              </div>

              <div className="mt-4">
                <h3 className="text-base font-bold font-mono text-[#F5F1E8] flex items-center gap-2">
                  {current.after.title}
                  <Sparkles className="w-3.5 h-3.5 text-[#FFD43B]" />
                </h3>
                <p className="text-xs font-mono text-[#E53935] font-semibold mt-0.5">{current.after.subtitle}</p>
              </div>

              <div className="mt-2 text-3xl font-black font-mono text-[#F5F1E8] tracking-tight">
                {current.after.amount}
              </div>

              <div className="mt-2 text-xs font-mono text-[#A59E92]">
                {current.after.hardware}
              </div>
            </div>

            <div className="pl-6 p-2.5 rounded-md bg-[#121612] border border-[#10B981]/40 text-[11px] font-mono text-[#10B981] font-bold flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#10B981]" />
              <span>{current.after.action}</span>
            </div>
          </div>

          {/* Draggable Seam Handle (Geometric faceted bevel, strictly NO pill shape) */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-[#FFD43B] shadow-[0_0_15px_#FFD43B] pointer-events-none z-20 flex items-center justify-center"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Pulsing Scan Beam */}
            <div className="absolute inset-y-0 -left-1 w-2.5 bg-gradient-to-r from-transparent via-[#FFD43B]/40 to-transparent animate-pulse" />

            {/* Geometric Chamfered Handle */}
            <div className="w-8 h-8 rounded-md bg-[#090909] border-2 border-[#FFD43B] shadow-2xl flex items-center justify-center text-[#FFD43B]">
              <Sliders className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Range Slider Input for physical dragging */}
          <input
            type="range"
            min="10"
            max="90"
            value={sliderPosition}
            onChange={(e) => {
              setIsAutoScanning(false);
              setSliderPosition(Number(e.target.value));
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            aria-label="Drag to compare before and after interface craftsmanship"
          />
        </motion.div>
      </AnimatePresence>

      <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-[#A59E92]">
        <span>&larr; DRAG SEAM OR TAP KEY TO INSPECT &rarr;</span>
        <span className="text-[#FFD43B] font-bold">INSPIRED BY IMPECCABLE.STYLE & TASTESKILL.DEV</span>
      </div>
    </div>
  );
};
