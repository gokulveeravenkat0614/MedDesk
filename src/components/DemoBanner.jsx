import React from 'react';
import { ShieldCheck, UserCheck, Stethoscope, ShieldAlert, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DemoBanner = () => {
  const { currentUser, switchRole } = useApp();

  return (
    <div className="bg-[#0B1736] text-white text-xs py-2 px-4 shadow-sm border-b border-[#102A56] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Security Status Badge & Synthetic Data Disclosure */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-white font-bold text-xs tracking-wide">
            <Lock className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span>Privacy-Focused Clinical Environment</span>
          </div>
          <span className="text-slate-400 text-xs">•</span>
          <span className="text-slate-300 text-[11px] font-medium hidden sm:inline">
            Role-Based Access Enabled • Synthetic Demo Data Only
          </span>
        </div>

        {/* Right: Fast Persona Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-slate-300 text-xs font-semibold">
            Identity
          </span>
          <div className="flex items-center gap-1 bg-[#102A56] p-0.5 rounded-lg border border-slate-700/60">
            <button
              onClick={() => switchRole('patient')}
              className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                currentUser?.role === 'patient'
                  ? 'bg-[#1677FF] text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <UserCheck className="w-3 h-3" />
              <span>Patient</span>
            </button>
            <button
              onClick={() => switchRole('doctor')}
              className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                currentUser?.role === 'doctor'
                  ? 'bg-[#1677FF] text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Stethoscope className="w-3 h-3" />
              <span>Doctor</span>
            </button>
            <button
              onClick={() => switchRole('admin')}
              className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                currentUser?.role === 'admin'
                  ? 'bg-[#1677FF] text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <ShieldAlert className="w-3 h-3" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
