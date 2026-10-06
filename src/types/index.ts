export type TabType = 
  | 'command-center' 
  | 'splitpay' 
  | 'payguard' 
  | 'transactions' 
  | 'finvoice' 
  | 'fraud-cases' 
  | 'settings'
  | 'admin';

export type RiskLevel = 'SAFE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type TransactionStatus = 'safe' | 'flagged' | 'held' | 'completed' | 'blocked';

export interface RiskFactor {
  id: string;
  name: string;
  level: 'LOW' | 'MEDIUM' | 'HIGH';
  percentage: number;
  description: string;
  category: 'BENEFICIARY' | 'AMOUNT' | 'DEVICE' | 'TIME' | 'NETWORK';
}

export interface Transaction {
  id: string;
  amount: number;
  recipient: string;
  recipientUpi: string;
  sender: string;
  senderUpi: string;
  time: string;
  date: string;
  category: 'Food' | 'Travel' | 'College' | 'Electronics' | 'Transfer' | 'Rent' | 'Crypto' | 'General';
  riskScore: number;
  riskLevel: RiskLevel;
  status: TransactionStatus;
  device: string;
  ipLocation: string;
  paymentMethod: string;
  riskFactors?: RiskFactor[];
  note?: string;
  flaggedReasons?: string[];
  caseId?: string;
}

export interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  upi: string;
  netBalance: number; // positive = gets back, negative = owes
}

export interface ExpenseSplit {
  memberId: string;
  amount: number;
  percentage?: number;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: string; // memberId
  paidByName: string;
  date: string;
  category: string;
  splitMethod: 'EQUAL' | 'UNEQUAL' | 'PERCENTAGE' | 'CUSTOM';
  splits: ExpenseSplit[];
}

export interface SettlementTransfer {
  id: string;
  from: string;
  fromName: string;
  to: string;
  toName: string;
  amount: number;
  settled: boolean;
}

export interface ExpenseGroup {
  id: string;
  name: string;
  description: string;
  code: string;
  members: GroupMember[];
  expenses: Expense[];
  settlements: SettlementTransfer[];
}

export interface FraudCase {
  id: string;
  caseNumber: string;
  transactionId: string;
  amount: number;
  riskScore: number;
  riskLevel: RiskLevel;
  status: 'OPEN' | 'INVESTIGATING' | 'HELD' | 'RESOLVED';
  timestamp: string;
  sender: string;
  recipient: string;
  recipientUpi: string;
  device: string;
  deviceImei: string;
  ipAddress: string;
  location: string;
  flaggedReasons: string[];
  riskFactors: RiskFactor[];
  aiExplanation: string;
  pastDisputesCount: number;
  muleNetworkFlag: boolean;
  history: {
    time: string;
    action: string;
    actor: string;
  }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'ALERT' | 'EXPENSE' | 'CASE' | 'SYSTEM';
  read: boolean;
  targetTab?: TabType;
  targetId?: string;
}

export type SupportedLanguage = 'en' | 'hi' | 'ta' | 'te' | 'bn';

export interface UserProfile {
  name: string;
  upiId: string;
  phone: string;
  email: string;
  accountNumber: string;
  college: string;
  branch: string;
  kycStatus: 'Verified (Aadhaar + DigiLocker)' | 'Tier-2 Active';
}

export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  upiId: string;
  passwordHash: string;
  createdAt: string;
  role: 'USER' | 'ADMIN';
  status: 'ACTIVE' | 'FLAGGED' | 'SUSPENDED';
  balance: number;
  lastLoginIp: string;
}

export interface PaymentMethodItem {
  id: string;
  type: 'UPI' | 'BANK_ACCOUNT' | 'DEBIT_CARD';
  identifier: string; // e.g. vaibhav@okaxis or ••••8912
  provider: string; // Axis Bank, Google Pay, PhonePe, ICICI
  isPrimary: boolean;
  status: 'VERIFIED' | 'PENDING';
  addedOn: string;
}

export interface WebhookLog {
  id: string;
  event: 'PAYMENT_INTERCEPTED' | 'ESCROW_FROZEN' | 'SETTLEMENT_PROCESSED' | 'DISPUTE_FILED' | 'KYC_CHALLENGE';
  timestamp: string;
  payload: string;
  statusCode: number;
  durationMs: number;
}
