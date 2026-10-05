import React, { useState } from 'react';
import {
  Users, Search, Filter, Eye, Edit2, UserX, UserCheck,
  ChevronRight, ShieldCheck, Plus, CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/Modal';

export const AdminPatients = () => {
  const { patients, updatePatientProfile, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: '',
    status: 'active'
  });

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone.includes(searchTerm) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenEdit = (p) => {
    setSelectedPatient(p);
    setEditForm({
      name: p.name,
      email: p.email,
      phone: p.phone,
      bloodGroup: p.bloodGroup,
      status: p.status || 'active'
    });
    setEditModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (selectedPatient) {
      updatePatientProfile({
        id: selectedPatient.id,
        ...editForm
      });
      setEditModalOpen(false);
      showToast(`Patient ${selectedPatient.name} updated successfully`);
    }
  };

  const handleToggleDeactivate = (p) => {
    const nextStatus = p.status === 'inactive' ? 'active' : 'inactive';
    updatePatientProfile({
      id: p.id,
      status: nextStatus
    });
    showToast(`Patient ${p.name} marked as ${nextStatus}`);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Patient Registry Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Admin oversight: Patient credentials, active status, and demographic verifications.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, name, email, phone..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Patients Table (Section 28 specification) */}
      <div className="glass-panel rounded-3xl border border-white/90 shadow-glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4 sm:px-6">Patient ID</th>
                <th className="py-3.5 px-4">Name</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Blood Group</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Last Visit</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.map((p) => (
                <tr key={p.id} className="hover:bg-blue-50/40 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-primary">
                    {p.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="w-8 h-8 rounded-xl object-cover ring-1 ring-slate-200"
                      />
                      <span className="font-bold text-slate-800">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-slate-700 font-medium">{p.email}</p>
                    <p className="text-[11px] text-slate-400">{p.phone}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-600 font-mono font-bold text-[11px]">
                      {p.bloodGroup}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      p.status === 'inactive'
                        ? 'bg-slate-100 text-slate-600'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                    }`}>
                      {p.status || 'Active'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium">
                    {p.vitals?.lastUpdated || 'Oct 05, 2026'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedPatient(p);
                          setViewModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-primary text-slate-600 transition-colors"
                        title="View Profile"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-primary text-slate-600 transition-colors"
                        title="Edit Details"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleToggleDeactivate(p)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          p.status === 'inactive'
                            ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                            : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                        }`}
                        title={p.status === 'inactive' ? 'Activate Patient' : 'Deactivate Patient'}
                      >
                        {p.status === 'inactive' ? <UserCheck className="w-3.5 h-3.5" /> : <UserX className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {viewModalOpen && selectedPatient && (
        <Modal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          title={`Patient Account: ${selectedPatient.name}`}
        >
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
              <img src={selectedPatient.avatar} alt={selectedPatient.name} className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <h4 className="font-bold text-slate-900">{selectedPatient.name} ({selectedPatient.id})</h4>
                <p className="text-slate-500">{selectedPatient.email} • {selectedPatient.phone}</p>
              </div>
            </div>
            <p><strong>Emergency Contact:</strong> {selectedPatient.emergencyContact}</p>
            <p><strong>Insurance:</strong> {selectedPatient.insuranceProvider}</p>
            <p><strong>Address:</strong> {selectedPatient.address}</p>
          </div>
        </Modal>
      )}

      {/* Edit Modal */}
      {editModalOpen && selectedPatient && (
        <Modal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          title={`Edit Patient: ${selectedPatient.name}`}
        >
          <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Full Name</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Email</label>
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Phone</label>
              <input
                type="text"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-primary"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold"
              >
                Save Updates
              </button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
};
