import React, { useState } from 'react';
import {
  Stethoscope, Search, Star, Edit2, CheckCircle2,
  XCircle, Eye, ShieldCheck, Plus, Power
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/Modal';

export const AdminDoctors = () => {
  const { doctors, toggleDoctorStatus, saveDoctors, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [editForm, setEditForm] = useState({
    name: '',
    specialty: '',
    experience: '',
    availability: '',
    workingHours: ''
  });

  const filteredDoctors = doctors.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenEdit = (doc) => {
    setSelectedDoctor(doc);
    setEditForm({
      name: doc.name,
      specialty: doc.specialty,
      experience: doc.experience,
      availability: doc.availability,
      workingHours: doc.workingHours
    });
    setEditModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (selectedDoctor) {
      const updated = doctors.map(d => d.id === selectedDoctor.id ? { ...d, ...editForm } : d);
      saveDoctors(updated);
      setEditModalOpen(false);
      showToast(`Doctor credentials for ${selectedDoctor.name} updated successfully`);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Doctor Credentialing & Registry
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Admin oversight: Clinical staff privileges, specialty designations, and active status toggling.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search doctors by name, specialty..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Table (Section 29 specification) */}
      <div className="glass-panel rounded-3xl border border-white/90 shadow-glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4 sm:px-6">Doctor ID</th>
                <th className="py-3.5 px-4">Doctor Name</th>
                <th className="py-3.5 px-4">Specialty & Department</th>
                <th className="py-3.5 px-4">Experience</th>
                <th className="py-3.5 px-4">Availability</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDoctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-blue-50/40 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-primary">
                    {doc.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={doc.avatar}
                        alt={doc.name}
                        className="w-8 h-8 rounded-xl object-cover ring-1 ring-slate-200"
                      />
                      <div>
                        <span className="font-bold text-slate-800 block">{doc.name}</span>
                        <span className="text-[10px] text-slate-400">{doc.qualifications}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-800 block">{doc.specialty}</span>
                    <span className="text-[11px] text-slate-500">{doc.department}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {doc.experience}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-primary border border-blue-200/60">
                      {doc.availability}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      doc.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                        : 'bg-rose-50 text-rose-600 border border-rose-200/60'
                    }`}>
                      {doc.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedDoctor(doc);
                          setViewModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-primary text-slate-600 transition-colors"
                        title="View Profile"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(doc)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-primary text-slate-600 transition-colors"
                        title="Edit Doctor"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toggleDoctorStatus(doc.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          doc.status === 'active'
                            ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                            : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                        }`}
                        title={doc.status === 'active' ? 'Deactivate Doctor' : 'Activate Doctor'}
                      >
                        <Power className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Doctor Profile Modal */}
      {viewModalOpen && selectedDoctor && (
        <Modal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          title={`Doctor Dossier: ${selectedDoctor.name}`}
        >
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
              <img src={selectedDoctor.avatar} alt={selectedDoctor.name} className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <h4 className="font-bold text-slate-900">{selectedDoctor.name}</h4>
                <p className="text-primary font-semibold">{selectedDoctor.specialty} • {selectedDoctor.department}</p>
                <p className="text-[11px] text-slate-400">{selectedDoctor.qualifications}</p>
              </div>
            </div>
            <p><strong>Working Hours:</strong> {selectedDoctor.workingHours}</p>
            <p><strong>Consultation Room:</strong> {selectedDoctor.room}</p>
            <p><strong>Bio:</strong> {selectedDoctor.bio}</p>
          </div>
        </Modal>
      )}

      {/* Edit Doctor Modal */}
      {editModalOpen && selectedDoctor && (
        <Modal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          title={`Edit Doctor Details: ${selectedDoctor.name}`}
        >
          <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Doctor Name</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Specialty</label>
              <input
                type="text"
                value={editForm.specialty}
                onChange={(e) => setEditForm({ ...editForm, specialty: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Experience</label>
              <input
                type="text"
                value={editForm.experience}
                onChange={(e) => setEditForm({ ...editForm, experience: e.target.value })}
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
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
};
