import React, { useState } from 'react';
import {
  Calendar, Search, Filter, Clock, CheckCircle2,
  XCircle, MoreVertical, ShieldCheck, User
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppointmentCard } from '../../components/AppointmentCard';
import { EmptyState } from '../../components/EmptyState';

export const AdminAppointments = () => {
  const { appointments, completeAppointment, cancelAppointment } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filtered = appointments.filter((a) => {
    const matchesSearch =
      a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === 'All' || a.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Clinic Appointment Oversight
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time tracking of all consultations across clinic departments and physician schedules.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search appointments by ID, patient, doctor..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="p-1 rounded-2xl bg-slate-100/90 flex flex-wrap gap-1 max-w-md">
        {['All', 'Upcoming', 'Completed', 'Cancelled', 'Rescheduled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedStatus(tab)}
            className={`py-2 px-3 text-xs font-bold rounded-xl transition-all ${
              selectedStatus === tab
                ? 'bg-white text-primary shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <EmptyState
            title={`No ${selectedStatus.toLowerCase()} appointments`}
            description="No scheduled consultations matched your filter."
          />
        ) : (
          filtered.map((appt) => (
            <div
              key={appt.id}
              className="glass-panel rounded-3xl p-4 sm:p-5 border border-white/90 shadow-glass flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-16 py-2.5 rounded-2xl bg-blue-50/80 border border-blue-100/60 text-center shrink-0">
                  <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                  <span className="text-xs font-bold text-slate-800 block">
                    {appt.time}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {appt.date}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{appt.patientName}</span>
                    <span className="text-xs text-slate-400">with</span>
                    <span className="font-bold text-primary text-sm">{appt.doctorName}</span>
                    <span className="text-xs text-slate-400">({appt.id})</span>
                  </div>

                  <p className="text-xs text-slate-600 mt-0.5">
                    {appt.type} • {appt.doctorSpecialty} • Fee: <span className="font-bold">{appt.fee}</span>
                  </p>

                  <p className="text-xs text-slate-400 mt-0.5 italic">
                    "{appt.symptoms}"
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  appt.status === 'Completed'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : appt.status === 'Upcoming'
                    ? 'bg-blue-50 text-primary border border-blue-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}>
                  {appt.status}
                </span>

                {appt.status === 'Upcoming' && (
                  <button
                    onClick={() => cancelAppointment(appt.id)}
                    className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
