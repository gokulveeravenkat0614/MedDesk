import React from 'react';
import { ShieldCheck, Lock, CheckCircle2, Key, Clock, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SecurityStatusBar = ({ recentActivity = [] }) => {
  const { currentUser } = useApp();

  const defaultActivities = [
    { time: '10:32 AM', event: 'Identity verification confirmed via JWT bearer', status: 'Verified' },
    { time: '10:35 AM', event: 'Authorized clinical record accessed under attending scope', status: 'Authorized' },
    { time: '10:40 AM', event: 'Access control verified appointment modification', status: 'Protected' }
  ];

  const activities = recentActivity.length > 0 ? recentActivity : defaultActivities;

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-4">
      
      {/* Header with Security Status & Live Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B63F6]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
              CareGuard Security Status
            </h4>
            <p className="text-[11px] text-slate-500 font-medium">
              Continuous identity verification, role enforcement, and activity monitoring
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 security-dot-active" />
            <span>Security Active</span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
            Synthetic Demo Data
          </span>
        </div>
      </div>

      {/* 4 Core Cybersecurity Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        
        {/* 1. Secure Session */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Session</span>
            <span className="font-bold text-slate-900 text-xs truncate block">Secure Session</span>
            <span className="text-[10px] text-emerald-600 font-medium">TLS 1.3 Active</span>
          </div>
        </div>

        {/* 2. Identity Verification / Role-Based Access */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0B63F6] flex items-center justify-center shrink-0">
            <Key className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Identity</span>
            <span className="font-bold text-slate-900 text-xs truncate block">Role-Based Access</span>
            <span className="text-[10px] text-[#0B63F6] font-medium capitalize">
              {currentUser?.role === 'patient' ? 'Authorized Patient' : currentUser?.role === 'doctor' ? 'Verified Physician' : 'Security Admin'}
            </span>
          </div>
        </div>

        {/* 3. Authorized Access / Patient-Specific Access */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Access Control</span>
            <span className="font-bold text-slate-900 text-xs truncate block">Authorized Access</span>
            <span className="text-[10px] text-indigo-600 font-medium">Least-Privilege Active</span>
          </div>
        </div>

        {/* 4. Data Protection / Privacy Protection */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Privacy</span>
            <span className="font-bold text-slate-900 text-xs truncate block">Protected Records</span>
            <span className="text-[10px] text-cyan-700 font-medium">Enclave Guarded</span>
          </div>
        </div>

      </div>

      {/* Activity Monitoring Stream */}
      <div className="pt-1">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Activity Monitoring Stream</span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">Audit Trail Recorded</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px]">
          {activities.slice(0, 3).map((act, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/60"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-slate-400 font-mono text-[10px] shrink-0">{act.time}</span>
                <span className="text-slate-700 font-medium truncate">{act.event}</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase bg-emerald-100/70 px-1.5 py-0.5 rounded-md shrink-0">
                {act.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
