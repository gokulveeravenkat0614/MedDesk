import React from 'react';
import { TrendingUp, Users, Calendar, Stethoscope } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon = Users,
  iconBg = "bg-blue-500",
  tag = "vs last week"
}) => {
  return (
    <div className="glass-panel rounded-3xl p-4 sm:p-5 border border-white/90 shadow-glass hover:shadow-glass-hover transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-sky-400 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
          <Icon className="w-5 h-5 stroke-[2.2]" />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
            isPositive
              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/60'
              : 'bg-rose-50 text-rose-600 border border-rose-200/60'
          }`}>
            <TrendingUp className="w-3 h-3" />
            <span>{change}</span>
          </div>
        )}
      </div>

      <div className="mt-3">
        <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight block">
          {value}
        </span>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs font-semibold text-slate-500">
            {title}
          </span>
          {tag && (
            <span className="text-[10px] text-slate-400 font-medium">
              {tag}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
