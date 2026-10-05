import React, { useState } from 'react';
import {
  FileText, ShieldCheck, Clock, ChevronRight, Activity,
  Stethoscope, Eye, Lock, CheckCircle2, AlertCircle
} from 'lucide-react';
import { Modal } from './Modal';

export const MedicalRecordCard = ({ record, onOpenDetail }) => {
  const [showDetailModal, setShowDetailModal] = useState(false);

  const getRecordIcon = (type) => {
    switch (type) {
      case 'Lab Report':
        return <Activity className="w-4 h-4 text-purple-600" />;
      case 'Prescription':
        return <FileText className="w-4 h-4 text-primary" />;
      case 'Consultation Notes':
        return <Stethoscope className="w-4 h-4 text-emerald-600" />;
      default:
        return <FileText className="w-4 h-4 text-blue-500" />;
    }
  };

  const handleClick = () => {
    if (onOpenDetail) {
      onOpenDetail(record);
    } else {
      setShowDetailModal(true);
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="p-3.5 rounded-2xl bg-white/70 hover:bg-white border border-slate-100/80 hover:border-blue-100 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 group"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-blue-50/80 group-hover:bg-blue-100/70 border border-blue-100/60 flex items-center justify-center shrink-0 transition-colors">
            {getRecordIcon(record.recordType)}
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-slate-800 truncate group-hover:text-primary transition-colors">
              {record.patientName}
            </h4>
            <p className="text-[11px] text-slate-500 truncate">
              {record.recordType} • <span className="font-medium text-slate-700">{record.subType || record.title}</span>
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] text-slate-400 font-medium">
                {record.date}
              </span>
              <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                <ShieldCheck className="w-2.5 h-2.5" />
                {record.accessStatus || 'Authorized Access'}
              </span>
            </div>
          </div>
        </div>

        <div className="p-1 rounded-xl text-slate-300 group-hover:text-primary transition-colors shrink-0">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title={`Medical Record: ${record.title}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4">
            
            {/* Header banner */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">{record.patientName}</p>
                <p className="text-[11px] text-slate-500">Attending: {record.doctorName} ({record.doctorSpecialty})</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-700 block">{record.date}</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-100/60 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3" />
                  Authorized RBAC Access
                </span>
              </div>
            </div>

            {/* Clinical Summary & Diagnosis */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Clinical Diagnosis
              </h5>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
                {record.diagnosis || 'Healthy diagnostic assessment'}
              </div>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Summary & Observations
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded-xl border border-slate-100">
                {record.summary}
              </p>
            </div>

            {/* Prescriptions */}
            {record.prescription && record.prescription.length > 0 && (
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Prescription Details
                </h5>
                <div className="space-y-2">
                  {record.prescription.map((rx, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-800 block">{rx.medicine}</span>
                        <span className="text-slate-500 text-[11px]">{rx.dosage}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-primary bg-white px-2 py-1 rounded-lg border border-blue-200/50">
                        {rx.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Access Audit Trail (Section 26 requirement) */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
                <Lock className="w-3.5 h-3.5 text-primary" />
                <span>Security Access Audit Log</span>
              </div>
              <div className="bg-slate-900 text-slate-200 rounded-xl p-3 text-[11px] font-mono space-y-1.5">
                {record.accessLogs ? (
                  record.accessLogs.map((log, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:justify-between text-slate-300">
                      <span>• {log.doctorName} — {log.action}</span>
                      <span className="text-slate-400">{log.timestamp} [{log.ip}]</span>
                    </div>
                  ))
                ) : (
                  <div>• {record.doctorName} accessed record at {record.date}</div>
                )}
              </div>
              <p className="text-[10px] text-slate-400 italic mt-1.5 text-center">
                Designed with privacy-focused access controls for demonstration.
              </p>
            </div>

          </div>
        </Modal>
      )}
    </>
  );
};
