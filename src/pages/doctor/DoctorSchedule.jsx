import React, { useState, useEffect } from 'react';
import {
  Calendar, Clock, CheckCircle2, XCircle, AlertCircle,
  Plus, Edit3, Settings, ShieldCheck, ChevronLeft, ChevronRight,
  Filter, UserCheck, Stethoscope, Video, MapPin, RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/Modal';

const INITIAL_SCHEDULE = {
  Monday: [
    { id: 'm-1', time: '09:00 AM - 10:00 AM', status: 'Booked', patient: 'Rahul Kumar', type: 'General Consultation', mode: 'In-Person', suite: 'Suite 302' },
    { id: 'm-2', time: '10:00 AM - 11:00 AM', status: 'Available', patient: null, type: 'Open', mode: 'In-Person', suite: 'Suite 302' },
    { id: 'm-3', time: '11:00 AM - 12:00 PM', status: 'Booked', patient: 'Priya Sharma', type: 'Follow-up Visit', mode: 'Telehealth', suite: 'Virtual 1' },
    { id: 'm-4', time: '12:00 PM - 01:00 PM', status: 'Blocked', patient: null, type: 'Lunch & Charting', mode: 'Internal', suite: 'Office' },
    { id: 'm-5', time: '01:00 PM - 02:00 PM', status: 'Available', patient: null, type: 'Open', mode: 'In-Person', suite: 'Suite 302' },
    { id: 'm-6', time: '02:00 PM - 03:00 PM', status: 'Booked', patient: 'Aditya Rao', type: 'Routine Checkup', mode: 'In-Person', suite: 'Suite 302' },
    { id: 'm-7', time: '03:00 PM - 04:00 PM', status: 'Available', patient: null, type: 'Open', mode: 'In-Person', suite: 'Suite 302' },
    { id: 'm-8', time: '04:00 PM - 05:00 PM', status: 'Available', patient: null, type: 'Open', mode: 'Telehealth', suite: 'Virtual 2' },
  ],
  Tuesday: [
    { id: 't-1', time: '09:00 AM - 10:00 AM', status: 'Available', patient: null, type: 'Open', mode: 'In-Person', suite: 'Suite 302' },
    { id: 't-2', time: '10:00 AM - 11:00 AM', status: 'Booked', patient: 'Ananya Reddy', type: 'Dermatology Review', mode: 'In-Person', suite: 'Suite 302' },
    { id: 't-3', time: '11:00 AM - 12:00 PM', status: 'Available', patient: null, type: 'Open', mode: 'In-Person', suite: 'Suite 302' },
    { id: 't-4', time: '12:00 PM - 01:00 PM', status: 'Blocked', patient: null, type: 'Lunch & Rounds', mode: 'Internal', suite: 'Office' },
    { id: 't-5', time: '01:00 PM - 02:00 PM', status: 'Booked', patient: 'Vikram Joshi', type: 'Cardio Check', mode: 'In-Person', suite: 'Suite 302' },
    { id: 't-6', time: '02:00 PM - 03:00 PM', status: 'Available', patient: null, type: 'Open', mode: 'In-Person', suite: 'Suite 302' },
    { id: 't-7', time: '03:00 PM - 04:00 PM', status: 'Available', patient: null, type: 'Open', mode: 'Telehealth', suite: 'Virtual 1' },
    { id: 't-8', time: '04:00 PM - 05:00 PM', status: 'Blocked', patient: null, type: 'Academic Conference', mode: 'Internal', suite: 'Auditorium' },
  ],
  Wednesday: [
    { id: 'w-1', time: '09:00 AM - 10:00 AM', status: 'Booked', patient: 'Deepa Nair', type: 'Diabetes Management', mode: 'In-Person', suite: 'Suite 302' },
    { id: 'w-2', time: '10:00 AM - 11:00 AM', status: 'Available', patient: null, type: 'Open', mode: 'In-Person', suite: 'Suite 302' },
    { id: 'w-3', time: '11:00 AM - 12:00 PM', status: 'Booked', patient: 'Kavita Patel', type: 'Hypertension Screening', mode: 'In-Person', suite: 'Suite 302' },
    { id: 'w-4', time: '12:00 PM - 01:00 PM', status: 'Blocked', patient: null, type: 'Clinical Staff Meeting', mode: 'Internal', suite: 'Room B' },
    { id: 'w-5', time: '01:00 PM - 02:00 PM', status: 'Available', patient: null, type: 'Open', mode: 'In-Person', suite: 'Suite 302' },
    { id: 'w-6', time: '02:00 PM - 03:00 PM', status: 'Available', patient: null, type: 'Open', mode: 'In-Person', suite: 'Suite 302' },
    { id: 'w-7', time: '03:00 PM - 04:00 PM', status: 'Booked', patient: 'Rohan Mehta', type: 'Pediatric Follow-up', mode: 'Telehealth', suite: 'Virtual 2' },
    { id: 'w-8', time: '04:00 PM - 05:00 PM', status: 'Available', patient: null, type: 'Open', mode: 'In-Person', suite: 'Suite 302' },
  ],
  Thursday: [
    { id: 'th-1', time: '09:00 AM - 10:00 AM', status: 'Available', patient: null, type: 'Open', mode: 'In-Person', suite: 'Suite 302' },
    { id: 'th-2', time: '10:00 AM - 11:00 AM', status: 'Available', patient: null, type: 'Open', mode: 'In-Person', suite: 'Suite 302' },
    { id: 'th-3', time: '11:00 AM - 12:00 PM', status: 'Booked', patient: 'Siddharth Roy', type: 'Orthopedic Consult', mode: 'In-Person', suite: 'Suite 302' },
    { id: 'th-4', time: '12:00 PM - 01:00 PM', status: 'Blocked', patient: null, type: 'Lunch & Break', mode: 'Internal', suite: 'Office' },
    { id: 'th-5', time: '01:00 PM - 02:00 PM', status: 'Available', patient: null, type: 'Open', mode: 'In-Person', suite: 'Suite 302' },
    { id: 'th-6', time: '02:00 PM - 03:00 PM', status: 'Available', patient: null, type: 'Open', mode: 'In-Person', suite: 'Suite 302' },
    { id: 'th-7', time: '03:00 PM - 04:00 PM', status: 'Available', patient: null, type: 'Open', mode: 'Telehealth', suite: 'Virtual 1' },
    { id: 'th-8', time: '04:00 PM - 05:00 PM', status: 'Available', patient: null, type: 'Open', mode: 'In-Person', suite: 'Suite 302' },
  ],
  Friday: [
    { id: 'f-1', time: '09:00 AM - 10:00 AM', status: 'Booked', patient: 'Meera Iyer', type: 'Allergy Evaluation', mode: 'In-Person', suite: 'Suite 302' },
    { id: 'f-2', time: '10:00 AM - 11:00 AM', status: 'Available', patient: null, type: 'Open', mode: 'In-Person', suite: 'Suite 302' },
    { id: 'f-3', time: '11:00 AM - 12:00 PM', status: 'Available', patient: null, type: 'Open', mode: 'In-Person', suite: 'Suite 302' },
    { id: 'f-4', time: '12:00 PM - 01:00 PM', status: 'Blocked', patient: null, type: 'Grand Rounds Review', mode: 'Internal', suite: 'Auditorium' },
    { id: 'f-5', time: '01:00 PM - 02:00 PM', status: 'Available', patient: null, type: 'Open', mode: 'In-Person', suite: 'Suite 302' },
    { id: 'f-6', time: '02:00 PM - 03:00 PM', status: 'Booked', patient: 'Sneha Deshmukh', type: 'Annual Checkup', mode: 'In-Person', suite: 'Suite 302' },
    { id: 'f-7', time: '03:00 PM - 04:00 PM', status: 'Available', patient: null, type: 'Open', mode: 'Telehealth', suite: 'Virtual 2' },
    { id: 'f-8', time: '04:00 PM - 05:00 PM', status: 'Available', patient: null, type: 'Open', mode: 'In-Person', suite: 'Suite 302' },
  ],
  Saturday: [
    { id: 's-1', time: '09:00 AM - 10:00 AM', status: 'Booked', patient: 'Gaurav Sen', type: 'Executive Health Screening', mode: 'In-Person', suite: 'Suite 302' },
    { id: 's-2', time: '10:00 AM - 11:00 AM', status: 'Available', patient: null, type: 'Open', mode: 'In-Person', suite: 'Suite 302' },
    { id: 's-3', time: '11:00 AM - 12:00 PM', status: 'Available', patient: null, type: 'Open', mode: 'In-Person', suite: 'Suite 302' },
    { id: 's-4', time: '12:00 PM - 01:00 PM', status: 'Blocked', patient: null, type: 'Weekend Handover', mode: 'Internal', suite: 'Office' },
    { id: 's-5', time: '01:00 PM - 02:00 PM', status: 'Blocked', patient: null, type: 'Clinic Closed', mode: 'Internal', suite: 'None' },
    { id: 's-6', time: '02:00 PM - 03:00 PM', status: 'Blocked', patient: null, type: 'Clinic Closed', mode: 'Internal', suite: 'None' },
    { id: 's-7', time: '03:00 PM - 04:00 PM', status: 'Blocked', patient: null, type: 'Clinic Closed', mode: 'Internal', suite: 'None' },
    { id: 's-8', time: '04:00 PM - 05:00 PM', status: 'Blocked', patient: null, type: 'Clinic Closed', mode: 'Internal', suite: 'None' },
  ]
};

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const DoctorSchedule = () => {
  const { currentUser, showToast } = useApp();
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [scheduleData, setScheduleData] = useState(() => {
    const saved = localStorage.getItem('careguard_doctor_schedule');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_SCHEDULE;
  });

  const [activeSlot, setActiveSlot] = useState(null);
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [filterMode, setFilterMode] = useState('all'); // all, available, booked, blocked

  useEffect(() => {
    localStorage.setItem('careguard_doctor_schedule', JSON.stringify(scheduleData));
  }, [scheduleData]);

  // Compute metrics
  let totalSlots = 0;
  let availableSlots = 0;
  let bookedSlots = 0;
  let blockedSlots = 0;

  Object.values(scheduleData).forEach((daySlots) => {
    daySlots.forEach((slot) => {
      totalSlots++;
      if (slot.status === 'Available') availableSlots++;
      else if (slot.status === 'Booked') bookedSlots++;
      else blockedSlots++;
    });
  });

  const handleToggleSlotStatus = (day, slotId) => {
    setScheduleData((prev) => {
      const daySlots = prev[day].map((s) => {
        if (s.id === slotId) {
          if (s.status === 'Available') {
            return { ...s, status: 'Blocked', type: 'Blocked by Doctor', patient: null };
          } else if (s.status === 'Blocked') {
            return { ...s, status: 'Available', type: 'Open', patient: null };
          }
          return s; // Booked slots shouldn't toggle directly without modal
        }
        return s;
      });
      return { ...prev, [day]: daySlots };
    });
    showToast('Slot availability status updated');
  };

  const handleSaveSlotModal = (e) => {
    e.preventDefault();
    if (!activeSlot) return;

    setScheduleData((prev) => {
      const daySlots = prev[activeSlot.day].map((s) => {
        if (s.id === activeSlot.id) {
          return {
            ...s,
            status: activeSlot.status,
            type: activeSlot.type,
            mode: activeSlot.mode,
            suite: activeSlot.suite,
            patient: activeSlot.status === 'Booked' ? activeSlot.patient : null
          };
        }
        return s;
      });
      return { ...prev, [activeSlot.day]: daySlots };
    });

    setShowSlotModal(false);
    showToast(`Slot for ${activeSlot.day} ${activeSlot.time} updated successfully`);
  };

  const handleMarkAllAvailable = () => {
    setScheduleData((prev) => {
      const updated = { ...prev };
      DAYS.forEach((d) => {
        updated[d] = updated[d].map((s) => {
          if (s.status === 'Blocked' && !s.type.includes('Lunch')) {
            return { ...s, status: 'Available', type: 'Open' };
          }
          return s;
        });
      });
      return updated;
    });
    showToast('Unreserved weekday slots set to Available');
  };

  const handleResetSchedule = () => {
    setScheduleData(INITIAL_SCHEDULE);
    showToast('Schedule restored to default clinical hours');
  };

  const currentDaySlots = (scheduleData[selectedDay] || []).filter((s) => {
    if (filterMode === 'all') return true;
    return s.status.toLowerCase() === filterMode.toLowerCase();
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/60">
              Provider Scheduling & Availability
            </span>
            <span className="text-xs text-slate-400">• Oct 05 - Oct 10, 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1 leading-tight">
            Consultation Schedule
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Manage your weekly consultation slots (09:00 AM – 05:00 PM), toggle open appointment availability, and manage buffer recesses.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleMarkAllAvailable}
            className="px-3.5 py-2.5 rounded-2xl bg-white hover:bg-blue-50 text-slate-700 text-xs font-bold border border-slate-200 shadow-xs transition-colors flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Open All Slots</span>
          </button>
          <button
            onClick={handleResetSchedule}
            className="px-3.5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-600 text-xs font-bold border border-slate-200 shadow-xs transition-colors flex items-center gap-1.5"
            title="Reset to default schedule"
          >
            <RefreshCw className="w-4 h-4 text-slate-500" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel rounded-3xl p-5 border border-white/90 shadow-glass flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Total Weekly Slots
            </span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">
              {totalSlots}
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              Mon – Sat (48 hours)
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center">
            <Calendar className="w-6 h-6 stroke-[2.2]" />
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-5 border border-white/90 shadow-glass flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Available Slots
            </span>
            <span className="text-2xl font-black text-emerald-600 mt-1 block">
              {availableSlots}
            </span>
            <span className="text-[11px] text-emerald-700 mt-0.5 block font-medium">
              Ready for patient booking
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-5 border border-white/90 shadow-glass flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Booked Consults
            </span>
            <span className="text-2xl font-black text-primary mt-1 block">
              {bookedSlots}
            </span>
            <span className="text-[11px] text-primary mt-0.5 block font-medium">
              Confirmed patients
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center">
            <UserCheck className="w-6 h-6 stroke-[2.2]" />
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-5 border border-white/90 shadow-glass flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Blocked / Break
            </span>
            <span className="text-2xl font-black text-slate-700 mt-1 block">
              {blockedSlots}
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              Lunch & internal recess
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center">
            <Clock className="w-6 h-6 stroke-[2.2]" />
          </div>
        </div>

      </div>

      {/* Main Schedule Container */}
      <div className="glass-panel rounded-3xl p-6 border border-white/90 shadow-glass space-y-6">
        
        {/* Day Selector Buttons & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          
          {/* Weekday Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {DAYS.map((day) => {
              const dayBooked = (scheduleData[day] || []).filter(s => s.status === 'Booked').length;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
                    selectedDay === day
                      ? 'bg-primary text-white shadow-md shadow-blue-500/25'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                  }`}
                >
                  <span>{day}</span>
                  {dayBooked > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      selectedDay === day ? 'bg-white/20 text-white' : 'bg-blue-100 text-primary'
                    }`}>
                      {dayBooked}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Filter Status Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-slate-500">Filter:</span>
            <select
              value={filterMode}
              onChange={(e) => setFilterMode(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Slots (8)</option>
              <option value="available">Available Only</option>
              <option value="booked">Booked Only</option>
              <option value="blocked">Blocked Only</option>
            </select>
          </div>

        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentDaySlots.map((slot) => {
            const isBooked = slot.status === 'Booked';
            const isAvailable = slot.status === 'Available';
            const isBlocked = slot.status === 'Blocked';

            return (
              <div
                key={slot.id}
                className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between gap-3 ${
                  isBooked
                    ? 'bg-gradient-to-r from-blue-50/80 to-sky-50/60 border-blue-200/80 shadow-xs'
                    : isAvailable
                    ? 'bg-white/90 border-emerald-200/80 hover:border-emerald-400 hover:shadow-md'
                    : 'bg-slate-50/80 border-slate-200/80 text-slate-500'
                }`}
              >
                {/* Slot Top: Time & Status Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Clock className={`w-4 h-4 ${isBooked ? 'text-primary' : isAvailable ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span className="text-xs font-black text-slate-900 tracking-tight">
                      {slot.time}
                    </span>
                  </div>

                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    isBooked
                      ? 'bg-blue-100/80 text-primary border-blue-200'
                      : isAvailable
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-slate-200 text-slate-600 border-slate-300'
                  }`}>
                    {slot.status}
                  </span>
                </div>

                {/* Slot Middle: Details */}
                <div className="space-y-1">
                  {isBooked ? (
                    <div>
                      <div className="flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="text-sm font-black text-slate-900 truncate">
                          {slot.patient}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {slot.type} • <span className="font-semibold text-primary">{slot.mode}</span>
                      </p>
                    </div>
                  ) : isAvailable ? (
                    <div>
                      <p className="text-xs font-bold text-emerald-800">
                        Open Clinical Consultation Window
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Assigned to {slot.suite} ({slot.mode})
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs font-bold text-slate-700">
                        {slot.type}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Slot reserved / Not open for online bookings
                      </p>
                    </div>
                  )}
                </div>

                {/* Slot Bottom: Actions */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                    {slot.mode === 'Telehealth' ? <Video className="w-3 h-3 text-primary" /> : <MapPin className="w-3 h-3 text-slate-400" />}
                    {slot.suite}
                  </span>

                  <div className="flex items-center gap-2">
                    {isBooked ? (
                      <button
                        onClick={() => {
                          setActiveSlot({ ...slot, day: selectedDay });
                          setShowSlotModal(true);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-primary hover:bg-primary-hover text-white text-[11px] font-bold shadow-xs transition-colors flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Manage</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleToggleSlotStatus(selectedDay, slot.id)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                            isAvailable
                              ? 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          }`}
                        >
                          {isAvailable ? 'Block Slot' : 'Set Available'}
                        </button>
                        <button
                          onClick={() => {
                            setActiveSlot({ ...slot, day: selectedDay });
                            setShowSlotModal(true);
                          }}
                          className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                          title="Configure Slot"
                        >
                          <Settings className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {currentDaySlots.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-xs">
            No slots match the selected status filter for {selectedDay}.
          </div>
        )}

      </div>

      {/* Modal: Slot Configuration */}
      <Modal
        isOpen={showSlotModal}
        onClose={() => setShowSlotModal(false)}
        title="Configure Consultation Slot"
        size="md"
      >
        {activeSlot && (
          <form onSubmit={handleSaveSlotModal} className="space-y-4">
            
            <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200/60 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-800 block">{activeSlot.day}</span>
                <span className="text-primary font-bold">{activeSlot.time}</span>
              </div>
              <span className="text-[10px] font-bold bg-white text-slate-700 px-2 py-0.5 rounded-full border border-blue-200">
                Slot ID: {activeSlot.id}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Availability Status
              </label>
              <select
                value={activeSlot.status}
                onChange={(e) => setActiveSlot({ ...activeSlot, status: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="Available">Available (Open for Patient Booking)</option>
                <option value="Booked">Booked (Assigned Patient)</option>
                <option value="Blocked">Blocked (Recess, Lunch, or Unavailable)</option>
              </select>
            </div>

            {activeSlot.status === 'Booked' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Patient Name
                </label>
                <input
                  type="text"
                  value={activeSlot.patient || ''}
                  onChange={(e) => setActiveSlot({ ...activeSlot, patient: e.target.value })}
                  placeholder="e.g. Rahul Kumar"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Consultation Type / Description
              </label>
              <input
                type="text"
                value={activeSlot.type || ''}
                onChange={(e) => setActiveSlot({ ...activeSlot, type: e.target.value })}
                placeholder="e.g. General Consultation or Clinical Break"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Delivery Mode
                </label>
                <select
                  value={activeSlot.mode}
                  onChange={(e) => setActiveSlot({ ...activeSlot, mode: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="In-Person">In-Person</option>
                  <option value="Telehealth">Telehealth</option>
                  <option value="Internal">Internal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Location / Suite
                </label>
                <input
                  type="text"
                  value={activeSlot.suite || ''}
                  onChange={(e) => setActiveSlot({ ...activeSlot, suite: e.target.value })}
                  placeholder="e.g. Suite 302"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowSlotModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-colors"
              >
                Save Changes
              </button>
            </div>

          </form>
        )}
      </Modal>

    </div>
  );
};
