# RUPAYRA (रुपेयरा) — Real-Time Payment Intelligence Platform

> **“Every payment tells a story.”**

RUPAYRA is a unified real-time payment intelligence and security platform engineered for next-generation digital payments. It blends Japanese sumi-e watercolor aesthetics with high-performance fintech security styling to provide end-to-end visibility into everyday peer transactions, group expense sharing, explainable fraud interception, and deep mule network forensics.

---

## 🎨 Visual Identity & Strict Color System (Zero Blue)

The design strictly obeys the fintech security color specification:
* **Near-Black (`#090909`)**: Dominant ink wash background with subtle paper grain texture.
* **Warm Yellow (`#FFD43B`)**: Active navigation states, verified transactions, and positive interactive elements.
* **Crimson Red (`#E53935`)**: Dedicated strictly to danger alerts, high-risk fraud interception, and blocked mule accounts.
* **Off-White (`#F5F1E8`)**: High-contrast, readable typographical surfaces.
* **Muted Orange (`#D9822B`)**: Cautionary states, escrow holds, and medium-risk signals.
* **Dark Grey (`#151515` / `#1c1c1c`)**: Structural card containers and borders.

---

## 🚀 Key Modules & Architecture

### 1. Command Center (`/command-center`)
* **Hero Experience**: *"Your money. Under control."*
* **3D Financial Particle Network (Three.js)**: 240 interactive nodes forming a rotating financial globe that responds to mouse tilt, connects nearby nodes, and dynamically shifts colors (Crimson Red during threats, Warm Gold during verified safe states, and Frozen Amber during escrow holds).
* **Core Metrics**: Available Balance (₹24,850), Payment Safety Rating (94/100), Group Payments (3 Pending), and Risk Alerts (1 Requires Attention).
* **Live Telemetry Payment Feed**: Real-time stream with instant risk badges and one-click inspection.

### 2. SplitPay (`/splitpay`)
* **Group Management**: Manage campus and peer expenses (e.g., `SRM HOSTEL DINNER`).
* **Expense Ledger**: Record multi-category payments (Dinner ₹3,600, Cab ₹900, Snacks ₹600) with flexible split models (Equal, Unequal, Percentage, Custom).
* **Minimal Cash Flow Settlement Engine**: Implements a greedy graph reduction algorithm to compute the minimum number of transfers needed to settle all parties:
  * `RAHUL → VAIBHAV ₹600`
  * `ARYAN → VAIBHAV ₹200`
  * `KARAN → RAHUL ₹300`
* **Actions**: One-click **Auto-Settle** (with particle confetti celebration), **Remind**, and **Request Payment**.

### 3. PayGuard (`/payguard`)
* **Central Hackathon Feature**: Real-time interception of high-velocity anomalous payments (Demo: `₹48,000` UPI Payment from Vaibhav to new recipient `rahul@upi`).
* **Animated Risk Score**: Radial gauge counting smoothly from 0 to 91/100 (`HIGH RISK`).
* **Sequential Detection Telemetry**: Sequentially unrolls 5 explainable risk reasons with ink-wash bleed animations:
  1. `NEW BENEFICIARY` (Zero social/financial overlap)
  2. `UNUSUAL AMOUNT` (14.8x deviation from 90-day baseline)
  3. `NEW DEVICE` (Unverified OnePlus 12 via Pune IP gateway)
  4. `UNUSUAL TRANSACTION TIME` (10:42 PM IST outside active window)
  5. `RECIPIENT LINKED TO 3 PREVIOUSLY FLAGGED ACCOUNTS`
* **Explainable AI Breakdown**: Percentage radar bars for Beneficiary Novelty, Amount Deviation, Device Novelty, Time Anomaly, and Network Risk.
* **Three Major Interventions**:
  * **VERIFY**: Two-step biometric challenge modal (`YES, CONTINUE` vs `NO, BLOCK`).
  * **HOLD**: Freezes pipeline in escrow, locks the payment line, changes status to `PAYMENT HELD`.
  * **REPORT**: Automatically issues Cyber Threat Dossier `CASE #RP-20481` and files evidence.

### 4. Transaction Network Graph (`/payguard -> Network Graph`)
* **Interactive 6-Stage Forensic Path**:
  $$\text{VAIBHAV} \longrightarrow \text{NEW DEVICE} \longrightarrow \text{₹48,000 PAYMENT} \longrightarrow \text{NEW RECIPIENT} \longrightarrow \text{ACCOUNT X} \longrightarrow \text{ACCOUNT Y} \longrightarrow \text{ACCOUNT Z}$$
* **Node Forensics**: Clickable nodes displaying KYC tier, hardware IMEI signatures, IP geolocations, past dispute rates, and Law Enforcement Agency (LEA) circulars.
* **Visual Pulsing Edge Animations**: Crimson particle flows tracing fund paths to offshore cryptocurrency wallets.

### 5. FinVoice Assistant (`/finvoice`)
* **Voice-First AI**: Native browser Web Speech API (`webkitSpeechRecognition` & `SpeechSynthesis`).
* **Multilingual Core**: Supports **English, हिंदी (Hindi), தமிழ் (Tamil), తెలుగు (Telugu), বাংলা (Bengali)**.
* **Animated Audio Waveform**: Responsive frequency bar visualization.
* **Natural Voice Queries**:
  * *"Maine iss month itna zyada kharcha kyun kiya?"* &rarr; Contextual breakdown of food-delivery spikes.
  * *"Why was this transaction blocked?"* &rarr; Explains the 3 mule bank connections.
  * *"Mere account mein pichle mahine kitna paisa aaya?"* &rarr; Audits total inflow of ₹74,500.

### 6. Fraud Cases Dossier (`/fraud-cases`)
* **Investigation Dashboard**: Metrics for Open Cases (04), High Risk (02), Investigating (01), and Resolved (18).
* **Full Case Dossier**: Complete audit trail, device IMEI digest, threat explanations, and rapid response buttons (`HOLD PAYMENT`, `CONTACT USER`, `ESCALATE`, `MARK RESOLVED`).
* **Cinematic Resolution Transition**: Clicking `MARK RESOLVED` dissolves the crimson danger state into a serene warm gold and off-white interface.

### 7. Cinematic Demo Mode Runner
* **"RUN SECURITY DEMO"**: An automated 10-step end-to-end simulation that presents the entire product story to judges with zero manual input required:
  1. Generates ₹48,000 payment
  2. Displays transaction
  3. Activates real-time risk engine
  4. Surges risk score from 0 to 91
  5. Triggers crimson warning ink animation
  6. Reveals 5 explainable risk factors
  7. Expands transaction network graph
  8. Executes automatic Payment Hold in escrow
  9. Creates Fraud Case #RP-20481
  10. Navigates smoothly to the resolution dossier.

---

## 💻 Tech Stack

* **Framework**: React 18 with TypeScript & Vite
* **Styling**: Tailwind CSS 3.4 (with customized sumi-e palette and zero blue)
* **3D Particle Graphics**: Three.js WebGL Particle Network
* **Animations**: Framer Motion spring physics & CSS ink-wash filters
* **Voice Intelligence**: Web Speech API (`SpeechRecognition` & `SpeechSynthesis`)
* **Icons**: Lucide React
* **Confetti Engine**: Canvas-Confetti

---

## 🏃‍♂️ Quick Start

```bash
# Navigate to project directory
cd rupayra

# Install dependencies (already installed)
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---
*Created for the Fintech Hackathon Jury & Product Evaluation.*
