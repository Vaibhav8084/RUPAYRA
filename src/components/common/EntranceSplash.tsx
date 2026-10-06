import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface EntranceSplashProps {
  onComplete?: () => void;
}

export const EntranceSplash: React.FC<EntranceSplashProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }}
          className="fixed inset-0 z-[100] bg-[#090909] flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
        >
          {/* Ambient Japanese Ink & Gold Wash */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,212,59,0.12)_0%,transparent_65%)] pointer-events-none" />

          {/* Golden Rotating Seal */}
          <motion.div
            initial={{ scale: 0.7, rotate: -20, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="w-24 h-24 rounded-lg bg-[#141414] border-2 border-[#FFD43B] flex items-center justify-center relative shadow-[0_0_40px_rgba(255,212,59,0.35)]">
              <span className="text-[#FFD43B] font-black text-5xl font-mono">₹</span>
              <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-[#FFD43B] rotate-45" />
            </div>

            {/* Glowing ring pulse */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut' }}
              className="absolute inset-0 rounded-lg border border-[#FFD43B]"
            />
          </motion.div>

          {/* Title & Tagline */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 text-center z-10"
          >
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-3xl font-black font-mono tracking-wider text-[#F5F1E8]">
                RUPAYRA
              </h1>
              <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 font-mono text-[10px] font-bold">
                ENCLAVE ACTIVE
              </span>
            </div>
            <p className="text-sm font-mono text-[#FFD43B] mt-1 tracking-widest uppercase">
              Every payment tells a story.
            </p>
            <p className="text-xs text-[#A59E92] mt-2 font-mono">
              Real-time payment safety & fraud interception
            </p>
          </motion.div>

          {/* Skip CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-8 text-[11px] font-mono text-[#A59E92] tracking-wider uppercase"
          >
            Tap anywhere to enter
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
