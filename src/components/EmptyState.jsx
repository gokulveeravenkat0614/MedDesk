import React from 'react';
import { CalendarX2, ArrowRight } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = CalendarX2,
  title = "No data found",
  description = "There are no records matching your criteria right now.",
  actionText,
  onAction
}) => {
  return (
    <div className="py-12 px-4 text-center rounded-3xl bg-white/60 border border-slate-100 flex flex-col items-center justify-center">
      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-primary flex items-center justify-center mb-3 shadow-xs">
        <Icon className="w-7 h-7 stroke-[1.8]" />
      </div>
      <h4 className="text-sm font-bold text-slate-800">
        {title}
      </h4>
      <p className="text-xs text-slate-500 max-w-sm mt-1 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm shadow-blue-500/20 transition-all flex items-center gap-1.5"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
