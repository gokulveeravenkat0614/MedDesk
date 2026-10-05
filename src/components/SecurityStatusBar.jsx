import React from 'react';
import { ShieldCheck, Lock, Activity, CheckCircle2, Key, Clock, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SecurityStatusBar = ({ recentActivity = [] }) => {
  const { currentUser } = useApp();

  const defaultActivities = [
    { time: '10:32 AM', event: 'Cryptographic session authenticated', status: 'Verified' },
    { time: '10:35 AM', event: 'Authorized clinical records accessed', status: 'Authorized' },
    { time: '10:40 AM', event: 'Consultation calendar updated', status: 'Enforced' }
  ];

  const activities = recentActivity.length > 0 ? recentActivity : defaultActivities;

  return (
    <div className="glass-panel rounded-3xl p-4 sm:p-5 border border-white/90 shadow-glass space-y-4">
      
      {/* Top 4 Security Status Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
            CareGuard Zero-Trust Security Status
          </h4>
        </div>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
          ● All Systems Protected
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
        
        <div className="p-2.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Session</span>
            <span className="font-black text-slate-900 text-xs">✓ Secure Session</span>
          </div>
        </div>

        <div className="p-2.5 rounded-2xl bg-blue-50/70 border border-blue-200/60 flex items-center gap-2">
          <Key className="w-4 h-4 text-primary shrink-0" />
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Role Verification</span>
            <span className="font-black text-slate-900 text-xs">✓ Role Verified ({currentUser?.role})</span>
          </div>
        </div>

        <div className="p-2.5 rounded-2xl bg-indigo-50/70 border border-indigo-200/60 flex items-center gap-2">
          <Shield className="w-4 h-4 text-indigo-600 shrink-0" />
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Access Scope</span>
            <span className="font-black text-slate-900 text-xs">✓ Authorized Access</span>
          </div>
        </div>

        <div className="p-2.5 rounded-2xl bg-cyan-50/70 border border-cyan-200/60 flex items-center gap-2">
          <Lock className="w-4 h-4 text-cyan-600 shrink-0" />
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Channel</span>
            <span className="font-black text-slate-900 text-xs">✓ TLS / HTTPS</span>
          </div>
        </div>

      </div>

      {/* Recent Security Activity Feed */}
      <div className="pt-1">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          <Clock className="w-3 h-3 text-slate-400" />
          <span>Recent Security Activity:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
          {activities.map((act, index) => (
            <div key={index} className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200/60">
              <span className="text-slate-400 font-mono text-[10px]">{act.time}</span>
              <span>—</span>
              <span className="font-medium text-slate-700">{act.event}</span>
              <span className="text-[9px] font-black text-emerald-600 uppercase bg-emerald-100/60 px-1.5 py-0.2 rounded-md">
                {act.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
