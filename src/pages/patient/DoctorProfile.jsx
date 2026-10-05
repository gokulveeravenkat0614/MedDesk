import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star, Award, Clock, MapPin, Globe, ChevronLeft,
  Calendar, CheckCircle2, ShieldCheck, ArrowRight, Stethoscope
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { doctors } = useApp();

  const doctor = doctors.find((d) => d.id === id) || doctors[0];

  const handleBook = () => {
    navigate(`/patient/appointments?doctorId=${doctor.id}&book=true`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Navigation Breadcrumb / Back button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/patient/doctors')}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition-all flex items-center gap-1.5 text-xs font-bold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Doctor Directory</span>
        </button>
      </div>

      {/* Main Hero Card (Section 20: Doctor Profile Page) */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/90 shadow-glass space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover ring-4 ring-primary/20 shadow-lg"
            />
            <span className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-primary border border-blue-200/60">
                {doctor.specialty}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Specialist</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {doctor.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              {doctor.qualifications} • {doctor.experience} clinical experience
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-500">
              <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-800">{doctor.rating}</span>
                <span className="text-slate-400">({doctor.reviewsCount} reviews)</span>
              </div>

              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{doctor.room}</span>
              </div>
            </div>
          </div>

          <div className="sm:self-center">
            <button
              onClick={handleBook}
              className="px-6 py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-md shadow-blue-500/25 transition-all flex items-center gap-2 hover:scale-[1.02]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>

        {/* Clinical Overview / Bio */}
        <div className="pt-6 border-t border-slate-100">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Clinical Summary & Specialization
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white/70 p-4 rounded-2xl border border-slate-100">
            {doctor.bio}
          </p>
        </div>

        {/* Section 20 Detailed Specifications: Languages & Available Consultation Hours */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white/80 border border-slate-100 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Languages Spoken
            </span>
            <div className="flex items-center gap-2 pt-1">
              <Globe className="w-4 h-4 text-primary" />
              <span className="font-bold text-slate-800 text-xs sm:text-sm">
                {doctor.languages?.join(', ')}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 border border-slate-100 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Available Hours
            </span>
            <div className="flex items-center gap-2 pt-1">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-slate-800 text-xs sm:text-sm">
                {doctor.workingHours}
              </span>
            </div>
          </div>
        </div>

        {/* Today's Open Consultation Slots */}
        <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100/70 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Available Time Slots</span>
            </h3>
            <span className="text-[11px] font-bold text-primary bg-white px-2 py-0.5 rounded-lg border border-blue-200">
              {doctor.availability}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {doctor.availableSlots?.map((slot, i) => (
              <button
                key={i}
                onClick={handleBook}
                className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-primary hover:text-white text-slate-700 font-semibold text-xs border border-blue-200/80 shadow-xs transition-all"
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Security & Access Notice */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Consultations operate under CareGuard demonstration privacy access controls.</span>
          </div>
          <span className="font-semibold text-slate-600">Synthetic Demo Data</span>
        </div>

      </div>

    </div>
  );
};
