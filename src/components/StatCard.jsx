import React from 'react';
import { TrendingUp, Users } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon = Users,
  tag = "vs last week"
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0B63F6] to-[#06B6D4] text-white flex items-center justify-center shadow-xs">
          <Icon className="w-5 h-5 stroke-[2.2]" />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
            isPositive
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-rose-50 text-rose-700 border-rose-200'
          }`}>
            <TrendingUp className="w-3 h-3" />
            <span>{change}</span>
          </div>
        )}
      </div>

      <div className="mt-3">
        <span className="text-2xl sm:text-3xl font-black text-[#0B1736] tracking-tight block">
          {value}
        </span>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs font-bold text-slate-500">
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
