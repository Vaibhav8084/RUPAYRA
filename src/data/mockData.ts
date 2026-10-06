import { 
  Transaction, 
  ExpenseGroup, 
  FraudCase, 
  NotificationItem, 
  UserProfile,
  RiskFactor 
} from '../types';

export const CURRENT_USER: UserProfile = {
  name: 'Vaibhav Sharma',
  upiId: 'vaibhav@okaxis',
  phone: '+91 98765 43210',
  email: 'vaibhav.s@srmist.edu.in',
  accountNumber: '••••••••8912',
  college: 'SRM Institute of Science & Technology, KTR',
  branch: 'B.Tech Computer Science (Cybersecurity)',
  kycStatus: 'Verified (Aadhaar + DigiLocker)',
};

export const DEFAULT_RISK_FACTORS_48K: RiskFactor[] = [
  {
    id: 'rf-1',
    name: 'Beneficiary Novelty',
    level: 'HIGH',
    percentage: 92,
    description: 'First ever UPI transfer initiated to this VPA. Zero historical social or financial overlap.',
    category: 'BENEFICIARY'
  },
  {
    id: 'rf-2',
    name: 'Amount Deviation',
    level: 'HIGH',
    percentage: 95,
    description: '₹48,000 is 14.8x higher than user’s 90-day average transaction size (₹3,240).',
    category: 'AMOUNT'
  },
  {
    id: 'rf-3',
    name: 'Device Novelty',
    level: 'MEDIUM',
    percentage: 68,
    description: 'Payment initiated from an unverified OnePlus 12 (IMEI: 8642910...) via Pune IP gateway.',
    category: 'DEVICE'
  },
  {
    id: 'rf-4',
    name: 'Time Anomaly',
    level: 'MEDIUM',
    percentage: 54,
    description: 'Initiated at 10:42 PM IST, outside the user’s primary active banking window (9 AM - 8 PM).',
    category: 'TIME'
  },
  {
    id: 'rf-5',
    name: 'Recipient Network Risk',
    level: 'HIGH',
    percentage: 98,
    description: 'Recipient VPA rahul@upi is linked to 3 mule bank accounts flagged by I4C / Cyber Crime Cell.',
    category: 'NETWORK'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-984210',
    amount: 48000,
    recipient: 'Rahul VPA (New Recipient)',
    recipientUpi: 'rahul@upi',
    sender: 'Vaibhav Sharma',
    senderUpi: 'vaibhav@okaxis',
    time: '10:42 PM',
    date: 'Today',
    category: 'Transfer',
    riskScore: 91,
    riskLevel: 'HIGH',
    status: 'flagged',
    device: 'OnePlus 12 (Pune Gateway)',
    ipLocation: 'Pune, MH (IP: 103.21.144.92)',
    paymentMethod: 'UPI • Axis Bank Core',
    flaggedReasons: [
      'NEW BENEFICIARY',
      'UNUSUAL AMOUNT',
      'NEW DEVICE',
      'UNUSUAL TRANSACTION TIME',
      'RECIPIENT LINKED TO 3 PREVIOUSLY FLAGGED ACCOUNTS'
    ],
    riskFactors: DEFAULT_RISK_FACTORS_48K,
    note: 'Urgent transfer request'
  },
  {
    id: 'TXN-984189',
    amount: 420,
    recipient: 'Swiggy Food Delivery',
    recipientUpi: 'swiggy.pay@icici',
    sender: 'Vaibhav Sharma',
    senderUpi: 'vaibhav@okaxis',
    time: '8:32 PM',
    date: 'Today',
    category: 'Food',
    riskScore: 6,
    riskLevel: 'SAFE',
    status: 'safe',
    device: 'iPhone 15 Pro (Known Device)',
    ipLocation: 'Chennai, TN (IP: 49.37.112.44)',
    paymentMethod: 'UPI • Axis Bank Core',
    note: 'Dinner order #4912'
  },
  {
    id: 'TXN-984144',
    amount: 1200,
    recipient: 'SRM College Canteen',
    recipientUpi: 'srmcanteen@sbi',
    sender: 'Vaibhav Sharma',
    senderUpi: 'vaibhav@okaxis',
    time: '6:12 PM',
    date: 'Today',
    category: 'College',
    riskScore: 4,
    riskLevel: 'SAFE',
    status: 'safe',
    device: 'iPhone 15 Pro (Known Device)',
    ipLocation: 'Kattankulathur, TN (IP: 49.37.112.44)',
    paymentMethod: 'UPI • Axis Bank Core',
    note: 'Campus evening snacks'
  },
  {
    id: 'TXN-983990',
    amount: 2400,
    recipient: 'SRM Hostel Mess Committee',
    recipientUpi: 'srm.hostel@indianbank',
    sender: 'Vaibhav Sharma',
    senderUpi: 'vaibhav@okaxis',
    time: 'Yesterday, 1:15 PM',
    date: 'Yesterday',
    category: 'College',
    riskScore: 8,
    riskLevel: 'SAFE',
    status: 'completed',
    device: 'iPhone 15 Pro (Known Device)',
    ipLocation: 'Kattankulathur, TN',
    paymentMethod: 'UPI • Axis Bank Core',
    note: 'Monthly mess advance'
  },
  {
    id: 'TXN-983802',
    amount: 890,
    recipient: 'Uber India Mobility',
    recipientUpi: 'uber.ride@hdfc',
    sender: 'Vaibhav Sharma',
    senderUpi: 'vaibhav@okaxis',
    time: 'Yesterday, 11:20 AM',
    date: 'Yesterday',
    category: 'Travel',
    riskScore: 12,
    riskLevel: 'SAFE',
    status: 'completed',
    device: 'iPhone 15 Pro (Known Device)',
    ipLocation: 'Chennai Airport, TN',
    paymentMethod: 'UPI • Axis Bank Core',
    note: 'Cab from Airport to Hostel'
  },
  {
    id: 'TXN-982411',
    amount: 14500,
    recipient: 'Global Crypto P2P Exchange',
    recipientUpi: 'p2p.secure@paytm',
    sender: 'Vaibhav Sharma',
    senderUpi: 'vaibhav@okaxis',
    time: '24 Sep, 11:45 PM',
    date: '24 Sep',
    category: 'Crypto',
    riskScore: 78,
    riskLevel: 'HIGH',
    status: 'held',
    device: 'Unknown Linux Device',
    ipLocation: 'Bucharest, RO (VPN Detected)',
    paymentMethod: 'UPI • Axis Bank Core',
    flaggedReasons: ['SUSPICIOUS VPA', 'GEOGRAPHIC ANOMALY', 'VPN EXIT NODE DETECTED'],
    note: 'Cryptocurrency purchase'
  }
];

