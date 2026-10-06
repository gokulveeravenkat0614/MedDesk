import React, { useState, useEffect } from 'react';
import {
  ShieldCheck, CheckCircle2, Lock, FileText, UserCheck,
  Clock, AlertCircle, X, Download, Shield, ShieldAlert
} from 'lucide-react';
import { Modal } from './Modal';

export const AuthorizedRecordAccessModal = ({
  isOpen,
  onClose,
  record,
  isRestricted = false,
  doctorName = 'Dr. Arjun Mehta',
  patientName = 'Rahul Kumar'
}) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (isOpen && !isRestricted && !record?.restricted) {
      setStep(1);
      const timer1 = setTimeout(() => setStep(2), 150);
      const timer2 = setTimeout(() => setStep(3), 300);
      const timer3 = setTimeout(() => setStep(4), 450);
      const timer4 = setTimeout(() => setStep(5), 600);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    } else {
      setStep(0);
    }
  }, [isOpen, isRestricted, record]);

  if (!isOpen) return null;

  // RESTRICTED ACCESS VIEW
  if (isRestricted || record?.restricted) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Access Restricted"
        size="md"
      >
        <div className="p-6 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200 shadow-sm">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Access Restricted
            </h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              This patient information is not available to your current role or authorization level.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Authorization Check
            </span>
            <p className="text-xs font-semibold text-rose-700 flex items-center gap-1.5">
              <span>●</span> Reason: Doctor is not authorized for this patient.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-xs shadow-sm transition-colors"
            >
              Return to Patients
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  // AUTHORIZED PATIENT ACCESS VIEW
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Protected Patient Record"
      size="lg"
    >
      <div className="space-y-5 text-xs">
        
        {/* Verification Pipeline Animation */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50/90 to-indigo-50/70 border border-blue-200/80">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#1677FF] block mb-2">
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

        {/* Protected Patient Record Spec Card */}
        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-emerald-950 text-sm">Protected Patient Record</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-200 text-emerald-800 px-2 py-0.2 rounded-full">
                  Authorized Access
                </span>
              </div>
              <p className="text-slate-600 text-[11px] mt-0.5">
                Patient: <strong className="text-slate-900">{record?.patientName || patientName}</strong> • Access: <strong className="text-emerald-700">✓ Authorized</strong>
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-emerald-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Authorized Doctor</span>
            <span className="text-xs font-black text-slate-900 block">{doctorName}</span>
            <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">Purpose: Appointment / Consultation</span>
          </div>
        </div>

        {/* Record Content */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1677FF] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60">
                {record?.recordType || 'Consultation Notes'}
              </span>
              <h3 className="text-base font-black text-slate-900 mt-1">
                {record?.title || 'Diagnostic Evaluation Report'}
              </h3>
            </div>
            <span className="text-slate-400 font-mono text-[11px]">{record?.date || '06 Oct 2026'}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Security Status</span>
              <span className="text-emerald-700 font-bold text-xs mt-0.5 block">Protected</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Access Permission</span>
              <span className="text-emerald-700 font-bold text-xs mt-0.5 block">Authorized Access</span>
            </div>
          </div>

          <div>
            <span className="text-slate-500 font-bold block mb-1">Clinical Summary:</span>
            <p className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-slate-700 text-xs leading-relaxed">
              {record?.summary || 'Standard diagnostic consultation conducted under authorized physician scope. Physiological parameters verified normal.'}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100">
            <span>🔒 Protected Health Information • Synthetic Patient Sandbox</span>
            <span>Record ID: {record?.id || 'REC-8421'}</span>
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
