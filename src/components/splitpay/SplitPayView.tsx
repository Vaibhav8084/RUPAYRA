import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Plus, 
  ArrowRight, 
  Check, 
  Bell, 
  Sparkles, 
  Send, 
  Calculator, 
  Calendar, 
  Tag, 
  X,
  CreditCard,
  UserPlus,
  Coins,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Percent,
  CheckSquare,
  Square
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { ExpenseGroup, SettlementTransfer, GroupMember } from '../../types';
import { BillTossGame } from './BillTossGame';

export const SplitPayView: React.FC = () => {
  const { 
    groups, 
    addGroup, 
    addMemberToGroup,
    addExpense, 
    settleTransfer, 
    autoSettleAll,
    setParticleMode
  } = useApp();

  const [selectedGroupId, setSelectedGroupId] = useState<string>(groups[0]?.id || '');
  const activeGroup = groups.find(g => g.id === selectedGroupId) || groups[0];

  // Modal States
  const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [isCoinTossOpen, setIsCoinTossOpen] = useState(false);
  const [remindedId, setRemindedId] = useState<string | null>(null);

  // Quick Add Member to Current Group
  const [quickMemberName, setQuickMemberName] = useState('');
  const [memberAddSuccess, setMemberAddSuccess] = useState(false);

  // New Group Form State
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDesc, setNewGroupDesc] = useState('');
  const [newGroupMemberInput, setNewGroupMemberInput] = useState('');
  const [newGroupMembers, setNewGroupMembers] = useState<string[]>(['Rahul', 'Aryan', 'Karan']);

  // Add Expense Form State
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expensePaidBy, setExpensePaidBy] = useState(activeGroup?.members[0]?.id || '');
  const [expenseCategory, setExpenseCategory] = useState('Food');
  const [expenseSplitMethod, setExpenseSplitMethod] = useState<'EQUAL' | 'UNEQUAL' | 'PERCENTAGE' | 'CUSTOM'>('EQUAL');

  // Multi-person selection and custom values for UNEQUAL & PERCENTAGE
  const [participatingMemberIds, setParticipatingMemberIds] = useState<string[]>([]);
  const [unequalMap, setUnequalMap] = useState<Record<string, string>>({});
  const [percentageMap, setPercentageMap] = useState<Record<string, string>>({});
  const [splitErrorMessage, setSplitErrorMessage] = useState<string | null>(null);

  // Reset or initialize participating members whenever activeGroup or modal changes
  useEffect(() => {
    if (activeGroup?.members) {
      const allIds = activeGroup.members.map(m => m.id);
      setParticipatingMemberIds(allIds);
      if (!expensePaidBy && activeGroup.members[0]) {
        setExpensePaidBy(activeGroup.members[0].id);
      }
    }
  }, [activeGroup]);

  // When total amount changes in Unequal or Percentage, suggest equal distribution
  useEffect(() => {
    if (!activeGroup?.members) return;
    const total = parseFloat(expenseAmount);
    if (!isNaN(total) && total > 0 && participatingMemberIds.length > 0) {
      // Percentage default
      const defaultPct = (100 / participatingMemberIds.length).toFixed(1);
      const newPctMap: Record<string, string> = {};
      const newUnequalMap: Record<string, string> = {};
      const perPersonAmt = Math.round(total / participatingMemberIds.length);

      participatingMemberIds.forEach(id => {
        newPctMap[id] = defaultPct;
        newUnequalMap[id] = perPersonAmt.toString();
      });

      setPercentageMap(prev => Object.keys(prev).length === 0 ? newPctMap : prev);
      setUnequalMap(prev => Object.keys(prev).length === 0 ? newUnequalMap : prev);
    }
  }, [expenseAmount, participatingMemberIds]);

  const toggleParticipatingMember = (memberId: string) => {
    if (participatingMemberIds.includes(memberId)) {
      if (participatingMemberIds.length > 1) {
        setParticipatingMemberIds(participatingMemberIds.filter(id => id !== memberId));
      }
    } else {
      setParticipatingMemberIds([...participatingMemberIds, memberId]);
    }
  };

  // Quick add member to current active group
  const handleQuickAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickMemberName.trim() || !activeGroup) return;
    addMemberToGroup(activeGroup.id, quickMemberName.trim());
    setQuickMemberName('');
    setMemberAddSuccess(true);
    setTimeout(() => setMemberAddSuccess(false), 2000);
  };

  const handleAddMemberToNewGroup = () => {
    if (newGroupMemberInput.trim() && !newGroupMembers.includes(newGroupMemberInput.trim())) {
      setNewGroupMembers([...newGroupMembers, newGroupMemberInput.trim()]);
      setNewGroupMemberInput('');
    }
  };

  const handleCreateGroupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    addGroup(newGroupName.trim(), newGroupMembers, newGroupDesc.trim());
    setIsNewGroupModalOpen(false);
    setNewGroupName('');
    setNewGroupDesc('');
  };

  // Handle bill toss winner selection
  const handleTossWinnerSelected = (memberId: string, memberName: string) => {
    setExpensePaidBy(memberId);
    setExpenseTitle(`Party Bill (${memberName.replace(' (You)', '')} Pays)`);
    setIsAddExpenseModalOpen(true);
  };

  const handleAddExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSplitErrorMessage(null);
    const amountNum = parseFloat(expenseAmount);
    if (!expenseTitle.trim() || isNaN(amountNum) || amountNum <= 0) {
      setSplitErrorMessage('Please enter a valid expense title and amount');
      return;
    }

    const paidMember = activeGroup.members.find(m => m.id === expensePaidBy) || activeGroup.members[0];
    const targetMembers = activeGroup.members.filter(m => participatingMemberIds.includes(m.id));

    if (targetMembers.length === 0) {
      setSplitErrorMessage('Please select at least 1 person participating in this expense');
      return;
    }

    let calculatedSplits: { memberId: string; amount: number }[] = [];

    if (expenseSplitMethod === 'EQUAL') {
      const splitPerPerson = Math.round(amountNum / targetMembers.length);
      calculatedSplits = targetMembers.map(m => ({
        memberId: m.id,
        amount: splitPerPerson
      }));
    } else if (expenseSplitMethod === 'UNEQUAL') {
      let sumEntered = 0;
      calculatedSplits = targetMembers.map(m => {
        const val = parseFloat(unequalMap[m.id] || '0');
        sumEntered += isNaN(val) ? 0 : val;
        return {
          memberId: m.id,
          amount: isNaN(val) ? 0 : Math.round(val)
        };
      });

      if (Math.abs(sumEntered - amountNum) > 1) {
        setSplitErrorMessage(
          `Individual amounts sum to ₹${sumEntered.toLocaleString('en-IN')}, but total bill is ₹${amountNum.toLocaleString('en-IN')}. Please balance the ₹${Math.abs(sumEntered - amountNum)} difference.`
        );
        return;
      }
    } else if (expenseSplitMethod === 'PERCENTAGE') {
      let sumPct = 0;
      calculatedSplits = targetMembers.map(m => {
        const pct = parseFloat(percentageMap[m.id] || '0');
        sumPct += isNaN(pct) ? 0 : pct;
        const individualShare = Math.round((amountNum * (isNaN(pct) ? 0 : pct)) / 100);
        return {
          memberId: m.id,
          amount: individualShare
        };
      });

      if (Math.abs(sumPct - 100) > 0.5) {
        setSplitErrorMessage(
          `Total percentage is ${sumPct.toFixed(1)}%. It must equal exactly 100% (difference: ${(100 - sumPct).toFixed(1)}%).`
        );
        return;
      }
    } else {
      // CUSTOM / Default
      const splitPerPerson = Math.round(amountNum / targetMembers.length);
      calculatedSplits = targetMembers.map(m => ({
        memberId: m.id,
        amount: splitPerPerson
      }));
    }

    addExpense(activeGroup.id, {
      title: expenseTitle.trim(),
      amount: amountNum,
      paidBy: paidMember.id,
      paidByName: paidMember.name,
      date: 'Today',
      category: expenseCategory,
      splitMethod: expenseSplitMethod,
      splits: calculatedSplits
    });

    setIsAddExpenseModalOpen(false);
    setExpenseTitle('');
    setExpenseAmount('');
    setSplitErrorMessage(null);

    // Trigger visual celebration
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD43B', '#10B981', '#F5F1E8']
    });
  };

  const handleSettle = (transfer: SettlementTransfer) => {
    settleTransfer(activeGroup.id, transfer.id);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10B981', '#FFD43B', '#F5F1E8']
    });
    setParticleMode('safe');
    setTimeout(() => setParticleMode('normal'), 2500);
  };

  const handleAutoSettle = () => {
    autoSettleAll(activeGroup.id);
    confetti({
      particleCount: 90,
      spread: 85,
      origin: { y: 0.5 },
      colors: ['#10B981', '#FFD43B', '#F5F1E8']
    });
    setParticleMode('safe');
    setTimeout(() => setParticleMode('normal'), 3000);
  };

  const handleRemind = (transferId: string) => {
    setRemindedId(transferId);
    setTimeout(() => setRemindedId(null), 2500);
  };

  // Calculations for live validation in Add Expense Modal
  const totalAmountNum = parseFloat(expenseAmount) || 0;
  const currentUnequalSum = participatingMemberIds.reduce((sum, id) => {
    const val = parseFloat(unequalMap[id] || '0');
    return sum + (isNaN(val) ? 0 : val);
  }, 0);
  const currentPercentageSum = participatingMemberIds.reduce((sum, id) => {
    const val = parseFloat(percentageMap[id] || '0');
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner & Group Selector */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#222222]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] font-mono text-xs font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              DIRECT SAFE SETTLEMENTS
            </span>
            <span className="text-[11px] font-mono text-[#A59E92]">ZERO HIDDEN FEES</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black font-mono tracking-tight text-[#F5F1E8] uppercase mt-1">
            SPLITPAY • GROUP EXPENSES
          </h1>
          <p className="text-xs text-[#A59E92] font-mono">
            College roommates & friend groups: record expenses, split bills equally or custom, and settle in minimum transfers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Bill Roulette Toss Coin Button */}
          <button
            onClick={() => setIsCoinTossOpen(true)}
            className="px-3.5 py-2 rounded-lg bg-[#1f1b10] hover:bg-[#2b2413] border border-[#FFD43B]/60 text-[#FFD43B] font-mono text-xs font-bold tracking-wider flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(255,212,59,0.15)]"
            title="Spin the 3D coin to choose who pays today's bill!"
          >
            <Coins className="w-4 h-4 text-[#FFD43B] animate-spin" />
            <span>TOSS A COIN (कौन भरेगा?)</span>
          </button>

          {/* Group Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#141414] border border-[#262626]">
            {groups.map(g => (
              <button
                key={g.id}
                onClick={() => setSelectedGroupId(g.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold tracking-wider transition-all ${
                  selectedGroupId === g.id
                    ? 'bg-[#FFD43B] text-[#090909]'
                    : 'text-[#A59E92] hover:text-[#F5F1E8]'
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsNewGroupModalOpen(true)}
            className="px-3.5 py-2 rounded-lg bg-[#1f1f1f] hover:bg-[#282828] border border-[#333333] text-[#F5F1E8] font-mono text-xs font-bold tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-[#FFD43B]" />
            NEW GROUP
          </button>
        </div>
      </div>

      {activeGroup && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Group Overview, Members, Add Member, Balances */}
          <div className="lg:col-span-5 space-y-6">
            {/* Group Header Card */}
            <div className="p-6 rounded-xl border border-[#262626] bg-[#141414] relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#A59E92] uppercase">CODE: {activeGroup.code}</span>
                  <h2 className="text-xl font-black font-mono tracking-wider text-[#F5F1E8]">
                    {activeGroup.name}
                  </h2>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#1e1e1e] border border-[#FFD43B]/40 flex items-center justify-center font-bold text-[#FFD43B]">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <p className="text-xs text-[#A59E92] mt-2">
                {activeGroup.description}
              </p>

              <div className="mt-5 pt-4 border-t border-[#222] flex items-center justify-between">
                <span className="text-xs font-mono text-[#A59E92]">TOTAL EXPENSES RECORDED:</span>
                <span className="text-base font-black font-mono text-[#FFD43B]">
                  ₹{activeGroup.expenses.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Members & Individual Net Balances + Quick Add Member */}
            <div className="p-6 rounded-xl border border-[#262626] bg-[#141414] space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#222]">
                <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-[#F5F1E8]">
                  MEMBERS & NET BALANCES
                </h3>
                <span className="text-[10px] font-mono text-[#A59E92]">{activeGroup.members.length} MEMBERS</span>
              </div>

              {/* Direct Add Member to this Group */}
              <form onSubmit={handleQuickAddMember} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add friend to this group (e.g. Tanya)"
                    value={quickMemberName}
                    onChange={(e) => setQuickMemberName(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-md bg-[#090909] border border-[#2b2b2b] text-xs text-[#F5F1E8] focus:border-[#FFD43B] focus:outline-none font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-md bg-[#FFD43B] hover:bg-[#f5c623] text-[#090909] font-mono text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    ADD
                  </button>
                </div>
                {memberAddSuccess && (
                  <p className="text-[11px] font-mono text-[#10B981] flex items-center gap-1">
                    <Check className="w-3 h-3" /> Member joined group successfully!
                  </p>
                )}
              </form>

              {/* Members List */}
              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {activeGroup.members.map((member) => {
                  const isPositive = member.netBalance > 0;
                  const isZero = member.netBalance === 0;

                  return (
                    <div
                      key={member.id}
                      className="p-3 rounded-md bg-[#0e0e0e] border border-[#222222] flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-[#1c1c1c] border border-[#333] flex items-center justify-center font-mono font-bold text-xs text-[#F5F1E8]">
                          {member.avatar}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#F5F1E8]">
                            {member.name}
                          </div>
                          <div className="text-[10px] font-mono text-[#A59E92]">
                            {member.upi}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`text-xs font-mono font-bold ${
                          isPositive ? 'text-[#10B981]' : isZero ? 'text-[#A59E92]' : 'text-[#E53935]'
                        }`}>
                          {isPositive ? `+₹${member.netBalance}` : isZero ? '₹0 (Settled)' : `-₹${Math.abs(member.netBalance)}`}
                        </div>
                        <span className="text-[9px] font-mono text-[#A59E92]">
                          {isPositive ? 'gets back' : isZero ? 'all settled' : 'owes'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Primary Add Expense CTA */}
              <button
                onClick={() => setIsAddExpenseModalOpen(true)}
                className="w-full py-2.5 px-4 rounded-md bg-[#FFD43B] hover:bg-[#f5c623] text-[#090909] font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-colors shadow-[0_0_12px_rgba(255,212,59,0.2)]"
              >
                <Plus className="w-4 h-4" />
                RECORD NEW EXPENSE
              </button>
            </div>
          </div>

          {/* Right Column: Settlement Engine & Expenses Timeline */}
          <div className="lg:col-span-7 space-y-6">
            {/* Minimum Cash Flow Settlement Engine Panel */}
            <div className="p-6 rounded-xl border border-[#FFD43B]/30 bg-[#16140e] relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#FFD43B]/20">
                <div>
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-[#FFD43B]" />
                    <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-[#FFD43B]">
                      OPTIMAL MINIMUM TRANSFERS
                    </h3>
                  </div>
                  <p className="text-[11px] text-[#A59E92] font-mono mt-0.5">
                    Calculates the absolute minimum number of payments so nobody overpays.
                  </p>
                </div>

                <button
                  onClick={handleAutoSettle}
                  className="px-4 py-2 rounded-md ks-button-primary text-xs flex items-center gap-1.5 transition-all sheen-active"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  AUTO-SETTLE ALL
                </button>
              </div>

              {/* Settlement Cards */}
              <div className="mt-4 space-y-3">
                {activeGroup.settlements.length === 0 ? (
                  <div className="p-4 rounded-md bg-[#0e0e0e] border border-[#222] text-center text-xs font-mono text-[#10B981] flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    EVERYONE IS FULLY BALANCED AND SETTLED
                  </div>
                ) : (
                  activeGroup.settlements.map((s) => (
                    <motion.div
                      key={s.id}
                      layout
                      className={`p-3.5 rounded-md border transition-all ${
                        s.settled
                          ? 'bg-[#121212] border-[#222] opacity-60'
                          : 'bg-[#181818] border-[#333] hover:border-[#FFD43B]/60'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        {/* Animated Transfer Flow */}
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#F5F1E8]">
                            {s.fromName}
                          </span>
                          
                          {/* Animated payment arrow */}
                          <div className="flex items-center text-[#FFD43B] px-1">
                            <span className="w-3 h-0.5 bg-[#FFD43B]" />
                            <ArrowRight className="w-3.5 h-3.5 -ml-1 animate-pulse" />
                          </div>

                          <span className="font-mono text-xs font-bold text-[#FFD43B]">
                            {s.toName}
                          </span>

                          <span className="ml-2 font-mono font-black text-sm text-[#F5F1E8]">
                            ₹{s.amount.toLocaleString('en-IN')}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          {s.settled ? (
                            <span className="px-2.5 py-1 rounded-md bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 font-mono text-[10px] font-bold flex items-center gap-1">
                              <Check className="w-3 h-3 text-[#10B981]" />
                              SETTLED
                            </span>
                          ) : (
                            <>
                              <button
                                onClick={() => handleRemind(s.id)}
                                className="px-2.5 py-1 rounded-md bg-[#202020] hover:bg-[#282828] text-[#A59E92] hover:text-[#F5F1E8] font-mono text-[10px] font-bold transition-colors flex items-center gap-1"
                              >
                                <Bell className="w-3 h-3" />
                                {remindedId === s.id ? 'REMINDED!' : 'REMIND'}
                              </button>

                              <button
                                onClick={() => handleSettle(s)}
                                className="px-3.5 py-1.5 rounded-md ks-button-safe text-[10px] font-mono font-bold flex items-center gap-1"
                              >
                                <Check className="w-3 h-3" />
                                MARK PAID
                              </button>

                              <button
                                onClick={() => handleRemind(s.id)}
                                className="px-2 py-1 rounded-md bg-[#161616] hover:bg-[#222] text-[#A59E92] font-mono text-[10px] transition-colors"
                                title="Send UPI Intent Payment Link"
                              >
                                <Send className="w-3 h-3" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Expenses History */}
            <div className="p-6 rounded-xl border border-[#262626] bg-[#141414] space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#222]">
                <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-[#F5F1E8]">
                  EXPENSES LOG ({activeGroup.expenses.length})
                </h3>
                <span className="text-[10px] font-mono text-[#A59E92]">RECENT EXPENSES</span>
              </div>

              <div className="space-y-3">
                {activeGroup.expenses.length === 0 ? (
                  <div className="p-6 text-center text-xs font-mono text-[#A59E92] bg-[#0c0c0c] rounded-md border border-[#222]">
                    NO EXPENSES RECORDED YET. CLICK "RECORD NEW EXPENSE" ABOVE.
                  </div>
                ) : (
                  activeGroup.expenses.map((exp) => (
                    <div
                      key={exp.id}
                      className="p-3.5 rounded-md bg-[#0e0e0e] border border-[#222] flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-xs text-[#F5F1E8]">
                          {exp.title}
                        </div>
                        <div className="text-[10px] font-mono text-[#A59E92] mt-0.5">
                          Paid by <span className="text-[#FFD43B] font-bold">{exp.paidByName}</span> • {exp.date} • Split: {exp.splitMethod}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-mono font-black text-sm text-[#F5F1E8]">
                          ₹{exp.amount.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-[#1c1c1c] text-[#A59E92] uppercase">
                          {exp.category}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOSS A COIN MODAL */}
      <BillTossGame
        members={activeGroup?.members || []}
        isOpen={isCoinTossOpen}
        onClose={() => setIsCoinTossOpen(false)}
        onSelectPayer={handleTossWinnerSelected}
      />

      {/* CREATE NEW GROUP MODAL */}
      <AnimatePresence>
        {isNewGroupModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewGroupModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-[#141414] border border-[#2b2b2b] rounded-xl p-6 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#222]">
                <h3 className="text-sm font-mono font-bold tracking-wider text-[#F5F1E8] uppercase">
                  CREATE NEW SPLITPAY GROUP
                </h3>
                <button onClick={() => setIsNewGroupModalOpen(false)} className="text-[#A59E92] hover:text-[#F5F1E8]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateGroupSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="block text-[11px] font-mono text-[#A59E92] uppercase mb-1">
                    Group Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SRM HACKATHON TRIP"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-[#090909] border border-[#2b2b2b] text-sm text-[#F5F1E8] focus:border-[#FFD43B] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#A59E92] uppercase mb-1">
                    Group Description (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Food, ride, and hotel expenses"
                    value={newGroupDesc}
                    onChange={(e) => setNewGroupDesc(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-[#090909] border border-[#2b2b2b] text-sm text-[#F5F1E8] focus:border-[#FFD43B] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#A59E92] uppercase mb-1">
                    Add Friends & Members
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter student name (e.g. Tanya)"
                      value={newGroupMemberInput}
                      onChange={(e) => setNewGroupMemberInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddMemberToNewGroup(); } }}
                      className="flex-1 px-3 py-2 rounded-md bg-[#090909] border border-[#2b2b2b] text-sm text-[#F5F1E8] focus:border-[#FFD43B] focus:outline-none font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleAddMemberToNewGroup}
                      className="px-3 py-2 rounded-md bg-[#202020] text-[#FFD43B] font-mono text-xs font-bold hover:bg-[#282828]"
                    >
                      ADD
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-[#1e1e1e] border border-[#333] text-[11px] font-mono text-[#FFD43B]">
                      Vaibhav (You)
                    </span>
                    {newGroupMembers.map((m, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-[#181818] border border-[#2c2c2c] text-[11px] font-mono text-[#F5F1E8] flex items-center gap-1">
                        {m}
                        <button
                          type="button"
                          onClick={() => setNewGroupMembers(newGroupMembers.filter((_, i) => i !== idx))}
                          className="text-[#E53935] hover:text-white"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#222] flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsNewGroupModalOpen(false)}
                    className="px-4 py-2 rounded-md bg-[#181818] text-[#A59E92] font-mono text-xs hover:text-white"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-md bg-[#FFD43B] text-[#090909] font-mono text-xs font-bold hover:bg-[#f5c623]"
                  >
                    CREATE GROUP
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RECORD EXPENSE MODAL (WITH UNEQUAL & PERCENTAGE MEMBER SELECTION) */}
      <AnimatePresence>
        {isAddExpenseModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddExpenseModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#141414] border border-[#2b2b2b] rounded-xl p-6 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#222]">
                <div>
                  <h3 className="text-sm font-mono font-bold tracking-wider text-[#F5F1E8] uppercase">
                    RECORD EXPENSE • {activeGroup.name}
                  </h3>
                  <p className="text-[11px] font-mono text-[#A59E92]">
                    Specify bill details, select participants, and divide by share
                  </p>
                </div>
                <button onClick={() => setIsAddExpenseModalOpen(false)} className="text-[#A59E92] hover:text-[#F5F1E8]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddExpenseSubmit} className="mt-4 space-y-4">
                {/* Error Banner */}
                {splitErrorMessage && (
                  <div className="p-3 rounded-md bg-[#251010] border border-[#E53935] text-[#E53935] text-xs font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{splitErrorMessage}</span>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-mono text-[#A59E92] uppercase mb-1">
                    Expense Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dinner at Dhabha, Uber to Airport, Snacks"
                    value={expenseTitle}
                    onChange={(e) => setExpenseTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-[#090909] border border-[#2b2b2b] text-sm text-[#F5F1E8] focus:border-[#FFD43B] focus:outline-none font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-[#A59E92] uppercase mb-1">
                      Total Amount (₹)
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="e.g. 2400"
                      value={expenseAmount}
                      onChange={(e) => setExpenseAmount(e.target.value)}
                      className="w-full px-3 py-2 rounded-md bg-[#090909] border border-[#2b2b2b] text-sm text-[#F5F1E8] focus:border-[#FFD43B] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#A59E92] uppercase mb-1">
                      Paid By
                    </label>
                    <select
                      value={expensePaidBy}
                      onChange={(e) => setExpensePaidBy(e.target.value)}
                      className="w-full px-3 py-2 rounded-md bg-[#090909] border border-[#2b2b2b] text-sm text-[#F5F1E8] focus:border-[#FFD43B] focus:outline-none font-mono"
                    >
                      {activeGroup.members.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-[#A59E92] uppercase mb-1">
                      Category
                    </label>
                    <select
                      value={expenseCategory}
                      onChange={(e) => setExpenseCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-md bg-[#090909] border border-[#2b2b2b] text-sm text-[#F5F1E8] focus:border-[#FFD43B] focus:outline-none font-mono"
                    >
                      <option value="Food">Food & Drinks</option>
                      <option value="Travel">Travel & Cab</option>
                      <option value="College">College & Books</option>
                      <option value="Entertainment">Entertainment & Party</option>
                      <option value="Misc">Miscellaneous</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#A59E92] uppercase mb-1">
                      Split Method
                    </label>
                    <select
                      value={expenseSplitMethod}
                      onChange={(e) => setExpenseSplitMethod(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-md bg-[#090909] border border-[#2b2b2b] text-sm text-[#F5F1E8] focus:border-[#FFD43B] focus:outline-none font-mono"
                    >
                      <option value="EQUAL">EQUAL (All or Selected)</option>
                      <option value="UNEQUAL">UNEQUAL (Custom ₹ per person)</option>
                      <option value="PERCENTAGE">PERCENTAGE (% per person)</option>
                    </select>
                  </div>
                </div>

                {/* SELECT MEMBERS INVOLVED SECTION */}
                <div className="pt-2 border-t border-[#222]">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-mono text-[#A59E92] uppercase font-bold">
                      SELECT PARTICIPATING MEMBERS ({participatingMemberIds.length}/{activeGroup.members.length}):
                    </label>
                    <button
                      type="button"
                      onClick={() => setParticipatingMemberIds(activeGroup.members.map(m => m.id))}
                      className="text-[10px] font-mono text-[#FFD43B] hover:underline"
                    >
                      Select All
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {activeGroup.members.map(m => {
                      const isChecked = participatingMemberIds.includes(m.id);
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => toggleParticipatingMember(m.id)}
                          className={`px-2.5 py-1.5 rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
                            isChecked
                              ? 'bg-[#1e1e1e] border border-[#FFD43B] text-[#FFD43B]'
                              : 'bg-[#090909] border border-[#262626] text-[#666]'
                          }`}
                        >
                          {isChecked ? (
                            <CheckSquare className="w-3.5 h-3.5 text-[#FFD43B]" />
                          ) : (
                            <Square className="w-3.5 h-3.5 text-[#555]" />
                          )}
                          <span>{m.name.replace(' (You)', '')}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* UNEQUAL SPLIT: CUSTOM AMOUNTS */}
                  {expenseSplitMethod === 'UNEQUAL' && (
                    <div className="p-3 rounded-md bg-[#0a0a0a] border border-[#262626] space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-[#222]">
                        <span className="text-[#A59E92]">ENTER EXACT AMOUNT PER PERSON:</span>
                        <span className={`font-bold ${
                          Math.abs(currentUnequalSum - totalAmountNum) < 1 ? 'text-[#10B981]' : 'text-[#E53935]'
                        }`}>
                          Sum: ₹{currentUnequalSum} / ₹{totalAmountNum}
                          {totalAmountNum > 0 && Math.abs(currentUnequalSum - totalAmountNum) >= 1 && (
                            <span className="block text-[10px]">
                              {currentUnequalSum < totalAmountNum 
                                ? `(Need ₹${totalAmountNum - currentUnequalSum} more)` 
                                : `(Over by ₹${currentUnequalSum - totalAmountNum})`}
                            </span>
                          )}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {activeGroup.members
                          .filter(m => participatingMemberIds.includes(m.id))
                          .map(m => (
                            <div key={m.id} className="flex items-center justify-between gap-3 text-xs font-mono">
                              <span className="text-[#F5F1E8]">{m.name}</span>
                              <div className="flex items-center gap-1">
                                <span className="text-[#A59E92]">₹</span>
                                <input
                                  type="number"
                                  placeholder="0"
                                  value={unequalMap[m.id] || ''}
                                  onChange={(e) => {
                                    setUnequalMap({
                                      ...unequalMap,
                                      [m.id]: e.target.value
                                    });
                                  }}
                                  className="w-24 px-2 py-1 rounded bg-[#141414] border border-[#333] text-right text-[#F5F1E8] focus:border-[#FFD43B] focus:outline-none"
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* PERCENTAGE SPLIT: PERCENTAGE INPUTS */}
                  {expenseSplitMethod === 'PERCENTAGE' && (
                    <div className="p-3 rounded-md bg-[#0a0a0a] border border-[#262626] space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-[#222]">
                        <span className="text-[#A59E92]">ENTER PERCENTAGE SHARE (%):</span>
                        <span className={`font-bold ${
                          Math.abs(currentPercentageSum - 100) < 0.5 ? 'text-[#10B981]' : 'text-[#E53935]'
                        }`}>
                          Total: {currentPercentageSum.toFixed(1)}% / 100%
                          {Math.abs(currentPercentageSum - 100) >= 0.5 && (
                            <span className="block text-[10px]">
                              {currentPercentageSum < 100 
                                ? `(${(100 - currentPercentageSum).toFixed(1)}% remaining)` 
                                : `(Over by ${(currentPercentageSum - 100).toFixed(1)}%)`}
                            </span>
                          )}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {activeGroup.members
                          .filter(m => participatingMemberIds.includes(m.id))
                          .map(m => {
                            const pctVal = parseFloat(percentageMap[m.id] || '0');
                            const approxAmt = totalAmountNum > 0 ? Math.round((totalAmountNum * pctVal) / 100) : 0;
                            return (
                              <div key={m.id} className="flex items-center justify-between gap-3 text-xs font-mono">
                                <span className="text-[#F5F1E8]">{m.name}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] text-[#A59E92]">₹{approxAmt}</span>
                                  <div className="flex items-center gap-1">
                                    <input
                                      type="number"
                                      step="0.1"
                                      placeholder="0"
                                      value={percentageMap[m.id] || ''}
                                      onChange={(e) => {
                                        setPercentageMap({
                                          ...percentageMap,
                                          [m.id]: e.target.value
                                        });
                                      }}
                                      className="w-16 px-2 py-1 rounded bg-[#141414] border border-[#333] text-right text-[#F5F1E8] focus:border-[#FFD43B] focus:outline-none"
                                    />
                                    <span className="text-[#A59E92]">%</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}

                  {/* EQUAL SPLIT BREAKDOWN PREVIEW */}
                  {expenseSplitMethod === 'EQUAL' && totalAmountNum > 0 && participatingMemberIds.length > 0 && (
                    <div className="p-2.5 rounded-md bg-[#101010] border border-[#222] text-xs font-mono text-[#A59E92] flex items-center justify-between">
                      <span>EACH PERSON PAYS:</span>
                      <span className="text-[#FFD43B] font-bold">
                        ₹{Math.round(totalAmountNum / participatingMemberIds.length).toLocaleString('en-IN')} / person
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#222] flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddExpenseModalOpen(false)}
                    className="px-4 py-2 rounded-md bg-[#181818] text-[#A59E92] font-mono text-xs hover:text-white"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-md bg-[#FFD43B] text-[#090909] font-mono text-xs font-bold hover:bg-[#f5c623]"
                  >
                    RECORD EXPENSE
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
