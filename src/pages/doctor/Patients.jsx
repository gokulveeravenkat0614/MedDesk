import React, { useState } from 'react';
import {
  Users, ShieldCheck, Lock, Plus, FileText, Search,
  Heart, Activity, Droplets, Clock, Eye, AlertCircle, CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/Modal';
import { EmptyState } from '../../components/EmptyState';

export const Patients = () => {
  const { patients, medicalRecords, addMedicalRecord, currentUser, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddRecordModal, setShowAddRecordModal] = useState(false);
  const [showPatientDetailModal, setShowPatientDetailModal] = useState(false);

  // New Record Form State
  const [recordForm, setRecordForm] = useState({
    title: 'Routine General Health Review',
    recordType: 'Consultation Notes',
    diagnosis: 'Mild allergic rhinitis with clear chest',
    symptoms: 'Nasal congestion and mild fatigue',
    medicine: 'Cetirizine 10mg',
    dosage: '1 tab at bedtime',
    duration: '5 days',
    recommendedTests: 'Complete Blood Count (CBC)',
    followUpDate: '2026-10-20',
  });

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone.includes(searchTerm)
  );

  const handleOpenAddRecord = (patient) => {
    setSelectedPatient(patient);
    setShowAddRecordModal(true);
  };

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setShowPatientDetailModal(true);
  };

  const handleSaveRecord = (e) => {
    e.preventDefault();
    if (!selectedPatient) return;

    addMedicalRecord({
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      recordType: recordForm.recordType,
      title: recordForm.title,
      summary: `${recordForm.recordType} recorded. Diagnosis: ${recordForm.diagnosis}`,
      diagnosis: recordForm.diagnosis,
      symptoms: recordForm.symptoms,
      prescription: [
        {
          medicine: recordForm.medicine,
          dosage: recordForm.dosage,
          duration: recordForm.duration
        }
      ],
      recommendedTests: [recordForm.recommendedTests],
      followUpDate: recordForm.followUpDate
    });

    setShowAddRecordModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 uppercase tracking-wider flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-600" />
              RBAC Authorized Scope Only
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Authorized Patients
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Only patient records with active clinical consent and doctor authorization are visible.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search authorized patients..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Security Disclaimer Banner (Section 26 specification) */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-50/80 to-slate-50/80 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-700">
          <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
          <span>
            Access granted to <strong className="text-slate-900">{currentUser?.name || 'Dr. Arjun Mehta'}</strong> for patient data management.
          </span>
        </div>
        <span className="text-[11px] text-slate-400 italic">
          Designed with privacy-focused access controls for demonstration.
        </span>
      </div>

      {/* Patient Cards Grid or Empty State (Prompt Specification) */}
      {filteredPatients.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No patient records found"
          description="No authorized patient records matching your search criteria."
          actionText="Clear Search"
          onAction={() => setSearchTerm('')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPatients.map((patient) => {
          const patientRecords = medicalRecords.filter(r => r.patientId === patient.id);

          return (
            <div
              key={patient.id}
              className="glass-panel rounded-3xl p-5 border border-white/90 shadow-glass hover:shadow-glass-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header with Avatar and Blood Group */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={patient.avatar}
                      alt={patient.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-primary/20 shadow-xs"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {patient.name}
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        ID: {patient.id} • {patient.age} yrs • {patient.gender}
                      </p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-lg bg-rose-50 text-rose-600 font-mono text-xs font-bold border border-rose-200/60">
                    {patient.bloodGroup}
                  </span>
                </div>

                {/* Vitals snapshot */}
                <div className="grid grid-cols-3 gap-2 mt-4 p-2.5 rounded-2xl bg-slate-50/80 border border-slate-100 text-center">
                  <div>
                    <span className="text-[9px] font-semibold uppercase text-slate-400 block">BP</span>
                    <span className="text-xs font-bold text-slate-800 mt-0.5 block">{patient.vitals?.bloodPressure?.split(' ')[0] || '120/80'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-semibold uppercase text-slate-400 block">HR</span>
                    <span className="text-xs font-bold text-slate-800 mt-0.5 block">{patient.vitals?.heartRate || '72 bpm'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-semibold uppercase text-slate-400 block">SpO2</span>
                    <span className="text-xs font-bold text-slate-800 mt-0.5 block">{patient.vitals?.oxygenLevel || '98%'}</span>
                  </div>
                </div>

                {/* Contact and Allergies */}
                <div className="mt-3 space-y-1 text-xs text-slate-500">
                  <p><strong className="text-slate-700">Phone:</strong> {patient.phone}</p>
                  <p className="truncate"><strong className="text-slate-700">Allergies:</strong> {patient.allergies?.join(', ') || 'None'}</p>
                  <p className="text-[11px] text-primary font-medium mt-1">
                    {patientRecords.length} authorized clinical records on file
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={() => handleViewPatient(patient)}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors text-center"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleOpenAddRecord(patient)}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary-hover shadow-xs transition-colors flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Record</span>
                </button>
              </div>

            </div>
          );
        })}
        </div>
      )}

      {/* Patient Detail Modal */}
      {showPatientDetailModal && selectedPatient && (
        <Modal
          isOpen={showPatientDetailModal}
          onClose={() => setShowPatientDetailModal(false)}
          title={`Patient Clinical Profile: ${selectedPatient.name}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4 text-xs">
            
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedPatient.avatar}
                  alt={selectedPatient.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary/30"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedPatient.name}</h3>
                  <p className="text-slate-500">{selectedPatient.age} yrs • {selectedPatient.gender} • Blood Group: <strong className="text-rose-600 font-mono">{selectedPatient.bloodGroup}</strong></p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{selectedPatient.address}</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Consent Verified
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Blood Pressure</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{selectedPatient.vitals?.bloodPressure}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Heart Rate</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{selectedPatient.vitals?.heartRate}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Oxygen Level</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{selectedPatient.vitals?.oxygenLevel}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Temperature</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{selectedPatient.vitals?.temperature}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <p><strong className="text-slate-700">Emergency Contact:</strong> {selectedPatient.emergencyContact}</p>
              <p><strong className="text-slate-700">Insurance Provider:</strong> {selectedPatient.insuranceProvider}</p>
              <p><strong className="text-slate-700">Known Allergies:</strong> {selectedPatient.allergies?.join(', ')}</p>
              <p><strong className="text-slate-700">Chronic Conditions:</strong> {selectedPatient.chronicConditions?.join(', ')}</p>
            </div>

            {/* Access History */}
            <div className="p-3 rounded-xl bg-slate-900 text-slate-300 font-mono text-[11px] space-y-1">
              <span className="text-slate-400 font-bold block mb-1">Access History Audit:</span>
              <p>• {currentUser?.name || 'Dr. Arjun Mehta'} viewed medical record (Today, 10:32 AM)</p>
              <p>• Authenticated via Token Hash: SHA-256 Validated</p>
            </div>

          </div>
        </Modal>
      )}

      {/* Add Medical Record Modal (Section 25 specification) */}
      {showAddRecordModal && selectedPatient && (
        <Modal
          isOpen={showAddRecordModal}
          onClose={() => setShowAddRecordModal(false)}
          title={`Add Medical Record for ${selectedPatient.name}`}
          subtitle="Section 25: Clinical notes, diagnosis, symptoms, prescription & follow-up"
          maxWidth="max-w-2xl"
        >
          <form onSubmit={handleSaveRecord} className="space-y-3.5 text-xs">
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Record Type
                </label>
                <select
                  value={recordForm.recordType}
                  onChange={(e) => setRecordForm({ ...recordForm, recordType: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-primary"
                >
                  <option>Consultation Notes</option>
                  <option>Diagnosis</option>
                  <option>Lab Report</option>
                  <option>Prescription</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Record Title
                </label>
                <input
                  type="text"
                  required
                  value={recordForm.title}
                  onChange={(e) => setRecordForm({ ...recordForm, title: e.target.value })}
                  placeholder="e.g., Bronchial Examination"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Clinical Diagnosis
              </label>
              <input
                type="text"
                required
                value={recordForm.diagnosis}
                onChange={(e) => setRecordForm({ ...recordForm, diagnosis: e.target.value })}
                placeholder="e.g., Mild seasonal asthma with clear lung fields"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Symptoms Observed
              </label>
              <textarea
                rows={2}
                required
                value={recordForm.symptoms}
                onChange={(e) => setRecordForm({ ...recordForm, symptoms: e.target.value })}
                placeholder="Describe patient symptoms..."
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-primary"
              />
            </div>

            {/* Prescription (Section 25) */}
            <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
              <span className="font-bold text-slate-800 block text-xs">
                Prescription Details
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-semibold text-slate-500 uppercase">Medicine</label>
                  <input
                    type="text"
                    value={recordForm.medicine}
                    onChange={(e) => setRecordForm({ ...recordForm, medicine: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-slate-500 uppercase">Dosage</label>
                  <input
                    type="text"
                    value={recordForm.dosage}
                    onChange={(e) => setRecordForm({ ...recordForm, dosage: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-slate-500 uppercase">Duration</label>
                  <input
                    type="text"
                    value={recordForm.duration}
                    onChange={(e) => setRecordForm({ ...recordForm, duration: e.target.value })}
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
                  value={recordForm.recommendedTests}
                  onChange={(e) => setRecordForm({ ...recordForm, recommendedTests: e.target.value })}
                  placeholder="e.g., Spirometry test, CBC"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Follow-up Date
                </label>
                <input
                  type="date"
                  value={recordForm.followUpDate}
                  onChange={(e) => setRecordForm({ ...recordForm, followUpDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddRecordModal(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold shadow-md shadow-blue-500/25 transition-all flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Medical Record</span>
              </button>
            </div>

          </form>
        </Modal>
      )}

    </div>
  );
};
