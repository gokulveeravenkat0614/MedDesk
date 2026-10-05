import React, { useState } from 'react';
import {
  User, Mail, Phone, Calendar, Heart, ShieldCheck,
  Edit2, Check, Lock, AlertCircle, Camera
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PatientProfile = () => {
  const { currentUser, patients, updatePatientProfile, showToast } = useApp();
  
  // Find current patient data or fallback
  const patientData = patients.find(p => p.id === currentUser?.id || p.email === currentUser?.email) || patients[0];

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: patientData.name || 'Rahul Kumar',
    email: patientData.email || 'patient@medidesk.demo',
    phone: patientData.phone || '+91 98765 43210',
    age: patientData.age || 28,
    gender: patientData.gender || 'Male',
    bloodGroup: patientData.bloodGroup || 'O+',
    emergencyContact: patientData.emergencyContact || 'Ramesh Kumar (Brother) • +91 98765 11111',
    address: patientData.address || 'Banjara Hills, Hyderabad, Telangana',
    allergies: patientData.allergies?.join(', ') || 'Penicillin, Dust Mites',
    chronicConditions: patientData.chronicConditions?.join(', ') || 'Mild Bronchial Asthma'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updatePatientProfile({
      id: patientData.id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      age: Number(formData.age),
      gender: formData.gender,
      bloodGroup: formData.bloodGroup,
      emergencyContact: formData.emergencyContact,
      address: formData.address,
      allergies: formData.allergies.split(',').map(s => s.trim()),
      chronicConditions: formData.chronicConditions.split(',').map(s => s.trim())
    });
    setIsEditing(false);
    showToast('Patient profile updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-primary border border-blue-200/60 uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-primary" />
              Simulated HIPAA/GDPR Segregated Profile
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Personal Health Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your demographic records, emergency contacts, and vital medical tags.
          </p>
        </div>

        <div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200/80 shadow-xs transition-all flex items-center gap-2"
            >
              <Edit2 className="w-3.5 h-3.5 text-primary" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          )}
        </div>
      </div>

      {/* Synthetic Data Warning Banner (Section 18 instruction) */}
      <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/60 flex items-center gap-2 text-xs text-amber-900">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          <strong>Synthetic Demo Environment:</strong> Do not enter real personal health numbers or confidential credentials.
        </span>
      </div>

      {/* Profile Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/90 shadow-glass">
        
        {/* Top Profile Banner */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-100">
          <div className="relative group">
            <img
              src={patientData.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300"}
              alt={patientData.name}
              className="w-24 h-24 rounded-3xl object-cover ring-4 ring-white shadow-lg"
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black/40 rounded-3xl flex items-center justify-center text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-5 h-5" />
              </div>
            )}
          </div>

          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  {formData.name}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Patient ID: <span className="font-mono text-primary font-bold">{patientData.id}</span>
                </p>
              </div>

              <div className="flex items-center justify-center sm:justify-end gap-2">
                <span className="px-3 py-1 rounded-xl bg-rose-50 text-rose-600 font-mono text-xs font-bold border border-rose-200/60">
                  Blood Group: {formData.bloodGroup}
                </span>
                <span className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60">
                  Active
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              Permanent Address: {formData.address}
            </p>
          </div>
        </div>

        {/* Profile Form Details */}
        <form onSubmit={handleSave} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  disabled={!isEditing}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 disabled:bg-slate-50/80 disabled:text-slate-600 focus:bg-white outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  disabled={!isEditing}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 disabled:bg-slate-50/80 disabled:text-slate-600 focus:bg-white outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  disabled={!isEditing}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 disabled:bg-slate-50/80 disabled:text-slate-600 focus:bg-white outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Age
                </label>
                <input
                  type="number"
                  disabled={!isEditing}
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 disabled:bg-slate-50/80 disabled:text-slate-600 focus:bg-white outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Gender
                </label>
                <select
                  disabled={!isEditing}
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 disabled:bg-slate-50/80 disabled:text-slate-600 bg-white outline-none focus:border-primary"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Blood Group */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Blood Group
              </label>
              <select
                disabled={!isEditing}
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 disabled:bg-slate-50/80 disabled:text-slate-600 bg-white font-mono outline-none focus:border-primary"
              >
                <option>O+</option>
                <option>O-</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>

            {/* Emergency Contact */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Emergency Contact
              </label>
              <input
                type="text"
                disabled={!isEditing}
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 disabled:bg-slate-50/80 disabled:text-slate-600 focus:bg-white outline-none focus:border-primary"
              />
            </div>

            {/* Allergies */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Known Allergies (Comma separated)
              </label>
              <input
                type="text"
                disabled={!isEditing}
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 disabled:bg-slate-50/80 disabled:text-slate-600 focus:bg-white outline-none focus:border-primary"
              />
            </div>

          </div>

          {isEditing && (
            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>

      </div>

    </div>
  );
};
