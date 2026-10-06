import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface RiskMeterProps {
  score: number;
  maxScore?: number;
  size?: number;
  strokeWidth?: number;
  animate?: boolean;
  label?: string;
  showCategory?: boolean;
  className?: string;
}

export const RiskMeter: React.FC<RiskMeterProps> = ({
  score,
  maxScore = 100,
  size = 180,
  strokeWidth = 14,
  animate = true,
  label = 'RISK SCORE',
  showCategory = true,
  className = '',
}) => {
  const [displayScore, setDisplayScore] = useState(animate ? 0 : score);

  useEffect(() => {
    if (!animate) {
      setDisplayScore(score);
      return;
    }

    const duration = 1200; // 1.2s count up
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(easedProgress * score);
      
      setDisplayScore(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [score, animate]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Use a 270 degree arc for classic gauge style
  const strokeDashoffset = circumference - (displayScore / maxScore) * circumference * 0.75;
  const totalArcLength = circumference * 0.75;

  const isHighRisk = score >= 75;
  const isMediumRisk = score >= 35 && score < 75;

  const primaryColor = isHighRisk 
    ? '#E53935' // red
    : isMediumRisk 
    ? '#D9822B' // muted orange
    : '#FFD43B'; // warm yellow

  const categoryText = isHighRisk 
    ? 'HIGH RISK' 
    : isMediumRisk 
    ? 'ELEVATED RISK' 
    : 'SAFE';

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        {/* Subtle background glow when high risk */}
        {isHighRisk && (
          <div 
            className="absolute inset-0 rounded-full animate-pulse-subtle pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(229,57,53,0.22) 0%, transparent 70%)',
              filter: 'blur(16px)'
            }}
          />
        )}

        <svg 
          width={size} 
          height={size} 
          className="rotate-[135deg] overflow-visible"
        >
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#1c1c1c"
            strokeWidth={strokeWidth}
            strokeDasharray={`${totalArcLength} ${circumference}`}
            strokeLinecap="round"
          />

          {/* Active Meter Fill */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={primaryColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-mono tracking-widest text-[#A59E92] uppercase">
            {label}
          </span>
          <div className="flex items-baseline gap-0.5">
            <span 
              className="text-4xl font-extrabold font-mono tracking-tight"
              style={{ color: primaryColor }}
            >
              {displayScore}
            </span>
            <span className="text-sm font-mono text-[#A59E92]">/100</span>
          </div>

          {showCategory && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`mt-1 px-2.5 py-0.5 text-[10px] font-bold font-mono tracking-wider rounded border ${
                isHighRisk 
                  ? 'bg-[#E53935]/15 border-[#E53935] text-[#E53935]'
                  : isMediumRisk
                  ? 'bg-[#D9822B]/15 border-[#D9822B] text-[#D9822B]'
                  : 'bg-[#FFD43B]/15 border-[#FFD43B] text-[#FFD43B]'
              }`}
            >
              {categoryText}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
