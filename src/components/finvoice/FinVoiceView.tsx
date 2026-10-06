import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Languages, 
  ArrowRight, 
  BarChart3, 
  ShieldAlert, 
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  BrainCircuit,
  Radio,
  Headphones,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SupportedLanguage } from '../../types';
import { FINVOICE_KNOWLEDGE } from '../../data/mockData';

export const FinVoiceView: React.FC = () => {
  const { language, setLanguage } = useApp();
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [response, setResponse] = useState<string>(
    'Tap the microphone or choose any question below to inspect your spending, check group debts, or verify blocked transactions.'
  );
  const [queryType, setQueryType] = useState<'spending' | 'income' | 'blocked' | 'safety' | 'split' | null>(null);
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'finvoice'; text: string; time: string }>>([
    {
      sender: 'finvoice',
      text: 'FinVoice voice assistant ready. Speak naturally in Hindi, English, Tamil, Telugu, or Bengali.',
      time: '10:40 PM'
    }
  ]);

  // Audio animation bars (16 bars for rich extravagance)
  const [waveHeights, setWaveHeights] = useState<number[]>([12, 28, 16, 42, 22, 50, 32, 18, 25, 45, 30, 52, 20, 36, 14, 28]);

  const languagesList: { code: SupportedLanguage; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  ];

  // Animate waveform while listening or speaking
  useEffect(() => {
    if (!isListening && !isSpeaking) {
      setWaveHeights([12, 18, 14, 22, 16, 26, 18, 12, 14, 24, 16, 22, 14, 18, 12, 16]);
      return;
    }

    const interval = setInterval(() => {
      setWaveHeights(prev => prev.map(() => Math.floor(10 + Math.random() * 56)));
    }, 90);

    return () => clearInterval(interval);
  }, [isListening, isSpeaking]);

  // Speech Recognition hook
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;

      const langMap: Record<SupportedLanguage, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        ta: 'ta-IN',
        te: 'te-IN',
        bn: 'bn-IN'
      };
      recognition.lang = langMap[language] || 'en-IN';

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (transcript) {
          processVoiceQuery(transcript);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [language, transcript]);

  const handleToggleMic = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      if (transcript) {
        processVoiceQuery(transcript);
      }
    } else {
      setTranscript('');
      setIsListening(true);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          setTimeout(() => {
            handleSimulatedSpeech("Maine iss month itna zyada kharcha kyun kiya?");
          }, 2000);
        }
      } else {
        setTimeout(() => {
          handleSimulatedSpeech("Maine iss month itna zyada kharcha kyun kiya?");
        }, 1500);
      }
    }
  };

  const handleSimulatedSpeech = (presetQuery: string) => {
    setIsListening(false);
    setTranscript(presetQuery);
    processVoiceQuery(presetQuery);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const voiceLangs: Record<SupportedLanguage, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        ta: 'ta-IN',
        te: 'te-IN',
        bn: 'bn-IN'
      };
      utterance.lang = voiceLangs[language] || 'en-IN';
      utterance.rate = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const processVoiceQuery = (query: string) => {
    const lower = query.toLowerCase();
    const knowledge = FINVOICE_KNOWLEDGE[language] || FINVOICE_KNOWLEDGE.en;

    let ans = '';
    let category: 'spending' | 'income' | 'blocked' | 'safety' | 'split' = 'spending';

    if (lower.includes('income') || lower.includes('aaya') || lower.includes('paisa aaya') || lower.includes('varavu') || lower.includes('jama')) {
      ans = knowledge.income;
      category = 'income';
    } else if (lower.includes('blocked') || lower.includes('roka') || lower.includes('hold') || lower.includes('thadukka') || lower.includes('mule') || lower.includes('kyun')) {
      ans = knowledge.blocked;
      category = 'blocked';
    } else if (lower.includes('safe') || lower.includes('safety') || lower.includes('suraksha') || lower.includes('score')) {
      ans = knowledge.safety;
      category = 'safety';
    } else if (lower.includes('split') || lower.includes('hostel') || lower.includes('dinner') || lower.includes('rahul') || lower.includes('settle')) {
      ans = knowledge.split;
      category = 'split';
    } else {
      ans = knowledge.spending;
      category = 'spending';
    }

    setResponse(ans);
    setQueryType(category);

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatHistory(prev => [
      ...prev,
      { sender: 'user', text: query, time: now },
      { sender: 'finvoice', text: ans, time: now }
    ]);

    speakText(ans);
  };

  const sampleQuestions = [
    {
      label: 'Spending Review',
      query: 'Maine iss month itna zyada kharcha kyun kiya?',
      type: 'spending'
    },
    {
      label: 'Blocked Payment Reason',
      query: 'Why was the ₹48,000 payment paused?',
      type: 'blocked'
    },
    {
      label: 'Monthly Deposits',
      query: 'Mere account mein pichle mahine kitna paisa aaya?',
      type: 'income'
    },
    {
      label: 'Roommate Debt Status',
      query: 'How much does Rahul owe me for hostel dinner?',
      type: 'split'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#222222]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#FFD43B]/10 border border-[#FFD43B]/30 text-[#FFD43B] font-mono text-xs font-bold flex items-center gap-1.5">
              <BrainCircuit className="w-3.5 h-3.5" />
              FINVOICE INTELLIGENCE CORE
            </span>
            <span className="text-[11px] font-mono text-[#A59E92]">NATURAL INDIAN VOICE RECOGNITION</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black font-mono tracking-tight text-[#F5F1E8] uppercase mt-1">
            FINVOICE • VOICE ASSISTANT
          </h1>
          <p className="text-xs text-[#A59E92] font-mono">
            Ask questions in your mother tongue about recent bills, debts owed by friends, or why a payment was safely paused.
          </p>
        </div>

        {/* Language Selector (Tactile Geometric Buttons) */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#141414] border border-[#262626]">
          {languagesList.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all ${
                language === lang.code
                  ? 'bg-[#FFD43B] text-[#090909] shadow-[0_0_10px_rgba(255,212,59,0.3)]'
                  : 'text-[#A59E92] hover:text-[#F5F1E8]'
              }`}
            >
              {lang.native}
            </button>
          ))}
        </div>
      </div>

      {/* Main Extravagant Voice Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Concentric Acoustic Ripples & Metallic Mic Plinth */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 rounded-2xl border border-[#2b2b2b] bg-[#121212] relative overflow-hidden text-center shadow-2xl">
          {/* Ambient Japanese Gold Wash Background */}
          <div 
            className="absolute inset-0 pointer-events-none transition-all duration-700"
            style={{
              background: isListening 
                ? 'radial-gradient(circle, rgba(229,57,53,0.18) 0%, transparent 70%)'
                : isSpeaking
                ? 'radial-gradient(circle, rgba(255,212,59,0.18) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(255,212,59,0.05) 0%, transparent 70%)'
            }}
          />

          {/* Quick Action Badges (Geometric Tag Strips) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 relative z-10">
            {['SPEAK IN HINDI', 'CHECK DEBTS', 'VERIFY SAFETY', 'PLAIN ENGLISH', 'ZERO JARGON'].map((action, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-md bg-[#1a1a1a] border border-[#2d2d2d] text-[10px] font-mono font-bold tracking-wider text-[#A59E92]"
              >
                {action}
              </span>
            ))}
          </div>

          {/* Multi-frequency Extravagant Acoustic Spectrum Visualizer */}
          <div className="flex items-center justify-center gap-1.5 h-16 mb-8 relative z-10">
            {waveHeights.map((h, idx) => (
              <motion.div
                key={idx}
                className={`w-1.5 rounded-sm transition-all duration-100 ${
                  isListening 
                    ? 'bg-[#E53935] shadow-[0_0_8px_#E53935]' 
                    : isSpeaking 
                    ? 'bg-[#FFD43B] shadow-[0_0_8px_#FFD43B]' 
                    : 'bg-[#2a2a2a]'
                }`}
                style={{ height: `${h}px` }}
              />
            ))}
          </div>

          {/* Concentric Golden Acoustic Ripple Rings + Center Microphone Plinth */}
          <div className="relative mb-6 flex items-center justify-center">
            {/* Concentric Wave 1 */}
            <motion.div
              animate={
                isListening || isSpeaking
                  ? { scale: [1, 1.45, 1], opacity: [0.6, 0.1, 0.6] }
                  : { scale: [1, 1.08, 1], opacity: [0.3, 0.15, 0.3] }
              }
              transition={{ repeat: Infinity, duration: isListening ? 1.2 : 2.5, ease: 'easeInOut' }}
              className={`absolute w-44 h-44 rounded-2xl border-2 pointer-events-none ${
                isListening ? 'border-[#E53935]/40' : 'border-[#FFD43B]/30'
              }`}
            />

            {/* Concentric Wave 2 */}
            <motion.div
              animate={
                isListening || isSpeaking
                  ? { scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }
                  : { scale: [1, 1.25, 1], opacity: [0.2, 0.05, 0.2] }
              }
              transition={{ repeat: Infinity, duration: isListening ? 1.6 : 3.2, ease: 'easeInOut', delay: 0.3 }}
              className={`absolute w-44 h-44 rounded-2xl border pointer-events-none ${
                isListening ? 'border-[#E53935]/25' : 'border-[#FFD43B]/20'
              }`}
            />

            {/* Main Interactive Mic Button (Tactile Chamfered Bevel Plinth) */}
            <button
              onClick={handleToggleMic}
              className={`w-32 h-32 rounded-2xl border-2 flex flex-col items-center justify-center relative z-10 transition-all shadow-2xl active:scale-95 cursor-pointer ${
                isListening
                  ? 'bg-[#E53935] border-white text-white shadow-[0_0_35px_rgba(229,57,53,0.6)]'
                  : isSpeaking
                  ? 'bg-[#FFD43B] border-[#090909] text-[#090909] shadow-[0_0_35px_rgba(255,212,59,0.5)]'
                  : 'bg-[#181818] border-[#FFD43B]/60 text-[#FFD43B] hover:border-[#FFD43B] hover:bg-[#202020] shadow-[0_0_25px_rgba(255,212,59,0.2)]'
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-10 h-10 animate-bounce" />
                  <span className="text-[10px] font-mono font-bold mt-1 tracking-wider">TAP TO STOP</span>
                </>
              ) : isSpeaking ? (
                <>
                  <Volume2 className="w-10 h-10 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold mt-1 tracking-wider">SPEAKING</span>
                </>
              ) : (
                <>
                  <Mic className="w-10 h-10" />
                  <span className="text-[10px] font-mono font-bold mt-1 tracking-wider">TAP TO ASK</span>
                </>
              )}
            </button>
          </div>

          <div className="text-xs font-mono font-bold tracking-widest uppercase text-[#F5F1E8]">
            {isListening ? 'LISTENING... SPEAK IN YOUR LANGUAGE' : isSpeaking ? 'FINVOICE ANSWERING...' : 'TAP MICROPHONE TO SPEAK'}
          </div>
          <p className="text-[11px] font-mono text-[#A59E92] mt-1 max-w-sm">
            {transcript ? `"${transcript}"` : 'Works natively in your browser with real-time speech synthesis.'}
          </p>

          {/* Quick Query Cards (Direct Layperson Questions) */}
          <div className="mt-8 pt-6 border-t border-[#222] w-full text-left">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-mono text-[#A59E92] uppercase font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FFD43B]" />
                POPULAR QUICK QUESTIONS:
              </span>
              <span className="text-[10px] font-mono text-[#FFD43B]">CLICK TO AUDIT</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSimulatedSpeech(q.query)}
                  className="p-3 rounded-lg bg-[#0e0e0e] border border-[#222] hover:border-[#FFD43B]/60 text-left transition-colors group"
                >
                  <span className="text-[9px] font-mono text-[#FFD43B] font-bold block">
                    {q.label}
                  </span>
                  <span className="text-xs text-[#A59E92] group-hover:text-[#F5F1E8] line-clamp-1">
                    "{q.query}"
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Plain-English Intelligence Breakdown & Speech Log */}
        <div className="lg:col-span-6 space-y-6">
          {/* Active Voice Response Card */}
          <div className="p-6 rounded-2xl border border-[#2b2b2b] bg-[#141414] relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-[#222]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFD43B]" />
                <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-[#F5F1E8]">
                  VOICE INTELLIGENCE ANSWER
                </h3>
              </div>
              <button
                onClick={() => speakText(response)}
                className="px-2.5 py-1 rounded-md bg-[#1e1e1e] text-[#A59E92] hover:text-[#FFD43B] transition-colors flex items-center gap-1 text-xs font-mono"
                title="Replay Audio"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Replay</span>
              </button>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-[#090909] border border-[#222222]">
              <p className="text-sm md:text-base text-[#F5F1E8] leading-relaxed font-sans font-medium">
                {response}
              </p>
            </div>

            {/* Contextual Visualizer for Spending Query */}
            {queryType === 'spending' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-[#181818] border border-[#2e2e2e] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#FFD43B] uppercase">
                    SPENDING VARIANCE • FOOD DELIVERY
                  </span>
                  <span className="text-xs font-mono text-[#E53935] font-bold">
                    +₹1,100 HIGHER THIS MONTH
                  </span>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs font-mono text-[#A59E92]">
                      <span>THIS MONTH (SEPTEMBER)</span>
                      <span className="text-[#F5F1E8] font-bold">₹3,200</span>
                    </div>
                    <div className="w-full h-2 rounded bg-[#090909] mt-1 overflow-hidden">
                      <div className="h-full bg-[#E53935] rounded w-[100%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono text-[#A59E92]">
                      <span>LAST MONTH (AUGUST)</span>
                      <span className="text-[#F5F1E8] font-bold">₹2,100</span>
                    </div>
                    <div className="w-full h-2 rounded bg-[#090909] mt-1 overflow-hidden">
                      <div className="h-full bg-[#FFD43B] rounded w-[65%]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Contextual Visualizer for Blocked Query (Plain English) */}
            {queryType === 'blocked' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-[#241010] border border-[#E53935]/40 space-y-2"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-[#E53935] font-bold">
                  <ShieldAlert className="w-4 h-4" />
                  <span>TRANSACTION #TXN-984210 SAFELY PAUSED</span>
                </div>
                <p className="text-xs text-[#F5F1E8] font-sans leading-relaxed">
                  The recipient UPI address was reported in 3 police cybercrime fraud cases. We held your ₹48,000 in the Rupayra Safe Vault so you don't lose any hard-earned savings.
                </p>
              </motion.div>
            )}

            {/* Contextual Visualizer for Split Query */}
            {queryType === 'split' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-[#121812] border border-[#10B981]/40 space-y-2"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-[#10B981] font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>GROUP SETTLEMENT STATUS</span>
                </div>
                <p className="text-xs text-[#F5F1E8] font-sans leading-relaxed">
                  Rahul owes you ₹850 from the SRM Hackathon Hostel Dinner bill. You can tap "Remind" or "Mark Paid" in the SplitPay tab anytime.
                </p>
              </motion.div>
            )}
          </div>

          {/* Transcript History Feed */}
          <div className="p-6 rounded-2xl border border-[#262626] bg-[#141414] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#222]">
              <h4 className="text-xs font-mono font-bold tracking-wider uppercase text-[#F5F1E8]">
                VOICE SESSION LOG
              </h4>
              <span className="text-[10px] font-mono text-[#10B981] flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm bg-[#10B981] animate-ping" />
                ACTIVE SESSION
              </span>
            </div>

            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {chatHistory.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg text-xs font-mono ${
                    item.sender === 'user'
                      ? 'bg-[#1e1e1e] border border-[#333] ml-4 text-[#F5F1E8]'
                      : 'bg-[#0f0f0f] border border-[#222] mr-4 text-[#A59E92]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[9px] mb-1">
                    <span className={item.sender === 'user' ? 'text-[#FFD43B] font-bold' : 'text-[#10B981] font-bold'}>
                      {item.sender === 'user' ? 'YOU (VOICE)' : 'RUPAYRA ASSISTANT'}
                    </span>
                    <span className="text-[#666]">{item.time}</span>
                  </div>
                  <div>{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
