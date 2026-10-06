import React, { useState } from 'react';
import { Clock, CheckCircle2, XCircle, MoreVertical, Calendar, FileText, ArrowRight } from 'lucide-react';

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
      case 'Scheduled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-[#1677FF] border border-blue-200/80 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1677FF] animate-pulse"></span>
            Scheduled
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">
            <XCircle className="w-3 h-3 text-rose-600" />
            Cancelled
          </span>
        );
      case 'Rescheduled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs">
            <Clock className="w-3 h-3 text-amber-600" />
            Rescheduled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
            {status}
          </span>
        );
    }
  };

  // Safe fallback display values
  const patientDisplayName = role === 'patient' 
    ? (appointment.doctorName || 'Assigned Physician') 
    : (appointment.patientName || 'Patient Record');
  
  const displayId = appointment.id || 'MD-2026-00101';
  const displayTime = appointment.time || '10:30 AM';
  const displayDate = appointment.date || 'Oct 05, 2026';
  const displayType = appointment.type || 'General Consultation';
  const displaySymptoms = appointment.symptoms || appointment.reason || 'Follow-up vitals routine inspection';

  return (
    <div className="w-full box-border min-w-0 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between gap-3 relative">
      
      {/* Top Header Row: Time Badge & Status */}
      <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100 min-w-0">
        <div className="flex items-center gap-2 min-w-0 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50/80 text-[#1677FF] border border-blue-200/60 text-xs font-bold shrink-0">
            <Clock className="w-3.5 h-3.5 text-[#1677FF]" />
            <span>{displayTime}</span>
          </div>
          <span className="text-[11px] font-medium text-slate-400 truncate">
            {displayDate}
          </span>
        </div>

        <div className="shrink-0">
          {getStatusBadge(appointment.status)}
        </div>
      </div>

      {/* Main Content Area: Patient/Doctor Information & Clinical Details */}
      <div className="space-y-1.5 min-w-0">
        <div className="flex items-baseline justify-between gap-2 min-w-0">
          <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight truncate min-w-0">
            {patientDisplayName}
          </h4>
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 shrink-0 border border-slate-200/60">
            ID: {displayId}
          </span>
        </div>

        <p className="text-xs font-semibold text-[#1677FF] truncate">
          {displayType}
        </p>

        {displaySymptoms && (
          <div className="p-2.5 rounded-xl bg-slate-50/90 border border-slate-100/90 text-xs text-slate-600 mt-2">
            <span className="font-bold text-slate-700 block text-[10px] uppercase tracking-wider mb-0.5">
              Clinical Reason:
            </span>
            <p className="text-slate-600 line-clamp-2 leading-relaxed break-words overflow-hidden text-ellipsis">
              {displaySymptoms}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Action Controls: Stay strictly inside the card container */}
      {showActions && (
        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap min-w-0">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            {appointment.status === 'Upcoming' && onComplete && role === 'doctor' && (
              <button
                type="button"
                onClick={() => onComplete(appointment.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 transition-colors shadow-2xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Complete</span>
              </button>
            )}

            {onView && (
              <button
                type="button"
                onClick={() => onView(appointment)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#1677FF] text-xs font-bold transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>View Record</span>
              </button>
            )}
          </div>

          {/* Options Dropdown Menu */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Appointment options"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <>
                {/* Backdrop to dismiss menu */}
                <div 
                  className="fixed inset-0 z-20" 
                  onClick={() => setShowMenu(false)}
                />
                
                <div className="absolute right-0 bottom-full sm:bottom-auto sm:top-full mb-1 sm:mb-0 sm:mt-1 w-44 bg-white rounded-2xl shadow-xl border border-slate-200 p-1.5 z-30 animate-in fade-in duration-100">
                  {onReschedule && appointment.status !== 'Completed' && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowMenu(false);
                        onReschedule(appointment);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-[#1677FF] transition-colors"
                    >
                      Reschedule Visit
                    </button>
                  )}
                  {onCancel && appointment.status === 'Upcoming' && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowMenu(false);
                        onCancel(appointment.id);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      Cancel Appointment
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setShowMenu(false);
                      if (onView) onView(appointment);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Clinical Summary
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
