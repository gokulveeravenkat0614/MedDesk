import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart, Activity, Calendar, Users, Stethoscope,
  Plus, ChevronRight, ShieldCheck, Clock, FileText,
  TrendingUp, Sparkles, Filter, CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AnatomyViewer } from '../../components/AnatomyViewer';
import { VitalCard } from '../../components/VitalCard';
import { StatCard } from '../../components/StatCard';
import { AppointmentCard } from '../../components/AppointmentCard';
import { AppointmentSummaryDonut, PatientVitalsOverview } from '../../components/ChartCard';
import { MedicalRecordCard } from '../../components/MedicalRecordCard';
import { Modal } from '../../components/Modal';

export const DoctorDashboard = () => {
  const {
    currentUser,
    appointments,
    medicalRecords,
    doctors,
    patients,
    completeAppointment,
    cancelAppointment,
    bookAppointment
  } = useApp();

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  
  // Booking Form State
  const [bookingData, setBookingData] = useState({
    doctorId: 'doc-1',
    patientId: 'pat-1',
    date: '2026-10-06',
    time: '11:00 AM',
    type: 'General Consultation',
    symptoms: 'Follow-up vitals routine inspection'
  });

  const navigate = useNavigate();

  // Synthetic trend line data for the left vital cards
  const bpTrendData = [
    { day: 'Mon', bp: 118 },
    { day: 'Tue', bp: 122 },
    { day: 'Wed', bp: 119 },
    { day: 'Thu', bp: 121 },
    { day: 'Fri', bp: 120 },
    { day: 'Sat', bp: 119 },
    { day: 'Sun', bp: 120 },
  ];

  const hrTrendData = [
    { day: 'Mon', hr: 70 },
    { day: 'Tue', hr: 74 },
    { day: 'Wed', hr: 71 },
    { day: 'Thu', hr: 75 },
    { day: 'Fri', hr: 72 },
    { day: 'Sat', hr: 70 },
    { day: 'Sun', hr: 72 },
  ];

  // Filter Today's Appointments (Section 12)
  const todaysAppointments = appointments.slice(0, 3);
  const recentRecords = medicalRecords.slice(0, 3);

  const handleCreateAppointment = (e) => {
    e.preventDefault();
    const doc = doctors.find(d => d.id === bookingData.doctorId) || doctors[0];
    const pat = patients.find(p => p.id === bookingData.patientId) || patients[0];

    bookAppointment({
      doctorId: doc.id,
      doctorName: doc.name,
      doctorSpecialty: doc.specialty,
      patientId: pat.id,
      patientName: pat.name,
      date: bookingData.date,
      time: bookingData.time,
      type: bookingData.type,
      symptoms: bookingData.symptoms,
      fee: '$60'
    });

    setShowBookingModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Welcome & Medical Dashboard Heading (Section 9 Specification) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/60">
              Good Morning, {currentUser?.name || 'Doctor'}!
            </span>
            <span className="text-xs text-slate-400">• Oct 05, 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1 leading-tight">
            Medical <span className="text-primary font-black">Dashboard</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Manage appointments, patients and medical information securely — all in one place.
          </p>
        </div>

        {/* Action quick buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowBookingModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Book an Appointment</span>
          </button>
        </div>
      </div>

      {/* 3-COLUMN MASTER DASHBOARD GRID (Section 3, 44 & 55) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ============================================================== */}
        {/* LEFT COLUMN: Vitals & Today's Appointments (3.5 / 12 cols)     */}
        {/* ============================================================== */}
        <div className="lg:col-span-3 space-y-5">
          
          {/* Vital Card 1: Blood Pressure (Section 11) */}
          <VitalCard
            title="Blood Pressure"
            value="120/80"
            unit="mmHg"
            status="Normal"
            statusColor="text-emerald-700 bg-emerald-50 border-emerald-200"
            data={bpTrendData}
            dataKey="bp"
            strokeColor="#1677FF"
            icon={Activity}
            iconBg="bg-blue-50 text-primary"
            trend="+1.2% steady"
            subtitle="Resting arterial pressure"
          />

          {/* Vital Card 2: Heart Rate (Section 11) */}
          <VitalCard
            title="Heart Rate"
            value="72"
            unit="bpm"
            status="Normal"
            statusColor="text-emerald-700 bg-emerald-50 border-emerald-200"
            data={hrTrendData}
            dataKey="hr"
            strokeColor="#EF4444"
            icon={Heart}
            iconBg="bg-rose-50 text-rose-500"
            trend="-0.8% regular"
            subtitle="Sinus rhythm telemetry"
          />

          {/* Today's Appointments Card (Section 12) */}
          <div className="glass-panel rounded-3xl p-5 border border-white/90 shadow-glass">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold text-slate-800">
                  Today's Appointments
                </h3>
              </div>
              <button
                onClick={() => navigate('/doctor/appointments')}
                className="text-xs font-bold text-primary hover:underline"
              >
                View All
              </button>
            </div>

            {/* List of appointments */}
            <div className="space-y-3 mt-3">
              {todaysAppointments.map((appt) => (
                <AppointmentCard
                  key={appt.id}
                  appointment={appt}
                  role="doctor"
                  onView={(item) => {
                    setSelectedAppointment(item);
                    setShowDetailModal(true);
                  }}
                  onComplete={(id) => completeAppointment(id)}
                  onCancel={(id) => cancelAppointment(id)}
                />
              ))}
            </div>

            {/* Bottom Large Primary CTA (Section 12 specification) */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowBookingModal(true)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-indigo-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Book an Appointment</span>
              </button>
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* CENTER COLUMN: Interactive Anatomical Illustration (5.5 / 12)  */}
        {/* ============================================================== */}
        <div className="lg:col-span-5 h-full">
          <AnatomyViewer />
        </div>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: Statistics, Vitals Overview, Records (3 / 12)    */}
        {/* ============================================================== */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Top 3 Statistics Cards (Section 13) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <StatCard
              title="Patients Today"
              value="18"
              change="+12%"
              isPositive={true}
              icon={Users}
              tag="vs last week"
            />
            <StatCard
              title="Appointments"
              value="24"
              change="+8%"
              isPositive={true}
              icon={Calendar}
              tag="vs last week"
            />
            <StatCard
              title="Active Doctors"
              value="08"
              change="Online"
              isPositive={true}
              icon={Stethoscope}
              tag="in clinic"
            />
          </div>

          {/* Patient Vitals Overview (Section 14) */}
          <PatientVitalsOverview />

          {/* Appointment Summary Donut Chart (Section 15) */}
          <AppointmentSummaryDonut appointments={appointments} />

          {/* Recent Medical Records (Section 16) */}
          <div className="glass-panel rounded-3xl p-5 border border-white/90 shadow-glass">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold text-slate-800">
                  Recent Medical Records
                </h3>
              </div>
              <button
                onClick={() => navigate('/doctor/records')}
                className="text-xs font-bold text-primary hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-2.5 mt-3">
              {recentRecords.map((rec) => (
                <MedicalRecordCard key={rec.id} record={rec} />
              ))}
            </div>

            {/* Bottom Synthetic Data Label (Section 16 specification) */}
            <div className="mt-4 pt-3 border-t border-slate-100 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 text-slate-600 text-[10px] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span>🔒 Synthetic Demo Data • For demonstration purposes only.</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Appointment Detail Modal */}
      {showDetailModal && selectedAppointment && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title={`Appointment Details: ${selectedAppointment.id}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800 text-sm">{selectedAppointment.patientName}</p>
                <p className="text-slate-500">Physician: {selectedAppointment.doctorName}</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-700 block">{selectedAppointment.time}</span>
                <span className="text-[10px] font-bold text-primary bg-white px-2 py-0.5 rounded-full border border-blue-200">
                  {selectedAppointment.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Date</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{selectedAppointment.date}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Type</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{selectedAppointment.type}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Reported Symptoms</span>
              <p className="p-3 rounded-xl bg-white border border-slate-100 text-slate-700">
                {selectedAppointment.symptoms}
              </p>
            </div>

            {selectedAppointment.status === 'Upcoming' && (
              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => {
                    cancelAppointment(selectedAppointment.id);
                    setShowDetailModal(false);
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
                >
                  Cancel Appointment
                </button>
                <button
                  onClick={() => {
                    completeAppointment(selectedAppointment.id);
                    setShowDetailModal(false);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                >
                  Mark as Completed
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Quick Booking Modal */}
      {showBookingModal && (
        <Modal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          title="Book New Clinic Appointment"
          subtitle="Schedule consultation with authorized medical staff"
        >
          <form onSubmit={handleCreateAppointment} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Select Patient
              </label>
              <select
                value={bookingData.patientId}
                onChange={(e) => setBookingData({ ...bookingData, patientId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-primary"
              >
                {patients.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.bloodGroup} • {p.phone})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Select Attending Physician
              </label>
              <select
                value={bookingData.doctorId}
                onChange={(e) => setBookingData({ ...bookingData, doctorId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-primary"
              >
                {doctors.map(d => (
                  <option key={d.id} value={d.id}>{d.name} — {d.specialty} ({d.availability})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Time Slot
                </label>
                <select
                  value={bookingData.time}
                  onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-primary"
                >
                  <option>10:00 AM</option>
                  <option>10:30 AM</option>
                  <option>11:00 AM</option>
                  <option>12:00 PM</option>
                  <option>02:00 PM</option>
                  <option>02:30 PM</option>
                  <option>03:30 PM</option>
                  <option>04:30 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Appointment Type
              </label>
              <select
                value={bookingData.type}
                onChange={(e) => setBookingData({ ...bookingData, type: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-primary"
              >
                <option>General Consultation</option>
                <option>Follow-up Visit</option>
                <option>Routine Checkup</option>
                <option>Specialist Consultation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Reason / Symptoms
              </label>
              <textarea
                rows={2}
                value={bookingData.symptoms}
                onChange={(e) => setBookingData({ ...bookingData, symptoms: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-primary"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all"
              >
                Confirm Appointment Booking
              </button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
};
