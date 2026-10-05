import React, { useState } from 'react';
import { Clock, Calendar, MoreVertical, CheckCircle2, XCircle, ArrowRight, UserCheck, Stethoscope } from 'lucide-react';

export const AppointmentCard = ({
  appointment,
  onView,
  onComplete,
  onCancel,
  onReschedule,
  showActions = true,
  role = 'doctor'
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Upcoming':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-primary border border-blue-200/60 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Upcoming
          </span>
        );
      case 'Completed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-200/60 flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Cancelled
          </span>
        );
      case 'Rescheduled':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Rescheduled
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="p-3.5 sm:p-4 rounded-2xl bg-white/70 hover:bg-white border border-slate-100/80 hover:border-blue-100 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative group">
      
      {/* Left: Time and Patient Info */}
      <div className="flex items-start sm:items-center gap-3">
        <div className="w-14 sm:w-16 py-2 px-1 rounded-xl bg-blue-50/80 border border-blue-100/60 text-center shrink-0">
          <Clock className="w-3 h-3 text-primary mx-auto mb-0.5" />
          <span className="text-xs font-bold text-slate-800 block leading-tight">
            {appointment.time}
          </span>
          <span className="text-[9px] font-medium text-slate-400 block mt-0.5">
            {appointment.date}
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-slate-800">
              {role === 'patient' ? appointment.doctorName : appointment.patientName}
            </h4>
            {getStatusBadge(appointment.status)}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {appointment.type} • <span className="text-slate-400">ID: {appointment.id}</span>
          </p>
          {appointment.symptoms && (
            <p className="text-[11px] text-slate-400 mt-1 italic line-clamp-1">
              "{appointment.symptoms}"
            </p>
          )}
        </div>
      </div>

      {/* Right: Actions menu */}
      {showActions && (
        <div className="flex items-center gap-2 self-end sm:self-center">
          {appointment.status === 'Upcoming' && onComplete && role === 'doctor' && (
            <button
              onClick={() => onComplete(appointment.id)}
              className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold border border-emerald-200/60 transition-colors"
            >
              Complete
            </button>
          )}

          {onView && (
            <button
              onClick={() => onView(appointment)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-primary text-xs font-semibold transition-colors"
            >
              View
            </button>
          )}

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Appointment options"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5 z-30 animate-in fade-in duration-100">
                {onReschedule && appointment.status !== 'Completed' && (
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onReschedule(appointment);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                  >
                    Reschedule
                  </button>
                )}
                {onCancel && appointment.status === 'Upcoming' && (
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onCancel(appointment.id);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    Cancel Appointment
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
