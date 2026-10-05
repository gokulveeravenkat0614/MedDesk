import React from 'react';
import { ShieldCheck, Info, UserCheck, Stethoscope, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DemoBanner = () => {
  const { currentUser, switchRole } = useApp();

  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-xs py-2 px-4 shadow-sm border-b border-blue-800/40 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 bg-blue-500/20 text-blue-300 font-semibold px-2 py-0.5 rounded-full border border-blue-400/30 tracking-wide uppercase text-[10px]">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            SYNTHETIC DEMO DATA
          </span>
          <span className="hidden sm:inline text-slate-300">
            For demonstration & evaluation purposes only • Zero real patient health information
          </span>
        </div>

        {/* Demo Fast-Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 hidden md:inline text-[11px] font-medium">Demo Switcher:</span>
          <button
            onClick={() => switchRole('patient')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 ${
              currentUser?.role === 'patient'
                ? 'bg-primary text-white shadow-sm ring-1 ring-white/30'
                : 'bg-white/10 hover:bg-white/20 text-slate-200'
            }`}
          >
            <UserCheck className="w-3 h-3" />
            Patient
          </button>
          <button
            onClick={() => switchRole('doctor')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 ${
              currentUser?.role === 'doctor'
                ? 'bg-primary text-white shadow-sm ring-1 ring-white/30'
                : 'bg-white/10 hover:bg-white/20 text-slate-200'
            }`}
          >
            <Stethoscope className="w-3 h-3" />
            Doctor
          </button>
          <button
            onClick={() => switchRole('admin')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 ${
              currentUser?.role === 'admin'
                ? 'bg-primary text-white shadow-sm ring-1 ring-white/30'
                : 'bg-white/10 hover:bg-white/20 text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3 h-3" />
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};
