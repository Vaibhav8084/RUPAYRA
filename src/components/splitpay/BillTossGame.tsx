import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Sparkles, Trophy, X, RotateCw, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GroupMember } from '../../types';

interface BillTossGameProps {
  members: GroupMember[];
  isOpen: boolean;
  onClose: () => void;
  onSelectPayer: (memberId: string, memberName: string) => void;
}

export const BillTossGame: React.FC<BillTossGameProps> = ({
  members,
  isOpen,
  onClose,
  onSelectPayer,
}) => {
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(
    members.map(m => m.id)
  );
  const [isFlipping, setIsFlipping] = useState(false);
  const [winner, setWinner] = useState<GroupMember | null>(null);
  const [coinSide, setCoinSide] = useState<'heads' | 'tails'>('heads');

  const toggleMember = (id: string) => {
    if (selectedMemberIds.includes(id)) {
      if (selectedMemberIds.length > 2) {
        setSelectedMemberIds(selectedMemberIds.filter(mId => mId !== id));
      }
    } else {
      setSelectedMemberIds([...selectedMemberIds, id]);
    }
  };

  const handleFlipCoin = () => {
    if (isFlipping) return;
    const candidates = members.filter(m => selectedMemberIds.includes(m.id));
    if (candidates.length < 2) return;

    setIsFlipping(true);
    setWinner(null);

    // Randomize side and winner
    const randomWinner = candidates[Math.floor(Math.random() * candidates.length)];
    const randomSide = Math.random() > 0.5 ? 'heads' : 'tails';

    setTimeout(() => {
      setCoinSide(randomSide);
      setWinner(randomWinner);
      setIsFlipping(false);

      // Trigger party confetti
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFD43B', '#F5F1E8', '#10B981']
      });
    }, 1800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-md bg-[#131313] border-2 border-[#FFD43B] rounded-xl p-6 shadow-2xl z-10 text-center"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#222]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-[#FFD43B]/10 border border-[#FFD43B]/40 text-[#FFD43B]">
              <Coins className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-mono font-bold tracking-wider text-[#F5F1E8] uppercase">
                TOSS A COIN • WHO PAYS THE BILL?
              </h3>
              <p className="text-[11px] text-[#A59E92] font-sans">
                Party bill roulette for roommates & hostel dinner
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#A59E92] hover:text-[#F5F1E8]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Candidate Selector */}
        <div className="my-4 text-left">
          <span className="text-[11px] font-mono text-[#A59E92] uppercase block mb-1.5 font-bold">
            Select Who Is At The Party:
          </span>
          <div className="flex flex-wrap gap-2">
            {members.map(m => {
              const isSelected = selectedMemberIds.includes(m.id);
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => toggleMember(m.id)}
                  className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#1e1e1e] border-2 border-[#FFD43B] text-[#FFD43B]'
                      : 'bg-[#0a0a0a] border border-[#2a2a2a] text-[#666]'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded bg-[#000] border flex items-center justify-center text-[9px]">
                    {isSelected && <Check className="w-2.5 h-2.5 text-[#FFD43B]" />}
                  </span>
                  <span>{m.name.replace(' (You)', '')}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Animated Gold Coin */}
        <div className="py-6 flex flex-col items-center justify-center">
          <motion.div
            animate={
              isFlipping
                ? {
                    rotateY: [0, 1800],
                    scale: [1, 1.25, 1],
                    y: [0, -35, 0]
                  }
                : { rotateY: 0, scale: 1, y: 0 }
            }
            transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
            className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#FFD43B] via-[#fff4b8] to-[#f5c623] border-4 border-[#090909] shadow-[0_0_35px_rgba(255,212,59,0.45)] flex items-center justify-center cursor-pointer select-none"
            onClick={handleFlipCoin}
          >
            <div className="w-20 h-20 rounded-full border border-[#090909]/40 flex flex-col items-center justify-center font-mono font-black text-[#090909]">
              <span className="text-2xl">₹</span>
              <span className="text-[9px] tracking-widest uppercase">
                {isFlipping ? 'FLIPPING' : winner ? coinSide.toUpperCase() : 'RUPAYRA'}
              </span>
            </div>
          </motion.div>

          <span className="text-xs font-mono text-[#A59E92] mt-3">
            {isFlipping ? 'The coin is spinning in mid-air...' : 'Tap coin or click button below to toss'}
          </span>
        </div>

        {/* Winner Card */}
        <AnimatePresence>
          {winner && (
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-lg bg-[#181814] border-2 border-[#FFD43B] text-center space-y-2 mb-4"
            >
              <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-[#FFD43B] uppercase">
                <Trophy className="w-4 h-4" />
                <span>THE BILL GOES TO:</span>
              </div>
              <div className="text-xl font-black font-mono text-[#F5F1E8]">
                {winner.name.toUpperCase()}
              </div>
              <p className="text-xs text-[#A59E92] font-sans">
                Dinner's on {winner.name.replace(' (You)', '')} tonight! 🎉
              </p>
              <button
                type="button"
                onClick={() => {
                  onSelectPayer(winner.id, winner.name);
                  onClose();
                }}
                className="w-full py-2 px-3 rounded bg-[#FFD43B] text-[#090909] font-mono text-xs font-bold hover:bg-[#f5c623] transition-colors"
              >
                RECORD EXPENSE FOR {winner.name.replace(' (You)', '').toUpperCase()} &rarr;
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={isFlipping}
            onClick={handleFlipCoin}
            className="w-full py-2.5 px-4 rounded-lg ks-button-primary text-xs font-bold flex items-center justify-center gap-2 sheen-active"
          >
            <RotateCw className={`w-4 h-4 ${isFlipping ? 'animate-spin' : ''}`} />
            {isFlipping ? 'SPINNING...' : 'TOSS THE COIN NOW'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
