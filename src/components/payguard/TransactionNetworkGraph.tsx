import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Smartphone, 
  CreditCard, 
  AlertTriangle, 
  Building2, 
  ShieldAlert, 
  X,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  PhoneCall,
  ExternalLink
} from 'lucide-react';

export interface GraphNode {
  id: string;
  type: 'USER' | 'DEVICE' | 'TRANSACTION' | 'RECIPIENT' | 'MULE_X' | 'MULE_Y' | 'MULE_Z';
  label: string;
  sublabel: string;
  shape: 'diamond' | 'hexagon' | 'chamfered' | 'octagon';
  x: number;
  y: number;
  risk: 'SAFE' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  details: {
    title: string;
    metrics: { label: string; value: string | number; color?: string }[];
    description: string;
    warning?: string;
  };
}

export const TransactionNetworkGraph: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Spacious layout (1060px wide canvas) preventing any overlap
  const nodes: GraphNode[] = [
    {
      id: 'node-user',
      type: 'USER',
      label: 'VAIBHAV',
      sublabel: 'Student Account',
      shape: 'diamond',
      x: 90,
      y: 200,
      risk: 'SAFE',
      details: {
        title: 'Authorized Student Account • Vaibhav Sharma',
        metrics: [
          { label: 'UPI VPA', value: 'vaibhav@okaxis' },
          { label: 'KYC Status', value: 'Verified (DigiLocker)', color: '#10B981' },
          { label: 'Avg Monthly Transfer', value: '₹3,240' },
          { label: 'Campus Institution', value: 'SRMIST KTR' }
        ],
        description: 'Primary verified account owner. Clean banking compliance history with zero chargeback disputes.'
      }
    },
    {
      id: 'node-device',
      type: 'DEVICE',
      label: 'NEW DEVICE',
      sublabel: 'OnePlus 12 (Pune)',
      shape: 'hexagon',
      x: 270,
      y: 200,
      risk: 'MEDIUM',
      details: {
        title: 'Device Hardware Signature',
        metrics: [
          { label: 'Model', value: 'OnePlus 12 (CPH2581)' },
          { label: 'Hardware IMEI', value: '8642910••••912' },
          { label: 'IP Geolocation', value: 'Pune, Maharashtra', color: '#D9822B' },
          { label: 'Distance from Baseline', value: '1,180 km in 45m', color: '#E53935' }
        ],
        description: 'Payment was initiated from an unrecognized phone in Pune, whereas user was physically in Chennai 45 minutes prior.',
        warning: 'High-speed physical location mismatch (impossible travel speed).'
      }
    },
    {
      id: 'node-txn',
      type: 'TRANSACTION',
      label: '₹48,000 PAYMENT',
      sublabel: 'UPI Transfer',
      shape: 'chamfered',
      x: 470,
      y: 200,
      risk: 'HIGH',
      details: {
        title: 'Transaction Intercept • TXN-984210',
        metrics: [
          { label: 'Amount', value: '₹48,000.00', color: '#E53935' },
          { label: 'Status', value: 'Money Protected (Paused)', color: '#10B981' },
          { label: 'Time', value: '10:42 PM IST' },
          { label: 'Deviation Factor', value: '14.8x Higher', color: '#E53935' }
        ],
        description: 'Single anomalous payment instruction attempting full withdrawal of student stipend funds.',
        warning: 'Blocked at gateway level before any money left the bank.'
      }
    },
    {
      id: 'node-recipient',
      type: 'RECIPIENT',
      label: 'NEW RECIPIENT',
      sublabel: 'rahul@upi',
      shape: 'hexagon',
      x: 670,
      y: 200,
      risk: 'HIGH',
      details: {
        title: 'Beneficiary Intelligence • rahul@upi',
        metrics: [
          { label: 'Recipient VPA', value: 'rahul@upi' },
          { label: 'Prior Transactions', value: '14 deposits' },
          { label: 'Dispute Velocity', value: '7 txns / 20 mins', color: '#E53935' },
          { label: 'Linked Mule Flags', value: '3 Confirmed Accounts', color: '#E53935' }
        ],
        description: 'Freshly registered UPI ID created 48 hours ago. Immediately began routing high-velocity deposits to known pooling bank accounts.',
        warning: 'Identified as active mule recruitment node by Cyber Crime Cell.'
      }
    },
    {
      id: 'node-mule-x',
      type: 'MULE_X',
      label: 'FAKE ACCT X',
      sublabel: 'HDFC Mule #8812',
      shape: 'octagon',
      x: 910,
      y: 90,
      risk: 'CRITICAL',
      details: {
        title: 'Mule Account Layer 1 • HDFC Thane',
        metrics: [
          { label: 'Bank Entity', value: 'HDFC Savings Bank' },
          { label: 'Police Circular', value: 'CC/2026/09/Thane-91', color: '#E53935' },
          { label: 'Risk Score', value: '98 / 100', color: '#E53935' },
          { label: 'Status', value: 'Under Police Freeze', color: '#E53935' }
        ],
        description: 'Compromised student account used to pool illegal deposits across multiple college campuses.',
        warning: 'Account currently subject to freeze circular under IT Act 66D.'
      }
    },
    {
      id: 'node-mule-y',
      type: 'MULE_Y',
      label: 'FAKE ACCT Y',
      sublabel: 'Crypto Gateway',
      shape: 'octagon',
      x: 910,
      y: 200,
      risk: 'CRITICAL',
      details: {
        title: 'Mule Account Layer 2 • Crypto Remittance',
        metrics: [
          { label: 'Entity Purpose', value: 'Rapid P2P Fiat Drain' },
          { label: 'Laundering Rate', value: '₹18.4L in 3h', color: '#E53935' },
          { label: 'National Registry', value: 'I4C High Threat', color: '#E53935' }
        ],
        description: 'Intermediary account designed to swiftly convert INR funds into unregulated offshore USDT tokens within 4 minutes.',
        warning: 'Funds routed here are nearly impossible to reverse once completed.'
      }
    },
    {
      id: 'node-mule-z',
      type: 'MULE_Z',
      label: 'FAKE ACCT Z',
      sublabel: 'Offshore P2P Wallet',
      shape: 'octagon',
      x: 910,
      y: 310,
      risk: 'CRITICAL',
      details: {
        title: 'Mule Account Layer 3 • Offshore Wallet',
        metrics: [
          { label: 'Destination Rail', value: 'Decentralized P2P' },
          { label: 'Laundering Syndicate', value: 'Cluster-Delta-88', color: '#E53935' },
          { label: 'Recovery Rate', value: '< 2.4%', color: '#E53935' }
        ],
        description: 'Terminal wash node. RUPAYRA intercepted the payment before it reached this irreversible layer.',
        warning: 'Real-time hold stopped the money from vanishing offshore.'
      }
    }
  ];

  // SVG curved connecting lines between nodes
  const connections = [
    { from: 'node-user', to: 'node-device', flag: false },
    { from: 'node-device', to: 'node-txn', flag: true },
    { from: 'node-txn', to: 'node-recipient', flag: true },
    { from: 'node-recipient', to: 'node-mule-x', flag: true },
    { from: 'node-recipient', to: 'node-mule-y', flag: true },
    { from: 'node-recipient', to: 'node-mule-z', flag: true }
  ];

  const getNodeIcon = (type: GraphNode['type']) => {
    switch (type) {
      case 'USER':
        return <User className="w-4 h-4 text-[#FFD43B]" />;
      case 'DEVICE':
        return <Smartphone className="w-4 h-4 text-[#D9822B]" />;
      case 'TRANSACTION':
        return <CreditCard className="w-4 h-4 text-[#E53935]" />;
      case 'RECIPIENT':
        return <AlertTriangle className="w-4 h-4 text-[#E53935]" />;
      case 'MULE_X':
      case 'MULE_Y':
      case 'MULE_Z':
        return <Building2 className="w-4 h-4 text-[#E53935]" />;
      default:
        return <ShieldAlert className="w-4 h-4 text-[#FFD43B]" />;
    }
  };

  return (
    <div className="relative rounded-xl border border-[#262626] bg-[#0c0c0c] overflow-hidden">
      {/* Graph Toolbar */}
      <div className="p-4 border-b border-[#1f1f1f] flex flex-wrap items-center justify-between gap-3 bg-[#111111]/90 backdrop-blur-sm z-10 relative">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-[#1f1f1f] border border-[#333] flex items-center justify-center text-[#FFD43B]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold tracking-wider text-[#F5F1E8] uppercase">
              TRANSACTION FORENSIC NETWORK
            </h3>
            <p className="text-[11px] text-[#A59E92] font-sans">
              Tracing 3 degrees of fake bank connections • Tap any node to inspect evidence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-[#181818] border border-[#2a2a2a] rounded-lg px-2 py-1">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.35))}
              className="text-[#A59E92] hover:text-[#F5F1E8] p-1"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono text-[#A59E92] px-1">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.75))}
              className="text-[#A59E92] hover:text-[#F5F1E8] p-1"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="text-[#A59E92] hover:text-[#FFD43B] p-1 ml-1"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Legend (Geometric Shapes, NO PILLS) */}
          <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono pl-2">
            <span className="flex items-center gap-1.5 text-[#10B981]">
              <span className="w-2.5 h-2.5 bg-[#10B981] rotate-45 inline-block" /> Safe
            </span>
            <span className="flex items-center gap-1.5 text-[#D9822B]">
              <span className="w-2.5 h-2.5 bg-[#D9822B] inline-block" /> Suspicious
            </span>
            <span className="flex items-center gap-1.5 text-[#E53935]">
              <span className="w-2.5 h-2.5 bg-[#E53935] inline-block" /> Fraud Ring
            </span>
          </div>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative w-full h-[420px] overflow-auto select-none flex items-center justify-center p-4">
        {/* Subtle geometric grid backdrop */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #333333 1px, transparent 1px)`,
            backgroundSize: '28px 28px'
          }}
        />

        <div 
          className="relative transition-transform duration-200"
          style={{ 
            width: '1060px', 
            height: '400px',
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center'
          }}
        >
          {/* Animated SVG Path Network */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="line-safe" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFD43B" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
              </linearGradient>

              <linearGradient id="line-danger" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D9822B" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#E53935" stopOpacity="0.9" />
              </linearGradient>

              <filter id="laser-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {connections.map((conn, idx) => {
              const fromNode = nodes.find(n => n.id === conn.from)!;
              const toNode = nodes.find(n => n.id === conn.to)!;
              const isFlagged = conn.flag;

              // Smooth Bezier Curve Path
              const midX = (fromNode.x + toNode.x) / 2;
              const pathD = `M ${fromNode.x} ${fromNode.y} C ${midX} ${fromNode.y}, ${midX} ${toNode.y}, ${toNode.x} ${toNode.y}`;

              return (
                <g key={idx}>
                  {/* Outer glow line */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={isFlagged ? '#E53935' : '#FFD43B'}
                    strokeWidth={isFlagged ? 3 : 2}
                    strokeDasharray={isFlagged ? '6,4' : 'none'}
                    opacity={isFlagged ? 0.85 : 0.45}
                  />

                  {/* Flowing Energy Packet Animation */}
                  {isFlagged && (
                    <circle r="3.5" fill="#E53935" filter="url(#laser-glow)">
                      <animateMotion
                        path={pathD}
                        dur={idx % 2 === 0 ? "2s" : "2.4s"}
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Interactive Geometric Nodes */}
          {nodes.map((node, i) => {
            const isCritical = node.risk === 'CRITICAL' || node.risk === 'HIGH';
            const isMedium = node.risk === 'MEDIUM';
            const isSelected = selectedNode?.id === node.id;

            return (
              <motion.div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.96 }}
                animate={{
                  y: [node.y - 2, node.y + 2, node.y - 2],
                }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                  isSelected ? 'z-30' : 'z-10'
                }`}
                style={{ left: node.x, top: node.y }}
              >
                {/* Node Container with Geometric Bevel (NO PILL SHAPES) */}
                <div
                  className={`p-3.5 border transition-all duration-300 flex flex-col items-center text-center relative ${
                    node.shape === 'diamond' 
                      ? 'rounded-md rotate-0' 
                      : node.shape === 'hexagon'
                      ? 'rounded-lg'
                      : node.shape === 'chamfered'
                      ? 'rounded-md border-2'
                      : 'rounded-lg border-2'
                  } ${
                    isCritical
                      ? 'bg-[#1c0a0a]/95 border-[#E53935] shadow-[0_0_22px_rgba(229,57,53,0.35)]'
                      : isMedium
                      ? 'bg-[#181109]/95 border-[#D9822B] shadow-[0_0_18px_rgba(217,130,43,0.25)]'
                      : 'bg-[#121412]/95 border-[#10B981] shadow-[0_0_18px_rgba(16,185,129,0.25)]'
                  } ${isSelected ? 'ring-2 ring-[#FFD43B]' : ''}`}
                  style={{ minWidth: '124px' }}
                >
                  {/* Icon with Geometric Badge */}
                  <div className={`p-1.5 rounded mb-1.5 ${
                    isCritical ? 'bg-[#2b1010]' : isMedium ? 'bg-[#22160d]' : 'bg-[#0f1f15]'
                  }`}>
                    {getNodeIcon(node.type)}
                  </div>

                  <span className={`text-xs font-mono font-bold tracking-tight ${
                    isCritical ? 'text-[#E53935]' : isMedium ? 'text-[#D9822B]' : 'text-[#10B981]'
                  }`}>
                    {node.label}
                  </span>

                  <span className="text-[10px] font-sans text-[#A59E92] mt-0.5 max-w-[110px] truncate">
                    {node.sublabel}
                  </span>

                  {/* Warning Indicator */}
                  {isCritical && (
                    <span className="mt-1.5 px-1.5 py-0.2 rounded bg-[#E53935] text-white font-mono text-[8px] font-black uppercase tracking-wider">
                      MULE RING
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Node Telemetry Inspector Drawer */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="p-5 border-t border-[#222222] bg-[#111111] relative z-20"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-black uppercase ${
                    selectedNode.risk === 'CRITICAL' || selectedNode.risk === 'HIGH'
                      ? 'bg-[#E53935] text-white'
                      : selectedNode.risk === 'MEDIUM'
                      ? 'bg-[#D9822B] text-black'
                      : 'bg-[#10B981] text-white'
                  }`}>
                    {selectedNode.type.replace('_', ' ')}
                  </span>
                  <h4 className="text-sm font-mono font-bold text-[#F5F1E8]">
                    {selectedNode.details.title}
                  </h4>
                </div>
                <p className="text-xs text-[#A59E92] mt-1 max-w-2xl font-sans">
                  {selectedNode.details.description}
                </p>
              </div>

              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 rounded text-[#A59E92] hover:text-[#F5F1E8] hover:bg-[#202020]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              {selectedNode.details.metrics.map((m, idx) => (
                <div key={idx} className="p-2.5 rounded bg-[#181818] border border-[#262626]">
                  <span className="text-[10px] text-[#A59E92] uppercase block">
                    {m.label}
                  </span>
                  <span 
                    className="text-xs font-bold block mt-0.5 truncate"
                    style={{ color: m.color || '#F5F1E8' }}
                  >
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            {selectedNode.details.warning && (
              <div className="mt-3 p-2.5 rounded bg-[#251010] border border-[#E53935]/40 flex items-center gap-2 text-xs font-mono text-[#E53935]">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{selectedNode.details.warning}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
