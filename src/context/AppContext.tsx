import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  TabType, 
  Transaction, 
  ExpenseGroup, 
  FraudCase, 
  NotificationItem, 
  SupportedLanguage,
  UserProfile,
  Expense,
  RegisteredUser,
  PaymentMethodItem,
  WebhookLog
} from '../types';
import { 
  CURRENT_USER, 
  INITIAL_TRANSACTIONS, 
  INITIAL_GROUPS, 
  INITIAL_FRAUD_CASES, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';

export type ParticleMode = 'normal' | 'suspicious' | 'safe' | 'dispersed' | 'held';

const INITIAL_REGISTERED_USERS: RegisteredUser[] = [
  {
    id: 'usr-101',
    name: 'Vaibhav Sharma',
    email: 'vaibhav.s@srmist.edu.in',
    phone: '+91 98765 43210',
    upiId: 'vaibhav@okaxis',
    passwordHash: 'sha256:vaibhav#2026',
    createdAt: '2026-09-15',
    role: 'USER',
    status: 'ACTIVE',
    balance: 24850,
    lastLoginIp: '49.37.112.44 (Chennai, TN)'
  },
  {
    id: 'usr-102',
    name: 'Rahul Verma',
    email: 'rahul.v@srmist.edu.in',
    phone: '+91 98111 22334',
    upiId: 'rahul.s@okhdfc',
    passwordHash: 'sha256:rahul#pass',
    createdAt: '2026-09-18',
    role: 'USER',
    status: 'ACTIVE',
    balance: 8400,
    lastLoginIp: '49.37.112.98 (Chennai, TN)'
  },
  {
    id: 'usr-103',
    name: 'Aryan Kapoor',
    email: 'aryan.k@srmist.edu.in',
    phone: '+91 97222 33445',
    upiId: 'aryan.k@oksbi',
    passwordHash: 'sha256:aryan#pass',
    createdAt: '2026-09-20',
    role: 'USER',
    status: 'ACTIVE',
    balance: 14200,
    lastLoginIp: '49.37.115.12 (Chennai, TN)'
  },
  {
    id: 'usr-104',
    name: 'Sneha Patel',
    email: 'sneha.ai@srmist.edu.in',
    phone: '+91 96333 44556',
    upiId: 'sneha.ai@okhdfc',
    passwordHash: 'sha256:sneha#pass',
    createdAt: '2026-09-22',
    role: 'USER',
    status: 'ACTIVE',
    balance: 31500,
    lastLoginIp: '49.37.120.88 (Chennai, TN)'
  }
];

const INITIAL_PAYMENT_METHODS: PaymentMethodItem[] = [
  {
    id: 'pm-1',
    type: 'UPI',
    identifier: 'vaibhav@okaxis',
    provider: 'Axis Bank Core UPI',
    isPrimary: true,
    status: 'VERIFIED',
    addedOn: '15 Sep 2026'
  },
  {
    id: 'pm-2',
    type: 'BANK_ACCOUNT',
    identifier: 'Axis Bank ••••8912',
    provider: 'Axis Bank Kattankulathur',
    isPrimary: false,
    status: 'VERIFIED',
    addedOn: '15 Sep 2026'
  },
  {
    id: 'pm-3',
    type: 'UPI',
    identifier: 'vaibhav.sharma@paytm',
    provider: 'Paytm Payments Bank',
    isPrimary: false,
    status: 'VERIFIED',
    addedOn: '20 Sep 2026'
  }
];

const INITIAL_WEBHOOKS: WebhookLog[] = [
  {
    id: 'whk-901',
    event: 'PAYMENT_INTERCEPTED',
    timestamp: '10:42:01 PM',
    payload: '{"txnId":"TXN-984210","amount":48000,"vpa":"rahul@upi","risk":91,"gateway":"NPCI-UPI"}',
    statusCode: 200,
    durationMs: 14
  },
  {
    id: 'whk-902',
    event: 'ESCROW_FROZEN',
    timestamp: '10:42:03 PM',
    payload: '{"escrowId":"EH-992","assetProtected":48000,"origin":"VAIBHAV","status":"LOCKED"}',
    statusCode: 200,
    durationMs: 8
  },
  {
    id: 'whk-903',
    event: 'SETTLEMENT_PROCESSED',
    timestamp: '08:15:30 PM',
    payload: '{"group":"SRM-881","transfer":"SET-1","amount":600,"from":"RAHUL","to":"VAIBHAV"}',
    statusCode: 200,
    durationMs: 19
  }
];

interface AppContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  user: UserProfile;
  balance: number;
  paymentSafetyScore: number;
  transactions: Transaction[];
  groups: ExpenseGroup[];
  fraudCases: FraudCase[];
  notifications: NotificationItem[];
  selectedTransaction: Transaction | null;
  setSelectedTransaction: (tx: Transaction | null) => void;
  selectedCase: FraudCase | null;
  setSelectedCase: (fc: FraudCase | null) => void;
  
  // PayGuard & Simulation State
  currentSimulation: Transaction;
  particleMode: ParticleMode;
  setParticleMode: (mode: ParticleMode) => void;
  
  // Actions
  triggerSafePayment: () => void;
  triggerSuspiciousPayment: () => void;
  holdPayment: (transactionId: string) => void;
  verifyPayment: (transactionId: string, action: 'continue' | 'block') => void;
  reportPayment: (transactionId: string) => string;
  resolveFraudCase: (caseId: string) => void;
  escalateFraudCase: (caseId: string) => void;
  contactUserForCase: (caseId: string) => void;
  
  // SplitPay Actions
  addGroup: (name: string, members: string[], description?: string) => void;
  addMemberToGroup: (groupId: string, memberName: string) => void;
  addExpense: (groupId: string, expense: Omit<Expense, 'id'>) => void;
  settleTransfer: (groupId: string, transferId: string) => void;
  autoSettleAll: (groupId: string) => void;
  
  // Notification Actions
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  // Demo Mode & Runner
  demoMode: boolean;
  setDemoMode: (enabled: boolean) => void;
  isSecurityDemoRunning: boolean;
  demoStep: number;
  demoStepText: string;
  runSecurityDemo: () => void;
  stopSecurityDemo: () => void;
  
  // Language & Settings
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  settings: {
    transactionAlerts: boolean;
    newDeviceAlerts: boolean;
    highRiskWarnings: boolean;
    voiceAssistant: boolean;
    biometricShield: boolean;
  };
  toggleSetting: (key: 'transactionAlerts' | 'newDeviceAlerts' | 'highRiskWarnings' | 'voiceAssistant' | 'biometricShield') => void;

  // Auth & Admin Dashboard
  currentUserAccount: RegisteredUser | null;
  isAdminAuthenticated: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  usersList: RegisteredUser[];
  loginUser: (emailOrUpi: string, password: string) => boolean;
  registerUser: (data: { name: string; email: string; phone: string; upiId: string; password: string }) => boolean;
  loginAdmin: (username: string, password: string) => boolean;
  logoutAdmin: () => void;
  logoutUser: () => void;
  exportUsersToCsv: () => void;

  // Payment Methods
  paymentMethods: PaymentMethodItem[];
  addPaymentMethod: (item: Omit<PaymentMethodItem, 'id' | 'addedOn'>) => void;
  setPrimaryPaymentMethod: (id: string) => void;

  // Network Simulation & Webhooks
  webhooks: WebhookLog[];
  simulateWebhook: (event: WebhookLog['event']) => void;
  networkSpeed: 'FAST_5G' | 'SLOW_CAMPUS_WIFI';
  setNetworkSpeed: (speed: 'FAST_5G' | 'SLOW_CAMPUS_WIFI') => void;
  apiRateLimitCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('command-center');
  const [user] = useState<UserProfile>(CURRENT_USER);
  const [balance, setBalance] = useState<number>(24850);
  const [paymentSafetyScore, setPaymentSafetyScore] = useState<number>(94);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [groups, setGroups] = useState<ExpenseGroup[]>(INITIAL_GROUPS);
  const [fraudCases, setFraudCases] = useState<FraudCase[]>(INITIAL_FRAUD_CASES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [selectedCase, setSelectedCase] = useState<FraudCase | null>(null);
  
  // Default simulation transaction: the ₹48,000 transaction
  const [currentSimulation, setCurrentSimulation] = useState<Transaction>(INITIAL_TRANSACTIONS[0]);
  const [particleMode, setParticleMode] = useState<ParticleMode>('normal');
  
  // Demo Mode
  const [demoMode, setDemoMode] = useState<boolean>(true);
  const [isSecurityDemoRunning, setIsSecurityDemoRunning] = useState<boolean>(false);
  const [demoStep, setDemoStep] = useState<number>(0);
  const [demoStepText, setDemoStepText] = useState<string>('');

  // Settings
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [settings, setSettings] = useState({
    transactionAlerts: true,
    newDeviceAlerts: true,
    highRiskWarnings: true,
    voiceAssistant: true,
    biometricShield: true,
  });

  // Auth & Admin State
  const [usersList, setUsersList] = useState<RegisteredUser[]>(INITIAL_REGISTERED_USERS);
  const [currentUserAccount, setCurrentUserAccount] = useState<RegisteredUser | null>(INITIAL_REGISTERED_USERS[0]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Payment Methods
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodItem[]>(INITIAL_PAYMENT_METHODS);

  // Webhook Logs & Rate Limits
  const [webhooks, setWebhooks] = useState<WebhookLog[]>(INITIAL_WEBHOOKS);
  const [networkSpeed, setNetworkSpeed] = useState<'FAST_5G' | 'SLOW_CAMPUS_WIFI'>('FAST_5G');
  const [apiRateLimitCount, setApiRateLimitCount] = useState<number>(0);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Sync particle mode based on active tab and transaction state
  useEffect(() => {
    if (activeTab === 'payguard') {
      if (currentSimulation.status === 'held') {
        setParticleMode('held');
      } else if (currentSimulation.riskScore > 75) {
        setParticleMode('suspicious');
      } else {
        setParticleMode('safe');
      }
    } else {
      if (particleMode !== 'suspicious' && particleMode !== 'held') {
        setParticleMode('normal');
      }
    }
  }, [activeTab, currentSimulation.status, currentSimulation.riskScore]);

  // Trigger Safe Payment simulation
  const triggerSafePayment = () => {
    const newTx: Transaction = {
      id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      amount: 650,
      recipient: 'Campus Coffee House',
      recipientUpi: 'campus.coffee@okhdfc',
      sender: user.name,
      senderUpi: user.upiId,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: 'Today',
      category: 'Food',
      riskScore: 5,
      riskLevel: 'SAFE',
      status: 'safe',
      device: 'iPhone 15 Pro (Verified)',
      ipLocation: 'Kattankulathur, TN',
      paymentMethod: 'UPI • Axis Bank Core',
      note: 'Espresso & Sandwiches'
    };

    setTransactions(prev => [newTx, ...prev]);
    setBalance(prev => Math.max(0, prev - 650));
    setParticleMode('safe');
    
    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Payment of ₹650 Safe & Verified',
      description: 'Campus Coffee House debited successfully via UPI.',
      time: 'Just now',
      type: 'ALERT',
      read: false,
      targetTab: 'transactions',
      targetId: newTx.id
    };
    setNotifications(prev => [newNotif, ...prev]);

    setTimeout(() => {
      setParticleMode('normal');
    }, 4000);
  };

  // Trigger Suspicious Payment simulation
  const triggerSuspiciousPayment = () => {
    const newTx: Transaction = {
      ...INITIAL_TRANSACTIONS[0],
      id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'flagged'
    };

    setCurrentSimulation(newTx);
    setTransactions(prev => [newTx, ...prev.filter(t => t.id !== newTx.id)]);
    setParticleMode('suspicious');
    setActiveTab('payguard');
  };

  // PayGuard: Hold payment
  const holdPayment = (transactionId: string) => {
    setParticleMode('held');
    setCurrentSimulation(prev => ({
      ...prev,
      status: 'held'
    }));

    setTransactions(prev => prev.map(t => {
      if (t.id === transactionId || t.id === currentSimulation.id) {
        return { ...t, status: 'held' };
      }
      return t;
    }));

    const holdNotif: NotificationItem = {
      id: `notif-hold-${Date.now()}`,
      title: 'MONEY PROTECTED: ₹48,000 to rahul@upi',
      description: 'Payment paused safely. No money has left your account.',
      time: 'Just now',
      type: 'ALERT',
      read: false,
      targetTab: 'payguard',
      targetId: transactionId
    };
    setNotifications(prev => [holdNotif, ...prev]);
  };

  // PayGuard: Verify payment
  const verifyPayment = (transactionId: string, action: 'continue' | 'block') => {
    if (action === 'continue') {
      setCurrentSimulation(prev => ({
        ...prev,
        status: 'completed',
        riskLevel: 'SAFE'
      }));
      setTransactions(prev => prev.map(t => {
        if (t.id === transactionId) {
          return { ...t, status: 'completed', riskLevel: 'SAFE' };
        }
        return t;
      }));
      setParticleMode('safe');
      setPaymentSafetyScore(prev => Math.min(99, prev + 2));
    } else {
      holdPayment(transactionId);
    }
  };

  // PayGuard: Report payment -> creates fraud case
  const reportPayment = (transactionId: string): string => {
    const caseNum = `RP-${Math.floor(20000 + Math.random() * 1000)}`;
    const newCase: FraudCase = {
      id: `case-${Date.now()}`,
      caseNumber: caseNum,
      transactionId: transactionId || currentSimulation.id,
      amount: currentSimulation.amount,
      riskScore: currentSimulation.riskScore,
      riskLevel: currentSimulation.riskLevel,
      status: 'OPEN',
      timestamp: `${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      sender: `${user.name} (${user.upiId})`,
      recipient: currentSimulation.recipient,
      recipientUpi: currentSimulation.recipientUpi,
      device: currentSimulation.device,
      deviceImei: '864291060912441',
      ipAddress: currentSimulation.ipLocation,
      location: 'Pune / Mumbai Gateway Tunnel',
      flaggedReasons: currentSimulation.flaggedReasons || [
        'NEW BENEFICIARY',
        'UNUSUAL AMOUNT',
        'NEW DEVICE',
        'SUSPECTED FAKE ACCOUNTS'
      ],
      riskFactors: currentSimulation.riskFactors || [],
      aiExplanation: `Transaction flagged for high-velocity transfer. Destination account ${currentSimulation.recipientUpi} matches active police blacklist with 3 cyber complaints filed within 48 hours.`,
      pastDisputesCount: 4,
      muleNetworkFlag: true,
      history: [
        { time: 'Just now', action: 'Report filed by sender', actor: 'Vaibhav Sharma' },
        { time: 'Just now', action: `Docket ${caseNum} issued to Cyber Threat Intelligence`, actor: 'Automated Shield' }
      ]
    };

    setFraudCases(prev => [newCase, ...prev]);
    setSelectedCase(newCase);
    holdPayment(transactionId);

    const notif: NotificationItem = {
      id: `notif-case-${Date.now()}`,
      title: `Fraud Case #${caseNum} Created`,
      description: `Formal evidence packet submitted to I4C Cyber Crime Cell. Amount ₹${currentSimulation.amount.toLocaleString()} protected.`,
      time: 'Just now',
      type: 'CASE',
      read: false,
      targetTab: 'fraud-cases',
      targetId: newCase.id
    };
    setNotifications(prev => [notif, ...prev]);

    return caseNum;
  };

  // Fraud Case Actions
  const resolveFraudCase = (caseId: string) => {
    setFraudCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          status: 'RESOLVED',
          history: [
            ...c.history,
            { time: 'Just now', action: 'Marked resolved by lead risk analyst', actor: 'Risk Desk (Vaibhav S.)' }
          ]
        };
      }
      return c;
    }));
    setParticleMode('safe');
    setTimeout(() => setParticleMode('normal'), 3000);
  };

  const escalateFraudCase = (caseId: string) => {
    setFraudCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          status: 'INVESTIGATING',
          history: [
            ...c.history,
            { time: 'Just now', action: 'Escalated to NPCI / LEA Rapid Response Cell', actor: 'Risk Desk' }
          ]
        };
      }
      return c;
    }));
  };

  const contactUserForCase = (caseId: string) => {
    setFraudCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          history: [
            ...c.history,
            { time: 'Just now', action: 'Interactive verification prompt dispatched to user device', actor: 'FinVoice Auth' }
          ]
        };
      }
      return c;
    }));
  };

  // SplitPay: Add new group
  const addGroup = (name: string, membersList: string[], description?: string) => {
    const memberObjects = [
      { id: 'm-1', name: 'Vaibhav (You)', avatar: 'V', upi: 'vaibhav@okaxis', netBalance: 0 },
      ...membersList.map((m, idx) => ({
        id: `m-${Date.now()}-${idx}`,
        name: m,
        avatar: m.charAt(0).toUpperCase(),
        upi: `${m.toLowerCase().replace(/\s+/g, '')}@upi`,
        netBalance: 0
      }))
    ];

    const newGroup: ExpenseGroup = {
      id: `grp-${Date.now()}`,
      name: name.toUpperCase(),
      description: description || 'Group expenses managed with Rupayra',
      code: `RUP-${Math.floor(100 + Math.random() * 900)}`,
      members: memberObjects,
      expenses: [],
      settlements: []
    };

    setGroups(prev => [newGroup, ...prev]);
  };

  // SplitPay: Add member to existing group
  const addMemberToGroup = (groupId: string, memberName: string) => {
    if (!memberName.trim()) return;
    const cleanName = memberName.trim();
    const newMember = {
      id: `m-${Date.now()}`,
      name: cleanName,
      avatar: cleanName.charAt(0).toUpperCase(),
      upi: `${cleanName.toLowerCase().replace(/\s+/g, '')}@upi`,
      netBalance: 0
    };

    setGroups(prev => prev.map(grp => {
      if (grp.id !== groupId) return grp;
      // prevent duplicate names
      if (grp.members.some(m => m.name.toLowerCase() === cleanName.toLowerCase())) {
        return grp;
      }
      return {
        ...grp,
        members: [...grp.members, newMember]
      };
    }));
  };

  // SplitPay: Add expense
  const addExpense = (groupId: string, expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: `exp-${Date.now()}`
    };

    setGroups(prev => prev.map(grp => {
      if (grp.id !== groupId) return grp;
      
      const updatedExpenses = [newExpense, ...grp.expenses];
      
      const memberBalances: { [key: string]: number } = {};
      grp.members.forEach(m => { memberBalances[m.id] = 0; });

      updatedExpenses.forEach(exp => {
        memberBalances[exp.paidBy] = (memberBalances[exp.paidBy] || 0) + exp.amount;
        exp.splits.forEach(s => {
          memberBalances[s.memberId] = (memberBalances[s.memberId] || 0) - s.amount;
        });
      });

      const updatedMembers = grp.members.map(m => ({
        ...m,
        netBalance: Math.round(memberBalances[m.id] || 0)
      }));

      const debtors: { id: string; name: string; amount: number }[] = [];
      const creditors: { id: string; name: string; amount: number }[] = [];

      updatedMembers.forEach(m => {
        if (m.netBalance < -1) {
          debtors.push({ id: m.id, name: m.name.replace(' (You)', ''), amount: -m.netBalance });
        } else if (m.netBalance > 1) {
          creditors.push({ id: m.id, name: m.name.replace(' (You)', ''), amount: m.netBalance });
        }
      });

      debtors.sort((a, b) => b.amount - a.amount);
      creditors.sort((a, b) => b.amount - a.amount);

      const calculatedSettlements = [];
      let i = 0, j = 0;
      let dList = debtors.map(d => ({ ...d }));
      let cList = creditors.map(c => ({ ...c }));

      while (i < dList.length && j < cList.length) {
        const settleAmount = Math.min(dList[i].amount, cList[j].amount);
        if (settleAmount > 0) {
          calculatedSettlements.push({
            id: `set-${Date.now()}-${i}-${j}`,
            from: dList[i].id,
            fromName: dList[i].name.toUpperCase(),
            to: cList[j].id,
            toName: cList[j].name.toUpperCase(),
            amount: Math.round(settleAmount),
            settled: false
          });
        }

        dList[i].amount -= settleAmount;
        cList[j].amount -= settleAmount;

        if (dList[i].amount < 1) i++;
        if (cList[j].amount < 1) j++;
      }

      return {
        ...grp,
        expenses: updatedExpenses,
        members: updatedMembers,
        settlements: calculatedSettlements.length > 0 ? calculatedSettlements : grp.settlements
      };
    }));
  };

  const settleTransfer = (groupId: string, transferId: string) => {
    setGroups(prev => prev.map(grp => {
      if (grp.id !== groupId) return grp;
      return {
        ...grp,
        settlements: grp.settlements.map(s => {
          if (s.id === transferId) {
            return { ...s, settled: true };
          }
          return s;
        })
      };
    }));
  };

  const autoSettleAll = (groupId: string) => {
    setGroups(prev => prev.map(grp => {
      if (grp.id !== groupId) return grp;
      return {
        ...grp,
        settlements: grp.settlements.map(s => ({ ...s, settled: true })),
        members: grp.members.map(m => ({ ...m, netBalance: 0 }))
      };
    }));
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Authentication & Registration Logic
  const loginUser = (emailOrUpi: string, pass: string): boolean => {
    const match = usersList.find(u => 
      (u.email.toLowerCase() === emailOrUpi.toLowerCase() || u.upiId.toLowerCase() === emailOrUpi.toLowerCase())
    );
    if (match) {
      setCurrentUserAccount(match);
      return true;
    }
    return false;
  };

  const registerUser = (data: { name: string; email: string; phone: string; upiId: string; password: string }): boolean => {
    const newUser: RegisteredUser = {
      id: `usr-${Date.now()}`,
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      upiId: data.upiId.trim().includes('@') ? data.upiId.trim() : `${data.upiId.trim()}@upi`,
      passwordHash: `sha256:${data.password.slice(0, 3)}••••`,
      createdAt: new Date().toISOString().split('T')[0],
      role: 'USER',
      status: 'ACTIVE',
      balance: 10000,
      lastLoginIp: '103.21.144.1 (Verified Gateway)'
    };

    setUsersList(prev => [newUser, ...prev]);
    setCurrentUserAccount(newUser);
    return true;
  };

  // Specific admin authentication required by user: username "admin123", password "admin@123"
  const loginAdmin = (username: string, pass: string): boolean => {
    if (username.trim() === 'admin123' && pass.trim() === 'admin@123') {
      setIsAdminAuthenticated(true);
      setActiveTab('admin');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setActiveTab('command-center');
  };

  const logoutUser = () => {
    setCurrentUserAccount(null);
  };

  // Export Users to Excel (.CSV)
  const exportUsersToCsv = () => {
    const headers = ['User ID', 'Name', 'Email', 'Phone', 'UPI ID', 'Role', 'Status', 'Balance (INR)', 'Registered Date', 'Last IP'];
    const rows = usersList.map(u => [
      u.id,
      `"${u.name}"`,
      u.email,
      u.phone,
      u.upiId,
      u.role,
      u.status,
      u.balance,
      u.createdAt,
      `"${u.lastLoginIp}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rupayra_registered_users_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Payment Methods
  const addPaymentMethod = (item: Omit<PaymentMethodItem, 'id' | 'addedOn'>) => {
    const newPm: PaymentMethodItem = {
      ...item,
      id: `pm-${Date.now()}`,
      addedOn: 'Today'
    };
    setPaymentMethods(prev => [newPm, ...prev]);
  };

  const setPrimaryPaymentMethod = (id: string) => {
    setPaymentMethods(prev => prev.map(pm => ({
      ...pm,
      isPrimary: pm.id === id
    })));
  };

  // Webhook Simulator
  const simulateWebhook = (event: WebhookLog['event']) => {
    const newLog: WebhookLog = {
      id: `whk-${Date.now()}`,
      event,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      payload: JSON.stringify({
        event,
        amount: event === 'PAYMENT_INTERCEPTED' ? 48000 : 650,
        gateway: 'NPCI-Switch-Core',
        verified: true,
        hash: `0x${Math.random().toString(16).slice(2, 10)}`
      }),
      statusCode: 200,
      durationMs: Math.floor(10 + Math.random() * 15)
    };
    setWebhooks(prev => [newLog, ...prev]);
  };

  // Cinematic "RUN SECURITY DEMO" Runner
  const runSecurityDemo = () => {
    if (isSecurityDemoRunning) return;
    setIsSecurityDemoRunning(true);
    setDemoStep(1);
    setDemoStepText('1. Generating ₹48,000 transfer simulation to new beneficiary...');
    setActiveTab('payguard');

    setCurrentSimulation({
      ...INITIAL_TRANSACTIONS[0],
      riskScore: 0,
      status: 'flagged'
    });
    setParticleMode('suspicious');

    setTimeout(() => {
      setDemoStep(2);
      setDemoStepText('2. Payment initiated: Vaibhav (SRM) → rahul@upi for ₹48,000.');
    }, 1500);

    setTimeout(() => {
      setDemoStep(3);
      setDemoStepText('3. Risk Intelligence Engine interrogating device, network & NPCI records...');
    }, 3000);

    setTimeout(() => {
      setDemoStep(4);
      setDemoStepText('4. Anomaly detected! Risk score surging from 0 to 91 / 100.');
      setCurrentSimulation(prev => ({ ...prev, riskScore: 91 }));
    }, 4500);

    setTimeout(() => {
      setDemoStep(5);
      setDemoStepText('5. Critical warning triggered. Sumi ink-bleed spreading.');
    }, 6200);

    setTimeout(() => {
      setDemoStep(6);
      setDemoStepText('6. Plain-language analysis: 5 severe warning signals identified.');
    }, 7800);

    setTimeout(() => {
      setDemoStep(7);
      setDemoStepText('7. Expanding network graph: Recipient linked to 3 fake bank accounts!');
    }, 9500);

    setTimeout(() => {
      setDemoStep(8);
      setDemoStepText('8. Executing automatic PAYMENT HOLD to safeguard student balance in bank.');
      holdPayment(currentSimulation.id);
    }, 11500);

    setTimeout(() => {
      setDemoStep(9);
      setDemoStepText('9. Fraud Case #RP-20481 created with National Cybercrime portal ready.');
      reportPayment(currentSimulation.id);
    }, 13500);

    setTimeout(() => {
      setDemoStep(10);
      setDemoStepText('10. Security sequence complete. Navigating to Fraud Cases dossier.');
      setActiveTab('fraud-cases');
      setSelectedCase(INITIAL_FRAUD_CASES[0]);
      setTimeout(() => {
        setIsSecurityDemoRunning(false);
      }, 3000);
    }, 15500);
  };

  const stopSecurityDemo = () => {
    setIsSecurityDemoRunning(false);
    setDemoStep(0);
    setDemoStepText('');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        user,
        balance,
        paymentSafetyScore,
        transactions,
        groups,
        fraudCases,
        notifications,
        selectedTransaction,
        setSelectedTransaction,
        selectedCase,
        setSelectedCase,
        currentSimulation,
        particleMode,
        setParticleMode,
        triggerSafePayment,
        triggerSuspiciousPayment,
        holdPayment,
        verifyPayment,
        reportPayment,
        resolveFraudCase,
        escalateFraudCase,
        contactUserForCase,
        addGroup,
        addMemberToGroup,
        addExpense,
        settleTransfer,
        autoSettleAll,
        markNotificationAsRead,
        markAllNotificationsRead,
        demoMode,
        setDemoMode,
        isSecurityDemoRunning,
        demoStep,
        demoStepText,
        runSecurityDemo,
        stopSecurityDemo,
        language,
        setLanguage,
        settings,
        toggleSetting,
        currentUserAccount,
        isAdminAuthenticated,
        isAuthModalOpen,
        setIsAuthModalOpen,
        usersList,
        loginUser,
        registerUser,
        loginAdmin,
        logoutAdmin,
        logoutUser,
        exportUsersToCsv,
        paymentMethods,
        addPaymentMethod,
        setPrimaryPaymentMethod,
        webhooks,
        simulateWebhook,
        networkSpeed,
        setNetworkSpeed,
        apiRateLimitCount
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
