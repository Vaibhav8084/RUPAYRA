import React from 'react';
import { 
  User, 
  ShieldCheck, 
  Globe, 
  Bell, 
  Palette, 
  CheckCircle2, 
  Smartphone, 
  Lock, 
  Fingerprint, 
  Volume2, 
  Key,
  CreditCard,
  Building
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SupportedLanguage } from '../../types';

export const SettingsView: React.FC = () => {
  const { 
    user, 
    settings, 
    toggleSetting, 
    language, 
    setLanguage 
  } = useApp();

  const languages: { code: SupportedLanguage; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  ];

  return (
    <div className="space-y-8 pb-16 max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-[#222222]">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-[#FFD43B]/10 border border-[#FFD43B]/30 text-[#FFD43B] font-mono text-xs font-bold">
            SECURITY & PREFERENCES
          </span>
          <span className="text-[11px] font-mono text-[#A59E92]">HARDWARE ATTESTED</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black font-mono tracking-tight text-[#F5F1E8] uppercase mt-1">
          SETTINGS
        </h1>
        <p className="text-xs text-[#A59E92] font-mono">
          Manage cryptographic key rings, biometric shields, multilingual engines, and alert thresholds.
        </p>
      </div>

      {/* SECTION 1: PROFILE */}
      <section className="p-6 rounded-2xl border border-[#262626] bg-[#141414] space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#222]">
          <User className="w-4 h-4 text-[#FFD43B]" />
          <h2 className="text-xs font-mono font-bold tracking-wider uppercase text-[#F5F1E8]">
            USER PROFILE & ACADEMIC CREDENTIALS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[#222] space-y-1">
            <span className="text-[10px] font-mono text-[#A59E92] uppercase">FULL NAME</span>
            <div className="font-semibold text-sm text-[#F5F1E8] flex items-center gap-2">
              {user.name}
              <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD43B]" />
            </div>
            <span className="text-[10px] font-mono text-[#A59E92]">VPA: {user.upiId}</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[#222] space-y-1">
            <span className="text-[10px] font-mono text-[#A59E92] uppercase">CAMPUS AFFILIATION</span>
            <div className="font-semibold text-sm text-[#F5F1E8]">{user.college}</div>
            <span className="text-[10px] font-mono text-[#A59E92]">{user.branch}</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[#222] space-y-1">
            <span className="text-[10px] font-mono text-[#A59E92] uppercase">SETTLEMENT ACCOUNT</span>
            <div className="font-mono text-sm text-[#F5F1E8]">Axis Bank {user.accountNumber}</div>
            <span className="text-[10px] font-mono text-[#FFD43B]">Primary IMPS Core Switch</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[#222] space-y-1">
            <span className="text-[10px] font-mono text-[#A59E92] uppercase">KYC LEVEL</span>
            <div className="font-semibold text-sm text-[#FFD43B]">{user.kycStatus}</div>
            <span className="text-[10px] font-mono text-[#A59E92]">Max Limit: ₹1,00,000 / day</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: SECURITY CONTROLS */}
      <section className="p-6 rounded-2xl border border-[#262626] bg-[#141414] space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#222]">
          <ShieldCheck className="w-4 h-4 text-[#FFD43B]" />
          <h2 className="text-xs font-mono font-bold tracking-wider uppercase text-[#F5F1E8]">
            SECURITY & REAL-TIME THREAT CONTROLS
          </h2>
        </div>

        <div className="space-y-3">
          {/* Control 1: Transaction Alerts */}
          <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[#222] flex items-center justify-between">
            <div>
              <div className="font-mono text-xs font-bold text-[#F5F1E8]">
                TRANSACTION INTERCEPTION ALERTS
              </div>
              <p className="text-[11px] text-[#A59E92] mt-0.5">
                Notify instantly when anomalous amount or timing deviation exceeds baseline.
              </p>
            </div>
            <button
              onClick={() => toggleSetting('transactionAlerts')}
              className={`w-11 h-6 rounded-full p-1 transition-colors ${
                settings.transactionAlerts ? 'bg-[#FFD43B]' : 'bg-[#2a2a2a]'
              }`}
            >
              <div 
                className={`w-4 h-4 rounded-full bg-[#090909] transform transition-transform ${
                  settings.transactionAlerts ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Control 2: New Device Alerts */}
          <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[#222] flex items-center justify-between">
            <div>
              <div className="font-mono text-xs font-bold text-[#F5F1E8]">
                NEW DEVICE HARDWARE ATTESTATION
              </div>
              <p className="text-[11px] text-[#A59E92] mt-0.5">
                Block payments originating from unverified IMEI signatures until biometric OTP challenge.
              </p>
            </div>
            <button
              onClick={() => toggleSetting('newDeviceAlerts')}
              className={`w-11 h-6 rounded-full p-1 transition-colors ${
                settings.newDeviceAlerts ? 'bg-[#FFD43B]' : 'bg-[#2a2a2a]'
              }`}
            >
              <div 
                className={`w-4 h-4 rounded-full bg-[#090909] transform transition-transform ${
                  settings.newDeviceAlerts ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Control 3: High Risk Payment Warnings */}
          <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[#222] flex items-center justify-between">
            <div>
              <div className="font-mono text-xs font-bold text-[#E53935]">
                HIGH-RISK PAYMENT WARNINGS & ESCROW FREEZE
              </div>
              <p className="text-[11px] text-[#A59E92] mt-0.5">
                Automatically hold transfers above risk threshold 85/100 in cryptographic escrow.
              </p>
            </div>
            <button
              onClick={() => toggleSetting('highRiskWarnings')}
              className={`w-11 h-6 rounded-full p-1 transition-colors ${
                settings.highRiskWarnings ? 'bg-[#E53935]' : 'bg-[#2a2a2a]'
              }`}
            >
              <div 
                className={`w-4 h-4 rounded-full bg-[#090909] transform transition-transform ${
                  settings.highRiskWarnings ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Control 4: Voice Assistant Integration */}
          <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[#222] flex items-center justify-between">
            <div>
              <div className="font-mono text-xs font-bold text-[#F5F1E8]">
                FINVOICE MULTILINGUAL ASSISTANT
              </div>
              <p className="text-[11px] text-[#A59E92] mt-0.5">
                Enable voice synthesis and spoken risk audit walkthroughs.
              </p>
            </div>
            <button
              onClick={() => toggleSetting('voiceAssistant')}
              className={`w-11 h-6 rounded-full p-1 transition-colors ${
                settings.voiceAssistant ? 'bg-[#FFD43B]' : 'bg-[#2a2a2a]'
              }`}
            >
              <div 
                className={`w-4 h-4 rounded-full bg-[#090909] transform transition-transform ${
                  settings.voiceAssistant ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: LANGUAGE SELECTOR */}
      <section className="p-6 rounded-2xl border border-[#262626] bg-[#141414] space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#222]">
          <Globe className="w-4 h-4 text-[#FFD43B]" />
          <h2 className="text-xs font-mono font-bold tracking-wider uppercase text-[#F5F1E8]">
            PREFERRED SYSTEM & SPEECH LANGUAGE
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`p-3 rounded-xl border text-center transition-all ${
                language === lang.code
                  ? 'bg-[#FFD43B] border-[#FFD43B] text-[#090909] font-bold shadow-[0_0_15px_rgba(255,212,59,0.25)]'
                  : 'bg-[#0a0a0a] border-[#222] text-[#A59E92] hover:text-[#F5F1E8] hover:border-[#333]'
              }`}
            >
              <div className="text-base font-bold">{lang.native}</div>
              <div className="text-[10px] font-mono mt-0.5 uppercase tracking-wider">{lang.label}</div>
            </button>
          ))}
        </div>
      </section>

      {/* SECTION 4: APPEARANCE & SECURITY PALETTE */}
      <section className="p-6 rounded-2xl border border-[#262626] bg-[#141414] space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#222]">
          <Palette className="w-4 h-4 text-[#FFD43B]" />
          <h2 className="text-xs font-mono font-bold tracking-wider uppercase text-[#F5F1E8]">
            DESIGN PHILOSOPHY & PALETTE SPECIFICATION
          </h2>
        </div>

        <div className="p-4 rounded-xl bg-[#090909] border border-[#222] space-y-3 font-mono text-xs">
          <div className="text-[#FFD43B] font-bold">
            PALETTE CONSTRAINT: ABSOLUTELY ZERO BLUE
          </div>
          <p className="text-[11px] text-[#A59E92] font-sans">
            RUPAYRA pairs Japanese sumi-e watercolor aesthetics with high-performance fintech security styling. Warm yellow represents trust and active transactions; crimson red isolates high-velocity threats and mule rings; deep black provides an ink-like backdrop.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="px-2 py-1 rounded bg-[#090909] border border-[#333] text-[#F5F1E8] text-[10px]">
              Near-Black #090909
            </span>
            <span className="px-2 py-1 rounded bg-[#FFD43B] text-[#090909] text-[10px] font-bold">
              Warm Yellow #FFD43B
            </span>
            <span className="px-2 py-1 rounded bg-[#E53935] text-white text-[10px] font-bold">
              Crimson Red #E53935
            </span>
            <span className="px-2 py-1 rounded bg-[#1c1c1c] text-[#D9822B] text-[10px] font-bold border border-[#D9822B]">
              Muted Orange #D9822B
            </span>
            <span className="px-2 py-1 rounded bg-[#F5F1E8] text-[#090909] text-[10px] font-bold">
              Off-White #F5F1E8
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
