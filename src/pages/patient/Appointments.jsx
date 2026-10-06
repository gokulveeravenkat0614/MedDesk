import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Calendar, Clock, CheckCircle2, XCircle, Plus, Search,
  Filter, ChevronRight, Check, AlertTriangle, ArrowRight, Stethoscope
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppointmentCard } from '../../components/AppointmentCard';
import { Modal } from '../../components/Modal';
import { EmptyState } from '../../components/EmptyState';

export const PatientAppointments = () => {
  const {
    currentUser,
    appointments,
    doctors,
    bookAppointment,
    cancelAppointment,
    rescheduleAppointment
  } = useApp();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('Upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Wizard Modal State (Section 21 specification)
  const [wizardOpen, setWizardOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedDoctorId, setSelectedDoctorId] = useState(searchParams.get('doctorId') || 'doc-1');
  const [selectedDate, setSelectedDate] = useState('2026-10-06');
  const [selectedTime, setSelectedTime] = useState('10:30 AM');
  const [selectedType, setSelectedType] = useState('General Consultation');
  const [symptoms, setSymptoms] = useState('Routine consultation and general assessment');
  const [confirmedAppt, setConfirmedAppt] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Cancellation and Reschedule Modals
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [targetAppt, setTargetAppt] = useState(null);
  const [newReschedDate, setNewReschedDate] = useState('2026-10-08');
  const [newReschedTime, setNewReschedTime] = useState('11:00 AM');

  useEffect(() => {
    if (searchParams.get('book') === 'true') {
      setWizardOpen(true);
    }
  }, [searchParams]);

  // Filter patient appointments
  const myAppointments = appointments.filter(
    (a) => a.patientId === (currentUser?.id || 'pat-1') || a.patientName === (currentUser?.name || 'Rahul Kumar')
  );

  const filteredAppointments = myAppointments.filter((a) => {
    const matchesSearch =
      a.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.type.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (activeTab === 'Upcoming') return a.status === 'Upcoming';
    if (activeTab === 'Completed') return a.status === 'Completed';
    if (activeTab === 'Cancelled') return a.status === 'Cancelled';
    if (activeTab === 'Rescheduled') return a.status === 'Rescheduled';
    return true;
  });

  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId) || doctors[0];

  const handleConfirmBooking = () => {
    const created = bookAppointment({
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      doctorSpecialty: selectedDoctor.specialty,
      patientId: currentUser?.id || 'pat-1',
      patientName: currentUser?.name || 'Rahul Kumar',
      date: selectedDate,
      time: selectedTime,
      type: selectedType,
      symptoms: symptoms,
      fee: '$60'
    });

    setConfirmedAppt(created);
    setWizardOpen(false);
    setShowSuccessModal(true);
    setStep(1);
  };

  const handleExecuteCancel = () => {
    if (targetAppt) {
      cancelAppointment(targetAppt.id, 'Cancelled by patient');
      setCancelModalOpen(false);
    }
  };

  const handleExecuteReschedule = (e) => {
    e.preventDefault();
    if (targetAppt) {
      rescheduleAppointment(targetAppt.id, newReschedDate, newReschedTime);
      setRescheduleModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My Appointments
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            View upcoming consultations, track completed checkups, or book a new appointment.
          </p>
        </div>

        <button
          onClick={() => {
            setStep(1);
            setWizardOpen(true);
          }}
          className="px-5 py-2.5 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Book New Appointment</span>
        </button>
      </div>

      {/* Tabs (Section 22: Upcoming, Completed, Cancelled, Rescheduled) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="p-1 rounded-2xl bg-slate-100/90 flex flex-wrap gap-1 max-w-md">
          {['Upcoming', 'Completed', 'Cancelled', 'Rescheduled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all ${
                activeTab === tab
                  ? 'bg-white text-primary shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search my appointments..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {filteredAppointments.length === 0 ? (
          <EmptyState
            title={`No ${activeTab.toLowerCase()} appointments`}
            description="You do not have any clinical visits under this category right now."
            actionText="Book an Appointment"
            onAction={() => {
              setStep(1);
              setWizardOpen(true);
            }}
          />
        ) : (
          filteredAppointments.map((appt) => (
            <AppointmentCard
              key={appt.id}
              appointment={appt}
              role="patient"
              onReschedule={(item) => {
                setTargetAppt(item);
                setRescheduleModalOpen(true);
              }}
              onCancel={(id) => {
                setTargetAppt(appt);
                setCancelModalOpen(true);
              }}
            />
          ))
        )}
      </div>

      {/* MULTI-STEP BOOKING WIZARD MODAL (Section 21) */}
      {wizardOpen && (
        <Modal
          isOpen={wizardOpen}
          onClose={() => setWizardOpen(false)}
          title="Book Clinic Appointment"
          subtitle={`Step ${step} of 5: ${
            step === 1 ? 'Select Doctor' :
            step === 2 ? 'Select Date' :
            step === 3 ? 'Select Time Slot' :
            step === 4 ? 'Select Appointment Type' : 'Confirm Appointment'
          }`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-4 text-xs">
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-100">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="flex items-center gap-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                    step === s
                      ? 'bg-primary text-white shadow-xs'
                      : step > s
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {step > s ? <Check className="w-3 h-3" /> : s}
                  </div>
                  {s < 5 && <div className="w-4 sm:w-8 h-0.5 bg-slate-100" />}
                </div>
              ))}
            </div>

            {/* STEP 1: Select Doctor */}
            {step === 1 && (
              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 text-xs">Choose Your Attending Physician:</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {doctors.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedDoctorId(doc.id)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        selectedDoctorId === doc.id
                          ? 'bg-blue-50/80 border-primary shadow-xs'
                          : 'bg-white hover:bg-slate-50 border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={doc.avatar}
                          alt={doc.name}
                          className="w-10 h-10 rounded-xl object-cover ring-2 ring-primary/20"
                        />
                        <div>
                          <h5 className="font-bold text-slate-800 text-xs">{doc.name}</h5>
                          <p className="text-primary text-[11px] font-medium">{doc.specialty}</p>
                          <p className="text-slate-400 text-[10px]">{doc.experience} • {doc.availability}</p>
                        </div>
                      </div>

                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        selectedDoctorId === doc.id
                          ? 'border-primary bg-primary text-white'
                          : 'border-slate-300'
                      }`}>
                        {selectedDoctorId === doc.id && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Select Date */}
            {step === 2 && (
              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 text-xs">Select Consultation Date:</h4>
                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-bold text-slate-800 text-xs">Physician: {selectedDoctor.name}</p>
                    <p className="text-[11px] text-slate-500">Working days: Monday through Saturday</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Choose Date
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Select Time */}
            {step === 3 && (
              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 text-xs">Select Consultation Time Slot:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['09:00 AM', '10:30 AM', '12:00 PM', '02:30 PM', '04:30 PM', '05:30 PM'].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`p-3 rounded-xl text-xs font-bold transition-all border ${
                        selectedTime === slot
                          ? 'bg-primary text-white border-primary shadow-xs'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Select Appointment Type */}
            {step === 4 && (
              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 text-xs">Select Appointment Classification:</h4>
                <div className="space-y-2">
                  {[
                    { type: 'General Consultation', desc: 'Baseline diagnostic review & vital screening', fee: '$60' },
                    { type: 'Follow-up', desc: 'Post-treatment evaluation or lab report check', fee: '$45' },
                    { type: 'Routine Checkup', desc: 'Periodic wellness monitoring & preventive analysis', fee: '$50' },
                    { type: 'Specialist Consultation', desc: 'Detailed specialty examination & regimen adjustment', fee: '$110' },
                  ].map((item) => (
                    <div
                      key={item.type}
                      onClick={() => setSelectedType(item.type)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        selectedType === item.type
                          ? 'bg-blue-50/80 border-primary shadow-xs'
                          : 'bg-white hover:bg-slate-50 border-slate-200/80'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-slate-800 text-xs block">{item.type}</span>
                        <span className="text-[11px] text-slate-500 block">{item.desc}</span>
                      </div>
                      <span className="font-mono font-bold text-xs text-primary">{item.fee}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Describe Symptoms / Primary Concern
                  </label>
                  <textarea
                    rows={2}
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>
            )}

            {/* STEP 5: Confirm Appointment */}
            {step === 5 && (
              <div className="space-y-3.5">
                <h4 className="font-bold text-slate-800 text-xs">Review Appointment Summary:</h4>
                
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 space-y-2.5">
                  <div className="flex justify-between items-center pb-2 border-b border-blue-200/50">
                    <span className="text-slate-500 text-xs">Attending Physician:</span>
                    <span className="font-bold text-slate-900 text-xs">{selectedDoctor.name} ({selectedDoctor.specialty})</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-blue-200/50">
                    <span className="text-slate-500 text-xs">Date & Time:</span>
                    <span className="font-bold text-slate-900 text-xs">{selectedDate} at {selectedTime}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-blue-200/50">
                    <span className="text-slate-500 text-xs">Appointment Type:</span>
                    <span className="font-bold text-slate-900 text-xs">{selectedType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-xs">Estimated Fee:</span>
                    <span className="font-mono font-black text-sm text-primary">$60.00</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500">
                  <strong>Notes:</strong> {symptoms}
                </div>
              </div>
            )}

            {/* Wizard Navigation Footer */}
            <div className="pt-3 flex justify-between gap-2 border-t border-slate-100">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Previous
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setWizardOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold shadow-md shadow-blue-500/25 transition-all flex items-center gap-1"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Appointment</span>
                </button>
              )}
            </div>

          </div>
        </Modal>
      )}

      {/* SUCCESS CONFIRMATION MODAL (Section 21 specification) */}
      {showSuccessModal && confirmedAppt && (
        <Modal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          title="Appointment Confirmed"
        >
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900">
                Booking Confirmed!
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your consultation has been booked and scheduled in CareGuard.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 max-w-sm mx-auto text-left space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Appointment ID:</span>
                <span className="font-mono font-bold text-primary">{confirmedAppt.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Physician:</span>
                <span className="font-bold text-slate-800">{confirmedAppt.doctorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date & Time:</span>
                <span className="font-bold text-slate-800">{confirmedAppt.date} at {confirmedAppt.time}</span>
              </div>
            </div>

            {/* Buttons (Section 21 specification: View Appointment & Back to Dashboard) */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setActiveTab('Upcoming');
                }}
                className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
              >
                View Appointment
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate('/patient/dashboard');
                }}
                className="py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all"
              >
                Back to Dashboard
              </button>
            </div>

          </div>
        </Modal>
      )}

      {/* Cancellation Confirmation Modal */}
      {cancelModalOpen && targetAppt && (
        <Modal
          isOpen={cancelModalOpen}
          onClose={() => setCancelModalOpen(false)}
          title="Confirm Appointment Cancellation"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-100 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-rose-900">Are you sure you want to cancel?</h4>
                <p className="text-rose-700 mt-0.5">
                  This will release the reserved time slot ({targetAppt.time} on {targetAppt.date}) for {targetAppt.doctorName}.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setCancelModalOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
              >
                Keep Appointment
              </button>
              <button
                type="button"
                onClick={handleExecuteCancel}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-md transition-all"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Reschedule Modal */}
      {rescheduleModalOpen && targetAppt && (
        <Modal
          isOpen={rescheduleModalOpen}
          onClose={() => setRescheduleModalOpen(false)}
          title={`Reschedule Appointment: ${targetAppt.id}`}
        >
          <form onSubmit={handleExecuteReschedule} className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Select New Date
              </label>
              <input
                type="date"
                required
                value={newReschedDate}
                onChange={(e) => setNewReschedDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Select New Time Slot
              </label>
              <select
                value={newReschedTime}
                onChange={(e) => setNewReschedTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-primary"
              >
                <option>09:00 AM</option>
                <option>10:30 AM</option>
                <option>12:00 PM</option>
                <option>02:30 PM</option>
                <option>04:30 PM</option>
                <option>05:30 PM</option>
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