export const INITIAL_GROUPS: ExpenseGroup[] = [
  {
    id: 'grp-srm-dinner',
    name: 'SRM HOSTEL DINNER',
    description: 'Weekend celebration & semester end feast with hostel flatmates',
    code: 'SRM-881',
    members: [
      { id: 'm-1', name: 'Vaibhav (You)', avatar: 'V', upi: 'vaibhav@okaxis', netBalance: 800 },
      { id: 'm-2', name: 'Rahul', avatar: 'R', upi: 'rahul.s@okhdfc', netBalance: -300 },
      { id: 'm-3', name: 'Aryan', avatar: 'A', upi: 'aryan.k@oksbi', netBalance: -200 },
      { id: 'm-4', name: 'Karan', avatar: 'K', upi: 'karan.m@okicici', netBalance: -300 }
    ],
    expenses: [
      {
        id: 'exp-1',
        title: 'Dinner at Barbeque Nation',
        amount: 3600,
        paidBy: 'm-1',
        paidByName: 'Vaibhav (You)',
        date: '25 Sep 2026',
        category: 'Food',
        splitMethod: 'EQUAL',
        splits: [
          { memberId: 'm-1', amount: 900 },
          { memberId: 'm-2', amount: 900 },
          { memberId: 'm-3', amount: 900 },
          { memberId: 'm-4', amount: 900 },
        ]
      },
      {
        id: 'exp-2',
        title: 'Cab ride (Hostel to OMR & return)',
        amount: 900,
        paidBy: 'm-1',
        paidByName: 'Vaibhav (You)',
        date: '25 Sep 2026',
        category: 'Travel',
        splitMethod: 'EQUAL',
        splits: [
          { memberId: 'm-1', amount: 225 },
          { memberId: 'm-2', amount: 225 },
          { memberId: 'm-3', amount: 225 },
          { memberId: 'm-4', amount: 225 },
        ]
      },
      {
        id: 'exp-3',
        title: 'Midnight Snacks & Cold Brews',
        amount: 600,
        paidBy: 'm-1',
        paidByName: 'Vaibhav (You)',
        date: '25 Sep 2026',
        category: 'Food',
        splitMethod: 'EQUAL',
        splits: [
          { memberId: 'm-1', amount: 150 },
          { memberId: 'm-2', amount: 150 },
          { memberId: 'm-3', amount: 150 },
          { memberId: 'm-4', amount: 150 },
        ]
      }
    ],
    settlements: [
      {
        id: 'set-1',
        from: 'm-2',
        fromName: 'RAHUL',
        to: 'm-1',
        toName: 'VAIBHAV',
        amount: 600,
        settled: false
      },
      {
        id: 'set-2',
        from: 'm-3',
        fromName: 'ARYAN',
        to: 'm-1',
        toName: 'VAIBHAV',
        amount: 200,
        settled: false
      },
      {
        id: 'set-3',
        from: 'm-4',
        fromName: 'KARAN',
        to: 'm-2',
        toName: 'RAHUL',
        amount: 300,
        settled: false
      }
    ]
  },
  {
    id: 'grp-hackathon-team',
    name: 'RUPAYRA DEV CREW',
    description: 'Fintech hackathon domain, cloud compute & midnight caffeine fund',
    code: 'RUP-042',
    members: [
      { id: 'm-1', name: 'Vaibhav (You)', avatar: 'V', upi: 'vaibhav@okaxis', netBalance: 450 },
      { id: 'm-5', name: 'Sneha', avatar: 'S', upi: 'sneha.ai@okhdfc', netBalance: -450 }
    ],
    expenses: [
      {
        id: 'exp-4',
        title: 'Cloud GPU Instance (A100 compute)',
        amount: 900,
        paidBy: 'm-1',
        paidByName: 'Vaibhav (You)',
        date: '24 Sep 2026',
        category: 'Electronics',
        splitMethod: 'EQUAL',
        splits: [
          { memberId: 'm-1', amount: 450 },
          { memberId: 'm-5', amount: 450 },
        ]
      }
    ],
    settlements: [
      {
        id: 'set-4',
        from: 'm-5',
        fromName: 'SNEHA',
        to: 'm-1',
        toName: 'VAIBHAV',
        amount: 450,
        settled: false
      }
    ]
  }
];

