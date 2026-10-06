import React, { useState } from 'react';
import {
  FileText, ShieldCheck, Lock, Activity, Stethoscope,
  Search, Filter, ChevronRight, Eye, CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MedicalRecordCard } from '../../components/MedicalRecordCard';
import { EmptyState } from '../../components/EmptyState';

export const PatientRecords = () => {
  const { medicalRecords, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const myRecords = medicalRecords.filter(
    (r) => r.patientId === (currentUser?.id || 'pat-1') || r.patientName === (currentUser?.name || 'Rahul Kumar')
  );

  const categories = ['All', 'Consultation Notes', 'Lab Report', 'Prescription', 'Diagnosis'];

  const filteredRecords = myRecords.filter((rec) => {
    const matchesSearch =
      rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.recordType.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (activeTab === 'All') return true;
    return rec.recordType === activeTab;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-primary border border-blue-200/60 uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              Patient Personal Health Records (PHR)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            My Medical Records
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            View your consultation notes, laboratory diagnostics, prescriptions, and access audit trails.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search records..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Security Banner (Section 26 specification) */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50/80 to-blue-50/80 border border-emerald-200/60 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-700">
          <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>🔒 Secure Access:</strong> Your clinical records are protected and only accessible to authorized clinic physicians.
          </span>
        </div>
        <span className="hidden sm:inline text-[11px] text-slate-500 font-semibold bg-white/80 px-2.5 py-0.5 rounded-full border border-slate-200/60">
          Privacy-Focused Clinical Environment
        </span>
      </div>

      {/* Category Filter Tabs (Section 24: Consultation Notes, Lab Reports, Prescriptions, Diagnosis) */}
      <div className="p-1 rounded-2xl bg-slate-100/90 flex flex-wrap gap-1 max-w-xl">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`py-2 px-3 text-xs font-bold rounded-xl transition-all ${
              activeTab === cat
                ? 'bg-white text-primary shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Records Cards List */}
      <div className="space-y-3">
        {filteredRecords.length === 0 ? (
          <EmptyState
            title="No medical records available"
            description="No clinical records found matching your selection criteria."
          />
        ) : (
          filteredRecords.map((record) => (
            <MedicalRecordCard key={record.id} record={record} />
          ))
        )}
      </div>

    </div>
  );
};
