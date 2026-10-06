import React from 'react';
import { Star, Clock, Calendar, Stethoscope, Award, ChevronRight } from 'lucide-react';

export const DoctorCard = ({ doctor, onBook, onViewProfile }) => {
  return (
    <div className="glass-panel rounded-3xl p-5 border border-white/90 shadow-glass hover:shadow-glass-hover transition-all duration-300 flex flex-col justify-between group">
      
      <div>
        {/* Top: Avatar, Name, Specialty, Rating */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary/20 shadow-md group-hover:scale-105 transition-transform duration-200"
            />
            <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
              doctor.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'
            }`} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800 truncate group-hover:text-primary transition-colors">
                {doctor.name}
              </h3>
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60 shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-slate-800">{doctor.rating}</span>
              </div>
            </div>

            <p className="text-xs font-semibold text-primary mt-0.5">
              {doctor.specialty}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {doctor.department} • {doctor.qualifications}
            </p>
          </div>
        </div>

        {/* Experience and Availability badges */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100/80 text-[11px] font-semibold text-slate-700">
            <Award className="w-3.5 h-3.5 text-primary" />
            <span>{doctor.experience} experience</span>
          </div>

          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-semibold ${
            doctor.availability?.includes('Today')
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
              : 'bg-blue-50 text-primary border border-blue-200/60'
          }`}>
            <Clock className="w-3.5 h-3.5" />
            <span>{doctor.availability}</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-3 line-clamp-2 leading-relaxed">
          {doctor.bio}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-5 pt-3 border-t border-slate-100">
        <button
          onClick={() => onViewProfile(doctor)}
          className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors text-center"
        >
          View Profile
        </button>

        <button
          onClick={() => onBook(doctor)}
          className="px-3 py-2 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary-hover shadow-sm shadow-blue-500/25 transition-all text-center flex items-center justify-center gap-1"
        >
          <span>Book Appointment</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