export const INITIAL_FRAUD_CASES: FraudCase[] = [
  {
    id: 'case-20481',
    caseNumber: 'RP-20481',
    transactionId: 'TXN-984210',
    amount: 48000,
    riskScore: 91,
    riskLevel: 'HIGH',
    status: 'OPEN',
    timestamp: '25 Sep 2026, 10:42 PM',
    sender: 'Vaibhav Sharma (vaibhav@okaxis)',
    recipient: 'Rahul VPA (Mule Ring Node)',
    recipientUpi: 'rahul@upi',
    device: 'OnePlus 12 (CPH2581)',
    deviceImei: '864291060912441',
    ipAddress: '103.21.144.92 (Pune, MH)',
    location: 'Pune / Gateway Tunnel',
    flaggedReasons: [
      'NEW BENEFICIARY WITH ZERO TRUST HISTORY',
      'AMOUNT ₹48,000 EXCEEDS NORMAL STUDENT BEHAVIOR (14.8x DEVIATION)',
      'NEW HARDWARE SIGNATURE & SUSPICIOUS PUNE IP',
      'HIGH TRANSACTION VELOCITY TO MULE RING (3 CYBERCRIME FLAGS)',
      'TIMING AT 10:42 PM OUTSIDE STANDARD AUTHORIZED WINDOW'
    ],
    riskFactors: DEFAULT_RISK_FACTORS_48K,
    aiExplanation: 'The automated intelligence engine identified a catastrophic deviation from Vaibhav Sharma’s behavioral baseline. The transaction involves ₹48,000 destined for a freshly provisioned VPA (rahul@upi). Network graph intelligence links this VPA across 3 degrees of separation to Syndicate Mule Accounts X, Y, and Z currently under active freeze orders by the Cyber Crime Coordination Centre.',
    pastDisputesCount: 5,
    muleNetworkFlag: true,
    history: [
      { time: '10:42:01 PM', action: 'Payment initiated via UPI 2.0 interface', actor: 'Client Gateway' },
      { time: '10:42:03 PM', action: 'Risk Engine flagged anomalous threshold (Score 91)', actor: 'PayGuard Intelligence' },
      { time: '10:42:05 PM', action: 'Automated Fraud Dossier RP-20481 generated', actor: 'System' }
    ]
  },
  {
    id: 'case-19830',
    caseNumber: 'RP-19830',
    transactionId: 'TXN-982411',
    amount: 14500,
    riskScore: 78,
    riskLevel: 'HIGH',
    status: 'INVESTIGATING',
    timestamp: '24 Sep 2026, 11:45 PM',
    sender: 'Vaibhav Sharma',
    recipient: 'Global Crypto P2P Exchange',
    recipientUpi: 'p2p.secure@paytm',
    device: 'Linux X11 (Tor / VPN)',
    deviceImei: 'N/A (Browser Client)',
    ipAddress: '185.220.101.5 (Bucharest Exit)',
    location: 'Bucharest, Romania',
    flaggedReasons: [
      'VPN/TOR EXIT NODE IDENTIFIED',
      'HIGH-FREQUENCY OFFSHORE P2P MERCHANT',
      'RAPID WALLET DRAIN PATTERN'
    ],
    riskFactors: [
      {
        id: 'rf-201',
        name: 'Proxy & Geo Anomaly',
        level: 'HIGH',
        percentage: 94,
        description: 'Connection routed through known commercial VPN datacenter.',
        category: 'DEVICE'
      },
      {
        id: 'rf-202',
        name: 'Merchant Categorization',
        level: 'HIGH',
        percentage: 82,
        description: 'High risk unregulated cryptocurrency peer-to-peer broker.',
        category: 'BENEFICIARY'
      }
    ],
    aiExplanation: 'Transaction originated from a residential IP in Chennai followed 4 minutes later by an authorization attempt via a Romanian VPN node. Flagged as probable session hijacking or credential stuffing.',
    pastDisputesCount: 2,
    muleNetworkFlag: false,
    history: [
      { time: '24 Sep 11:45 PM', action: 'Payment blocked by automated geofencing', actor: 'PayGuard Core' },
      { time: '24 Sep 11:46 PM', action: 'Investigator assigned to case', actor: 'Risk Desk' }
    ]
  },
  {
    id: 'case-18492',
    caseNumber: 'RP-18492',
    transactionId: 'TXN-979110',
    amount: 85000,
    riskScore: 96,
    riskLevel: 'CRITICAL',
    status: 'OPEN',
    timestamp: '22 Sep 2026, 03:10 AM',
    sender: 'Campus Student Council Fund',
    recipient: 'Shadow Remittance Pvt Ltd',
    recipientUpi: 'shadow.pay@yesbank',
    device: 'Redmi Note 10 (Spoofed Mac)',
    deviceImei: '861099201948110',
    ipAddress: '117.201.88.19 (Kolkata)',
    location: 'Kolkata, WB',
    flaggedReasons: [
      'CRITICAL HOURLY DRAIN',
      'SIM-SWAP SIGNAL WITHIN LAST 24 HOURS',
      'MULTIPLE FAILED BIOMETRIC CHECKS'
    ],
    riskFactors: [
      {
        id: 'rf-301',
        name: 'SIM Swap Detection',
        level: 'HIGH',
        percentage: 99,
        description: 'Telco API confirmed IMSI change occurred 6 hours prior to payment attempt.',
        category: 'DEVICE'
      }
    ],
    aiExplanation: 'IMSI change flag detected through national carrier registry. Threat actor attempted full account liquidation via non-standard bulk UPI mandates.',
    pastDisputesCount: 9,
    muleNetworkFlag: true,
    history: [
      { time: '22 Sep 03:10 AM', action: 'Transaction frozen at NPCI switch level', actor: 'PayGuard Network Shield' }
    ]
  },
  {
    id: 'case-17210',
    caseNumber: 'RP-17210',
    transactionId: 'TXN-974012',
    amount: 4200,
    riskScore: 32,
    riskLevel: 'LOW',
    status: 'RESOLVED',
    timestamp: '18 Sep 2026, 04:20 PM',
    sender: 'Vaibhav Sharma',
    recipient: 'Flipkart Internet Pvt Ltd',
    recipientUpi: 'flipkart@axisbank',
    device: 'iPhone 15 Pro',
    deviceImei: '354921008871920',
    ipAddress: '49.37.112.44',
    location: 'Chennai, TN',
    flaggedReasons: ['UNUSUAL LAPTOP ACCESSORY CATEGORY'],
    riskFactors: [
      {
        id: 'rf-401',
        name: 'Device Baseline',
        level: 'LOW',
        percentage: 12,
        description: 'Primary trusted mobile terminal.',
        category: 'DEVICE'
      }
    ],
    aiExplanation: 'User verified purchase via in-app biometric authorization. No fraudulent indicators found.',
    pastDisputesCount: 0,
    muleNetworkFlag: false,
    history: [
      { time: '18 Sep 04:20 PM', action: 'Soft challenge triggered', actor: 'PayGuard' },
      { time: '18 Sep 04:21 PM', action: 'User confirmed order ID via SMS OTP', actor: 'Vaibhav Sharma' },
      { time: '18 Sep 04:22 PM', action: 'Case closed and marked safe', actor: 'Risk Desk' }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '₹48,000 transaction requires verification',
    description: 'High-risk payment to rahul@upi intercepted by PayGuard real-time intelligence.',
    time: '2 mins ago',
    type: 'ALERT',
    read: false,
    targetTab: 'payguard',
    targetId: 'TXN-984210'
  },
  {
    id: 'notif-2',
    title: 'Rahul has not completed the hostel dinner payment',
    description: 'Pending settlement of ₹600 for SRM HOSTEL DINNER.',
    time: '1 hour ago',
    type: 'EXPENSE',
    read: false,
    targetTab: 'splitpay',
    targetId: 'grp-srm-dinner'
  },
  {
    id: 'notif-3',
    title: 'Fraud case #RP-20481 was created',
    description: 'Transaction frozen. Investigation docket opened with evidence network graph.',
    time: 'Just now',
    type: 'CASE',
    read: false,
    targetTab: 'fraud-cases',
    targetId: 'case-20481'
  },
  {
    id: 'notif-4',
    title: 'Biometric Shield Active',
    description: 'UPI transaction safety score updated to 94/100.',
    time: 'Today, 9:00 AM',
    type: 'SYSTEM',
    read: true,
    targetTab: 'command-center'
  }
];

// Multilingual Mock responses for FinVoice
export const FINVOICE_KNOWLEDGE = {
  en: {
    income: "Last month, your account received a total of ₹74,500, which included your internship stipend of ₹60,000 and ₹14,500 from group settlements and campus reimbursements.",
    spending: "Your food-delivery spending was ₹3,200 this month, which is ₹1,100 higher than last month. Cab rides also saw an increase of ₹480.",
    blocked: "Transaction #TXN-9842 of ₹48,000 was held because recipient rahul@upi is linked to 3 mule accounts flagged by the National Cyber Crime Portal (I4C).",
    safety: "Your overall payment safety rating is currently 94 out of 100. One pending transaction of ₹48,000 requires your explicit verification.",
    split: "In 'SRM HOSTEL DINNER', Rahul owes you ₹600, and Aryan owes you ₹200. Total pending receivable is ₹800."
  },
  hi: {
    income: "पिछले महीने आपके खाते में कुल ₹74,500 जमा हुए, जिसमें आपका ₹60,000 का इंटर्नशिप स्टाइपेंड और ₹14,500 के ग्रुप सेटलमेंट्स शामिल थे।",
    spending: "इस महीने फ़ूड डिलीवरी पर आपका खर्च ₹3,200 रहा, जो पिछले महीने की तुलना में ₹1,100 अधिक है।",
    blocked: "₹48,000 का ट्रांजेक्शन #TXN-9842 इसलिए रोका गया क्योंकि प्राप्तकर्ता rahul@upi साइबर क्राइम सेल द्वारा फ्लैग किए गए 3 म्यूल खातों से जुड़ा हुआ है।",
    safety: "आपकी वर्तमान भुगतान सुरक्षा रेटिंग 100 में से 94 है। केवल एक संदिग्ध लेन-देन जांच के दायरे में है।",
    split: "SRM हॉस्टल डिनर में राहुल पर ₹600 और आर्यन पर ₹200 बकाया हैं। आपको कुल ₹800 मिलने बाकी हैं।"
  },
  ta: {
    income: "கடந்த மாதம் உங்கள் வங்கிக் கணக்கில் ₹74,500 வரவு வைக்கப்பட்டது, இதில் ₹60,000 உதவித்தொகை மற்றும் குழு தீர்வுகள் அடங்கும்.",
    spending: "இந்த மாதம் உணவு டெலிவரிக்கான உங்கள் செலவு ₹3,200 ஆக இருந்தது, இது கடந்த மாதத்தை விட ₹1,100 அதிகமாகும்.",
    blocked: "₹48,000 பரிவர்த்தனை #TXN-9842 தடுக்கப்பட்டது, ஏனெனில் rahul@upi கணக்கு சைபர் க்ரைம் மூலம் கொடியிடப்பட்ட 3 போலி கணக்குகளுடன் இணைக்கப்பட்டுள்ளது.",
    safety: "உங்கள் கட்டண பாதுகாப்பு மதிப்பீடு 100க்கு 94 ஆகும். கணினி முழு பாதுகாப்பில் உள்ளது.",
    split: "SRM விடுதி இரவு உணவில் ராகுல் உங்களுக்கு ₹600 மற்றும் ஆர்யன் ₹200 செலுத்த வேண்டும்."
  },
  te: {
    income: "గత నెలలో మీ ఖాతాలోకి మొత్తం ₹74,500 వచ్చాయి, ఇందులో మీ ₹60,000 స్టైఫండ్ మరియు గ్రూప్ రీయింబర్స్‌మెంట్లు ఉన్నాయి.",
    spending: "ఈ నెలలో ఫుడ్ డెలివరీ కోసం మీ ఖర్చు ₹3,200, ఇది గత నెల కంటే ₹1,100 ఎక్కువ.",
    blocked: "₹48,000 లావాదేవీ నిలిపివేయబడింది ఎందుకంటే rahul@upi సైబర్ క్రైమ్ ద్వారా గుర్తించబడిన 3 మ్యూల్ ఖాతాలతో అనుసంధానించబడి ఉంది.",
    safety: "మీ చెల్లింపు భద్రతా స్కోరు ప్రస్తుతం 100కి 94 వద్ద స్థిరంగా ఉంది.",
    split: "హాస్టల్ డిన్నర్ గ్రూపులో రాహుల్ నుండి మీకు ₹600, ఆర్యన్ నుండి ₹200 రావాల్సి ఉంది."
  },
  bn: {
    income: "গত মাসে আপনার অ্যাকাউন্টে মোট ₹৭৪,৫০০ জমা হয়েছে, যার মধ্যে ₹৬০,০০০ স্টাইপেন্ড এবং বাকি গ্রুপ সেটেলমেন্ট ছিল।",
    spending: "এই মাসে আপনার ফুড ডেলিভারি খরচ ছিল ₹৩,২০০, যা গত মাসের তুলনায় ₹১,১০০ বেশি।",
    blocked: "₹৪৮,০০০ এর লেনদেনটি আটকে দেওয়া হয়েছে কারণ প্রাপক rahul@upi ৩টি সাইবার ক্রাইম ফ্ল্যাগড অ্যাকাউন্টের সাথে যুক্ত।",
    safety: "আপনার পেমেন্ট সুরক্ষা স্কোর বর্তমানে ১০০ এর মধ্যে ৯৪। সিস্টেম নিরাপদ রয়েছে।",
    split: "SRM হোস্টেল ডিনারে রাহুল আপনাকে ₹৬০০ এবং আরিয়ান ₹২০০ প্রদান করবে।"
  }
};
