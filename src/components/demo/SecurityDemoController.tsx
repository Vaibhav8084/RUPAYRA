import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Square, 
  ChevronRight, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  X,
  FastForward
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SecurityDemoController: React.FC = () => {
  const { 
    isSecurityDemoRunning, 
    demoStep, 
    demoStepText, 
    stopSecurityDemo, 
    runSecurityDemo,
    demoMode 
  } = useApp();

  if (!demoMode || !isSecurityDemoRunning) return null;

  const totalSteps = 10;
  const progressPercent = (demoStep / totalSteps) * 100;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 pointer-events-auto">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        className="p-4 rounded-2xl bg-[#111111]/95 border-2 border-[#E53935] shadow-[0_0_35px_rgba(229,57,53,0.35)] backdrop-blur-md"
      >
        <div className="flex items-center justify-between pb-2 border-b border-[#222]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E53935] animate-ping" />
            <span className="text-xs font-mono font-black text-[#E53935] uppercase tracking-wider">
              CINEMATIC SECURITY DEMO IN PROGRESS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#F5F1E8]">
              STEP {demoStep} / {totalSteps}
            </span>
            <button
              onClick={stopSecurityDemo}
              className="p-1 rounded text-[#A59E92] hover:text-[#F5F1E8] hover:bg-[#222]"
              title="Stop Demo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-[#222] my-3 overflow-hidden">
          <motion.div
            className="h-full bg-[#E53935] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        {/* Description of current step */}
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-mono text-[#F5F1E8] truncate">
            {demoStepText}
          </p>

          <button
            onClick={stopSecurityDemo}
            className="px-2.5 py-1 rounded bg-[#201010] border border-[#E53935]/40 text-[#E53935] font-mono text-[10px] font-bold shrink-0 hover:bg-[#2e1515]"
          >
            END TOUR
          </button>
        </div>
      </motion.div>
    </div>
  );
};
