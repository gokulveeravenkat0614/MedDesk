import React, { useState } from 'react';
import {
  Brain, Heart, Activity, ShieldCheck, Stethoscope,
  Maximize2, X, ChevronRight, AlertCircle, RefreshCw, Lock
} from 'lucide-react';
import { ANATOMY_SYSTEMS } from '../data/anatomySystems';

export const AnatomyViewer = () => {
  const [selectedSystem, setSelectedSystem] = useState(ANATOMY_SYSTEMS[2]); // Default: Cardiovascular
  const [isScanning, setIsScanning] = useState(false);

  const handleScanRefresh = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1200);
  };

  const getSystemIcon = (id) => {
    switch (id) {
      case 'brain':
        return <Brain className="w-4 h-4 text-purple-600" />;
      case 'respiratory':
        return <Activity className="w-4 h-4 text-cyan-600" />;
      case 'cardiovascular':
        return <Heart className="w-4 h-4 text-rose-500 animate-pulse" />;
      case 'digestive':
        return <Activity className="w-4 h-4 text-amber-500" />;
      case 'musculoskeletal':
        return <Stethoscope className="w-4 h-4 text-emerald-600" />;
      default:
        return <Activity className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-b from-blue-50/50 via-white/80 to-slate-50/60 rounded-3xl border border-white/90 shadow-glass overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header of Anatomy Card */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
            <h3 className="text-sm font-bold text-slate-800 tracking-tight">
              Anatomical System Diagnostic
            </h3>
            <span className="text-[10px] font-bold text-primary bg-blue-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Live Biometrics
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Click hot-points to inspect authorized physiological metrics
          </p>
        </div>

        <button
          onClick={handleScanRefresh}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-blue-50 border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-xs transition-all"
          title="Run Biometric Scan"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-primary ${isScanning ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Refresh Scan</span>
        </button>
      </div>

      {/* Subtle Security Indicators Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 pt-1 pb-1">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1677FF] border border-blue-200/60 text-[10px] font-bold">
          <ShieldCheck className="w-3 h-3 text-[#1677FF]" />
          Secure Health Data
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 security-dot-active" />
          Authorized Access
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200/60 text-[10px] font-bold">
          <Lock className="w-3 h-3 text-cyan-600" />
          Protected
        </span>
      </div>

      {/* Central Visual Stage */}
      <div className="relative flex-1 min-h-[360px] sm:min-h-[420px] flex items-center justify-center my-2">
        
        {/* Synthetic Anatomical Silhouette SVG */}
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] h-[340px] sm:h-[400px] flex items-center justify-center">
          
          <svg
            viewBox="0 0 200 440"
            className="w-full h-full drop-shadow-md select-none transition-all duration-300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ambient Body Glow */}
            <path
              d="M100 20 C112 20 120 28 120 45 C120 60 114 70 110 74 C122 78 140 86 150 102 C158 116 160 148 158 178 C156 198 152 230 148 245 C146 250 144 260 144 275 C144 295 142 320 138 350 C134 380 130 410 126 426 C124 432 118 434 112 434 C106 434 104 428 104 416 C104 388 102 330 101 280 L99 280 C98 330 96 388 96 416 C96 428 94 434 88 434 C82 434 76 432 74 426 C70 410 66 380 62 350 C58 320 56 295 56 275 C56 260 54 250 52 245 C48 230 44 198 42 178 C40 148 42 116 50 102 C60 86 78 78 90 74 C86 70 80 60 80 45 C80 28 88 20 100 20 Z"
              fill="url(#bodyGradient)"
              opacity="0.85"
            />

            {/* Futuristic Tech Contours & Skeleton lines */}
            <path
              d="M100 75 L100 270"
              stroke="#1677FF"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              opacity="0.4"
            />
            {/* Ribcage arcs */}
            <path d="M82 120 Q100 128 118 120" stroke="#38BDF8" strokeWidth="1" opacity="0.6" />
            <path d="M80 135 Q100 145 120 135" stroke="#38BDF8" strokeWidth="1" opacity="0.6" />
            <path d="M82 150 Q100 160 118 150" stroke="#38BDF8" strokeWidth="1" opacity="0.6" />
            <path d="M85 165 Q100 174 115 165" stroke="#38BDF8" strokeWidth="1" opacity="0.6" />
            
            {/* Pelvis curve */}
            <path d="M80 230 Q100 245 120 230" stroke="#94A3B8" strokeWidth="1.2" opacity="0.5" />

            {/* Linear Scanning Beam (when refresh is clicked) */}
            {isScanning && (
              <line
                x1="20"
                y1="50"
                x2="180"
                y2="50"
                stroke="#1677FF"
                strokeWidth="2.5"
                filter="url(#glowFilter)"
                className="animate-pulse"
              >
                <animate
                  attributeName="y1"
                  values="30;400;30"
                  dur="1.2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y2"
                  values="30;400;30"
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              </line>
            )}

            {/* Target Nodes on Anatomy */}
            {/* Brain */}
            <circle cx="100" cy="50" r="7" fill="#8B5CF6" fillOpacity="0.3" stroke="#8B5CF6" strokeWidth="1.5" className="animate-ping" />
            <circle cx="100" cy="50" r="4" fill="#8B5CF6" />

            {/* Heart */}
            <circle cx="108" cy="132" r="8" fill="#EF4444" fillOpacity="0.35" stroke="#EF4444" strokeWidth="1.5" className="animate-ping" />
            <circle cx="108" cy="132" r="4.5" fill="#EF4444" />

            {/* Lungs */}
            <circle cx="88" cy="135" r="5" fill="#06B6D4" fillOpacity="0.4" stroke="#06B6D4" strokeWidth="1" />

            {/* Digestive */}
            <circle cx="100" cy="190" r="7" fill="#F59E0B" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="1.5" />
            <circle cx="100" cy="190" r="4" fill="#F59E0B" />

            {/* Musculoskeletal / Joints */}
            <circle cx="68" cy="300" r="5" fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="1" />
            <circle cx="132" cy="300" r="5" fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="1" />

            {/* Gradients */}
            <defs>
              <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E0F2FE" />
                <stop offset="40%" stopColor="#BAE6FD" />
                <stop offset="70%" stopColor="#CBD5E1" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>
              <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
          </svg>

          {/* Interactive Floating Hotspot Callouts */}
          {/* 1. Brain & Nervous System */}
          <div
            onClick={() => setSelectedSystem(ANATOMY_SYSTEMS[0])}
            className={`absolute top-[4%] -left-3 sm:-left-6 cursor-pointer group transition-all duration-200 z-20 ${
              selectedSystem.id === 'brain' ? 'scale-105' : 'hover:scale-102'
            }`}
          >
            <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border backdrop-blur-md shadow-xs ${
              selectedSystem.id === 'brain'
                ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-500/30'
                : 'bg-white/90 text-slate-700 border-slate-200 hover:border-purple-300'
            }`}>
              <Brain className="w-3.5 h-3.5 shrink-0" />
              <div className="text-left">
                <p className="text-[11px] font-bold leading-none">Brain & Nervous</p>
                <p className={`text-[9px] font-medium leading-tight mt-0.5 ${
                  selectedSystem.id === 'brain' ? 'text-purple-100' : 'text-purple-600'
                }`}>
                  Optimal
                </p>
              </div>
            </div>
          </div>

          {/* 2. Cardiovascular System */}
          <div
            onClick={() => setSelectedSystem(ANATOMY_SYSTEMS[2])}
            className={`absolute top-[28%] -left-4 sm:-left-8 cursor-pointer group transition-all duration-200 z-20 ${
              selectedSystem.id === 'cardiovascular' ? 'scale-105' : 'hover:scale-102'
            }`}
          >
            <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border backdrop-blur-md shadow-xs ${
              selectedSystem.id === 'cardiovascular'
                ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/30'
                : 'bg-white/90 text-slate-700 border-slate-200 hover:border-rose-300'
            }`}>
              <Heart className="w-3.5 h-3.5 shrink-0 animate-pulse" />
              <div className="text-left">
                <p className="text-[11px] font-bold leading-none">Cardiovascular</p>
                <p className={`text-[9px] font-medium leading-tight mt-0.5 ${
                  selectedSystem.id === 'cardiovascular' ? 'text-rose-100' : 'text-rose-600'
                }`}>
                  72 BPM • 120/80
                </p>
              </div>
            </div>
          </div>

          {/* 3. Respiratory System */}
          <div
            onClick={() => setSelectedSystem(ANATOMY_SYSTEMS[1])}
            className={`absolute top-[24%] -right-4 sm:-right-8 cursor-pointer group transition-all duration-200 z-20 ${
              selectedSystem.id === 'respiratory' ? 'scale-105' : 'hover:scale-102'
            }`}
          >
            <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border backdrop-blur-md shadow-xs ${
              selectedSystem.id === 'respiratory'
                ? 'bg-cyan-600 text-white border-cyan-500 shadow-md shadow-cyan-500/30'
                : 'bg-white/90 text-slate-700 border-slate-200 hover:border-cyan-300'
            }`}>
              <Activity className="w-3.5 h-3.5 shrink-0" />
              <div className="text-left">
                <p className="text-[11px] font-bold leading-none">Respiratory</p>
                <p className={`text-[9px] font-medium leading-tight mt-0.5 ${
                  selectedSystem.id === 'respiratory' ? 'text-cyan-100' : 'text-cyan-600'
                }`}>
                  SpO2 98%
                </p>
              </div>
            </div>
          </div>

          {/* 4. Digestive System */}
          <div
            onClick={() => setSelectedSystem(ANATOMY_SYSTEMS[3])}
            className={`absolute top-[48%] -right-3 sm:-right-6 cursor-pointer group transition-all duration-200 z-20 ${
              selectedSystem.id === 'digestive' ? 'scale-105' : 'hover:scale-102'
            }`}
          >
            <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border backdrop-blur-md shadow-xs ${
              selectedSystem.id === 'digestive'
                ? 'bg-amber-500 text-white border-amber-400 shadow-md shadow-amber-500/30'
                : 'bg-white/90 text-slate-700 border-slate-200 hover:border-amber-300'
            }`}>
              <Activity className="w-3.5 h-3.5 shrink-0" />
              <div className="text-left">
                <p className="text-[11px] font-bold leading-none">Digestive</p>
                <p className={`text-[9px] font-medium leading-tight mt-0.5 ${
                  selectedSystem.id === 'digestive' ? 'text-amber-100' : 'text-amber-600'
                }`}>
                  Normal
                </p>
              </div>
            </div>
          </div>

          {/* 5. Musculoskeletal System */}
          <div
            onClick={() => setSelectedSystem(ANATOMY_SYSTEMS[4])}
            className={`absolute bottom-[10%] -left-3 sm:-left-6 cursor-pointer group transition-all duration-200 z-20 ${
              selectedSystem.id === 'musculoskeletal' ? 'scale-105' : 'hover:scale-102'
            }`}
          >
            <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border backdrop-blur-md shadow-xs ${
              selectedSystem.id === 'musculoskeletal'
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-500/30'
                : 'bg-white/90 text-slate-700 border-slate-200 hover:border-emerald-300'
            }`}>
              <Stethoscope className="w-3.5 h-3.5 shrink-0" />
              <div className="text-left">
                <p className="text-[11px] font-bold leading-none">Musculoskeletal</p>
                <p className={`text-[9px] font-medium leading-tight mt-0.5 ${
                  selectedSystem.id === 'musculoskeletal' ? 'text-emerald-100' : 'text-emerald-600'
                }`}>
                  5/5 Power
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Selected System Information Overlay Card (Section 10 specification) */}
      {selectedSystem && (
        <div className="relative z-20 bg-white/95 backdrop-blur-xl rounded-2xl p-3.5 border border-slate-200/80 shadow-md animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
                {getSystemIcon(selectedSystem.id)}
              </div>
              <h4 className="text-xs font-bold text-slate-800">
                {selectedSystem.name}
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                Status: {selectedSystem.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-2.5">
            {selectedSystem.vitals.map((v, i) => (
              <div key={i} className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
                <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400 block truncate">
                  {v.label}
                </span>
                <span className="text-xs font-bold text-slate-800 mt-0.5 block truncate">
                  {v.value}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
            {selectedSystem.summary}
          </p>

          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
            <span>Reviewed by: {selectedSystem.doctor}</span>
            <span>Recorded: {selectedSystem.lastAssessed}</span>
          </div>
        </div>
      )}

    </div>
  );
};
