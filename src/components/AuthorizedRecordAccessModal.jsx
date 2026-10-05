import React, { useState, useEffect } from 'react';
import {
  ShieldCheck, CheckCircle2, Lock, FileText, UserCheck,
  Clock, AlertCircle, X, Download, Shield
} from 'lucide-react';
import { Modal } from './Modal';

export const AuthorizedRecordAccessModal = ({
  isOpen,
  onClose,
  record,
  doctorName = 'Dr. Arjun Mehta',
  patientName = 'Rahul Kumar'
}) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setStep(1); // Checking authorization
      const timer1 = setTimeout(() => setStep(2), 200); // Doctor identity verified
      const timer2 = setTimeout(() => setStep(3), 400); // Patient relationship verified
      const timer3 = setTimeout(() => setStep(4), 600); // Access permission verified
      const timer4 = setTimeout(() => setStep(5), 800); // Relevant information loaded
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    } else {
      setStep(0);
    }
  }, [isOpen]);

  if (!record) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Authorized Clinical Record Inspection"
      size="lg"
    >
      <div className="space-y-5 text-xs">
        
        {/* Section 14: Verification Progress Steps Animation */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/90 to-indigo-50/70 border border-blue-200/80">
          <span className="text-[10px] font-black uppercase tracking-wider text-primary block mb-2">
            CareGuard Real-Time Authorization Pipeline
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className={`p-2 rounded-xl flex items-center gap-1.5 transition-all ${
              step >= 2 ? 'bg-white text-emerald-700 shadow-xs border border-emerald-200' : 'bg-white/50 text-slate-400'
            }`}>
              <CheckCircle2 className={`w-3.5 h-3.5 ${step >= 2 ? 'text-emerald-600' : 'text-slate-300'}`} />
              <span className="text-[11px] font-bold">1. Doctor Identity</span>
            </div>

            <div className={`p-2 rounded-xl flex items-center gap-1.5 transition-all ${
              step >= 3 ? 'bg-white text-emerald-700 shadow-xs border border-emerald-200' : 'bg-white/50 text-slate-400'
            }`}>
              <CheckCircle2 className={`w-3.5 h-3.5 ${step >= 3 ? 'text-emerald-600' : 'text-slate-300'}`} />
              <span className="text-[11px] font-bold">2. Relationship</span>
            </div>

            <div className={`p-2 rounded-xl flex items-center gap-1.5 transition-all ${
              step >= 4 ? 'bg-white text-emerald-700 shadow-xs border border-emerald-200' : 'bg-white/50 text-slate-400'
            }`}>
              <CheckCircle2 className={`w-3.5 h-3.5 ${step >= 4 ? 'text-emerald-600' : 'text-slate-300'}`} />
              <span className="text-[11px] font-bold">3. Permission</span>
            </div>

            <div className={`p-2 rounded-xl flex items-center gap-1.5 transition-all ${
              step >= 5 ? 'bg-white text-emerald-700 shadow-xs border border-emerald-200' : 'bg-white/50 text-slate-400'
            }`}>
              <CheckCircle2 className={`w-3.5 h-3.5 ${step >= 5 ? 'text-emerald-600' : 'text-slate-300'}`} />
              <span className="text-[11px] font-bold">4. Data Loaded</span>
            </div>
          </div>
        </div>

        {/* Section 13: Doctor Access Indicator */}
        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-emerald-950 text-sm">Authorized Patient Record</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-200 text-emerald-800 px-2 py-0.2 rounded-full">
                  ✓ Access Verified
                </span>
              </div>
              <p className="text-slate-600 text-[11px] mt-0.5">
                Attending: <strong className="text-slate-800">{doctorName}</strong> • Patient: <strong className="text-slate-800">{record.patientName || patientName}</strong>
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-emerald-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Access Basis</span>
            <span className="text-xs font-black text-emerald-800 block">Assigned consultation</span>
          </div>
        </div>

        {/* Record Content */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60">
                {record.recordType} • {record.subType}
              </span>
              <h3 className="text-base font-black text-slate-900 mt-1">
                {record.title}
              </h3>
            </div>
            <span className="text-slate-400 font-mono text-[11px]">{record.date}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Clinical Diagnosis</span>
              <span className="text-slate-900 font-bold text-xs mt-0.5 block">{record.diagnosis || 'Healthy Baseline'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Scope Authorization</span>
              <span className="text-emerald-700 font-bold text-xs mt-0.5 block">Explicit Physician Consent</span>
            </div>
          </div>

          <div>
            <span className="text-slate-500 font-bold block mb-1">Clinical Summary:</span>
            <p className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-slate-700 text-xs leading-relaxed">
              {record.summary}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100">
            <span>🔒 Cryptographic Audit Chain Validated</span>
            <span>Record ID: {record.id}</span>
          </div>
        </div>

        <div className="pt-2 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
          >
            Close Record
          </button>
        </div>

      </div>
    </Modal>
  );
};
