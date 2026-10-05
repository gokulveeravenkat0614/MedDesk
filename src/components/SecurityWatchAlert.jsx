import React, { useState } from 'react';
import {
  AlertTriangle, ShieldAlert, CheckCircle2, Eye, Clock,
  User, Laptop, ShieldCheck, ChevronRight
} from 'lucide-react';

export const SecurityWatchAlert = ({ onInspectAudit }) => {
  const [isReviewed, setIsReviewed] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  return (
    <div className={`p-5 rounded-3xl border transition-all ${
      isReviewed
        ? 'bg-slate-50 border-slate-200/80 text-slate-700'
        : 'bg-gradient-to-r from-amber-50 via-rose-50/60 to-orange-50 border-amber-300 shadow-md text-amber-950'
    }`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <div className="flex items-start gap-3.5">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
            isReviewed ? 'bg-slate-200 text-slate-600' : 'bg-amber-500 text-white animate-pulse'
          }`}>
            <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                isReviewed
                  ? 'bg-slate-200 text-slate-600 border-slate-300'
                  : 'bg-amber-100 text-amber-900 border-amber-300'
              }`}>
                {isReviewed ? '● Reviewed by Admin' : '🚨 CareGuard Security Watch Alert'}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Today, 11:42 AM</span>
            </div>

            <h4 className="text-sm font-black text-slate-900 mt-1">
              {isReviewed
                ? 'Security Incident Reviewed — Anomaly Quarantined'
                : 'Suspicious Activity Detected: Multiple Unauthorized Patient Queries'}
            </h4>

            <p className="text-xs text-slate-600 mt-0.5 max-w-xl leading-relaxed">
              <strong>Possible Reason:</strong> Doctor account or external client attempted rapid cross-department queries on unassigned patient records (pat-3, pat-4). Blocked by RBAC gateway.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center shrink-0">
          {!isReviewed && (
            <button
              onClick={() => setIsReviewed(true)}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 shadow-xs transition-colors"
            >
              Mark as Reviewed
            </button>
          )}

          <button
            onClick={onInspectAudit}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>Inspect Audit Log</span>
          </button>
        </div>

      </div>

      {/* Expanded Telemetry details */}
      <div className="mt-3 pt-3 border-t border-amber-200/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
        <div>
          <span className="text-slate-400 font-bold uppercase text-[9px] block">Affected Node</span>
          <span className="font-mono text-slate-800 font-semibold block mt-0.5">192.168.1.88 (VLAN-B)</span>
        </div>
        <div>
          <span className="text-slate-400 font-bold uppercase text-[9px] block">Identity Challenged</span>
          <span className="text-slate-800 font-semibold block mt-0.5">Dr. Priya Sharma</span>
        </div>
        <div>
          <span className="text-slate-400 font-bold uppercase text-[9px] block">Gateway Action</span>
          <span className="text-rose-600 font-black block mt-0.5">Blocked (HTTP 403)</span>
        </div>
        <div>
          <span className="text-slate-400 font-bold uppercase text-[9px] block">Security System</span>
          <span className="text-emerald-700 font-bold block mt-0.5">Surveillance Monitoring</span>
        </div>
      </div>
    </div>
  );
};
