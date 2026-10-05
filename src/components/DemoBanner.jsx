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
          <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/25 tracking-wider uppercase text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 security-dot-active" />
            <span>Security Active</span>
          </div>
          <div className="flex items-center gap-1.5 text-blue-200 text-[11px] font-medium">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-white font-semibold">Protected Records:</span>
            <span className="text-slate-300 hidden md:inline">
              Simulated HIPAA/GDPR clinical environment with strict role-based access control. Synthetic demo data only.
            </span>
          </div>
        </div>

        {/* Right: Fast Persona Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 hidden lg:inline text-[11px] font-semibold uppercase tracking-wider">
            Identity Switcher:
          </span>
          <div className="flex items-center gap-1.5 bg-[#102A56]/60 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => switchRole('patient')}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                currentUser?.role === 'patient'
                  ? 'bg-[#0B63F6] text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <UserCheck className="w-3 h-3" />
              <span>Patient</span>
            </button>
            <button
              onClick={() => switchRole('doctor')}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                currentUser?.role === 'doctor'
                  ? 'bg-[#0B63F6] text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Stethoscope className="w-3 h-3" />
              <span>Doctor</span>
            </button>
            <button
              onClick={() => switchRole('admin')}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                currentUser?.role === 'admin'
                  ? 'bg-[#0B63F6] text-white shadow-xs'
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
