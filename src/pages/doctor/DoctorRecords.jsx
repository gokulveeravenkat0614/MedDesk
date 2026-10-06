import React, { useState } from 'react';
import {
  FileText, ShieldCheck, Lock, Plus, Search, Filter,
  Activity, Stethoscope, ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MedicalRecordCard } from '../../components/MedicalRecordCard';
import { Modal } from '../../components/Modal';
import { EmptyState } from '../../components/EmptyState';

export const DoctorRecords = () => {
  const { medicalRecords, addMedicalRecord, patients, currentUser, showToast } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [form, setForm] = useState({
    patientId: 'pat-1',
    recordType: 'Consultation Notes',
    title: 'Routine Clinical Follow-up',
    symptoms: 'Mild fatigue, intermittent headaches',
    consultationNotes: 'Patient reports mild tension headache exacerbated by work screen time. Normal neurological exam, vitals stable.',
    diagnosis: 'Tension-type headache; mild dehydration',
    medicine: 'Hydration therapy + Paracetamol 500mg',
    dosage: '1 tablet SOS after meals',
    duration: '5 days',
    recommendedTests: 'Basic Metabolic Panel (if symptoms persist)',
    followUpDate: '2026-10-20'
  });

  const categories = ['All', 'Consultation Notes', 'Lab Report', 'Prescription', 'Diagnosis'];

  const filteredRecords = medicalRecords.filter((rec) => {
    const matchesSearch =
      rec.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.recordType.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (activeCategory === 'All') return true;
    return rec.recordType === activeCategory;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const patient = patients.find(p => p.id === form.patientId) || patients[0];

    addMedicalRecord({
      patientId: patient.id,
      patientName: patient.name,
      recordType: form.recordType,
      title: form.title || `Consultation: ${form.diagnosis}`,
      summary: `Consultation Notes: ${form.consultationNotes} | Diagnosis: ${form.diagnosis}`,
      diagnosis: form.diagnosis,
      symptoms: form.symptoms,
      notes: form.consultationNotes,
      prescription: [
        { medicine: form.medicine, dosage: form.dosage, duration: form.duration }
      ],
      recommendedTests: [form.recommendedTests],
      followUpDate: form.followUpDate
    });

    setShowAddModal(false);
    if (showToast) {
      showToast('✓ Consultation saved successfully');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-primary border border-blue-200/60 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>Privacy-Focused Clinical Environment • Role-Based Access Enabled</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Clinical Medical Records
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Encrypted diagnostic archives, laboratory reports, prescriptions, and authorized consultation notes.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Consultation</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="p-1 rounded-2xl bg-slate-100/90 flex flex-wrap gap-1 max-w-xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`py-2 px-3 text-xs font-bold rounded-xl transition-all ${
                activeCategory === cat
                  ? 'bg-white text-primary shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search records by title, patient..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Records List */}
      <div className="space-y-3">
        {filteredRecords.length === 0 ? (
          <EmptyState
            title={`No ${activeCategory.toLowerCase()} records found`}
            description="No clinical entries correspond with your active filter or search phrase."
          />
        ) : (
          filteredRecords.map((record) => (
            <MedicalRecordCard key={record.id} record={record} />
          ))
        )}
      </div>

      {/* Add Consultation Modal */}
      {showAddModal && (
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="New Patient Consultation"
          subtitle="Record clinical consultation notes, diagnosis, and prescription under role authorization"
          maxWidth="max-w-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Select Patient
                </label>
                <select
                  value={form.patientId}
                  onChange={(e) => setForm({ ...form, patientId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-primary"
                >
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.bloodGroup || 'Blood: O+'})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Record Category
                </label>
                <select
                  value={form.recordType}
                  onChange={(e) => setForm({ ...form, recordType: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-primary"
                >
                  <option>Consultation Notes</option>
                  <option>Lab Report</option>
                  <option>Prescription</option>
                  <option>Diagnosis</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Symptoms
              </label>
              <input
                type="text"
                required
                value={form.symptoms}
                onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
                placeholder="e.g. Mild fatigue, recurring headaches for 4 days"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Consultation Notes
              </label>
              <textarea
                rows={3}
                required
                value={form.consultationNotes}
                onChange={(e) => setForm({ ...form, consultationNotes: e.target.value })}
                placeholder="Detailed clinical observation, examination findings, and patient history..."
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Basic Diagnosis
              </label>
              <input
                type="text"
                required
                value={form.diagnosis}
                onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
                placeholder="e.g. Tension-type headache; mild seasonal exhaustion"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-primary"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
              <span className="font-bold text-slate-800 block text-xs">Prescription</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold mb-0.5">Medicine Name</label>
                  <input
                    type="text"
                    placeholder="Medicine (e.g. Paracetamol 500mg)"
                    value={form.medicine}
                    onChange={(e) => setForm({ ...form, medicine: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold mb-0.5">Dosage</label>
                  <input
                    type="text"
                    placeholder="Dosage (e.g. 1 tab SOS)"
                    value={form.dosage}
                    onChange={(e) => setForm({ ...form, dosage: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold mb-0.5">Duration</label>
                  <input
                    type="text"
                    placeholder="Duration (e.g. 5 days)"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Recommended Tests
                </label>
                <input
                  type="text"
                  value={form.recommendedTests}
                  onChange={(e) => setForm({ ...form, recommendedTests: e.target.value })}
                  placeholder="e.g. Basic Metabolic Panel (BMP), CBC"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Follow-up Date
                </label>
                <input
                  type="date"
                  value={form.followUpDate}
                  onChange={(e) => setForm({ ...form, followUpDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold shadow-md shadow-blue-500/25 transition-all"
              >
                Save Consultation
              </button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
};
