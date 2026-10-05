import React, { useState } from 'react';
import {
  Calendar, Clock, CheckCircle2, XCircle, Search,
  Filter, Play, UserCheck, Stethoscope, ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppointmentCard } from '../../components/AppointmentCard';
import { Modal } from '../../components/Modal';
import { EmptyState } from '../../components/EmptyState';

export const DoctorAppointments = () => {
  const { appointments, completeAppointment, cancelAppointment, rescheduleAppointment } = useApp();
  const [activeTab, setActiveTab] = useState('Today');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [newDate, setNewDate] = useState('2026-10-08');
  const [newTime, setNewTime] = useState('11:00 AM');
  const [clinicalNotes, setClinicalNotes] = useState('');

  // Filter appointments by tab and search
  const filteredAppointments = appointments.filter((appt) => {
    const matchesSearch =
      appt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.type.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'Today') {
      return appt.date === '2026-10-05';
    }
    if (activeTab === 'Upcoming') {
      return appt.status === 'Upcoming';
    }
    if (activeTab === 'Completed') {
      return appt.status === 'Completed';
    }
    if (activeTab === 'Cancelled') {
      return appt.status === 'Cancelled' || appt.status === 'Rescheduled';
    }
    return true;
  });

  const handleStartConsultation = (appt) => {
    setSelectedAppt(appt);
    setClinicalNotes(appt.notes || '');
    setConsultationModalOpen(true);
  };

  const handleSaveConsultation = () => {
    if (selectedAppt) {
      completeAppointment(selectedAppt.id, clinicalNotes);
      setConsultationModalOpen(false);
    }
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    if (selectedAppt) {
      rescheduleAppointment(selectedAppt.id, newDate, newTime);
      setRescheduleModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Appointment Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage scheduled clinical visits, start consultations, and track history.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search appointments..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Tabs (Section 23 Specification: Today's Schedule, Upcoming, Completed, Cancelled) */}
      <div className="p-1 rounded-2xl bg-slate-100/90 flex flex-wrap gap-1 max-w-md">
        {['Today', 'Upcoming', 'Completed', 'Cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all ${
              activeTab === tab
                ? 'bg-white text-primary shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab === 'Today' ? "Today's Schedule" : tab}
          </button>
        ))}
      </div>

      {/* Appointment Cards List */}
      <div className="space-y-3">
        {filteredAppointments.length === 0 ? (
          <EmptyState
            title={`No ${activeTab.toLowerCase()} appointments found`}
            description="There are currently no clinical appointments under this filter."
          />
        ) : (
          filteredAppointments.map((appt) => (
            <div
              key={appt.id}
              className="glass-panel rounded-3xl p-4 sm:p-5 border border-white/90 shadow-glass flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-16 py-2.5 rounded-2xl bg-blue-50/80 border border-blue-100/60 text-center shrink-0">
                  <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                  <span className="text-xs font-extrabold text-slate-800 block">
                    {appt.time}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                    {appt.date}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-800">
                      {appt.patientName}
                    </h3>
                    <span className="text-xs text-slate-400">({appt.id})</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      appt.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : appt.status === 'Upcoming'
                        ? 'bg-blue-50 text-primary border-blue-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      {appt.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-medium mt-1">
                    {appt.type} • Attending: <span className="text-slate-800 font-bold">{appt.doctorName}</span>
                  </p>

                  <p className="text-xs text-slate-500 mt-1 italic">
                    Reason: "{appt.symptoms}"
                  </p>
                </div>
              </div>

              {/* Action Buttons (Section 23 specification) */}
              <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                {appt.status === 'Upcoming' && (
                  <button
                    onClick={() => handleStartConsultation(appt)}
                    className="px-3 py-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Start Consultation</span>
                  </button>
                )}

                {appt.status === 'Upcoming' && (
                  <button
                    onClick={() => {
                      setSelectedAppt(appt);
                      setRescheduleModalOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    Reschedule
                  </button>
                )}

                {appt.status === 'Upcoming' && (
                  <button
                    onClick={() => cancelAppointment(appt.id)}
                    className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                )}

                {appt.status === 'Completed' && (
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Completed & Archived
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Consultation Modal */}
      {consultationModalOpen && selectedAppt && (
        <Modal
          isOpen={consultationModalOpen}
          onClose={() => setConsultationModalOpen(false)}
          title={`Clinical Consultation: ${selectedAppt.patientName}`}
          subtitle={`Appointment ID: ${selectedAppt.id} • ${selectedAppt.type}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-800 text-sm">{selectedAppt.patientName}</p>
                <p className="text-slate-500">Scheduled: {selectedAppt.date} at {selectedAppt.time}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                In Session
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Clinical Observations & Examination Notes
              </label>
              <textarea
                rows={4}
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                placeholder="Record physical examination findings, lung/heart sounds, diagnosis, and instructions..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConsultationModalOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
              >
                Close Without Saving
              </button>
              <button
                type="button"
                onClick={handleSaveConsultation}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Complete Appointment & Save</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Reschedule Modal */}
      {rescheduleModalOpen && selectedAppt && (
        <Modal
          isOpen={rescheduleModalOpen}
          onClose={() => setRescheduleModalOpen(false)}
          title={`Reschedule Appointment: ${selectedAppt.id}`}
        >
          <form onSubmit={handleRescheduleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Select New Date
              </label>
              <input
                type="date"
                required
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Select New Time Slot
              </label>
              <select
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-primary"
              >
                <option>10:00 AM</option>
                <option>10:30 AM</option>
                <option>11:00 AM</option>
                <option>11:30 AM</option>
                <option>02:00 PM</option>
                <option>02:30 PM</option>
                <option>03:30 PM</option>
                <option>04:00 PM</option>
              </select>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRescheduleModalOpen(false)}
                className="px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold shadow-md transition-all"
              >
                Update Schedule
              </button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
};
